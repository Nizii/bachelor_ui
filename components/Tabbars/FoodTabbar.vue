<template>
  <div class="button-group">
    <button @click="showWinesForDish('Antipasti')" :class="{ active: selectedDish === 'Antipasti' }" class="button button-1">Antipasti
      <img :src="require('@/icons/food/Kase.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForDish('Salat')" :class="{ active: selectedDish === 'Salat' }" class="button button-2">Salat
      <img :src="require('@/icons/food/Salat.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForDish('Pizza')" :class="{ active: selectedDish === 'Pizza' }" class="button button-3">Pizza
      <img :src="require('@/icons/food/Pizza.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForDish('Pasta')" :class="{ active: selectedDish === 'Pasta' }" class="button button-4">Pasta
      <img :src="require('@/icons/food/Pasta.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForDish('Fisch')" :class="{ active: selectedDish === 'Fisch' }" class="button button-4">Fisch
      <img :src="require('@/icons/food/Fisch.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForDish('Tiramisu')" :class="{ active: selectedDish === 'Tiramisu' }" class="button button-4">Tiramisu
      <img :src="require('@/icons/food/Fisch.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForDish('Panna Cotta')" :class="{ active: selectedDish === 'Panna Cotta' }" class="button button-4">Panna Cotta
      <img :src="require('@/icons/food/Fisch.png')" class="icon" alt="Profile icon" />
    </button>
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