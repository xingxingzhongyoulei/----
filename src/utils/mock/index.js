import { mock, Random } from 'mockjs'

mock(/Mapdata/, 'get', {
  code: 0,
  data: {
    name: '@cname',
    phone: /^(136|159|188|153|177)\d{8}$/,
    cmd: function () {
      const arr = ['AIS', '北斗']
      return arr[Math.floor(Math.random() * arr.length)]
    },
    degree: '@integer(0, 360)',
    'shipNumber|1': [
      '@string("upper", 2)@integer(1000, 9999)',
      '@string("upper", 1)@integer(10000, 99999)'
    ]
  },
  msg: 'success'
})

// 报警坐标的相关信息
mock(/MapAlarmdata/, 'get', {
  code: 0,
  data: {
    name: '@cname',
    phone: /^(136|159|188|153|177)\d{8}$/,
    alarmMsg: /^(碰撞、触碰|火灾事故|触礁|搁浅|沉没|机件或重要工具的损坏或灭失|人员落水)$/,
    cmd: function () {
      const arr = ['AIS', '北斗']
      return arr[Math.floor(Math.random() * arr.length)]
    },
    degree: '@integer(0, 360)',
    'shipNumber|1': [
      '@string("upper", 2)@integer(1000, 9999)',
      '@string("upper", 1)@integer(10000, 99999)'
    ]
  },
  msg: 'success'
})

mock(/MapRounddata/, 'get', {
  code: 0,
  data: {
    phone: /^(136|159|188|153|177)\d{8}$/,
    'shipNumber|1': [
      '@string("upper", 2)@integer(1000, 9999)',
      '@string("upper", 1)@integer(10000, 99999)'
    ]
  },
  msg: 'success'
})

mock(/MapInformData/, 'get', {
  code: 0,
  'data|1-4': [
    {
      name: '@cname',
      phone: /^(136|159|188|153|177)\d{8}$/
    }
  ],
  msg: 'success'
})

const Randoms = {
  datetime: function (format, start, interval) {
    const startTimestamp = new Date(start).getTime() // 将起点时间转换为时间戳
    const randomOffset = Math.floor(Math.random() * (10 * 60 * 1000)) // 生成0到10分钟之间的随机时间偏移
    const randomTimestamp = startTimestamp + randomOffset // 根据偏移计算随机时间戳
    const randomDate = new Date(randomTimestamp) // 将随机时间戳转换为日期对象
    const year = randomDate.getFullYear()
    const month = String(randomDate.getMonth() + 1).padStart(2, '0')
    const day = String(randomDate.getDate()).padStart(2, '0')
    const hours = String(randomDate.getHours()).padStart(2, '0')
    const minutes = String(randomDate.getMinutes()).padStart(2, '0')
    const seconds = String(randomDate.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
  }
}
mock(/MapRouterPlay/, 'get', {
  code: 0,
  'list|10': [
    {
      deviceType: 'AIS',
      longitude: function () {
        return parseFloat((Math.random() * (121.988 - 120.755) + 120.555).toFixed(3))
      },
      'latitude|33-33.5': 0,
      gpsTime: function () {
        return Randoms.datetime('yyyy-MM-dd HH:mm:ss', '2024-07-05 04:06:21', '10m')
      }
    }
  ],
  msg: 'success'
})
