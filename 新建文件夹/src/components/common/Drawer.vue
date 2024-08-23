<script setup>
import { request } from '@/utils/axios'
import { ref, reactive, watch } from 'vue'
const drawer = ref(false)
const props = defineProps({
  drawerData: {
    type: Object,
    default: {}
  }
})
const data = ref({})
function showDrawer() {
  drawer.value = true
}
function cancelClick() {
  drawer.value = false
}
function confirmClick() {
  drawer.value = false
}
watch(
  () => props.drawerData,
  (newVal) => {
    if (!newVal.shipName) {
      return
    } else {
      getData(newVal)
    }
  },
  {
    immediate: true
  }
)
async function getData(val) {
  const res = await request('/getDrawerData', {
    data: {
      ...val
    }
  })
  console.log(res)
  data.value = res
}
defineExpose({
  showDrawer
})
</script>

<template>
  <div>
    <el-drawer v-model="drawer" direction="rtl">
      <template #default>
        <div class="info">船主信息</div>
        <div class="content">
          <div class="content-item">
            <div class="item">船舶名称：{{ data.shipName }}</div>
            <div class="item">船主姓名：{{ data.shipLength }}</div>
          </div>
          <div class="content-item">
            <div class="item">联系方式：{{ data.phone }}</div>
            <div class="item">进出港类型：{{ data.portTypes }}</div>
          </div>
          <div class="content-item">
            <div class="item">是否为失信人员：{{ data.untrustworthy || '--' }}</div>
          </div>

          <div class="info">船舶信息</div>
          <div class="content-item">
            <div class="item">船舶类型：{{ data.shipType }}</div>
            <div class="item">作业类型：{{ data.workType || '--' }}</div>
          </div>
          <div class="content-item">
            <div class="item">终端类型：{{ data.cmdType }}</div>
            <div class="item">{{ data.portTypes }}时间：{{ data.startTime }}</div>
          </div>
          <!-- 1111111111 -->
          <div class="content-item">
            <div class="item">捕捞许可证：{{ data.fishingLicense || '--' }}</div>
            <div class="item">船网工具编号：{{ data.shipTool || '--' }}</div>
          </div>
          <div class="content-item">
            <div class="item">渔船状态：{{ data.shipStatus || '--' }}</div>
            <div class="item">RFID登记情况：{{ data.RFIDStatus || '--' }}</div>
          </div>
          <div class="content-item">
            <div class="item">是否为三无船舶告警：{{ data.threeNo || '--' }}</div>
            <div class="item">RFID登记情况：{{ data.RFIDStatus || '--' }}</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="confirmClick">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.info {
  text-align: left;
  height: 70px;
  line-height: 70px;
  font-size: 25px;
  font-weight: bold;
}
.content {
  display: flex;
  flex-direction: column;
  .content-item {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: left;
    .item {
      flex: 1;
      height: 40px;
      line-height: 40px;
      font-size: 17px;
    }
  }
}
:deep(.el-drawer__body) {
  padding: 5px;
  padding-left: 20px;
}
</style>
