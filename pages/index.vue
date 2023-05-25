<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <div class="start-page-container">
      <div class="block"></div>
      <div class="block"></div>
      <div class="content-container">
        <TitleBig title="Finde DEINEN Wein!" />
        <router-link to="/Tasteprofile/Sour" class="start-page-link red-button">Geschmacksprofil erstellen</router-link>
        <router-link to="/Winemenu" class="start-page-link">Weiter zu Weinkarte</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/Titles/AppHeader.vue';
import TitleBig from '~/components/Titles/TitleBig.vue';

export default {
  name: 'index',
  components: {
    AppHeader,
    TitleBig,
  }
}
</script>

<style>

body, html {
  height: 100%;
  margin: 0;
  padding: 0;
  background-image: url("/background/glaswein.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.start-page-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: left;
  height: 100%;
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  width: 60%;
  max-width: 900px;
  margin: 0 auto;
}

.block {
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 31vh;
  overflow: auto;
}


.start-page-link {
  font-family: sans-serif;
  margin-top: 15px;
  color: white;
}

.red-button {
  background-color: #781449;
  color: white;
  border-radius: 15px;
  padding: 10px 20px;
  text-decoration: none; 
}


.AppHeader {
  text-align: center;
}
</style>
