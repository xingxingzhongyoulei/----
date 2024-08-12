<template>
  <div class="status-wrapper">
    <SubTitle title="告警" :list="list" type="text" style="margin: 10px 0" />

    <!-- 字体图标 -->
    <div class="iconContainer">
      <div class="icon-item" v-for="item in items" :key="item.class">
        <div class="icon-item-item" :class="['iconfont', item.class]"></div>
        <div class="icon-item-content">
          <div class="icon-item-content-number">{{ item.number }}</div>
          <div class="icon-item-content-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
    <table border="0">
      <tr>
        <th v-for="item in columns" :key="item.prop">{{ item.label }}</th>
      </tr>
      <Vue3SeamlessScroll
        direction="up"
        :step="0.5"
        :hover="true"
        :limit-scroll-num="3"
        :is-watch="true"
        :list="data"
        class="scroll-wrapper"
      >
        <tr class="table-row" v-for="(item, index) in data" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.position }}</td>
        </tr>
      </Vue3SeamlessScroll>
    </table>
  </div>
</template>
<script setup>
import SubTitle from '@/components/Title/index.vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll'

const list = ['单位：台']
const items = [
  {
    class: 'icon-zhuzhuangtu',
    number: 1200,
    title: '总数'
  },
  {
    class: 'icon-zhimingdafengche',
    number: 1163,
    title: '运行中'
  },
  {
    class: 'icon-dianyuankaiguan',
    number: 37,
    title: '已关闭'
  }
]
// 渲染表头数据
const columns = [
  {
    label: '名称',
    prop: 'name'
  },
  {
    label: '运行状态',
    prop: 'status'
  },
  {
    label: '运行时长',
    prop: 'time'
  },
  {
    label: '所在位置',
    prop: 'position'
  }
]
// 渲染表格数据
const data = [
  {
    name: '空调8号',
    status: '已关闭',
    time: '26.5h',
    position: '西教学楼二楼201'
  },
  {
    name: '空调9号',
    status: '运行中',
    time: '23.3h',
    position: '西教学楼二楼201'
  },
  {
    name: '空调1号',
    status: '运行中',
    time: '7.0h',
    position: '西教学楼二楼305'
  }
]
</script>

<style lang="scss" scoped>
.status-wrapper {
  background-color: rgba($color: #151f3a, $alpha: 0.3);
}
.iconContainer {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  .icon-item {
    display: flex;
    .icon-item-item {
      width: 86px;
      height: 86px;
      background-image: url('@/assets/img/trawler/circle-blue.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 86px;
      color: #06a5ff;
    }
    .icon-item-item {
      font-size: 30px;
    }
    .icon-item-content {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .icon-item-content-number {
        color: #03e0eb;
        font-size: 22px;
      }
      .icon-item-content-title {
        color: white;
        font-size: 16px;
      }
    }
  }
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  tr {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    &.table-row:hover {
      background-image: url('@/assets/images/trawler/table-row-background.png');
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }

    th {
      height: 40px;
      background-color: #1873fb29;
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #b4c7dd;
    }

    td {
      height: 36px;
      text-align: center;
      line-height: 36px;
      color: #cce5ff;
      font-size: 14px;
      border-bottom: 1px solid grey;
    }
  }
  .scroll-wrapper {
    width: 100%;
    height: 150px;
    overflow: hidden;
  }
}
</style>
