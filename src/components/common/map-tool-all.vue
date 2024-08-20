<script setup>
import { ref, reactive } from 'vue'
const emits = defineEmits(['handleToolClick'])
const iconArr = [
  {
    event: 'zoom-in',
    icon: 'icon-fangda',
    label: '放大'
  },
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
  }
]
const activeIcon = ref('')
function handleClick(val) {
  activeIcon.value = activeIcon.value == val ? '' : val
  if (activeIcon.value != '') {
    emits('handleToolClick', val)
  }
}
</script>

<template>
  <div class="tool-wrapper">
    <div
      v-for="item in iconArr"
      :key="item.icon"
      :class="[
        'tool-item',
        'iconfont',
        item.icon,
        { active: activeIcon == item.event ? true : false }
      ]"
      @click="handleClick(item.event)"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.tool-wrapper {
  position: absolute;
  width: 40px;
  top: 50%;
  right: 2%;
  .tool-item {
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    margin-top: 10px;
    background-color: #ffffff;
    font-size: 20px;
    border-radius: 10px;
    cursor: pointer;

    &.active {
      background-color: #167fff;
    }
  }
}
</style>
