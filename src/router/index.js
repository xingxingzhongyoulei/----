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
            header: () => import('@/components/common/header.vue')
          }
        }
      ]
    }
  ]
})

export default router
