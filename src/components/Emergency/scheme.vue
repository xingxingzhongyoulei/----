<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Form from './form.vue'
const emit = defineEmits(['handleClick'])
const route = useRoute()
const router = useRouter()
const showButton = ref(route.query.id | 0)
const formShow = ref(true)
const options = ['成功', '失败']
function close() {
  if (route.path === '/processEvent') {
    emit('handleClick', false)
    router.push({
      path: '/emergency'
    })
  } else {
    emit('handleClick', false)
  }
}
console.log(route.query.id)
function handleChoose(num) {
  showButton.value = num
}
function cancle() {
  formShow.value = false
}
</script>

<template>
  <div class="scheme-wrapper">
    <div class="scheme-wrapper-title">应急预案管理</div>
    <div class="scheme-wrapper-content">
      <div class="scheme-wrapper-content-tabs" v-if="route.path === '/processEvent'">
        <div class="tabs-item" :class="{ active: showButton == 0 }">应急预案选择</div>
        <div class="tabs-item" :class="{ active: showButton == 1 }">处置过程</div>
        <div class="tabs-item" :class="{ active: showButton == 2 }">处置结果</div>
      </div>
      <div class="scheme-wrapper-content-item" v-if="showButton == 0">
        <div class="item-title">人员落水方案</div>
        <div class="item-text">1.事故上报</div>
        <div class="item-text">2.救援分析</div>
        <div class="item-text">3.人员调度</div>
        <div class="item-text" v-if="route.path === '/processEvent'" @click="handleChoose(1)">
          <el-button>选择预案</el-button>
        </div>
      </div>
      <div class="scheme-wrapper-content-item" v-if="showButton == 1">
        <div class="form-wrapper">
          <el-form label-width="auto" style="max-width: 600px">
            <el-form-item label="船主">
              <el-input />
            </el-form-item>
            <el-form-item label="船牌号">
              <el-input />
            </el-form-item>
            <el-form-item label="船主电话">
              <el-input />
            </el-form-item>
            <el-form-item label="救援部门">
              <el-input />
            </el-form-item>
            <el-form-item label="救援人员">
              <el-input />
            </el-form-item>
            <el-form-item label="救援人员电话">
              <el-input />
            </el-form-item>
            <el-form-item label="上传照片">
              <el-upload class="upload-demo" multiple>
                <el-button type="primary">点击上传照片</el-button>
              </el-upload>
            </el-form-item>
            <div class="success" @click="handleChoose(2)"><el-button>完成</el-button></div>
          </el-form>
        </div>
      </div>
      <div class="scheme-wrapper-content-item" v-if="showButton == 2">
        <div class="form-wrapper">
          <el-form label-width="auto" style="max-width: 600px">
            <el-select placeholder="选择处置结果" size="large" style="width: 240px">
              <el-option v-for="item in options" :key="item" :label="item" :value="item" />
            </el-select>
            <el-form-item label="上传照片">
              <el-upload class="upload-demo" multiple>
                <el-button type="primary">点击上传照片</el-button>
              </el-upload>
            </el-form-item>
            <div class="success" @click="close"><el-button>提交</el-button></div>
          </el-form>
        </div>
      </div>
    </div>
    <div class="close">
      <el-button type="primary" @click="close">关闭</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scheme-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  min-width: 500px;
  transform: translate(-50%, -50%);
  background-color: rgba($color: #072b6a, $alpha: 0.9);
  .scheme-wrapper-content-tabs {
    color: white;
    display: flex;
    .tabs-item {
      padding: 10px;
      font-size: 18px;
      border-right: 1px solid white;
      color: gray;

      cursor: not-allowed;
      &.active {
        cursor: default;
        color: white;
      }
    }
  }
  .scheme-wrapper-content-item {
    position: relative;
    max-width: 250px;
    color: white;
    background-color: rgb(21, 103, 243);
    border-radius: 10px;
    margin: 10px;
    .form-wrapper {
      background-color: #1e3d70;
    }
  }
  .scheme-wrapper-title {
    font-size: 20px;
    color: white;
  }
}
.close {
  margin-top: 30px;
}
.success {
  margin-top: 20px;
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
