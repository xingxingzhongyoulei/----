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
  control: { type: Array, default: [], required: true }
})
const emits = defineEmits(['handleClick'])
function handleClick(e) {
  emits('handleClick', e)
}
</script>

<template>
  <div class="table-wrapper">
    <el-table
      :data="data"
      style="width: 100%"
      v-loading="false"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255, 255, 255, 1)"
      cell-class-name="cellName"
    >
      <el-table-column type="index" width="100" label="序号" align="center" />

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
</style>
