const router = [
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
          leftTop: () => import('@/views/Emergency/weatherSituation.vue'),
          leftBottom: () => import('@/views/Emergency/dynamics.vue')
        }
      },
      {
        path: '/accident-information',
        name: 'accident-information',
        components: {
          header: () => import('@/components/common/header.vue'),
          leftTop: () => import('@/components/Emergency/accidentInformation.vue'),
          leftBottom: () => import('@/components/Emergency/rescueForce.vue')
        }
      },
      {
        path: '/processEvent',
        name: 'processEvent',
        components: {
          header: () => import('@/components/common/header.vue')
        }
      }
    ]
  }
]
export default router
