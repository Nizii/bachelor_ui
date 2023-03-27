<template>
    <div>
      <Header />
      <h1 style="text-align: center; margin: 20px;">Für Unentschlossene</h1>
      <div class="button-group">
        <button class="button button-1" @click="toggleWines(1)">1. Date</button>
        <div v-if="showWines[1]" class="wine-list">
            <h1 style="text-align: center; margin: 20px;">Weissweine</h1>
            <div v-for="wine in wines" :key="wine.id" style="display: block;margin: 20px;">
                <div v-if="wine.winetype === 'Weisswein' && wine.match == 1" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
                    <h3 style="text-align: center;">{{ wine.name }}</h3>
                    <div class="wine-attribute">Traube: {{ wine.grape }}</div>
                    <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
                    <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
                    <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
                    <div class="wine-price">{{ wine.bottleprice}} .- / 0.75 l</div>
                </div>
            </div>
        </div>
        <button class="button button-2" @click="toggleWines(2)">Hochzeitstag</button>
        <div v-if="showWines[2]" class="wine-list">
            <h1 style="text-align: center; margin: 20px;">Weissweine</h1>
            <div v-for="wine in wines" :key="wine.id" style="display: block;margin: 20px;">
                <div v-if="wine.winetype === 'Weisswein' && wine.match === 2" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
                    <h3 style="text-align: center;">{{ wine.name }}</h3>
                    <div class="wine-attribute">Traube: {{ wine.grape }}</div>
                    <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
                    <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
                    <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
                    <div class="wine-price">{{ wine.bottleprice}} .- / 0.75 l</div>
                </div>
            </div>
        </div>
        <button class="button button-3" @click="toggleWines(3)">Geburtstag</button>
        <div v-if="showWines[3]" class="wine-list">
            <h1 style="text-align: center; margin: 20px;">Weissweine</h1>
            <div v-for="wine in wines" :key="wine.id" style="display: block;margin: 20px;">
                <div v-if="wine.winetype === 'Weisswein' && wine.match === 2" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
                    <h3 style="text-align: center;">{{ wine.name }}</h3>
                    <div class="wine-attribute">Traube: {{ wine.grape }}</div>
                    <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
                    <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
                    <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
                    <div class="wine-price">{{ wine.bottleprice}} .- / 0.75 l</div>
                </div>
            </div>
        </div>
        <button class="button button-4" @click="toggleWines(4)">Geschäftsessen</button>
        <div v-if="showWines[4]" class="wine-list">
            <h1 style="text-align: center; margin: 20px;">Weissweine</h1>
            <div v-for="wine in wines" :key="wine.id" style="display: block; margin: 20px;">
                <div v-if="wine.winetype === 'Weisswein'  && wine.match === 2" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
                    <h3 style="text-align: center;">{{ wine.name }}</h3>
                    <div class="wine-attribute">Traube: {{ wine.grape }}</div>
                    <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
                    <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
                    <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
                    <div class="wine-price">{{ wine.bottleprice}} .- / 0.75 l</div>
                </div>
            </div>
        </div>
        <button class="button button-5" @click="toggleWines(5)">Treffen mit Kollegen</button>
        <div v-if="showWines[5]" class="wine-list">
            <h1 style="text-align: center; margin: 20px;">Weissweine</h1>
            <div v-for="wine in wines" :key="wine.id" style="display: block; margin: 20px;">
                <div v-if="wine.winetype === 'Weisswein'  && wine.match === 3" class="wine-info" style="display: flex; flex-direction: column; align-items: center;">
                    <h3 style="text-align: center;">{{ wine.name }}</h3>
                    <div class="wine-attribute">Traube: {{ wine.grape }}</div>
                    <div class="wine-attribute">Jahrgang: {{ wine.year }}</div>
                    <div class="wine-attribute">Alkohol: {{ wine.alcohol }}%</div>
                    <div class="wine-price" style="margin-top: 10px;">{{ wine.openprice }} .- / 1d l</div>
                    <div class="wine-price">{{ wine.bottleprice}} .- / 0.75 l</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
  
<script>
    import Header from '~/components/Header.vue';
    import axios from 'axios';
  
    export default {
        components: {
        Header
    },
    data() {
        return {
            loading: true,
            wines: [],
            showWines: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false
            }
        }
    },
    async created() {
        try {
            const response = await axios.get('https://localhost:44322/api/Wine');
            this.wines = response.data;
            this.loading = false;
        } catch (error) {
            console.error(error);
        }
    },

    methods: {
    toggleWines(index) {
        if (this.showWines[index]) {
            this.showWines[index] = false;
        } else {
            this.showWines[index] = true;
        }
    }       
}
}
</script>

<style scoped>
    .button-group {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        height: 100%;
    }
  
    .button {
        margin: 10px;
        width: 250px;
        height: 80px;
        border-radius: 5px;
        border: none;
        font-size: 15px;
        font-family: 'Arial', sans-serif;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        text-decoration: none;
    }
  
    .button-1, .button-2, .button-3, .button-4, .button-5 {
        background-color: #d9d9d9;
        color: black;
    }
</style>