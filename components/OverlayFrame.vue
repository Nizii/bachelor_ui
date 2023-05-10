<template>
  <div class="overlay-frame" :class="{ open: frameOpen }">
    <div class="frame-header">
        <div></div>
        <h2>Essen</h2>
        <button class="close-button" @click="closeOverlay">X</button>
      </div>
      <FoodTabbar @show-wines="showWinesForDish" />
      <div v-if="selectedDish !== ''">
        <p id="matchingTitle">Passend zu <span class="bold">{{ selectedDish }}</span></p>
        <div v-for="wine in filteredWines" :key="wine.id" style="margin: 20px;">
            <div class="wine-container">
                <WineHeader :title="wine.winetype" id="overwritingParent"/>
                <WineInfo v-if="wine.match && wine.match.indexOf(selectedDish) !== -1" :wine="wine" wineType="Rotwein" :matchType="selectedDish" />
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import FoodTabbar from '~/components/FoodTabbar.vue';
  import WineHeader from '~/components/WineHeader.vue';
  import WineInfo from '~/components/WineInfo.vue';
  
  export default {
    name: "OverlayFrame",
    components: {
      FoodTabbar,
      WineHeader,
      WineInfo,
    },
    props: {
      wines: {
        type: Array,
        required: true,
      },
    },
    methods: {
      showWinesForDish(dish) {
        this.selectedDish = dish;
      },
      closeOverlay() {
        this.$emit('close')
      },
      closeOverlay() {
        this.frameOpen = false;
        setTimeout(() => {
          this.$emit('close');
        }, 1000); /*Warten 1 ServiceWorker. bis Event ausgelöst wird*/
      }
    },
    data() {
      return {
        selectedDish: '',
        frameOpen: false,
      };
    },
    computed: {
      filteredWines() {
        return this.wines.filter(wine => wine.match && wine.match.indexOf(this.selectedDish) !== -1);
      },
    },
    mounted() {
      setTimeout(() => {
        this.frameOpen = true;
      }, 100); 
    },
  };
  </script>
  
  <style scoped>
  #overwritingParent{
    margin-left: 0; 
  }

  #matchingTitle {
    margin-left: 20px;
    margin-right: 20px;
  }

  .bold {
    font-weight: bold;
  }

  .overlay-frame {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 95%;
    background-color: lightgray;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    z-index: 1000;
    /* Hier wird die Overlay Animation gemacht*/
    transition:transform 0.5s;
    transform: translateY(100%);
  }

  .open {
    transform: translateY(0);
  }

  .frame-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 0 20px;
  }

  .wine-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  h2 {
    margin: 0;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>
