import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import { request } from '@/utils/axios'
import { RoutePlayer, formatRouteData } from 'maptalks.routeplayer'

export default class RoutePlay {
  constructor(map) {
    this.map = map
    this.alarmCoor = null
    this.player = null
    this.result = null
    this.routePlayLayer = 0
    this.maxTime = null
    this.minTime = null
  }
  // 获取轨迹数据
  async getRoutedata(alarmCoor) {
    this.alarmCoor = alarmCoor
    let res = await request('/routeBackMarker')
    const startTime = res.data[0].gpsTime
    const endTime = res.data[res.data.length - 1].gpsTime
    res = res.data
      .map((item) => {
        return {
          coordinate: [item.coordinate[0], item.coordinate[1]],
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
      time: 610000
    })

    const data = formatRouteData(this.result, {})

    this.player = new RoutePlayer(data, {
      speed: 20,
      debug: false
    })
    // 注意这里 返回的是个promise  需要处理一下  否则拿到的空值
    this.minTime = this.player.getStartTime()
    this.maxTime = this.player.getEndTime()

    // 向地图添加线
    this.lineOpt()
    return { minTime: this.minTime, maxTime: this.maxTime, startTime, endTime }
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
    this.routePlayLayer = new maptalks.VectorLayer('routePlayLayer').addTo(this.map)
    new maptalks.LineString(lineResult, {
      arrowStyle: 'classic',
      arrowPlacement: 'point',
      symbol: {
        lineWidth: 2, //线串的宽度
        lineOpacity: 1, //线串的透明度
        lineColor: 'yellow', //线串的颜色
        // lineDasharray: [10, 10],
        lineJoin: 'miter-revert',
        markerVerticalAlignment: 'middle',
        markerPlacement: 'line',
        markerType: 'ellipse',
        markerFill: 'yellow',
        markerLineColor: 'yellow'
      }
    }).addTo(this.routePlayLayer)
    // 点
    let point = new maptalks.Marker(lineResult[0], {
      symbol: {
        markerType: 'ellipse',
        markerFill: 'red',
        markerFillOpacity: 1,
        markerLineColor: '#34495e',
        markerLineWidth: 3,
        markerLineOpacity: 1,
        markerLineDasharray: [],
        markerWidth: 10,
        markerHeight: 10
      }
    }).addTo(this.routePlayLayer)
    this.player.on('playstart playing playend', (e) => {
      const { coordinate } = e
      point.setCoordinates([coordinate[0], coordinate[1]])
    })
  }
  removeLayer() {
    if (this.map.getLayer('routePlayLayer')) {
      this.map.removeLayer('routePlayLayer')
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
