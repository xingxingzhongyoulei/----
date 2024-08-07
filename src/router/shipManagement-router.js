const router = [
  {
    path: '/shipManagement',
    name: 'shipManagement',
    component: () => import('@/views/ShipManagement/index.vue'),
    children: [
      {
        path: 'DepartureApplication',
        name: 'DepartureApplication',
        component: () => import('@/views/ShipManagement/DepartureApplication.vue')
      }
    ]
  }
]
export default router
