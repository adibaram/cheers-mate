import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

import Home from './views/Home.vue'



Vue.use(Router)

const router =  new Router({
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
      component: () => import('./views/About.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: () => import('./views/map.vue')
    },
    {
      path: '/cheer/create',
      name: 'create-cheer',
      component: () => import('./views/cheers/create-cheer.vue')
    },
    {
      path: '/cheer/:cheerId',
      name: 'cheer',
      component: () => import('./views/cheers/cheer-details.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/signup.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },

    {
      path: '/user/:userId',
      name: 'user',
      component: () => import('./views/user-details.vue')
    },
    
    
    
  ]
})

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router