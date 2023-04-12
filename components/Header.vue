<template>
  <header>
    <div class="navigation">
      <button class="back-button" @click="goBack">
        Zurück
      </button>
      <router-link to="/Login" class="login-button">
        Profil
      </router-link>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #592321;
  color: #fff;
  padding: 20px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.back-button {
  background-color: #8b0000;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}

.login-button {
  background-color: #8b0000;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
}
</style>

<script>
export default {
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>
