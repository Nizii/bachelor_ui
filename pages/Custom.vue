<template>
  <div>
    <div style="text-align: center; margin: 20px;">
      <Header />
      <p>Süß: {{ preferences?.suss }}</p>
      <p>Sauer: {{ preferences?.sauer }}</p>
      <p>Kräftig: {{ preferences?.kraftig }}</p>
      <p>Fruchtig: {{ preferences?.fruchtig }}</p>
      <p>Neutral: {{ preferences?.neutral }}</p>
    </div>
    <div v-if="loading" style="text-align: center; margin: 20px;">Loading...</div>
    <div v-else>
      <h1 style="text-align: center; margin: 20px;">Weissweine</h1>
      <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
          <div v-if="wine.winetype === 'Weisswein' && !(wine.rating === 0)" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
            <h3 style="text-align: center;">{{ wine.name }}</h3>
            <div class="wine-attribute">Traube: {{ wine.grape }}</div>
            <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
            <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
            <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
            <div class="wine-price">{{ wine.bottleprice}} .- / 0.75 l</div>
            <div class="match-result">Matched mit dir zu {{ wine.rating }} %</div>
          </div>
        </div>
      </div>
      <h1 style="text-align: center; margin: 20px;">Rotweine</h1>
      <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
          <div v-if="wine.winetype === 'Rotwein' && !(wine.rating === 0)" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
            <h3 style="text-align: center;">{{ wine.name }}</h3>
            <div class="wine-attribute">Traube: {{ wine.grape }}</div>
            <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
            <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
            <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
            <div class="wine-price">{{ wine.bottleprice}} .- / 0.75 l</div>
            <div class="match-result">Matched mit dir zu {{ wine.rating }} %</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import axios from 'axios';

export default {
  components: {
    Header
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
