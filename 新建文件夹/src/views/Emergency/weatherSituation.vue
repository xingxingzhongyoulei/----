<script setup></script>

<template>
  <div class="weather-wrapper">
    <div class="weather-title">今日天气情况</div>
    <div class="weather-content">天气情况</div>
  </div>
</template>

<style lang="scss" scoped>
.weather-wrapper {
  position: absolute;
  left: 30px;
  top: 150px;
  width: 300px;
  background-color: rgba($color: #081a37, $alpha: 0.8);
}
.weather-title {
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
.weather-content {
  min-height: 250px;
}
</style>
