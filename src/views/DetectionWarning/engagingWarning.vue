<script setup>
import Table from '@/components/common/table.vue'
import { request } from '@/utils/axios'
import { onMounted, ref } from 'vue'
import Form from '@/components/common/form.vue'
import { exportToExcel } from '@/utils/common'
import Pagination from '@/components/common/pagination.vue'
import Drawer from '@/components/common/Drawer.vue'

const tableData = ref([])
const column = [
  {
    prop: 'shipName',
    label: '船名',
    width: 180
  },
  {
    prop: 'shipLength',
    label: '船长',
    width: 180
  },
  {
    prop: 'portName',
    label: '渔港名称',
    width: 180
  },
  {
    prop: 'cmdType',
    label: '设备类型',
    width: 180
  },
  {
    prop: 'startTime',
    label: '搭靠时间',
    width: 280
  }
]
const control = [
  {
    type: 'primary',
    label: '查看',
    size: 'default'
  }
]
// 表单项的显示
const formItems = [
  {
    label: '船名',
    prop: 'shipName',
    type: 'input',
    placeholder: '请输入船名'
  },
  {
    label: '船长',
    prop: 'shipLength',
    type: 'input',
    placeholder: '请输入船长'
  },
  {
    label: '搭靠时间',
    prop: 'startTime',
    type: 'datetime',
    placeholder: ''
  },
  {
    label: '设备类型',
    prop: 'cmdType',
    type: 'select',
    placeholder: '请选择设备类型',
    options: [
      {
        label: 'AIS',
        value: 'AIS'
      },
      {
        label: '北斗',
        value: '北斗'
      },
      {
        label: 'GPS',
        value: 'GPS'
      }
    ]
  },
  {
    name: '查询',
    prop: 'query',
    type: 'button'
  },
  {
    name: '导出',
    prop: 'export',
    type: 'button'
  }
]
// 表单项绑定的值
const formModel = {
  shipName: '',
  shipLength: '',
  startTime: '',
  cmdType: ''
}
const drawerData = ref({
  shipName: '',
  shipOwner: '',
  portName: '',
  phone: '',
  cmdType: '',
  portTypes: '',
  startTime: ''
})
const drawerRef = ref(null)
//表格点击事件
function handleClick(row) {
  drawerData.value = row
  drawerRef?.value.showDrawer()
}
const paginationOpt = ref({
  current: 1,
  size: 10
})
const pageTotal = ref(0)
async function initTableData() {
  const res = await request.get('/ApplicationTabelData', {
    data: {
      ...paginationOpt.value
    }
  })

  tableData.value = res.data
  pageTotal.value = res.total
}
async function queryTableData(val) {
  const res = await request.get('/queryTableData', {
    data: {
      ...val
    }
  })
  tableData.value = [res]
  pageTotal.value = res.total
} // 表单触发事件
function handleForm(type, data) {
  switch (type) {
    case 'query':
      queryTableData(data)
      break
    case 'export':
      exportToExcel(
        tableData.value,
        {
          船名: 'shipName',
          船主: 'shipOwner',
          渔港名称: 'portName',
          联系方式: 'phone',
          终端类型: 'cmdType',
          进港类型: 'portTypes',
          进港时间: 'startTime'
        },
        '进港警告船只数据'
      )

      break
    default:
      break
  }
}

// 监听分页器current、size变化
function handlePaginationChange(type, val) {
  console.log(type)
  console.log(val)
  switch (type) {
    case 'current':
      paginationOpt.value.current = val
      initTableData()
      break
    case 'size':
      paginationOpt.value.size = val
      initTableData()
      break
    default:
      break
  }
}
onMounted(() => {
  initTableData()
})
</script>

<template>
  <div class="application-wrapper">
    <div class="form-wrapper">
      <Form :formModel="formModel" :formItems="formItems" @handle="handleForm"></Form>
    </div>
    <div class="table-wrapper">
      <Table
        :data="tableData"
        :column="column"
        @handleClick="handleClick"
        size="large"
        :control="control"
      ></Table>
    </div>
    <Pagination
      @handlePaginationChange="handlePaginationChange"
      :paginationOpt="paginationOpt"
      :total="pageTotal"
    ></Pagination>
    <Drawer ref="drawerRef" :drawerData="drawerData"></Drawer>
  </div>
</template>

<style lang="scss" scoped>
.application-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  // transform: translateX(-50%);
  width: 100%;
  height: 100%;
  line-height: 100px;
  color: black;
  font-size: 20px;
  overflow: hidden;
  padding: 0 80px;
  background-color: #f4f5f7;
  pointer-events: auto;
  .table-wrapper {
    width: auto;
  }
}
</style>
