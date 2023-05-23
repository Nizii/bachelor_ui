<template>
  <Taste 
    title="Magst du deinen Wein süss?" 
    nextRoute="/Tasteprofile/Sour"
    preferenceKey="suss"
    bgImage="/dessert.jpg"
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
