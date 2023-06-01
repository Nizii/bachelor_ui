<template>
  <div>
    <div class="background-overlay" v-if="frameOpen" />
      <div class="overlay-frame" :class="{ open: frameOpen }">
        <div class="parent-container">

        <div class="filter-header">
          <button class="close-button" @click="resetFilters">
            Reset  
          </button>
          <TitleOverlay title="Filter Optionen" />
          <button class="close-button" @click="closeOverlay">
            <img :src="require('static/icons/buttons/go.png')" class="go-icon" alt="Bookmark icon" />  
          </button>
        </div>      
        
        <div class="main-container">
          <div class="filter-title">
            ESSEN
          </div>
          <div class="checkbox-container">
            <div @click="toggleDishCheckbox('Apéro')" :class="{ active: selectedDish.includes('Apéro') }" class="checkbox checkbox-1">
              <div class="food-content">
                Apéro
              </div>
              <img :src="require('static/icons/food/Kase.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Antipasti')" :class="{ active: selectedDish.includes('Antipasti') }" class="checkbox checkbox-1">
              <div class="food-content">
                Antipasti
              </div>
              <img :src="require('static/icons/food/Kase.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Salat')" :class="{ active: selectedDish.includes('Salat') }" class="checkbox checkbox-2">
              <div class="food-content">
                Salat
              </div>
              <img :src="require('static/icons/food/Salat.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Helles Fleisch')" :class="{ active: selectedDish.includes('Helles Fleisch') }" class="checkbox checkbox-1">
              <div class="food-content">
                Helles Fleisch
              </div>
              <img :src="require('static/icons/food/Kase.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Rotes Fleisch')" :class="{ active: selectedDish.includes('Rotes Fleisch') }" class="checkbox checkbox-2">
              <div class="food-content">
                Rotes Fleisch
              </div>
              <img :src="require('static/icons/food/Salat.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Fisch')" :class="{ active: selectedDish.includes('Fisch') }" class="checkbox checkbox-1">
              <div class="food-content">
                Fisch
              </div>
              <img :src="require('static/icons/food/Fisch.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Käse')" :class="{ active: selectedDish.includes('Käse') }" class="checkbox checkbox-2">
              <div class="food-content">
                Käse
              </div>
              <img :src="require('static/icons/food/Kase.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Tofu')" :class="{ active: selectedDish.includes('Tofu') }" class="checkbox checkbox-1">
              <div class="food-content">
                Tofu
              </div>
              <img :src="require('static/icons/food/Kase.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Tapas')" :class="{ active: selectedDish.includes('Tapas') }" class="checkbox checkbox-2">
              <div class="food-content">
                Tapas
              </div>
              <img :src="require('static/icons/food/Salat.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Pizza')" :class="{ active: selectedDish.includes('Pizza') }" class="checkbox checkbox-1">
              <div class="food-content">
                Pizza
              </div>
              <img :src="require('static/icons/food/Pizza.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleDishCheckbox('Pasta')" :class="{ active: selectedDish.includes('Pasta') }" class="checkbox checkbox-2">
              <div class="food-content">
                Pasta
              </div>
              <img :src="require('static/icons/food/Pasta.png')" class="icon" alt="Profile icon" />
            </div>
          </div>

          <div class="filter-title">
            PREIS
          </div>
          <div class="checkbox-container">
            <div class="filter-slider">
              <input type="range" min="1" max="100" v-model="selectedPrice" />
              <div>CHF {{ selectedPrice }}</div>
            </div>
          </div>

          <div class="filter-title">
            LÄNDER
          </div>
          <div class="checkbox-container">
            <div @click="toggleNationCheckbox('Schweiz')" :class="{ active: selectedNation.includes('Schweiz') }" class="checkbox checkbox-1">
              <img :src="require('static/icons/nations/Schweiz.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleNationCheckbox('Italien')" :class="{ active: selectedNation.includes('Italien') }" class="checkbox checkbox-2">
              <img :src="require('static/icons/nations/Italien.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleNationCheckbox('Spanien')" :class="{ active: selectedNation.includes('Spanien') }" class="checkbox checkbox-1">
              <img :src="require('static/icons/nations/Spanien.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleNationCheckbox('Frankreich')" :class="{ active: selectedNation.includes('Frankreich') }" class="checkbox checkbox-2">
              <img :src="require('static/icons/nations/Frankreich.png')" class="icon" alt="Profile icon" />
            </div>
            <div @click="toggleNationCheckbox('Österreich')" :class="{ active: selectedNation.includes('Österreich') }" class="checkbox checkbox-2">
              <img :src="require('static/icons/nations/Österreich.png')" class="icon" alt="Profile icon" />
            </div>
          </div>

          <div class="filter-title">
            TRAUBEN
          </div>
          <div class="checkbox-container">
            <div @click="toggleGrapeCheckbox('Sylvaner')" :class="{ active: selectedGrape.includes('Sylvaner') }" class="checkbox checkbox-1">Sylvaner</div>
            <div @click="toggleGrapeCheckbox('Chasselas')" :class="{ active: selectedGrape.includes('Chasselas') }" class="checkbox checkbox-2">Chasselas</div>
            <div @click="toggleGrapeCheckbox('Fendant')" :class="{ active: selectedGrape.includes('Fendant') }" class="checkbox checkbox-1">Fendant</div>
            <div @click="toggleGrapeCheckbox('Heida Paien')" :class="{ active: selectedGrape.includes('Heida Paien') }" class="checkbox checkbox-2">Heida Païen</div>
            <div @click="toggleGrapeCheckbox('Pinot Noir')" :class="{ active: selectedGrape.includes('Pinot Noir') }" class="checkbox checkbox-1">Pinot Noir</div>
            <div @click="toggleGrapeCheckbox('Gamaret Garanoir')" :class="{ active: selectedGrape.includes('Gamaret Garanoir') }" class="checkbox checkbox-2">Gamaret Garanoir</div>
            <div @click="toggleGrapeCheckbox('Negroamaro')" :class="{ active: selectedGrape.includes('Negroamaro') }" class="checkbox checkbox-1">Negroamaro</div>
            <div @click="toggleGrapeCheckbox('Cabernet Sauvignon')" :class="{ active: selectedGrape.includes('Cabernet Sauvignon') }" class="checkbox checkbox-2">Cabernet Sauvignon</div>
            <div @click="toggleGrapeCheckbox('Primitivo')" :class="{ active: selectedGrape.includes('Primitivo') }" class="checkbox checkbox-1">Primitivo</div>
            <div @click="toggleGrapeCheckbox('Blaufränkisch')" :class="{ active: selectedGrape.includes('Blaufränkisch') }" class="checkbox checkbox-2">Blaufränkisch</div>
            <div @click="toggleGrapeCheckbox('Corvina')" :class="{ active: selectedGrape.includes('Corvina') }" class="checkbox checkbox-1">Corvina</div>
            <div @click="toggleGrapeCheckbox('Arneis')" :class="{ active: selectedGrape.includes('Arneis') }" class="checkbox checkbox-2">Arneis</div>
            <div @click="toggleGrapeCheckbox('Trebbiano')" :class="{ active: selectedGrape.includes('Trebbiano') }" class="checkbox checkbox-1">Trebbiano</div>
            <div @click="toggleGrapeCheckbox('Gewürztraminer')" :class="{ active: selectedGrape.includes('Gewürztraminer') }" class="checkbox checkbox-2">Gewürztraminer</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitleOverlay from '~/components/Titles/TitleOverlay.vue';

export default {
  name: "Fillter",
  components: {
    TitleOverlay,
  },

  props: {
    wines: {
      type: Array,
      required: true,
    },
  },

  methods: {
    toggleDishCheckbox(dish) {
      const index = this.selectedDish.indexOf(dish);
      if (index > -1) {
        this.selectedDish.splice(index, 1);
      } else {
        this.selectedDish.push(dish);
      }
    },

    resetFilters() {
      this.selectedDish = [];
      this.selectedNation = [];
      this.selectedGrape = [];
      this.selectedCharacter = [];
      this.selectedPrice = 100;
      this.updateFilters();
    },

    toggleNationCheckbox(nation) {
      const index = this.selectedNation.indexOf(nation);
      if (index > -1) {
        this.selectedNation.splice(index, 1);
      } else {
        this.selectedNation.push(nation);
      }
    },

    toggleGrapeCheckbox(grape) {
      const index = this.selectedGrape.indexOf(grape);
      if (index > -1) {
        this.selectedGrape.splice(index, 1);
      } else {
        this.selectedGrape.push(grape);
      }
    },

    toggleCharacterCheckbox(character) {
      const index = this.selectedCharacter.indexOf(character);
      if (index > -1) {
        this.selectedCharacter.splice(index, 1);
      } else {
        this.selectedCharacter.push(character);
      }
    },

    closeOverlay() {
      this.currentTab = null;
      this.frameOpen = false;
      document.body.style.overflow = 'auto'; // Erlaubt das Scrollen auf dem Body wieder
      setTimeout(() => {
        this.updateFilters();
        this.$emit('close');
      }, 300);
    },

    updateFilters() {
      const filters = {
        dish: this.selectedDish,
        nation: this.selectedNation,
        grape: this.selectedGrape,
        character: this.selectedCharacter,
        price: this.selectedPrice,
      };
      this.$emit('filters-selected', filters);
    },
  },

  data() {
    return {
      frameOpen: false,
      currentTab: null,
      selectedDish: [],
      selectedNation: [],
      selectedGrape: [],
      selectedCharacter: [],
      selectedPrice: 100, 
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

.go-icon{
  width: 40px;
  height: 40px;
}

.filter-slider {
  width: 100%;
}

.filter-slider input[type="range"] {
  width: 100%;
  background-color: #791545; 
}


.filter-title{
  font-weight: bold;
  margin-bottom: 8px;
}

.active {
  background-color: #a1a1a1;
  padding: 10px;
  border-radius: 10px;
}

.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-x: auto;

}

.checkbox-container {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scroll-padding: 20px;
  scroll-snap-type: x mandatory;
  width: 100%;
  margin-bottom: 35px;
}

.checkbox {
  flex: 0 0 auto;
  scroll-snap-align: start;
  margin-right: 20px;
  text-align: center;
  padding: 10px;
}

.parent-container{
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 30px;
}

.overlay-frame {
  z-index: 999;
  /* Hier wird die Overlay Animation gemacht*/
  transition: transform 0.5s;
  transform: translateY(100%);
  overflow-y: auto;
  padding-bottom: 3em;
  /*background-image: url("/background/weinflecke_rose.png");*/
  background-position: center 300px;
  background-repeat: repeat-y;
  background-attachment: scroll;
  background-color: white;
  background-image: none;
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 998;
}

.open {
  transform: translateY(0);
}

.filter-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(214, 214, 214);
  margin-bottom: 3em;
  font-weight: bold;
  position: sticky;
  top: 0;
  z-index: 1001; 
  background-color: white; 
  padding-top: 15px;
}

</style>
