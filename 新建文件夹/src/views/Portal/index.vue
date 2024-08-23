<script setup>
import portalTabs from '@/components/Portal/tabs.vue'

import { showMessage } from '@/utils/Elements'
import { getAssetsFile } from '@/utils/getAssetsFile'
import { useRouter } from 'vue-router'
const tabsItem = [
  {
    label: '应急救援',
    name: 'emergencyRescue'
  },
  {
    label: '船舶管理',
    name: 'shipManagement'
  },
  {
    label: '探测及系统预警',
    name: 'DetectionWarning'
  }
]
const router = useRouter()
function handleClick(obj) {
  switch (obj) {
    case '应急救援':
      router.push('/emergency')
      break
    case '烟火告警':
      showMessage('暂未开发', 'warning')
      break
    case '渔船进出港统计':
      router.push('/shipManagement')
      break
    case '告警分析':
      router.push('/alarmAnalyse')
      break
    case '目标航迹信息':
      router.push('/detectionWarning')
      break
    case '检测告警':
      router.push('/detectionWarning')
      break

    default:
      break
  }
}
const leftList = [
  {
    name: '检测告警',
    icon: 'assist',
    url: '/detectionWarning'
  },
  {
    name: '告警分析',
    icon: 'assist',
    url: '/alarmAnalyse'
  },

  {
    name: '烟火告警',
    icon: 'assist',
    url: ''
  }
]
const rightList = [
  {
    name: '目标航迹信息',
    icon: 'assist',
    url: '/detectionWarning'
  },
  {
    name: '渔船进出港统计',
    icon: 'assist',
    url: '/shipManagement'
  },
  {
    name: '应急救援',
    icon: 'assist',
    url: '/emergency'
  }
]
</script>

<template>
  <video
    src="@/assets/video/icon-data-center-background.mp4"
    class="background"
    autoplay
    loop
    muted
  ></video>
  <div class="portal-wrapper">
    <div class="title-wrapper">江苏盐城智慧渔港</div>
    <div class="tabs-wrapper">
      <div class="left">
        <div class="title">智慧渔港检测系统</div>
        <div class="tabs">
          <ul class="tabs-list">
            <li class="list-item" v-for="(item, index) in leftList" @click="handleClick(item.name)">
              <img :src="getAssetsFile('portal/system/icon-port-area.png')" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="title">智慧渔港管理系统</div>
        <div class="tabs">
          <ul class="tabs-list">
            <li
              class="list-item"
              v-for="(item, index) in rightList"
              @click="handleClick(item.name)"
            >
              <img :src="getAssetsFile('portal/system/icon-port-area.png')" />
              <span>{{ item.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.portal-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .title-wrapper {
    width: 775px;
    height: 75px;
    position: absolute;
    top: 70px;
    font-size: 60px;
    letter-spacing: 15px;
    color: white;
    text-shadow: 5px 5px 5px #116bfa;
    font-style: oblique;
    animation: colorFont 1s linear infinite alternate;
  }
}
.tabs-wrapper {
  width: 800px;
  height: 673px;
  color: rgb(255, 240, 113);
  position: relative;
  top: 0px;
  & .left {
    background-image: url('@/assets/img/portal/icon-face-plate-left-background.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    height: 100%;
    top: 0;
    width: 600px;
    left: -450px;
    transform-style: preserve-3d;
    .title {
      transform: rotateZ(5deg);
      position: absolute;
      top: 93px;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 10px;
      left: 125px;
    }
    & .tabs {
      width: 404px;
      height: 393px;
      left: 100px;
      position: absolute;
      top: 176px;
      transform-style: preserve-3d;
      transform: perspective(700px) rotate3d(18, 100, -1, 20deg);

      .tabs-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height: 100%;
        width: 100%;
        transform-style: preserve-3d;
        .list-item {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
      }
    }
  }
  & .right {
    background-image: url('@/assets/img/portal/icon-face-plate-right-background.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: absolute;
    height: 100%;
    top: 0;
    width: 600px;
    left: 650px;
    transform-style: preserve-3d;
    .title {
      transform: rotateZ(-5deg);
      position: absolute;
      top: 95px;
      font-size: 20px;
      font-weight: bold;
      letter-spacing: 10px;
      left: 220px;
    }
    & .tabs {
      width: 404px;
      height: 393px;
      left: 150px;
      position: absolute;
      top: 176px;
      transform-style: preserve-3d;
      transform: perspective(700px) rotate3d(-18, -100, 1, 20deg);

      .tabs-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        height: 100%;
        width: 100%;
        transform-style: preserve-3d;
        .list-item {
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }
      }
    }
  }
}
@keyframes colorFont {
  0% {
    text-shadow: 5px 5px 5px #caced4;
  }
  30% {
    text-shadow: 0px 0px 0 40px #e5ebf5;
  }
  50% {
    text-shadow: 0px 0px 0 50px #9ebcec;
  }
  75% {
    text-shadow: 10px 0px 0 50px #137cf5;
  }
  100% {
    text-shadow: 0px 10px 0 8px #e5ebf5;
  }
}
.background {
  position: absolute;
  height: 100%;
  left: 0;
  object-fit: fill;
  top: 0;
  width: 100%;
  z-index: 0;
}
</style>
