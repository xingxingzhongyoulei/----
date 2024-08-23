<script setup>
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { request } from '@/utils/axios'
import { getRouterPlay } from '@/utils/rouyerPlay'
import MapToolCoorZoom from '@/components/common/Map-tool-coor-Zoom.vue'
import mapToolAll from '../common/map-tool-all.vue'
import mapBaseSwitch from '../common/map-base-switch.vue'
import BaseLayerInMT from './map/BaseLayerInMT'
const map = ref(null)

const props = defineProps({
  left: {
    type: Number,
    default: 200
  },
  isCollapse: {
    type: Boolean,
    default: false
  }
})
const isCollapse = ref(false)
watch(
  () => props.isCollapse,
  (newVal) => {
    isCollapse.value = newVal
  },
  { immediate: true }
)
const layerArr = ref({})

const mapZoom = ref(8)
const mapCoordinate = ref({
  x: 121.13,
  y: 33.38
})

const mapSwitch = ref(null)
// 初始化地图
function initMap() {
  map.value = new maptalks.Map('map-container-detection', {
    // center: [120.13, 33.38],
    center: mapCoordinate.value,
    maxZoom: 16,
    minZoom: 5,
    zoom: mapZoom.value,
    dragPitch: false,
    dragRotate: false,
    seamlessZoom: false,
    spatialReference: {
      projection: 'EPSG:3857'
    },
    zoom: 7
    // baseLayer: new maptalks.TileLayer('base', {
    //   urlTemplate:
    //     'https://inner.qdlimap.cn:19443/gisAssistant/wmts/grid_tile/local/seaMap/01_1-18/{z}/{y}/{x}',
    //   subdomains: ['a', 'b', 'c']
    // })
  })
  mapSwitch.value = new BaseLayerInMT(map.value, 'image')
}
// 初始化多边形区域
function initPolygon() {
  const json = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [121.0, 33.0],
          [123.0, 33.0],
          [123.0, 34.0],
          [121.0, 34.0],
          [121.0, 33.0]
        ]
      ]
    },
    properties: {
      prop0: 'value0',
      prop1: { this: 'that' }
    }
  }
  layerArr.value.layerPolygon = new maptalks.VectorLayer('layerPolygon').addTo(map.value)
  maptalks.GeoJSON.toGeometry(json, (geo) => {
    geo.setSymbol({
      lineColor: '#3194fb',
      lineWidth: 4,
      lineDasharray: [2, 1, 2], //线形
      lineOpacity: 1,
      polygonFill: 'rgb(32,88,146)',
      polygonOpacity: 0.5
    })
    layerArr.value.layerPolygon.addGeometry(geo)
  })
}
// 初始化MultiPoint
async function initMultiPoint() {
  layerArr.value.layerMultiPoint = new maptalks.VectorLayer('layerMultiPoint').addTo(map.value)

  const res = await request.get('/jsonData/makerCoordinate.json')
  res.forEach(async (coor) => {
    const rotate = await request.get('/MultiPointData')
    initMultiPointGeoJson(coor, rotate.data.rotate)
  })
}
const marker = ref({})
function initMultiPointGeoJson(coor, rotate) {
  marker.value.alarmMarker = new maptalks.Marker(coor, {
    symbol: {
      markerType: 'triangle',
      markerFill: '#fff',
      markerFillOpacity: 1,
      markerLineColor: 'blue',
      markerLineWidth: 1,
      markerWidth: 10,
      markerHeight: 20,
      markerRotation: rotate
    }
  })
  //   创建并添加MultiPoint图层到地图
  marker.value.alarmMarker.on('click', async (e) => {
    const res = await request.get('/MapAlarmdata')
    marker.value.alarmMarker.setInfoWindow({
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
      <span>最后定位时间：</span>
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
    marker.value.alarmMarker.openInfoWindow(e.coordinate)
  })
  layerArr.value.layerMultiPoint.addGeometry(marker.value.alarmMarker)
}
window.handleClose = (e, params = '', coordinateX = '', coordinateY = '') => {
  marker.value.alarmMarker.closeInfoWindow()
  switch (e) {
    case 'accident-information':
      dispatchCircular([coordinateX, coordinateY], params, coordinateX, coordinateY)
      break
    case 'alarmInform':
      treeInform()
      break
    case 'back':
      getRouterPlay(map.value, [coordinateX, coordinateY])
      multipointAlarm.openInfoWindow([coordinateX, coordinateY])
      break

    default:
      break
  }
}

function handleToolClick(val) {
  console.log(val)
  switch (val) {
    case 'zoom-in':
      map.value.setZoom(map.value.getZoom() + 1)
      break
    case 'zoom-out':
      map.value.setZoom(map.value.getZoom() - 1)
      break

    default:
      break
  }
}
// 切换地图底层
function handleMapBaseSwitch(val, name, index) {
  mapSwitch.value.toggleMapServer(name)
}

onMounted(() => {
  initMap()
  initPolygon()
  initMultiPoint()
  window.$dection = map.value
  window.$zonePlayback = map.value
  window.$filterMap = map.value
  window.$warningMap = map.value
})

onUnmounted(() => {
  if (layerArr.value) {
    // for (let key in layerArr.value) {
    //   layerArr.value[key].remove()
    // }
    layerArr.value = {}
  }
  if (map.value) {
    map.value.remove()
    map.value = null
  }
  if (window.$dection) {
    window.$dection.remove()
    window.$dection = null
  }
  if (window.$zonePlayback) {
    window.$zonePlayback.remove()
    window.$zonePlayback = null
  }
  if (window.$filterMap) {
    window.$filterMap.remove()
    window.$filterMap = null
  }
})
</script>

<template>
  <div class="map-wrapper">
    <div id="map-container-detection"></div>
  </div>
  <MapToolCoorZoom
    v-if="map"
    :map="map"
    :coor="mapCoordinate"
    :zoom="mapZoom"
    :left="isCollapse ? 80 : 215"
  ></MapToolCoorZoom>
  <mapToolAll @handleToolClick="handleToolClick"></mapToolAll>
  <mapBaseSwitch @handle="handleMapBaseSwitch"></mapBaseSwitch>
</template>

<style lang="scss" scoped>
.map-wrapper {
  position: absolute;
  top: 0;
  left: 0; //
  right: 0;
  bottom: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
}
#map-container-detection {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
:deep(.content) {
  box-sizing: border-box;
  position: relative;
  text-align: left;
  padding: 20px 20px;
  min-width: 400px;
  height: auto;
  background-color: rgba($color: #021846, $alpha: 1);
  color: white;

  .content-title {
    text-align: left;
    font-size: 18px;
    color: #04cdf0;
    font-weight: bold;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
  .content-item {
    padding: 2px 0;
    padding-left: 10px;
    background-color: rgba($color: #052261, $alpha: 0.9);
    img {
      width: 30px;
      height: 30px;
      background-color: #021846;
    }
    & span:nth-child(1) {
      color: #a6acc5;
    }
    span {
      margin-right: 10px;
      color: white;
      font-size: 15px;
    }
    &:nth-child(odd) {
      background-color: rgba($color: #091435, $alpha: 0.4);
    }
    &.close {
      background-color: transparent;
      text-align: center;
      border: 1px solid rgba($color: #fff, $alpha: 0.8);
      margin-top: 10px;
    }
  }
}
</style>
