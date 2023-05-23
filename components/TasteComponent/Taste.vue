<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <div class="start-page-container" :style="{
      backgroundImage: `url(${bgImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      height: '100vh', /* Hier wird die Höhe auf 100vh gesetzt */
      margin: '0', 
      padding: '0'}"
    >
      <div class="block">
        <TitleBig :title="title" :fontSize="30" />
      </div>
      <div class="block"></div>
      <div class="content-container">
        <div class="button-container">
          <router-link :to="nextRoute" class="start-page-link red-button" @click="setPreference(preferenceKey, true)">
            Ja
          </router-link>
          <router-link :to="nextRoute" class="start-page-link red-button" @click="setPreference(preferenceKey, false)">
            Nein
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import AppHeader from '~/components/Titles/AppHeader.vue';
  import TitleBig from '~/components/Titles/TitleBig.vue';
  
  export default {
    name: 'Taste',
    components: {
      AppHeader,
      TitleBig,
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
      setPreference(preference, value) {
        console.log("P: "+preference+" V: "+value)
        this.preferences[preference] = value;
        localStorage.setItem('preferences', JSON.stringify(this.preferences)); // Speichern der aktualisierten Präferenzen im LocalStorage
      }
    },
    created() {
      const storedPreferences = localStorage.getItem('preferences');
      if (storedPreferences) {
        this.preferences = JSON.parse(storedPreferences);
      } else {
        localStorage.setItem('preferences', JSON.stringify(this.preferences)); // Speichern der Standardpräferenzen im LocalStorage, falls sie noch nicht vorhanden sind
      }
}

  }
  </script>
  
  <style>
  
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
  }
  
  
  .start-page-link {
    font-family: sans-serif;
    margin-top: 15px;
    color: white;
    text-align: center;
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
  