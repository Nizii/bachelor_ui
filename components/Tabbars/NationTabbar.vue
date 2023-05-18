<template>
  <div class="button-group">
    <button @click="showWinesForNation('Schweiz')" class="button button-1">Schweiz</button>
    <button @click="showWinesForNation('Italien')" class="button button-2">Italien</button>
    <button @click="showWinesForNation('Frankreich')" class="button button-3">Frankreich</button>
    <button @click="showWinesForNation('Spanien')" class="button button-3">Spanien</button>
    <button @click="showWinesForNation('Usa')"  class="button button-4">Usa</button>
    <button @click="showWinesForNation('Australien')"  class="button button-4">Australien</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedNation: '',
    };
  },
  methods: {
    showWinesForNation(nation) {
      this.selectedNation = nation;
      this.$emit('show-wines', nation);
    },
  },
};
</script>

<style scoped>
@import "@/CSS/shared-tabbar-styles.css";
</style>