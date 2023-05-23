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
.big-bold-white-title {
  /*color: #FF69B4;*/
  color: white;
  font-weight: bold;
  font-family: sans-serif;
}

</style>
