<template>
    <div class="overlay-frame" @touchstart="onTouchStart" @touchend="onTouchEnd">
      <div class="frame-header">
        <h2>Essen</h2>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "OverlayFrame",
    methods: {
      onTouchStart(event) {
        this.startY = event.touches[0].clientY;
      },
      onTouchEnd(event) {
        this.endY = event.changedTouches[0].clientY;
        this.handleSwipe();
      },
      handleSwipe() {
        const threshold = 100; // Adjust this value to change the minimum swipe distance
  
        if (this.startY - this.endY > threshold) {
          this.$emit("close");
        }
      },
    },
    data() {
      return {
        startY: 0,
        endY: 0,
      };
    },
  };
  </script>
  
  <style scoped>
  .overlay-frame {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 75%;
    background-color: lightgray;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    z-index: 1000;
  }
  
  .frame-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
  
  h2 {
    margin: 0;
  }
  </style>
  