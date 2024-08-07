<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false
  }
})
// onMounted(() => {
//   console.log(props.isCollapse)
// })
</script>

<template>
  <div class="menu-wrapper">
    <div class="menu-list">
      <el-menu
        default-active="/shipManagement"
        class="el-menu-vertical-demo"
        :collapse="props.isCollapse"
        router
      >
        <el-sub-menu index="/shipManagement">
          <template #title>
            <el-icon><List /></el-icon>
            <span>进出港统计</span>
          </template>
          <el-menu-item index="/shipManagement/DepartureApplication">出港申请</el-menu-item>
          <el-menu-item index="1-2">进出港记录</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="2">
          <el-icon><CollectionTag /></el-icon>
          <template #title>其他功能</template>
        </el-menu-item>
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
  transform: all 0.5s linear;

  .menu-list {
    width: 100%;
    transform: all 0.5s linear;
  }
}
:deep(.el-menu) {
  border: 0;
}
</style>
