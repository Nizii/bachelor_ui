<!-- InfoPopup.vue -->
<template>
  <div v-if="show" class="popup">
    <div class="popup-content">
      <button class="close-popup" @click="$emit('close')">×</button>
      <div class="popup-text">
        <span class="popup-tag">Süss:</span>
        <br>
        Schmeckt der Wein angenehm süß und zeigt deutliche Aromen von Zucker, Honig oder kandierten Früchten, die den Gaumen betören?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Sauer:</span>
        <br>
        Wein eine ausgeprägte Säure, die sich durch erfrischende und lebhafte Zitrus- oder grüne Fruchtnoten bemerkbar macht und den Gaumen anregt?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Intensiv:</span>
        <br>
        Hat der Wein ein intensives Geruchsbouquet oder muss ich das Glas mehrmals schwenken, bis ich etwas wahrnehme?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Mild:</span>
        <br>
        Ist der Wein sanft und zurückhaltend im Geruch, sodass er einen leichten und unaufdringlichen Eindruck hinterlässt?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Fruchtig:</span>
        <br>
        Besitzt der Wein ausgeprägte fruchtige Aromen, wie z.B. Beeren, Zitrusfrüchte oder tropische Früchte, die sofort ins Auge fallen?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Erdig:</span>
        <br>
        Nimmt man beim Riechen und Schmecken des Weins erdige Nuancen wahr, wie etwa mineralische, pilzartige oder waldbodenähnliche Noten?
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
  },
};
</script>

<style scoped>
.close-popup {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f2f2f2;
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 5px;
  font-size: 10px;
  cursor: pointer;
  user-select: none;
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
</style>
