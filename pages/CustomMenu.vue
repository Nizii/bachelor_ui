<template>
  <div>
    <Header />
    <div class="custom-box">
      <div class="checkbox-group">
        <h2>Welchen Wein trinkst du gerne?</h2>
        <div class="checkbox-container">
          <input type="checkbox" id="weisswein" v-model="preferences.weisswein" true-value="true" false-value="false" />
          <label for="weisswein" class="checkbox-label">Weißwein</label>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" id="rotwein" v-model="preferences.rotwein" true-value="true" false-value="false" />
          <label for="rotwein" class="checkbox-label">Rotwein</label>
        </div>
        <h2>Das mag ich</h2>
        <div class="checkbox-container">
          <input type="checkbox" id="suss" v-model="preferences.suss" true-value="true" false-value="false" />
          <label for="suss" class="checkbox-label">Süss</label>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" id="sauer" v-model="preferences.sauer" true-value="true" false-value="false" />
          <label for="sauer" class="checkbox-label">Sauer</label>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" id="kraftig" v-model="preferences.kraftig" true-value="true" false-value="false" />
          <label for="kraftig" class="checkbox-label">Kräftig</label>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" id="fruchtig" v-model="preferences.fruchtig" true-value="true" false-value="false" />
          <label for="fruchtig" class="checkbox-label">Fruchtig</label>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" id="neutral" v-model="preferences.neutral" true-value="true" false-value="false" />
          <label for="neutral" class="checkbox-label">Neutral</label>
        </div>
      </div>
      <button class="button button-4" @click="sendPreferences">Suche Starten</button>
    </div>
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
      preferences: {
        weisswein: false,
        rotwein: false,
        suss: false,
        sauer: false,
        kraftig: false,
        fruchtig: false,
        neutral: false
      }
    }
  },

  methods: {
    sendPreferences() {
      localStorage.setItem('preferences', JSON.stringify(this.preferences));
      this.$router.push('/Custom');
    }
  }
}
</script>

<style scoped>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
  }

  .button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
  }

  .button {
    margin: 10px;
    width: 250px;
    height: 80px;
    border-radius: 5px;
    border: none;
    font-size: 15px;
    font-family: 'Arial', sans-serif;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }

  .button-1,
  .button-2,
  .button-3,
  .button-4,
  .button-5 {
    background-color: #d9d9d9;
    color: black;
  }

  .custom-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  input[type=checkbox] {
    transform: scale(5);
    margin: 20px 0;
  }
  
  .checkbox-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .checkbox-group label {
    display: flex;
    align-items: center;
    font-size: 24px;
  }
  

  .checkbox-container {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    padding-left:40px ;
  }
  .checkbox-label {
    margin-left: 40px;
  }
</style>

