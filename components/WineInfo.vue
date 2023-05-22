<template>
  <div class="wine-card" @click="openDetailView">
    <div class="wine-card-row1">
      <img class="wine-image" :src="wine.link" alt="Weinbild" width="30px" height="100px"/>
      <div class="wine-card-row2">
        <!--<div class="wine-flag">CH</div>-->
        <h3 class="wine-title">{{ wine.name }}</h3>
        <div class="wine-attribute">
          <div class="wine-type_container">
            <p class="wine-type-case_1" v-if="wine.winetype === 'Weisswein'">Weiss
              <img :src="require('@/icons/others/traube.png')" class="icon-small" alt="Bookmark icon" /></p>
            <p class="wine-type-case_2" v-if="wine.winetype === 'Rotwein'">Rot
              <img :src="require('@/icons/others/traube.png')" class="icon-small" alt="Bookmark icon" /></p>
            <p class="wine-type-case_3" v-if="wine.winetype === 'Rose'">Rosé
              <img :src="require('@/icons/others/traube.png')" class="icon-small" alt="Bookmark icon" /></p>
            {{ wine.grape }}</div>
          </div>
          <!--
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
      -->
        <div class="wine-price">
          CHF {{ wine.bottleprice}}
        </div>
      </div>
      <div class="wine_card_row3">
        <button :class="favoriteButtonClass" @click.stop="toggleFavorite">
          <img :src="require('@/icons/buttons/merkliste.png')" class="icon" alt="Bookmark icon" />
        </button>
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
  import DetailWineView from '~/components/OverlayFrames/DetailWineView.vue';
  import axios from 'axios';
  export default {
    components:{
      DetailWineView,
    },

    data() {
      return {
        rating: 0,
        selectedWine: null,
      }
    },

    name: 'WineInfo',

    props: {
      wine: {
        type: Object,
        required: true
      },
      userData: {
        type: Object,
        default: null,
      },
    },

    computed: {
      isFavorite() {
        if (!this.isLoggedIn) {
          return false;
        }
        return this.userData.favoriten.some((favorite) => favorite._id === this.wine._id);
      },

      isLoggedIn() {
        return this.userData !== null;
      },

      favoriteButtonClass() {
        if (!this.isLoggedIn) {
          return "add-favorite-button";
        }
        const isFavorite = this.userData.favoriten.some(
          (favorite) => favorite._id === this.wine._id
        );
        return isFavorite ? "marked-favorite-button" : "add-favorite-button";
      },

      favoriteButtonText() {
        if (!this.isLoggedIn) {
          return "Favoriten";
        }
        const isFavorite = this.userData.favoriten.some(
          (favorite) => favorite._id === this.wine._id
        );
        return isFavorite ? "Markiert" : "Favoriten";
      },
    },

    methods: {
      async saveRating() {
        try {
          //const response = await axios.put(`https://wine.azurewebsites.net/api/wine/${this.wine._id}`);
          const response = await axios.put(`https://localhost:44322/api/wine/${this.wine._id}`);
          this.rating++;
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      },
    
      openDetailView() {
        this.$emit('open-detail-view', this.wine);
      },
      
      async toggleFavorite() {
        if (!this.isLoggedIn) {
          //Alert("User muss sich einloggen");
        return;
        }

        if (this.isFavorite) {
          await this.deleteFavorites();
        } else {
          await this.addToFavorites();
        }
        this.updateFavoriteList(); 
      },

      updateFavoriteList() {
      if (this.isFavorite) {
        this.userData.favoriten = this.userData.favoriten.filter(
          (favorite) => favorite._id !== this.wine._id
        );
      } else {
        this.userData.favoriten.push({ _id: this.wine._id });
      }
      this.userData.favoriten = [...this.userData.favoriten];
      },

      async deleteFavorites() {
        const token = localStorage.getItem('jwt');
        if (!token) {
          Console.log("User muss sich einloggen");
          return;
        }
        try {
          const response = await this.$axios.post(`https://wine.azurewebsites.net/api/user/remove-favorite/${this.wine._id}`, {
          //const response = await axios.post(`https://localhost:44322/api/user/remove-favorite/${this.wine._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        } catch (error) {
          console.error(error);
        }
      },

      async addToFavorites() {
        const token = localStorage.getItem('jwt');
        if (!token) {
          //Alert("User muss sich einloggen");
          return;
        }
        try {
          const response = await this.$axios.post(`https://wine.azurewebsites.net/api/user/add-favorite/${this.wine._id}`, {
          //const response = await this.$axios.post(`https://localhost:44322/api/user/add-favorite/${this.wine._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          } catch (error) {
          console.error(error);
        }
      },
    },
  }
  </script>


  <style>

  * {
    font-family: sans-serif;
  }

  .wine-type-case_1, .wine-type-case_2, .wine-type-case_3{
    height: 20px;
    padding:5px;
    border-radius: 15px;
    margin-right: 10px;
  }

  .wine-type-case_1{
    background-color: #E8D954;
  }

  .wine-type-case_2{
    background-color: #A15B80;
  }

  .wine-type-case_3{
    background-color: #DE6058;
  }

  .icon-small {
    width: 15px;
    height: 15px;
  }

  .wine-type_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
  }
  
  .wine-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 150px;
    margin-bottom: 20px;
    box-shadow: 5px 5px 5px 3px #888888;
    border-radius: 10px;
  }

  .marked-favorite-button {
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    margin-top: 5px;
  }
  

  .add-favorite-button {
    color: white;
    border: none;
    border-radius: 5px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;
    margin-top: 5px;
  }

  .wine-image {
    height: 100%;
    object-fit: contain;
  }

  .wine-card-row1 {
    display: flex;
    background-color: white;
    padding-left: 30px;
    border-radius: 25px;
    padding-top:15px
  }
  
  .wine-card-row2 {
    flex: 1;
    margin-left: 15px;
  }

  .wine_card_row3{
    flex: 0 0 25%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding-right: 15px;
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
    font-size: 16px;
    margin-top: 0;
    color: black;
  }
  
  .wine-attribute {
    font-size: 12px;
    font-weight: bold;
  }
  
  
  .wine-price {
    font-size: 13px;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .star-rating {
    width: 100%;
    transform: scale(0.5);
  }
  </style>