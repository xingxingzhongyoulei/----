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

    default:
      break
  }
}
</script>

<template>
  <div class="portal-wrapper">
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
}
.tabs-wrapper {
  width: 500px;
}
</style>
