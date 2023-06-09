<template>
  <div class="big-bold-white-title" :style="{ fontSize: fontSize + 'px' }">
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
    fontSize: {
      type: Number,
      required: false,
      default: 20, 
    },
  },
};
</script>

<style scoped>
*{
  font-family: 'Soleil', sans-serif;
}
.big-bold-white-title {
  color: white;
  font-weight: bold;
  font-size: 50px;
}

</style>
