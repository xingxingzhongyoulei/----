<script setup>
import GoBack from './goBack.vue'
</script>

<template>
  <div class="header">
    <div class="header-wrapper">渔港应急指挥系统</div>
    <GoBack></GoBack>
  </div>
</template>

<style lang="scss" scoped>
.header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
.header-wrapper {
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: white;
  font-style: italic;
  line-height: 80px;
  font-size: 40px;
  text-shadow: 2px 2px 2px skyblue;
  font-weight: bold;
  background-image: url('@/assets/img/common/header/icon-header-background.png');
}
</style>
