<script setup>
import { ref, reactive } from 'vue'
const emits = defineEmits(['handleToolClick'])
const iconArr = [
  {
    event: 'zoom-out',
    icon: 'icon-suoxiao',
    label: '缩小'
  },
  {
    event: 'reset',
    icon: 'icon-fuwei',
    label: '复位'
  },
  {
    event: 'ranging',
    icon: 'icon-ceju',
    label: '测距'
  },
  {
    event: 'zoom-in',
    icon: 'icon-fangda',
    label: '放大'
  }
]
const activeIcon = ref('')
function handleClick(val) {
  if (val == 'zoom-in' || val == 'zoom-out') {
    return emits('handleToolClick', val, '')
  }

  activeIcon.value = activeIcon.value == val ? '' : val
  if (activeIcon.value != '') {
    emits('handleToolClick', val, open)
  } else {
    emits('handleToolClick', val, close)
  }
}
</script>

<template>
  <div class="tool-wrapper">
    <div
      v-for="item in iconArr"
      :key="item.icon"
      :class="['tool-item']"
      @click="handleClick(item.event)"
    >
      <div
        :class="[
          'iconfont',
          item.icon,
          { active: activeIcon == item.event ? true : false },
          'icon-item'
        ]"
      ></div>
      <div class="tool-tip">{{ item.label }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tool-wrapper {
  position: absolute;
  width: 40px;
  top: 50%;
  right: 2%;
  .tool-item {
    position: absolute;
    top: 0;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-top: 10px;
    background-color: #ffffff;
    font-size: 20px;
    border-radius: 10px;
    cursor: pointer;
    &:nth-child(1) {
      top: 60px;
    }
    &:nth-child(2) {
      top: 120px;
    }
    &:nth-child(3) {
      top: 180px;
    }

    .tool-tip {
      opacity: 0;
      position: absolute;
      left: 0px;
      top: 5px;
      transform: translateX(-50%);
      width: 70px;
      height: 30px;
      line-height: 30px;
      font-size: 15px;
      background-color: #fff;
      border-radius: 15px;
      transition: all 0.5s ease;
    }
    &:hover .tool-tip {
      opacity: 1;
      transform: translateX(-80px);
    }
    & .active {
      color: #f0e003;
      background-color: #4294f8;
      position: relative;
      border-radius: 10px;
    }
   
  }
}
</style>
