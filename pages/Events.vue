<template>
    <div>
      <Header />
      <h1 style="text-align: center; margin: 20px;">Für Unentschlossene</h1>
      <div class="button-group">

        <ShowButton buttonNumber="1" @toggle-wines="toggleWines">1.Date</ShowButton>
        <div v-if="showWines[1]" class="wine-list">
            <WineHeader title="Weissweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block;margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Weisswein" matchType="1.Date" />
            </div>
            <WineHeader title="Rotweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block;margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Rotwein" matchType="1.Date" />
            </div>
        </div>

        <ShowButton buttonNumber="2" @toggle-wines="toggleWines">Hochzeitstag</ShowButton>
        <div v-if="showWines[2]" class="wine-list">
            <WineHeader title="Weissweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block;margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Weisswein" matchType="Hochzeitstag" />
            </div>
            <WineHeader title="Rotweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block;margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Rotwein" matchType="Hochzeitstag" />
            </div>
        </div>
        
        <ShowButton buttonNumber="3" @toggle-wines="toggleWines">Geburtstag</ShowButton>
        <div v-if="showWines[3]" class="wine-list">
            <WineHeader title="Weissweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block;margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Weisswein" matchType="Geburtstag" />
            </div>
            <WineHeader title="Rotweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block;margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Rotwein" matchType="Geburtstag" />
            </div>
        </div>

        <ShowButton buttonNumber="4" @toggle-wines="toggleWines">Geschäftsessen</ShowButton>
        <div v-if="showWines[4]" class="wine-list">
            <WineHeader title="Weissweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block; margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Weisswein" matchType="Geschaftsessen" />
            </div>
            <WineHeader title="Rotweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block; margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Rotwein" matchType="Geschaftsessen" />
            </div>
        </div>
        
        <ShowButton buttonNumber="5" @toggle-wines="toggleWines">Treffen mit Kollegen</ShowButton>
        <div v-if="showWines[5]" class="wine-list">
            <WineHeader title="Weissweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block; margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Weisswein" matchType="Treffen mit Kollegen" />
            </div>
            <WineHeader title="Rotweine" />
            <div v-for="wine in wines" :key="wine.id" style="display: block; margin: 20px;">
                <WineInfoCondition :wine="wine" wineType="Rotwein" matchType="Treffen mit Kollegen" />
            </div>
        </div>
    </div>
</div>
</template>
  
<script>
    import Header from '~/components/Header.vue';
    import WineHeader from '~/components/WineHeader.vue';
    import WineInfoCondition from "~/components/WineInfoCondition.vue";
    import ShowButton from "~/components/ShowButton.vue";
    import axios from 'axios';
  
    export default {
        components: {
        Header,
        WineHeader,
        WineInfoCondition,
        ShowButton
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
            const response = await axios.get('https://wine.azurewebsites.net/api/wine');
            //const response = await axios.get('https://interactivemenu.azurewebsites.net/api/wine');
            //const response = await axios.get('https://localhost:44322/api/Wine');
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