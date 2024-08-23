<template>
  <div class="sidebar-container">
    <IdleComponent></IdleComponent>
    <StandbyComponent></StandbyComponent>
    <TroubleComponent></TroubleComponent>
  </div>
</template>
<script setup>
import IdleComponent from './idle/index.vue'
import StandbyComponent from './standby/index.vue'
import TroubleComponent from './trouble/index.vue'
</script>

<style lang="scss" scoped>
.sidebar-container {
  position: absolute;
  top: 20px;
  right: 10px;
  bottom: 25px;
  width: 468px;
  padding: 50px 5px 0 0;
  background-image: url('@/assets/img/trawler/right-background.png');
  background-size: 100% 100%;
}
</style>
