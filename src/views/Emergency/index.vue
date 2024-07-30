<script setup>
import { RouterView } from 'vue-router'
import Map from '@/components/Emergency/map.vue'
</script>

<template>
  <div class="emergency-wrapper">
    <RouterView name="header"></RouterView>
    <Map></Map>
  </div>
</template>

<style lang="scss" scoped>
.emergency-wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
