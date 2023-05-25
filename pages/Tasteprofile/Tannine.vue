<template>
  <Taste 
    title="Magst du deinen Wein erdig?" 
    nextRoute="/Winemenu"
    preferenceKey="tannine"
    bgImage="/background/holz.jpg"
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
