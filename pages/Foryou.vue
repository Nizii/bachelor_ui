  color: white;
  background-color: #762832;<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <Header />
    <MainTabbar />
    <div class="custom-box">
      <div class="checkbox-group">
        <h3>Welchen Wein trinkst du gerne?</h3>
        <div id="taste-1" class="taste">
          <Checkbox v-model="preferences.weisswein" label="Weißwein" />
          <Checkbox v-model="preferences.rotwein" label="Rotwein" />
        </div>
      </div>
      <div class="checkbox-group">
        <h3>Das mag ich <span class="info-icon" @click="togglePopup">Info</span></h3>
        <InfoPopup :show="showPopup" @close="togglePopup" />
        <div id="taste-2" class="taste">
          <Checkbox v-model="preferences.suss" label="Süss" />
          <Checkbox v-model="preferences.sauer" label="Sauer" />
        </div>
        <div id="taste-3" class="taste">
          <Checkbox v-model="preferences.intensiv" label="Intensiv" />
          <Checkbox v-model="preferences.mild" label="Mild" />
        </div>
        <div id="taste-4" class="taste">
          <Checkbox v-model="preferences.fruchtig" label="Fruchtig" />
          <Checkbox v-model="preferences.erdig" label="Erdig" />
        </div>
      </div>
      <button class="custom-button" @click="sendPreferences">Suche Starten</button>

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
        intensiv: false,
        mild: false,
        fruchtig: false,
        erdig: false,
      },
      useSliders: false,
      showPopup: false,
    }
  },

  methods: {
    sendPreferences() {
      localStorage.setItem('preferences', JSON.stringify(this.preferences));
      this.$router.push('/Custom');
    },

    togglePopup() {
      this.showPopup = !this.showPopup;
    },
  }
}
</script>

<style scoped>

*{
  font-family: sans-serif;
}
.custom-box {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f2f2f2;
  margin: 1rem;
  padding: 1rem;
  border-radius: 5px;
}

.checkbox-group {
  display: flex;
  flex-direction: column;
}

.checkbox-group h3 {
  margin-bottom: 0.5rem;
  margin-top: 8px;
}

.checkbox-group .taste {
  display: flex;
  justify-content: space-between;
}

.checkbox-group .checkbox {
  flex: 1;
  margin: 0 0.5rem;
}

.button {
  align-self: center;
  margin-top: 1rem;
}

.custom-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border: 2px solid #aaa;
  border-radius: 5px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.3s, color 0.3s;
  margin-top: 20px;
}

.custom-button:hover {
  background-color: #007bff;
  color: #fff;
}

.info-icon {
  display: inline-block;
  cursor: pointer;
  user-select: none;
  font-size: 1rem;
  background-color: #592321;
  color: #fff;
  padding: 2px 5px;
  border-radius: 3px;
  margin-left: 5px;
  padding:8px;
}

</style>
