<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
html,
body {
  box-sizing: border-box;
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#app {
  color: #2c3e50;
  font-family: 'SHSCNR', Avenir, Helvetica, Arial, sans-serif;
  height: 100%;
  text-align: center;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}

/* 默认系统字体 */
.el-dialog,
.el-drawer,
form,
table,
input,
textarea {
  font-family: 'SHSCNR', Avenir, Helvetica, Arial, sans-serif;
}

/*业务版滚动条样式*/
html ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 5px;
}

html ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 1px !important;
  -webkit-box-shadow: inset 0 0 2px rgba(82, 156, 255, 1) !important;
  background: rgba(82, 156, 255, 1) !important;
}

html ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 2px rgba(135, 186, 255, 0.3) !important;
  border-radius: 1px !important;
  background: rgba(135, 186, 255, 0.3) !important;
}
</style>
