<template>
    <div class="profile-content">
      <div class="profile-header">
        <div class="profile-title">
          <p>Weinkeller</p>
        </div>
        <div class="logout-container">
          <button @click="logout()" class="logout-button">Logout</button>
        </div>
      </div>

      <div class="profile-button-group">
        <button @click="filterWines('Weintyp')" class="profile-button">Weintyp</button>
        <button @click="filterWines('Herkunft')" class="profile-button">Herkunft</button>
        <button @click="filterWines('Trauben')" class="profile-button">Trauben</button>
        <button @click="filterWines('Jahr')" class="profile-button">Jahr</button>
        <button @click="filterWines('Preis')" class="profile-button">Preis</button>
      </div>
      <div v-if="userData" class="wine-cellar">
        <div class="regal">
          <div v-for="(wine, index) in userData.favoriten" :key="wine._id.$oid" class="wine-item" v-if="index < 4">
            <CellarItem @click="toggleDetailViewWine(wine)" :wine="wine"/>
          </div>
        </div>
        <div class="regal">
          <div v-for="(wine, index) in userData.favoriten" :key="wine._id.$oid" class="wine-item" v-if="index >= 4">
            <CellarItem @click="toggleDetailViewWine(wine)" :wine="wine"/>
          </div>
        </div>
      </div>

      <div class="profile-line-1"></div>    

      <div class="profile-taste-container">
        <div class="profile-chart-title"> 
          <p>Mein Geschmacksprofil</p>
        </div>
        <div class="profile-radar-chart">
          <radar-chart :data="radarChartData" :options="radarChartOptions" />
        </div>
        <button class="detail-view-button" @click="calcTasteProfile">
          Geschmacksprofil neu berechnen
        </button>
      </div>

      <div class="profile-line-1"></div>

      <div class="chart-container">
        <div class="profile-chart-title"> 
          <p>Meine getrunkenen Weine</p>
        </div>
        <div class="doughnut-chart">
          <DoughnutChart :chartData="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="profile-line-1"></div>

      <div class="chart-container">
        <p>Benutzer</p>
        <button class="detail-view-button" @click="removeUserProfile">
          Benutzerprofil löschen
        </button>
      </div>

      <div class="bottom-placeholder">

      </div>
      <DetailWineView v-if="showDetailWineView" :wine="selectedWine" 
        @close="toggleDetailViewWine" 
        @bookmark-removed="updateBookmarkedWinesCount" 
        @update-profile="updateProfile"
        ref="detailview" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CellarItem from '~/components/ProfileComponent/CellarItem.vue';
  import WineInfo from '~/components/WineInfo.vue';
  import DetailWineView from '~/components/OverlayFrames/DetailWineView.vue';
  import DoughnutChart from '~/components/Charts/DoughnutChart.vue';
  import RadarChart from '~/components/Charts/RadarChart.vue';
  
  export default {
    components: {
      CellarItem,
      WineInfo,
      DetailWineView,
      DoughnutChart,
      RadarChart,
      DetailWineView,
    },

    beforeCreate() {
      const storedPreferences = localStorage.getItem('savedPreferences');
      if (storedPreferences) {
        this.preferences = JSON.parse(storedPreferences);
        console.log("Präferenzen verfügbar" +this.preferences);
      } else {
        console.log("Keine Präferenzen verfügbar");
        this.preferences = { sauer: 0, suss: 0, intensiv: 0, fruchtig: 0, holzig: 0, trocken: 0 };
      }
    },
  
    data() {
      const preferences = this.preferences || { sauer: 0, suss: 0, intensiv: 0, fruchtig: 0, holzig: 0, trocken: 0 };
      return {
        userData: null,
        showFoodOverlay: false,
        showBookmarksOverlay: false,
        showDetailWineView: false,
        chartData: {
          labels: ['Red', 'Blue', 'Yellow'],
          datasets: [{
            data: [300, 50, 100],
            backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
            hoverOffset: 4
          }]
        },
        chartOptions: {
          title: {
            /*
            display: true, 
            text: 'Mein Doughnut-Chart', 
            fontColor: 'black',
            fontSize: 16, 
            */
          },
        },

        radarChartData: {
          labels: ['Säure', 'Zucker', 'Intensität', 'Fruchtig', 'Holzig', 'Trocken'],
          datasets: [
            {
              label: 'Mein Geschmacksprofil', 
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 0.8)',
              pointBackgroundColor: 'blue',
              pointBorderColor: 'blue',
              pointHoverBackgroundColor: 'blue',
              pointHoverBorderColor: 'blue',
              data: [
                preferences.sauer,
                preferences.suss,
                preferences.intensiv,
                preferences.fruchtig,
                preferences.holzig,
                preferences.trocken
              ],
            }
          ]
        },
        radarChartOptions: {
          title: {
            display: false,
          },
          scale: {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 5,
              stepSize: 1
            }
          }
        },
    

      };
    },
  
    mounted() {
      this.getUserData();
      this.$on('update-profile', this.updateProfile);
    },

    beforeDestroy() {
      this.$off('update-profile', this.updateProfile);
    },
  
    methods: {
      openDetailView(wine) {
        
      },

      updateProfile() {
        console.log("GET USER wird aud");
        this.getUserData();
      },

      async removeUserProfile() {
        const token = localStorage.getItem('jwt');
        if(!token) {
          console.error('No token found');
          return;
        }
        let user = localStorage.getItem('user');
        try {
          const response = await this.$axios.delete(`https://wine.azurewebsites.net/api/user/delete/${user}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            this.userData = null;
            localStorage.removeItem('jwt');
            localStorage.removeItem('user');
            this.$emit('logout');
          }
        } catch (error) {
          console.error(error);
        }
      },

      updateBookmarkedWinesCount(){
        this.$emit('update-bookmar-count');
      },

      calcTasteProfile() {
        this.$router.push('/Tasteprofile/Sweet');
      },

      toggleShowBookmarksOverlay() {
        this.showBookmarksOverlay = !this.showBookmarksOverlay;
      },
  
      toggleShowFoodOverlay() {
        this.showFoodOverlay = !this.showFoodOverlay;
      },
  
      toggleDetailViewWine(wine) {
        console.log("Open DetailView");
        this.selectedWine = wine;
        this.showDetailWineView = !this.showDetailWineView;
      },
  
      async getUserData() {
        const token = localStorage.getItem('jwt');
        try {
          const response = await this.$axios.get(`https://wine.azurewebsites.net/api/user/userdata/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.userData = response.data;

        } catch (error) {
          console.error(error);
        }
        if(!token) {
          this.logout();
        }
      },


      logout() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        localStorage.removeItem('favoriten');
        localStorage.removeItem('preferences');
        localStorage.removeItem('savedPreferences');
        localStorage.removeItem('wineCellar');
        this.$emit('logout');
      },
  
      filterWines(filterType) {
        if (!this.userData) return;
        let filteredWines = this.userData.favoriten.slice();
  
        switch (filterType) {
          case 'Weintyp':
            filteredWines.sort((a, b) => a.winetype.localeCompare(b.winetype));
            break;
          case 'Herkunft':
            filteredWines.sort((a, b) => a.origin.localeCompare(b.origin));
            break;
          case 'Trauben':
            filteredWines.sort((a, b) => a.grape.localeCompare(b.grape));
            break;
          case 'Jahr':
            filteredWines.sort((a, b) => a.year - b.year);
            break;
          case 'Preis':
            filteredWines.sort((a, b) => a.bottleprice - b.bottleprice);
            break;
          }
        this.userData.favoriten = filteredWines;
      },
    },
  };
  </script>

  <style>

  *{
    font-family: 'Semplicita', sans-serif;
  }

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(214, 214, 214);
    margin-bottom: 3em;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 1001; 
    background-color: white; 
  }

  .profile-chart-title{
    color: black;
    font-size: 30px;
    font-weight: bold;
    font-family: sans-serif;
  }
  
  .profile-title {
    color: black;
    font-size: 30px;
    font-weight: bold;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .doughnut-chart{

  }

  .profile-content{
    padding-left: 20px;
    padding-right: 20px;
  }

  .profile-line-1{
    border-bottom: 1px solid rgb(214, 214, 214);
    margin-top: 3em;
    margin-bottom: 1em;
    width: 100%;
  }
  
  .toggle-btn {
    border: none;
  }

  .logout-container {
    margin-right: 20px;
  }

  .logout-button{
    width: 40px;
    height: 40px;
    font-weight: bold;
  }
  
  .profile-button-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    height: 50px;
    width: 100%;
  }


  .profile-button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    width: 25%;
    box-sizing: border-box;
    font-size: 12px;
    border: none;
  }
  
  .wine-cellar {
    display: flex;
    flex-direction: column;
    align-items: center;
    /*
    background-image: url("/background/weinkeller.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    */
  }
  
  .regal {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end; 
    width: 100%;
    height: auto;
    
    border-bottom: 3px solid brown;
    box-sizing: border-box;
    overflow-y: auto;
    padding-top: 10px;
    padding-left: 10px;
}
  
  
  .wine-item {
    margin-right: 10px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .bottom-placeholder{
    height: 80px;
  }


  </style>