<script setup>
import Map from '@/components/common/Map.vue'
import HeaderNav from '@/components/common/headerNav.vue'
import Menu from '@/components/common/menu.vue'
import { onMounted, ref } from 'vue'
// 导航栏实例
const headerNavRef = ref(null)
// 侧边栏是否展开
const isCollapse = ref(false)
onMounted(() => {})
</script>

<template>
  <div class="manage-wrapper">
    <HeaderNav ref="headerNavRef"></HeaderNav>
    <div class="admin">
      <div
        class="app-menu"
        :style="{ width: headerNavRef?.isCollapse || isCollapse ? '65px' : '200px' }"
      >
        <Menu :isCollapse="headerNavRef?.isCollapse || isCollapse"></Menu>
      </div>
      <Map></Map>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.manage-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  .admin {
    width: 100vw;
    height: calc(100vh - 50px);
    position: relative;
    top: 50px;
    .app-menu {
      position: absolute;
      top: 0;
      left: 0;
      width: 150px;
      height: 100vh;
      transition: all 0.45s;
      overflow: hidden;
      z-index: 999;
    }
  }
}
</style>
