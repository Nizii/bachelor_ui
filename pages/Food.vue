<template>
    <div style="margin: 0; padding: 0; box-sizing: border-box;">
      <AppHeader />
      <MainTabbar />
      <FoodTabbar @show-wines="showWinesForDish" />
      <Tabbar />
  
      <WineInfo v-if="wine.match && wine.match.indexOf(selectedDish) !== -1" :wine="wine" wineType="Rotwein" :matchType="selectedDish" />
        <WineInfo v-if="wine.match && wine.match.indexOf(selectedDish) !== -1" :wine="wine" wineType="Rotwein" :matchType="selectedDish" />
      <div v-for="wine in whiteWines" :key="wine.id" style="margin: 20px;">
        <WineInfo v-if="wine.match && wine.match.indexOf(selectedDish) !== -1" :wine="wine" wineType="Weisswein" :matchType="selectedDish" />
      </div>
  
      <WineHeader v-if="selectedDish && wines.some(wine => wine.winetype === 'Rotwein' && wine.match && wine.match.indexOf(selectedDish) !== -1)" title="Rotweine" />
      <div v-for="wine in redWines" :key="wine.id" style="margin: 20px;">
        <WineInfo v-if="wine.match && wine.match.indexOf(selectedDish) !== -1" :wine="wine" wineType="Rotwein" :matchType="selectedDish" />
      </div>
    </div>
  </template>
  
  <script>
  import AppHeader from '~/components/Titles/AppHeader.vue';
  import WineHeader from '~/components/WineHeader.vue';
  import ShowButton from "~/components/ShowButton.vue";
  import WineInfo from '~/components/WineInfo.vue';
  import axios from 'axios';
  
  export default {
    components: {
      AppHeader,
      WineHeader,
      WineInfo,
      ShowButton,
    },
  
    data() {
      return {
        loading: true,
        wines: [],
        selectedDish: '',
        showWines: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false
        }
      }
    },
  
    computed: {
      whiteWines() {
        return this.wines.filter(wine => wine.winetype === 'Weisswein');
      },
      redWines() {
        return this.wines.filter(wine => wine.winetype === 'Rotwein');
      },
      hasWhiteWines() {
        return this.whiteWines.length > 0;
      }
    },
  
    async created() {
      try {
        const response = await axios.get('https://wine.azurewebsites.net/api/wine');
        //const response = await axios.get('https://interactivemenu.azurewebsites.net/api/wine');
        //const response = await axios.get('https://localhost:44322/api/Wine');
        this.wines = response.data;
        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },
  
    methods: {
      toggleWines(index) {
        if (this.showWines[index]) {
          this.showWines[index] = false;
        } else {
          this.showWines[index] = true;
        }
      },
  
      showWinesForDish(dish) {
        this.selectedDish = dish;
      }   
    }
  }
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  </style>
  