<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
      <Header />
      <div class="login-container">
        <div class="form-container">
          <div v-if="!showRegister" class="form">
            <h2>Anmelden</h2>
            <form @submit.prevent="login">
              <div class="input-container">
                <label for="username">Benutzername:</label>
                <input type="text" id="username" v-model="username" required>
              </div>
              <div class="input-container">
                <label for="password">Passwort:</label>
                <input type="password" id="password" v-model="password" required>
              </div>
              <button type="submit">Anmelden</button>
            </form>
            <p>Noch keinen Account? <a href="#" @click="showRegister = true">Registrieren</a></p>
          </div>
          <div v-if="showRegister" class="form">
            <h2>Registrieren</h2>
            <form @submit.prevent="register">
              <div class="input-container">
                <label for="username">Benutzername:</label>
                <input type="text" id="username" v-model="username" required>
              </div>
              <div class="input-container">
                <label for="password">Passwort:</label>
                <input type="password" id="password" v-model="password" required>
              </div>
              <button type="submit">Registrieren</button>
            </form>
            <p>Bereits einen Account? <a href="#" @click="showRegister = false">Anmelden</a></p>
          </div>
        </div>
      </div>
      <Tabbar />
    </div>
  </template>
  
  <script>
  import Header from '~/components/Header.vue';
  import axios from 'axios';
  
  export default {
    components: {
      Header,
    },
  
    data() {
      return {
        showRegister: false,
        username: '',
        password: '',
      }
    },
  
    created() {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        this.$router.push('/profile');
      }
    },
  
    methods: {
      async login() {
        try {
          //const response = await axios.post('https://wine.azurewebsites.net/api/User/login', {
          const response = await axios.post('https://localhost:44322/api/User/login', {
            username: this.username,
            password: this.password
          });

          localStorage.setItem('jwt', response.data.token);
          this.$router.push('/profile');
        } catch (error) {
          console.error(error);
        }
      },
  
      async register() {
        try {
          const response = await axios.post('https://wine.azurewebsites.net/api/User/reg', {
          //const response = await axios.post('https://localhost:44322/api/User/reg', {
            username: this.username,
            password: this.password
          });
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      },
    },
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #FFFF;
    margin-top: 30px;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F4F4F4;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  }
  
  .form {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  .input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    font-size: 18px;
    width: 100%;
  }
  
  .input-container label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form input {
    margin-bottom: 10px;
    display: block;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  }

  button[type="submit"] {
    background-color: #720710;
    color: #FFFFFF;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }

  button[type="submit"]:hover {
    background-color: #53060A;
  }

  p {
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
  }

  a {
    color: #720710;
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
</style>