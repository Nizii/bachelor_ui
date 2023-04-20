<template>
  <div class="wine-card">
    <div class="wine-card-row1">
      <button class="favorite-button">+</button>
      <h3 class="wine-title">{{ wine.name }}</h3>
    </div>
    <div class="wine-card-row2">
      <img class="wine-image" src="/wine.png" alt="Weinbild" width="30px" height="100px" >
      <div class="wine-description">
        <div class="wine-attribute">
          Traube: {{ wine.grape }}
        </div>
        <div class="wine-attribute">
          Jahrgang: {{ wine.year }}
        </div>
        <div class="wine-attribute">
          Alkohol: {{ wine.alcohol }}%
        </div>
        <br>
        <div class="wine-attribute">
          {{ wine.charakter }}
        </div>
      </div>
    </div>
    <div class="wine-card-row3">
      <div class="star-rating">
        <star-rating v-model="rating" @rating-selected="saveRating" />
      </div>
      <div class="wine-price-container">
        <div class="wine-price">
          {{ wine.openprice }} .- / 1d l
        </div>
        <div class="wine-price">
          {{ wine.bottleprice}} .- / 0.75 l
        </div>
      </div>
    </div>
  </div>  
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        rating: 0,
      }
    },

    name: 'WineInfo',

    props: {
      wine: {
        type: Object,
        required: true
      }
    },

    methods: {
      async saveRating() {
        try {
          //const response = await axios.put(`https://wine.azurewebsites.net/api/wine/${this.wine._id}');
          const response = await axios.put(`https://localhost:44322/api/wine/${this.wine._id}`);
          this.rating++;
        console.log(response.data);
        } catch (error) {
        console.error(error);
      }
    },
  },
  }
  </script>
  
  <style scoped>
  .wine-card {
    display: flex;
    flex-direction: column;
    width: auto;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .wine-card-row1,
  .wine-card-row2,
  .wine-card-row3 {
    display: flex;
  }
  
  .wine-card-row1 {
    background-color: bisque;
  }
  .wine-card-row2 {
    background-color:whitesmoke;
    padding: 10px;
  }
  .wine-card-row3 {
    background-color:bisque;
    padding: 10px;
  }

  .wine-description{
    margin-left: 20px;
  }

  .favorite-button {
    width: 50px;
    height: 50px;
    background-color: #d9d9d9;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    font-size: 40px;
  }
  
  .wine-title {
    flex-grow: 1;
    padding: 10px;
  }
  
  .wine-image {
    width: auto;
    height: 150px;
  }
  
  .star-rating {
    flex-grow: 1;
  }
  
  .wine-price-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
  }
  
</style>