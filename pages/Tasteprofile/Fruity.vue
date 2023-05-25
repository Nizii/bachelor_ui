<template>
  <Taste 
    title="Magst du deinen Wein fruchtig?" 
    nextRoute="/Tasteprofile/Tannine"
    preferenceKey="fruchtig"
    bgImage="/background/steinfrucht.jpg"
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
