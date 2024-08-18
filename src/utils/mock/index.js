import { mock, Random } from 'mockjs'
import { getRandomTimestampInRange, randomArr } from '../common'

// 船名: 'shipName',
// 船主: 'shipLength',
// 渔港名称: 'portName',
// 联系电话: 'phone',
// 终端类型: 'cmdType',
// 进出港类型: 'portTypes',
// 进出港时间: 'startTime'

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
// 表格数据
const TableData = mock({
  'data|150': [
    {
      'shipName|1': [
        '@string("upper", 2)@integer(1000, 9999)',
        '@string("upper", 1)@integer(10000, 99999)'
      ],
      shipLength: '@cname',
      portName: /^(电建渔港01|电建渔港02|电建渔港03|电建渔港04)$/,
      phone: /^1\d{10}$/,
      cmdType: /^(北斗|AIS|雷达)$/,
      portTypes: /^(出港|进港)$/,
      startTime: '2024-08-08 12:21:00'
    }
  ]
})
mock(/ApplicationTabelData/, 'get', (opt) => {
  const pageOpt = JSON.parse(opt.body)
  const start = (pageOpt.current - 1) * pageOpt.size
  const end = pageOpt.size * pageOpt.current
  // const totalPage = Math.ceil(TableData.data.length / pageOpt.size)
  const totalPage = TableData.data.length
  const data = pageOpt.current > totalPage ? [] : TableData.data.slice(start, end)
  return {
    code: 0,
    data,
    total: totalPage,
    msg: 'success'
  }
})

// 船舶告警分析数据
mock(/AlarmAnalyseData/, 'get', {
  code: 0,
  'data|10': [
    {
      'shipName|1': [
        '@string("upper", 2)@integer(1000, 9999)',
        '@string("upper", 1)@integer(10000, 99999)'
      ],
      shipLength: '@cname',
      shipTypes: /^(乡镇船|在册船|国库船)$/,
      portName: /^(电建渔港01|电建渔港02|电建渔港03|电建渔港04)$/,
      portTypes: /^(出港|进港)$/,
      startTime: '@datetime',
      dataResouurce: '船舶抓拍'
    }
  ],
  msg: 'success'
})

// 坐标数据
mock(/MultiPointData/, 'get', {
  code: 0,
  data: {
    'rotate|0-360': 0
  },
  msg: 'success'
})

// 点击表格的查看，渲染Drawer的数据
mock(/getDrawerData/, 'get', (opt) => {
  const data = JSON.parse(opt.body)
  const shipTypes = ['乡镇船', '在册船', '国库船']
  const workTypes = ['捕捞渔船', '养殖渔船', '拖网渔船', '围网渔船', '张网渔船']
  const untrustworthys = ['是', '否']
  const shipStatuss = ['在线', '离线']
  return {
    ...data,
    shipType: randomArr(shipTypes),
    workType: randomArr(workTypes),
    untrustworthy: randomArr(untrustworthys),
    shipStatus: randomArr(shipStatuss),
    threeNo: randomArr(untrustworthys)
  }
})

mock(/queryTableData/, 'get', (opt) => {
  let data = JSON.parse(opt.body)
  const portTypes = ['电建渔港001', '电建渔港002', '电建渔港003', '电建渔港004']
  if (data.cmdType == '') {
    data.cmdType = randomArr(['北斗', 'AIS', '雷达'])
  }
  if (data.shipLength == '') {
    data.shipLength = randomArr(['李超', '孙丽', '张三', '李四'])
  }
  if (data.shipName == '') {
    data.shipName = randomArr(['J51024', 'A50241', 'A50241'])
  }

  return {
    ...data,
    portName: randomArr(portTypes),
    startTime: getRandomTimestampInRange(data.startTime[0], data.startTime[1]),
    total: 1
  }
})
// 航迹信息坐标
mock(/generateMockArrays/, 'get', (opt) => {
  const givenArray = JSON.parse(opt.body)

  function generateMockArrays(count) {
    const mockArrays = []

    // for (let i = 0; i < count; i++) {
    //   // 生成随机偏差
    //   const randomLatDeviation = (Math.random() - 0.5) * 1
    //   const randomLngDeviation = (Math.random() - 0.5) * 1

    //   // 计算新的坐标值
    //   const lat = givenArray[0] + randomLatDeviation
    //   const lng = givenArray[1] + randomLngDeviation

    //   // 将新坐标加入数组
    //   mockArrays.push([lat, lng])givenArray
    // }
    for (let i = 0; i < 2; i++) {
      // 计算新的坐标值
      const lat = givenArray[0] - (0.1 * i + 1)
      const lng = givenArray[1] - (0.1 * i + 1)

      // 将新坐标加入数组
      mockArrays.push([lat, lng])
    }

    return mockArrays
  }
  const mockData = generateMockArrays(2)
  return mockData
})

mock(/zoneshipInfo/, 'get', (opt) => {
  const data = JSON.parse(opt.body)
  const value = []
  const shipLengthS = ['张超', '李四', '净水', '王五', '张留', '王顺', '张存', '李四', '张武']
  const shipNames = [
    'A1105',
    'A1106',
    'A1107',
    'A1108',
    'A1109',
    'A1110',
    'A1111',
    'A1112',
    'A1113'
  ]
  const phones = [
    '12345678901',
    '12345678902',
    '12345678903',
    '12345678904',
    '12345678905',
    '12345678906',
    '12345678907',
    '12345678908',
    '12345678909'
  ]
  for (let i = 0; i < data.markerContainNum; i++) {
    let obj = {
      shipName: shipNames[i],
      shipLength: shipLengthS[i],
      cmdType: data.cmdType,
      phone: phones[i]
    }
    value.push(obj)
  }
  return value
})

// 船舶信息
mock(/shipInfoAnnotation/, 'get', {
  code: 0,
  'data|10': [
    {
      'shipName|1': [
        '@string("upper", 2)@integer(1000, 9999)',
        '@string("upper", 1)@integer(10000, 99999)'
      ],
      shipLength: '@cname',
      shipType: /^(乡镇船|在册船|国库船)$/,
      isOnline: /^(在线|离线)$/,
      phone: /^(136|159|188|153|177)\d{8}$/,
      portName: /^(电建渔港01|电建渔港02|电建渔港03|电建渔港04)$/,
      cmdType: /^(北斗|AIS|雷达)$/,
      startTime: '@datetime'
    }
  ],
  msg: 'success'
})

// 船舶类型标注
mock(/shipAnnotation/, 'get', {
  code: 0,
  'data|10': [
    {
      'shipName|1': [
        '@string("upper", 2)@integer(1000, 9999)',
        '@string("upper", 1)@integer(10000, 99999)'
      ],
      shipLength: '@cname',
      portName: /^(电建渔港01|电建渔港02|电建渔港03|电建渔港04)$/,
      startTime: '@datetime',
      cmdType: /^(北斗|AIS|雷达)$/,
      phone: /^(136|159|188|153|177)\d{8}$/,
      isOnline: /^(在线|离线)$/
    }
  ],
  msg: 'success'
})

mock(/getTargetFilter/, 'get', {
  code: 0,
  'data|30': [
    {
      coordinate: ['@float(120.0000, 124.0000, 4, 4)', '@float(34.0000, 37.0000, 4, 4)'],
      type: /^(雷达|AIS|北斗)$/,
      speed: /^(0|1)$/,
      dur: '@integer(0, 24)',
      size: '@integer(0, 400)'
    }
  ]
})
