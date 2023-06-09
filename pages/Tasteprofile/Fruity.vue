<template>
  <Taste 
    title="Magst du Früchte?" 
    nextRoute="/Tasteprofile/Wood"
    preferenceKey="fruchtig"
    previousRoute="/Tasteprofile/Intensive"
    bgImage="/background/fruchtig.jpg"
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
