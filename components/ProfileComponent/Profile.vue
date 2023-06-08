<template>
    <div class="profile-content">
      <div class="profile-header">
        <div class="profile-title">
          <p>Mein Weinkeller</p>
        </div>
        <div class="logout-container">
          <button @click="logout()" class="logout-button">Logout</button>
        </div>
      </div>

      <div class="inner-content">
        <div class="profile-button-group">
          <button @click="filterWines('Weintyp')" class="profile-button">Weintyp</button>
          <button @click="filterWines('Herkunft')" class="profile-button">Herkunft</button>
          <button @click="filterWines('Trauben')" class="profile-button">Trauben</button>
          <button @click="filterWines('Jahr')" class="profile-button">Jahr</button>
          <button @click="filterWines('Preis')" class="profile-button">Preis</button>
        </div>

        <div class="profile-line-2"></div>   

        <div v-if="userData" class="wine-cellar">
          <div class="regal" v-for="(wineGroup, groupIndex) in wineGroups" :key="groupIndex">
            <div v-for="(wine, wineIndex) in wineGroup" :key="wineIndex" class="wine-item">
              <CellarItem @click="toggleDetailViewWine(wine)" :wine="wine" />
            </div>
          </div>
        </div>

        <div class="profile-line-3"></div>    

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

        <div class="profile-line-3"></div>

        <div class="chart-container">
          <div class="profile-chart-title"> 
            <p>Weinkeller Statistik</p>
          </div>
          
          <div class="doughnut-chart">
            <canvas ref="chartContainer"></canvas>
          </div>
        </div>

        <div class="profile-line-1"></div>

        <div class="chart-container">
          <p>Benutzer</p>
          <button class="detail-view-button" @click="removeUserProfile">
            Benutzerprofil löschen
          </button>
          <div class="profile-placeholder"></div>
        </div>

        <div class="bottom-placeholder">

        </div>
        <DetailWineView v-if="showDetailWineView" 
          :closeOverlayHandlerOn="true"
          :inProfile="true"
          :wine="selectedWine" 
          @close="toggleDetailViewWine" 
          @bookmark-removed="updateBookmarkedWinesCount" 
          @update-profile="updateProfile"
          @load-profile="updateProfile"
          @refresh-profile-for-doughnut="updateProfile"
          ref="detailview" />
      </div>
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
  
    computed: {
      wineGroups() {
        if (!this.userData || !this.userData.favoriten) {
          return [];
        }
        const wines = this.userData.favoriten;
        const wineGroups = [];
        for (let i = 0; i < wines.length; i += this.winesPerRow) {
          wineGroups.push(wines.slice(i, i + this.winesPerRow));
        }
        return wineGroups;
      },
    },

    data() {
      var redWinesCount;
      var whiteWinesCount;
      var roseWinesCount; 
      var preferences;

      if(JSON.parse(localStorage.getItem('favoriten'))) {
        var favoriten = JSON.parse(localStorage.getItem('favoriten'));
        redWinesCount = favoriten.filter(wine => wine.winetype === 'Rotwein').length;
        whiteWinesCount = favoriten.filter(wine => wine.winetype === 'Weisswein').length;
        roseWinesCount = favoriten.filter(wine => wine.winetype === 'Rose').length;
      } else {
        redWinesCount = 0;
        whiteWinesCount = 0;
        roseWinesCount = 0;
      }


      if(JSON.parse(localStorage.getItem('savedPreferences'))){
        preferences = JSON.parse(localStorage.getItem('savedPreferences'));
      } else if (JSON.parse(localStorage.getItem('preferences'))) {
        preferences = JSON.parse(localStorage.getItem('preferences'));
      } else {
        preferences = { sauer: 0, suss: 0, intensiv: 0, fruchtig: 0, holzig: 0, trocken: 0 };
      }

      return {
        chart: null,
        userData: null,
        winesPerRow: 3,
        showFoodOverlay: false,
        showBookmarksOverlay: false,
        showDetailWineView: false,
        chartData: {
          labels: ['Rotwein', 'Weisswein', 'Rosé'],
          datasets: [{
            data: [redWinesCount,whiteWinesCount,roseWinesCount],
            backgroundColor: ['#A15B80', '#E8D954', '#F28A87'],
            hoverOffset: 4
          }]
        },
        chartOptions: {
          title: {
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
      this.getUserData().then(() => {
        //this.refreshDoughnutData(this.userData);
        this.chart = new Chart(this.$refs.chartContainer, {
          type: 'doughnut',
          data: this.chartData,
        });
      });
      this.$on('update-profile', this.updateProfile);
    },

    beforeDestroy() {
      this.$off('update-profile', this.updateProfile);
    },
  
    methods: {

      addData() {
        let redWinesCount, whiteWinesCount, roseWinesCount;
        const favoriten = JSON.parse(localStorage.getItem('favoriten'));
        if (favoriten) {
          redWinesCount = favoriten.filter(wine => wine.winetype === 'Rotwein').length;
          whiteWinesCount = favoriten.filter(wine => wine.winetype === 'Weisswein').length;
          roseWinesCount = favoriten.filter(wine => wine.winetype === 'Rose').length;
        } else {
          redWinesCount = 0;
          whiteWinesCount = 0;
          roseWinesCount = 0;
        }
        this.chartData.datasets[0].data = [redWinesCount, whiteWinesCount, roseWinesCount];
        console.log("R"+redWinesCount);
        console.log("W"+whiteWinesCount);
        console.log("R"+roseWinesCount);
        if (this.chart) {
          this.chart.update();
        }   
      },

      refreshDoughnutData() {
        var redWinesCount;
        var whiteWinesCount;
        var roseWinesCount; 

        if(JSON.parse(localStorage.getItem('favoriten'))) {
          var favoriten = JSON.parse(localStorage.getItem('favoriten'));
          redWinesCount = favoriten.filter(wine => wine.winetype === 'Rotwein').length;
          whiteWinesCount = favoriten.filter(wine => wine.winetype === 'Weisswein').length;
          roseWinesCount = favoriten.filter(wine => wine.winetype === 'Rose').length;
        } else {
          redWinesCount = 0;
          whiteWinesCount = 0;
          roseWinesCount = 0;
        }

        chartData = {
          labels: ['Rotwein', 'Weisswein', 'Rosé'],
          datasets: [{
            data: [redWinesCount,whiteWinesCount,roseWinesCount],
            backgroundColor: ['#A15B80', '#E8D954', '#F28A87'],
            hoverOffset: 4
          }]
        }
        return chartData;
      },

      updateProfile() {
        this.getUserData().then(() => {
          this.addData();
          });
        this.$on('update-profile', this.updateProfile);
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
        this.addData();
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
    margin-bottom: 1em;
    font-weight: bold;
    top: 0;
    background-color: white;
    padding-left: 20px;
    padding-right: 20px;
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
    width: 100%;
  }

  .logout-content{

  }

  .profile-placeholder{
    height: 50px;
  }

  .profile-content {
    height: 100vh; 
    overflow-y: auto; 
  }

  .inner-content{
    margin-left: 20px;
    margin-right:20px;
  }

  .profile-line-1{
    border-bottom: 1px solid rgb(214, 214, 214);
    margin-top: 3em;
    margin-bottom: 1em;
    width: 100%;
  }

  .profile-line-2{
    border-bottom: 1px solid rgb(214, 214, 214);
    margin-top: 1em;
    margin-bottom: 1em;
    width: 100%;
  }

  .profile-line-3{
    border-bottom: 1px solid rgb(214, 214, 214);
    margin-top: 3em;
    margin-bottom: 3em;
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
    border: none;
    background-color: white;
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
    justify-content: center;
    align-items: flex-end; 
    width: 100%;
    height: auto;
    
    border-bottom: 3px solid brown;
    box-sizing: border-box;
    overflow-y: auto;
    padding-top: 30px;
    margin-bottom: 20px;
    gap: 10px;
}
  
  
  .wine-item {
    margin-right: 10px;
    border-radius: 5px;
    background-color: white;
  }

  .bottom-placeholder{
    height: 80px;
  }


  </style>