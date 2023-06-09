<template>
  <div class="wine-card" @click="openDetailView">
    <div class="wine-card-row1">
      <div class="wine-img-container">
        <img class="wine-image" :src="wine.link" alt="Weinbild" width="30px" height="100px"/>
        <img v-if="wine.winetype === 'Weisswein'" :src="require(`/static/background/kachelverlauf_gelb.png`)" class="verlauf-image" alt="Profile icon" />
        <img v-if="wine.winetype === 'Rotwein'" :src="require(`/static/background/kachel_verlauf_rot.png`)" class="verlauf-image" alt="Profile icon" />
        <img v-if="wine.winetype === 'Rose'" :src="require(`/static/background/kachelverlauf_rose.png`)" class="verlauf-image" alt="Profile icon" />
      </div>
      <div class="wine-card-row2">
      <h3 class="wine-title">
        {{ wine.name }}
      </h3>
      <div class="wine-attribute">

        <div class="wine-type_container">
          <p class="wine-type-case_1" v-if="wine.winetype === 'Weisswein'">
            <img :src="require('static/icons/food/traube_weisswein.svg')" class="icon-small" alt="Bookmark icon" />
          </p>
          <p class="wine-type-case_2" v-if="wine.winetype === 'Rotwein'">
            <img :src="require('static/icons/food/traube_rotwein.svg')" class="icon-small" alt="Bookmark icon" />
          </p>
          <p class="wine-type-case_3" v-if="wine.winetype === 'Rose'">
            <img :src="require('static/icons/food/traube_rose.svg')" class="icon-small" alt="Bookmark icon" />
          </p>
          <p class="grape-text">
            {{ wine.grapeTags[0] }}<span class="und-mehr" v-if="wine.grapeTags.length > 1"> und mehr...</span>
          </p>
        </div>
        </div>
  
        <div class="wine-flag">
          <img :src="require(`/static/icons/nations/${wine.nationTag}.svg`)" class="wine-info-flag" alt="Profile icon" />
        </div>
 
        <div class="wine-price">
          <div class="bottle-price">
            <div class="volume-value">
              <div>75cl</div>
              <div>10cl</div>
            </div>
            <div class="price-value">
              <div><b>CHF {{ wine.openprice * 7}}</b></div>
              <div><b>CHF {{ wine.openprice}}</b></div>
            </div>
          </div>
        </div>
        
      </div>
      <div class="wine_card_row3">
        <div class="container-above">
          <button v-if="!isBookmark" @click.stop="addToBookmarks" class="bookmark-button-info">
            <img v-if="!isFavorite" :src="require('static/icons/buttons/merklisteoff.jpg')" class="icon" alt="Bookmark icon" />
            <img v-else :src="require('static/icons/buttons/merkon.jpg')" class="icon" alt="Bookmark icon" />
          </button>
          <button v-else @click.stop="removeWineInBookmark" class="bookmark-button-info">
            <img :src="require('static/icons/buttons/loschen.svg')" class="del-icon" alt="Filter icon" />
          </button>
        </div>
        <div v-if="wine.rating > 10 && !isBookmark" class="container-below">
          <p class="wine-rating-title" :style="isHighestRated ? 'color: #1F7771F; font-weight: bold;' : ''">
            Your Taste
          </p>
          
          <div class="container-below-child">
            <div class="wine-rating-left">
              <div class="weinglas-grün" v-if="isHighestRated">
                <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 28.4 28.4" style="enable-background:new 0 0 28.4 28.4;" xml:space="preserve">
                <style type="text/css">
                  .stg0{display:none;}
                  .stg1{fill:none;stroke:#1F771F;stroke-miterlimit:10;}
                </style>
                <g id="Vorlage" class="stg0"> 
                </g>
                <g>
                  <path class="stg1" d="M10.2,3.4h7.9c0,0,7,13.7-3.8,13.7S10.2,3.4,10.2,3.4z"/>
                  <line class="stg1" x1="14.3" y1="17.1" x2="14.3" y2="24.5"/>
                  <ellipse class="stg1" cx="14.3" cy="25.5" rx="4.3" ry="0.6"/>
                  <line class="stg1" x1="8.2" y1="10.3" x2="20.2" y2="10.3"/>
                </g>
                </svg>
              </div>

                <div class="weinglas" v-else>
                <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 28.4 28.4" style="enable-background:new 0 0 28.4 28.4;" xml:space="preserve">
                <style type="text/css">
                  .st0s{display:none;}
                  .st1s{fill:none;stroke:#000000;stroke-width:0.75;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                  .st2s{fill:none;stroke:#000000;stroke-width:0.5;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
                </style>
                <g id="Vorlage" class="st0s">
                </g>
                <g id="Pikto">
                  <path class="st1s" d="M9.2,0.7h9.4c0,0,8.3,16.2-4.5,16.2S9.2,0.7,9.2,0.7z"/>
                  <line class="st1s" x1="14.1" y1="17" x2="14.1" y2="26.2"/>
                  <ellipse class="st1s" cx="14.1" cy="27" rx="5.1" ry="0.7"/>
                  <line class="st2s" x1="6.8" y1="8.9" x2="21.1" y2="8.9"/>
                </g>
                </svg>
              </div>
 
            </div>
            <div class="wine-rating-right">
              <div class="wine-rating" :style="isHighestRated ? 'color: #1F771F; font-weight: bold; font-size: 20px;' : ''">
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
      isHighestRated: {
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
      removeWineInBookmark() {
        this.$emit('remove-wine-element');
      },

      addToBookmarks() {
        const bookmarkedWines = JSON.parse(localStorage.getItem('bookmarkedWines')) || [];
        const alreadyBookmarked = bookmarkedWines.some(bookmarkedWine => bookmarkedWine._id === this.wine._id);
        if (!alreadyBookmarked) {
          bookmarkedWines.push(this.wine);
          localStorage.setItem('bookmarkedWines', JSON.stringify(bookmarkedWines));
          this.isFavorite = true;
        } else {
          const updatedBookmarkedWines = bookmarkedWines.filter(bookmarkedWine => bookmarkedWine._id !== this.wine._id);
          localStorage.setItem('bookmarkedWines', JSON.stringify(updatedBookmarkedWines));
          this.isFavorite = false;
        }
        this.$emit('bookmark-removed');
      },
    
      openDetailView() {
        this.$emit('open-detail-view', this.wine);
      },

    },
  }
  </script>


  <style>

  @import "@/CSS/shared-wine-type-styles.css";
  
  * {
    font-family: 'Soleil', sans-serif;
  }

  .bookmark-button-info{
    border: none;
    background-color: white;
  }

  .del-icon{
    width:25px;
    height: 25px;
  }

  .und-mehr{
    font-size: 8px;
  }

  .grape-text{
    font-size: 12px;
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
    box-shadow: 0px 0px 2.5px 2.5px rgba(136, 136, 136, 0.1);
    border-radius: 10px;
  }  

  .wine-img-container {
    position: relative;
    width: 50px;
  }

  .wine-image, .verlauf-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
  }

  .verlauf-image {
    z-index: 1;
  }

  .container-above{
    padding-top: 10px;
  }

  .wine-image {
    height: 100%;
    object-fit: contain;
    z-index: 2;
    margin-left: 20px;

  }

  .wine-info-flag{
    width: 20px;
    height: 13px;
  }

  .wine-card-row1 {
    display: flex;
    background-color: white;
    border-radius: 25px;
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
    padding-right: 5px;
  }

  .wine-flag {
    width: 100%;
    height: auto;
    display: block;
    background-size: contain;
    background-repeat: no-repeat;
    margin-bottom: 0;
    margin-top:5px;
    margin-bottom: 5px;
  }
  
  .wine-title {
    font-size: 14px;
    margin-top: 5px;
    color: black;
    font-family: 'Semplicita', sans-serif;
  }
  
  .wine-attribute {
    font-size: 12px;
  }

  .wine-price {
    font-size: 12px;

    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
  }

  .bottle-price {
    display: flex;
    flex-direction: row;
    justify-content:left;
  }

  .price-label,
  .price-value,
  .volume-value {
    display: flex;
    flex-direction: column;
  }

  .price-value, .volume-value{
    padding-left: 5px;
  }
  
  .star-rating {
    width: 100%;
    transform: scale(0.5);
  }

  .weinglas-grün{
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
  }

  .weinglas{
    width: 40px;
    height: 40px;
    margin-bottom: 5px;
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
    font-size: 12px;
    padding-left: 10px;

  }

  .icon-small {
    width: 18px;
    height: 18px;
  }

  </style>