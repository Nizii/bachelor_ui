<template>
  <div v-if="show" class="popup">
    <div class="popup-content">
      <button class="close-popup" @click="$emit('close')">
        <img :src="require('static/icons/buttons/closebutton_merkliste.svg')" class="taste-info-close" alt="Bookmark icon" />  
      </button>
      <div class="popup-text" v-if="infoKey === 'suss'">
        <span class="popup-tag">Süss:</span>
        <br>
        <p class="infotxt">Schmeckt der Wein angenehm süss und zeigt deutliche Aromen von Zucker, Honig oder kandierten Früchten, die den Gaumen betören?</p>
      </div>
      <div class="popup-text" v-if="infoKey === 'sauer'">
        <span class="popup-tag">Sauer:</span>
        <br>
        <p class="infotxt">Wein eine ausgeprägte Säure, die sich durch erfrischende und lebhafte Zitrus- oder grüne Fruchtnoten bemerkbar macht und den Gaumen anregt?</p>
      </div>
      <div class="popup-text" v-if="infoKey === 'intensiv'">
        <span class="popup-tag">Intensiv:</span>
        <br>
        <p class="infotxt">Hat der Wein ein intensives Geruchsbouquet oder muss ich das Glas mehrmals schwenken, bis ich etwas wahrnehme?</p>
      </div>
      <div class="popup-text" v-if="infoKey === 'holzig'">
        <span class="popup-tag">Holzig:</span>
        <br>
        <p class="infotxt">Weist der Wein starke Holznoten auf, wie z.B. Eiche, Zedernholz oder Vanille, die das Geschmacksprofil dominieren?</p>
      </div>
      <div class="popup-text" v-if="infoKey === 'fruchtig'">
        <span class="popup-tag">Fruchtig:</span>
        <br>
        <p class="infotxt">Besitzt der Wein ausgeprägte fruchtige Aromen, wie z.B. Beeren, Zitrusfrüchte oder tropische Früchte, die sofort ins Auge fallen?</p>
      </div>
      <div class="popup-text" v-if="infoKey === 'trocken'">
        <span class="popup-tag">Trocken:</span>
        <br>
        <p class="infotxt">Hat der Wein einen trockenen Charakter, was bedeutet, dass er kaum oder keine Restsüsse aufweist und eher herbe Geschmacksnoten zeigt?</p>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    infoKey: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>

.taste-info-close{
  width: 25px;
  height: 25px;
  background-color: white;
  border-radius: 8px;
}
.close-popup {
  background-color: white;
  border: none;
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 8px;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}


.popup-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-top: -50%;
}

.popup-text {
  margin-bottom: 1rem;
}

.popup-tag {
  font-weight: bold;
}

.infotxt{
  font-size: 10px;
}
</style>
