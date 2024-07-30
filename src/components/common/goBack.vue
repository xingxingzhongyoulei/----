<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
function handleClick() {
  router.push({ path: '/portal' })
}
</script>

<template>
  <div class="go-back" @click="handleClick">
    <img class="back-img" src="@\assets\img\common\header\icon-screen-back.png" />
    <span class="title">返回门户页</span>
  </div>
</template>

<style lang="scss" scoped>
.go-back {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 40px;
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  color: #129bff;
  cursor: pointer;
}
.back-img {
  vertical-align: middle;
}
.title {
  display: inline-block;
}
</style>
