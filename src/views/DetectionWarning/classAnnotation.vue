<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import Tab from '@/components/DetectionWarning/tab.vue'
import { Label } from 'maptalks'

const isShowAnnotation = ref(true)
const router = useRouter()
function close() {
  isShowAnnotation.value = false
  router.push('/detectionWarning')
}
const tabsData = [
  {
    label: '船舶信息',
    name: '船舶信息'
  },
  {
    label: '船舶类型标注',
    name: '船舶类型标注'
  }
]
</script>

<template>
  <div class="annotation-wrapper" v-if="isShowAnnotation">
    <div class="annotation-header">
      <div class="annotation-header-title">船舶分类标注</div>
      <div class="annotation-header-close" @click="close" style="cursor: pointer">
        <el-icon><Close /></el-icon>
      </div>
    </div>
    <div class="tab-wrapper">
      <Tab :tabsData="tabsData"></Tab>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.annotation-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 500px;
  pointer-events: all;
  background-color: white;
  padding: 20px 15px;
  .annotation-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    line-height: 20px;
    .annotation-header-close {
      text-align: center;
      line-height: 20px;
      font-size: 20px;
    }
  }
  .tab-wrapper {
    margin-top: 20px;
    height: 500px;
    width: 900px;
  }
}
</style>
