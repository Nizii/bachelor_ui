<template>
  <div class="wine-card">
    <div class="wine-card-row1">
      <img class="wine-image" src="/wine.png" alt="Weinbild" width="30px" height="100px"/>
      <div class="wine-details">
        <div class="wine-flag">CH</div>
        <h3 class="wine-title">{{ wine.name }}</h3>
        <div class="wine-attribute">{{ wine.grape }}</div>
        <div class="wine-attribute">
          <span v-for="(profileItem, index) in wine.profile" :key="index">
            {{ profileItem }}
            <span v-if="index < wine.profile.length - 1">, </span>
          </span>
        </div>
        <div class="wine-attribute">Passt zu 
          <span v-for="(matchItem, index) in wine.match" :key="index">
            {{ matchItem }}
            <span v-if="index < wine.match.length - 1">, </span>
          </span>
        </div>
      </div>
      <div class="wine-pricing-rating">
        <div class="wine-price">
          {{ wine.openprice }} .- / 1d l
          <br />
          {{ wine.bottleprice}} .- / 0.75 l
        </div>
        <button @click="addToFavorites" class="add-favorite-button">Favoriten</button>

        <!--
        <div class="star-rating">
          <star-rating v-model="rating" @rating-selected="saveRating" />
        </div>
        -->
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
          const response = await axios.put(`https://wine.azurewebsites.net/api/wine/${this.wine._id}`);
          //const response = await axios.put(`https://localhost:44322/api/wine/${this.wine._id}`);
          this.rating++;
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      },

      async addToFavorites() {
        const token = localStorage.getItem('jwt');
        if (!token) {
          console.log("User muss sich einloggen");
          return;
        }
        try {
          //const response = await this.$axios.post(`https://wine.azurewebsites.net/api/user/add-favorite/${this.wine._id}`, {}, {
          const response = await this.$axios.post(`https://localhost:44322/api/user/add-favorite/${this.wine._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          } catch (error) {
          console.error(error);
        }
      },
    },
  }
  </script>


  <style scoped>

  * {
    font-family: sans-serif;
  }
  
  .wine-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
  }


  .add-favorite-button {
    background-color: #881111;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    margin-top: 5px;
  }
  
  .wine-card-row1 {
    display: flex;
    background-color: #EDEDED;
    padding: 10px;
    border-radius: 15px;
  }
  
  .wine-image {
    height: 100%;
    object-fit: contain;
  }
  
  .wine-details {
    flex: 1;
    padding: 0 10px;
  }
  
  .wine-flag {
    width: 100%;
    height: auto;
    display: block;
    /*background-image: url("/flag.png");*/
    background-size: contain;
    background-repeat: no-repeat;
    height: 30px;
    margin-bottom: 0;
  }
  
  .wine-title {
    font-size: 15px;
    margin-top: 0;
    color: #881111;
  }
  
  .wine-attribute {
    font-size: 12px;
  }
  
  
  .wine-pricing-rating {
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding-left: 10px;
  }
  
  .wine-price {
    font-size: 12px;
  }
  
  .star-rating {
    width: 100%;
    transform: scale(0.5);
  }
  </style>