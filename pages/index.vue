<template>
  <div style="margin: 0; padding: 0; box-sizing: border-box;">
    <div class="tutorial-frame-header">
      <div></div>
      <TitleOverlay title="Tutorial" />
      <button class="tutorial-close-button" @click="closeOverlay">
        skip <img :src="require('static/icons/buttons/close.png')" alt="Bookmark icon" />         
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
        frameOpen: true,
        isEnd: false,
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
                isEnd: true,
                img: "/tutorial/myCellar.jpg"
            },
            ],
      }
    },
    
    methods: {
      closeOverlay() {
        setTimeout(() => { 
          this.$emit('close-tutorial');
          this.frameOpen = false;
       }, 300);
        document.body.style.overflow = 'auto'; 
      },

      goToNextTutorial() {
        if (this.currentTutorialIndex < this.tutorials.length - 1) {
          this.currentTutorialIndex++;
        } else {
          this.closeOverlay();
        }
      }
    },

    mounted() {
      document.body.style.overflow = 'hidden'; 
      setTimeout(() => {
        this.frameOpen = true;
      }, 300); 
    },
  };
  </script>
  
  <style>

 /* @import "@/CSS/shared-overlay-styles.css";*/



  .open {
    transform: translateY(0);
  }

</style>
