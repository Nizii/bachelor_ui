<template>
  <div>
    <Header />
    <div class="container">
      <ButtonGroup />
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import ButtonGroup from '~/components/OverviewButtonGroup.vue'

export default {
  components: {
    Header,
    ButtonGroup
  }
}
</script>

<style scoped>
.container {
    margin: 20px;
}
</style>
