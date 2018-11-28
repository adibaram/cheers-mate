import Vue from 'vue';
import Vuex from 'vuex';
import cheersService from './services/cheer-service.js';
import { log } from 'util';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cheers: [],
    position: {
      lat:32,
      lng:34
    }
  },
  getters: {
    getCheers(state) {
      return state.cheers;
    },
    getCurrPosition(state) {
      return state.position;
    }
  },
  mutations: {
    setCheers(state, {cheers}) {
      state.cheers = cheers;
    },
    setPosition(state, {coords}) {
      state.position.lat = coords.latitude;
      state.position.lng = coords.longitude;
    }
  },
  actions: {
    loadCheers(context) {
      return cheersService.query()
        .then(cheers=>{
          console.log('DEBUG::cheers', cheers);
          context.commit({type:'setCheers', cheers});
        })
    },
    findCurrPosition(context) {
      if(navigator.geolocation) {
        let latlng = {};
        navigator.geolocation.getCurrentPosition(({coords})=>{
          context.commit({type:'setPosition', coords})
        })
        } else console.log('cant find location');
    }
  }
})
