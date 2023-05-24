<template>
<div>
  <div class="background-overlay" v-if="frameOpen" />
  <div class="overlay-frame" :class="{ open: frameOpen }" :style="{ backgroundImage: 'url(' + getBackgroundImage() + ')' }">
    <div class="detail-view-header">
      <div id="row1">
        <p id="detail-view-titel">{{wine.name}}</p>
        <button id="detail-view-close-btn" @click="closeOverlay">
          <img :src="require('@/icons/buttons/close.png')" class="icon" alt="Bookmark icon" />
        </button>
      </div>
      <div id="row2">
        <div class="wine-type_container" :style="{ color: getButtonTextColor() }">
          <p class="wine-type-case_1" v-if="wine.winetype === 'Weisswein'">Weiss
            <img :src="require('@/icons/others/traube.png')" class="icon-small" alt="Bookmark icon" /></p>
          <p class="wine-type-case_2" v-if="wine.winetype === 'Rotwein'">Rot
            <img :src="require('@/icons/others/traube.png')" class="icon-small" alt="Bookmark icon" /></p>
          <p class="wine-type-case_3" v-if="wine.winetype === 'Rose'">Rosé
            <img :src="require('@/icons/others/traube.png')" class="icon-small" alt="Bookmark icon" /></p>
        </div>
        <br>
        <p id="detail-view-grape">{{wine.grape}}</p>
      </div>
    </div>
    <div class="detail-view-main-container">
      <div class="detail-view-left">
        <br>
        <p class="detail-view-label">Preis</p>
        <p class="detail-view-content"><b>CHF {{wine.bottleprice}}.-</b></p>
        <br>
        <p class="detail-view-label">Land</p>
        <p class="detail-view-content"><b>{{wine.regionTag}}, {{wine.nationTag}}</b></p>
        <br>
        <p class="detail-view-description">{{wine.charakter}}</p>
        <br>
        <p class="detail-view-description">
          Der Wein passt zu 
          <span v-for="(meal, index) in wine.foodTags" :key="`meal-${index}`">
            {{ meal }}
            <span v-if="index !== wine.foodTags.length - 1">
            ,
            </span>
          </span>
        </p>
        <br>
        <p class="detail-view-description">{{wine.vinzer}}</p>
        <div class="add-to-favorite-container">
          <button v-if="isLoggedIn" class="detail-view-button" :style="{ color: getButtonTextColor(), backgroundColor: getButtonColor() }" @click="addToWineCellar">
            Zum Weinkeller hinzufügen
          </button>
          <button   v-else class="detail-view-button" :style="{ color: getButtonTextColor(), backgroundColor: getButtonColor() }" @click="addToBookmarks">
            Zur Merkliste
          </button>
        </div>
      </div>
      <div class="detail-view-right">
        <img class="detail-view-image" :src="wine.link"/>
      </div>
    </div>
    <div class="detail-view-comment-container" :style="{ backgroundColor: getBackgroundColor() }">
      <p id="detail-view-titel">Kommentare</p>
      <div class="comment" v-for="(comment, index) in wine.comments" :key="index">
        <p class="comment-content">{{ comment }}</p>
      </div>
      <div class="comment-input-container" v-if="isLoggedIn">
        <input type="text" v-model="newComment" placeholder="Füge einen Kommentar hinzu..." />
        <button class="detail-view-button" :style="{ color: getButtonTextColor(), backgroundColor: getButtonColor() }" @click="addComment">
          Kommentiere
        </button>
      </div>
      <div v-else>
        <p>Registriere dich und kommentiere!!!. 
          <br>
          <router-link to="/Login"><b>Klick hier</b></router-link>
        </p>
      </div>
    </div>
  </div>
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

    data() {
      return{
        frameOpen: false,
        newComment: '',
        isLoggedIn: false,
      }
    },

    methods: {
      closeOverlay() {
        this.frameOpen = false;
        document.body.style.overflow = 'auto'; // Erlaubt das Scrollen auf dem Body wieder
        setTimeout(() => {
          this.$emit('close');
        }, 300);
      },

      addComment() {
        this.wine.comments.push({ content: this.newComment, author: 'User', date: new Date().toISOString() });
        this.newComment = '';
      },

      getButtonColor() {
        if (this.wine.winetype === 'Weisswein') {
          return '#E8D954';
        } else if (this.wine.winetype === 'Rotwein') {
          return '#A15B80';
        } else if (this.wine.winetype === 'Rose') {
          return '#DE6058';
        } else {
          return '#781449';
        }
      },

      getBackgroundColor() {
        if (this.wine.winetype === 'Weisswein') {
          return '#F5F5DC';
        } else if (this.wine.winetype === 'Rotwein') {
          return '#C9A1B3';
        } else if (this.wine.winetype === 'Rose') {
          return '#F28A87';
        } else {
          return '#781449';
        }
      },
      
      getButtonTextColor() {
        if (this.wine.winetype === 'Weisswein') {
          return 'black';
        } else {
          return 'white';
        }
      },

      getBackgroundImage() {
        if (this.wine.winetype === 'Weisswein') {
          return '/weinflecke_weiss.png';
        } else if (this.wine.winetype === 'Rotwein') {
          return '/weinflecke_rot.png';
        } else if (this.wine.winetype === 'Rose') {
          return '/weinflecke_rose.png';
        } else {
          return '/weinflecke_weiss.png'; 
        }
      },
      
      openPopup() {

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
        }
        this.$emit('bookmark-removed');
        this.closeOverlay();
      },

      addToWineCellar() {
        // Erhalte die aktuelle Liste der Weine im Weinkeller (oder eine leere Liste, wenn noch keine Weine hinzugefügt wurden)
        const wineCellar = JSON.parse(localStorage.getItem('wineCellar')) || [];
        // Überprüfe, ob der aktuelle Wein bereits im Weinkeller ist
        const alreadyAdded = wineCellar.some(wine => wine._id === this.wine._id);
        // Wenn der Wein noch nicht im Weinkeller ist, wird er hinzugefügt
        if (!alreadyAdded) {
          wineCellar.push(this.wine);
          localStorage.setItem('wineCellar', JSON.stringify(wineCellar));
          this.isFavorite = true;
        } else {
          // Wenn der Wein bereits im Weinkeller ist, wird er entfernt
          const updatedWineCellar = wineCellar.filter(wine => wine._id !== this.wine._id);
          localStorage.setItem('wineCellar', JSON.stringify(updatedWineCellar));
          this.isFavorite = false;
        }
      },

    },

    mounted(){
      setTimeout(() => {
        this.frameOpen = true;
      }, 100); 
      document.body.style.overflow = 'hidden'; // Verbietet das Scrollen auf dem Background
      if(localStorage.getItem('jwt')){
        this.isLoggedIn = true;
      } 
    },

    created() {
      console.log('DetailWineView component created');
    }
};
  </script>
  
  <style>

  @import "@/CSS/shared-wine-type-styles.css";

  #row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0;
    padding-top: 0;
  }
  
  #detail-view-close-btn {
    border: none;
    background: none;
    font-size: 1.5em;
    cursor: pointer;
    margin-top: -1em;

  }

  .detail-view-button{
    width: 100%;
  }

  .overlay-frame {
    z-index: 1000;
    transition:transform 0.5s;
    transform: translateY(100%);
    overflow-y: auto;
    padding-left: 2em;
    padding-right: 1em;
    padding-top: 0em;
    padding-bottom: 6em;   
  }

  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999; /* Muss unbedingt kleiner als der z-index von overlay-frame sein */
  }
  
  .detail-view-button{
    background-color: #781449;
    color: white;
    border-radius: 15px;
    padding: 10px 20px;
    text-decoration: none; 
    margin-bottom: 20px;
  }

  .overlay-frame.open {
    transform: translateY(0);
  }
  
  .detail-view-header {
    width: 100%;
    margin-top: 30px;
  }
  
  .detail-view-main-container {
    display: flex;
    border-bottom: 1px solid black;
    margin: 1em 0;
  }
  
  .detail-view-left,
  .detail-view-right {
    flex: 1; 
  }
  
  .detail-view-label {
    margin-bottom: 0.03em;
    font-size: 14px;
  }

  .detail-view-content{
    font-weight: blod;
    font-size: 14px;
  }
  
  .detail-view-description {
    margin-top: 1em;
    font-size: 13px;
  }
  
  .detail-view-button {
    margin-top: 2em;
  }
  
  .detail-view-right {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-bottom: 2em;
  }
  
  .detail-view-image {
    width: 100px;
    height: 450px;
    margin-bottom: 0;
    padding-bottom: 0;
    margin-top: -6em; /* Negative Margin nach obe.*/

  }

  #detail-view-titel{
    color: black;
    font-size: 30px;
    font-weight: bold;
    font-family: sans-serif;
    margin-bottom: 20px;
  }

  #detail-view-grape{
    color: black;
    font-size: 20px;
    font-weight: bold;
    font-family: sans-serif;
  }

  .add-to-favorite-container{
    align-items: center;;
    padding-top: 1em;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

    /* Kommentarbereich */
  .detail-view-comment-container {
    width: 80%;
    padding: 1em;
    border-radius: 15px;
    margin-top: 2em; 
  }

  /* Kommentare */
  .comment {
    background-color: white;
    border-radius: 15px;
    padding: 1em;
    margin-bottom: 1em;
  }

  .comment-content {
    color: black;
  }

  /* Eingabefeld */
  .comment-input-container {
    align-items: center;
    border-top: 1px solid #0202027e;
    padding-top: 1em;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .comment-input-container input {
    padding: 1em;
    border-radius: 15px;
    border: 1px solid #1110107c;
    width:90%;
  }


  
  </style>
  
  