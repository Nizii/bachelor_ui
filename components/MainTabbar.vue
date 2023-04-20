<template>
  <div class="button-group">
    <nuxt-link to="/Winemenu" :class="{ active: isActive('/Winemenu') }" class="button button-1">Weinkarte</nuxt-link>
    <nuxt-link to="/Food" :class="{ active: isActive('/Food') }" class="button button-2">Essen</nuxt-link>
    <nuxt-link to="/Foryou" :class="{ active: isActive('/Foryou') }" class="button button-3">Für dich</nuxt-link>
    <nuxt-link to="/About" :class="{ active: isActive('/About') }" class="button button-4">Über uns</nuxt-link> 
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
  background-color: #775d5b;
  height: 50px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b7b7b7;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  width: 25%;
  box-sizing: border-box;
  transition: color 0.3s;
  font-size: 12px;
}

.button:hover,
.button:focus {
  color: #d0d0d0; /* Dezente Farbe für Hover und Focus */
}

.active {
  background-color: #592321;
  color: white;
}
</style>