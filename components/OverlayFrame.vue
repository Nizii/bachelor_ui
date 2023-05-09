<template>
    <div class="overlay-frame" @touchstart="onTouchStart" @touchend="onTouchEnd">
      <div class="frame-header">
        <h2>Essen</h2>
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
      onTouchStart(event) {
        this.startY = event.touches[0].clientY;
      },
      onTouchEnd(event) {
        this.endY = event.changedTouches[0].clientY;
        this.handleSwipe();
      },
      handleSwipe() {
        const threshold = 100;
  
        if (this.startY - this.endY > threshold) {
          this.$emit("close");
        }
      },
      showWinesForDish(dish) {
        this.selectedDish = dish;
      },
    },
    data() {
      return {
        startY: 0,
        endY: 0,
        selectedDish: '',
      };
    },
    computed: {
      filteredWines() {
        return this.wines.filter(wine => wine.match && wine.match.indexOf(this.selectedDish) !== -1);
      },
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
    height: 85%;
    background-color: lightgray;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    z-index: 1000;
  }
  
  .frame-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }

  .wine-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  h2 {
    margin: 0;
  }
  </style>
  