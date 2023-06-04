<template>
  <div class="slider-container">
    <div class="slider-titel">
      <span>{{ sliderLabelTxt }}</span>
    </div>
    <div class="slider">
      <input type="range" min="1" max="5" v-model="value" />
      <img :src="require('static/background/balken.png')" alt="Bookmark icon" />

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3,
      sliderLabelTxt: 'Nur dezent!',
      currentTaste:'',
    } 
  },

  methods: {
    emitValue(){
      this.$emit('emit-value', this.value);
    },

    setTasteToSlider(value){
      this.currentTaste = value;
    }
  },

  watch: {
    value: function(newValue) {
      let intValue = parseInt(newValue);
      if(this.currentTaste === 'suss') {
        switch(intValue) {
          case 1: 
            this.sliderLabelTxt = 'Gar nicht!';
            break;
          case 2:
            this.sliderLabelTxt = 'Lieber nicht!';
            break;
          case 3:
            this.sliderLabelTxt = 'Nur dezent!';
            break;
          case 4:
            this.sliderLabelTxt = 'Find ich gut!';
            break;
          case 5:
            this.sliderLabelTxt = 'Find ich super!';
            break;
          default:
            this.sliderLabelTxt = '';
        }
      } else if (this.currentTaste === 'sauer') {
        switch(intValue) {
          case 1: 
            this.sliderLabelTxt = 'Nein!';
            break;
          case 2:
            this.sliderLabelTxt = 'Lieber nicht!';
            break;
          case 3:
            this.sliderLabelTxt = 'Mittelmässig!';
            break;
          case 4:
            this.sliderLabelTxt = 'Find ich gut!';
            break;
          case 5:
            this.sliderLabelTxt = 'So etwas von!';
            break;
          default:
            this.sliderLabelTxt = '';
        }
      } else if (this.currentTaste === 'intensiv') {
        switch(intValue) {
          case 1: 
            this.sliderLabelTxt = 'Nein!';
            break;
          case 2:
            this.sliderLabelTxt = 'Ich bevorzuge hart!';
            break;
          case 3:
            this.sliderLabelTxt = 'Teilweise!';
            break;
          case 4:
            this.sliderLabelTxt = 'Ja!';
            break;
          case 5:
            this.sliderLabelTxt = 'Definitiv!';
            break;
          default:
            this.sliderLabelTxt = '';
        }
      } else if (this.currentTaste === 'fruchtig') {
        switch(intValue) {
          case 1: 
            this.sliderLabelTxt = 'Nein gar nicht!';
            break;
          case 2:
            this.sliderLabelTxt = 'Eher nicht!';
            break;
          case 3:
            this.sliderLabelTxt = 'Ab und zu!';
            break;
          case 4:
            this.sliderLabelTxt = 'Mag ich!';
            break;
          case 5:
            this.sliderLabelTxt = 'Ich liebe fruchtiger Geschmack!';
            break;
          default:
            this.sliderLabelTxt = '';
        }
      } else if (this.currentTaste === 'holzig') {
        switch(intValue) {
          case 1: 
            this.sliderLabelTxt = 'Mag ich gar nicht!';
            break;
          case 2:
            this.sliderLabelTxt = 'Es gibt besseres!';
            break;
          case 3:
            this.sliderLabelTxt = 'Naja!';
            break;
          case 4:
            this.sliderLabelTxt = 'Holz finde ich super!';
            break;
          case 5:
            this.sliderLabelTxt = 'Herrlich dieser Geruch!';
            break;
          default:
            this.sliderLabelTxt = '';
        }
      } else if (this.currentTaste === 'trocken') {
        switch(intValue) {
          case 1: 
            this.sliderLabelTxt = 'Nein';
            break;
          case 2:
            this.sliderLabelTxt = 'Es gibt besseres!';
            break;
          case 3:
            this.sliderLabelTxt = 'Naja!';
            break;
          case 4:
            this.sliderLabelTxt = 'Ja!';
            break;
          case 5:
            this.sliderLabelTxt = 'Ich liebe es!';
            break;
          default:
            this.sliderLabelTxt = '';
        }
    }
    }
  }
}
</script>

<style scoped>
.slider-titel {
  color: white;
  margin-bottom: 20px;
  font-size: 35px;
}

label,
span {
  margin-right: 10px;
  font-size: 20px;
  font-weight: bold;
  color: white;
}

input[type="range"] {
  width: 250px;
  appearance: none;
  background: white;
  height: 2px;
}


input[type="range"]::-webkit-slider-thumb {
  content: "<>";
  color: white;
  appearance: none;
  background: #6C361B;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.15s ease-in-out;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}


input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5px;
  cursor: pointer;
  border-radius: 1.3px;
  background: white;
  box-shadow: 0px 0px 0px #000000;
}


.slider {
  position: relative;
}

input[type="range"] {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  width: 250px; 
}

.slider img {
  position: absolute;
  z-index: 1; 
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: 0;
  margin: auto;
  width: 250px;
}

</style>
