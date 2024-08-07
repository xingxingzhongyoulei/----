<script setup>
import { ref } from 'vue'

// icon的切换
const isCollapse = ref(false)
function IconClick() {
  isCollapse.value = !isCollapse.value
}
defineExpose({
  isCollapse
})
</script>

<template>
  <div class="header-nav-wrapper">
    <el-icon :size="25" style="margin: 0 20px" @click="IconClick"
      ><Expand v-if="isCollapse" /> <Fold v-else />
    </el-icon>

    <div class="header-nav-title">船舶管理功能</div>
  </div>
</template>

<style lang="scss" scoped>
.header-nav-wrapper {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 50px;
  background-color: #0052d9;
  color: white;
  display: flex;
  align-items: center;
  .header-nav-title {
    height: 50px;
    line-height: 50px;
    font-size: 25px;
  }
}
</style>
