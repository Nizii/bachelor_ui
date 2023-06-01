<template>
<div>
  <div class="background-overlay" v-if="frameOpen" />
  <div class="overlay-frame" :class="{ open: frameOpen }" :style="{ backgroundImage: 'url(background' + getBackgroundImage() + ')' }">
    <div class="detail-view-header">
      <div id="row1">
        <p id="detail-view-titel">{{wine.name}}</p>
        <button id="detail-view-close-btn" @click="closeOverlay">
          <img :src="require('static/icons/buttons/close.png')" class="icon" alt="Bookmark icon" />
        </button>
      </div>
    </div>
    <div class="inner-overlay">
        <div id="row2">
          <div class="wine-type_container" :style="{ color: getButtonTextColor() }">
            <p class="wine-type-case_1" v-if="wine.winetype === 'Weisswein'">Weiss
              <img :src="require('static/icons/others/traube.svg')" class="icon-small" alt="Bookmark icon" /></p>
            <p class="wine-type-case_2" v-if="wine.winetype === 'Rotwein'">Rot
              <img :src="require('static/icons/others/traube.svg')" class="icon-small" alt="Bookmark icon" /></p>
            <p class="wine-type-case_3" v-if="wine.winetype === 'Rose'">Rosé
              <img :src="require('static/icons/others/traube.svg')" class="icon-small" alt="Bookmark icon" /></p>
              <button @click.stop="addToBookmarks">
                <img v-if="!isBookmarked" :src="require('static/icons/buttons/merkliste.png')" class="detail-bookmark-icon" alt="Bookmark icon" />
                <img v-else :src="require('static/icons/buttons/merkliste_an.png')" class="detail-bookmark-icon" alt="Bookmark icon" />
              </button>              
          </div>
          <br>
          <p id="detail-view-grape">{{wine.grape}}</p>
        </div>
      <div class="detail-view-main-container">
        <div class="detail-view-left">
          <br>
          <p class="detail-view-label">Preis</p>
          <p class="detail-view-content"><b>CHF {{wine.bottleprice}}.-</b></p>
          <br>
          <p class="detail-view-label">Land</p>
          <b>
          <p class="detail-view-content">
            {{wine.regionTag}}, {{wine.nationTag}} 
            <img :src="require(`/static/icons/nations/${wine.nationTag}.png`)" class="detail-view-flag" alt="Profile icon" />
          </p>
          </b> 
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
          <p class="detail-view-description">{{wine.winzer}}</p>
          <div v-if="isLoggedIn" class="add-to-favorite-container">
            <button v-if="!wineInCellar" class="detail-view-button" :style="{ color: getButtonTextColor(), backgroundColor: getButtonColor() }" @click="addToWineCellar">
              Zum Weinkeller hinzufügen
            </button>
            <button v-else class="detail-view-button" :style="{ color: getButtonTextColor(), backgroundColor: getButtonColor() }" @click="removeFromWineCellar">
              Entfernen
            </button>
          </div>          
        </div>
        <div class="detail-view-right">
          <img class="detail-view-image" :src="wine.link"/>
        </div>
      </div>
    </div>

    <div class="inner-overlay-2">

      <div class="line-1"></div>

      <p id="detail-view-titel">Geschmacksprofil</p>
      <radar-chart :data="chartData" :options="chartOptions" />
      <button class="detail-view-button" @click="calcTasteProfile" :style="{ color: getButtonTextColor(), backgroundColor: getButtonColor() }">
        Geschmacksprofil berechnen
      </button>

      <div class="line-1"></div>

      <TasteInfo :background-color="getBackgroundColor()" @get-background-color="getBackgroundColor"/>

      <div class="line-2"></div>

      <div class="detail-view-comment-container" :style="{ backgroundColor: getBackgroundColor() }">
        <p id="detail-view-titel">Kommentare</p>
        <div class="comment" v-for="(comment, index) in wine.comments" :key="index">
          <p class="comment-user">{{ comment[0] }}</p>
          <p class="comment-content">{{ comment[1] }}</p>
        </div>
      
        <div class="comment-input-container" v-if="isLoggedIn">
          <input type="text" v-model="newComment" placeholder="Füge einen Kommentar hinzu..." />
          <button class="detail-view-button" :style="{ color: getButtonTextColor(), backgroundColor: getButtonColor() }" @click="addComment">
            Kommentiere
          </button>
        </div>
        <div v-else>
          <p>Registriere dich und kommentiere!. 
            <br>
            <b>Unten rechts</b>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
  
  <script>
  import TasteInfo from '~/components/TasteComponent/TasteInfo.vue';
  import RadarChart from '~/components/Charts/RadarChart.vue';

  export default {
    name: 'DetailWineView',
    components: {
      TasteInfo,
      RadarChart,
    },

    props: {
      wine: {
        type: Object,
        required: true,
      },
    },

    beforeCreate() {
      const storedPreferences = localStorage.getItem('preferences');
      if (storedPreferences) {
        this.preferences = JSON.parse(storedPreferences);
      } else {
        console.log("Keine Präferenzen verfügbar");
        this.preferences = { sauer: 0, suss: 0, intensiv: 0, fruchtig: 0, holzig: 0, trocken: 0 };
      }
    },


    data() {
      const preferences = this.preferences || { sauer: 0, suss: 0, intensiv: 0, fruchtig: 0, holzig: 0, trocken: 0 };
      return {
        userData: null,
        frameOpen: false,
        wineInCellar:null,
        isBookmarked: false,
        newComment: '',
        isLoggedIn: false,
        chartData: {
          labels: ['Säure', 'Zucker', 'Intensität', 'Fruchtig', 'Holzig', 'Trocken'],
          datasets: [
            {
              label: this.wine.name,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 0.8)',
              pointBackgroundColor: 'red',
              pointBorderColor: 'red',
              pointHoverBackgroundColor: 'red',
              pointHoverBorderColor: 'red',
              data: [
                this.wine.radarchart[0],
                this.wine.radarchart[1],
                this.wine.radarchart[2],
                this.wine.radarchart[3],
                this.wine.radarchart[4],
                this.wine.radarchart[5] 
              ]
            },
            {
              label: 'Mein Geschmacksprofil', 
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 0.8)',
              pointBackgroundColor: 'blue',
              pointBorderColor: 'blue',
              pointHoverBackgroundColor: 'blue',
              pointHoverBorderColor: 'blue',
              data: [
                preferences.sauer,
                preferences.suss,
                preferences.intensiv,
                preferences.fruchtig,
                preferences.holzig,
                preferences.trocken
              ],
            }
          ]
        },
        chartOptions: {
          title: {
            display: false,
          },
          scale: {
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 5,
              stepSize: 1
            }
          }
        },
      }
    },


    methods: {

      checkWineInCellar() {
        const wineCellar = JSON.parse(localStorage.getItem('favoriten')) || [];
        const alreadyInCellar = wineCellar.some(wine => wine._id === this.wine._id);
        if (alreadyInCellar) {
          this.wineInCellar = true;
        } else {
          this.wineInCellar = false;
        }
      },
      
      calcTasteProfile() {
        this.$router.push('/Tasteprofile/Sweet');
      },

      closeOverlay() {
        this.frameOpen = false;
        document.body.style.overflow = 'auto'; // Erlaubt das Scrollen auf dem Body wieder
        setTimeout(() => {
          this.$emit('close');
        }, 300);
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

      async getUserData() {
        const token = localStorage.getItem('jwt');
        if(token) {
          try {
          const response = await this.$axios.get(`https://wine.azurewebsites.net/api/user/userdata/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          this.userData = response.data;
          if (this.userData) {
          localStorage.setItem('favoriten', JSON.stringify(this.userData.favoriten));
        }    
          } catch (error) {
            console.error(error);
          }
        }


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
          this.isBookmarked = true;  // Der Wein ist als Lesezeichen gesetzt
        } else {
          // Wenn der Wein bereits gemerkt ist, wird der Wein entfernt
          const updatedBookmarkedWines = bookmarkedWines.filter(wine => wine._id !== this.wine._id);
          localStorage.setItem('bookmarkedWines', JSON.stringify(updatedBookmarkedWines));
          this.isBookmarked = false;  // Der Wein ist nicht mehr als Lesezeichen gesetzt
        }
        this.$emit('bookmark-removed');
      },



      addToWineCellar() {
        // Erhalte die aktuelle Liste der Weine im Weinkeller (oder eine leere Liste, wenn noch keine Weine hinzugefügt wurden)
        const wineCellar = JSON.parse(localStorage.getItem('wineCellar')) || [];
        // Überprüfe, ob der aktuelle Wein bereits im Weinkeller ist
        const alreadyAdded = wineCellar.some(wine => wine._id === this.wine._id);
        
        if (!alreadyAdded) {
          wineCellar.push(this.wine);
          this.userData.favoriten = wineCellar;
          localStorage.setItem('wineCellar', JSON.stringify(wineCellar));
          this.wineInCellar = true;

          // Neuen Wein zum Server hinzufügen
          const token = localStorage.getItem('jwt');
          if (token) {
            const wineId = this.wine._id;
            this.$axios.post(`https://wine.azurewebsites.net/api/user/add-favorite/${wineId}`, {}, { headers: { Authorization: `Bearer ${token}` }})
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.error(error);
            });
          }
        } else {
          // Wenn der Wein bereits im Weinkeller ist, wird er entfernt
          const updatedWineCellar = wineCellar.filter(wine => wine._id !== this.wine._id);
          this.userData.favoriten = updatedWineCellar;
          localStorage.setItem('wineCellar', JSON.stringify(updatedWineCellar));
          this.wineInCellar = false;
        }
        this.$emit('update-profile');
      },

      async removeFromWineCellar() {
        const wineCellar = JSON.parse(localStorage.getItem('wineCellar')) || [];
        const updatedWineCellar = wineCellar.filter(wine => wine._id !== this.wine._id);
        this.userData.favoriten = updatedWineCellar; 
        localStorage.setItem('wineCellar', JSON.stringify(updatedWineCellar));
        this.wineInCellar = false;
        
        // Wein vom Server entfernen
        const token = localStorage.getItem('jwt');
        if(token) {
          try {
            await this.$axios.post(`https://wine.azurewebsites.net/api/user/remove-favorite/${this.wine._id}`, null, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          } catch (error) {
            console.error(error);
          }
        }
        this.$emit('update-profile');
      },


      async addComment() {
        const comment = this.newComment;
        const wineId = this.wine._id;
        const username = localStorage.getItem('user');

        console.log("Username "+ username);

        try {
          const response = await this.$axios.post(
            `https://wine.azurewebsites.net/api/wine/${wineId}/comments`,
            { author: username, content: comment }
          );
          this.wine.comments.push([username, comment]);
          this.newComment = '';
        } catch (error) {
            console.error(error);
        }
      },

    },

    mounted(){
      setTimeout(() => {
        this.frameOpen = true;
      }, 100); 

      document.body.style.overflow = 'hidden';
       // Verbietet das Scrollen auf dem Background
      if(localStorage.getItem('jwt')){
        this.isLoggedIn = true;
      } 
      this.getUserData();
      this.checkWineInCellar();
    },

  };
  </script>
  
  <style>

  @import "@/CSS/shared-wine-type-styles.css";

  #row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0;
    padding: 10px;
    position: sticky;

  }
  
  #detail-view-close-btn {
    border: none;
    background: none;
    font-size: 1.5em;
    cursor: pointer;
  }

  .detail-bookmark-icon{
    margin-left: 20px;
  }

  .overlay-frame {
    z-index: 1000;
    transition:transform 0.5s;
    transform: translateY(100%);
    flex-direction: column;
  }

  .inner-overlay{
    padding-left: 15px;
    padding-right: 5px;
  }
  .inner-overlay-2{
    padding: 15px;
  }

  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 999;
  }
  
  .detail-view-button{
    border-radius: 15px;
    padding: 10px 20px;
    text-decoration: none; 
    margin-bottom: 20px;
    margin-top: 2em;
  }

  .detail-view-flag{
    width: 28px;
    height: 18px;
    margin-left: 15px;
  }

  .overlay-frame.open {
    transform: translateY(0);
  }

  .detail-view-fixed-title{

  }
  
  .detail-view-header {
    position: sticky;
    top: 0;
    z-index: 1001;
    width: 100%; 
    background-color: white;
    border-bottom: 1px solid rgb(214, 214, 214);
    margin-bottom: 3em;
}

  
  .detail-view-main-container {
    display: flex;

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
    padding: 1em;
    border-radius: 15px;
    margin-top: 2em; 
    margin-bottom: 3em;
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

  .line-1{
    border-bottom: 1px solid rgb(214, 214, 214);
    margin-top: 1em;
    margin-bottom: 3em;
    width: 100%;
  }

  .line-2{
    border-bottom: 1px solid rgb(214, 214, 214);
    margin-top: 3em;
    margin-bottom: 3em;
    width: 100%;
  }
  


  </style>
  
  