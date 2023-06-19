<template>
  <!--Tutorialseite für Werkschau-->
  <div>
    <div v-for="(tutorial, index) in tutorials" :key="index" v-show="index === currentTutorialIndex">
      <TutorialDetailView 
        :i=index
        :title="tutorial.title" 
        :isEnd="tutorial.isEnd"
        :text_1="tutorial.text_1"
        :text_2="tutorial.text_2"
        :img="tutorial.img"
        @next-tutorial="goToNextTutorial"
      />
    </div>
  </div>
</template>
  
<script>
  import TutorialDetailView from '~/components/Tutorial/TutorialDetailView.vue';
  
  export default {
    name: "TutorialOverlay",
    components: {
      TutorialDetailView,
    },

    data() {
      return {
        frameOpen: true,
        currentTutorialIndex: 0,
        tutorials: [
            {
                title: "Herzlich Willkommen",
                text_1: "Wenn du nur wenig Wissen zum Thema Wein hast, dann bist du hier genau richtig!",
                text_2: "Finde YOUR TASTE, erstelle deinen eigenen Weinkeller, gibt deine Bestellung beim Servicepersonal auf und geniesse anschliessend den gewählten Wein!",
                img: "/tutorial/logo.svg"
            },
            {
                title: "Your Taste",
                text_1: "Nur sechs Fragen beantworten und YOUR TASTE ist definiert. Anschliessend werden zu dir passende Weine vorgeschlagen !",
                text_2: "Du kannst natürlich auch direkt zur Weinkarte und später deinen Taste herausfinden!",
                img: "/tutorial/t1.jpg"
            },
            {
                title: "Bestellung aufgeben",
                text_1: "Speichere deine gewünschten Weine in der Merkliste und gib anschliessend dem Servicepersonal die Bestellung auf!",
                text_2: " ",
                img: "/tutorial/t2.jpg"
            },
            {
                title: "Weinkeller",
                text_1: "Erstelle ein Profil und speichere deine Lieblingsweine in deinem persönlichen Weinkeller ab!",
                text_2:" ",
                isEnd: true,
                img: "/tutorial/t3.jpg"
            },
          ],
      }
    },
    
    methods: {
      goToNextTutorial() {
        if (this.currentTutorialIndex < this.tutorials.length - 1) {
          this.currentTutorialIndex++;
        } else {
          this.$router.push('/Tasteprofile/Sweet/index/Sweet');
        }
      },
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

.tutorial-header-box {
  width: 33%;
  text-align: right;
}

.skip-button {
  border-radius: 8px;
  padding: 10px;
  text-decoration: none;
  background-color: #660F0F;
  color: white;
  border: none;
}

.tutorial-frame-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: white;
  height: 40px;
  padding-top: 10px;
}
</style>