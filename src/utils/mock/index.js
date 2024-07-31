import { mock } from 'mockjs'

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
