<script setup>
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import { ref, onMounted, onUnmounted } from 'vue'
import { request } from '@/utils/axios'
import RoutePlay from '@/components/common/routePlay'
import { getSymbol } from '@/components/DetectionWarning/map/symbol'
import { getAssetsFile } from '@/utils/getAssetsFile'
import FouceMarker from '@/components/DetectionWarning/map/fouceMarker'
const map = ref(null)
const warningLayer = ref(null)
const routePlay = ref(null)
function getWarningMap() {
  map.value = window.$warningMap
  warningLayer.value = new maptalks.VectorLayer('warningLayer').addTo(map.value)
  map.value.setCenter([124.6445, 34.00669])
}
async function initPolygon() {
  const res = await request('/jsonData/polygonData.json')
  new maptalks.Polygon(res, {
    visible: true,
    editable: true,
    cursor: 'pointer',
    draggable: false,
    dragShadow: false, // display a shadow during dragging
    drawOnAxis: null, // force dragging stick on a axis, can be: x, y
    symbol: {
      lineColor: '#26FA08',
      lineWidth: 3,
      polygonFill: 'green',
      polygonOpacity: 0.1
    }
  }).addTo(warningLayer.value)

  let textMarker = ['休', '渔', '期']
  const coorArr = [124.7, 35.055]
  textMarker.forEach((item, index) => {
    new maptalks.Marker([coorArr[0], coorArr[1] - 0.8 * index], {
      properties: {
        name: item
      },
      symbol: {
        textFaceName: 'sans-serif',
        textName: '{name}', //value from name in geometry's properties
        textWeight: 'normal', //'bold', 'bolder'
        textStyle: 'normal', //'italic', 'oblique'
        textSize: 10,
        textFont: null, //same as CanvasRenderingContext2D.font, override textName, textWeight and textStyle
        textFill: '#34495e',
        textOpacity: 1,
        textHaloFill: '#fff',
        textHaloRadius: 5,
        textWrapCharacter: '\n',
        textLineSpacing: 0,
        textDx: 0,
        textDy: 0,
        textHorizontalAlignment: 'middle', //left | middle | right | auto
        textVerticalAlignment: 'middle', // top | middle | bottom | auto
        textAlign: 'center' //left | right | center | auto
      }
    }).addTo(warningLayer.value)
  })
}
const marker = ref(null)
const fouceMarker = ref(null)
async function getRoutePlayData() {
  marker.value = new maptalks.Marker([124.4, 34.2], {
    symbol: getSymbol()
  }).addTo(warningLayer.value)

  marker.value.on('click', async (e) => {
    // fouceMarker.value = new FouceMarker(map.value,e.coordinate)

    new maptalks.Marker([124.4, 34.2], {
      symbol: [
        {
          markerFile: 'img/map/icon-focus.png',
          markerWidth: {
            stops: [
              [10, 40],
              [11, 40]
            ]
          },
          markerHeight: {
            stops: [
              [10, 40],
              [11, 40]
            ]
          },
          markerDx: 0,
          markerDy: {
            stops: [
              [10, 20],
              [11, 20]
            ]
          }
        }
      ]
    }).addTo(warningLayer.value)

    const res = await request.get('/MapAlarmdata')
    const imgSrc = getAssetsFile('map/track/icon-path.png')
    // <img :src="${imgSrc}" style="width:25px;height:25px"/>
    marker.value.setInfoWindow({
      content: `
  <div class="content">
    <div class="content-title"><span>${res.data.shipNumber}</span>

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
    <div class="content-item close" onclick="handleCloseVio('close')">
    关闭
    </div>
    <div class="content-item close" onclick="handleCloseVio('back',${e.coordinate.x},${e.coordinate.y})">
    轨迹回放
    </div>
  </div>
  `,
      title: '坐标',
      autoOpenOn: true,
      custom: true
    })

    map.value.animateTo({ center: [e.coordinate.x, e.coordinate.y + 0.2], zoom: 8 })
    marker.value.openInfoWindow(e.coordinate)
  })
}

window.handleCloseVio = (type, coorX, coorY) => {
  switch (type) {
    case 'close':
      routePlay.value.removeLayer()
      marker.value.closeInfoWindow()
      break
    case 'back':
      map.value.animateTo({ zoom: 7 })
      routePlayFn(coorX, coorY)
      break

    default:
      break
  }
}
const isShowControl = ref(false)
const playTime = ref({})
const slideVal = ref(0)
const selectOpt = [
  {
    label: '原速',
    value: 1
  },
  {
    label: '20倍',
    value: 20
  },
  {
    label: '50倍',
    value: 50
  }
]
const selectVal = ref(1)
async function routePlayFn(x, y) {
  playTime.value = await routePlay.value.getRoutedata([x, y])
  isShowControl.value = true
  routePlay.value.player.on('playstart playing playend', (e) => {
    slideVal.value = e.target.time
  })
  marker.value.closeInfoWindow()
}
function startPlay() {
  routePlay.value.startPlay()
}
function playPause() {
  routePlay.value.pause()
}
function playReplay() {
  routePlay.value.replay()
}
function handleSelectChange(val) {
  routePlay.value.setSpeed(val)
}
function changeTime(val) {
  routePlay.value.setTime(val)
}
function handleClose() {
  routePlay.value.removeLayer()
  isShowControl.value = false
}
onMounted(() => {
  getWarningMap()
  initPolygon()
  routePlay.value = new RoutePlay(map.value)
  getRoutePlayData()
})
onUnmounted(() => {
  // 删除图层
  if (map.value.getLayer('warningLayer')) {
    map.value.removeLayer('warningLayer')
  }
  routePlay.value.removeLayer()
})
</script>

<template>
  <img src="/img/map/icon-focus.png" alt="">
  <div class="warning-wrapper" v-if="isShowControl">
    <div class="warning-header">
      <div class="warning-title">轨迹回放</div>
      <div class="warning-close" style="cursor: pointer; color: white" @click="handleClose">
        <el-icon><Close /></el-icon>
      </div>
    </div>
    <div class="slide-bar">
      <div class="slide-time">{{ playTime.startTime }}</div>
      <el-slider
        v-model="slideVal"
        :max="playTime.maxTime"
        :min="playTime.minTime"
        @input="changeTime"
        style="width: 200px"
      />
      <div class="slide-time">{{ playTime.endTime }}</div>
    </div>
    <div class="speed-select">
      倍速选择：
      <el-select
        v-model="selectVal"
        placeholder="请选择"
        style="width: 180px"
        @change="handleSelectChange"
      >
        <el-option
          v-for="item in selectOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>

    <div class="warning-content">
      <el-button type="primary" @click="startPlay">开始</el-button>
      <el-button type="primary" @click="playPause">暂停</el-button>
      <el-button type="primary" @click="startPlay">继续</el-button>
      <el-button type="primary" @click="playReplay">重播</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.warning-wrapper {
  pointer-events: all;
  position: absolute;

  right: 5%;
  top: 20px;
  background-color: white;
  width: 450px;
  padding-bottom: 20px;
  .warning-header {
    display: flex;
    justify-content: space-between;
    padding: 0 15px;
    margin-bottom: 30px;
    background-color: #0052d9;
    height: 30px;
    line-height: 30px;
    .warning-title {
      color: white;
      font-weight: 900;
    }
  }
  .warning-content {
    margin-top: 20px;
  }
  .slide-bar {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    .slide-time {
      min-width: 100px;
      padding: 10px;
      font-size: 15px;
    }
  }
}
</style>
