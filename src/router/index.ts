import {createRouter, createWebHistory, RouteRecord} from 'vue-router'

import Home from '../views/Home.vue'

const routes: Array<RouteRecord> = [
  {
    path: '/',
    component: Home,
  },
]

if (process.env.NODE_ENV === 'development') {
  routes.push({
    path: '/playground',
    component: () => import('@/views/Playground.vue'),
  })
}

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
