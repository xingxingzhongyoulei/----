<script setup>
import portalTabs from '@/components/Portal/tabs.vue'
import { showMessage } from '@/utils/Elements'
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
</script>

<template>
  <div class="portal-wrapper">
    <div class="title-wrapper">江苏盐城智慧渔港</div>
    <div class="tabs-wrapper">
      <portalTabs :tabsItem="tabsItem" @handleClick="handleClick"></portalTabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.portal-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('@/assets/img/common/icon-login-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
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
</style>
