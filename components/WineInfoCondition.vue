<template>
  <div v-if="wine.winetype === wineType && wine.match && wine.match.indexOf(matchType) !== -1" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
    <h3 style="text-align: center;">{{ wine.name }}</h3>
    <div class="wine-attribute">Traube: {{ wine.grape }}</div>
    <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
    <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
    <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
    <div class="wine-price">{{ wine.bottleprice }} .- / 0.75 l</div>
  </div>
</template>

<script>
export default {
  props: {
    wine: {
      type: Object,
      required: true,
    },
    matchType: {
      type: String,
      required: true,
    },
    wineType: {
      type: String,
      required: true,
    },
  },
};
</script>
