<template>
  <div class="main-container" style="margin: 0; padding: 0; box-sizing: border-box;">
    <Profile v-if="showProfile && !showLogin" @logout="navigateToWinemenu" />
    <Login v-else-if="showLogin" @login-succeed="navigateToProfileAfterLogin()" />
    <div v-else-if="!showLogin && !showProfile">
        <div class="top-section">
          <div class="button-group">
            <button @click="filterWines('Rotwein')" class="header-button">Rotwein</button>
            <button @click="filterWines('Weisswein')" class="header-button">Weisswein</button>
            <button @click="filterWines('Rose')" class="header-button">Rosé</button>
            <button @click="pushToTasteprofile()" class="header-button">Your Taste</button>
          </div>
          <div class="inputrow">
            <input type="text" class="search-input" @input="onSearchInput">
            <button class="toggle-btn" @click="toggleShowFoodOverlay">
              <img :src="require('static/icons/buttons/fillter2.png')" class="icon" alt="Filter icon" />
            </button>
          </div>
        </div>
        <div v-if="loading" class="loading" style="text-align: center; margin: 20px;">
          Loading...
        </div>
        <div v-else>
          <div class="sort-container">
            <button @click="sortWinesByPrice" class="sort-button">Preis
              <img :src="require('static/icons/buttons/sort.png')" class="sort-icon" alt="Bookmark icon" />  
            </button>
            <button @click="sortWinesByMatch" class="sort-button">Match
              <img :src="require('static/icons/buttons/sort.png')" class="sort-icon" alt="Bookmark icon" />  
            </button>
          </div>
          <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
            <div v-if="wine.winetype === 'Weisswein'">
              <WineInfo :wine="wine" :userData="userData" 
              @open-detail-view="toggleDetailViewWine" 
              @bookmark-removed="updateBookmarkedWinesCount" />    
            </div>
            <div v-if="wine.winetype === 'Rotwein'">
              <WineInfo :wine="wine" :userData="userData" 
              @open-detail-view="toggleDetailViewWine"
              @bookmark-removed="updateBookmarkedWinesCount" />      
            </div>
            <div v-if="wine.winetype === 'Rose'">
              <WineInfo :wine="wine" :userData="userData" 
              @open-detail-view="toggleDetailViewWine"
              @bookmark-removed="updateBookmarkedWinesCount" /> 
            </div>
          </div>
        </div>
        <div class="bottom-placeholder">
        </div>

        <FilterView v-if="showFoodOverlay" 
          @close="toggleShowFoodOverlay" 
          @open-detail-view="toggleDetailViewWine" 
          @filters-selected="onFilterSelected" 
          :wines="wines" />
      

        <Bookmarks v-if="showBookmarksOverlay" 
          @close="setBookmarkFalse" 
          @close-button-pressed="closeBookmarkPressed"
          @bookmark-removed="updateBookmarkedWinesCount"
          ref="bookmark" />

        <DetailWineView v-if="showDetailWineView" :wine="selectedWine" 
          @close="toggleDetailViewWine" 
          @bookmark-removed="updateBookmarkedWinesCount" />

      </div>
      <BottomTabbar 
        @login-and-profile-false="setLogginAndProfileFalse"
        @bookmark-true="setBookmarkTrue" 
        @bookmark-false="setBookmarkFalse" 
        @close-bookmark-frame="closeBookmarkFrame" 
        @profile-true="setProfileTrue" 
        @login-true="setLoginTrue" 
        @profile-false="setProfileFalse" 
        @login-false="setLoginFalse" 
        @reset-filters="resetFilters"
        ref="bottomTabbar" />
  </div>
</template>

<script>
import AppHeader from '~/components/Titles/AppHeader.vue';
import WineInfo from '~/components/WineInfo.vue';
import axios from 'axios';
import FilterView from '~/components/OverlayFrames/FilterView.vue';
import Bookmarks from '~/components/OverlayFrames/Bookmarks.vue';
import DetailWineView from '~/components/OverlayFrames/DetailWineView.vue';
import BottomTabbar from '~/components/Tabbars/BottomTabbar.vue';
import Login from '~/components/Login.vue';
import Profile from '~/components/ProfileComponent/Profile.vue';

export default {
  name: 'WineList',
  components: {
    AppHeader,
    WineInfo,
    FilterView,
    Bookmarks,
    DetailWineView,
    BottomTabbar,
    Login,
    Profile,
  },
  data() {
    return {
      loading: true,
      searchText: '',
      showFoodOverlay: false,
      showProfile: false,
      showLogin: false,
      showBookmarksOverlay: false,
      userData: null,
      selectedWine: null,
      showDetailWineView: false,
      matchedAttributes:[],
      preferences: JSON.parse(localStorage.getItem('preferences')),
      sortByPriceAscending: true,
      sortByMatchAscending: true,

      wines: [],
      filteredWines: [],
      filters: {
        dish: [],
        nation: [],
        grape: [],
        character: [],
        price: 100,
      },
    }
  },
  computed: {
    hasStoredPreferences() {
      const savedPreferences = localStorage.getItem('preferences');
      if (savedPreferences) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    onFilterSelected(filters) {
      this.filters = filters;
      this.filterWines();
    },

    sortWinesByPrice() {
      this.sortByPriceAscending = !this.sortByPriceAscending;

      if (this.sortByPriceAscending) {
        this.filteredWines.sort((a, b) => a.openprice - b.openprice);
      } else {
        this.filteredWines.sort((a, b) => b.openprice - a.openprice);
      }
    },

    sortWinesByMatch() {
      this.sortByMatchAscending = !this.sortByMatchAscending;

      if (this.sortByMatchAscending) {
        this.filteredWines.sort((a, b) => a.rating - b.rating);
      } else {
        this.filteredWines.sort((a, b) => b.rating - a.rating);
      }
    },

    filterWines(wineType) {
      let filteredWines = this.wines;

      if (wineType === 'Rotwein') {
        filteredWines = filteredWines.filter(wine => wine.winetype === 'Rotwein');
      } else if (wineType === 'Weisswein') {
        filteredWines = filteredWines.filter(wine => wine.winetype === 'Weisswein');
      } else if (wineType === 'Rose') {
        filteredWines = filteredWines.filter(wine => wine.winetype === 'Rose');
      }

      if (this.filters.dish.length > 0) {
        filteredWines = filteredWines.filter(wine => {
          return this.filters.dish.some(dish => wine.foodTags.includes(dish));
        });
      }

      if (this.filters.nation.length > 0) {
        filteredWines = filteredWines.filter(wine => {
          return this.filters.nation.includes(wine.nationTag);
        });
      }

      if (this.filters.grape.length > 0) {
        filteredWines = filteredWines.filter(wine => {
          return this.filters.grape.some(grape => wine.grapeTags.includes(grape));
        });
      }

      if (this.filters.character.length > 0) {
        filteredWines = filteredWines.filter(wine => {
          return this.filters.character.includes(wine.profile);
        });
      }

      if (this.searchText) {
        filteredWines = filteredWines.filter(wine =>
          wine.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          wine.winetype.toLowerCase().includes(this.searchText.toLowerCase())
        );
      }

      if (this.filters.price) {
        const priceFilter = Number(this.filters.price);
        filteredWines = filteredWines.filter(wine => wine.bottleprice <= priceFilter);
      }

      this.filteredWines = filteredWines;
    },


    resetFilters() {
      this.searchText = '';
      this.filters = {
        dish: [],
        nation: [],
        grape: [],
        character: [],
        price: 100,
      };
      this.filterWines();
    },

    updateBookmarkedWinesCount() {
      this.$refs.bottomTabbar.updateBookmarkedWinesCount();
    },

    closeBookmarkFrame() {
      if (this.showBookmarksOverlay) {
        this.$refs.bookmark.closeOverlay();
      }
    },

    onSearchInput(event) {
      this.searchText = event.target.value;
      this.filterWines();
    },

    hasWineType(winetype) {
      return this.filteredWines.some(wine => wine.winetype === winetype);
    },

    toggleShowBookmarksOverlay() {
      this.showBookmarksOverlay = !this.showBookmarksOverlay;
    },

    setBookmarkFalse(){
      this.showBookmarksOverlay = false;
    },

    setBookmarkTrue(){
      this.showBookmarksOverlay = true;
    },

    setLogginAndProfileFalse(){
      this.showProfile = false;
      this.showLogin = false;
    },

    closeBookmarkPressed() {
      this.$refs.bottomTabbar.toggleMenuButtons('Winemenu');
    },

    toggleShowFoodOverlay() {
      this.showFoodOverlay = !this.showFoodOverlay;
    },

    setProfileTrue() {
      this.showProfile = true;
    },

    setLoginTrue() {
      this.showLogin = true;
    },

    setProfileFalse() {
      this.showProfile = false;
    },

    setLoginFalse() {
      this.showLogin = false;
    },

    navigateToProfileAfterLogin() {
      this.showProfile = true;
      this.showLogin = false;
    },

    navigateToWinemenu() {
      this.$refs.bottomTabbar.pressWinemenu('/Winemenu', 'Winemenu');
    },

    toggleDetailViewWine(wine) {
      this.selectedWine = wine;
      this.showDetailWineView = !this.showDetailWineView;
    },

    pushToTasteprofile() {
      this.$router.push('/Tasteprofile/Sweet');
    },

    /**
   * Berechnet die Übereinstimmung zwischen einem Benutzerprofil und einem Weinprofil.
   * Dieser Algorithmus verwendet das Konzept der euklidischen Distanz
   *
   * @param userProfile - Ein Array von fünf Zahlen, die das Geschmacksprofil des Benutzers darstellen.
   * @param wineProfile - Ein Array von fünf Zahlen, die das Geschmacksprofil des Weins darstellen.
   *
   * @return {number} - Rückgabe als Protzentzahl
   */
    // Eine Funktion, die die Übereinstimmung zwischen dem Geschmacksprofil eines Benutzers und eines Weins berechnet
    calculateMatch(userProfile, wineProfile) {
    // Eine Variable, um die Gesamtdifferenz zwischen den Profilen zu speichern
      var totalDifference = 0;
      // Eine Schleife, die durch jedes Element in den Profilen geht
      for (var i = 0; i < userProfile.length; i++) {
          // Finde den Unterschied zwischen den entsprechenden Elementen in den Profilen
          var difference = userProfile[i] - wineProfile[i];
          // Quadriere den Unterschied, um negative Werte zu vermeiden und Unterschiede stärker zu gewichten
          // Bsp mit quadrierung  5-1 = 4 -> 4^2 = 16
          // BSp ohne quadrierung 5-1 = 4 ->     =  4 

          // Bsp mit quadrierung  3-1 = 2 -> 4^2 =  4
          // Bsp ohne quadrierung 3-1 = 2 ->     =  2 
          var squaredDifference = difference * difference;
          // Addiere die quadratische Differenz zur Gesamtdifferenz
          totalDifference += squaredDifference;
      }
      // Die "Distanz" zwischen den Profilen ist die Quadratwurzel der Gesamtdifferenz
      var distance = Math.sqrt(totalDifference);
      // Die maximale mögliche Distanz ist die Quadratwurzel von 500 (weil es 5 Merkmale gibt und jedes Merkmal von 0 bis 10 reicht)
      var maxDistance = Math.sqrt(5 * 5 * 10);
      // Die Übereinstimmung ist 100% minus das Verhältnis der Distanz zur maximalen Distanz
      var match = (1 - distance / maxDistance) * 100;
      return Math.round(match);

    },

    assignRatingsToWines(userProfile) {
      // Gehe durch jeden Wein in der Liste
      for (var j = 0; j < this.wines.length; j++) {
          // Hole das Geschmacksprofil des aktuellen Weins
          var wineProfile = this.wines[j].radarchart;
          
          // Berechne die Übereinstimmung für den aktuellen Wein
          var match = this.calculateMatch(userProfile, wineProfile);
          
          // Weise dem aktuellen Wein seinen Übereinstimmungsprozentsatz zu
          this.wines[j].rating = match;
      }
    },
  },

  mounted() {
    this.$refs.bottomTabbar.toggleMenuButtons('Winemenu');
  },

  async created() {
    try {
      const WineDataResponse = await axios.get('https://wine.azurewebsites.net/api/wine');
      //const WineDataResponse = await axios.get('https://localhost:44322/api/wine');
      this.wines = WineDataResponse.data;
      this.loading = false; 

      const token = localStorage.getItem('jwt');
      if (token) {
        const userDataResponse = await this.$axios.get(`https://wine.azurewebsites.net/api/user/userdata/`, {
        //const userDataResponse = await axios.get(`https://localhost:44322/api/user/userdata/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          },
        });
        console.log(userDataResponse.data);
        this.userData = userDataResponse.data;      
        if (!this.userData || !this.userData.radarchart) {
          console.log("Kein User");
          let savedPreferences = {
            suss: 0,
            sauer: 0,
            intensiv: 0,
            fruchtig: 0,
            holzig: 0,
            trocken: 0,
          };
          localStorage.setItem('savedPreferences', JSON.stringify(savedPreferences));

        } else {
          console.log("User vorhanden");
          let savedPreferences = {
            suss: this.userData.radarchart[0],
            sauer: this.userData.radarchart[1],
            intensiv: this.userData.radarchart[2],
            fruchtig: this.userData.radarchart[3],
            holzig: this.userData.radarchart[4],
            trocken: this.userData.radarchart[5],
          };
          localStorage.setItem('savedPreferences', JSON.stringify(savedPreferences));
          
          this.preferences = JSON.parse(localStorage.getItem('preferences'));

          if (this.wines.length > 0 && this.preferences && this.userData.radarchart[0] === 0) {
            console.log("Taste aus Frontend");
            this.assignRatingsToWines([
              this.preferences.suss,
              this.preferences.sauer,
              this.preferences.intensiv,
              this.preferences.fruchtig,
              this.preferences.holzig,
              this.preferences.trocken,
            ]);
          } else if (this.userData.radarchart[0] !== 0) {
            console.log("Taste aus DB");
            this.assignRatingsToWines([
              this.userData.radarchart[0],
              this.userData.radarchart[1],
              this.userData.radarchart[2],
              this.userData.radarchart[3],
              this.userData.radarchart[4],
              this.userData.radarchart[5],
            ]);
          } else {
            console.log("Taste Berechnung nicht möglich");
          }
        }

      } else {
        if(this.wines.length > 0 && this.preferences) {
            console.log("Taste aus Frontend");
            this.assignRatingsToWines([
              this.preferences.suss,
              this.preferences.sauer,
              this.preferences.intensiv,
              this.preferences.fruchtig,
              this.preferences.holzig,
              this.preferences.trocken,
            ]);
          }
      }


      this.filterWines();
    } catch (error) {
      console.error(error);
    }
  }
}
</script>


<style>

* {
  margin: 0;
  padding: 0;
}

.sort-icon{
  width: 15px;
  height: 15px;
}

.loading{
  color: white;
  font-size: 15px;
  font-weight: bold;
}

.main-container {
  margin: 0;
  padding: 0;
  /*-moz-animation-duration: ;
  background-image: url("/background/weinfleck rot.png");
  background-position: center;
  background-repeat: repeat-y;
  */
  background-attachment: scroll; 
  box-sizing: border-box;
}

.top-section {
  background-color: #791545;
  padding-top: 10px;
  padding-bottom: 10px;
}

.inputrow {
  position: relative;
  display: flex;
  justify-content: center;
  height: 40px;
  margin: 10px;
}

.search-input {
  width: 100%;
  box-sizing: border-box;
  border: none;
  text-align: left;
  border-radius: 10px;
  margin-left: 15px;
  margin-right: 15px;
  background-image: url('static/icons/buttons/suche.svg');
  background-repeat: no-repeat;
  background-position: 5px 4px;
  background-size: 40px 40px;
  padding-left: 30px; 
}

.toggle-btn {
  position: absolute;
  right: 10px;
  margin-right: 20px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  margin-top:3px;
}

.sort-button{
  background-color: rgb(211, 211, 211);
  color: black;
  padding: 10px;
  border-radius: 10px;
  margin-left: 15px;
}

.sort-container{
  margin-right: 20px;
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  justify-content: flex-end;
}

.button-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #791545;
  height: 50px;
  margin: 20px;
}

.header-button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: #791545;
  text-decoration: none;
  height: 100%;
  width: 25%;
  box-sizing: border-box;
  transition: color 0.3s;
  font-size: 12px;
  border: none;
}

.button:hover,
.button:focus {
  color: white;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: white;
  text-decoration-thickness: 2px;
  text-decoration-offset: 5px;
}

.bottom-placeholder{
  height: 80px;
}


</style>
