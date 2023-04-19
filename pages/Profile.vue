<template>
    <div>
      <Header />
      <MainTabbar />
      <h1>Profilseite</h1>
      <Tabbar />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Header from '~/components/Header.vue';
  
  export default {
    components: {
      Header,
    },
  
    data() {
      return {
        userData: null,
      }
    },
  
    mounted() {
      this.getUserData();
    },
  
    methods: {
      getUserData() {
        const token = localStorage.getItem('jwt');
        const headers = { Authorization: `Bearer ${token}` };
  
        axios.get('https://localhost:44322/api/user/userdata', {headers} )
          .then(response => {
            this.userData = response.data;
            console.log(this.userData);
          })
          .catch(error => {
            console.error(error);
          });
      },
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
  