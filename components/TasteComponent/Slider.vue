<template>
  <div class="slider-container">
    <div class="slider-titel">
      Auf einer Skala von 1-10
    </div>
    <div class="slider">
      <label>0</label>
      <input type="range" min="0" max="10" v-model="value"/>
      <span>{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    } 
  },
  methods: {
    emitValue() {
      console.log("Value " + this.value)
      this.$emit('emit-value', this.value);
    }
  }
}
</script>

<style scoped>
.slider-titel {
  color: white;
  margin-bottom: 20px;
}

label,
span {
  margin-right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: white;
}

input[type="range"] {
  margin-right: 10px;
  width: 150px;
}
</style>
