<template>
  <h1 class="wine-header">{{ title }}</h1>
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
  text-align: center;
  margin: 20px;
}

</style>
