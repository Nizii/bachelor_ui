<template>
    <div class="header">
      <h1 class="title">Interaktive Weinkarte</h1>
    </div>
  </template>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    background-color: #6e1624; /* passend zu den Button-Farben */
    color: white;
    font-family: 'Helvetica', sans-serif; /* beliebige Schriftart */
  }
  
  .title {
    font-size: 36px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
  }

  @media (max-width: 767px) {
    /* Wenn die Bildschirmbreite kleiner als 768px ist (d.h. Handy-Bildschirm), wird die folgende Regel angewendet */
    .title {
      font-size: 1.5rem; /* Setzt die Schriftgröße des Titels auf 1.5rem */
    }
  }
  </style>
  