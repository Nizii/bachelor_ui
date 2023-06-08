<template>
    <div class="detail-view-info-container" :style="{ backgroundColor: backgroundColor }">
        <p id="detail-view-titel">Was bedeutet...</p>
        <div class="placeholder"></div>
        <span class="popup-tag">Süss</span>
        <br>
        <p class="infotxt">
            Schmeckt der Wein angenehm süss und zeigt deutliche Aromen von Zucker, Honig oder kandierten Früchten, die den Gaumen betören?
        </p>
        <span class="popup-tag">Sauer</span>
        <br>
        <p class="infotxt">
            Wein eine ausgeprägte Säure, die sich durch erfrischende und lebhafte Zitrus- oder grüne Fruchtnoten bemerkbar macht und den Gaumen anregt?
        </p>
        <span class="popup-tag">Intensiv</span>
        <br>
        <p class="infotxt">
            Hat der Wein ein intensives Geruchsbouquet oder muss ich das Glas mehrmals schwenken, bis ich etwas wahrnehme?
        </p>
        <span class="popup-tag">Fruchtig</span>
        <br>
        <p class="infotxt">
            Besitzt der Wein ausgeprägte fruchtige Aromen, wie z.B. Beeren, Zitrusfrüchte oder tropische Früchte, die sofort ins Auge fallen?
        </p>
        <span class="popup-tag">Holzig</span>
        <br>
        <p class="infotxt">
            Weist der Wein starke Holznoten auf, wie z.B. Eiche, Zedernholz oder Vanille, die das Geschmacksprofil dominieren?
        </p>
        <span class="popup-tag">Trocken</span>
        <br>
        <p class="infotxt">
            Hat der Wein einen trockenen Charakter, was bedeutet, dass er kaum oder keine Restsüsse aufweist und eher herbe Geschmacksnoten zeigt?
        </p>
    </div>
</template>

<script>
  export default {
    props: {
        'background-color': {
            type: String,
            default: 'rgba(0, 0, 0, 0.1)'
        },
    },
}
</script>

<style>
.placeholder{
    height: 20px;
}

.detail-view-info-container{
    padding: 20px;
    padding: 1em;
    border-radius: 15px;
    margin-top: 2em; 
    font-family: 'Semplicita', sans-serif;
    border: 2px solid rgb(214, 214, 214);
}

.detail-view-title{
    color: black;
    font-size: 30px;
    font-weight: bold;
    font-family: 'Semplicita', sans-serif;
    margin-bottom: 20px;
}

.infotxt{
    margin-bottom: 20px;
    font-size: 13px;
    font-weight: 400;
    font-family: 'Semplicita', sans-serif;
}

.popup-tag{
    font-size: 15px;
    color: #660F0F;
}
</style>
