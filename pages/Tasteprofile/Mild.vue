<template>
  <Taste 
    title="Magst du deinen Wein mild?" 
    nextRoute="/Tasteprofile/Intensive"
    preferenceKey="mild"
    bgImage="/background/vanille.jpg"
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
