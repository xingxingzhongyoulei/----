<template>
  <div class="analye-container">
    <SubTitle title="告警" :list="list" type="text" style="margin: 10px 0" />
    <div class="electricityAnaly-chart" id="electricityAnaly-chart"></div>
  </div>
</template>
<script setup>
import SubTitle from '@/components/Title/index.vue'
import { nextTick, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'

const list = ['单位：台']
let chart = null
let timer = null
let currentIndex = -1
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    },
    backgroundColor: '#1873FB90',
    borderColor: '#BAE7FF80',
    borderWidth: 1,
    textStyle: {
      color: '#fff'
    },
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  color: ['#039DD1', '#0063E4'],
  legend: {
    textStyle: {
      color: '#fff'
    },
    top: '10',
    right: '0'
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    show: false
  },
  yAxis: {
    type: 'category',
    data: [
      {
        value: '大型仪器',
        textStyle: {
          color: 'white'
        }
      },
      {
        value: '空调',
        textStyle: {
          color: 'white'
        }
      },
      {
        value: '服务器',
        textStyle: {
          color: 'white'
        }
      },
      {
        value: '台式机',
        textStyle: {
          color: 'white'
        }
      },
      {
        value: '冰箱',
        textStyle: {
          color: 'white'
        }
      },
      {
        value: '打印机',
        textStyle: {
          color: 'white'
        }
      }
    ],
    axisTick: {
      alignWithLabel: true
    }
  },
  series: [
    {
      name: '关',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [59, 14, 16, 17, 18, 21],
      barWidth: '70%',
      barCategoryGap: '100%',
      barGap: '100%' // 设置柱扰图.之间的间距
    },
    {
      name: '开',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [35, 45, 42, 39, 19, 15]
    }
  ]
}
// 创建柱状图
function initChart() {
  const chartDom = document.getElementById('electricityAnaly-chart')
  chart = echarts.init(chartDom)
}

function stopShowTip() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function intervalShowTip() {
  stopShowTip()
  const { length } = option.series[0].data
  timer = setInterval(() => {
    if (length > 0) {
      currentIndex = (currentIndex + 1) % length
      chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 1,
        dataIndex: currentIndex
      })
    }
  }, 2000)
}

onMounted(() => {
  nextTick(() => {
    initChart()
    chart.setOption(option)
  })
  intervalShowTip()
})

onUnmounted(() => {
  chart.clear()
  chart.dispose()
  stopShowTip()
})
</script>

<style lang="scss" scoped>
.electricityAnaly-chart {
  width: 100%;
  height: 230px;
  border-radius: 10px;
}
.analye-container {
  background-color: rgba($color: #151f3a, $alpha: 0.3);
}
</style>
