<template>
    <div class="tutorial-content-container" >
        <img :src="img" class="tutorial-img">
        <div class="tutorial-text-content">
            <div class="tutorial-title"><b>{{title}}</b></div>
            <div class="tutorial-text-1">{{text_1}}</div>
            <div class="tutorial-text-2">{{text_2}}</div> 
        </div>
        <button v-if="!isEnd" class="tutorial-next-button" @click="nextTutorial">
            Weiter
        </button>
        <router-link v-else to="/Tasteprofile/Sweet" class="router-link-button">
            Geschmacksprofil erstellen
        </router-link>
    </div>
</template>

<script>

  
  export default {
    name: "TutorialDetailView",

    props: {
        title: {
        type: String,
        required: true
        },
        isEnd: {
        type: Boolean,
        default: false
        },
        text_1: {
        type: String,
        required: true
        },
        text_2: {
        type: String,
        required: true
        },
        img: {
        type: String,
        required: true
        }
    },

    data() {
      return {

        }
    },
    
    methods: {
        nextTutorial(){
            this.$emit('next-tutorial'); 
        }
    },
  };
  </script>


<style>
*{
    font-family: 'Soleil', sans-serif;
}

.tutorial-title{
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 15px;
    height: 10%;
}

.tutorial-text-1{
    margin-top: 20px;
    height: 15%;
}

.tutorial-text-2{
    margin-top: 20px;
    height: 15%;
}

.tutorial-content-container{
    height: 100%; 
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    text-align: center;
    z-index: 1000;
}

.tutorial-next-button{
    margin-top: auto; 
    width: 70%;
    background-color: #66100F;
    color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 8px;
    margin-top: 20px;
    border: none;
}


.router-link-button{
    margin-top: auto; 
    width: auto;
    background-color: #66100F;
    color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 8px;
    margin-top: 20px;
    text-decoration: none;
    border: none;
}

.tutorial-text-content{
    text-align: center;
}

.tutorial-img{
    padding-left: 10px;
    padding-right: 10px;
    height: 250px;
    max-width: 90%;
    padding-top: 10px;
}

</style>
