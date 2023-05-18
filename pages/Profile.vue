<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <Header />
    <WineHeader title="Deine Weine" />
    <div class="button-group">
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
    <WineHeader title="Statistiken" />
    <img class="wine-image" src="/stat.jpg" alt="Weinbild" width="200px" height="160px" margin="20px"/>
    <Fillter v-if="showFoodOverlay" @close="toggleShowFoodOverlay" :wines="wines" />
    <Bookmarks v-if="showBookmarksOverlay" @close="toggleShowBookmarksOverlay" @bookmark-removed="updateBookmarkedWinesCount" />
    <BottomTabbar @openBookmarkOverlay="toggleShowBookmarksOverlay" ref="bottomTabbar" />
    <DetailWineView v-if="showDetailWineView" :wine="selectedWine" @close="toggleDetailViewWine" @bookmark-removed="updateBookmarkedWinesCount" />
  </div>
</template>

<script>
import axios from 'axios';
import CellarItem from '~/components/CellarItem.vue';
import Header from '~/components/Header.vue';
import WineInfo from '~/components/WineInfo.vue';
import Fillter from '~/components/OverlayFrames/Fillter.vue';
import Bookmarks from '~/components/OverlayFrames/Bookmarks.vue';
import DetailWineView from '~/components/OverlayFrames/DetailWineView.vue';
import BottomTabbar from '~/components/Tabbars/BottomTabbar.vue';

export default {
  components: {
    Header,
    CellarItem,
    WineInfo,
    Fillter,
    Bookmarks,
    DetailWineView,
    BottomTabbar,
  },

  data() {
    return {
      userData: null,
      showFoodOverlay: false,
      showBookmarksOverlay: false,
      showDetailWineView: false,
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
          console.log("Userdata " + response.data);
          } catch (error) {
          console.error(error);
        }
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

<style scoped>
h1 {
  font-size: 48px;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
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

.wine-cellar {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 20px;
}

.regal {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  height: auto;
  background-color: white;
  border-bottom: 3px solid brown; /* Fügen Sie diese Zeile hinzu */
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