<template>
  <div class="wine-card" @click="openDetailView">
    <div class="wine-card-row1">
      <img class="wine-image" :src="wine.link" alt="Weinbild" width="30px" height="100px"/>
      <div class="wine-card-row2">
        <h3 class="wine-title">{{ wine.name }}</h3>
        <div class="wine-attribute">

          <div class="wine-type_container">
            <p class="wine-type-case_1" v-if="wine.winetype === 'Weisswein'">Weiss
              <img :src="require('static/icons/others/traube.svg')" class="icon-small" alt="Bookmark icon" />
            </p>
            <p class="wine-type-case_2" v-if="wine.winetype === 'Rotwein'">Rot
              <img :src="require('static/icons/others/traube.svg')" class="icon-small" alt="Bookmark icon" />
            </p>
            <p class="wine-type-case_3" v-if="wine.winetype === 'Rose'">Rosé
              <img :src="require('static/icons/others/traube.svg')" class="icon-small" alt="Bookmark icon" />
            </p>
            <p>
              {{ wine.grape }}
            </p>
          </div>

        </div>

        <div class="wine-flag">
          <img :src="require(`/static/icons/nations/${wine.nationTag}.png`)" class="wine-info-flag" alt="Profile icon" />
        </div>

        <div class="wine-price">
          <div class="bottle-price">
            CHF {{ wine.bottleprice}}
          </div>
          <div class="open-price">
            CHF {{ wine.openprice}}
          </div>
        </div>
      </div>
      <div class="wine_card_row3">
        <div class="container-above">
          <button v-if="!isBookmark" @click.stop="addToBookmarks">
            <img v-if="!isFavorite" :src="require('static/icons/buttons/merkliste.svg')" class="icon" alt="Bookmark icon" />
            <img v-else :src="require('static/icons/buttons/merkliste_an.svg')" class="icon" alt="Bookmark icon" />
          </button>
          <button v-else @click.stop="removeWineInBookmark">
            <img :src="require('static/icons/buttons/close.png')" class="icon" alt="Bookmark icon" />  
          </button>
        </div>
        <div v-if="wine.rating > 10" class="container-below">
          <p class="wine-rating-title">
            Your Taste
          </p>
          <div class="container-below-child">
            <div class="wine-rating-left">
              <img :src="require('static/icons/others/Wein.png')" class="icon" alt="Bookmark icon" />  
            </div>
            <div class="wine-rating-right">
              <div class="wine-rating">
                {{wine.rating}}%
              </div>
            </div>
          </div>
        </div>
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
        isFavorite: false,
        bookmarkFrameIsOpen: false,
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
      isBookmark: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      isLoggedIn() {
        return this.userData !== null;
      },
    },

    created() {
      const bookmarkedWines = JSON.parse(localStorage.getItem('bookmarkedWines')) || [];
      this.isFavorite = bookmarkedWines.some(bookmarkedWine => bookmarkedWine._id === this.wine._id);
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

      removeWineInBookmark() {
        this.$emit('remove-wine-element');
      },

      addToBookmarks() {
        // Erhalte die aktuelle Liste der gemerkten Weine (oder eine leere Liste, wenn noch keine Weine gemerkt wurden)
        const bookmarkedWines = JSON.parse(localStorage.getItem('bookmarkedWines')) || [];
        // Überprüfe, ob der aktuelle Wein bereits gemerkt wurde
        const alreadyBookmarked = bookmarkedWines.some(bookmarkedWine => bookmarkedWine._id === this.wine._id);
        // Wenn der Wein noch nicht gemerkt wurde, wird der Wein hinzugefügt
        if (!alreadyBookmarked) {
          bookmarkedWines.push(this.wine);
          localStorage.setItem('bookmarkedWines', JSON.stringify(bookmarkedWines));
          this.isFavorite = true;
        } else {
          // Wenn der Wein bereits gemerkt wurde, wird er aus der Liste entfernt
          const updatedBookmarkedWines = bookmarkedWines.filter(bookmarkedWine => bookmarkedWine._id !== this.wine._id);
          localStorage.setItem('bookmarkedWines', JSON.stringify(updatedBookmarkedWines));
          this.isFavorite = false;
        }
        this.$emit('bookmark-removed');
      },
    
      openDetailView() {
        this.$emit('open-detail-view', this.wine);
      },
  
/*
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
      */
    },
  }
  </script>


  <style>

  @import "@/CSS/shared-wine-type-styles.css";
  
  * {
    font-family: 'Semplicita', sans-serif;
  }

  .wine-type_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top:5px;
  }
  
  .wine-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    box-shadow: 2.5px 2.5px 2.5px 1.5px rgba(136, 136, 136, 0.5);
    border-radius: 10px;
  }  

  .wine-image {
    height: 100%;
    object-fit: contain;
  }

  .wine-info-flag{
    width: 20px;
    height: 13px;
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
    display: flex;
    flex-direction: column;
    height: 100%;
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
    margin-bottom: 0;
    margin-top:5px;
    margin-bottom: 5px;
  }
  
  .wine-title {
    font-size: 16px;
    margin-top: 0;
    color: black;
  }
  
  .wine-attribute {
    font-size: 12px;
  }
  
  
  .wine-price {
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .star-rating {
    width: 100%;
    transform: scale(0.5);
  }

  .container-below {
    display: flex;
    flex-direction: column;
    width: 100%;
    color: #808080;
  }
  
  .container-below-child {
    display: flex;
    flex-direction: row;
    width: 100%;
  }

  .wine-rating-title{
    font-size: 12px;
  }

  .wine-rating-right {
    padding-top: 7px;
    font-weight: bold;
    font-size: 15px;
    padding-left: 10px;
  }
  .wine-rating-left {

  }

  .icon-small {
    width: 15px;
    height: 15px;
  }

  
  </style>