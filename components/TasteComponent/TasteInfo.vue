<template>
    <div class="detail-view-info-container" :style="{ backgroundColor: backgroundColor, color: getColor}">
        <p id="detail-view-titel">Was bedeutet?</p>
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
        <span class="popup-tag">Mild</span>
        <br>
        <p class="infotxt">
            Ist der Wein sanft und zurückhaltend im Geruch, sodass er einen leichten und unaufdringlichen Eindruck hinterlässt?
        </p>
        <span class="popup-tag">Fruchtig</span>
        <br>
        <p class="infotxt">
            Besitzt der Wein ausgeprägte fruchtige Aromen, wie z.B. Beeren, Zitrusfrüchte oder tropische Früchte, die sofort ins Auge fallen?
        </p>
        <span class="popup-tag">Erdig</span>
        <br>
        <p class="infotxt">
            Nimmt man beim Riechen und Schmecken des Weins erdige Nuancen wahr, wie etwa mineralische, pilzartige oder waldbodenähnliche Noten?
        </p>
    </div>
</template>

<script>
  export default {
    props: {
        'background-color': {
            type: String,
            default: '#ffffff'
        },
    },
    methods: {
        getBackgroundColor() {
            this.$emit('get-background-color');
        },
        getColor() {
            this.$emit('get-color');
        }
    },
}
</script>

<style>
    /* @import url('https://fonts.googleapis.com/css2?family=Semplicita:wght@400;700&display=swap'); */

.detail-view-info-container{
    padding: 20px;
    padding: 1em;
    border-radius: 15px;
    margin-top: 2em; 
    font-family: 'Semplicita', sans-serif;
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
    font-weight: 700;
    font-size: 15px;
}
</style>