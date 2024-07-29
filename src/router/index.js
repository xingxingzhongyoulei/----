import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/portal',
      name: 'portal',
      component: () => import('@/views/Portal/index.vue')
    },
    {
      path: '/emergency',
      name: 'emergency',
      component: () => import('@/views/Emergency/index.vue')
    }
  ]
})

export default router
