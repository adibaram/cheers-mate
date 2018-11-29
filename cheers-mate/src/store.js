import Vue from 'vue';
import Vuex from 'vuex';
import cheersService from './services/cheer-service.js';
import { log } from 'util';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cheers: [],
    filter: {},
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
    },
    setFilter(state, {filter}) {
      state.filter = filter;
    }
  },
  actions: {
    loadCheers(context) {
      console.log('loading cheers...');
      
      return cheersService.query(context.state.filter)
        .then(cheers=>{
          context.commit({type:'setCheers', cheers});
          console.log('cheers loaded:', cheers);
          
        })
    },
    findCurrPosition(context) {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({coords})=>{
          context.commit({type:'setPosition', coords})
        })
        } else console.log('cant find location');
    },
    loadFilter(context, {filter}) {
      context.commit({type:'setFilter', filter});
      context.dispatch({type:'loadCheers'});      
    }
  }
})
