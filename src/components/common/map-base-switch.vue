<template>
  <div
    :class="[{ 'expend-only': expend, active: expand.active }, expand.right, 'screen-map-server']"
    @mouseenter="moveEnter"
    @mouseleave="moveLeave"
  >
    <img
      alt="ICON_MAP"
      class="icon-cover"
      :src="getAssetsFile(`map/legend/icon-${list[active].name}-active.png`)"
    />

    <div
      v-for="(item, index) in list"
      class="screen-map-server-item"
      :key="index"
      :style="getStyle(item, index)"
      @click="toggle(item, index)"
    >
      <img
        v-if="(!expend && !index) || expend"
        alt="ICON_MAP"
        class="icon-map"
        :src="getAssetsFile(`map/legend/icon-${item.name}${active === index ? '-active' : ''}.png`)"
      />
    </div>
  </div>
</template>

<script setup>
import { getAssetsFile } from '@/utils/getAssetsFile'
import { ref, watch, onMounted } from 'vue'
const emits = defineEmits(['handle'])
const active = ref(2)
const expand = ref({
  active: '',
  right: ''
})
const expend = ref(false)
const list = ref([
  {
    active: '',
    event: 'switch-base',
    index: 4, // 为保证当前为首页图层，提高优先级
    label: '地图',
    name: 'vector'
  },
  {
    active: '',
    color: 'rgba(0, 187, 255, .6)',
    event: 'switch-base',
    index: 3,
    label: '海图',
    name: 'sea'
  },
  {
    active: 'active',
    color: 'rgba(22, 127, 255, .6)',
    event: 'switch-base',
    index: 2,
    label: '遥感',
    name: 'image'
  },
  {
    active: '',
    color: 'rgba(0, 63, 151, .6)',
    event: 'switch-base',
    index: 1,
    label: '深色',
    name: 'dark'
  }
])

function getStyle(e, index) {
  return {
    'background-color': !this.expend && e.color ? e.color : 'transparent', // 未展开样式
    'border-radius': this.expend ? '0px' : '5px', // 未展开样式
    right: this.expend ? `${index * 40 + (index + 1) * 4}px` : `${(index + 1) * 4}px`,
    'transition-duration': `${index * 0.2}s`,
    'z-index': e.index
  }
}

function moveEnter() {
  expend.value = true
}

function moveLeave() {
  expend.value = false
}

function toggle(e, index) {
  active.value = index
  emits('handle', 'switch-base', e.name, index)
}
</script>

<style scoped>
.screen-map-server {
  background-color: transparent;
  cursor: pointer;
  border-radius: 5px;
  bottom: 28px;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  padding-bottom: 4px;
  padding-left: 4px;
  padding-right: 4px;
  padding-top: 4px;
  position: fixed;
  right: 7%;
  transition-duration: 0.3s;
  z-index: 10;
}
.screen-map-server.expend-only {
  height: 48px;
  width: 180px;
}
.screen-map-server.active {
  right: 433px;
  transition-duration: 0.3s;
}
.screen-map-server.expend {
  right: 30px !important;
  transition-duration: 0.3s;
}
.screen-map-server.expend-left {
  right: 420px !important;
  transition-duration: 0.3s;
}
.screen-map-server:hover {
  background-color: rgba(22, 127, 255, 0.6);
}
/* COVER */
.icon-cover {
  display: block;
  position: absolute;
  right: 4px;
  top: 4px;
  z-index: 9;
}
.screen-map-server:hover .icon-cover {
  display: none;
}
/* ITEM */
.screen-map-server-item {
  border-radius: 0;
  height: 40px;
  position: absolute;
  top: 4px;
  width: 40px;
  z-index: 1;
}
.screen-map-server-item .icon-map {
  height: 100%;
  width: 100%;
}
</style>
