<template>
  <div class="button-group">
    <button @click="showWinesForGrape('Sylvaner')" class="button button-1">Sylvaner</button>
    <button @click="showWinesForGrape('Chasselas')" class="button button-2">Chasselas</button>
    <button @click="showWinesForGrape('Fendant')" class="button button-3">Fendant</button>
    <button @click="showWinesForGrape('Heida Paien')"  class="button button-4">Heida Païen</button>
    <button @click="showWinesForGrape('Savagnin Blanc')"  class="button button-5">Savagnin Blanc</button>
    <button @click="showWinesForGrape('Pinot Noir')" class="button button-6">Pinot Noir</button>
    <button @click="showWinesForGrape('Merlot')" class="button button-7">Merlot</button>
    <button @click="showWinesForGrape('Gamaret')" class="button button-8">Gamaret</button>
    <button @click="showWinesForGrape('Garanoir')" class="button button-9">Garanoir</button>
    <button @click="showWinesForGrape('Cabaret Dorsa')" class="button button-10">Cabaret Dorsa</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedGrape: '',
    };
  },
  methods: {
    showWinesForGrape(grape) {
      this.selectedGrape = grape;
      this.$emit('show-wines', grape);
    },
  },
};
</script>

<style scoped>

.button-group::-webkit-scrollbar {
  display: none;
}
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

</style>