<script setup></script>

<template>
  <div class="dynamics-wrapper">
    <div class="dynamics-title">紧急事件动态</div>
    <div class="dynamics-content">事件</div>
  </div>
</template>

<style lang="scss" scoped>
.dynamics-wrapper {
  position: absolute;
  left: 30px;
  bottom: 20px;
  width: 300px;
  background-color: rgba($color: #081a37, $alpha: 0.8);
}
.dynamics-title {
  padding-left: 30px;
  font-size: 20px;
  line-height: 50px;
  font-style: italic;
  text-align: left;
  color: white;
  background-image: url('@/assets/img/common/title/icon-title-background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.dynamics-content {
  min-height: 350px;
}
</style>
