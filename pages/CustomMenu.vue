<template>
  <div>
    <Header />
    <div class="custom-box">
      <div class="checkbox-group">
        <h1>Welchen Wein trinkst du gerne?</h1>
        <Checkbox v-model="preferences.weisswein" label="Weißwein" />
        <Checkbox v-model="preferences.rotwein" label="Rotwein" />

        <h1>Das mag ich</h1>
        <div class="toggle-group">
          <label for="toggle-switch">Experten Modus:</label>
          <input type="checkbox" id="toggle-switch" v-model="useSliders" />
        </div>

        <div v-if="useSliders">
          <h3>Min. eine Auswahl tätigen!!!</h3>
          <Slider v-model="preferences.suss" label="Süss" />
          <Slider v-model="preferences.sauer" label="Sauer" />
          <Slider v-model="preferences.kraftig" label="Kräftig" />
          <Slider v-model="preferences.fruchtig" label="Fruchtig" />
          <Slider v-model="preferences.neutral" label="Neutral" />
        </div>

        <div v-else>
          <h3>Min. eine Auswahl tätigen!!!</h3>
          <Checkbox v-model="preferences.suss" label="Süss" />
          <Checkbox v-model="preferences.sauer" label="Sauer" />
          <Checkbox v-model="preferences.kraftig" label="Kräftig" />
          <Checkbox v-model="preferences.fruchtig" label="Fruchtig" />
          <Checkbox v-model="preferences.neutral" label="Neutral" />
        </div>
      </div>
      <button class="button button-4" @click="sendPreferences">Suche Starten</button>
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Header from '~/components/Header.vue';
import Checkbox from '~/components/Checkbox.vue';
import Slider from '~/components/Slider.vue';

export default {
  components: {
    Header,
    Checkbox,
    Slider,
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
      },
      useSliders: false,
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