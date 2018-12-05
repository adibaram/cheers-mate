import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './assets/scss/main.scss';
// import {Alert} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

import lang from 'element-ui/lib/locale/lang/en';
import locale from 'element-ui/lib/locale';
import VueSocketIO from 'vue-socket.io';
// import 'element-ui/lib/theme-chalk/index.css';
locale.use(lang)
Vue.use(ElementUI);

// import component and stylesheet
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'


// vue scroll
const VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo);

// see docs for available options
const datepickerOptions = {}

// make sure we can use it in our components
Vue.use(AirbnbStyleDatepicker, datepickerOptions)

Vue.config.productionTip = false

//Google Maps With Vue
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDSpb5jrUSIDb124D7Qpjd4XJQ6d8oVPW0',
    libraries: 'places'
  }
})

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3003',
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  }
}))

//Element Lib
// Vue.use(Alert)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
