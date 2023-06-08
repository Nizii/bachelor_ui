<template>
  <div @click="$emit('click', wine)">
    <div class="wine-item">
      <div class="item-title">
        {{ wine.name.split(' ')[0] }}
      </div>
      <img class="wine-image-profile" :src=wine.link alt="Weinbild"/>
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
  justify-content: space-between;
  align-items: center;
  height: 260px; 
}

.item-title {
  
}

.wine-image-profile {
  width: 50px;
  object-fit: cover;
  margin-bottom: 0; 
}
</style>
