<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <Header />
    <MainTabbar />
    <div class="inputrow">
      <input type="text" class="search-input" placeholder="Suche" @input="onSearchInput" />
    </div>
    <div v-if="loading" style="text-align: center; margin: 20px;">Loading...</div>
    <div v-else>
      <WineHeader title="Weissweine" />
      <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
        <WineInfo :wine="wine" v-if="wine.winetype === 'Weisswein'" />
      </div>
      <WineHeader title="Rotweine" />
      <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
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
      wines: [],
      searchText: ''
    }
  },
  computed: {
    filteredWines() {
      if (!this.searchText) {
        return this.wines;
      }
      return this.wines.filter(wine =>
        wine.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  },
  methods: {
    onSearchInput(event) {
      this.searchText = event.target.value;
    }
  },
  async created() {
    try {
      const response = await axios.get('https://wine.azurewebsites.net/api/wine');
      this.wines = response.data;
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
.inputrow {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  height: 40px;
  margin-top: 10px;
}

.search-input {
  width: 100%;
  max-width: 90%;
  padding-left: 30px;
  padding-right: 30px;
  box-sizing: border-box;
  border-color: #592321;
  border-width: 4px;
  border-radius: 5px;
}

@media (min-width: 768px) {
  .search-input {
    max-width: 50%;
  }
}

</style>
