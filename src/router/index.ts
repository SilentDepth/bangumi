import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
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
