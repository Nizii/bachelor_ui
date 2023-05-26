<template>
  <Taste 
    title="Magst du deinen Wein Trocken?" 
    nextRoute="/Winemenu"
    preferenceKey="trocken"
    bgImage="/background/pfeffer.jpg"
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
