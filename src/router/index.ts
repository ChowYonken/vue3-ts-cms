import { createRouter, createWebHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "home-chunk" */ '@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "main-chunk" */ '@/views/main/main.vue')
  },
  {
    path: '/:patchMatch(.*)*',
    name: 'notFound',
    component: () =>
      import(
        /*webpackChunkName: "not-found-chunk"*/ '@/views/not-found/not-found.vue'
      )
  }
]
const router = createRouter({
  routes,
  history: createWebHistory()
})

// 全局前置守卫
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // 如果返回的是/mian 那么我们要给我默认路径
  if (to.path === '/main') {
    return firstMenu.url
  }
})

export default router
