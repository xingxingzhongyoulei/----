<script setup>
import { ref, onMounted } from 'vue'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import mapTool from '../common/map-tool.vue'
import { request } from '@/utils/axios'
import alarmImg from '@/assets/img/common/icon-accident-point.png'
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
  const data = await request.get('/public/jsonData/makerCoordinate.json')
  // 创建标记
  const multipoint = new maptalks.MultiPoint(data, {
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
  new maptalks.VectorLayer('vectorMarker', multipoint).addTo(map)
  multipoint.on('click', async (e) => {
    console.log(e)
    // 请求假数据
    const res = await request.get('/Mapdata')

    multipoint.setInfoWindow({
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
        <div class="content-item close" onclick="handleClose">
        关闭
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
// 关闭信息框
function handleClose() {
  console.log('1111')
}
// 警告marker标记器
async function initAlarmMarker(map) {
  const data = await request.get('/public/jsonData/mapAlarmCoordinate.json')
  const multipoint = new maptalks.MultiPoint(data, {
    symbol: {
      markerFile: alarmImg,
      markerWidth: 28,
      markerHeight: 40,
      markerDx: 0,
      markerDy: 0,
      markerOpacity: 1
    }
  })
  new maptalks.VectorLayer('vectorAlarm', multipoint).addTo(map)
}
onMounted(() => {
  initMap()
  // onMouseMove()
  initMarker(map.value)
  initAlarmMarker(map.value)
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
  box-sizing: border-box;
  position: relative;
  text-align: left;
  padding: 20px 20px;
  min-width: 400px;
  height: auto;
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
    &.close {
      background-color: transparent;
      text-align: center;
      border: 1px solid rgba($color: #fff, $alpha: 0.8);
    }
  }
}
</style>
