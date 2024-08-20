<script setup>
import { ref, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
const queryTime = ref(null)
function initFoldChart() {
  const chartDom = document.getElementById('fold')
  const chartFold = echarts.init(chartDom).setOption({
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['越线告警', '未开AIS', '“三无”船舶', '离线', '设备异常', '非本地渔船', '一号两船']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '越线告警',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '未开AIS',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '“三无”船舶',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '离线',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '设备异常',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1220]
      },
      {
        name: '非本地渔船',
        type: 'line',
        stack: 'Total',
        data: [800, 55, 901, 700, 100, 600, 320]
      },
      {
        name: '一号两船',
        type: 'line',
        stack: 'Total',
        data: [300, 505, 21, 700, 100, 60, 120]
      },
      {
        name: '越界捕捞',
        type: 'line',
        stack: 'Total',
        data: [350, 305, 210, 750, 100, 360, 620]
      },
      {
        name: '休渔期出海',
        type: 'line',
        stack: 'Total',
        data: [900, 105, 231, 780, 160, 260, 10]
      },
      {
        name: '未报备出港',
        type: 'line',
        stack: 'Total',
        data: [600, 535, 521, 900, 190, 560, 190]
      }
    ]
  })
  window.addEventListener('resize', () => {
    chartFold.resize()
  })
}
function initPieChart() {
  const chartDom = document.getElementById('pie')
  const chartPie = echarts.init(chartDom).setOption({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: '越线告警' },
          { value: 735, name: '未开AIS' },
          { value: 580, name: '“三无”船舶' },
          { value: 484, name: '离线' },
          { value: 300, name: '设备异常' },
          { value: 90, name: '非本地渔船' },
          { value: 60, name: '一号两船' },
          { value: 80, name: '越界捕捞' },
          { value: 120, name: '休渔期出海' },
          { value: 360, name: '未报备出港' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  window.addEventListener('resize', () => {
    chartPie.resize()
  })
}
onMounted(() => {
  initFoldChart()
  initPieChart()
})
</script>

<template>
  <div class="ananly-arapper">
    <div class="analy-title">
      <div class="query-time">
        <span style="display: inline-block; margin: 0 30px">查询时间选择</span>
        <el-date-picker v-model="queryTime" type="datetime" placeholder="请输入查询时间" />
      </div>
      <div class="query" style="margin-left: 20px">
        <el-button type="primary" plain>查询</el-button>
      </div>
    </div>
    <div class="analy-contain">
      <div class="fold-line">
        <div class="fold-title">趋势分析</div>
        <div id="fold"></div>
      </div>
      <div class="pie-wrapper">
        <div class="pie-title">数量对比分析</div>
        <div id="pie"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ananly-arapper {
  pointer-events: all;
  width: 100%;
  height: 100%;
  background-color: rgb(239, 240, 241);
  padding: 25px;
  .analy-title {
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: left;
    background-color: white;
    margin-bottom: 15px;
  }
  .analy-contain {
    display: flex;
    width: 100%;
    height: calc(100% - 50px);
    .pie-wrapper {
      flex: 1;
      background-color: white;
      padding: 20px;
      .pie-title {
        padding-left: 10px;
        text-align: left;
        margin-bottom: 40px;
      }
      #pie {
        width: 100%;
        height: 100%;
        height: calc(100% - 40px);
      }
    }
    .fold-line {
      flex: 1;
      background-color: white;
      padding: 20px;
      .fold-title {
        padding-left: 10px;
        text-align: left;
        margin-bottom: 40px;
      }
      #fold {
        width: 100%;
        height: calc(100% - 70px);
      }
    }
  }
}
</style>
