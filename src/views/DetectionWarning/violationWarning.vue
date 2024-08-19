<script setup>
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { request } from '@/utils/axios'
import TrackPlayBack from '@/utils/trackPlayBack'
const map = ref(null)
const warningLayer = ref(null)
const playback = ref(null)
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
      lineColor: '#34495e',
      lineWidth: 2,
      polygonFill: 'rgb(135,196,240)',
      polygonOpacity: 0.3
    }
  }).addTo(warningLayer.value)

  let textMarker = ['休', '渔', '期', '电', '子', '围', '栏']
  const coorArr = [124.7, 35.155]
  textMarker.forEach((item, index) => {
    new maptalks.Marker([coorArr[0], coorArr[1] - 0.4 * index], {
      properties: {
        name: item
      },
      symbol: {
        textFaceName: 'sans-serif',
        textName: '{name}', //value from name in geometry's properties
        textWeight: 'normal', //'bold', 'bolder'
        textStyle: 'normal', //'italic', 'oblique'
        textSize: 25,
        textFont: null, //same as CanvasRenderingContext2D.font, override textName, textWeight and textStyle
        textFill: '#34495e',
        textOpacity: 1,
        textHaloFill: '#fff',
        textHaloRadius: 5,
        textWrapWidth: null,
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
async function getRoutePlayData() {
  const marker = new maptalks.Marker([125.4, 35.2], {
    symbol: {
      markerType: 'triangle',
      markerFill: 'red',
      markerFillOpacity: 1,
      markerLineColor: '#34495e',
      markerLineWidth: 3,
      markerLineOpacity: 1,
      markerLineDasharray: [],
      markerWidth: 20,
      markerHeight: 30,
      markerDx: 0,
      markerDy: 0,
      markerOpacity: 1
    }
  }).addTo(warningLayer.value)
  marker.on('click', (e) => {
    getRoutePlay([e.coordinate.x, e.coordinate.y])
    console.log(playback.value)
  })
}
function getRoutePlay(coor) {
  playback.value = new TrackPlayBack(map.value, coor)
}
onMounted(() => {
  getWarningMap()
  initPolygon()
  getRoutePlayData()
})
onUnmounted(() => {
  // 删除图层
  if (map.value.getLayer('warningLayer')) {
    map.value.removeLayer('warningLayer')
  }
})
</script>

<template>
  <div class="warning-wrapper">
    <div class="warning-content">111</div>
  </div>
</template>

<style lang="scss" scoped>
.warning-wrapper {
  pointer-events: all;
}
</style>
