<template>
  <Taste class="taste"
    title="Magst du es sauer?" 
    nextRoute="/Tasteprofile/Intensive"
    preferenceKey="sauer"
    previousRoute="/Tasteprofile/Sweet"
    bgImage="/background/sauer.jpg"
  />
</template>

<script>
import Taste from '~/components/TasteComponent/Taste.vue';

export default {
  components: {
    Taste
  },
}
</script>

<style>
  .taste{
    background-image: none;
  }
</style>
