<template>
  <div class="fixed-bottom-bar">
    <!-- Menü Button -->
    <button @click="navigateTo('/Winemenu', 'Winemenu')" class="bottom-bar-link">
      <img v-if="!isWinemenu" :src="require('@/icons/buttons/karte.png')" class="icon" alt="Menu icon" />
      <img v-else :src="require('@/icons/buttons/karte_an.png')" class="icon" alt="Menu icon" />
      <!--<span class="bottom-bar-label">Menü</span>-->
    </button>

    <!-- Merkliste Button -->
    <button @click="toggleBookmarkOverlay('Bookmark')" class="bottom-bar-link">
      <img v-if="!isBookmark" :src="require('@/icons/buttons/merkliste.png')" class="icon" alt="Bookmark icon" />
      <img v-else :src="require('@/icons/buttons/merkliste_an.png')" class="icon" alt="Bookmark icon" />
      <!--<span class="bottom-bar-label">Merkliste</span>-->
      <span v-if="bookmarkedWinesCount > 0" class="bookmark-badge">{{ bookmarkedWinesCount }}</span>
    </button>

    <!-- Profil Button -->
    <button @click="openLogin('Profile')" class="bottom-bar-link">
      <img v-if="!isProfile" :src="require('@/icons/buttons/profil.png')" class="icon" alt="Profile icon" />
      <img v-else :src="require('@/icons/buttons/profil_an.png')" class="icon" alt="Profile icon" />
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
      isWinemenu: false,
      isBookmark: false,
      isProfile: false, 
    }
  },

  mounted() {
    this.bookmarkedWinesCount = (JSON.parse(localStorage.getItem('bookmarkedWines')) || []).length;
    console.log("Here "+ this.bookmarkedWinesCount);
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

    navigateTo(route, input) {
      if(this.isProfile) this.$emit('toggle-login');
      if(this.isBookmark) this.$emit('toggle-Bookmark-Overlay');
      this.$emit('reset-filters');
      this.toggleMenuButtons(input);
      this.$router.push(route);
    },

    toggleBookmarkOverlay(input) {
      if(this.isBookmark) return;
      if(this.isProfile) this.$emit('toggle-login');
      this.toggleMenuButtons(input);
      this.frameOpen = true;
      setTimeout(() => {
        this.$emit('toggle-Bookmark-Overlay');
      }, 300);
    },

    openLogin(input) {
      if(this.isProfile) return;
      if(this.isBookmark) this.$emit('toggle-Bookmark-Overlay');
      this.toggleMenuButtons(input);
      this.$emit('toggle-login');
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