<script setup>
import { ref, reactive } from 'vue'
</script>

<template>
  <div class="tree-wrapper">
    <div class="tree-header">人员通知</div>
  </div>
</template>

<style lang="scss" scoped>
.tree-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
}
.tree-header {
  width: 100%;
  height: 40px;
  color: red;
}
</style>
