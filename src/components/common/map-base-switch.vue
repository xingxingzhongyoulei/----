<script setup>
import { ref, reactive } from 'vue'
const list = [
  {
    active: '',
    event: 'switch-base',
    index: 4, // 为保证当前为首页图层，提高优先级
    label: '地图',
    name: 'vector',
    src: '@/assets/img/map/legend/icon-vector.png'
  },
  {
    active: '',
    color: 'rgba(0, 187, 255, .6)',
    event: 'switch-base',
    index: 3,
    label: '海图',
    name: 'sea',
    src: '@/assets/img/map/legend/icon-sea.png'
  },
  {
    active: 'active',
    color: 'rgba(22, 127, 255, .6)',
    event: 'switch-base',
    index: 2,
    label: '遥感',
    name: 'image',
    src: '@/assets/img/map/legend/icon-image.png'
  },
  {
    active: '',
    color: 'rgba(0, 63, 151, .6)',
    event: 'switch-base',
    index: 1,
    label: '深色',
    name: 'dark',
    src: '@/assets/img/map/legend/icon-dark.png'
  }
]
const imgExpand = ref(true)
</script>

<template>
  <div class="base-wrapper">
    <img src="@/assets/img/map/legend/icon-image.png" />
    <div class="img-group" v-if="imgExpand">
      <img v-for="(item, index) in list" :key="index" :src="item.src" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-wrapper {
  position: absolute;
  right: 10%;
  bottom: 2%;
  display: flex;
  img {
    width: 50px;
    height: 50px;
  }
}
.img-group {
  width: 300px;
  height: 100px;
}
</style>
