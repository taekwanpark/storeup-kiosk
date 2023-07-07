import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@renderer/views/Home.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('@renderer/views/LayoutDev.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
