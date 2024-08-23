<script setup>
/**
 * form表单组件
 * @param {Array} formItems 表单项
 * 例如：[
 * {
 * label: '船名',
 * prop: 'shipName',
 * type: 'input',
 * placeholder: '请输入船名'
 * },
 * {
 * .......
 * }
 * ]
 * @param {Object} formModel 表单数据
 * 例如：{
 * shipName: '',
 * shipLength: '',
 * phone: '',
 * startTime: '',
 * cmdType: '',
 * portTypes: ''
 * }
 * @param {Array} control 表单控制按钮
 * @example
 * <Form :formItems="formItems" :formModel="formModel" />
 * @return {Object} formModel 表单数据
 */
import { onMounted, reactive, ref } from 'vue'

const props = defineProps({
  formItems: {
    type: Array,
    default: [],
    required: true
  },
  formModel: {
    type: Object,
    default: {},
    required: true
  }
})
const formItems = ref([])
const model = ref({})
const emits = defineEmits(['handle'])

function handleClick(prop) {
  // console.log(prop)
  // console.log(model.value)
  emits('handle', prop, model.value)
}
onMounted(() => {
  formItems.value = Object.assign([], props.formItems)
  model.value = Object.assign({}, props.formModel)
})
</script>
<template>
  <div class="form-wrapper">
    <el-form :inline="true" :model="model" class="demo-form-inline form">
      <el-form-item v-for="(item, index) in formItems" :key="index" :label="item.label">
        <el-input
          v-if="item.type === 'input'"
          v-model="model[item.prop]"
          :placeholder="item.placeholder || ''"
          clearable
          style="width: 180px"
        />

        <el-select
          v-if="item.type === 'select'"
          v-model="model[item.prop]"
          :placeholder="item.placeholder || ''"
          style="width: 190px"
        >
          <el-option
            v-for="obj in item.options"
            :key="obj.value"
            :label="obj.label"
            :value="obj.value"
          />
        </el-select>

        <el-date-picker
          v-if="item.type === 'datetime'"
          v-model="model[item.prop]"
          type="datetimerange"
          range-separator="--"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />

        <el-button @click="handleClick(item.prop)" v-if="item.type === 'button'" type="primary">{{
          item.name
        }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  text-align: left;
  margin: 15px 0;
}
.form {
  display: flex;
  flex-wrap: wrap;
}
</style>
