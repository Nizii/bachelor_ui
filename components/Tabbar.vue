<template>
    <div class="fixed-bottom-bar">
      <router-link to="/" class="bottom-bar-link" :class="{ 'active': activeTab === 'Start' }">
        <i class="fas fa-home"></i>
        <span class="bottom-bar-label">Start</span>
      </router-link>
      <router-link to="/login" class="bottom-bar-link" :class="{ 'active': activeTab === 'Favoriten' }">
        <i class="fas fa-user"></i>
        <span class="bottom-bar-label">Favoriten</span>
      </router-link>
      <router-link to="/login" class="bottom-bar-link" :class="{ 'active': activeTab === 'Profile' }">
        <i class="fas fa-user"></i>
        <span class="bottom-bar-label">Profil</span>
      </router-link>
      <router-link to="/" class="bottom-bar-link" @click.prevent="logout" :class="{ 'active': activeTab === 'Abmelden' }">
        <i class="fas fa-user"></i>
        <span class="bottom-bar-label">Abmelden</span>
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
        this.$router.push('/');
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
  </style>