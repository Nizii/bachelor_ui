<template>
  <Taste 
    title="Magst du deinen Wein fruchtig?" 
    nextRoute="/Tasteprofile/Earthy"
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
