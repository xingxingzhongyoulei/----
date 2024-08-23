<script setup>
import Map from '@/components/common/Map.vue'
import HeaderNav from '@/components/common/headerNav.vue'
import Menu from '@/components/common/menu.vue'
import Breadcrumb from '@/components/shipManagement/breadcrumb.vue'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { RouterView } from 'vue-router'
import { shipManagementMenu } from '@/components/common/menu'
// 导航栏实例
const headerNavRef = ref(null)
// 侧边栏是否展开
const isCollapse = ref(false)
const route = useRoute()
const MapIsShow = ref(true)
const MapIsShowArr = ['/shipManagement/DepartureApplication']
watch(
  () => route.path,
  (newVal) => {
    if (MapIsShowArr.includes(newVal)) {
      MapIsShow.value = false
    } else {
      MapIsShow.value = true
    }
  }
)
</script>

<template>
  <div class="manage-wrapper">
    <HeaderNav ref="headerNavRef" :title="'船舶管理功能'"></HeaderNav>
    <div class="admin">
      <div
        class="app-menu"
        :style="{ width: headerNavRef?.isCollapse || isCollapse ? '65px' : '200px' }"
      >
        <Menu
          :isCollapse="headerNavRef?.isCollapse || isCollapse"
          :menuArr="shipManagementMenu"
        ></Menu>
      </div>
      <Map v-if="MapIsShow"></Map>

      <div class="app-wrapper">
        <Breadcrumb backPath="/shipManagement"></Breadcrumb>
        <div class="app-router">
          <RouterView></RouterView>
        </div>
      </div>
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
    display: flex;
    .app-menu {
      width: 200px;
      height: 100vh;
      transition: all 0.6s;
      overflow: hidden;
      z-index: 1;
    }
    .app-wrapper {
      position: relative;
      flex: 1;
      pointer-events: none;
      height: 100%;
      z-index: 2;
      .app-router {
        position: absolute;
        top: 45px;
        left: 0;
        right: 0;
        bottom: 0;
      }
    }
  }
}
</style>
