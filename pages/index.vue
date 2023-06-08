<template>
  <div class="index-page" style="margin: 0; padding: 0; box-sizing: border-box;">
    <div class="start-page-container">
      <div class="block"></div>
      <div class="block"></div>
      <div class="content-container">
        <TitleBig title="Finde DEINEN Wein!" />
        <router-link to="/Tasteprofile/Sweet" class="start-page-link red-button">Geschmacksprofil erstellen</router-link>
        <router-link to="/Winemenu" class="start-page-link">Weiter zu Weinkarte</router-link>
      </div>
      <div class="block-2"></div>
    </div>
    <TutorialOverlay v-if="showTutorialOverlay" @close-tutorial="toggleShowTutorial"/>
  </div>
</template>

<script>
import TitleBig from '~/components/Titles/TitleBig.vue';
import TutorialOverlay from '~/components/Tutorial/TutorialOverlay.vue';

export default {
  name: 'index',
  components: {
    TitleBig,
    TutorialOverlay,
  },
  methods:{
    toggleShowTutorial() {
      this.showTutorialOverlay = false;
    }
  },
  data() {
    return {
      showTutorialOverlay: true,
    }
  }
}
</script>

<style scoped>

* {
  font-family: 'Semplicita', sans-serif;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

.index-page {
  height: 100%;
  width: 100%;
  margin: 0;
  background-image: url("/background/glaswein.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: 0px;
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
  height: 30vh;
}

.block {
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 25vh;
  overflow: auto;
}

.block-2 {
  display: flex; 
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 20vh;
  overflow: auto;
}


.start-page-link {
  margin-top: 15px;
  color: white;
}

.red-button {
  background-color: #660F0F;
  color: white;
  border-radius: 15px;
  padding: 10px 20px;
  text-decoration: none; 
}


.AppHeader {
  text-align: center;
}
</style>
