import Vue from 'vue';
import Vuex from 'vuex';
import cheersService from './services/cheer-service.js';
import userService from './services/user-service.js';
import authService from './services/auth-service.js'; 
// import { log } from 'util';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cheers: [],
    filter: {},
    position: {
      lat:32,
      lng:34
    },
    loggedinUser: null,
  },
  getters: {
    getCheers(state) {
      return state.cheers;
    },
    getCurrPosition(state) {
      return state.position;
    },
    getUser(state) {
      return state.loggedinUser;
    },
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
    },
    setUser(state, {user , rememberPref}) {
      state.loggedinUser = user; 
      userService.login(user,rememberPref);
      console.log('logged in user', state.loggedinUser);
    },
  },
  actions: {
    loadCheers(context) {
      console.log('loading cheers...');
      
      return cheersService.query(context.state.filter)
        .then(cheers=>{
          context.commit({type:'setCheers', cheers});
          console.log('filter', context.state.filter);
          console.log('cheers loaded:', cheers);
          
        })
    },


    getUserById(context,{userId}) {
      return userService.getById(userId);
    },

    findCurrPosition(context) {
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({coords})=> {
          context.commit({type:'setPosition', coords})
        })
        } else console.log('cant find location');
    },
    loadFilter(context, {filter}) {
      context.commit({type:'setFilter', filter});
      context.dispatch({type:'loadCheers'});      
    },
    signup(context, {user}) {
      return authService.signup(user)
        .then(user => {
            context.commit({type: 'setUser', user});
        })
    },
    login(context, {user, rememberPref}){
      return authService.checkUser(user)
        .then(user => {
          context.commit({type: 'setUser', user , rememberPref})
        });
    },
    logout(context) {
      context.commit({type: 'setUser', user: null})
      authService.logout()
    }
  },

})
