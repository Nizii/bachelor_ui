<template>
  <Taste 
    title="Magst du den Geruch von frisch gehacktem Holz?" 
    nextRoute="/Tasteprofile/Dry"
    preferenceKey="holzig"
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
