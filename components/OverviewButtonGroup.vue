<template>
  <div class="button-group">
    <nuxt-link to="/Winemenu" class="button button-1">Weinkarte</nuxt-link>
    <nuxt-link to="/Food" class="button button-2">Wein für Gerichte</nuxt-link>
    <nuxt-link to="/Events" class="button button-3">Wein für Anlässe</nuxt-link>
    <nuxt-link to="/CustomMenu" class="button button-4">Suche mit deinem Geschmacksprofil</nuxt-link>
  </div>
</template>

<style scoped>
.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.button {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 250px;
  height: 100px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.button-1, .button-2 , .button-3, .button-4 {
  background-color: #d9d9d9;
  color: black;
}

</style>
