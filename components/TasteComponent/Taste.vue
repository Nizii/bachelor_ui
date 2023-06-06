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
    <div class="button-container">
      <div class="back-button">
        <button class="button-style" @click="goBack(previousRoute)">
          Back
        </button>
      </div>
      <div class="info-container">
        <button class="button-style" @click="openPopup(preferenceKey)">
          Hilfe
        </button>
      </div>
    </div>
      <div class="block">
        <TitleBig :title="title" :fontSize="30" />
      </div>
      <div class="block"></div>
      <div class="block-content">
        <div class="slider-overlay">
          <Slider class="slider-class" ref="slider" @emit-value="setPreferenceAndNavigate" />
        </div>
        <button class="navigation-button" @click="startProcess()">
          Weiter
        </button>
      </div>
      <div class="block-bottom"></div>
      <TasteInfoPopup v-if="showInfo" :infoKey="preferenceKey" :show="showInfo" @close="showInfo = false" />
    </div>
  </div>
</template>

<script>
import TitleBig from '~/components/Titles/TitleBig.vue';
import TasteInfoPopup from '~/components/TasteComponent/TasteInfoPopup.vue';
import Slider from '~/components/TasteComponent/Slider.vue';
import axios from 'axios'; 

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
    previousRoute: {
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

    goBack(){
      this.$router.push(this.previousRoute);
    },

    setPreferenceAndNavigate(value) {
      
      this.preferences[this.preferenceKey] = parseInt(value);
      localStorage.setItem('preferences', JSON.stringify(this.preferences));
      
      if(this.preferenceKey === 'trocken') {
        let token = localStorage.getItem('jwt'); 
        if(token){
          let user = localStorage.getItem('user');
          console.log("User "+ user);
          let Tasteprofile = {
            Username: user, 
            Radarchart: Object.values(this.preferences)
          };
          axios.post('https://wine.azurewebsites.net/api/user/update-taste-profile', Tasteprofile, { headers: { Authorization: `Bearer ${token}` }})
          //axios.post('https://localhost:44322/api/user/update-taste-profile', Tasteprofile)
          .then(response => {
            console.log(response);
          }).catch(error => {
            console.error(error);
          });
        }
      }
      
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

  *{
    font-family: 'Soleil', sans-serif;
  }

  .block {
    height: 20vh;
    margin-left: 30px;
    margin-right: 30px;
    overflow: auto;
    text-align: center;
  }

  .block-content {
    height: 35vh;
    margin-left: 30px;
    margin-right: 30px;
    overflow: auto;
    text-align: center;
  }

  .block-bottom {
    height: 28vh;
    margin-left: 30px;
    margin-right: 30px;
    overflow: auto;
    text-align: center;
  }
   
  .navigation-button {
    background-color: #660F0F;
    color: white;
    border-radius: 8px;
    text-decoration: none; 
    color: white;
    text-align: center;
    margin: 20px;
    padding: 15px;
    width: 250px;
    margin-top: 30px;
    border: none;
  }
   
  .AppHeader {
    text-align: center;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    padding: 20px;
  }

  .button-style {
    background-color: #660F0F;
    color: white;
    border-radius: 8px;
    padding: 10px;
    width: 70px;
    border: none;
  }

  
  </style>
  