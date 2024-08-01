<script setup>
import { ref, reactive, onMounted } from 'vue'
const tabLabel = ['海警机构', '‌港务监督', '‌交通运输部', '‌渔业行政主管部门', '其他部门']
import { Iphone, Location, OfficeBuilding, Tickets, User } from '@element-plus/icons-vue'
import { request } from '@/utils/axios'
import { showMessage } from '@/utils/Elements'
const tableDesc = ref([])
const activeIndex = ref(0)
const emit = defineEmits(['close'])
async function initInform() {
  const res = await request('MapInformData')
  tableDesc.value = res.data
}
async function handleClick(e) {
  activeIndex.value = e
  const res = await request('MapInformData')
  tableDesc.value = res.data
}
function handleClose() {
  emit('close')
}
function informMsg() {
  showMessage('暂未开发', 'warning')
}
onMounted(() => {
  initInform()
})
</script>

<template>
  <div class="tree-wrapper">
    <div class="tree-header">预警通知</div>
    <div class="tree-content">
      <!-- 二级列表 -->
      <el-tabs
        tab-position="left"
        style="min-height: 200px"
        class="demo-tabs"
        @tab-change="handleClick"
      >
        <el-tab-pane v-for="(item, index) in tabLabel" :label="item" :key="index">
          <el-descriptions
            class="margin-top"
            :column="4"
            border
            v-for="(item, index) in tableDesc"
            :key="index"
          >
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <user />
                  </el-icon>
                  姓名
                </div>
              </template>
              {{ item.name }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <iphone />
                  </el-icon>
                  电话
                </div>
              </template>
              {{ item.phone }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <div class="cell-item">
                  <el-icon>
                    <location />
                  </el-icon>
                  部门
                </div>
              </template>
              {{ tabLabel[activeIndex] }}
            </el-descriptions-item>
            <el-descriptions-item>
              <el-button type="primary" @click="informMsg">短信通知</el-button>
            </el-descriptions-item>
          </el-descriptions>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="close">
      <el-button type="primary" @click="handleClose" size="large">关闭</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tree-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  background-color: rgba($color: #76a6d3, $alpha: 0.8);
}
.tree-header {
  width: 100%;
  height: 40px;
  color: black;
  line-height: 40px;
  font-size: 20px;
}
:deep(.el-tabs__item) {
  font-size: 18px;
  color: rgb(60, 91, 183);
}
:deep(.el-tabs__content) {
  min-width: 700px;
  overflow-y: auto;
}
.tree-content {
  margin-top: 10px;
}
// :deep(.el-descriptions__cell) {
// //   width: 45px;
//   padding-right: 0;
// }
.close {
  margin-top: 30px;
  margin-bottom: 10px;
}
</style>
