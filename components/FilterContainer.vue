<template>
  <div class="overlay-frame" :class="{ open: filterFrameOpen }">
    <div class="frame-header">
        <div></div>
        <WineHeader title="Filter Optionen" />
        <button class="close-button" @click="closeFilter">X</button>
    </div>
    <div class="filter-buttons">
        <button class="filter-button" @click="applyFilter('price')">Nach Preis filtern</button>
        <button class="filter-button" @click="applyFilter('origin')">Nach Herkunft filtern</button>
        <button class="filter-button" @click="applyFilter('grape')">Nach Traubensorte filtern</button>
        <button class="filter-button" @click="applyFilter('year')">Nach Jahrgang filtern</button>
        <button class="filter-button" @click="applyFilter('alcoholContent')">Nach Alkoholgehalt filtern</button>
        <button class="filter-button" @click="applyFilter('character')">Nach Charakter filtern</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterFrameOpen: false,
      ascending: true,
    };
  },
  methods: {
    applyFilter(filterType) {
      this.$emit('apply-filter', filterType, this.ascending);
      this.ascending = !this.ascending;
      this.closeFilter();
    },
    closeFilter() {
      this.filterFrameOpen = false;
      setTimeout(() => {
        this.$emit('close');
      }, 300);
    },
  },
  mounted() {
    setTimeout(() => {
      this.filterFrameOpen = true;
    }, 100); 
  },
};
</script>

<style scoped>
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

h2 {
  margin: 0;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

.filter-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.filter-button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
}
</style>
