<template>
  <div class="sidebar-container">
    <DeviceComponent></DeviceComponent>
    <analyseComponent></analyseComponent>
    <statusComponent></statusComponent>
  </div>
</template>
<script setup>
import DeviceComponent from './device/index.vue'
import analyseComponent from './analyse/index.vue'
import statusComponent from './status/index.vue'
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: absolute;
  top: 20px;
  left: 10px;
  bottom: 25px;
  width: 468px;
  padding: 50px 0 0 5px;
  background-image: url('@/assets/img/trawler/left-background.png');
  background-size: 100% 100%;
  box-sizing: border-box;
}
</style>
