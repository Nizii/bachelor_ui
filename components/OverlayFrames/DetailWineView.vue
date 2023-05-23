<template>
<div>
  <div class="background-overlay" v-if="frameOpen" />
  <div class="overlay-frame" :class="{ open: frameOpen }">
    <div class="detail-view-header">
      <div id="row1">
        <p id="detail-view-titel">{{wine.name}}</p>
        <button id="detail-view-close-btn" @click="closeOverlay">
          <img :src="require('@/icons/buttons/close.png')" class="icon" alt="Bookmark icon" />         </button>
        </button>
      </div>
      <div id="row2">
        <p id="detail-view-grape">{{wine.grape}}</p>
      </div>
    </div>
    <div class="detail-view-main-container">
      <div class="detail-view-left">
        <p class="detail-view-label">Preis /75 cl</p>
        <p class="detail-view-content">{{wine.bottleprice}}.- CHF</p>
        <p class="detail-view-label">Preis /1 dl</p>
        <p class="detail-view-content">{{wine.openprice}}.- CHF</p>
        <p class="detail-view-label">Land</p>
        <p class="detail-view-content">{{wine.regionTag}}, {{wine.nationTag}}</p>
        <p class="detail-view-description">{{wine.charakter}}</p>
        <button id="detail-view-add-btn" @click="addToBookmarks">Zur Merkliste</button>
      </div>
      <div class="detail-view-right">
        <img class="detail-view-image" :src="wine.link"/>
      </div>
    </div>
    <div class="detail-view-comment-container">
      <h3>Kommentare</h3>
      <div class="comment" v-for="(comment, index) in wine.comments" :key="index">
        <p class="comment-content">{{ comment }}</p>
      </div>
      <div class="comment-input-container" v-if="isLoggedIn">
        <input type="text" v-model="newComment" placeholder="Füge einen Kommentar hinzu..." />
        <button @click="addComment">Kommentiere</button>
      </div>
      <div v-else>
        <p>Du musst eingeloggt sein, um einen Kommentar abzugeben. 
          <a @click="openPopup">Erstelle ein Profil</a>
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
    },

    mounted(){
    setTimeout(() => {
      this.frameOpen = true;
    }, 100); 
    document.body.style.overflow = 'hidden'; // Verbietet das Scrollen auf dem Background
  },

  created() {
    console.log('DetailWineView component created');
  }
};
  </script>
  
  <style scoped>

  #row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  #detail-view-close-btn {
    border: none;
    background: none;
    font-size: 1.5em;
    cursor: pointer;
  }

  .overlay-frame {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 70%;
    background-color: white;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    z-index: 1000;
    transition:transform 0.5s;
    transform: translateY(100%);
    overflow-y: auto;
    padding-left: 3em;
    padding-right: 1em;
    padding-top: 3em;
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
  
  .overlay-frame.open {
    transform: translateY(0);
  }
  
  .detail-view-header {
    width: 100%;
  }
  
  .detail-view-main-container {
    display: flex;
  }
  
  .detail-view-left,
  .detail-view-right {
    flex: 1; /* Erstellt zwei gleich große Spalten */
  }
  
  .detail-view-label,
  .detail-view-content {
    margin-bottom: 1em;
  }
  
  .detail-view-description {
    margin-top: 1em;
  }
  
  #detail-view-add-btn {
    margin-top: 2em;
  }
  
  .detail-view-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .detail-view-image {
    width: 100px;
    height: 450px;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  </style>
  
  