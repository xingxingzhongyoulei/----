<script setup>
import { ref, onMounted } from 'vue'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import mapTool from '../common/map-tool.vue'
import { request } from '@/utils/axios'
const map = ref('')
// 测距工具
const mapToolRef = ref(null)
// marker 点击弹窗
const infoWindow = ref(null)
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
async function initMarker(map) {
  const res = await request.get('/public/jsonData/makerCoordinate.json')
  // 创建标记
  const multipoint = new maptalks.MultiPoint(res, {
    visible: true,
    editable: true,
    cursor: 'pointer',
    draggable: false,
    dragShadow: false, // display a shadow during dragging
    drawOnAxis: null, // force dragging stick on a axis, can be: x, y
    symbol: {
      // textFaceName: 'sans-serif',
      // textName: 'point',
      // textFill: '#34495e',
      // textHorizontalAlignment: 'right',
      // textSize: 40,
      markerType: 'square',
      markerType: 'ellipse',
      markerFill: 'rgb(135,196,240)',
      markerFillOpacity: 1,
      markerLineColor: '#34495e',
      markerLineWidth: 3,
      markerLineOpacity: 1,
      markerLineDasharray: [],
      markerWidth: 10,
      markerHeight: 10,
      markerDx: 0,
      markerDy: 0,
      markerOpacity: 1
    }
  })

  new maptalks.VectorLayer('vector', multipoint).addTo(map)
  multipoint.on('click', (e) => {
    multipoint.setInfoWindow({
      content: `
      <div class="content">
        <div class="content-item">
          <span>船主：</span>
          <span>呼呼呼</span>
        </div>
        <div class="content-item">
          <span>手机号码：</span>
          <span>13271179551</span>
        </div>
        <div class="content-item">
          <span>坐标：</span>
          <span>经度：${e.coordinate.x.toFixed(5)}</span>
          <span>纬度：${e.coordinate.y.toFixed(5)}</span>
        </div>
        <div class="content-item">
          <span>航向：</span>
          <span>360。c</span>
        </div>
        <div class="content-item">
          <span>船牌号：</span>
          <span>船A16080</span>
        </div>
        <div class="content-item">
          <span>终端类型：</span>
          <span>AIS</span>
        </div>
      </div>      
      `,
      title: '坐标',
      autoOpenOn: true,
      custom: true
    })
    multipoint.openInfoWindow(e.coordinate)
  })
}

onMounted(() => {
  initMap()
  // onMouseMove()
  initMarker(map.value)
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
:deep(.content) {
  text-align: left;
  padding: 20px 20px;
  min-width: 400px;
  background-color: rgba($color: #3b70c0, $alpha: 0.75);
  color: white;
  .content-item {
    padding: 5px 0;
    padding-left: 10px;
    background-color: rgba($color: #106cf7, $alpha: 0.9);
    span {
      margin-right: 10px;
    }
    &:nth-child(odd) {
      background-color: rgba($color: #4a8ff7, $alpha: 0.9);
    }
  }
}
</style>
