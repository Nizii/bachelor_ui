<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <div class="start-page-container" :style="{
      backgroundImage: `url(${bgImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      height: '100vh', 
      margin: '0', 
      padding: '0'}"
    >
      <div class="info-container">
        <button class="start-page-link red-button" @click="openPopup(preferenceKey)">
          Hilfe
        </button>  
      </div>
      <div class="block">
        <TitleBig :title="title" :fontSize="30" />
      </div>
      <div class="block"></div>
      <div class="content-container">
        <div class="button-container">
          <button class="start-page-link red-button" @click="setPreferenceAndNavigate(preferenceKey, true)">
            Ja
          </button>        
          <button class="start-page-link red-button" @click="setPreferenceAndNavigate(preferenceKey, false)">
            Nein
          </button>  
        </div>
      </div>
      <InfoPopUp v-if="showInfo" :infoKey="preferenceKey" :show="showInfo" @close="showInfo = false"/>
    </div>
  </div>
</template>
  
<script>
import AppHeader from '~/components/Titles/AppHeader.vue';
import TitleBig from '~/components/Titles/TitleBig.vue';
import InfoPopUp from '~/components/InfoPopup.vue';

export default {
  name: 'Taste',
  components: {
    TitleBig,
    InfoPopUp,
  },
  props: {
    title: {
      type: String,
      required: true
    },
    nextRoute: {
      type: String,
      required: true
    },
    preferenceKey: {
      type: String,
      required: true
    },
    bgImage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showInfo: false,
      preferences: {
        suss: false,
        sauer: false,
        intensiv: false,
        mild: false,
        fruchtig: false,
        erdig: false,
      },
    }
  },

  methods: {
    setPreferenceAndNavigate(preference, value) {
      this.preferences[preference] = value;
      localStorage.setItem('preferences', JSON.stringify(this.preferences));
      this.$router.push(this.nextRoute);
    }, 

    openPopup() {
      this.showInfo = true;
    }
  },

  created() {
    const storedPreferences = localStorage.getItem('preferences');
    if (storedPreferences) {
      this.preferences = JSON.parse(storedPreferences);
    } else {
      localStorage.setItem('preferences', JSON.stringify(this.preferences)); 
    }
  }
}
</script>

<style>

  .info-container{
    
  }
  
  .button-container{
    display: flex;
    justify-content: center;
    flex: wrap;
  }
  
  .taste-button{
    height: 50px;
    width: 50px;
    background-color: white;
    border-radius: 15px;
    margin: 25px;
  }
  
  .start-page-container {
    align-items: center;
    text-align: left;
    height: 100%;
  }
  
  .content-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    max-width: 900px;
    margin: 0 auto;
  }
  
  .block {
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 31vh;
    margin-left: 30px;
    margin-right: 30px;
    overflow: auto;
    text-align: center;
  }
   
  .start-page-link {
    font-family: sans-serif;
    color: white;
    text-align: center;
    margin:20px;
    width: 70px;
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
  