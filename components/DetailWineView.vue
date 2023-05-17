<template>
    <div class="detail-view">
        <WineHeader title="DetailWineView" />
        <h2>{{ wine.name }}</h2>
        <p>{{ wine.description }}</p>
        <button @click="closeDetails">Schließen</button>
    </div>
</template>
  
  <script>
  export default {
    name: 'DetailWineView',
    props: {
      wine: {
        type: Object,
        required: true,
      },
    },
    methods: {
      closeDetails() {
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  .detail-view {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2em;
    box-sizing: border-box;
    z-index: 1000;
  }
  </style>
  