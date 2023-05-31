<template>
  <div class="button-group">
    <button @click="showWinesForNation('Schweiz')" class="button button-1">Schweiz
      <img :src="require('static/icons/nations/Schweiz.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForNation('Italien')" class="button button-2">Italien
    <img :src="require('static/icons/nations/Italien.png')" class="icon" alt="Profile icon" />
      </button>
    <button @click="showWinesForNation('Frankreich')" class="button button-3">Frankreich
      <img :src="require('static/icons/nations/Frankreich.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForNation('Spanien')" class="button button-4">Spanien
      <img :src="require('static/icons/nations/Spanien.png')" class="icon" alt="Profile icon" />
    </button>
    <button @click="showWinesForNation('Österreich')" class="button button-5">Österreich
      <img :src="require('static/icons/nations/Österreich.png')" class="icon" alt="Profile icon" />
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