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
        component: () => import('@/views/ShipManagement/DepartureApplication.vue')
      }
    ]
  }
]
export default router
