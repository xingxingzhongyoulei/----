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
        component: () => import('@/views/DetectionWarning/trackInformation.vue'),
        meta: {
          title: '航迹信息'
        }
      },
      {
        path: 'zonePlayback',
        name: 'zonePlayback',
        component: () => import('@/views/DetectionWarning/zonePlayback.vue'),
        meta: {
          title: '区域回放'
        }
      },
      {
        path: 'classAnnotation',
        name: 'classAnnotation',
        component: () => import('@/views/DetectionWarning/classAnnotation.vue'),
        meta: {
          title: '船舶分类标注'
        }
      },
      {
        path: 'targetFilter',
        name: 'targetFilter',
        component: () => import('@/views/DetectionWarning/targetFilter.vue'),
        meta: {
          title: '目标筛选'
        }
      },
      {
        path: 'violationWarning',
        name: 'violationWarning',
        component: () => import('@/views/DetectionWarning/violationWarning.vue'),
        meta: {
          title: '违规出港预警'
        }
      },
      {
        path: 'analyWarning',
        name: 'analyWarning',
        component: () => import('@/views/DetectionWarning/analyWarning.vue'),
        meta: {
          title: '告警统计分析'
        }
      }
    ]
  }
]

export default router
