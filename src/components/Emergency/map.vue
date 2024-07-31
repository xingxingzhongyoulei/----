<script setup>
import { ref, onMounted } from 'vue'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import mapTool from '../common/map-tool.vue'
import { request } from '@/utils/axios'
import alarmImg from '@/assets/img/common/icon-accident-point.png'
import alarmTitle from '@/assets/img/common/icon-address.png'
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
const multipoint = ref(null)
async function initMarker(map) {
  const data = await request.get('/public/jsonData/makerCoordinate.json')
  // 创建标记
  multipoint.value = new maptalks.MultiPoint(data, {
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
  new maptalks.VectorLayer('vectorMarker', multipoint.value).addTo(map)
  multipoint.value.on('click', async (e) => {
    // 请求假数据
    const res = await request.get('/Mapdata')

    multipoint.value.setInfoWindow({
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
        <div class="content-item close" onclick="handleClose()">
        关闭
        </div>
      </div>
      `,
      title: '坐标',
      autoOpenOn: true,
      custom: true
    })
    multipoint.value.openInfoWindow(e.coordinate)
  })
}
// 警告marker标记器
const multipointAlarm = ref(null)
async function initAlarmMarker(map) {
  const data = await request.get('/public/jsonData/mapAlarmCoordinate.json')
  multipointAlarm.value = new maptalks.MultiPoint(data, {
    symbol: {
      markerFile: alarmImg,
      markerWidth: 28,
      markerHeight: 40,
      markerDx: 0,
      markerDy: 0,
      markerOpacity: 1
    }
  })
  new maptalks.VectorLayer('vectorAlarm', multipointAlarm.value).addTo(map)
  // 信息框弹出
  multipointAlarm.value.on('click', async (e) => {
    map.setCenter(e.coordinate)
    // 请求假数据
    const res = await request.get('/MapAlarmdata')

    multipointAlarm.value.setInfoWindow({
      content: `
      <div class="content">
        <div class="content-title">
          <img src="${alarmTitle}" />
          <span>事故报警</span>
        </div>
        <div class="content-item">
          <span>事故类型：</span>
          <span>${res.data.alarmMsg}</span>
        </div>
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
        <div class="content-item close" onclick="handleClose()">
        关闭
        </div>
        <div class="content-item close" onclick="handleClose()">
        立即调度处置
        </div>
        <div class="content-item close" onclick="handleClose()">
        预警通知
        </div>
      </div>
      `,
      title: '坐标',
      autoOpenOn: true,
      custom: true
    })
    multipointAlarm.value.openInfoWindow(e.coordinate)
  })
}

// 需要挂载全局  局部不生效 关闭信息框
window.handleClose = (e) => {
  // 关闭信息框
  multipointAlarm.value.closeInfoWindow()
  multipoint.value.closeInfoWindow()
}
onMounted(() => {
  initMap()
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
  .content-title {
    text-align: center;
    font-size: 20px;
    color: red;
    font-weight: bold;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  }
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
      margin-top: 10px;
    }
  }
}
</style>
