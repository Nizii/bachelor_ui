<!-- InfoPopup.vue -->
<template>
  <div v-if="show" class="popup">
    <div class="popup-content">
      <button class="close-popup" @click="$emit('close')">×</button>
      <div class="popup-text">
        <span class="popup-tag">Süss:</span>
        <br>
        Ist der Wein eher klebrig süsslich oder trinkt er sich mit fruchtig saurem Nachhall?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Sauer:</span>
        <br>
        Erinnert der Wein eher an saures Zitronenwasser oder an ungesüsste Getränke?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Schwer:</span>
        <br>
        Ist der Wein eher klebrig süsslich oder trinkt er sich mit fruchtig saurem Nachhall?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Leicht:</span>
        <br>
        Erinnert der Wein eher an saures Zitronenwasser oder an ungesüsste Getränke?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Fruchtig:</span>
        <br>
        Ist der Wein eher klebrig süsslich oder trinkt er sich mit fruchtig saurem Nachhall?
      </div>
      <div class="popup-text">
        <span class="popup-tag">Erdig:</span>
        <br>
        Ist der Wein eher klebrig süsslich oder trinkt er sich mit fruchtig saurem Nachhall?
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
  font-size: 14px;
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
