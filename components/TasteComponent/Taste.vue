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
      </div>
      <div class="block">
        <Slider ref="slider" @emit-value="setPreferenceAndNavigate" />
        <button class="navigation-button" @click="startProcess()">
          Weiter
        </button>
        <div class="block">
        </div>
      </div>
      <TasteInfoPopup v-if="showInfo" :infoKey="preferenceKey" :show="showInfo" @close="showInfo = false" />
    </div>
  </div>
</template>

<script>
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
      value: 3,
      preferences: {
        suss: 0,
        sauer: 0,
        intensiv: 0,
        fruchtig: 0,
        holzig: 0,
        trocken: 0,
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
    
  },

  mounted(){
    this.$refs.slider.setTasteToSlider(this.preferenceKey);
  },

}
</script>

<style>  
  .block {
    height: 20vh;
    margin-left: 30px;
    margin-right: 30px;
    overflow: auto;
    text-align: center;
  }
   
  
  .navigation-button {
    background-color: #660F0F;
    color: white;
    border-radius: 10px;
    text-decoration: none; 
    color: white;
    text-align: center;
    margin:20px;
    padding: 15px;
    width: 250px;
    margin-top: 40px;
  }

  .help-button{
    background-color: #660F0F;
    color: white;
    border-radius: 10px;
    text-decoration: none; 
    color: white;
    text-align: center;
    margin:20px;
    padding: 10px;
    width: 70px;
  }
   
  .AppHeader {
    text-align: center;
  }
  </style>
  