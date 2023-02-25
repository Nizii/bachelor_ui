<template>
      <div class="menu">
        <NuxtLink to="/teigwaren" class="menu-button">Teigwaren</NuxtLink>
        <NuxtLink to="/pizza" class="menu-button">Pizza</NuxtLink>
        <NuxtLink to="/reis" class="menu-button">Reis</NuxtLink>
        <NuxtLink to="/fisch" class="menu-button">Fisch</NuxtLink>
        <NuxtLink to="/dessert" class="menu-button">Dessert</NuxtLink>
        <NuxtLink to="/fleisch" class="menu-button">Fleisch</NuxtLink>
      </div>
  </template>
  
  <style scoped>
  .menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 20px;
    background-color: #F8F2E4; 
    /* eine helle Farbe, die zu Wein passt */
  }
  
  .menu-button {
    width: 100px;
    height: 100px;
    margin: 10px;
    padding: 20px;
    border: none;
    border-radius: 10px;
    /*background-color: #6e1624;*/
    background-color: #f5d8b8;
    /*color: white;*/
    color: #6B291B;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
  }
  
  .menu-button:hover {
    background-color: #f3b69f;
    /*background-color: #D9C0A7;*/
    color: #6e1624;
    transform: scale(1.1);
  }


  </style>
  