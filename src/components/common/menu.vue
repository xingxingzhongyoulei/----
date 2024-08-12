<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { shipManagementMenu } from './menu'
const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  },
  menuArr: {
    type: Array,
    default: []
  }
})
const route = useRoute()
</script>

<template>
  <div class="menu-wrapper">
    <div class="menu-list">
      <el-menu
        :default-active="route.path"
        class="el-menu-vertical-demo"
        :collapse="props.isCollapse"
        router
        unique-opened
      >
        <template v-for="(item, index) in props.menuArr" :key="index">
          <el-sub-menu :index="item.index">
            <template #title>
              <el-icon>
                <component :is="item.icon" />
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="(obj, i) in item.children" :key="i">
              <el-menu-item :index="obj.index">{{ obj.title }}</el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
  background-color: rgb(243, 248, 252);
}
.el-menu--collapse {
  height: 100vh;
}
</style>
<style lang="scss" scoped>
.menu-wrapper {
  .menu-list {
    width: 100%;
  }
}
:deep(.el-menu) {
  border: 0;
}
</style>
