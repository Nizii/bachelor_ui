<template>
    <div class="profile-content">
      <div class="profile-header">
        <div class="profile-title">
          Weinkeller
        </div>
        <div class="logout-container">
          <button @click="logout()" class="logout-button">Logout</button>
        </div>
      </div>

      <div class="profile-button-group">
        <button @click="filterWines('Weintyp')" class="button">Weintyp</button>
        <button @click="filterWines('Herkunft')" class="button">Herkunft</button>
        <button @click="filterWines('Trauben')" class="button">Trauben</button>
        <button @click="filterWines('Jahr')" class="button">Jahr</button>
        <button @click="filterWines('Preis')" class="button">Preis</button>
      </div>
      <div v-if="userData" class="wine-cellar">
        <div class="regal">
          <div v-for="(wine, index) in userData.favoriten" :key="wine._id.$oid" class="wine-item" v-if="index < 4">
            <CellarItem :wine="wine"/>
          </div>
        </div>
        <div class="regal">
          <div v-for="(wine, index) in userData.favoriten" :key="wine._id.$oid" class="wine-item" v-if="index >= 4">
            <CellarItem :wine="wine"/>
          </div>
        </div>
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
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CellarItem from '~/components/CellarItem.vue';
  import WineInfo from '~/components/WineInfo.vue';
  import DetailWineView from '~/components/OverlayFrames/DetailWineView.vue';
  import DoughnutChart from '~/components/Charts/DoughnutChart.vue';

  
  export default {
    components: {
      CellarItem,
      WineInfo,
      DetailWineView,
      DoughnutChart,
    },
  
    data() {
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
        }

      };
    },
  
    mounted() {
      this.getUserData();
    },
  
    methods: {
      toggleShowBookmarksOverlay() {
        this.showBookmarksOverlay = !this.showBookmarksOverlay;
      },
  
      toggleShowFoodOverlay() {
        this.showFoodOverlay = !this.showFoodOverlay;
      },
  
      toggleDetailViewWine(wine) {
        this.selectedWine = wine;
        this.showDetailWineView = !this.showDetailWineView;
      },
  
      async getUserData() {
        const token = localStorage.getItem('jwt');
        try {
            const response = await this.$axios.get(`https://wine.azurewebsites.net/api/user/userdata/`, {
            //const response = await this.$axios.get(`https://localhost:44322/api/user/userdata/`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            this.userData = response.data;
            } catch (error) {
          }
          if(!token) {
            localStorage.removeItem('jwt');
            this.$emit('logout');
          }
      },

      logout() {
        localStorage.removeItem('jwt');
        //this.$router.push('/Winemenu');
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
  h1 {
    font-size: 48px;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 30px;
  }

  .profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1001; 
    background-color: white; 
    border-bottom: 1px solid rgb(214, 214, 214);
  }

  .profile-chart-title{
    color: white;
    font-size: 30px;
    font-weight: bold;
    font-family: sans-serif;
  }
  
  .profile-title {
    color: black;
    font-size: 30px;
    font-weight: bold;
    font-family: sans-serif;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .doughnut-chart{

  }

  .profile-content{
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 5em;
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
    background-color: whitesmoke;
    border-radius: 10px;
    height: 50px;
  }


  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    width: 25%;
    box-sizing: border-box;
    transition: color 0.3s;
    font-size: 12px;
    font-family: sans-serif;
    border: none;
  }
  
  .wine-cellar {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-image: url("/background/weinkeller.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  
  .regal {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
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
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }


  </style>