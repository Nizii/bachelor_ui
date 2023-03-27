<template>
  <div class="button-group">
    <nuxt-link to="/Winemenu" class="button button-1">Weinkarte</nuxt-link>
    <nuxt-link to="/Food" class="button button-2">Weinvorschläge</nuxt-link>
    <nuxt-link to="/Undecided" class="button button-3">Unentschlossen</nuxt-link>
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
  margin: 10px;
  width: 250px;
  height: 100px;
  border-radius: 5px;
  border: none;
  font-size: 20px; /* vergrößern Sie die Schriftgröße */
  font-family: 'Arial', sans-serif; /* verwenden Sie eine schöne Schriftart */
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.button-1, .button-2 , .button-3 {
  background-color: #d9d9d9;
  color: black;
}
</style>
