<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({
  backPath: {
    typeof: String,
    default: '/portal'
  }
})
const newRouteName = ref(route.meta.title || '')
watch(
  () => route.path,
  (newVal) => {
    if (newVal === props.backPath) {
      newRouteName.value = ''
    } else {
      newRouteName.value = route.meta.title
    }
  }
)
</script>

<template>
  <div class="breadcrumb-wrapper">
    <router-link
      class="breadcrumb-item"
      to="/shipManagement"
      :class="{ active: route.path === props.backPath }"
    >
      <el-icon><House /></el-icon><span>首页</span>
    </router-link>

    <span v-if="newRouteName" class="breadcrumb-item active">{{ newRouteName }}</span>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumb-wrapper {
  //   position: relative;
  width: 100%;
  height: 45px;
  line-height: 40px;
  background-color: #ffffff;
  text-align: left;
  padding-left: 25px;
  pointer-events: auto;
  .breadcrumb-item {
    // display: inline-block;
    cursor: pointer;
    background-color: #e7e9f0;
    color: black;
    padding: 5px 20px;
    border-radius: 20px;
  }
  .active {
    background-color: #167fff;
    color: white;
    margin-left: 20px;
  }
}
</style>
