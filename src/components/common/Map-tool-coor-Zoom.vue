<script setup>
import { onMounted, ref, watch } from 'vue'
const props = defineProps({
  map: {
    type: Object,
    default: {},
    required: true
  },
  coor: {
    type: Object,
    default: {},
    required: true
  },
  zoom: {
    type: Number,
    default: 8,
    required: true
  },
  left: {
    type: Number || String,
    default: null
  }
})
// 地图随着鼠标移动实时坐标
const mapCoordinate = ref(props.coor)
const mapZoom = ref(props.zoom)
const MapTool = ref(null)
watch(
  () => props.map,
  (newValue) => {
    MapTool.value = newValue
  },
  { immediate: true }
)

function getMapInfo() {
  MapTool.value.on('mousemove', (e) => {
    mapCoordinate.value = e.coordinate
  })
  MapTool.value.on('zooming', (e) => {
    mapZoom.value = e.to
  })
}
onMounted(() => {
  getMapInfo()
})
</script>

<template>
  <div
    class="coordinate"
    :style="{ left: typeof props.left == 'number' ? props.left + 'px' : props.left || '27%' }"
  >
    <div class="coordinate-item">
      <span class="coordinate-title"><span class="label">经度:</span></span
      ><span class="coordinate-item-number">{{ mapCoordinate.x.toFixed(5) }}</span>
    </div>
    <div class="coordinate-item">
      <span class="coordinate-title"><span class="label">纬度:</span></span
      ><span class="coordinate-item-number">{{ mapCoordinate.y.toFixed(5) }}</span>
    </div>
  </div>
  <div
    class="zoom"
    :style="{ left: typeof props.left == 'number' ? props.left + 'px' : props.left || '27%' }"
  >
    <span class="zoom-title">缩放等级</span>
    <span class="zoom-item-number">{{ mapZoom.toFixed(1) }}</span>
  </div>
</template>

<style lang="scss" scoped>
.coordinate,
.zoom {
  transition: all 0.5s;
  position: absolute;
  left: 27%;
  bottom: 1%;
  transform: translateX(-50%);
  width: auto;
  height: 40px;
  transform: skewX(-25deg);
  display: flex;
  background-color: white;
  color: black;
  line-height: 40px;
  border: 1px solid #106cf7;
  box-shadow: 1px 1px 1px #106cf7;
  text-align: center;
  .coordinate-item {
    .coordinate-title {
      display: inline-block;
      background-color: #106cf7;
      padding: 0 15px;
      .label {
        display: inline-block;
        color: white;
        width: 50px;
        font-size: 18px;
      }
    }
    .coordinate-item-number {
      display: inline-block;
      width: 90px;
    }
  }
}
.zoom {
  bottom: 7%;
  .zoom-title {
    display: inline-block;
    background-color: #106cf7;
    color: white;
    width: 80px;
    font-size: 18px;
  }
  .zoom-item-number {
    display: inline-block;
    width: 90px;
  }
}
</style>
