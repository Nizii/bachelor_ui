import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export const state = () => ({
    wineInCellar: {},
  })
  
  export const mutations = {
    setWineInCellar(state, { wineId, inCellar }) {
      Vue.set(state.wineInCellar, wineId, inCellar);
    },
    updateWineInCellar(state, { wineId, inCellar }) {
      state.wineInCellar[wineId] = inCellar;
    },
  };
  
  
  export const getters = {
    isWineInCellar: (state) => (wineId) => {
      return state.wineInCellar[wineId] || false
    },
  }
  

  