<template>
  <Taste 
    title="Wie süss magst du es?" 
    nextRoute="/Tasteprofile/Sour"
    preferenceKey="suss"
    previousRoute="/"
    bgImage="/background/suss.jpg"
  />
</template>

<script>
import Taste from '~/components/TasteComponent/Taste.vue';

export default {
  components: {
    Taste,
  },
}
</script>

<style scoped>
*{
  font-family: 'Semplicita', sans-serif;
}
</style>