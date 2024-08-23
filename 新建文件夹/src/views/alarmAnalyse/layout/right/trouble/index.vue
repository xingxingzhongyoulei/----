<template>
  <div class="idle-wrapper">
    <SubTitle title="三无船舶告警" style="margin-bottom: 10px" />
    <div class="idle-list">
      <Vue3SeamlessScroll
        direction="up"
        :step="0.5"
        :hover="true"
        :limit-scroll-num="4"
        :is-watch="true"
        :list="data"
        class="scroll-wrapper"
      >
        <div class="idle-list-item" v-for="(item, index) in data" :key="index">
          <div class="shipName">船{{ item.shipName }}</div>
          <div class="container">
            <div>
              <span>船主：{{ item.shipLength }}</span> <span>船舶类型：{{ item.shipTypes }}</span>
              <span>渔港名称：{{ item.portName }}</span>
            </div>
            <div>
              <span>进出港类型：{{ item.portTypes }}</span>
              <span>数据来源：{{ item.dataResouurce }}</span>
            </div>
            <span>进出港时间：{{ item.startTime }}</span>
          </div>
        </div>
      </Vue3SeamlessScroll>
    </div>
  </div>
</template>
<script setup>
import SubTitle from '@/components/Title/index.vue'
import { request } from '@/utils/axios'
import { onMounted, ref } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const data = ref([])
async function initData() {
  const res = await request.get('/AlarmAnalyseData')
  data.value = res.data
}
onMounted(() => {
  initData()
})
</script>

<style lang="scss" scoped>
.idle-wrapper {
  background-color: rgba($color: #151f3a, $alpha: 0.3);
  margin-top: 10px;
}
.idle-list {
  width: 100%;
  height: 240px;
  overflow: hidden;
  .idle-list-item {
    box-sizing: border-box;
    width: 100%;
    height: 120px;
    padding: 2px;
    margin: 10px 0;
    padding-left: 15px;
    padding-right: 30px;
    line-height: 25px;
    color: white;
    flex-wrap: wrap;
    background-image: linear-gradient(to right, #44393f, #2d2c3b, #292b3d, #1c223a);
    overflow: hidden;
    text-align: left;
    &:first-child {
      margin-top: 0;
    }

    .label {
      color: #04b2d3;
    }
    .shipName {
      font-size: 18px;
    }
    .container {
      span {
        display: inline-block;
        margin-right: 15px;
        font-size: 13px;
      }
    }
  }
  .scroll-wrapper {
    overflow: hidden;
  }
}
</style>
