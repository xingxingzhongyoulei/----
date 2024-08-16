<script setup>
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
const map = ref(null)
const layerArr = ref({})
const router = useRouter()
import Table from '@/components/common/table.vue'
import { request } from '@/utils/axios'
import { showMessage } from '@/utils/Elements'
import { formatTime } from '@/utils/formatTime'

import TrackPlayBack from '@/utils/trackPlayBack'
function getZonePlayMap() {
  map.value = window.$zonePlayback
  layerArr.value.drawToolLayer = new maptalks.VectorLayer('drawToolLayer').addTo(map.value)
}
function handleGoBack() {
  router.push('/DetectionWarning')
}
const selectOpt = [
  {
    label: '圆形',
    value: 'Circle'
  },
  {
    label: '矩形',
    value: 'Rectangle'
  },
  {
    label: '多边形',
    value: 'Polygon'
  }
]
const selectValue = ref('')
// 选择区域触发
const isRequired = ref(false)
// 下拉框的值改变
function handleSelectChange(val) {
  markerContainNum.value = 0
  layerArr.value.drawToolLayer.clear()
  switch (val) {
    case 'Circle':
      drawGraphics(val)
      break
    case 'Rectangle':
      drawGraphics(val)
      break
    case 'Polygon':
      drawGraphics(val)
      break
    default:
      break
  }
}
const drawTool = ref(null)
// 向地图添加绘制工具
function addDrawTool() {
  drawTool.value = new maptalks.DrawTool({
    mode: 'Circle',
    symbol: {
      lineColor: 'red',
      lineWidth: 2,
      polygonFill: 'red',
      polygonOpacity: 0.1
    },
    once: true
  }).addTo(map.value)

  drawTool.value.disable()
}
// 被圈住的点
const markerContainNum = ref(0)
function drawGraphics(type) {
  // 启用绘画工具
  drawTool.value.setMode(type).enable()

  drawTool.value.on('drawend', function (param) {
    layerArr.value.drawToolLayer.addGeometry(param.geometry)
    const markerNumber = map.value.getLayer('layerMultiPoint').getGeometries()

    for (let i = 0; i < markerNumber.length; i++) {
      let markerCoor = markerNumber[i].getCoordinates()
      if (param.geometry.containsPoint(markerCoor)) {
        markerContainNum.value++
      }
    }
    showMessage(`该区域船只个数：${markerContainNum.value}`, 'success', 3000)
    isRequired.value = true
    // 添加玩图形后，禁用绘制工具
    drawTool.value.disable()
  })
}

// 查询条件
const formModel = ref({
  startTime: '',
  endTime: '',
  cmdType: ''
})
const cmdTypeoOPpt = ['AIS', '雷达', '北斗']
function resetData() {
  formModel.value = {
    startTime: '',
    endTime: '',
    cmdType: ''
  }
  selectValue.value = ''
}
// 区域查询
async function queryData() {
  const res = await request('/zoneshipInfo', {
    data: { ...formModel.value, markerContainNum: markerContainNum.value }
  })
  tableData.value = res
}
// table数据
const tableData = ref([])
// table显示的列
const column = [
  {
    prop: 'shipName',
    label: '船舶名称',
    width: 80
  },
  {
    prop: 'shipLength',
    label: '船舶所有人',
    width: 120
  },
  {
    prop: 'cmdType',
    label: '设备类型',
    width: 80
  },
  {
    prop: 'phone',
    label: '联系方式',
    width: 140
  }
]
// 表格事件
function handleClick(type, val) {
  switch (type) {
    case 'selectChange':
      break

    default:
      break
  }
}
const isRoutePlay = ref(false)
// 轨迹查询
function queryRouteData() {
  isRoutePlay.value = true
}
//是否显示轨迹回放组件
const isRoutePlayShow = ref(false)
let trackPlayBackVal = ref(null)

// 轨迹回放
async function playBack() {
  layerArr.value.drawToolLayer.clear()
  // 实例化轨迹回放
  trackPlayBackVal.value.removeLayer()
  trackPlayBackVal.value.clearLayer()
  trackPlayBackVal.value.lineOpt()
  slidetime.value = {
    max: trackPlayBackVal.value.maxTime,
    min: trackPlayBackVal.value.minTime
  }
  console.log(slidetime.value.max)
  trackPlayBackVal.value.player.on('playstart playing playend', (e) => {
    // console.log(e.target.time)
    slideTimeValue.value = e.target.time
  })

  isRoutePlayShow.value = true
}
function initTrackPlayBack() {
  trackPlayBackVal.value = new TrackPlayBack(map.value, [122.08666, 34.38125])
}
// 关闭轨迹回放
function closeRoutePlay() {
  // 消除轨迹回放图层
  if (map.value.getLayer('tracklayerLine')) {
    map.value.removeLayer('tracklayerLine')
  }
  isRoutePlayShow.value = false
}
const playSpeed = ref(20)
const speedSpeed = [
  {
    label: '原速',
    value: 20
  },
  {
    label: '5倍速',
    value: 30
  },
  {
    label: '10倍速',
    value: 40
  },
  {
    label: '20倍速',
    value: 60
  },
  {
    label: '50倍速',
    value: 120
  }
]
// 轨迹回放播放速度改变
function changePlaySpeed(val) {
  trackPlayBackVal.value.setSpeed(val)
}
const slideTimeValue = ref(0)

// 轨迹回放播放----------start
function play() {
  trackPlayBackVal.value.startPlay()
}
// 轨迹回放暂停
function stop() {
  trackPlayBackVal.value.pause()
}
// 轨迹回放播放继续
function next() {
  trackPlayBackVal.value.startPlay()
}
// 轨迹回放播放重放
function replay() {
  trackPlayBackVal.value.replay()
}

// slide改变时触发
let changeTimer = null
function changeTime(val) {
  trackPlayBackVal.value.pause()
  slideTimeValue.value = val
  trackPlayBackVal.value.setTime(val)
  if (changeTimer) {
    clearTimeout(changeTimer)
  }
  changeTimer = setTimeout(() => {
    trackPlayBackVal.value.startPlay()
  }, 1000)
}
const slidetime = ref({
  max: 100,
  min: 0
})

onMounted(() => {
  getZonePlayMap()
  addDrawTool()
  initTrackPlayBack()
})
// 页面销毁时，将该页面所有添加的图层销毁掉
onUnmounted(() => {
  if (layerArr.value) {
    for (let key in layerArr.value) {
      layerArr.value[key].remove()
    }
    layerArr.value = {}
  }
  trackPlayBackVal.value.removeLayer()
})
</script>

<template>
  <div class="playBack" v-if="isRoutePlayShow">
    <div class="header">
      <div class="header-left">轨迹回放</div>
      <div class="header-right" @click="closeRoutePlay" style="cursor: pointer">
        <el-icon><Close /></el-icon>
      </div>
    </div>
    <div class="play-time">
      <div class="contanin-item-left">{{ formatTime(formModel.startTime) || '开始时间' }}</div>
      <el-slider
        v-model="slideTimeValue"
        @input="changeTime"
        :min="slidetime.min"
        :max="slidetime.max"
        :show-tooltip="false"
      />
      <div class="contanin-item-right">{{ formatTime(formModel.endTime) || '结束时间' }}</div>
    </div>
    <div class="contain">
      <div class="contanin-item">
        播放速度：
        <el-select
          v-model="playSpeed"
          placeholder="原速"
          size="large"
          style="width: 200px"
          @change="changePlaySpeed"
        >
          <el-option
            v-for="item in speedSpeed"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="contanin-item">
        起始时间：
        <el-input
          :value="formatTime(formModel.startTime)"
          style="width: 250px"
          disabled
          format="YYYY/MM/DD hh:mm:ss"
        />
      </div>
      <div class="contanin-item">
        结束时间：
        <el-input :value="formatTime(formModel.endTime)" style="width: 250px" disabled />
      </div>
    </div>
    <div class="playBottom">
      <div class="playBottom-left" @click="play">
        <el-button type="primary">开始</el-button>
      </div>
      <div class="playBottom-center" @click="stop">
        <el-button type="primary" :disabled="trackPlayBackVal == null">暂停</el-button>
      </div>
      <div class="playBottom-right" @click="next">
        <el-button type="primary" :disabled="trackPlayBackVal == null">继续</el-button>
      </div>
      <div class="playBottom-right" @click="replay">
        <el-button type="primary" :disabled="trackPlayBackVal == null">重播</el-button>
      </div>
    </div>
  </div>
  <div class="playBack-wrapper" v-else>
    <div class="header">
      <div class="title">区域回放</div>
      <div class="goBack" @click="handleGoBack">
        <el-icon><Close /></el-icon>
      </div>
    </div>
    <div class="zoneSelect-wrapper">
      <div class="zoneSelect-title">
        <span>区域选择:</span>
        <span v-if="!isRequired">
          <el-icon color="red" style="font-size: 18px; margin-left: 10px"
            ><WarningFilled
          /></el-icon>
          此为必选项</span
        >
        <span v-else>
          <el-icon color="green" style="font-size: 18px; margin-left: 10px"
            ><SuccessFilled
          /></el-icon>
          已选择区域
        </span>
      </div>
      <div class="zone-select">
        <el-select
          v-model="selectValue"
          placeholder="请选择区域"
          style="width: 120px"
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
    </div>
    <div class="query-wrapper">
      <div class="query-item">
        起始时间:
        <el-date-picker
          v-model="formModel.startTime"
          type="datetime"
          placeholder="请选择起始时间"
        />
      </div>
      <div class="query-item">
        结束时间:
        <el-date-picker v-model="formModel.endTime" type="datetime" placeholder="请选择结束时间" />
      </div>
      <div class="query-item">
        终端类型：
        <el-select v-model="formModel.cmdType" placeholder="请选择终端类型" style="width: 150px">
          <el-option v-for="item in cmdTypeoOPpt" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="query-item" style="text-align: center; margin-top: 25px">
        <el-button @click="resetData">重置</el-button>
        <el-button type="primary" @click="queryData">查询</el-button>
      </div>
    </div>
    <div class="queryTable-wrapper">
      <Table
        :data="tableData"
        :column="column"
        size="large"
        :height="330"
        :isShowSelect="true"
        @handleClick="handleClick"
      ></Table>
    </div>
    <div class="query-btn">
      <el-button type="primary" @click="queryRouteData">轨迹查询</el-button>
      <el-button type="primary" @click="playBack" :disabled="!isRoutePlay">轨迹回放</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.playBack-wrapper {
  pointer-events: all;
  position: absolute;
  top: 50px;
  right: 40px;
  width: 510px;
  padding: 15px;
  background-color: white;
  .header {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    .goBack {
      cursor: pointer;
    }
  }
  .zoneSelect-wrapper {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
  }
  .query-wrapper {
    border: 1px solid #ccc;
    padding: 15px 10px;
    .query-item {
      margin-bottom: 15px;
      text-align: left;
    }
  }
  .queryTable-wrapper {
    border: 1px solid #ccc;
    margin-top: 20px;
  }
  .query-btn {
    margin-top: 20px;
  }
}
:deep(.el-select__wrapper) {
  background-color: #409eff;
}
:deep(.el-select__placeholder.is-transparent) {
  color: white;
}
:deep(.el-select__caret) {
  color: white;
}
:deep(.el-select__placeholder) {
  color: white;
}
.playBack {
  pointer-events: all;
  position: absolute;
  top: 150px;
  right: 40px;
  width: 500px;
  padding: 15px;
  background-color: white;
  .header {
    display: flex;
    justify-content: space-between;
    font-size: 20px;
  }
  .play-time {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 20px;
    :deep(.el-slider) {
      margin: 0 10px;
    }
    .contanin-item-left,
    .contanin-item-right {
      min-width: 120px;
    }
  }
  .playBottom {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20px;
  }
  .contain {
    text-align: left;
    margin-top: 10px;
    .contanin-item {
      height: 50px;
      line-height: 40px;
      padding: 5px 0;
    }
  }
}
</style>
