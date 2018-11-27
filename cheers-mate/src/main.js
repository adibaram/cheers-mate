import Vue from 'vue'
import App from './app.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDSpb5jrUSIDb124D7Qpjd4XJQ6d8oVPW0',
    libararies: 'places'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
