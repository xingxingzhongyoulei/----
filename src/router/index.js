import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    {
      // 紧急指挥页
      path: '/emergency',
      name: 'emergency',
      component: () => import('@/views/Emergency/index.vue'),
      children: [
        {
          path: '',
          name: 'emergency-center',
          components: {
            header: () => import('@/components/common/header.vue'),
            main: () => import('@/components/Emergency/map.vue'),
            leftTop: () => import('@/views/Emergency/weatherSituation.vue'),
            leftBottom: () => import('@/views/Emergency/dynamics.vue')
          }
        },
        {
          path: '/accident-information',
          name: 'accident-information',
          components: {
            header: () => import('@/components/common/header.vue'),
            main: () => import('@/components/Emergency/map.vue'),
            leftTop: () => import('@/components/Emergency/accidentInformation.vue'),
            leftBottom: () => import('@/components/Emergency/rescueForce.vue')
          }
        }
      ]
    }
  ]
})

export default router
