<template>
  <div class="button-group">
    <nuxt-link to="/" class="button button-1">Antipasti</nuxt-link>
    <nuxt-link to="/" class="button button-2">Salat</nuxt-link>
    <nuxt-link to="/" class="button button-3">Pizza</nuxt-link>
    <nuxt-link to="/" class="button button-4">Pasta</nuxt-link> 
    <nuxt-link to="/" class="button button-4">Fisch</nuxt-link> 
    <nuxt-link to="/" class="button button-4">Tiramisu</nuxt-link> 
    <nuxt-link to="/" class="button button-4">Panacota</nuxt-link> 
  </div>

  
</template>

<style scoped>
.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #104645;
  height: 50px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  overflow-x: auto; /* Hinzufügen von seitlichem Scroll */
  white-space: nowrap; /* Verhindert den Umbruch der Elemente */
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #b7b7b7;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  transition: color 0.3s;
}

.button:hover,
.button:focus {
  color: #d0d0d0; /* Dezente Farbe für Hover und Focus */
}


.button-1 span,
.button-2 span,
.button-3 span,
.button-4 span {
  font-size: 12px;
}

</style>