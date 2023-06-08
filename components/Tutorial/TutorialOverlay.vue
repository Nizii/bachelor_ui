<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <div class="background-overlay" v-if="frameOpen" />
    <div class="overlay-frame" :class="{ open: frameOpen }">
      <div class="frame-header">
        <div></div>
        <TitleOverlay title="Tutorial" />
        <button class="close-button" @click="closeOverlay">
          <img :src="require('static/icons/buttons/close.png')" class="icon" alt="Bookmark icon" />         
        </button>
      </div>
      <div v-for="(tutorial, index) in tutorials" :key="index" v-show="index === currentTutorialIndex">
        <TutorialDetailView 
          :title="tutorial.title" 
          :isEnd="tutorial.isEnd"
          :text_1="tutorial.text_1"
          :text_2="tutorial.text_2"
          :img="tutorial.img"
          @next-tutorial="goToNextTutorial"
          @close-tutorial="closeOverlay"
        />
      </div>
    </div>
  </div>
</template>
  
<script>
  import TitleOverlay from '~/components/Titles/TitleOverlay.vue';
  import TutorialDetailView from '~/components/Tutorial/TutorialDetailView.vue';
  
  export default {
    name: "TutorialOverlay",
    components: {
      TitleOverlay,
      TutorialDetailView,
    },

    data() {
      return {
        frameOpen: false,
        currentTutorialIndex: 0,
        tutorials: [
            {
                title: "Herzlich Willkommen",
                text_1: "Wenn du nur wenig Wissen zum Thema Wein hast, dann bist du hier genau richtig!",
                text_2: "Finde YOUR TASTE, erstelle deinen eigenen Weinkeller, gibt deine Bestellung beim Servicepersonal auf und geniesse anschliessend den gewählten Wein!",
                img: "/tutorial/default.jpg"
            },
            {
                title: "Your Taste",
                text_1: "Nur sechs Fragen beantworten und YOUR TASTE ist definiert. Anschliessend werden zu dir passende Weine vorgeschlagen !",
                text_2: "Du kannst natürlich auch direkt zur Weinkarte und später deinen Taste herausfinden!",
                img: "/tutorial/myTaste.jpg"
            },
            {
                title: "Bestellung aufgeben",
                text_1: "Speichere deine gewünschten Weine in der Merkliste und gib anschliessend dem Servicepersonal die Bestellung auf!",
                text_2: " ",
                img: "/tutorial/myOrder.jpg"
            },
            {
                title: "Weinkeller",
                text_1: "Erstelle ein Profil und speichere deine Lieblingsweine in deinem persönlichen Weinkeller ab!",
                text_2:" ",
                img: "/tutorial/myCellar.jpg"
            },
            ],
      }
    },
    
    methods: {
      closeOverlay() {
        this.frameOpen = false;
        setTimeout(() => { this.$emit('close'); }, 300);
        document.body.style.overflow = 'auto'; 
      },

      goToNextTutorial() {
        if (this.currentTutorialIndex < this.tutorials.length - 1) {
          this.currentTutorialIndex++;
        } else {
          this.frameOpen = false;
        }
      }

    },

    mounted() {
      document.body.style.overflow = 'hidden'; 
      setTimeout(() => {
        this.frameOpen = true;
      }, 100); 
    },
  };
  </script>
  
  <style>

  @import "@/CSS/shared-overlay-styles.css";

  .tutorial-next-button{

  }

  .tutorial-img{

  }

  .tutorial-title{

  }

  .tutorial-text{

  }

  .tutorial-next-button{
    
  }

  .overlay-frame{
    z-index: 1000;
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

  .open {
    transform: translateY(0);
  }

  .frame-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*height: 50px;*/
    padding: 0 20px;
    position: sticky;
    top: 0;
    z-index: 1001; 
    background-color: white; 
    position: sticky;
    border-bottom: 1px solid rgb(214, 214, 214);

  }

</style>
