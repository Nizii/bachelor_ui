<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <Header />
    <div class="inputrow">
      <input type="text" class="search-input" placeholder="Suche" @input="onSearchInput" />
      <button class="toggle-btn" @click="toggleFrame">Essen</button>
    </div>
    <OverlayFrame v-if="showFrame" @close="toggleFrame" :wines="wines" />
    <div class="button-group">
      <button @click="filterWines('all')" class="button">Für dich</button>
      <button @click="filterWines('Rotwein')" class="button">Rotwein</button>
      <button @click="filterWines('Weisswein')" class="button">Weisswein</button>
      <button @click="filterWines('Rosé')" class="button">Rosé</button>
    </div>
  <div v-if="loading" style="text-align: center; margin: 20px;">Loading...</div>
  <div v-else>
    <!--<WineHeader v-if="hasWineType('Weisswein')" title="Weissweine" />-->
    <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
      <div v-if="wine.winetype === 'Weisswein'">
        <WineInfo :wine="wine" :userData="userData" />      
      </div>
    </div>
    <!--<WineHeader v-if="hasWineType('Rotwein')" title="Rotweine" />-->
    <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
      <div v-if="wine.winetype === 'Rotwein'">
        <WineInfo :wine="wine" :userData="userData" />      
      </div>
    </div>
    <!--<WineHeader v-if="hasWineType('Rosé')" title="Rosé" />-->
    <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
      <div v-if="wine.winetype === 'Rosé'">
        <WineInfo :wine="wine" :userData="userData" />
      </div>
    </div>
  </div>
  <Tabbar />
</div>
</template>


<script>
import Header from '~/components/Header.vue';
import WineInfo from '~/components/WineInfo.vue'; // Import WineInfo component
import axios from 'axios';
import OverlayFrame from '~/components/OverlayFrame.vue';


export default {
name: 'WineList',
components: {
  Header,
  WineInfo,
  OverlayFrame,
},
data() {
  return {
    loading: true,
    wines: [],
    searchText: '',
    showFrame: false,
    userData: null,
  }
},
computed: {
  filteredWines() {
    if (!this.searchText) {
      return this.wines;
    }

    return this.wines.filter(wine =>
      wine.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      wine.winetype.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
},
methods: {
  onFavoriteUpdated() {
    this.loadWines(); 
  },

  onSearchInput(event) {
    this.searchText = event.target.value;
  },

  filterWines(filter) {
    if (filter === 'all') {
      this.searchText = '';
    } else {
      this.searchText = filter;
    }
  },

  hasWineType(winetype) {
    return this.filteredWines.some(wine => wine.winetype === winetype);
  },

  toggleFrame() {
    this.showFrame = !this.showFrame;
  },
},

async created() {
  try {
    const WineDataResponse = await axios.get('https://wine.azurewebsites.net/api/wine');
    //const response = await axios.get('https://wine.azurewebsites.net/api/wine');
    this.wines = WineDataResponse.data;
    this.loading = false;
    const token = localStorage.getItem('jwt');
    if (token) {
      const userDataResponse = await this.$axios.get(`https://wine.azurewebsites.net/api/user/userdata/`, {
      //const response = await this.$axios.get(`https://localhost:44322/api/user/userdata/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          },
        });
        this.userData = userDataResponse.data;
      }
  } catch (error) {
    console.error(error);
  }
}
}
</script>

<style scoped>
* {
font-family: sans-serif;
}
.inputrow {
display: flex;
justify-content: center;
height: 40px;
margin: 20px;
}
.search-input {
background-color: #D9D9D9;
width: 100%;
padding-left: 30px;
padding-right: 30px;
box-sizing: border-box;
border: none;
text-align: left;
}

.toggle-btn {
border: none;
}

.button-group {
display: flex;
justify-content: space-around;
align-items: center;
background-color: whitesmoke;
height: 50px;
margin: 20px;
}

.button {
display: flex;
justify-content: center;
align-items: center;
color: black;
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

.button:hover,
.button:focus {
color: black;
font-weight: bold;
text-decoration: underline;
text-decoration-color: black;
text-decoration-thickness: 2px;
text-decoration-offset: 5px;
}
</style>
