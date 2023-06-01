<template>
  <div @click="$emit('click', wine)">
    <div class="wine-item">
      <img class="wine-image" :src=wine.link alt="Weinbild" width="30px" height="130px" />
    </div>
  </div>
</template>
  
<script>
  export default {
    name: "CellarItem",
    props:{
      wine:{
        type: Object,
        required: true,
      },
    }
  };
</script>
  
<style scoped>

</style>
  