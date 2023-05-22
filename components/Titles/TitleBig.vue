<template>
  <div class="big-bold-white-title">
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
.big-bold-white-title {
  color: white;
  font-size: 25px;
  font-weight: bold;
  font-family: sans-serif;
}

</style>
