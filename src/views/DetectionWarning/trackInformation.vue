<script setup>
import { request } from '@/utils/axios'
import { onMounted, ref } from 'vue'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
const map = ref(null)
const dectionLayer = ref({})
function getDectionMap() {
  map.value = window.$dection
}
// 渲染几个用于显示航迹的点
async function initMarker() {
  dectionLayer.value.markerLayer = new maptalks.VectorLayer('markerLayer').addTo(map.value)

  const res = await request.get('/jsonData/dection.json')

  res.forEach(async (coor) => {
    const rotate = await request.get('/MultiPointData')
    initMultiPointGeoJson(coor, rotate.data.rotate)
  })
}
const marker = ref({})
function initMultiPointGeoJson(coor, rotate) {
  console.log(coor)

  marker.value.dectionMarker = new maptalks.Marker(coor, {
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
  //   创建并添加MultiPoint图层到地图
  marker.value.dectionMarker.on('click', async (e) => {
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
  dectionLayer.value.markerLayer.addGeometry(marker.value.dectionMarker)
}

onMounted(() => {
  getDectionMap()
  initMarker()
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
