<template>
  <Taste 
    title="Magst du frischen Holzgeschmack?" 
    nextRoute="/Winemenu"
    preferenceKey="holz"
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
