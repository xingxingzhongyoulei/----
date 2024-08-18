import { request } from '@/utils/axios'

import * as maptalks from 'maptalks'
export default class targetFilter {
  constructor(map) {
    this.map = map
    this.filterData = []
    this.layer = null
    this.MultiTarget = null
    this.data = null
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
    console.log(type)
    console.log(val)

    // switch (type) {
    //   case 'type':
    //     this.typeFilter(val)
    //     break
    //   case 'speed':
    //     this.speedFilter(val)
    //     break
    //   case 'dur':
    //     this.durFilter(val)
    //     break
    //   case 'size':
    //     this.sizeFilter(val)
    //     break
    //   default:
    //     break
    // }
  }
  //   类型筛选
  typeFilter(val) {
    let data = this.filterData.filter((item) => {
      return val.includes(item.type)
    })
    this.addToMarker(data)
  }
  //   航速筛选
  speedFilter(val) {
    let data = this.filterData.filter((item) => {
      return val.includes(parseInt(item.speed))
    })
    this.addToMarker(data)
  }
  //   跟踪时长筛选
  durFilter(val) {
    console.log(val)
    let data = null
    if (val.length == 1 && val[0] == 3) {
      data = this.filterData.filter((item) => {
        return item.dur <= val[0]
      })
    } else if (val.length == 1) {
      data = this.filterData.filter((item) => {
        return item.dur <= val[0] && item.dur >= val[0] / 2
      })
    } else {
      data = this.filterData.filter((item) => {
        return item.dur >= val[0] && item.dur <= val[val.length - 1]
      })
    }

    this.addToMarker(data)
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
