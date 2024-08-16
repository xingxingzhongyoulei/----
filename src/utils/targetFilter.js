import { request } from '@/utils/axios'
import * as maptalks from 'maptalks'
export default class targetFilter {
  constructor(map) {
    this.map = map
    this.filterData = []
    this.layer = null
    this.MultiTarget = null
    this.initLayer()
    this.getTargetData().then(() => {
      this.addToMarker()
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
        markerWidth: 15,
        markerHeight: 15
      }
    }).addTo(this.layer)
  }
  addToMarker() {
    // console.log(this.filterData)
    let data = []
    this.filterData.forEach((item) => {
      data.push([item.coordinate[0], item.coordinate[1]])
    })

    this.initMarker(data)
  }
  filterMarker(type, val) {
    console.log(type)
    console.log(val)
    // this.clearMarker()
    switch (type) {
      case 'type':
        break
      case 'speed':
        break
      case 'dur':
        break
      case 'size':
        break

      default:
        break
    }
  }

  clearMarker() {
    this.layer.clear()
  }
}
