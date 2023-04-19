<template>
  <div class="fixed-bottom-bar">
    <router-link to="/Login" class="bottom-bar-link" :class="{ 'active': activeTab === 'Favoriten' }">
      <i class="fas fa-user"></i>
      <span class="bottom-bar-label">Mein Weinkeller</span>
    </router-link>
    <router-link to="/Login" class="bottom-bar-link" :class="{ 'active': activeTab === 'Profile' }">
      <i class="fas fa-user"></i>
      <span class="bottom-bar-label">Statistik</span>
    </router-link>
    <a v-if="isLoggedIn()" href="#" class="bottom-bar-link" @click.prevent="logout" :class="{ 'active': activeTab === 'Abmelden' }">
      <i class="fas fa-user"></i>
      <span class="bottom-bar-label">Abmelden</span>
    </a>
    <router-link v-else to="/Login" class="bottom-bar-link" :class="{ 'active': activeTab === 'Anmelden' }">
      <i class="fas fa-user"></i>
      <span class="bottom-bar-label">Anmelden</span>
    </router-link>
  </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'home',
      }
    },

    methods: {
      logout() {
        localStorage.removeItem('jwt');
        console.log(localStorage.getItem('jwt'))
        this.$router.push('/');
      },
      isLoggedIn() {
        return localStorage.getItem('jwt') !== null;
      }
    }
  };
  </script>
  
  <style scoped>
 .fixed-bottom-bar {
  display: flex;
  justify-content: flex-start; /* Ändert die Ausrichtung auf linksbündig */
  align-items: center;
  background-color: #592321;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.2);
}

.bottom-bar-link {
  flex: 1; /* Setzt die Breite auf 100% */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #b7b7b7;
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

  .button:hover,
  .button:focus {
    color: #d0d0d0; /* Dezente Farbe für Hover und Focus */
  }

  </style>