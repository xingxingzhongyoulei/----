<script setup>
import { ref } from 'vue'
const activeName = 'emergencyRescue'

defineProps({
  tabsItem: {
    type: Array,
    default: []
  }
})
const emit = defineEmits(['handleClick'])
const items = {
  emergencyRescue: ['应急救援', '烟火告警'],
  shipManagement: ['渔船进出港统计', '告警分析']
}
// 是否全部应用
const isTotalUse = ref(true)
function handleClick(obj) {
  emit('handleClick', obj)
}
</script>

<template>
  <div class="tabs-wrapper">
    <el-tabs v-if="isTotalUse" v-model="activeName" type="card" class="demo-tabs">
      <el-tab-pane v-for="item in tabsItem" :key="item.name" :label="item.label" :name="item.name">
        <div v-for="(obj, index) in items[item.name]" class="tab-item" @click="handleClick(obj)">
          {{ obj }}
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="tabs-bottom" @click="isTotalUse = !isTotalUse">
      全部应用
      <span
        class="total-icon"
        :style="{ transform: isTotalUse ? 'rotate(270deg)' : 'rotate(90deg)' }"
        >></span
      >
    </div>
    <div class="tabs-bottom-content" v-if="!isTotalUse">
      <template v-for="item in tabsItem" :key="item.name">
        <div class="tab-item-title">{{ item.label }}</div>
        <div v-for="(obj, index) in items[item.name]" class="tab-item">{{ obj }}</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tabs-wrapper {
  width: 100%;
  overflow: hidden;
  background-color: rgba($color: #259ddd, $alpha: 0.5);
  border-radius: 30px;
}
.tab-item {
  display: inline-block;
  margin: 20px;
  width: 120px;
  height: 120px;
  color: #fff;
  text-align: center;
  line-height: 120px;
  border-radius: 50%;
  background: linear-gradient(to right, rgb(116, 199, 241), rgb(6, 167, 242));
}
.tabs-bottom {
  cursor: pointer;
  width: 100%;
  text-align: center;
  color: rgb(13, 145, 246);
  font-size: large;
}
.total-icon {
  display: inline-block;
  transition: all 1s;
}
.tabs-bottom-content {
  text-align: center;
  margin-top: 30px;
}
.tab-item-title {
  display: block;
  width: 100px;
  margin: auto;
  border-bottom: 5px solid rgb(6, 165, 239);
}
</style>
