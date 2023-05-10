<template>
  <h3 class="wine-header">{{ title }}</h3>
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
.wine-header {
  text-align: left;
  margin: 20px;
  font-family: sans-serif;
}

</style>
