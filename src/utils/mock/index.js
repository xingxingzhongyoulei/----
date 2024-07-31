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

mock(/MapAlarmdata/, 'get', {
  code: 0,
  data: {
    name: '@cname',
    phone: /^(136|159|188|153|177)\d{8}$/,
    alarmMsg: /^('人员落水'|'超速'|'超载'|'超重'|'船只故障'|'船只事故')$/,
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
