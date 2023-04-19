<template>
  <div>
    <Header />
    <MainTabbar />
    <div style="text-align: center; margin: 20px;">
      <!--
      <p>Weisswein: {{ preferences?.Weisswein }}</p>
      <p>Rotwein: {{ preferences?.Rotwein }}</p>
      <p>Süss: {{ preferences?.suss }}</p>
      <p>Sauer: {{ preferences?.sauer }}</p>
      <p>Kräftig: {{ preferences?.kraftig }}</p>
      <p>Fruchtig: {{ preferences?.fruchtig }}</p>
      <p>Neutral: {{ preferences?.neutral }}</p>
      -->
    </div>
    <div v-if="loading" style="text-align: center; margin: 20px;">Loading...</div>
    <div v-else>
      <div v-if="preferences.weisswein">
        <WineHeader title="Weissweine" />
        <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
          <div v-if="wine.winetype === 'Weisswein' && !(wine.rating === 0)" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
            <WineInfoCustom :wine="wine" />
          </div>
        </div>
      </div>
      <div v-if="preferences.rotwein">
        <WineHeader title="Rotweine" />
        <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
          <div v-if="wine.winetype === 'Rotwein' && !(wine.rating === 0)" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
            <WineInfoCustom :wine="wine" />
          </div>
        </div>
      </div>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import WineHeader from '~/components/WineHeader.vue';
import WineInfoCondition from "@/components/WineInfoCondition.vue";
import WineInfoCustom from "@/components/WineInfoCustom.vue";
import axios from 'axios';

export default {
  components: {
    Header,
    WineHeader,
    WineInfoCondition,
    WineInfoCustom
  },
  data() {
    return {
      preferences: JSON.parse(localStorage.getItem('preferences')),
      loading: true,
      wines: [],
      MatchingValue:0
    }
  },
  async created() {
    try {
      //const response = await axios.get('https://interactivemenu.azurewebsites.net/api/wine');
      const response = await axios.get('https://wine.azurewebsites.net/api/wine');
      //const response = await axios.get('https://localhost:44322/api/Wine');
      this.wines = response.data;
      this.loading = false;
      if (this.wines.length > 0) {
        this.calc();
      } else {
        console.log("Data in Array nicht bereit");
      }
    } catch (error) {
      console.error(error);
    }
  },


  methods: {
    calc() {
      var match = 0;
      for(var j = 0; j < this.wines.length; j++) {
        for(var x = 0; x < this.wines[j].profile.length; x++) {
          for (const [key, value] of Object.entries(this.preferences)) {
            if (Boolean(value) && key === this.wines[j].profile[x]) {
              match++;
            }
          }
        }
        if (match > 0) {
          this.wines[j].rating = 100 + ((match - this.wines[j].profile.length) * 10);
        }
        match = 0;
      }
      
      /*
      let match;
      for (let j = 0; j < this.wines.length; j++) {
        match = 0;
        for (let x = 0; x < this.wines[j].profile.length; x++) {
          for (const [key, value] of Object.entries(this.preferences)) {
            if (Boolean(value) && key === this.wines[j].profile[x]) {
              match++;
            }
          } 
        }
        if (match > 0) {
          if (Object.values(this.preferences).filter(Boolean).length === 1) {
            this.wines[j].rating = 100;
          } else {
            this.wines[j].rating = 100 + ((match - this.wines[j].profile.length) * 10);
          }
        }
      }
      this.wines.sort((a, b) => b.rating - a.rating);
    */},
  }
}
</script>

<style>
  .match-result{
    margin-top: 20px;
    padding: 20px;
    background-color: yellow;
  }
</style>
