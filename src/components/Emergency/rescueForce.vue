<script setup>
import { request } from '@/utils/axios'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const roundShip = ref([])
async function getRoundShip() {
  const num = route.query.roundNum
  for (let i = 0; i < num; i++) {
    const res = await request('/MapRounddata')
    roundShip.value.push({ phone: res.data.phone, shipNumber: res.data.shipNumber })
  }
}
onMounted(() => {
  getRoundShip()
})
</script>

<template>
  <div class="force-wrapper">
    <div class="force-title">应急救援力量</div>
    <div class="force-content">
      <div class="force-item-title">
        <div class="force-title-item">
          周边船只<span style="color: aqua">{{ route.query.roundNum }}</span
          >条
        </div>
        <div class="force-title-item">
          周边视频<span style="color: aqua">{{ 0 }}</span
          >个
        </div>
      </div>
      <div class="forc-content-list-title">
        <input type="checkbox" style="display: none" />
        <div class="index" style="margin-left: 33px">序号</div>
        <div class="shipNumber">船牌号</div>
        <div>号码</div>
      </div>
      <div class="force-content-list" v-for="(item, index) in roundShip" :key="index">
        <input type="checkbox" style="margin-left: 10px" />
        <div class="index">{{ index + 1 }}</div>
        <div class="shipNumber">{{ item.shipNumber }}</div>
        <div>{{ item.phone }}</div>
      </div>
      <div class="force-content-message">
        <el-button type="success">发送短信</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.force-wrapper {
  position: absolute;
  right: 30px;
  top: 150px;
  width: 300px;
  background-color: rgba($color: #081a37, $alpha: 0.8);
}
.force-title {
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
.force-content {
  min-height: 250px;
  color: white;
  padding-bottom: 20px;
  .force-item-title {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 16px;
    color: white;
  }
  .forc-content-list-title {
    display: flex;
    margin-top: 20px;
  }
  .force-content-list {
    display: flex;
    margin-top: 15px;
  }
  .index {
    width: 40px;
    margin-left: 10px;
  }
  .shipNumber {
    min-width: 70px;
    text-align: center;
    margin-left: 10px;
    margin-right: 20px;
  }
  .force-content-message {
    margin-top: 20px;
  }
}
</style>
