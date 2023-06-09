<template>
<div>
  <div class="background-overlay" v-if="frameOpen" />
  <div class="overlay-frame" :class="{ open: frameOpen }">
    <!--Header-->
    <div class="detail-view-header">
      <div id="row1">
        <p id="detail-view-titel">{{wine.name}}</p>
        <button id="detail-view-close-btn" @click="closeOverlay">
          <div v-if="wine.winetype === 'Weisswein'">
            <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 28.3 28.3" style="enable-background:new 0 0 28.3 28.3;" xml:space="preserve">
            <style type="text/css">
              .st0{opacity:0.5;fill:#E9D953;}
              .st1{fill:none;stroke:#000000;stroke-width:0.75;stroke-miterlimit:10;}
            </style>
            <circle class="st0" cx="14.1" cy="14.2" r="14.1"/>
            <g>
              <line class="st1" x1="9.4" y1="7.9" x2="19.2" y2="19"/>
              <line class="st1" x1="19.2" y1="7.9" x2="9.4" y2="19"/>
              <ellipse cx="19.2" cy="7.9" rx="0.4" ry="0.4"/>
              <ellipse cx="9.5" cy="7.9" rx="0.4" ry="0.4"/>
              <ellipse cx="9.4" cy="19" rx="0.4" ry="0.4"/>
              <ellipse cx="19.2" cy="19" rx="0.4" ry="0.4"/>
            </g>
            </svg>
          </div> 
          <div v-if="wine.winetype === 'Rotwein'">
            <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               viewBox="0 0 28.3 28.3" style="enable-background:new 0 0 28.3 28.3;" xml:space="preserve">
            <style type="text/css">
              .st0{opacity:0.7;fill:#661412;}
              .st1{fill:none;stroke:#000000;stroke-width:0.75;stroke-miterlimit:10;}
            </style>
            <circle class="st0" cx="14.1" cy="14.2" r="14.1"/>
            <g>
              <line class="st1" x1="9.6" y1="8" x2="19.4" y2="19.1"/>
              <line class="st1" x1="19.4" y1="8" x2="9.6" y2="19.1"/>
              <ellipse cx="19.4" cy="8" rx="0.4" ry="0.4"/>
              <ellipse cx="9.6" cy="8" rx="0.4" ry="0.4"/>
              <ellipse cx="9.6" cy="19.1" rx="0.4" ry="0.4"/>
              <ellipse cx="19.4" cy="19.1" rx="0.4" ry="0.4"/>
            </g>
            </svg>
            
          </div>
          <div v-if="wine.winetype === 'Rose'">
            <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 28.3 28.3" style="enable-background:new 0 0 28.3 28.3;" xml:space="preserve" class="icon">
              <style type="text/css">
                .st0{opacity:0.5;fill:#ED6861;}
                .st1{fill:none;stroke:#000000;stroke-width:0.75;stroke-miterlimit:10;}
              </style>
              <circle class="st0" cx="14.1" cy="14.2" r="14.1"/>
              <g>
                <line class="st1" x1="9.4" y1="7.9" x2="19.2" y2="19"/>
                <line class="st1" x1="19.2" y1="7.9" x2="9.4" y2="19"/>
                <ellipse cx="19.2" cy="7.9" rx="0.4" ry="0.4"/>
                <ellipse cx="9.5" cy="7.9" rx="0.4" ry="0.4"/>
                <ellipse cx="9.4" cy="19" rx="0.4" ry="0.4"/>
                <ellipse cx="19.2" cy="19" rx="0.4" ry="0.4"/>
              </g>
            </svg>
          </div>
        </button>
      </div>
    </div>
    <!--Content-->
    <div class="inner-overlay" :style="{ backgroundImage: 'url(background' + getBackgroundImage() + ')' }">
      <div id="row2">
        <div class="wrapper">
          <div class="inner-overlay" :style="{ backgroundImage: 'url(background' + getBackgroundImage() + ')' }"></div>
        </div>
      </div>

      <!--Weinbeschreibung-->
      <div class="detail-view-main-container">
        <div class="detail-view-left">
          
          <div class="wine-type-case_1" v-if="wine.winetype === 'Weisswein'">
            <div class="grape-case-left">
              <img :src="require('static/icons/food/traube_weisswein.svg')" class="detail-view-icon" alt="Bookmark icon" />
            </div>
            <div class="grape-case-right">
              <span v-for="(grape, index) in wine.grapeTags" :key="index">
              {{ grape }}
              <br>
            </span>
            </div>
          </div>

          <div class="wine-type-case_1" v-if="wine.winetype === 'Rotwein'">
            <div class="grape-case-left">
              <img :src="require('static/icons/food/traube_rotwein.svg')" class="detail-view-icon" alt="Bookmark icon" />
            </div>
            <div class="grape-case-right">
              <span v-for="(grape, index) in wine.grapeTags" :key="index">
              {{ grape }}
              <br>
            </span>
            </div>
          </div>

          <div class="wine-type-case_1" v-if="wine.winetype === 'Rose'">
            <div class="grape-case-left">
              <img :src="require('static/icons/food/traube_rose.svg')" class="detail-view-icon" alt="Bookmark icon" />
            </div>
            <div class="grape-case-right">
              <span v-for="(grape, index) in wine.grapeTags" :key="index">
              {{ grape }}
              <br>
            </span>
            </div>
          </div>

          <br>
          <p class="detail-view-label">Preis</p>
          <p class="detail-view-content"><b>CHF {{wine.openprice * 7}}.-</b></p>
          <br>
          <p class="detail-view-label">Land</p>
          <b>
          <p class="detail-view-content">
            {{wine.regionTag}}, {{wine.nationTag}} 
            <img :src="require(`/static/icons/nations/${wine.nationTag}.png`)" class="detail-view-flag" alt="Profile icon" />
          </p>
          </b> 
          <p class="detail-view-description">
            Der Wein passt zu 
            <span v-for="(meal, index) in wine.foodTags" :key="`meal-${index}`">
              {{ meal }}
              <span v-if="index !== wine.foodTags.length - 1">
              ,
              </span>
            </span>
          </p>  
          <p class="detail-view-description">{{wine.charakter}}</p>
          <p class="detail-view-description">{{wine.winzer}}</p>
          <div v-if="isLoggedIn" class="add-to-favorite-container">
            <button v-if="!isWineInCellar  && !inProfile" class="detail-view-button" @click="addToWineCellar">
              Zum Weinkeller hinzufügen
            </button>
            <button v-else class="detail-view-button" @click="removeFromWineCellar">
                Entfernen
            </button>
          
          </div>          
        </div>
        <!--Weinbild-->
        <div class="detail-view-right">
          <img class="detail-view-image" :src="wine.link"/>
        </div>
      </div>
    </div>

    <div class="inner-overlay-2">

      <div class="line-1"></div>

      <!--Radarchart des Geschmacksprofil-->
      <p id="detail-view-titel">Your Taste</p>
      <radar-chart :data="chartData" :options="chartOptions" />
      <button class="detail-view-button" @click="calcTasteProfile">
        Your Taste
      </button>

      <div class="line-1"></div>

      <!--Textarea für dieBeschreibung von Wein-->
      <TasteInfo @get-background-color="getBackgroundColor"/>

      <div class="line-2"></div>

      <!--Kommentararea-->
      <div class="detail-view-comment-container">
        <p id="detail-view-titel">Meinung der anderen Gäste</p>
        <div class="placeholder"></div>
        <div class="comment" v-for="(comment, index) in wine.comments" :key="index">
          <p class="comment-user">{{ comment[0] }}</p>
          <p class="comment-content">{{ comment[1] }}</p>
        </div>
      
        <div class="comment-input-container" v-if="isLoggedIn">
          <input class="comment-input" type="text" v-model="newComment" placeholder="Füge einen Kommentar hinzu..." />
          <button class="detail-view-button-comment" @click="addComment">
            Senden
          </button>
        </div>
        <div class="comment-input-container" v-else>
          <input class="comment-input" type="text" v-model="gastUser" placeholder="Dein Name..." />
          <input class="comment-input" type="text" v-model="newComment" placeholder="Füge einen Kommentar hinzu..." >
          <button class="detail-view-button-comment" @click="addComment">
            Senden
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
  
  <script>
  import TasteInfo from '~/components/TasteComponent/TasteInfo.vue';
  import RadarChart from '~/components/Charts/RadarChart.vue';
  import { mapState } from 'vuex';

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

      inProfile: {
        type: Boolean,
        default: false,
      },

      closeOverlayHandlerOn: {
        type: Boolean,
        default: false,
      }
    },

    computed: {
      isWineInCellar() {
        return this.$store.getters.isWineInCellar(this.wine._id);
      }
    },

    data() {
      var temp;
      if(JSON.parse(localStorage.getItem('savedPreferences'))){
        temp = JSON.parse(localStorage.getItem('savedPreferences'));
      } else if (JSON.parse(localStorage.getItem('preferences'))){
        temp = JSON.parse(localStorage.getItem('preferences'))
      } else {
        temp = { sauer: 0, suss: 0, intensiv: 0, fruchtig: 0, holzig: 0, trocken: 0 };
      }

      var radarWineColor = this.getRadarColor();
      var radarDotsColor = this.getRadarColorDots();
      var radarLineColor = this.getRadarColorLine();
      return {
        gastUser:"",
        userData: null,
        frameOpen: false,
        isBookmarked: false,
        newComment: '',
        isLoggedIn: false,
        chartData: {
          labels: ['Säure', 'Zucker', 'Intensität', 'Fruchtig', 'Holzig', 'Trocken'],
          datasets: [
            {
              label: this.wine.name,
              backgroundColor: radarWineColor,
              borderColor: radarLineColor,
              pointBackgroundColor: radarDotsColor,
              pointBorderColor: radarDotsColor,
              pointHoverBackgroundColor: radarDotsColor,
              pointHoverBorderColor: radarDotsColor,
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
              backgroundColor: 'rgba(32, 120, 51, 0.2)',
              borderColor: 'rgba(32, 120, 51, 0.8)',
              pointBackgroundColor: '#1F771F',
              pointBorderColor: '#1F771F',
              pointHoverBackgroundColor: '#1F771F',
              pointHoverBorderColor: '#1F771F',
              data: [
                temp.sauer,
                temp.suss,
                temp.intensiv,
                temp.fruchtig,
                temp.holzig,
                temp.trocken
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
          this.$emit('load-profile');
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

      getRadarColor() {
        if (this.wine.winetype === 'Weisswein') {
          return 'rgba(232, 217, 84, 0.3)';
        } else if (this.wine.winetype === 'Rotwein') {
          return 'rgba(102, 15, 15, 0.3)';
        } else if (this.wine.winetype === 'Rose') {
          return 'rgba(222, 96, 88, 0.3)';
        } else {
          return '#781449';
        }
      },

      getRadarColorDots() {
        if (this.wine.winetype === 'Weisswein') {
          return '#E8AC01';
        } else if (this.wine.winetype === 'Rotwein') {
          return 'rgba(102, 15, 15, 1)';
        } else if (this.wine.winetype === 'Rose') {
          return 'rgba(222, 96, 88, 1)';
        } else {
          return '#781449';
        }
      },

      getRadarColorLine() {
        if (this.wine.winetype === 'Weisswein') {
          return 'rgba(232, 217, 84, 0.7)';
        } else if (this.wine.winetype === 'Rotwein') {
          return 'rgba(102, 15, 15, 0.7)';
        } else if (this.wine.winetype === 'Rose') {
          return 'rgba(222, 96, 88, 0.7)';
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

      /*
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
      */
      
      getBackgroundImage() {
        if (this.wine.winetype === 'Weisswein') {
          return '/fleckweisswein4.png';
        } else if (this.wine.winetype === 'Rotwein') {
          return '/rotweinfleck4.png';
        } else if (this.wine.winetype === 'Rose') {
          return '/fleckrose4.png';
        } else {
          return '/rotweinfleck4.png'; 
        }
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

      // Fürgt ein Wein dem Weinkeller hinzu im localStorage und in der Datenbank
      // Es existieren während der Laufzeit zwei Instanzen dieser Komponente
      // Deshalb wir die var "inCellar" im vuex Store gespeichert um inkonsistenzen zu vermeiden
      async addToWineCellar() {
        const wineCellar = JSON.parse(localStorage.getItem('wineCellar')) || [];
        const alreadyAdded = wineCellar.some(wine => wine._id === this.wine._id);
        if (!alreadyAdded) {
          wineCellar.push(this.wine);
          localStorage.setItem('wineCellar', JSON.stringify(wineCellar));
          this.$store.commit('setWineInCellar', { wineId: this.wine._id, inCellar: true });
          const favoriten = JSON.parse(localStorage.getItem('favoriten')) || [];
          favoriten.push(this.wine);
          localStorage.setItem('favoriten', JSON.stringify(favoriten))
          const token = localStorage.getItem('jwt');
          if (token) {
            const wineId = this.wine._id;
            await this.$axios.post(`https://wine.azurewebsites.net/api/user/add-favorite/${wineId}`, {}, { headers: { Authorization: `Bearer ${token}` }})
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.error(error);
            });
          }
        } else {
          const updatedWineCellar = wineCellar.filter(wine => wine._id !== this.wine._id);
          localStorage.setItem('wineCellar', JSON.stringify(updatedWineCellar));
          this.$store.commit('setWineInCellar', { wineId: this.wine._id, inCellar: false });
        }
        this.$emit('update-profile');
      },

      // Fürgt ein Wein dem Weinkeller hinzu im localStorage und in der Datenbank
      // Es existieren während der Laufzeit zwei Instanzen dieser Komponente
      // Deshalb wir die var "inCellar" im vuex Store gespeichert um inkonsistenzen zu vermeiden
      async removeFromWineCellar() {
        const wineCellar = JSON.parse(localStorage.getItem('wineCellar')) || [];
        const updatedWineCellar = wineCellar.filter(wine => wine._id !== this.wine._id);
        localStorage.setItem('wineCellar', JSON.stringify(updatedWineCellar));
        this.$store.commit('setWineInCellar', { wineId: this.wine._id, inCellar: false });
        const favoriten = JSON.parse(localStorage.getItem('favoriten')) || [];
        const updatedFavoriten = favoriten.filter(wine => wine._id !== this.wine._id);
        localStorage.setItem('favoriten', JSON.stringify(updatedFavoriten));
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
        if(this.closeOverlayHandlerOn) {this.closeOverlay()}
        this.$emit('update-profile');
      },

      async addComment() {
        const comment = this.newComment;
        const wineId = this.wine._id;
        var username;
        if(localStorage.getItem('user')){
          username = localStorage.getItem('user');
        } else {
          username = this.gastUser;
          this.gastUser = '';
        }
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
      // Verbietet das Scrollen auf dem Background
      document.body.style.overflow = 'hidden';
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

  .wine-type-case_1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .grape-case-right {
    flex: 1;
  }

  .comment-user{
    color: #660F0F;
    font-size: 12px;
    font-weight: bold;
    padding-bottom: 10px;
  }

  #row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0;
    padding: 20px;
    position: sticky;

  }
  
  #detail-view-close-btn {
    width: 50px;
    height: 50px;
    border: none;
    background: none;
    font-size: 1.5em;
    cursor: pointer;
  }

  .placeholder{
    height: 20px;
  }

  .overlay-frame {
    z-index: 1000;
    transition:transform 0.5s;
    transform: translateY(100%);
    flex-direction: column;
  }

  .wrapper {
    padding-bottom: 50px;
  }
  
  .inner-overlay {
    padding-left: 15px;
    padding-right: 5px;
    background-position: center bottom 100px;    
    background-size: 100% auto;
    background-repeat: no-repeat;
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
    width: auto;
    background-color: #660F0F;
    color: white;
    border:none;
  }

  .detail-view-button-comment{
    border-radius: 15px;
    padding: 10px 20px;
    text-decoration: none; 
    margin-bottom: 20px;
    margin-top: 2em;
    width: auto;
    background-color: #660F0F;
    color: white;
    width: 100%;
    border:none;
  }

  .comment-input{
    border-radius: 15px;
    padding: 10px 20px;
    text-decoration: none; 
    margin-bottom: 20px;
    margin-top: 2em;
    width: 300px;
  }

  .detail-view-flag{
    width: 28px;
    height: 18px;
    margin-left: 15px;
  }

  .overlay-frame.open {
    transform: translateY(0);
  }
  
  .detail-view-header {
    position: sticky;
    top: 0;
    z-index: 1001;
    width: 100%; 
    background-color: white;
  }

  .detail-view-main-container {
    display: flex;
  }
  
  .detail-view-left,
  .detail-view-right {
    flex: 1;
    width: 30%;
  }

  .detail-view-icon{
    width: 30px;
    height: 30px;
  }
  
  .detail-view-label {
    margin-bottom: 0.03em;
    font-size: 14px;
    margin-top: 15px;
  }

  .detail-view-content{
    font-weight: blod;
    font-size: 14px;
  }
  
  .detail-view-description {
    margin-top: 1em;
    font-size: 13px;
    margin-bottom: 10px;
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
    margin-top: 0; 
  }

  #detail-view-titel{
    color: black;
    font-size: 30px;
    font-weight: bold;
    font-family: sans-serif;
    font-family: 'Semplicita', sans-serif;
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

  .detail-view-comment-container {
    padding: 1em;
    border-radius: 15px;
    margin-top: 2em; 
    margin-bottom: 3em;
    border: 2px solid rgb(214, 214, 214);
  }

  .comment {
    background-color: white;
    border-radius: 15px;
    padding: 1em;
    margin-bottom: 1em;
    border: 2px solid rgb(214, 214, 214);
  }

  .comment-content {
    color: black;
  }

  .comment-input-container {
    align-items: center;
    border-top: 1px solid #0202027e;
    padding-top: 0.3em;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .comment-input-container input {
    padding: 1em;
    border-radius: 15px;
    border: 2px solid rgb(214, 214, 214);
    width:90%;
  }

  .line-1{
    border-bottom: 2px solid rgb(214, 214, 214);
    margin-top: 1em;
    margin-bottom: 3em;
    width: 100%;
  }

  .line-2{
    border-bottom: 2px solid rgb(214, 214, 214);
    margin-top: 3em;
    margin-bottom: 3em;
    width: 100%;
  }
  </style>
  
  