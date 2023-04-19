<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <Header />
    <div class="container">
      <MainTabbar />
      <Tabbar />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import ButtonGroup from '~/components/OverviewButtonGroup.vue'
import Tabbar from '~/components/Tabbar.vue';

export default {
  name: 'IndexPage',
  components: {
    Header,
    ButtonGroup,
    Tabbar
  }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>