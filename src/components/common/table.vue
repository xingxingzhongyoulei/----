<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: [],
    required: true
  },
  column: {
    type: Array,
    default: [],
    required: false
  },
  control: { type: Array, default: [], required: false },
  // 表格高度  固定列
  height:{
    type: Number,
    default: 530
  },
  // 是否显示序号列
  isShwoIndex:{
    type: Boolean,
    default: false
  },
  // 是否显示选择列
  isShowSelect:{
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['handleClick'])
function handleClick(e) {
  emits('handleClick', e)
}
function handleSelectionChange(val) {
  console.log(val)
}
</script>

<template>
  <div class="table-wrapper">
    <el-table
      :data="data"
      style="width: 100%"
      :height="height"
      v-loading="false"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 1)"
      cell-class-name="cellName"
       @selection-change="handleSelectionChange"
    >
      <el-table-column type="index" width="100" label="序号" align="center" v-if="isShwoIndex" />
      <el-table-column type="selection" width="55" v-if="isShowSelect"/>
      <el-table-column
        v-for="(item, index) in props.column"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      />
      <el-table-column fixed="right" label="操作" v-if="props.control.length" >
        <template #default="scope">
          <template v-for="(item, index) in props.control" :key="index"">
            <el-button :type="item.type||primary" :size="item.size||middle" @click="handleClick(scope.row)"> {{item.label}} </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss" scoped>
.table-wrapper {
  width: 100%;
  :deep(.el-table) {
    .cellName {
      font-size: 15px;
    }
  }
  :deep(.el-table__row td){
    height: 30px;
  }
}
:deep(.el-table__header){
  width: 100%;
}
</style>
