import { createRouter, createWebHistory } from 'vue-router'
import EmergencyRouter from './emergency-router'
import ShipManagementRouter from './shipManagement-router'
import DetectionWarningRouter from './detectionWarning-router'
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
  ...EmergencyRouter,
  ...ShipManagementRouter,
  ...DetectionWarningRouter
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
