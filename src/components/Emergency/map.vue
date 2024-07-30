<script setup>
import { ref, onMounted } from 'vue'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
const map = ref(null)
function initMap() {
  map.value = new maptalks.Map('map-container', {
    center: [116.404, 39.915],
    zoom: 14,
    pitch: 60,
    centerCross: true,
    doubleClickZoom: false,
    baseLayer: new maptalks.TileLayer('tile', {
      urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
    })
  })
}
onMounted(() => {
  initMap()
})
</script>

<template>
  <div id="map-container"></div>
</template>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
