<template>
  <div>
    <div class="background-overlay" v-if="frameOpen" />
    <div class="overlay-frame" :class="{ open: frameOpen }">
      <div class="frame-header">
        <div></div>
        <h2>Merkliste</h2>
        <button class="close-button" @click="closeOverlay">X</button>
      </div>
      <!--
      <div class="wine-container" v-for="(wine, index) in bookmarkedWines" :key="index">
        <WineInfo :wine="wine"/>
      </div>
      -->

    </div>
  </div>
</template>
  
<script>
  import WineHeader from '~/components/WineHeader.vue';
  import WineInfo from '~/components/WineInfo.vue';
  
  export default {
    name: "Bookmarks",
    components: {
      WineHeader,
      WineInfo,
    },

    data() {
      return {
        frameOpen: false,
        bookmarkedWines: [],
      }
    },
    
    methods: {
      showWinesForDish(dish) {
        this.selectedDish = dish;
      },

      closeOverlay() {
        this.frameOpen = false;
        setTimeout(() => {
          this.$emit('close');
        }, 300);
      }
    },
    data() {
      return {
        frameOpen: false,
      };
    },

    mounted() {
      setTimeout(() => {
        this.frameOpen = true;
      }, 100); 
      //this.bookmarkedWines = JSON.parse(localStorage.getItem('bookmarkedWines')) || [];
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
    background-color: white;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    z-index: 1000;
    /* Hier wird die Overlay Animation gemacht*/
    transition:transform 0.5s;
    transform: translateY(100%);
  }

  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999; /* Muss unbedingt kleiner als der z-index von overlay-frame sein */
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
