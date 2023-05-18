<template>
  <div class="button-group">
    <button @click="showWinesForCharacter('intensiv')" class="button button-1">intensiv</button>
    <button @click="showWinesForCharacter('fruchtig')" class="button button-2">fruchtig</button>
    <button @click="showWinesForCharacter('suss')" class="button button-3">süss</button>
    <button @click="showWinesForCharacter('exotisch')"  class="button button-4">exotisch</button>
    <button @click="showWinesForCharacter('saftig')"  class="button button-4">saftig</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedCharacter: '',
    };
  },
  methods: {
    showWinesForCharacter(character) {
      this.selectedCharacter = character;
      this.$emit('show-wines', character);
    },
  },
};
</script>

<style scoped>
@import "@/CSS/shared-tabbar-styles.css";
</style>