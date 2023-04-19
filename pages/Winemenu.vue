<template>
  <div>
    <Header />
    <MainTabbar />
    <div v-if="loading" style="text-align: center; margin: 20px;">Loading...</div>
    <div v-else>
      <WineHeader title="Weissweine" />
      <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
        <WineInfo :wine="wine" v-if="wine.winetype === 'Weisswein'" />
      </div>
      <WineHeader title="Rotweine" />
      <div v-for="wine in wines" :key="wine.id" style="margin: 20px;">
        <WineInfo :wine="wine" v-if="wine.winetype === 'Rotwein'" />      
      </div>
    </div>
    <Tabbar />
  </div>
</template>


<script>
import Header from '~/components/Header.vue';
import WineInfo from '~/components/WineInfo.vue';
import WineHeader from '~/components/WineHeader.vue';
import MainTabbar from '~/components/MainTabbar.vue';
import axios from 'axios';

export default {
  name: 'WineList',
  components: {
    Header,
    WineInfo,
    WineHeader,
    MainTabbar
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
