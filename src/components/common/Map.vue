<script setup>
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import { onMounted, onUnmounted, ref, watch } from 'vue'
const map = ref(null)
const props = defineProps({
  left: {
    type: Number,
    default: 200
  }
})
// 初始化地图
function initMap() {
  map.value = new maptalks.Map('map-container', {
    center: [120.13, 33.38],
    maxZoom: 18,
    minZoom: 5,
    zoom: 8,
    pitch: 0,
    centerCross: true,
    doubleClickZoom: false,
    spatialReference: {
      projection: 'baidu'
    },
    baseLayer: new maptalks.TileLayer('base', {
      urlTemplate:
        'https://gss{s}.bdstatic.com/8bo_dTSlRsgBo1vgoIiO_jowehsv/tile/?qt=tile&x={x}&y={y}&z={z}&styles=pl&scaler=1&udt=20170927',
      subdomains: [0, 1, 2, 3]
    })
  })
}
onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<template>
  <div class="map-wrapper">
    <div id="map-container"></div>
  </div>
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
#map-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
