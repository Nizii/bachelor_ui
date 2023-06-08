<template>
  <div @click="$emit('click', wine)">
    <div class="wine-item">
      <div class="item-title">
        {{ wine.name.split(' ')[0] }}
      </div>
      <img class="wine-image-profile" :src=wine.link alt="Weinbild" width="30px" height="260px" />
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
.wine-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 260px; 
}

.item-title {
  margin-bottom: 10px; 
}

.wine-image-profile {
  object-fit: cover;
}
</style>