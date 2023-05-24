<template>
  <div>
    <div class="background-overlay" v-if="frameOpen" />
    <div class="overlay-frame" :class="{ open: frameOpen }">

    <div class="frame-header">
      <div></div>
      <TitleOverlay title="Filter Optionen" />
      <button class="close-button" @click="closeOverlay">
        <img :src="require('static/icons/buttons/close.png')" class="icon" alt="Bookmark icon" />  
      </button>
    </div>
      
    <button @click="openTab('food')" class=".button-overlay">Essen
      <!--<img :src="require('@/icons/buttons/nahrung.png')" class="icon-small" alt="Bookmark icon" />-->
    </button>
    <button @click="openTab('nation')" class=".button-overlay">Land</button>
    <button @click="openTab('grape')" class=".button-overlay">Traube</button>
    <button @click="openTab('character')" class=".button-overlay">Charakter</button>
    <button @click="openTab('')" class=".button-overlay">Preis</button>

    <FoodTabbar v-if="currentTab === 'food'" @show-wines="showWinesForFood" />
    <NationTabbar v-if="currentTab === 'nation'" @show-wines="showWinesForNation" />
    <GrapeTabbar v-if="currentTab === 'grape'" @show-wines="showWinesForGrape" />
    <CharacterTabbar v-if="currentTab === 'character'" @show-wines="showWinesForCharacter" />

    <div v-if="selectedTag !== ''">
      <div v-for="wine in displayedWines" :key="wine.id" style="margin: 20px;">
        <div class="wine-container" 
          v-if="wine.foodTags && wine.foodTags.indexOf(selectedTag) !== -1 ||
          wine.nationTag && wine.nationTag === selectedTag ||
          wine.characterTags && wine.characterTags.indexOf(selectedTag) !== -1||
          wine.grapeTags && wine.grapeTags.indexOf(selectedTag) !== -1">
          <!--<WineHeader :title="wine.winetype" id="overwritingParent"/>-->
          <WineInfo :wine="wine" wineType=wine.wineType @open-detail-view="pushToggleDetailViewWineToIndex" :matchType="selectedTag" />
        </div>
      </div>
    </div>

    </div>
  </div>
  </template>
  
  <script>
  import FoodTabbar from '~/components/Tabbars/FoodTabbar.vue';
  import NationTabbar from '~/components/Tabbars/NationTabbar.vue';
  import GrapeTabbar from '~/components/Tabbars/GrapeTabbar.vue';
  import CharacterTabbar from '~/components/Tabbars/CharacterTabbar.vue';
  import TitleOverlay from '~/components/Titles/TitleOverlay.vue';
  import WineInfo from '~/components/WineInfo.vue';
  
  export default {
    name: "Fillter",
    components: {
      FoodTabbar,
      CharacterTabbar,
      NationTabbar,
      GrapeTabbar,
      TitleOverlay,
      WineInfo,
    },

    props: {
      wines: {
        type: Array,
        required: true,
      },
    },

    methods: {
      showWinesForFood(dish) {
        this.selectedTag = dish;
        this.filterWines();
      },

      showWinesForNation(nation) {
        this.selectedTag = nation;
        this.filterWines();
      },

      showWinesForGrape(grape) {
        this.selectedTag = grape;
        this.filterWines();
      },

      showWinesForCharacter(character) {
        this.selectedTag = character;
        this.filterWines();
      },

      filterWines() {
        console.log("Selected Tag "+this.selectedTag);
        this.displayedWines = this.wines.filter(wine => {
          switch (this.currentTab) {
            case 'food':
              return this.selectedTag ? wine.foodTags && wine.foodTags.includes(this.selectedTag) : true;
            case 'nation':
              console.log(wine.nationTag + " === "+this.selectedTag)
              return this.selectedTag ? wine.nationTag === this.selectedTag : true;
            case 'grape':
              return this.selectedTag ? wine.grapeTags && wine.grapeTags.includes(this.selectedTag) : true;
            case 'character':
              return this.selectedTag ? wine.characterTags && wine.characterTags.includes(this.selectedTag) : true;
            default:
              return true;
          }
        });
        console.log("Displ Wines " + this.displayedWines.wine);
      },

      pushToggleDetailViewWineToIndex(wine) {
        this.$emit('open-detail-view', wine);
      },

      openTab(tabName) {
        console.log("Tabname " + tabName);
        this.currentTab = tabName;
        this.selectedTag = '';
        this.filterWines();
      },

      closeOverlay() {
        this.currentTab = null;
        this.frameOpen = false;
        document.body.style.overflow = 'auto'; // Erlaubt das Scrollen auf dem Body wieder
        setTimeout(() => {
          this.$emit('close');
        }, 300);
      }
    },

    data() {
      return {
        frameOpen: false,
        currentTab: null,
        selectedTag: '',
        displayedWines: [],
      };
    },

    mounted() {
      setTimeout(() => {
        this.frameOpen = true;
      }, 100); 
      document.body.style.overflow = 'hidden'; // Verhindert das Scrollen auf dem Body
    },
  };
  </script>
  
  <style>
  
  .button-overlay{
    color:white;
  }

  .button-group-overlay {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: white;
    height: 50px;
    margin: 20px;
    }

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
    z-index: 999;
    /* Hier wird die Overlay Animation gemacht*/
    transition:transform 0.5s;
    transform: translateY(100%);
    overflow-y: auto;
    padding-bottom: 3em;
    background-image: url("/background/weinflecke_rose.png");
    background-position: center 300px;
    background-repeat: repeat-y;
    background-attachment: scroll; 
  }
  

  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 998; /* Muss unbedingt kleiner als der z-index von overlay-frame sein */
  }

  .open {
    transform: translateY(0);
  }

  .frame-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    font-weight: bold;
    padding-left: 40px;
    padding-right: 20px;
    padding-top: 20px;
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
