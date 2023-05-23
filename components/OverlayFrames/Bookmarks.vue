<template>
  <div>
    <div class="background-overlay" v-if="frameOpen" />
    <div class="overlay-frame" :class="{ open: frameOpen }">
      <div class="frame-header">
        <div></div>
        <TitleOverlay title="Merkliste" />
        <button class="close-button" @click="closeOverlay">
          <img :src="require('@/icons/buttons/close.png')" class="icon" alt="Bookmark icon" />         </button>
      </div>
      <div class="wine-container" v-for="(wine, index) in bookmarkedWines" :key="index">
        <button id="bookmarks-delete-button" @click="removeFromBookmarks(index)">
          <img :src="require('@/icons/buttons/close.png')" class="icon" alt="Bookmark icon" />         </button>
        </button>
        <WineInfo :wine="wine"/>
      </div>
    </div>
  </div>
</template>
  
<script>
  import TitleOverlay from '~/components/Titles/TitleOverlay.vue';
  import WineInfo from '~/components/WineInfo.vue';
  
  export default {
    name: "Bookmarks",
    components: {
      TitleOverlay,
      WineInfo,
},

    data() {
      return {
        frameOpen: false,
        bookmarkedWines: [],
      }
    },
    
    methods: {
      closeOverlay() {
        this.frameOpen = false;
        setTimeout(() => { this.$emit('close'); }, 300);
      },

      removeFromBookmarks(index) {
        this.bookmarkedWines.splice(index, 1);
        localStorage.setItem('bookmarkedWines', JSON.stringify(this.bookmarkedWines));
        this.$emit('bookmark-removed');
      },
    },

    mounted() {
      setTimeout(() => {
        this.frameOpen = true;
      }, 100); 
      this.bookmarkedWines = JSON.parse(localStorage.getItem('bookmarkedWines')) || [];
    },
  };
  </script>
  
  <style>
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
    padding-left: 1em;
    padding-right: 1em;
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
