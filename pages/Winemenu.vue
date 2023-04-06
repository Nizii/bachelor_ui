<template>
  <div>
    <Header />
    <div v-if="loading" style="text-align: center; margin: 20px;">Loading...</div>
    <div v-else>
      <h1 style="text-align: center; margin: 20px;">Weissweine</h1>
      <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
        <div v-if="wine.winetype === 'Weisswein'" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
          <h3 style="text-align: center;">{{ wine.name }}</h3>
          <div class="wine-attribute">Traube: {{ wine.grape }}</div>
          <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
          <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
          <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
          <div class="wine-price">{{ wine.bottleprice}} .- / 0.75 l</div>
        </div>
      </div>
      <h1 style="text-align: center; margin: 20px;">Rotweine</h1>
      <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
        <div v-if="wine.winetype === 'Rotwein'" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
          <h3 style="text-align: center;">{{ wine.name }}</h3>
          <div class="wine-attribute">Traube: {{ wine.grape }}</div>
          <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
          <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
          <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
          <div class="wine-price">{{ wine.bottleprice}} .- / 0.75 l</div>
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
      loading: true,
      wines: []
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
  }
}
</script>
