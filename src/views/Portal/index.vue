<script setup>
import portalTabs from '@/components/Portal/tabs.vue'
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
      console.log(2)
      break
    case '渔船进出港统计':
      console.log(2)
      break
    case '告警分析':
      console.log(22222)
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
}
.tabs-wrapper {
  width: 500px;
}
</style>
