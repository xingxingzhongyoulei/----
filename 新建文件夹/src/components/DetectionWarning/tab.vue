<script setup>
import { ref, reactive, onMounted } from 'vue'
import Table from '../common/table.vue'
import { request } from '@/utils/axios'
const props = defineProps({
  tabsData: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const tabFirst = ref(props.tabsData[0].name)

// tab改变时触发
function handleClick(tab) {
  switch (tab) {
    case '船舶类型标注':
      queryTableData('船舶类型标注')
      break
    case '船舶信息':
      queryTableData('船舶信息')
      break
    default:
      break
  }
}
const column = [
  {
    prop: 'shipName',
    label: '船名',
    width: 100
  },
  {
    prop: 'shipLength',
    label: '船东',
    width: 100
  },
  {
    prop: 'shipType',
    label: '船舶类型',
    width: 100
  },
  {
    prop: 'isOnline',
    label: '是否在线',
    width: 120
  },
  {
    prop: 'cmdType',
    label: '设备类型',
    width: 180
  },
  {
    prop: 'phone',
    label: '联系电话',
    width: 180
  },
  {
    prop: 'portName',
    label: '所属渔港',
    width: 180
  }
]

const columnAn = [
  {
    prop: 'shipName',
    label: '船名',
    width: 100
  },
  {
    prop: 'shipLength',
    label: '船东',
    width: 100
  },
  {
    prop: 'cmdType',
    label: '设备类型',
    width: 100
  },
  {
    prop: 'phone',
    label: '联系电话',
    width: 180
  },
  {
    prop: 'portName',
    label: '所属渔港',
    width: 180
  },
  {
    prop: 'startTime',
    label: '最后定位时间',
    width: 180
  }
]
const control = [
  {
    type: 'danger',
    label: '删除',
    size: 'default'
  }
]
const controlAn = [
  {
    type: 'primary',
    label: '标注',
    size: 'default'
  }
]
const tableData = ref([])
const tableColumn = ref([])
const tableControl = ref([])
const optionsType = ref('')
const shipTypeSelect = ref('')
const optionsTypes = ['乡镇船', '在册船', '捕捞船']
// 请求table数据
async function queryTableData(type = '船舶信息') {
  let url = type === '船舶信息' ? '/shipInfoAnnotation' : '/shipAnnotation'
  tableColumn.value = type === '船舶信息' ? column : columnAn
  tableControl.value = type === '船舶信息' ? control : controlAn
  const res = await request.get(url)
  tableData.value = res.data
}
function handleClickTable(type, e) {
  switch (type) {
    case '删除':
      tableData.value = tableData.value.filter((item) => {
        return item.shipName !== e.shipName
      })
      break
    case '标注':
      handleMarked(e)
      break

    default:
      break
  }
}
const isShowMarker = ref(false)
const MarkerShipName = ref('')
// 点击标注
const markerInfo = ref({})
function handleMarked(val) {
  isShowMarker.value = true
  console.log(val)
  markerInfo.value = val
  MarkerShipName.value = val.shipName
}
function handleMarkerAdd() {
  markerInfo.value.shipType = shipTypeSelect.value
  tableData.value.unshift(markerInfo.value)
  isShowMarker.value = false
}

onMounted(() => {
  queryTableData()
})
</script>

<template>
  <div class="tab-wrapper">
    <el-tabs type="border-card" @tab-change="handleClick" v-model="tabFirst">
      <el-tab-pane
        v-for="item in props.tabsData"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      >
        <Table
          :isShowSelect="true"
          :column="tableColumn"
          :control="tableControl"
          :data="tableData"
          :height="400"
          @handleClick="handleClickTable"
        ></Table>
      </el-tab-pane>
    </el-tabs>
  </div>
  <div class="marker-warp" v-if="isShowMarker">
    <div class="marker-warp-header">
      <div class="header-title">船舶类型标注</div>
      <div class="header-close" style="cursor: pointer" @click="isShowMarker = false">
        <el-icon><Close /></el-icon>
      </div>
    </div>
    <div class="marker-warp-content">
      <div class="marker-warp-content-item">
        船舶名称:
        <el-input :value="MarkerShipName" style="width: 150px" disabled />
      </div>
      <div class="marker-warp-content-item">
        船舶类型:
        <el-select v-model="shipTypeSelect" placeholder="请选择" style="width: 150px">
          <el-option v-for="item in optionsTypes" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="marker-warp-content-item">
        <span style="display: inline-block; width: 74px">备注:</span>

        <el-input style="width: 150px" :rows="2" type="textarea" />
      </div>
    </div>
    <div class="marker-warp-footer" @click="handleMarkerAdd">
      <el-button type="primary">确定</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tab-wrapper {
  width: 100%;
  overflow: auto;
}
.marker-warp {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 300px;
  border-radius: 10px;
  background-color: rgb(247, 247, 247);
  pointer-events: all;
  z-index: 1;
  padding: 10px 15px;
  border: 1px solid skyblue;
  box-shadow: 2px 2px 2px rgb(201, 219, 226);
  .marker-warp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    font-size: 20px;
    border-bottom: 1px solid black;
  }
  .marker-warp-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .marker-warp-content-item {
      margin-top: 20px;
    }
  }
  .marker-warp-footer {
    margin-top: 20px;
  }
}
</style>
