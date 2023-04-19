<template>
  <div id="main">
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