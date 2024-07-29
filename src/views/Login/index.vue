<script setup>
import { ref, computed } from 'vue'
import slideVerify from '@/components/Login/slideVerify.vue'
import { showMessage } from '@/utils/Elements'
import { useRouter } from 'vue-router'

const labelPosition = ref('left')
const formLabelAlign = ref({
  username: '',
  password: ''
})
const isShow = ref(false)
const slideVerifyRef = ref(null)
// 是否显示验证组件
const isShowSlide = computed(() => {
  return formLabelAlign.value.username != '' && formLabelAlign.value.password !== ''
})

//成功后，路由跳转
const router = useRouter()
function loginHandle() {
  showMessage('登录成功', 'success')
  router.push({ path: '/portal' })
}
function verifyHandle() {
  if (!isShowSlide.value) return showMessage('请先填写密码和账号', 'warning')
  isShow.value = true
}
function successHandle() {
  loginHandle()
  isShow.value = false
}
</script>

<template>
  <div class="formContainer">
    <div class="container">
      <el-form
        class="form"
        :label-position="labelPosition"
        label-width="auto"
        :model="formLabelAlign"
      >
        <el-form-item label="用户名" :label-position="itemLabelPosition">
          <el-input v-model="formLabelAlign.username" />
        </el-form-item>
        <el-form-item label="密码" :label-position="itemLabelPosition">
          <el-input v-model="formLabelAlign.password" />
        </el-form-item>
      </el-form>
      <el-button @click="verifyHandle" class="middleBtn" type="primary">登录</el-button>
    </div>
  </div>
  <slideVerify
    :isShow="isShow"
    :ref="slideVerifyRef"
    @success="successHandle"
    @onFail="failHandle"
  ></slideVerify>
</template>

<style lang="scss" scoped>
.formContainer {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  align-items: center;
  overflow: hidden;
  // background-color: aqua;
}
.container {
  width: 450px;
  background-image: linear-gradient(
    to bottom,
    rgb(135, 168, 187) 45%,
    rgb(161, 186, 199) 65%,
    rgb(184, 207, 220) 80%,
    rgb(218, 228, 233) 100%
  );
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.middleBtn {
  margin-top: 30px;
  width: 200px;
  font-size: 20pxpx;
}
</style>
