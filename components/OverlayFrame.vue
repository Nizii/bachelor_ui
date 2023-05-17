<template>
  <div class="overlay-frame" :class="{ open: frameOpen }">

    <div class="frame-header">
      <div></div>
      <WineHeader title="Filter Optionen" />
      <button class="close-button" @click="closeOverlay">X</button>
    </div>
      
    <div class="button-group">
      <button @click="openTab('food')" class="button">Essen</button>
      <button @click="openTab('nation')" class="button">Land</button>
      <button @click="openTab('grape')" class="button">Traube</button>
      <button @click="openTab('character')" class="button">Charakter</button>
    </div>

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
          <WineInfo :wine="wine" wineType=wine.wineType :matchType="selectedTag" />
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
  import WineHeader from '~/components/WineHeader.vue';
  import WineInfo from '~/components/WineInfo.vue';
  
  export default {
    name: "OverlayFrame",
    components: {
      FoodTabbar,
      CharacterTabbar,
      NationTabbar,
      GrapeTabbar,
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

      openTab(tabName) {
        this.currentTab = tabName;
        this.selectedTag = '';
        this.filterWines();
        document.body.style.overflow = 'hidden'; // Verhindert das Scrollen auf dem Body
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
      console.log(this.wines);
      setTimeout(() => {
        this.frameOpen = true;
      }, 100); 
    },
  };
  </script>
  
  <style scoped>

  .button-group {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: whitesmoke;
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
    overflow-y: auto;

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
