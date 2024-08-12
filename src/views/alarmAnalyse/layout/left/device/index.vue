<template>
  <div class="device-wrapper">
    <SubTitle title="告警" :list="list" type="text" style="margin: 10px 0" />

    <div class="device-container">
      <div class="device-chart" id="device-chart"></div>
      <div class="device-total">
        <div class="device-total-num">5293</div>
        <div class="device-total-text">总数</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import SubTitle from '@/components/Title/index.vue'
import * as echarts from 'echarts'
import { nextTick, onMounted, onUnmounted } from 'vue'

let chart = null
// const total = 5293
const normalData = 3285.8944
const offlineData = 2007.1056
const list = ['单位：台']
// 饼图配置
const option = {
  tooltip: {
    trigger: 'item',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    },
    backgroundColor: '#1873FB80',
    borderColor: '#BAE7FF66',
    borderWidth: 3,
    textStyle: {
      color: '#fff'
    },
    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);'
  },
  color: [
    {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0.5,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#4988F5' // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#6AE5FC' // 100% 处的颜色
        }
      ],
      global: false // 缺省为 false
    }
  ],

  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['52%', '70%'],
      avoidLabelOverlap: true,
      padAngle: 5,
      itemStyle: {
        borderRadius: 0
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{d}%\n\n{b}',
        color: '#6FEFEA',
        fontSize: 20
      },
      emphasis: {
        disabled: false,
        scale: false,
        scaleSize: 20
      },

      labelLine: {
        show: true,
        length: 18,
        length2: 40,
        lineStyle: {
          width: 3,
          cap: 'square'
        }
      },
      labelLayout: {
        align: 'center',
        verticalAlign: 'middle'
      },

      data: [
        { value: offlineData, name: '离线' },
        { value: normalData, name: '正常' }
      ]
    }
  ]
}
// 创建饼状图
const initChart = () => {
  const chartDom = document.getElementById('device-chart')
  chart = echarts.init(chartDom)
}
onMounted(() => {
  nextTick(() => {
    initChart()
    chart.setOption(option)
  })
})

onUnmounted(() => {
  chart.clear()
  chart.dispose()
})
</script>

<style lang="scss" scoped>
.device-wrapper {
  background-color: rgba($color: #151f3a, $alpha: 0.3);
}
.device-container {
  position: relative;
}
.device-chart {
  width: 100%;
  height: 200px;
}

.device-total {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #6de4ed;
  text-align: center;
  .device-total-num {
    font-size: 25px;
  }
  .device-total-text {
    font-size: 17px;
  }
}
</style>
