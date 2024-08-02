<script lang="ts" setup>
import { useReportStore } from '@/stores'
const reportStore = useReportStore()

import { ref } from 'vue'

const form = ref({
  alarmMsg: '',
  shipName: '',
  name: '',
  phone: '',
  time: new Date().toLocaleString(),
  alarmDes: '',
  cmd: '',
  type: '',
  resource: '手动添加'
})

const onSubmit = () => {
  reportStore.addAccident(form.value)
  formRef.value.resetFields()
  emit('cancle')
}
const emit = defineEmits(['cancle'])
const cmdOptions = ['AIS', '北斗']
const typeOptions = ['乡镇船', '在册船']
const formRef = ref()
function onCLice() {
  formRef.value.resetFields()

  emit('cancle')
}
</script>
<template>
  <div class="form-wrapper">
    <el-form :model="form" label-width="auto" style="min-width: 500px" ref="formRef">
      <el-form-item label="船牌号">
        <el-input v-model="form.shipName" />
      </el-form-item>
      <el-form-item label="事故类型">
        <el-input v-model="form.alarmMsg" />
      </el-form-item>
      <el-form-item label="船主">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="发生时间" disabled>
        <el-input v-model="form.time" :value="form.time" disabled />
      </el-form-item>
      <el-form-item label="终端类型">
        <el-select
          v-model="form.cmd"
          placeholder="请选择终端类型"
          size="large"
          style="width: 240px"
        >
          <el-option v-for="item in cmdOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="船的类型">
        <el-select
          v-model="form.type"
          placeholder="请选择船的类型"
          size="large"
          style="width: 240px"
        >
          <el-option v-for="item in typeOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="事故描述">
        <el-input v-model="form.alarmDes" type="textarea" />
      </el-form-item>
    </el-form>
    <div class="button-bottom">
      <el-button @click="onCLice">取消</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: #011033;
  color: white;
  transform: translate(-50%, -50%);
  padding: 30px;
}
:deep(.el-form-item__label) {
  color: white;
}
:deep(.el-input__inner) {
  background-color: #092a63;
  color: white;
}
:deep(.el-input__wrapper) {
  background-color: #092a63;
  padding: 0;
}
:deep(.el-form-item__content) {
  text-align: center;
}
:deep(.el-textarea__inner) {
  background-color: #092a63;
}
:deep(.el-textarea__inner) {
  color: white;
}
</style>
