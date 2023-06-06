<template>
  <Taste 
    title="Magst du deinen Wein intensiv?" 
    nextRoute="/Tasteprofile/Fruity"
    preferenceKey="intensiv"
    previousRoute="/Tasteprofile/Sour"
    bgImage="/background/gewürze.png"
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
