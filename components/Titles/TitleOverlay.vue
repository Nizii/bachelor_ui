<template>
    <div class="overlay-title">
        {{title}}
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .overlay-title{
    color: black;
    font-size: 25px;
    font-weight: bold;
    font-family: sans-serif;
  }
  
  </style>
  