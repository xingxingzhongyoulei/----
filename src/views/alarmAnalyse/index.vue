<template>
  <div class="container-wrapper">
    <Map></Map>
    <!-- <RouterView></RouterView> -->
    <RouterView name="header"></RouterView>
    <RouterView name="left"></RouterView>
    <RouterView name="right"></RouterView>

    <!-- <ContainerComponent></ContainerComponent> -->
    <div class="container-bg"></div>
  </div>
</template>
<script setup>
import Map from '@/views/alarmAnalyse/layout/Map/index.vue'
import { RouterView } from 'vue-router'
</script>

<style scoped lang="scss">
.container-wrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .container-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url('@/assets/img/alarmAnalyse/icon-background-none.png');
    pointer-events: none;
    z-index: 0;
  }
}
</style>
