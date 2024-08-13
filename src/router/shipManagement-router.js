const router = [
  {
    path: '/shipManagement',
    name: 'shipManagement',
    component: () => import('@/views/ShipManagement/index.vue'),
    children: [
      {
        path: 'DepartureApplication',
        name: 'DepartureApplication',
        meta: {
          title: '出港申请'
        },
        component: () => import('@/views/ShipManagement/applicationTable.vue')
      },
      {
        path: 'PortRecord',
        name: 'PortRecord',
        meta: {
          title: '出港申请'
        },
        component: () => import('@/views/ShipManagement/PortRecord.vue')
      }
    ]
  },
  {
    path: '/alarmAnalyse',
    name: 'alarmAnalyse',
    component: () => import('@/views/alarmAnalyse/index.vue'),
    children: [
      {
        path: '',
        name: 'alarmAnalyse-data',
        components: {
          header: () => import('@/views/alarmAnalyse/layout/headerTitle/index.vue'),
          left: () => import('@/views/alarmAnalyse/layout/left/index.vue'),
          right: () => import('@/views/alarmAnalyse/layout/right/index.vue')
        }
      }
    ]
  }
]
export default router
