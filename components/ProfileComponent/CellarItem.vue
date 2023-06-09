<template>
  <div @click="$emit('click', wine)">
    <div class="wine-item">
      <div class="item-title">
        <!--Zeigt nur das erste Wort im Namen an-->
        {{ wine.name.split(' ')[0] }}
      </div>
      <img class="wine-image-profile" :src=wine.link2 alt="Weinbild"/>
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

.wine-image-profile {
  width: 50px;
  object-fit: cover;
  margin-bottom: 0; 
}
</style>
