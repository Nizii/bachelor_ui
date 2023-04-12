<template>
    <div>
      <Header />
      <h1>Profilseite</h1>
      <Tabbar />
    </div>
  </template>
  
  <script>
  import Header from '~/components/Header.vue';
  
  export default {
    components: {
      Header,
    },
  
    data() {
      return {
      }
    },
}
</script>
  
<style scoped>
h1 {
    font-size: 48px;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 30px;
  }
</style>