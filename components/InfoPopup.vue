<template>
  <div v-if="show" class="popup">
    <div class="popup-content">
      <button class="close-popup" @click="$emit('close')">
        <img :src="require('@/icons/buttons/close.png')" class="icon" alt="Bookmark icon" />  
      </button>
      <div class="popup-text" v-if="infoKey === 'suss'">
        <span class="popup-tag">Süss:</span>
        <br>
        <p class="infotxt">Schmeckt der Wein angenehm süß und zeigt deutliche Aromen von Zucker, Honig oder kandierten Früchten, die den Gaumen betören?</p>
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
      <div class="popup-text" v-if="infoKey === 'mild'">
        <span class="popup-tag">Mild:</span>
        <br>
        <p class="infotxt">Ist der Wein sanft und zurückhaltend im Geruch, sodass er einen leichten und unaufdringlichen Eindruck hinterlässt?</p>
      </div>
      <div class="popup-text" v-if="infoKey === 'fruchtig'">
        <span class="popup-tag">Fruchtig:</span>
        <br>
        <p class="infotxt">Besitzt der Wein ausgeprägte fruchtige Aromen, wie z.B. Beeren, Zitrusfrüchte oder tropische Früchte, die sofort ins Auge fallen?</p>
      </div>
      <div class="popup-text" v-if="infoKey === 'erdig'">
        <span class="popup-tag">Erdig:</span>
        <br>
        <p class="infotxt">Nimmt man beim Riechen und Schmecken des Weins erdige Nuancen wahr, wie etwa mineralische, pilzartige oder waldbodenähnliche Noten?</p>
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
.close-popup {
  position: absolute;
  top: 10px;
  right: 10px;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  width: 80%;
  max-width: 500px;
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
