<script setup>
import { ref } from 'vue'
const activeName = ref('emergencyRescue')

defineProps({
  tabsItem: {
    type: Array,
    default: []
  }
})
const emit = defineEmits(['handleClick'])
const items = {
  emergencyRescue: ['应急救援', '烟火告警'],
  shipManagement: ['渔船进出港统计', '告警分析'],
  DetectionWarning: ['目标航迹信息', '检测告警']
}
// 是否全部应用
const isTotalUse = ref(true)
function handleClick(obj) {
  emit('handleClick', obj)
}
</script>

<template>
  <div class="tabs-wrapper">
    <el-tabs v-if="isTotalUse" v-model="activeName" type="card" class="demo-tabs">
      <el-tab-pane v-for="item in tabsItem" :key="item.name" :label="item.label" :name="item.name">
        <div v-for="(obj, index) in items[item.name]" class="tab-item" @click="handleClick(obj)">
          {{ obj }}
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="tabs-bottom" @click="isTotalUse = !isTotalUse">
      全部应用
      <span
        class="total-icon"
        :style="{ transform: isTotalUse ? 'rotate(270deg)' : 'rotate(90deg)' }"
        >></span
      >
    </div>
    <div class="tabs-bottom-content" v-if="!isTotalUse">
      <template v-for="item in tabsItem" :key="item.name">
        <div class="tab-item-title">{{ item.label }}</div>
        <div v-for="(obj, index) in items[item.name]" class="tab-item" @click="handleClick(obj)">
          {{ obj }}
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  overflow: hidden;
  // background-color: rgba($color: #259ddd, $alpha: 0.5);
  // border-radius: 30px;
}
.tab-item {
  position: relative;
  display: inline-block;
  margin: 20px;
  margin-bottom: 5px;
  width: 140px;
  height: 140px;
  font-size: large;
  cursor: pointer;
  text-align: center;
  line-height: 140px;
  border-radius: 50%;
  font-family: 'Segoe UI';
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 800;
  animation: colorFont 2s linear infinite alternate;

  // background: linear-gradient(to right, rgb(116, 199, 241), rgb(6, 167, 242));

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url('@/assets/img/trawler/circle-blue.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
    animation:
      rotate 6s linear infinite,
      backImg 2s linear infinite alternate;
  }
}
.tabs-bottom {
  cursor: pointer;
  width: 100%;
  text-align: center;
  color: rgb(13, 145, 246);
  font-size: large;
  font-weight: 800;
  animation: colorFont 2s linear infinite alternate;
}
.total-icon {
  display: inline-block;
  transition: all 1s;
}
.tabs-bottom-content {
  text-align: center;
  margin-top: 30px;
}
.tab-item-title {
  display: block;
  width: 150px;
  margin: auto;
  font-size: 20px;
  color: white;
  font-weight: 800;
  border-bottom: 5px solid rgb(6, 165, 239);
}
:deep(.el-tabs__item) {
  min-width: 150px;
  min-height: 50px;
  color: white;
  font-size: 20px;
  background-image: url('@/assets/img/common/button-background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  border: none;
  overflow: visible;

  &.is-active {
    position: relative;
    border: none;
    color: rgb(13, 149, 240);
    background-image: url('@/assets/img/common/icon-nav-active.png');
    overflow: visible;

    &::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      position: absolute;
      border-radius: 50%;
      background-color: #4ca5f8;
      left: 0;
      top: 0;
      overflow: visible;
      transform: translate(-50%, -50%);
      animation: positionTrans 2s infinite;
    }
    &::after {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      position: absolute;
      border-radius: 50%;
      background-color: #4ca5f8;
      left: 100%;
      top: 100%;
      overflow: visible;
      transform: translate(-50%, -50%);
      animation: positionTrans2 2s infinite;
    }
  }
}
:deep(.el-tabs--card .el-tabs__header .el-tabs__nav) {
  border: none;
}
:deep(.el-tabs--card > .el-tabs__header) {
  border: none;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border: 0;
}
:deep(.el-tabs__nav) {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  overflow: visible;
}
:deep(.el-tabs__header) {
  min-height: 60px;
}
:deep(.el-tabs__nav-scroll) {
  overflow: visible;
}
:deep(.el-tabs__nav-wrap) {
  overflow: visible;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes backImg {
  from {
    background-image: url('@/assets/img/trawler/circle-blue.png');
  }
  to {
    background-image: url('@/assets/img/trawler/circle-yellow.png');
  }
}
@keyframes colorFont {
  from {
    color: #4ca5f8;
  }
  to {
    color: #fadb74;
  }
}
@keyframes positionTrans {
  0% {
    left: 0;
    top: 0;
  }
  25% {
    top: 0;
    left: 100%;
  }
  50% {
    top: 100%;
    left: 100%;
  }
  75% {
    top: 100%;
    left: 0;
  }
  100% {
    top: 0;
    left: 0;
  }
}
@keyframes positionTrans2 {
  0% {
    left: 100%;
    top: 100%;
  }
  25% {
    top: 100%;
    left: 0;
  }
  50% {
    top: 0;
    left: 0;
  }
  75% {
    top: 0;
    left: 100%;
  }
  100% {
    top: 100%;
    left: 100%;
  }
}
</style>
