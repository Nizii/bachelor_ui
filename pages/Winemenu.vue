<template>
  <div class="main-container" style="margin: 0; padding: 0; box-sizing: border-box;">
      <Profile v-if="showProfile"/>
      <Login v-else-if ="showLogin" @login-succeed="navigateToProfile()" />
      <div v-else>
        <div class="top-section">
          <div class="button-group">
            <button @click="filterWines('Rotwein')" class="button">Rotwein</button>
            <button @click="filterWines('Weisswein')" class="button">Weisswein</button>
            <button @click="filterWines('Rosé')" class="button">Rosé</button>
            <button @click="pushToTasteprofile()" class="button">Your Taste</button>
          </div>
          <div class="inputrow">
            <input type="text" class="search-input" @input="onSearchInput">
            <button class="toggle-btn" @click="toggleShowFoodOverlay">
              <img :src="require('static/icons/buttons/filter.png')" class="icon" alt="Bookmark icon" />
            </button>
          </div>
        </div>
        <div v-if="loading" style="text-align: center; margin: 20px;">
          Loading...
        </div>
        <div v-else>
          <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
            <div v-if="wine.winetype === 'Weisswein'">
              <WineInfo :wine="wine" :userData="userData" 
              @open-detail-view="toggleDetailViewWine" 
              @bookmark-removed="updateBookmarkedWinesCount" />    
            </div>
          </div>
          <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
            <div v-if="wine.winetype === 'Rotwein'">
              <WineInfo :wine="wine" :userData="userData" 
              @open-detail-view="toggleDetailViewWine"
              @bookmark-removed="updateBookmarkedWinesCount" />      
            </div>
          </div>
          <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
            <div v-if="wine.winetype === 'Rosé'">
              <WineInfo :wine="wine" :userData="userData" 
              @open-detail-view="toggleDetailViewWine"
              @bookmark-removed="updateBookmarkedWinesCount" /> 
            </div>
          </div>
        </div>
        <div class="bottom-placeholder">
        </div>

        <Fillter v-if="showFoodOverlay" 
          @close="toggleShowFoodOverlay" 
          @open-detail-view="toggleDetailViewWine" :wines="wines" />

        <Bookmarks v-if="showBookmarksOverlay" 
          @close="toggleShowBookmarksOverlay" 
          @close-button-pressed="closeBookmarkPressed"
          @bookmark-removed="updateBookmarkedWinesCount"
          ref="bookmark" />

        <DetailWineView v-if="showDetailWineView" :wine="selectedWine" 
          @close="toggleDetailViewWine" 
          @bookmark-removed="updateBookmarkedWinesCount" />

      </div>
      <BottomTabbar 
        @toggle-Bookmark-Overlay="toggleShowBookmarksOverlay" 
        @close-bookmark-frame="closeBookmarkFrame" 
        @toggle-profile="toggleShowProfile" 
        @toggle-login="toggleShowLogin" 
        @reset-filters="resetFilters"
        ref="bottomTabbar" />
  </div>
</template>


<script>
import AppHeader from '~/components/Titles/AppHeader.vue';
import WineInfo from '~/components/WineInfo.vue';
import axios from 'axios';
import Fillter from '~/components/OverlayFrames/Fillter.vue';
import Bookmarks from '~/components/OverlayFrames/Bookmarks.vue';
import DetailWineView from '~/components/OverlayFrames/DetailWineView.vue';
import BottomTabbar from '~/components/Tabbars/BottomTabbar.vue';
import Login from '~/components/Login.vue';
import Profile from '~/components/Profile.vue';


export default {
name: 'WineList',
components: {
  AppHeader,
  WineInfo,
  Fillter,
  Bookmarks,
  DetailWineView,
  BottomTabbar,
  Login,
  Profile,
},
data() {
  return {
    loading: true,
    wines: [],
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
  },

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
  resetFilters() {
    this.searchText = '';
  },

  updateBookmarkedWinesCount() {
    this.$refs.bottomTabbar.updateBookmarkedWinesCount();
  },

  closeBookmarkFrame() {
    if(this.showBookmarksOverlay){
      this.$refs.bookmark.closeOverlay();
    }
  },

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

  toggleShowBookmarksOverlay() {
    this.showBookmarksOverlay = !this.showBookmarksOverlay;
  },

  closeBookmarkPressed() {
    this.$refs.bottomTabbar.toggleMenuButtons('Winemenu');
  },

  toggleShowFoodOverlay() {
    this.showFoodOverlay = !this.showFoodOverlay;
  },

  toggleShowProfile() {
    this.showProfile = !this.showProfile;
  },

  navigateToProfile() {
    this.showProfile = !this.showProfile;
    this.showLogin = !this.showLogin;
  },

  toggleShowLogin() {
    this.showLogin = !this.showLogin;
  },

  toggleDetailViewWine(wine) {
    this.selectedWine = wine;
    this.showDetailWineView = !this.showDetailWineView;
  },

  pushToTasteprofile() {
    this.$router.push('Tasteprofile/Sour');
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

        // Quadriere den Unterschied, um negative Werte zu vermeiden
        var squaredDifference = difference * difference;

        // Addiere die quadratische Differenz zur Gesamtdifferenz
        totalDifference += squaredDifference;
    }

    // Die "Distanz" zwischen den Profilen ist die Quadratwurzel der Gesamtdifferenz
    var distance = Math.sqrt(totalDifference);

    // Die maximale mögliche Distanz ist die Quadratwurzel von 500 (weil es 5 Merkmale gibt und jedes Merkmal von 0 bis 10 reicht)
    var maxDistance = Math.sqrt(5 * 10 * 10);

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

  calc() {

    /*
    this.wines.forEach(wine => wine.matchedAttributes = []);
    var match = 0;
    for (var j = 0; j < this.wines.length; j++) {
      console.log("Match "+match);
      for (var x = 0; x < this.wines[j].profile.length; x++) {
        if (this.preferences) {
          for (const [key, value] of Object.entries(this.preferences)) {
            if (Boolean(value) && key === this.wines[j].profile[x]) {
              match++;
              this.wines[j].matchedAttributes.push(key);
            }
          }
        }
      }
      if (match > 0) {
        this.wines[j].rating = 100 + ((match - this.wines[j].profile.length) * 10);
        //Berechnung anhand von Prozentsatz
        //this.wines[j].rating = (match / this.wines[j].profile.length) * 100;
      }

      if (this.wines[j].rating < 5) {
        this.wines[j].rating = 0;
        console.log("Müsste null  " + this.wines[j].rating);
      }

      match = 0;
    }
    */
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
      this.userData = userDataResponse.data;
    }
    if (this.wines.length > 0 && this.preferences) {
      this.assignRatingsToWines(
        [        
          this.preferences.suss,
          this.preferences.sauer,
          this.preferences.intensiv,
          this.preferences.fruchtig,
          this.preferences.tannine, 
        ]
      );
    } else {
      console.log("Matchberechnung nicht möglich");
    }
    
  } catch (error) {
    console.error(error);
  }
  }
}
</script>


<style>

body, html {
  margin: 0;
  padding: 0;
  background-image: url("/background/weinfleck rot.png");
  background-position: center;
  background-repeat: repeat-y;
  background-attachment: scroll; 
}

* {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

.main-container {
  margin: 0;
  box-sizing: border-box;
}

.top-section {
  background-color: #791545;
  padding: 20px;  /* Adjust as needed */
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
  background-image: url('static/icons/buttons/suche.png');
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

.button-group {
display: flex;
justify-content: space-around;
align-items: center;
background-color: #791545;
height: 50px;
margin: 20px;
}

.button {
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
font-family: sans-serif;
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
