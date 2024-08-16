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
        index: '/DetectionWarning/trackInformation',
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
        index: '/detectionWarning/outWarning',
        title: '离港告警',
        icon: 'CollectionTag'
      },
      {
        index: '/detectionWarning/engagingWarning',
        title: '搭靠告警',
        icon: 'CollectionTag'
      }
    ]
  },
  {
    index: 'zonePlayback',
    title: '区域回放',
    icon: 'List',
    children: [
      {
        index: '/DetectionWarning/zonePlayback',
        title: '船舶区域回放',
        icon: 'CollectionTag'
      }
    ]
  },
  {
    index: 'classAnnotation',
    title: '船舶分类标注',
    icon: 'List',
    children: [
      {
        index: '/DetectionWarning/classAnnotation',
        title: '船舶分类标注',
        icon: 'CollectionTag'
      }
    ]
  },
  {
    index: 'targetFilter',
    title: '目标筛选',
    icon: 'List',
    children: [
      {
        index: '/DetectionWarning/targetFilter',
        title: '目标筛选',
        icon: 'CollectionTag'
      }
    ]
  }
]
