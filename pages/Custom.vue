<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <div style="text-align: center;">
      <Header />
      <MainTabbar />
    </div>
    <div v-if="loading" style="text-align: center; margin: 20px;">Loading...</div>
    <div v-else>
      <div v-if="preferences.weisswein">
        <WineHeader title="Weissweine" />
        <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
          <div v-if="wine.winetype === 'Weisswein' && !(wine.rating === 0)" class="wine-info">
            <WineMatchInfo :wine="wine" />
            <WineInfo :wine="wine" />
          </div>
        </div>
      </div>
      <div v-if="preferences.rotwein">
        <WineHeader title="Rotweine" />
        <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
          <div v-if="wine.winetype === 'Rotwein' && !(wine.rating === 0)" class="wine-info">
            <WineMatchInfo :wine="wine" />
            <WineInfo :wine="wine" />
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
import axios from 'axios';
import WineMatchInfo from "@/components/WineMatchInfo.vue";

export default {
  components: {
    Header,
    WineHeader,
    WineMatchInfo
  },
  data() {
    return {
      preferences: JSON.parse(localStorage.getItem('preferences')),
      loading: true,
      wines: [],
      MatchingValue:0,
      matchedAttributes:[]
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
      this.wines.forEach(wine => wine.matchedAttributes = []);
      var match = 0;
        for (var j = 0; j < this.wines.length; j++) {
          for (var x = 0; x < this.wines[j].profile.length; x++) {
            for (const [key, value] of Object.entries(this.preferences)) {
              if (Boolean(value) && key === this.wines[j].profile[x]) {
                match++;
                this.wines[j].matchedAttributes.push(key);
              }
            }
          }
        if (match > 0) {
          this.wines[j].rating = 100 + ((match - this.wines[j].profile.length) * 10);
          //Berechnung anhand von Prozentsatz
          //this.wines[j].rating = (match / this.wines[j].profile.length) * 100;
        }
        match = 0;
        }
      },
    }
  }

</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

</style>
