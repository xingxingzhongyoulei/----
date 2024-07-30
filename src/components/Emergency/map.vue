<script setup>
import { ref, onMounted } from 'vue'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import mapTool from '../common/map-tool.vue'
import makerCoordinate from '@/utils/jsonData/makerCoordinate.json'
const map = ref('')
// 测距工具
const mapToolRef = ref(null)
const coordinates = ref([])
function initMap() {
  map.value = new maptalks.Map('map-container', {
    center: [120.13, 33.38],
    maxZoom: 18,
    minZoom: 5,
    zoom: 10,
    pitch: 30,
    centerCross: true,
    doubleClickZoom: false,
    spatialReference: {
      projection: 'baidu'
    },
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate:
        'https://gss{s}.bdstatic.com/8bo_dTSlRsgBo1vgoIiO_jowehsv/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20170927',
      subdomains: [0, 1, 2, 3],
      attribution: '&copy; <a target="_blank" href="http://map.baidu.com">Baidu</a>'
    })
  })
}
function onMouseMove() {
  // 监听鼠标移动事件
  map.value.on('mousemove', (e) => {
    console.log(e.coordinate)
  })
}
function handleClickUse(e) {
  switch (e) {
    case true:
      mapToolRef.value.enableMeasure(map.value)
      break
    case false:
      mapToolRef.value.disableMeasure()
    default:
      break
  }
}
// marker的标记
function initMarker() {}
onMounted(() => {
  initMap()
  // onMouseMove()
  // console.log(makerCoordinate)
})
</script>

<template>
  <div id="map-container"></div>
  <mapTool @handleClickUse="handleClickUse" ref="mapToolRef"></mapTool>
</template>

<style lang="scss" scoped>
#map-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
