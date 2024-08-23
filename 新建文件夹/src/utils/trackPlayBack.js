import { request } from '@/utils/axios'
import * as maptalks from 'maptalks'
import { RoutePlayer, formatRouteData } from 'maptalks.routeplayer'
export default class TrackPlayBack {
  constructor(map, alarmCoor) {
    this.map = map
    this.alarmCoor = alarmCoor
    this.player = null
    this.result = null
    this.tracklayerLine = 0
    this.maxTime = null
    this.minTime = null
    this._getRoutedata()
  }
  //   获取轨迹数据
  async _getRoutedata() {
    let res = await request('MapRouterPlay')
    res = res.list
      .map((item) => {
        return {
          coordinate: [item.longitude, item.latitude],
          time: new Date(item.gpsTime).getTime()
        }
      })
      .sort((a, b) => {
        return a.time - b.time
      })
    // 轨迹回放使用
    this.result = res.map((item) => {
      return {
        ...item,
        time: item.time - res[0].time
      }
    })

    this.result.push({
      coordinate: this.alarmCoor,
      time: 621000
    })

    const data = formatRouteData(this.result, {})

    this.player = new RoutePlayer(data, {
      speed: 20,
      debug: false
    })
    this.minTime = this.player.getStartTime()
    this.maxTime = this.player.getEndTime()
    // this.lineOpt()
  }

  lineOpt() {
    // 线条坐标配置
    const lineResult = this.result.map((item) => {
      return item.coordinate
    })

    // 思路：
    // 1.准备一条线
    // 2.准备插件touterplay
    // 3.准备一个marker，动态设置marker的坐标  点沿线动画
    this.tracklayerLine = new maptalks.VectorLayer('tracklayerLine', {
      hitDetect: true,
      // 启用几何体事件
      geometryEvents: true,
      forceRenderOnMoving: true,
      forceRenderOnZooming: true,
      forceRenderOnRotating: true
    }).addTo(this.map)
    new maptalks.LineString(lineResult, {
      symbol: {
        lineWidth: 4, //线串的宽度
        lineOpacity: 1, //线串的透明度
        lineColor: '#0E65C1', //线串的颜色
        lineDasharray: [10, 10],
        lineJoin: 'miter-revert',
        lineCap: 'round'
      }
    }).addTo(this.tracklayerLine)
    // 点
    let point = new maptalks.Marker(lineResult[0], {
      symbol: {
        markerType: 'ellipse',
        markerFill: 'rgb(185,196,50)',
        markerFillOpacity: 1,
        markerLineColor: '#34495e',
        markerLineWidth: 3,
        markerLineOpacity: 1,
        markerLineDasharray: [],
        markerWidth: 18,
        markerHeight: 18,
        markerDx: 0,
        markerDy: 0,
        markerOpacity: 1
      }
    }).addTo(this.tracklayerLine)
    this.player.on('playstart playing playend', (e) => {
      // console.log(e.coordinate)

      const { coordinate } = e
      point.setCoordinates([coordinate[0], coordinate[1]])
    })
  }
  removeLayer() {
    if (this.map.getLayer('tracklayerLine')) {
      this.map.removeLayer('tracklayerLine')
    }
  }
  clearLayer() {
    if (this.map.getLayer('tracklayerLine')) {
      this.map.getLayer('tracklayerLine').clear()
    }
  }

  //   播放
  startPlay() {
    this.player.play()
  }
  // 暂停
  pause() {
    this.player.pause()
  }
  // 重新播放
  replay() {
    this.player.reset()
    this.player.play()
  }
  setSpeed(val) {
    this.player.setSpeed(val)
  }
  setTime(val) {
    this.player.setTime(val)
  }
  getTime() {
    return this.player.getUnitTime()
  }
}
