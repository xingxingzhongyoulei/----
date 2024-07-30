<script setup>
import code1 from '@/assets/img/Login/code1.jpg'
import code2 from '@/assets/img/Login/code2.jpg'
import code3 from '@/assets/img/Login/code3.jpg'
import code4 from '@/assets/img/Login/code4.jpg'
import code5 from '@/assets/img/Login/code5.jpg'
import Vcode from 'vue3-puzzle-vcode'
defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['success', 'onFail'])

const onSuccess = () => {
  emits('success')
}
</script>

<template>
  <Vcode
    :show="isShow"
    :canvasWidth="400"
    :canvasHeight="250"
    :puzzleScale="1"
    :sliderSize="40"
    :range="10"
    :imgs="[code1, code2, code3, code4, code5]"
    successText="验证成功！"
    failText="验证失败，请重试！"
    sliderText="拖动滑块验证"
    @success="onSuccess"
  />
</template>

<style lang="scss" scoped></style>
