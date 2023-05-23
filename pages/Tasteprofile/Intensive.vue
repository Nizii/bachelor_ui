<template>
  <Taste 
    title="Magst du deinen Wein intensiv?" 
    nextRoute="/Tasteprofile/Fruity"
    preferenceKey="intensiv"
    bgImage="/beeren.jpg"
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
