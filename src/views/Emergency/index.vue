<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="emergency-wrapper">
    <RouterView name="header"></RouterView>
    <RouterView name="main"></RouterView>
    <RouterView name="leftTop"></RouterView>
    <RouterView name="leftBottom"></RouterView>
  </div>
</template>

<style lang="scss" scoped>
.emergency-wrapper {
  width: 100vw;
  height: calc(100vh - 80px);
  overflow: hidden;
}
</style>
