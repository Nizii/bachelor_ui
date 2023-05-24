<template>
  <Taste 
    title="Magst du deinen Wein süss?" 
    nextRoute="/Tasteprofile/Sour"
    preferenceKey="suss"
    bgImage="/background/dessert.jpg"
  />
</template>

<script>
import Taste from '~/components/TasteComponent/Taste.vue';
import InfoPopUp from '~/components/InfoPopup.vue';

export default {
  components: {
    Taste,
  },
}
</script>
