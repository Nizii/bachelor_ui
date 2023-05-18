<template>
  <div class="fixed-bottom-bar">
    <button @click="navigateTo('/')" class="bottom-bar-link">
      <i class="fas fa-user"></i>
      <span class="bottom-bar-label">Menü</span>
    </button>
    <button @click="openBookmarkOverlay" class="bottom-bar-link">
      <i class="fas fa-user"></i>
      <span class="bottom-bar-label">Merkliste</span>
      <span v-if="bookmarkedWinesCount > 0" class="bookmark-badge">{{ bookmarkedWinesCount }}</span>
    </button>
    <button @click="navigateTo('/Login')" class="bottom-bar-link">
      <i class="fas fa-user"></i>
      <span class="bottom-bar-label">Profil</span>
    </button>
    <button v-if="isLoggedIn()" @click.prevent="logout" class="bottom-bar-link">
      <i class="fas fa-user"></i>
      <span class="bottom-bar-label">Abmelden</span>
    </button>
    <button v-else @click="navigateTo('/Login')" class="bottom-bar-link">
      <i class="fas fa-user"></i>
      <span class="bottom-bar-label">Anmelden</span>
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
    // Aktualisiert die Anzahl gemerkter Weine
    updateBookmarkedWinesCount() {
      this.bookmarkedWinesCount = JSON.parse(localStorage.getItem('bookmarkedWines')).length;
    },

    navigateTo(route) {
      this.$router.push(route);
    },

    openBookmarkOverlay() {
        this.frameOpen = true;
        setTimeout(() => {
          this.$emit('openBookmarkOverlay');
        }, 300);
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

  .bookmark-badge {
    position: absolute;
    top: auto;
    right: auto;
    bottom: 20px;
    left: 45%;
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