<template>
  <Taste 
    title="Magst du deinen Wein sauer?" 
    nextRoute="/Tasteprofile/Sweet"
    preferenceKey="sauer"
    bgImage="/background/gurken.jpg"
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
