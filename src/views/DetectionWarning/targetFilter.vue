<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import targetFilter from '@/utils/targetFilter'
const router = useRouter()
const map = ref(null)
let targetFilterVal = null

function close() {
  router.push('/detectionWarning')
}
function getFilterMap() {
  map.value = window.$filterMap
}
// 目标类型
const targetTypes = [
  {
    value: '雷达',
    label: '雷达目标'
  },
  {
    value: 'AIS',
    label: 'AIS目标'
  },
  {
    value: '北斗',
    label: '北斗目标'
  }
]
const targetType = ref([])
// 航速
const speeds = [
  {
    label: '>=13节',
    value: 1
  },
  {
    label: '0~13节',
    value: 0
  }
]
const speed = ref([])
// 跟踪时长
const trackingDurations = [
  {
    label: '0-3',
    value: 3
  },
  {
    label: '3-6',
    value: 6
  },
  {
    label: '6-12',
    value: 12
  },
  {
    label: '12-24',
    value: 24
  }
]
const trackingDuration = ref([])
// 目标大小筛选
const targetSizes = [
  {
    label: '0-40',
    value: [0, 40]
  },
  {
    label: '41-80',
    value: [41, 80]
  },
  {
    label: '81-120',
    value: [81, 120]
  },
  {
    label: '121-160',
    value: [121, 160]
  },
  {
    label: '161-240',
    value: [161, 240]
  },
  {
    label: '241-320',
    value: [241, 320]
  },
  {
    label: '>320',
    value: [321]
  }
]
const targetSize = ref([])
// 目标类型筛选的值发生变化的事件
// ==================================================================
function handleChange(val) {
  targetFilterVal.filterMarker('type', val)
}
// 航速筛选
function handleChangeSpeed(val) {
  //   船速
  if (speed.value.length === 2) {
    speed.value.shift()
  }
  targetFilterVal.filterMarker('speed', val)
}
// 跟踪时长筛选
function handleChangeDuration(val) {
  targetFilterVal.filterMarker('dur', val)
}
// 目标大小筛选
function handleChangeSize(val) {
  let data = [...new Set(val)].sort((a, b) => {
    return a - b
  })
  targetFilterVal.filterMarker('size', data)
}
// ================================================================
function handleReset() {
  targetType.value = []
  speed.value = []
  trackingDuration.value = []
  targetSize.value = []
}
// 实例化目标筛选
function initTargetFilter() {
  targetFilterVal = new targetFilter(map.value)
}
// 清空坐标
function handleClear() {
  targetFilterVal.clearMarker()
}
onMounted(() => {
  getFilterMap()
  initTargetFilter()
})
onUnmounted(() => {
  targetFilterVal.removeLayer()
})
</script>

<template>
  <div class="filter-wrapper">
    <div class="filter-wrapper-header">
      <div class="title">目标筛选</div>
      <div class="filter-wrapper-close" @click="close" style="cursor: pointer">
        <el-icon><Close /></el-icon>
      </div>
    </div>
    <!-- 目标类型筛选 -->
    <div class="filter-wrapper-content">
      <div class="filter-wrapper-content-title">目标类型筛选</div>
      <div class="filter-wrapper-content-item">
        <el-checkbox-group v-model="targetType" @change="handleChange">
          <el-checkbox-button
            v-for="item in targetTypes"
            :key="item.value"
            :value="item.value"
            style="margin-right: 10px"
          >
            {{ item.label }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <!-- 航速快慢筛选 -->
    <div class="filter-wrapper-content">
      <div class="filter-wrapper-content-title">航速筛选</div>
      <div class="filter-wrapper-content-item">
        <el-checkbox-group v-model="speed" @change="handleChangeSpeed">
          <el-checkbox-button
            v-for="item in speeds"
            :key="item.value"
            :value="item.value"
            style="margin-right: 10px"
          >
            {{ item.label }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <!-- 跟踪时长筛选 -->
    <div class="filter-wrapper-content">
      <div class="filter-wrapper-content-title">跟踪时长筛选</div>
      <div class="filter-wrapper-content-item">
        <el-checkbox-group v-model="trackingDuration" @change="handleChangeDuration">
          <el-checkbox-button
            v-for="item in trackingDurations"
            :key="item.value"
            :value="item.value"
            style="margin-right: 10px"
          >
            {{ item.label }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <!-- 目标大小筛选 -->
    <div class="filter-wrapper-content">
      <div class="filter-wrapper-content-title">目标大小筛选</div>
      <div class="filter-wrapper-content-item">
        <el-checkbox-group v-model="targetSize" @change="handleChangeSize">
          <el-checkbox-button
            v-for="item in targetSizes"
            :key="item.value"
            :value="item.value"
            style="margin-right: 10px; margin-top: 10px"
          >
            {{ item.label }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>
    <div class="button-reset">
      <el-button type="primary" plain @click="handleReset">重置</el-button>
      <el-button type="primary" plain @click="handleClear">隐藏全部</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-wrapper {
  position: absolute;
  top: 30%;
  right: 40px;
  transform: translateY(-50%);
  background-color: white;
  width: 400px;
  padding: 15px 25px;
  pointer-events: all;
  .filter-wrapper-header {
    display: flex;
    justify-content: space-between;
    height: 30px;
    line-height: 35px;
    border-bottom: 1px solid black;
    .title {
      font-size: 25px;
      line-height: 25px;
    }
  }
  .filter-wrapper-content {
    text-align: left;
    margin-top: 15px;
    .filter-wrapper-content-title {
      color: rgb(8, 149, 243);
      font-weight: bold;
      margin: 5px 0;
    }
  }
  .button-reset {
    margin-top: 25px;
  }
}
:deep(.el-checkbox-button__inner) {
  border: 1px solid grey;
}
:deep(.el-checkbox-button:first-child .el-checkbox-button__inner) {
  border: 1px solid grey;
}
</style>
