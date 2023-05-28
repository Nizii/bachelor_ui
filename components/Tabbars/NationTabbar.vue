<template>
  <div class="button-group">
    <button @click="showWinesForNation('Schweiz')" class="button button-1">Schweiz
      <img :src="require('static/icons/nations/schweiz.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForNation('Italien')" class="button button-2">Italien
    <img :src="require('static/icons/nations/italien.png')" class="icon" alt="Profile icon" />
      </button>
    <button @click="showWinesForNation('Frankreich')" class="button button-3">Frankreich
      <img :src="require('static/icons/nations/frankreich.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForNation('Spanien')" class="button button-3">Spanien
      <img :src="require('static/icons/nations/spanien.png')" class="icon" alt="Profile icon" />
    </button>
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