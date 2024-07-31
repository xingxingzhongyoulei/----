<script setup></script>

<template>
  <div class="force-wrapper">
    <div class="force-title">应急救援力量</div>
    <div class="force-content">
      <div class="force-item-title">
        <div class="force-title-item">
          周边船只<span style="color: aqua">{{ 0 }}</span
          >条
        </div>
        <div class="force-title-item">
          周边视频<span style="color: aqua">{{ 0 }}</span
          >个
        </div>
      </div>
      <div class="forc-content-list-title">
        <div class="index">序号</div>
        <div class="shipNumber">船牌号</div>
        <div>号码</div>
      </div>
      <div class="force-content-list">
        <div class="index">1</div>
        <div class="shipNumber">A123456</div>
        <div>132456789</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.force-wrapper {
  position: absolute;
  right: 30px;
  top: 150px;
  width: 300px;
  background-color: rgba($color: #081a37, $alpha: 0.8);
}
.force-title {
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
.force-content {
  min-height: 250px;
  color: white;
  .force-item-title {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 16px;
    color: white;
  }
  .forc-content-list-title {
    display: flex;
    margin-top: 20px;
  }
  .force-content-list {
    display: flex;
    margin-top: 10px;
  }
  .index {
    width: 40px;
    margin-left: 10px;
  }
  .shipNumber {
    min-width: 70px;
    text-align: center;
    margin-left: 10px;
    margin-right: 20px;
  }
}
</style>
