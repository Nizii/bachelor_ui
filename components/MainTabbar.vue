<template>
  <div class="button-group">
    <nuxt-link to="/YourTaste" :class="{ active: isActive('/YourTaste') }" class="button button-1">Für dich</nuxt-link>
    <nuxt-link to="/Food" :class="{ active: isActive('/Food') }" class="button button-2">Weisswein</nuxt-link>
    <nuxt-link to="/Foryou" :class="{ active: isActive('/Foryou') }" class="button button-3">Rosé</nuxt-link>
    <nuxt-link to="/About" :class="{ active: isActive('/About') }" class="button button-4">Rotwein</nuxt-link> 
  </div>
</template>

<script>
export default {
  methods: {
    isActive(route) {
      return this.$route.path === route;
    }
  }
};
</script>

<style scoped>
.button-group {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color:whitesmoke;
  height: 50px;
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
}

.button:hover,
.button:focus {
  color:black; 
  font-weight: bold;
}

.active {
  background-color: white;
  color:black;
  
}
</style>