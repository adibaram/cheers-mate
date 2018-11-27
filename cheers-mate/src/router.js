import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/about.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/map.vue')
    },
    {
      path: '/cheer',
      name: 'cheer',
      component: () => import('./views/cheers/cheer-details.vue')
    }
  ]
})
