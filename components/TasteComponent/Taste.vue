<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <div class="start-page-container" :style="{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
      margin: '0',
      padding: '0'
    }">
      <div class="info-container">
        <button class="help-button" @click="openPopup(preferenceKey)">
          Hilfe
        </button>
      </div>
      <div class="block">
        <TitleBig :title="title" :fontSize="30" />
      </div>
      <div class="block">
        <Slider ref="slider" @emit-value="setPreferenceAndNavigate" />
      </div>
      <div class="block">
        <button class="navigation-button" @click="startProcess()">
          Weiter
        </button>
      </div>
      <TasteInfoPopup v-if="showInfo" :infoKey="preferenceKey" :show="showInfo" @close="showInfo = false" />
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/Titles/AppHeader.vue';
import TitleBig from '~/components/Titles/TitleBig.vue';
import TasteInfoPopup from '~/components/TasteComponent/TasteInfoPopup.vue';
import Slider from '~/components/TasteComponent/Slider.vue';

export default {
  name: 'Taste',
  components: {
    TitleBig,
    TasteInfoPopup,
    Slider,
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
      value: 0,
      preferences: {
        suss: 0,
        sauer: 0,
        intensiv: 0,
        mild: 0,
        fruchtig: 0,
        erdig: 0,
      },
    }
  },

  methods: {
    startProcess() {
      this.$refs.slider.emitValue();
    },

    setPreferenceAndNavigate(value) {
      this.preferences[this.preferenceKey] = parseInt(value);
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
  .block {
    height: 31vh;
    margin-left: 30px;
    margin-right: 30px;
    overflow: auto;
    text-align: center;
  }
   
  
  .navigation-button {
    background-color: #781449;
    color: white;
    border-radius: 15px;
    text-decoration: none; 
    font-family: sans-serif;
    color: white;
    text-align: center;
    margin:20px;
    padding: 15px;
    width: 200px;
  }

  .help-button{
    background-color: #781449;
    color: white;
    border-radius: 15px;
    text-decoration: none; 
    font-family: sans-serif;
    color: white;
    text-align: center;
    margin:20px;
    padding: 20px;
    width: 70px;
  }
   
  .AppHeader {
    text-align: center;
  }
  </style>
  