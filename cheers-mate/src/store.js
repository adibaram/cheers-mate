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
      lat: 32,
      lng: 34
    },
    loggedinUser: null,
    isLoading: false,
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
    getIsLoading(state) {
      return state.isLoading;
    }
  },

  mutations: {
    setCheers(state, { cheers }) {
      state.cheers = cheers;
    },
    setPosition(state, { coords }) {
      state.position.lat = coords.latitude;
      state.position.lng = coords.longitude;
    },
    setFilter(state, { filter }) {
      state.filter = filter;
    },
    setUser(state, { user, rememberPref }) {
      state.loggedinUser = user;
      userService.login(user, rememberPref);
      console.log('logged in user', state.loggedinUser);
    },
    setLoading(state, {isLoading}) {
      state.isLoading = isLoading;
      console.log('DEBUG:store-setLoading:isLoading', isLoading);
    }
  },
  actions: {
    setLoading(context , {isLoading}) {
      context.commit('setLoading', {isLoading});
    },
    
    loadCheers(context) {
      console.log('loading cheers...');
      context.dispatch({ type: 'setLoading', isLoading: true});

      return cheersService.query(context.state.filter)
        .then(cheers => {
          context.commit({ type: 'setCheers', cheers });
          console.log('filter', context.state.filter);
          console.log('cheers loaded:', cheers);

        })
    },

    // THIS IS SUPPOSED TO GET PAYLOAD, BUT GETTNG JUST THE ID.
    // DONT CHANGE THIS IF YOU WANT THE CODE TO WORK
    getUserById(context,  userId ) {
      context.dispatch({ type: 'setLoading', isLoading: true});

      return userService.getById(userId)
        .then(user => user);
    },

    findCurrPosition(context) {
      context.dispatch({ type: 'setLoading', isLoading: true});      
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          context.commit({ type: 'setPosition', coords })
        })
      } else console.log('cant find location');
    },
    loadFilter(context, { filter }) {
      context.commit({ type: 'setFilter', filter });
      context.dispatch({ type: 'loadCheers' });
    },
    signup(context, { user }) {
      return authService.signup(user)
        .then(user => {
          context.commit({ type: 'setUser', user });
        })
    },
    login(context, { user, rememberPref }) {
      context.dispatch({ type: 'setLoading', isLoading: true});
      var failedToLogin = false;
      return authService.getLoggedInUser()
        .then(sessionUser => {
          if (sessionUser) {
            context.commit({ type: 'setUser', user:sessionUser, rememberPref })
          } else {
            return authService.checkUser(user)
              .then(loggedInUser => {
                context.commit({ type: 'setUser', user:loggedInUser, rememberPref })
              })
              .catch(err => {
                console.log('DEBUG:store login:err', err);
                failedToLogin = true;
                // throw new Error(err.message);
              })
          }
        })
        .catch(err=>{
          console.log('DEBUG::err', err);
          // return err.message;
        })
        .finally(()=>{
          if (failedToLogin) throw new Error('Failed to login');
        })

    },
    logout(context) {
      context.commit({ type: 'setUser', user: null })
      context.dispatch({ type: 'setLoading', isLoading: true});
      authService.logout()
        .then(()=> {
          context.dispatch({ type: 'setLoading', isLoading: false});
        });
    }
  },

})
