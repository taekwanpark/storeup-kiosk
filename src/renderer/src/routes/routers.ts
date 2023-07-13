import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@renderer/features/home/Index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@renderer/features/search/Index.vue')
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@renderer/features/store/Index.vue')
  },
  {
    path: '/food',
    name: 'food',
    component: () => import('@renderer/features/food/Index.vue')
  },
  {
    path: '/facility',
    name: 'facility',
    component: () => import('@renderer/features/facility/Index.vue')
  },
  {
    path: '/talk',
    name: 'talk',
    component: () => import('@renderer/features/talk/Index.vue')
  },
  {
    path: '/event',
    name: 'event',
    component: () => import('@renderer/features/event/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
