import { request } from '@/utils/axios'
// import maptalks from 'maptalks'
import * as maptalks from 'maptalks'

import { RoutePlayer, formatRouteData } from 'maptalks.routeplayer'
export async function getRouterPlay(map, multipointAlarm, alarmCoor) {
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
  let result = res.map((item) => {
    return {
      ...item,
      time: item.time - res[0].time
    }
  })
  result.push({
    coordinate: alarmCoor,
    time: 621000
  })
  console.log(result)
  const data = formatRouteData(result, {})

  const player = new RoutePlayer(data, {
    speed: 40,
    debug: false
  })
  player.play()
  //   线条坐标配置

  const lineResult = result.map((item) => {
    return item.coordinate
  })

  // 思路：
  // 1.准备一条线
  // 2.准备插件touterplay
  // 3.准备一个marker，动态设置marker的坐标  点沿线动画
  const layerLine = new maptalks.VectorLayer('layerLine', {
    hitDetect: true,
    // 启用几何体事件
    geometryEvents: true,
    forceRenderOnMoving: true,
    forceRenderOnZooming: true,
    forceRenderOnRotating: true
  }).addTo(map)
  const line = new maptalks.LineString(lineResult, {
    symbol: {
      lineWidth: 4, //线串的宽度
      lineOpacity: 1, //线串的透明度
      lineColor: '#0E65C1' //线串的颜色
    }
  }).addTo(layerLine)

  // 点
  const point = new maptalks.Marker(lineResult[0], {
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
  }).addTo(layerLine)

  // 2.5监听player的播放 暂停 结束 事件
  player.on('playstart playing playend pause', (e) => {
    const { coordinate } = e
    point.setCoordinates([coordinate[0], coordinate[1]])
  })
  player.on('playend', () => {
    if (map.getLayer('layerLine')) {
      map.removeLayer('layerLine')
    }

    multipointAlarm.openInfoWindow(alarmCoor)
  })
}
