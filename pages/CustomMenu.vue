<template>
  <div>
    <Header />
    <div class="custom-box">
      <div class="checkbox-group">
        <h1>Welchen Wein trinkst du gerne?</h1>
        <Checkbox v-model="preferences.weisswein" label="Weißwein" />
        <Checkbox v-model="preferences.rotwein" label="Rotwein" />
        <h1>Das mag ich</h1>
        <h3>Min. eine Auswahl tätigen!!!</h3>
        <Checkbox v-model="preferences.suss" label="Süss" />
        <Checkbox v-model="preferences.sauer" label="Sauer" />
        <Checkbox v-model="preferences.kraftig" label="Kräftig" />
        <Checkbox v-model="preferences.fruchtig" label="Fruchtig" />
        <Checkbox v-model="preferences.neutral" label="Neutral" />
      </div>
      <button class="button button-4" @click="sendPreferences">Suche Starten</button>
    </div>
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Checkbox from '~/components/Checkbox.vue';

export default {
  components: {
    Header,
    Checkbox, // hinzufügen Sie die Checkbox-Komponente hier als deklariertes Komponente
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

  h3{
    background-color: red;
    padding: 10px;
    color: white;
    text-align: center;
    border-radius: 5px;
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
  
</style>

