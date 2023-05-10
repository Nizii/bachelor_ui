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

.button-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #D9D9D9;
  height: 50px;
  overflow-x: auto; /* Scrollt seitlich yessss*/
  white-space: nowrap; 
  margin: 4px;
  padding-left: 40px;
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: #D9D9D9;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  transition: color 0.3s;
  border-radius: 10px;
  margin-left: 20px;
  border-style: none;
  font-size: 12px;
  
}

.button:hover,
.button:focus {
  color: black;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: black;
  text-decoration-thickness: 2px;
  text-decoration-offset: 5px;
}



.button-1 span,
.button-2 span,
.button-3 span,
.button-4 span {
  font-size: 12px;
}

.active {
  background-color: #D9D9D9;
  color: black;
}

</style>