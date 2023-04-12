<template>
  <div>
    <Header />
    <div class="container">
      <ButtonGroup />
      <Tabbar />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import ButtonGroup from '~/components/OverviewButtonGroup.vue'
import Tabbar from '~/components/Tabbar.vue';

export default {
  components: {
    Header,
    ButtonGroup,
    Tabbar
  }
}
</script>

<style scoped>
.container {
    margin: 20px;
}
</style>
