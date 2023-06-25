<template>
    <div class="tutorial-content-container">
      <div class="img-container-tutorial">
        <img :src="img" class="tutorial-img">
    </div>
    <img v-if="i == 0" class="slider-tutorial" :src="require('static/background/slidertutorial1.png')" alt="Bookmark icon" />
    <img v-if="i == 1" class="slider-tutorial" :src="require('static/background/slidertutorial2.png')" alt="Bookmark icon" />
    <img v-if="i == 2" class="slider-tutorial" :src="require('static/background/slidertutorial3.png')" alt="Bookmark icon" />
    <img v-if="i == 3" class="slider-tutorial" :src="require('static/background/slidertutorial4.png')" alt="Bookmark icon" />
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
        <div class="skip-to-menu-button"></div>
        <router-link v-if="isEnd" to="/Winemenu" class="router-link-winemenu">
            Direkt zur Weinkarte
        </router-link>
    </div>
  </template>

<script>
  export default {
    name: "TutorialDetailView",

    props: {
        i: {
            type: Number,
            required: true
        },
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
    
    methods: {
        nextTutorial(){
            this.$emit('next-tutorial'); 
        }
    },
  };
  </script>


<style scoped>
  *{
    font-family: 'Semplicita', sans-serif;
  }
</style>

<style>


.img-container-tutorial {
    position: relative;
}

.tutorial-img {
    position: relative;
    font-family: 'Semplicita', sans-serif;
}

.slider-tutorial {
    position: relative;
    width: 15%;
}

.skip-to-menu-button{
    height: 50px;
}

.tutorial-title{
    font-size: 25px;
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

.router-link-winemenu {
    text-decoration: none;
    color: #66100F;
    background-color: white;
    border: 2px solid #66100F;
    border-radius: 8px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    width: 70%;
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
    width: auto;
    background-color: #66100F;
    color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 8px;
    margin-top: 20px;
    text-decoration: none;
    border: none;
}

.tutorial-text-content{
    text-align: center;
    height: 20%;
}

.tutorial-img{
    padding-left: 10px;
    padding-right: 10px;
    height: 250px;
    max-width: 90%;
    padding-top: 10px;
}

</style>
