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
  if (formLabelAlign.value.username != 'admin' || formLabelAlign.value.password != '123456') {
    return false
  } else {
    return true
  }
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
    <div class="title">江苏盐城智慧渔港</div>
    <div class="container">
      <div class="img">
        <img src="@/assets/img/common/icon-login-banner.png" alt="" />
      </div>
      <div class="form-wrapper">
        <div class="title-form">欢迎登录</div>
        <el-form
          class="form"
          :label-position="labelPosition"
          label-width="auto"
          :model="formLabelAlign"
        >
          <el-form-item label="用户名" :label-position="itemLabelPosition">
            <el-input v-model="formLabelAlign.username" class="input" />
          </el-form-item>
          <el-form-item label="密码" :label-position="itemLabelPosition">
            <el-input v-model="formLabelAlign.password" class="input" />
          </el-form-item>
        </el-form>
        <el-button @click="verifyHandle" class="middleBtn" type="primary">登录</el-button>
      </div>
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
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/img/common/icon-login-bg.png');
  justify-content: center;
  align-items: center;
  align-items: center;
  overflow: hidden;
}
.title {
  width: 775px;
  height: 75px;
  position: absolute;
  top: 80px;
  font-size: 60px;
  letter-spacing: 15px;
  color: white;
  text-shadow: 5px 5px 5px #2175fc;
  font-style: oblique;
  animation: colorFont 1s linear infinite alternate;
}
.container {
  width: auto;
  height: 575px;
  margin-top: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  .img {
    width: 442px;
    height: 575px;
  }

  .form-wrapper {
    width: 500px;
    height: 100%;
    background-color: white;
    padding: 80px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    
    .title-form {
      position: relative;
      margin-bottom: 80px;
      font-size: 30px;
      letter-spacing: 15px;
      &::before {
        content: '———welcome to login———';
        position: absolute;
        display: inline-block;
        width: 100%;
        bottom: -40px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 15px;
        letter-spacing: 5px;
        text-align: center;
      }
    }
    :deep(.el-input__inner) {
      background-color: #e8f0fe !important;
      border-radius: 5px;
      height: 40px;
      box-shadow: 0 0 0 1px #d0def7;
      padding-left: 10px;
    }
    :deep(.el-input__wrapper) {
      background-color: none !important;
      padding: 0;
      box-shadow: none;
    }
    :deep(.el-input) {
      border-radius: 20px;
  
    }

    .input {
      width: 250px;
    }
    :deep(.el-button) {
      width: 280px;
      height: 40px;
      background-color: #1f55ae;
      border-radius: 20px;
   
    }
  }
}

.middleBtn {
  margin-top: 30px;
  width: 200px;
  font-size: 20pxpx;
}
@keyframes colorFont {
  0% {
    text-shadow: 5px 5px 5px #caced4;
  }
  30% {
    text-shadow: 0px 0px 0 30px #e5ebf5;
  }
  50% {
    text-shadow: 0px 0px 0 15px #6ea0f0;
  }
  75% {
    text-shadow: 10px 0px 0 30px #137cf5;
  }
  100% {
    text-shadow: 0px 10px 0 8px #e5ebf5;
  }
}
</style>
