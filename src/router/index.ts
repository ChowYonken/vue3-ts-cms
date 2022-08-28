import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "home-chunk" */ '../views/login/login.vue')
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router
