<template>
  <div class="button-group">
    <button @click="showWinesForDish('Antipasti')" :class="{ active: selectedDish === 'Antipasti' }" class="button button-1">Antipasti</button>
    <button @click="showWinesForDish('Salat')" :class="{ active: selectedDish === 'Salat' }" class="button button-2">Salat</button>
    <button @click="showWinesForDish('Pizza')" :class="{ active: selectedDish === 'Pizza' }" class="button button-3">Pizza</button>
    <button @click="showWinesForDish('Pasta')" :class="{ active: selectedDish === 'Pasta' }" class="button button-4">Pasta</button>
    <button @click="showWinesForDish('Fisch')" :class="{ active: selectedDish === 'Fisch' }" class="button button-4">Fisch</button>
    <button @click="showWinesForDish('Tiramisu')" :class="{ active: selectedDish === 'Tiramisu' }" class="button button-4">Tiramisu</button>
    <button @click="showWinesForDish('Panna Cotta')" :class="{ active: selectedDish === 'Panna Cotta' }" class="button button-4">Panna Cotta</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedDish: '',
    };
  },
  methods: {
    showWinesForDish(dish) {
      this.selectedDish = dish;
      this.$emit('show-wines', dish);
    },
  },
};
</script>
<style scoped>
@import "@/CSS/shared-tabbar-styles.css";
</style>