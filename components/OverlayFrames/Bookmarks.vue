<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <div class="background-overlay" v-if="frameOpen" />
    <div class="overlay-frame" :class="{ open: frameOpen }">
      <div class="frame-header">
        <div></div>
        <TitleOverlay title="Merkliste" />
        <button class="close-button" @click="closeOverlay">
          <img :src="require('static/icons/buttons/closebutton_merkliste.svg')" class="closebutton-icon" alt="Bookmark icon" />         
        </button>
      </div>
      <div class="wine-container" v-for="(wine, index) in bookmarkedWines" :key="index">
        <WineInfo :wine="wine" :isBookmark="true" @remove-wine-element="removeFromBookmarks(index)" />
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
        document.body.style.overflow = 'auto'; 
        this.$emit('close-button-pressed');
      },

      removeFromBookmarks(index) {
        this.bookmarkedWines.splice(index, 1);
        localStorage.setItem('bookmarkedWines', JSON.stringify(this.bookmarkedWines));
        this.$emit('bookmark-removed');
      },
    },

    mounted() {
      document.body.style.overflow = 'hidden'; 
      setTimeout(() => {
        this.frameOpen = true;
      }, 100); 
      this.bookmarkedWines = JSON.parse(localStorage.getItem('bookmarkedWines')) || [];
    },
  };
  </script>
  
  <style scoped>

  @import "@/CSS/shared-overlay-styles.css";

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

  .closebutton-icon{
    width: 50px;
    height: 50;
  }

  .overlay-frame-bookmark {
    z-index: 1000;
    transition:transform 0.5s;
    transform: translateY(100%);
    padding-left: 2em;
    padding-right: 1em;
  }

  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
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
    position: sticky;
    top: 0;
    z-index: 1001; 
    background-color: white; 
    position: sticky;
    border-bottom: 1px solid rgb(214, 214, 214);
  }

  .wine-container {
    margin: 15px;
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
