<template>
  <div>
    <div class="title">船舶告警类型统计</div>
  </div>
</template>
<script setup></script>

<style lang="scss" scoped>
.title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-size: 50px;
  font-weight: 900;
  line-height: 60px;
  color: #3eaff4;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  z-index: 1;
  &::before {
    content: '';
    display: inline-block;
    width: 41px;
    height: 41px;
    margin-right: 20px;
    background-image: url('@/assets/img/common/title-prefix-icon.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  &::after {
    content: '';
    display: inline-block;
    width: 41px;
    height: 41px;
    margin-left: 20px;
    background-image: url('@/assets/img/common/title-prefix-icon.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
}
</style>
