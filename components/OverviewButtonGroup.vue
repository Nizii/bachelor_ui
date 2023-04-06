<template>
  <div class="button-group">
    <nuxt-link to="/Winemenu" class="button button-1">Weinkarte</nuxt-link>
    <nuxt-link to="/Food" class="button button-2">Weinvorschläge</nuxt-link>
    <nuxt-link to="/Undecided" class="button button-3">Unentschlossen</nuxt-link>
    <!--Die benutzerdefinierte Weinsuche ist noch nicht auf Netlify deployed-->
    <div id="customBox" class="custom-box">
      <div class="checkbox-group">
        <h2>Das mag ich</h2>
        <label>
          <input type="checkbox" v-model="preferences.suss" true-value="true" false-value="false"/>
          Süss
        </label>
        <label>
          <input type="checkbox" v-model="preferences.sauer" true-value="true" false-value="false"/>
          Sauer
        </label>
        <label>
          <input type="checkbox" v-model="preferences.kraftig" true-value="true" false-value="false"/>
          Kräftig
        </label>
        <label>
          <input type="checkbox" v-model="preferences.fruchtig" true-value="true" false-value="false"/>
          Fruchtig
        </label>
        <label>
          <input type="checkbox" v-model="preferences.neutral" true-value="true" false-value="false"/>
          Neutral
        </label>
      </div>
      <button class="button button-4" @click="sendPreferences">Mein Profil</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      preferences: {
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
.button-group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

.button {
  margin-top: 15px;
  margin-bottom: 15px;
  width: 250px;
  height: 100px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  font-family: 'Arial', sans-serif;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
}

.button-1, .button-2 , .button-3, .button-4 {
  background-color: #d9d9d9;
  color: black;
}

#customBox {
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
}

#customBox label {
  display: inline-block;
  margin-right: 10px;
  font-size: 20px;
  font-family: 'Arial', sans-serif; 
}

#customBox input {
  width: 30px;
  height: 30px;
  border-radius: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 10px;
}

.checkbox-group label {
  display: flex;
  align-items: center;
}
</style>
