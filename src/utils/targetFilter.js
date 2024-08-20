import { request } from '@/utils/axios'

import * as maptalks from 'maptalks'
export default class targetFilter {
  constructor(map) {
    this.map = map
    this.filterData = []
    this.layer = null
    this.MultiTarget = null
    this.data = null
    // 筛选数组
    this.typeArr = []
    this.speedArr = []
    this.durArr = []
    this.sizeArr = []

    this.initLayer()
    this.getTargetData().then(() => {
      this.addToMarker(this.filterData)
    })
  }
  //获取所有坐标的数据
  async getTargetData() {
    const res = await request.get('/getTargetFilter')
    this.filterData = res.data
  }
  //向地图添加图层
  initLayer() {
    this.layer = new maptalks.VectorLayer('targetFilterLayer').addTo(this.map)
  }
  // 向图层添加坐标
  initMarker(coor) {
    this.MultiTarget = new maptalks.MultiPoint(coor, {
      cursor: 'pointer',
      draggable: false,
      dragShadow: false,
      symbol: {
        markerType: 'ellipse',
        markerFill: 'red',
        markerFillOpacity: 0.5,
        markerLineColor: 'blue',
        markerWidth: 10,
        markerHeight: 10
      }
    }).addTo(this.layer)
  }
  addToMarker(value) {
    // console.log(this.filterData)
    let data = []
    value.forEach((item) => {
      data.push([item.coordinate[0], item.coordinate[1]])
    })
    this.initMarker(data)
  }
  filterMarker(type, val) {
    // 每回多选发生改变，执行清除图层所有图形
    this.clearMarker()

    switch (type) {
      case 'type':
        this.typeArr = val
        break
      case 'speed':
        this.speedArr = val
        break
      case 'dur':
        this.durArr = val
        break
      case 'size':
        this.sizeArr = val
        break
      default:
        break
    }

    this.filterArrData()
  }
  filterArrData() {
    let dataArr = this.filterData

    // 类型筛选
    if (this.typeArr.length > 0) {
      dataArr = dataArr.filter((item) => {
        return this.typeArr.includes(item.type)
      })
    } else {
      dataArr = dataArr.filter((item) => {
        return item.type !== null
      })
    }

    // 航速筛选
    if (this.speedArr.length > 0) {
      dataArr = dataArr.filter((item) => {
        return this.speedArr.includes(parseInt(item.speed))
      })
    } else {
      dataArr = dataArr.filter((item) => {
        return item.speed !== null
      })
    }

    // 跟踪时长筛选
    if (this.durArr.length > 0) {
      if (this.durArr.length == 1 && this.durArr[0] == 3) {
        dataArr = dataArr.filter((item) => {
          return item.dur <= this.durArr[0]
        })
      } else if (this.durArr.length == 1) {
        dataArr = dataArr.filter((item) => {
          return item.dur <= this.durArr[0] && item.dur >= this.durArr[0] / 2
        })
      } else {
        dataArr = dataArr.filter((item) => {
          return item.dur >= this.durArr[0] && item.dur <= this.durArr[this.durArr.length - 1]
        })
      }
    } else {
      dataArr = dataArr.filter((item) => {
        return item.dur !== null
      })
    }

    // 跟踪大小筛选
    if (this.sizeArr.length > 1 && this.sizeArr[this.sizeArr.length - 1] != 241) {
      dataArr = dataArr.filter((item) => {
        return item.size <= this.sizeArr[this.sizeArr.length - 1] && item.size >= this.sizeArr[0]
      })
    } else if (this.sizeArr.length == 1) {
      dataArr = dataArr.filter((item) => {
        return item.size <= this.sizeArr[0] && item.size >= this.sizeArr[0] - 40
      })
    } else if (this.sizeArr[this.sizeArr.length - 1] == 241) {
      dataArr = dataArr.filter((item) => {
        return item.size > 240
      })
    } else {
      dataArr = dataArr.filter((item) => {
        return item.size !== null
      })
    }

    this.addToMarker(dataArr)
  }
  reseizeData() {
    this.clearMarker()
    this.typeArr = []
    this.sizeArr = []
    this.durArr = []
    this.speedArr = []
    this.filterArrData()
  }

  //   目标大小筛选
  sizeFilter(val) {
    console.log(val)
    let data = this.filterData.filter((item) => {
      return item.size <= val[val.length - 1] && item.size >= val[0]
    })
    this.addToMarker(data)
  }

  clearMarker() {
    this.layer.clear()
  }
  removeLayer() {
    if (this.layer) {
      this.layer.remove()
    }
  }
}
