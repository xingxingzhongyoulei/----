<script setup>
import { ref, onMounted, watch } from 'vue'
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'

const isUse = ref(false)
const mapTool = ref(null)
const emit = defineEmits(['handleClickUse'])
// 启动测距工具
function enableMeasure(map) {
  mapTool.value = new maptalks.DistanceTool({
    symbol: {
      lineColor: 'black',
      lineWidth: 4
    },
    vertexSymbol: {
      markerType: 'ellipse',
      markerFill: '#1bbc9b',
      markerLineColor: '#000',
      markerLineWidth: 3,
      markerWidth: 10,
      markerHeight: 10
    },

    labelOptions: {
      textSymbol: {
        textFaceName: 'monospace',
        textFill: '#fff',
        textLineSpacing: 1,
        textHorizontalAlignment: 'right',
        textDx: 15,
        markerLineColor: '#b4b3b3',
        markerFill: '#000'
      },
      boxStyle: {
        padding: [6, 2],
        symbol: {
          markerType: 'square',
          markerFill: '#000',
          markerFillOpacity: 0.9,
          markerLineColor: '#b4b3b3'
        }
      }
    },
    clearButtonSymbol: [
      {
        markerType: 'square',
        markerFill: '#000',
        markerLineColor: '#b4b3b3',
        markerLineWidth: 2,
        markerWidth: 15,
        markerHeight: 15,
        markerDx: 20
      },
      {
        markerType: 'x',
        markerWidth: 10,
        markerHeight: 10,
        markerLineColor: '#fff',
        markerDx: 20
      }
    ],
    language: 'zh-CN'
  }).addTo(map)
}
// 禁用测距工具
function disableMeasure() {
  mapTool.value.disable()
  // 禁用之后清除
  // mapTool.value.clear()
}

// 监听是否启用测距工具，触发emit事件
watch(isUse, (newValue) => {
  emit('handleClickUse', newValue)
})
defineExpose({
  enableMeasure,
  disableMeasure
})
</script>

<template>
  <div class="map-tool" :class="{ active: isUse }" @click="isUse = !isUse">测距</div>
</template>

<style lang="scss" scoped>
.map-tool {
  position: absolute;
  right: 20px;
  top: 50%;
  font-size: 20px;
  transform: translateY(-50%);
  color: aliceblue;
  padding: 5px 15px;
  padding-left: 30px;
  cursor: pointer;
  background-image: url('@/assets/img/common/emergency/icon-checkbox-label.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 10px;
}
.active {
  background-image: url('@/assets/img/common/emergency/icon-checkbox-label-checked.png');
}
</style>
