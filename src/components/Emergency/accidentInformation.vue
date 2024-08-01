<script setup>
import { request } from '@/utils/axios'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const alarmMsg = ref({})
async function initMsg() {
  const res = await request('/MapAlarmdata')
  alarmMsg.value = res.data
}
watch(
  route,
  (newValue, oldValue) => {
    console.log(newValue)
  },
  {
    immediate: true
  }
)
onMounted(() => {
  initMsg()
})
</script>

<template>
  <div class="information-wrapper">
    <div class="information-title">事故信息</div>
    <div class="information-info">
      <div class="information-info-item">船主:{{ alarmMsg.name }}</div>
      <div class="information-info-item">事故类型：{{ alarmMsg.alarmMsg }}</div>
      <div class="information-info-item">
        坐标:{{ route.query.coordinateX }} &nbsp;&nbsp;{{ route.query.coordinateY }}
      </div>
      <div class="information-info-item">电话号码:{{ alarmMsg.phone }}</div>
      <div class="information-info-item">航向:{{ alarmMsg.degree }}°</div>
      <div class="information-info-item">终端类型:{{ alarmMsg.cmd }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.information-wrapper {
  position: absolute;
  left: 30px;
  top: 150px;
  width: 300px;
  background-color: rgba($color: #081a37, $alpha: 0.8);
}
.information-title {
  padding-left: 30px;
  font-size: 20px;
  line-height: 50px;
  font-style: italic;
  text-align: left;
  color: white;
  background-image: url('@/assets/img/common/title/icon-title-background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.information-info {
  padding-bottom: 30px;
  background-color: rgba($color: #091937, $alpha: 0.2);

  .information-info-item {
    color: white;
    text-align: left;
    padding-left: 10px;
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
  }
}
</style>
