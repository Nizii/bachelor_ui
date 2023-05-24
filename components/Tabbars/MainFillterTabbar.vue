<template>
    <div class="button-group">
        <button @click="sendFillterEvent('food')" class=".button-overlay">Essen
            <!--<img :src="require('@/icons/buttons/nahrung.png')" class="icon-small" alt="Bookmark icon" />-->
          </button>
          <button @click="sendFillterEvent('nation')" class=".button-overlay">Land</button>
          <button @click="sendFillterEvent('grape')" class=".button-overlay">Traube</button>
          <button @click="sendFillterEvent('character')" class=".button-overlay">Charakter</button>
          <button @click="sendFillterEvent('')" class=".button-overlay">Preis</button>
    </div>
  </template>
  <script>
  export default {
    data() {
      return {

      };
    },
    methods: {
        sendFillterEvent(fillter) {
            this.$emit('fillter', fillter)
        }
    },
  };
  </script>
  
  <style scoped>
  @import "@/CSS/shared-tabbar-styles.css";
  </style>