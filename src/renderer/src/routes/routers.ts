import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@renderer/features/home/Index.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@renderer/features/search/Index.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/store',
    name: 'store',
    component: () => import('@renderer/features/store/Index.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/food',
    name: 'food',
    component: () => import('@renderer/features/food/Index.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/facility',
    name: 'facility',
    component: () => import('@renderer/features/facility/Index.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/talk',
    name: 'talk',
    component: () => import('@renderer/features/talk/Index.vue')
    // meta: { transition: 'slide-left' }
  },
  {
    path: '/event',
    name: 'event',
    component: () => import('@renderer/features/event/Index.vue'),
    // meta: { transition: 'slide-left' },
    children: [
      {
        path: '',
        name: 'event-list',
        component: () => import('@renderer/features/event/partials/EventList.vue')
        // meta: { transition: 'slide-left' }
      },
      {
        path: ':id',
        name: 'event-detail',
        component: () => import('@renderer/features/event/Detail.vue')
        // meta: { transition: 'slide-left' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
