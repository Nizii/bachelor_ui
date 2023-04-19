<template>
    <button class="button" :class="'button-' + buttonNumber" @click="toggleWines(buttonNumber)">
      <slot></slot>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      buttonNumber: {
        type: Number,
        required: true,
      },
    },
    methods: {
      toggleWines(buttonNumber) {
        this.$emit('toggle-wines', buttonNumber);
      },
    },
  };
  </script>

  <style scoped>

  </style>