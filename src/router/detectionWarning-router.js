const router = [
  {
    path: '/detectionWarning',
    name: 'detectionWarning',
    component: () => import('@/views/DetectionWarning/index.vue'),
    children: [
      {
        path: 'arrivalWarning',
        name: 'arrivalWarning',
        component: () => import('@/views/DetectionWarning/arrivalWarning.vue'),
        meta: {
          title: '进港告警'
        }
      },
      {
        path: 'arrivalWarning',
        name: 'arrivalWarning',
        component: () => import('@/views/DetectionWarning/arrivalWarning.vue'),
        meta: {
          title: '离港告警'
        }
      },
      {
        path: 'arrivalWarning',
        name: 'arrivalWarning',
        component: () => import('@/views/DetectionWarning/arrivalWarning.vue'),
        meta: {
          title: '搭靠告警'
        }
      }
    ]
  }
]
export default router
