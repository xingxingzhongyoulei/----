<script setup>
import { ref } from 'vue'

const activeReport = ref(false)
const emit = defineEmits(['handleAccident'])
function handleReport(type) {
  emit('handleAccident', type)
}
</script>

<template>
  <div class="report-wrapper" @click="activeReport = !activeReport">
    <div class="report-text">工作台</div>
    <div class="report-text-icon" :class="{ active: activeReport }">V</div>
    <div class="report-content" v-if="activeReport" @click="handleReport('事故上报')">事故上报</div>
    <div class="report-content-right" v-if="activeReport" @click="handleReport('预案处理')">
      预案处理
    </div>
  </div>
</template>

<style lang="scss" scoped>
.report-wrapper {
  position: absolute;
  width: 160px;
  height: 87px;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-image: url('@/assets/img/common/footer/icon-workbench-background.png');
  .report-text {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 40px;
    text-align: center;
    color: white;
    font-size: large;
    line-height: calc(87px - 40px);
  }
  .report-text-icon {
    position: absolute;
    color: white;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s;
    &.active {
      transform: rotateZ(180deg);
    }
  }
  .report-content {
    position: absolute;
    width: 120px;
    height: 120px;
    color: rgb(55, 159, 243);
    text-align: center;
    top: -100%;
    left: -50%;
    line-height: 120px;
    background-image: url('@/assets/img/common/footer/icon-workbench-item-background.png');
    background-size: 100% 100%;
    transition: all 0.5s;
  }
  .report-content-right {
    position: absolute;
    width: 120px;
    height: 120px;
    color: rgb(55, 159, 243);
    text-align: center;
    top: -100%;
    right: -50%;
    line-height: 120px;
    background-image: url('@/assets/img/common/footer/icon-workbench-item-background.png');
    background-size: 100% 100%;
    transition: all 0.5s;
  }
}
</style>
