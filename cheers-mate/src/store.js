import Vue from 'vue';
import Vuex from 'vuex';
import cheersService from './services/cheer-service.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cheers: []
  },
  getters: {
    getCheers(state) {
      return state.cheers;
    }
  },
  mutations: {
    setCheers(state, {cheers}) {
      state.cheers = cheers;
    }    
  },
  actions: {
    loadCheers(context) {
      return cheersService.query()
        .then(cheers=>{
          context.commit({type:'setCheers', cheers});
        })
    }
  }
})
