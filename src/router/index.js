import { createRouter, createWebHistory } from 'vue-router'
import emergencyRouter from './emergency-router'
import ShipManagementRouter from './shipManagement-router'
const routes = [
  {
    // 登录页
    path: '/',
    name: 'login',
    component: () => import('@/views/Login/index.vue')
  },
  {
    // 门户页
    path: '/portal',
    name: 'portal',
    component: () => import('@/views/Portal/index.vue')
  },
  ...emergencyRouter,
  ...ShipManagementRouter
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
