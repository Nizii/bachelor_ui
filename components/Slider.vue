<template>
    <div class="slider">
      <label>{{ label }}</label>
      <input type="range" min="1" max="10" v-model="value" />
      <span>{{ value }}</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: {
        type: Number,
        default: 1,
      },
      label: {
        type: String,
        required: true,
      },
    },
  }
  </script>
  
  <style scoped>
  .slider {
    display: flex;
    align-items: center;
    margin: 10px;
  }
  
  label {
    margin-right: 10px;
    font-size: 16px;
  }
  
  input[type="range"] {
    margin-right: 10px;
    width: 150px;
  }
  
  span {
    font-size: 16px;
  }
  </style>
  