<script setup>
import { request } from '@/utils/axios'
import { onMounted, onUnmounted, ref } from 'vue'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
const map = ref(null)
const dectionLayer = ref({})
const marker = ref({})

function getDectionMap() {
  map.value = window.$dection
}
// 渲染几个用于显示航迹的点
async function initMarker() {
  dectionLayer.value.markerLayer = new maptalks.VectorLayer('markerLayer').addTo(map.value)

  const res = await request.get('/jsonData/dection.json')

  res.forEach(async (coor, index) => {
    const rotate = await request.get('/MultiPointData')
    initMultiPointGeoJson(coor, rotate.data.rotate, index)
    if (index === res.length - 1) {
      getMarker()
    }
  })
}
const timer = ref({})
function getMarker() {
  dectionLayer.value.lineLayer = new maptalks.VectorLayer('lineLayer').addTo(map.value)
  for (let k in marker.value) {
    console.log(k)

    const getMarker = marker.value[k].getCoordinates()
    let coor = 0.05
    timer.value[k] = setInterval(async () => {
      //   console.log(dectionLayer.value.lineLayer.getGeometryById(k))
      if (dectionLayer.value.lineLayer.getGeometryById(k)) {
        dectionLayer.value.lineLayer.getGeometryById(k).remove()
      }
      coor += 0.08
      marker.value[k].setCoordinates([getMarker.x + coor, getMarker.y + coor])
      await setMarkerLine(
        [marker.value[k].getCoordinates().x, marker.value[k].getCoordinates().y],
        k
      )
    }, 1000)
  }
}
async function setMarkerLine(coor, name) {
  let res = await request.get('generateMockArrays', {
    data: coor
  })
  res.unshift(coor)

  new maptalks.LineString(res, {
    id: name,
    symbol: {
      lineWidth: 3, //线串的宽度
      lineOpacity: 1, //线串的透明度
      lineColor: '#0E65C1', //线串的颜色
      lineJoin: 'bevel'
    }
  }).addTo(dectionLayer.value.lineLayer)
}
function initMultiPointGeoJson(coor, rotate, name) {
  marker.value[`dectionMarker${name}`] = new maptalks.Marker(coor, {
    id: `marker${name}`,
    symbol: {
      markerType: 'triangle',
      markerFill: 'red',
      markerFillOpacity: 1,
      markerLineColor: 'black',
      markerLineWidth: 1,
      markerWidth: 10,
      markerHeight: 20,
      markerRotation: rotate
    }
  })
  marker.value[`dectionMarker${name}`].on('click', async (e) => {
    const res = await request.get('/MapAlarmdata')
    marker.value.dectionMarker.setInfoWindow({
      content: `
  <div class="content">

    <div class="content-item">
      <span>船主：</span>
      <span>${res.data.name}</span>
    </div>
    <div class="content-item">
      <span>手机号码：</span>
      <span>${res.data.phone}</span>
    </div>
    <div class="content-item">
      <span>时间：</span>
      <span>2024-7-30 18:30:00</span>
    </div>
    <div class="content-item">
      <span>坐标：</span>
      <span>经度：${e.coordinate.x.toFixed(5)}</span>
      <span>纬度：${e.coordinate.y.toFixed(5)}</span>
    </div>
    <div class="content-item">
      <span>航向：</span>
      <span>${res.data.degree}°C</span>
    </div>
    <div class="content-item">
      <span>船牌号：</span>
      <span>${res.data.shipNumber}</span>
    </div>
    <div class="content-item">
      <span>终端类型：</span>
      <span>${res.data.cmd}</span>
    </div>
    <div class="content-item close" onclick="handleClose('关闭')">
    关闭
    </div>

  </div>
  `,
      autoOpenOn: true,
      custom: true
    })
    marker.value.dectionMarker.openInfoWindow(e.coordinate)
  })
  dectionLayer.value.markerLayer.addGeometry(marker.value[`dectionMarker${name}`])
  //   console.log(marker.value.dectionMarker.getCoordinates())
  //   const getDectionMarkerCoor = marker.value.dectionMarker.getCoordinates()
}

// 关闭弹窗
window.handleClose = () => {
  marker.value.dectionMarker.closeInfoWindow()
}

onMounted(() => {
  getDectionMap()
  initMarker()
})
onUnmounted(() => {
  if (map.value) {
    for (let i in dectionLayer.value) {
      dectionLayer.value[i].remove()
    }
  }
  if (timer.value) {
    for (let k in timer.value) {
      clearInterval(timer.value[k])
    }
  }
})
</script>

<template>
  <div class="track-wrapper">航迹信息</div>
</template>

<style lang="scss" scoped>
.track-wrapper {
  pointer-events: all;
}
</style>
