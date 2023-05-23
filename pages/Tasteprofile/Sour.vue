<template>
  <Taste 
    title="Magst du deinen Wein sauer?" 
    nextRoute="/Tasteprofile/Mild"
    preferenceKey="sauer"
    bgImage="/gurken.jpg"
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
