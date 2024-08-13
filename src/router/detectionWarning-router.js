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
        path: 'outWarning',
        name: 'outWarning',
        component: () => import('@/views/DetectionWarning/outWarning.vue'),
        meta: {
          title: '离港告警'
        }
      },
      {
        path: 'engagingWarning',
        name: 'engagingWarning',
        component: () => import('@/views/DetectionWarning/engagingWarning.vue'),
        meta: {
          title: '搭靠告警'
        }
      },
      {
        path: 'trackInformation',
        name: 'trackInformation',
        component: () => import('@/views/DetectionWarning/engagingWarning.vue'),
        meta: {
          title: '航迹信息'
        }
      }
    ]
  }
]

export default router
