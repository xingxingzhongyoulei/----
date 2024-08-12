export const shipManagementMenu = [
  {
    index: '/shipManagement',
    title: '进出港统计',
    icon: 'List',
    children: [
      {
        index: '/shipManagement/DepartureApplication',
        title: '出港申请',
        icon: 'CollectionTag'
      },
      {
        index: '/shipManagement/PortRecord',
        title: '进出港记录',
        icon: 'CollectionTag'
      }
    ]
  }
]

export const detectionWarningMenu = [
  {
    index: 'trackInformation',
    title: '航迹信息',
    icon: 'List',
    children: [
      {
        index: '/shipManagement/DepartureApplication',
        title: '实时航迹信息',
        icon: 'CollectionTag'
      }
    ]
  },
  {
    index: 'detectionWarning',
    title: '检测告警',
    icon: 'List',
    children: [
      {
        index: '/detectionWarning/arrivalWarning',
        title: '进港告警',
        icon: 'CollectionTag'
      },
      {
        index: '/detectionWarning/PortRecord',
        title: '离港告警',
        icon: 'CollectionTag'
      },
      {
        index: '/detectionWarning/PortRecord',
        title: '搭靠告警',
        icon: 'CollectionTag'
      }
    ]
  }
]
