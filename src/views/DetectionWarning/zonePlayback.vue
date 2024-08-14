<script setup>
import 'maptalks/dist/maptalks.css'
import * as maptalks from 'maptalks'
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
const map = ref(null)
const layerArr = ref({})
const router = useRouter()
import Table from '@/components/common/table.vue'
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
  layerArr.value.drawToolLayer.clear()
  console.log(val)
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
      lineColor: '#red',
      lineWidth: 5,
      polygonFill: 'red',
      polygonOpacity: 0.1
    },
    once: true
  })
    .addTo(map.value)
    .disable()
}
function drawGraphics(type) {
  // 启用绘画工具
  drawTool.value.setMode(type).enable()

  drawTool.value.on('drawend', function (param) {
    layerArr.value.drawToolLayer.addGeometry(param.geometry)
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
function resetData() {
  formModel.value = {
    startTime: '',
    endTime: '',
    cmdType: ''
  }
  selectValue.value = ''
}
// 区域查询
function queryData() {
  console.log('区域查询')
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
    prop: 'cmdType',
    label: '设备类型',
    width: 80
  },
  {
    prop: 'shipLength',
    label: '船舶所有人',
    width: 120
  },
  {
    prop: 'phone',
    label: '联系方式',
    width: 100
  }
]
// 轨迹查询
function queryRouteData() {
  console.log('轨迹查询')
}
// 轨迹回放
function playBack() {
  console.log('回放')
}
onMounted(() => {
  getZonePlayMap()
  addDrawTool()
})
// 页面销毁时，将该页面所有添加的图层销毁掉
onUnmounted(() => {
  if (layerArr.value) {
    for (let key in layerArr.value) {
      layerArr.value[key].remove()
    }
    layerArr.value = {}
  }
})
</script>

<template>
  <div class="playBack-wrapper">
    <div class="header">
      <div class="title">区域回放</div>
      <div class="goBack" @click="handleGoBack">
        <el-icon><Close /></el-icon>
      </div>
    </div>
    <div class="zoneSelect-wrapper">
      <div class="zoneSelect-title">
        <span>区域选择:</span>
        <span v-if="!isRequired">此为必选项</span>
        <span v-else>已选择区域</span>
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
        :height="350"
        :isShowSelect="true"
      ></Table>
    </div>
    <div class="query-btn">
      <el-button type="primary" @click="queryRouteData">轨迹查询</el-button>
      <el-button type="primary" @click="playBack">轨迹回放</el-button>
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
</style>
