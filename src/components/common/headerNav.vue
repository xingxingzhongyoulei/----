<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// icon的切换
const router = useRouter()
const isCollapse = ref(false)
function IconClick() {
  isCollapse.value = !isCollapse.value
}
defineExpose({
  isCollapse
})
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
function handleClick() {
  router.push({ path: '/portal' })
}
</script>

<template>
  <div class="header-nav-wrapper">
    <el-icon :size="25" style="margin: 0 20px" @click="IconClick"
      ><Expand v-if="isCollapse" /> <Fold v-else />
    </el-icon>

    <div class="header-nav-title">{{ props.title }}</div>
    <div class="goBack" @click="handleClick">
      <img class="back-img" src="@\assets\img\common\header\icon-screen-back.png" />
      <span class="title">返回门户页</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header-nav-wrapper {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 50px;
  background-color: #0052d9;
  color: white;
  display: flex;
  align-items: center;
  .header-nav-title {
    height: 50px;
    line-height: 50px;
    font-size: 25px;
  }
  .goBack {
    position: absolute;
    right: 1%;
    cursor: pointer;
    .back-img {
      vertical-align: middle;
    }
    .title {
      display: inline-block;
    }
  }
}
</style>
