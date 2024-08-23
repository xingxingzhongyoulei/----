import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReportStore = defineStore('reportAccident', () => {
  const accidentArr = ref([
    {
      alarmMsg: '人员落水',
      resource: '手动添加',
      alarmDes: '因台风影响，人员落水',
      time: '2018-12-12 12:0:0',
      process: 0
    }
  ])
  const accidentArring = ref([
    {
      alarmMsg: '触礁',
      resource: '手动添加',
      alarmDes: '设备损坏',
      time: '2018-12-12 12:0:0',
      process: 1
    }
  ])
  const accidentArred = ref([
    {
      alarmMsg: '人员落水',
      resource: '手动添加',
      alarmDes: '因台风影响，人员落水',
      time: '2018-12-12 12:0:0',
      process: 2
    }
  ])
  function addAccident(obj) {
    accidentArr.value.push(obj)
  }
  return { accidentArr, addAccident, accidentArring, accidentArred }
})
