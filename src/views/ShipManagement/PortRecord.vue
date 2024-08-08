<script setup>
import Table from '@/components/common/table.vue'
import { request } from '@/utils/axios'
import { onMounted, ref } from 'vue'
import Form from '@/components/common/form.vue'
const tableData = ref([])
const column = [
  {
    prop: 'shipName',
    label: '船名',
    width: 150
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
    prop: 'phone',
    label: '联系电话',
    width: 180
  },
  {
    prop: 'cmdType',
    label: '设备类型',
    width: 180
  },
  {
    prop: 'portTypes',
    label: '进出港类型',
    width: 180
  },
  {
    prop: 'startTime',
    label: '预计出港时间',
    width: 280
  }
]
const control = [
  {
    type: 'primary',
    label: '轨迹回放',
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
    label: '联系电话',
    prop: 'phone',
    type: 'input',
    placeholder: '请输入联系电话'
  },
  {
    label: '进出港时间',
    prop: 'startTime',
    type: 'datetime',
    placeholder: '进出港时间'
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
    label: '进出港类型',
    prop: 'portTypes',
    type: 'select',
    placeholder: '请选择进出港类型',
    options: [
      {
        label: '进港',
        value: '进港'
      },
      {
        label: '出港',
        value: '出港'
      }
    ]
  },
  {
    label: '港口名称',
    prop: 'portName',
    type: 'select',
    placeholder: '请选择进出港港口名称',
    options: [
      {
        label: '电建渔港01',
        value: '电建渔港01'
      },
      {
        label: '电建渔港02',
        value: '电建渔港02'
      },
      {
        label: '电建渔港03',
        value: '电建渔港03'
      },
      {
        label: '电建渔港04',
        value: '电建渔港04'
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
  phone: '',
  startTime: '',
  cmdType: '',
  portTypes: '',
  portName: ''
}
//表格点击事件
function handleClick(row) {
  console.log(row)
}
async function initTableData() {
  const res = await request.get('/ApplicationTabelData')
  tableData.value = res.data
}
// 表单触发事件
function handleForm(type, data) {
  switch (type) {
    case 'query':
      console.log('查询')
      break
    case 'export':
      console.log(tableData.value)
      expoertData(tableData.value)
      break
    default:
      break
  }
}

function expoertData(data) {
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  })
  const href = URL.createObjectURL(blob)
  const alink = document.createElement('a')
  alink.href = href
  alink.download = `123.xlsx`
  alink.target = '_blank'
  alink.click()
  alink.remove()
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
