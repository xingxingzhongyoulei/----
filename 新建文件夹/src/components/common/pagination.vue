<script setup>
import { ref, reactive, watch } from 'vue'
const emits = defineEmits(['handlePaginationChange'])
const props = defineProps({
  paginationOpt: {
    type: Object,
    default: () => {
      return {
        current: 1,
        size: 10
      }
    }
  },
  total: {
    type: Number,
    default: 0
  }
})
const paginationOpt = props.paginationOpt
// 监听paginationOpt的变化
// watch(
//   () => paginationOpt,
//   (nweVal) => {
//     console.log(nweVal)
//   },
//   {
//     immediate: true
//   }
// )
// size发生变化
function handleSizeChange(val) {
  emits('handlePaginationChange', 'size', val)
}
// currentPage发生变化
function handleCurrentChange(val) {
  emits('handlePaginationChange', 'current', val)
}
</script>

<template>
  <div class="pagination-wrapper">
    <el-pagination
      :current-page="paginationOpt.current"
      :page-size="paginationOpt.size"
      :page-sizes="[10, 15, 20]"
      size="default"
      layout="total, sizes, prev, pager, next, jumper"
      :total="props.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.pagination-wrapper {
  position: absolute;
  left: 50%;
  bottom: 3%;
  transform: translateX(-50%);
}
</style>
