<script setup>
import { useReportStore } from '@/stores'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const processThingList = ['待受理', '受理中', '已办结']
const processActive = ref('待受理')
const reportStore = useReportStore()
let descList = reportStore.accidentArr
const eventNum = reportStore.accidentArr.length
const treateNum = reportStore.accidentArring.length
function handleEvent(item) {
  processActive.value = item
  switch (item) {
    case '待受理':
      descList = reportStore.accidentArr
      break
    case '受理中':
      descList = reportStore.accidentArring
      break
    case '已办结':
      descList = reportStore.accidentArred
      break

    default:
      break
  }
}
const router = useRouter()
function handleProcessEvent(num) {
  router.push({
    path: '/processEvent',
    query: {
      id: num
    }
  })
}
</script>

<template>
  <div class="dynamics-wrapper">
    <div class="dynamics-title">应急事件动态</div>
    <div class="dynamics-content">
      <div class="content-title">
        <div class="title-item">
          <div class="title-item-top">累计事件</div>
          <div class="title-item-bootom">{{ eventNum }}</div>
        </div>
        <div class="title-item">
          <div class="title-item-top">待处理</div>
          <div class="title-item-bootom">{{ treateNum }}</div>
        </div>
      </div>
      <div class="process">
        <div
          class="process-thing"
          v-for="(item, index) in processThingList"
          :key="index"
          :class="{ 'process-thing-active': processActive == item }"
          @click="handleEvent(item)"
        >
          {{ item }}
        </div>
      </div>
      <div class="dynamics-item">
        <div class="item-img"></div>
        <div class="item-content-list">
          <div class="item-content" v-for="(item, index) in descList" :key="index">
            <div class="item-content-title">{{ item.time }}</div>
            <div class="item-content-text" @click="handleProcessEvent(item.process)">
              <div class="text-title">{{ item.alarmMsg }}</div>
              <div class="text-content-list">
                <div class="text-list">事件来源:{{ item.resource }}</div>
                <div class="text-list">事件类型:{{ item.alarmMsg }}</div>
                <div class="text-list">
                  事件描述: <span class="text-content">{{ item.alarmDes }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dynamics-wrapper {
  position: absolute;
  left: 30px;
  bottom: 20px;
  width: 300px;
  background-color: rgba($color: #081a37, $alpha: 0.8);
}
.dynamics-title {
  padding-left: 30px;
  font-size: 20px;
  line-height: 50px;
  font-style: italic;
  text-align: left;
  color: white;
  background-image: url('@/assets/img/common/title/icon-title-background.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.dynamics-content {
  min-height: 350px;
  .content-title {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    .title-item {
      background-image: url('@/assets/img/common/icon-event-background.png');
      width: 130px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      .title-item-top {
        color: white;
      }
      .title-item-bootom {
        font-size: 25px;
        color: rgb(243, 205, 19);
      }
    }
  }
  .process {
    display: flex;
    justify-content: space-evenly;
    color: white;
    margin-top: 12px;
    .process-thing {
      padding: 5px 10px;
      background-image: url('@/assets/img/common/emergency/icon-button-background.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
    .process-thing-active {
      color: rgb(243, 205, 19);
      background-image: url('@/assets/img/common/emergency/icon-background-active.png');
    }
  }
  .dynamics-item {
    display: flex;
    color: white;
    margin-top: 10px;
    .item-img {
      width: 2px;
      background-color: transparent;
      margin-left: 25px;
      margin-right: 10px;
    }
    .item-content-list {
      box-sizing: border-box;
      height: 270px;
      padding-bottom: 30px;
      padding-right: 15px;
      overflow-y: auto;
      .item-content {
        .item-content-title {
          margin-top: 10px;
          background-color: rgb(12, 134, 241);
          padding: 0 20px;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
        }
        .item-content-text {
          // padding: 10px;
          background: url('@/assets/img/common/icon-nav-active.png');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          width: 240px;
          margin-top: 10px;
          padding: 10px;
          .text-title {
            color: aqua;
            text-align: left;
            font-size: 17px;
            margin-bottom: 10px;
          }
          .text-content-list {
            text-align: left;
            font-size: 14px;
            .text-list {
              .text-content {
                text-wrap: wrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
