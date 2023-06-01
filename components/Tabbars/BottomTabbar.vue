<template>
  <div class="fixed-bottom-bar">
    <!-- Menü Button -->
    <button @click="pressWinemenu('/Winemenu', 'Winemenu')" class="bottom-bar-link">
      <img v-if="!isWinemenu" :src="require('static/icons/buttons/karte.svg')" class="icon" alt="Menu icon" />
      <img v-else :src="require('static/icons/buttons/karte_an.svg')" class="icon" alt="Menu icon" />
      <!--<span class="bottom-bar-label">Menü</span>-->
    </button>

    <!-- Merkliste Button -->
    <button @click="pressBookmark('Bookmark')" class="bottom-bar-link">
      <img v-if="!isBookmark" :src="require('static/icons/buttons/merkliste.svg')" class="icon" alt="Bookmark icon" />
      <img v-else :src="require('static/icons/buttons/merkliste_an.svg')" class="icon" alt="Bookmark icon" />
      <!--<span class="bottom-bar-label">Merkliste</span>-->
      <span v-if="bookmarkedWinesCount > 0" class="bookmark-badge">{{ bookmarkedWinesCount }}</span>
    </button>

    <!-- Profil Button -->
    <button @click="pressProfile('Profile')" class="bottom-bar-link">
      <img v-if="!isProfile" :src="require('static/icons/buttons/Profil.svg')" class="icon" alt="Profile icon" />
      <img v-else :src="require('static/icons/buttons/Profil_an.svg')" class="icon" alt="Profile icon" />
      <!--<span class="bottom-bar-label">Profil</span>-->
    </button>
  </div>
</template>



<script>
export default {
  data() {
    return {
      activeTab: 'home',
      bookmarkedWinesCount: (JSON.parse(localStorage.getItem('bookmarkedWines')) || []).length,
      loggedIn: this.isLoggedIn(),
      isWinemenu: true,
      isBookmark: false,
      isProfile: false, 
    }
  },

  mounted() {
    this.bookmarkedWinesCount = (JSON.parse(localStorage.getItem('bookmarkedWines')) || []).length;
  },

  // Observiert bookmarkedWinesCount und loggedIn ob sich der Wert ändert
  watch: {
    bookmarkedWinesCount: {
      handler() {
        this.updateBookmarkedWinesCount();
      },
      deep: true,
    },

    loggedIn: {
      handler() {
        this.loggedIn = this.isLoggedIn();
      },
      deep: true,
    },
  },

  methods: {

    toggleMenuButtons(input) {
      switch(input) {
        case 'Winemenu':
          this.isWinemenu = true;
          this.isBookmark = false;
          this.isProfile = false;
        break;
        case 'Bookmark':
          this.isWinemenu = false;
          this.isBookmark = true;
          this.isProfile = false;
        break;
        case 'Profile':
          this.isWinemenu = false;
          this.isBookmark = false;
          this.isProfile = true;
        break;
      }
    },

    // Aktualisiert die Anzahl gemerkter Weine
    updateBookmarkedWinesCount() {
      this.bookmarkedWinesCount = JSON.parse(localStorage.getItem('bookmarkedWines')).length;
    },

    pressWinemenu(route, input) {
      this.$emit('login-and-profile-false');

      if(this.isBookmark){
        this.$emit('bookmark-false');
      }
      this.toggleMenuButtons(input);
      this.$router.push(route);
      this.$emit('reset-filters');
    },

    pressBookmark(input) {
      if(this.isProfile){
        this.$emit('profile-false');
        this.$emit('login-false');
      }
      this.toggleMenuButtons(input);
      this.frameOpen = true;
      setTimeout(() => {
        this.$emit('bookmark-true');
      }, 300);
    },

    pressProfile(input) {
      if(this.isProfile) return;
      if(this.isBookmark){
        this.$emit('bookmark-false');
      }
      this.toggleMenuButtons(input);
      this.$emit('close-detailview');
      if(this.isLoggedIn()) {
        this.$emit('profile-true');
      } else {
        this.$emit('login-true');
      }
    },

    logout() {
      localStorage.removeItem('jwt');
      this.loggedIn = false;
      this.$router.push('/');
    },

    isLoggedIn() {
      return localStorage.getItem('jwt') !== null;
    }
  }

};
</script>

  
  <style scoped>

  button{
    border:none;
  } 

  *{
    font-family: sans-serif;
  }

.icon {
  width: 24px;
  height: 24px;
  fill: #333;
}

  .bookmark-badge {
    position: absolute;
    top: auto;
    right: auto;
    bottom: 28px;
    left: 50%;
    background-color: red;
    color: white;
    border-radius: 50%;
    padding: 2px 5px;
    font-size: 10px;
}

 .fixed-bottom-bar {
  display: flex;
  justify-content: flex-start; /* Ändert die Ausrichtung auf linksbündig */
  align-items: center;
  background-color: #F5F5F5;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 1000;
}

.bottom-bar-link {
  flex: 1; /* Setzt die Breite auf 100% */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  height: 100%;
}
  .bottom-bar-link.active {
    color: #ffffff; /* Farbe für aktive Registerkarte */
  }
  
  .bottom-bar-link i {
    font-size: 22px;
    margin-bottom: 4px;
  }
  
  .bottom-bar-label {
    font-size: 12px;
  }
  .bottom-bar-link:hover,
  .bottom-bar-link:focus {
    color:black; 
    font-weight: bold;
  }

  </style>