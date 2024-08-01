import { request } from '@/utils/axios'
export async function getRouterPlay(map) {
  const res = await request('MapRouterPlay')
  console.log(res.list)
  // 思路：
  // 1.准备一条线
  // 2.准备插件touterplay
  // 3.准备一个marker，动态设置market的坐标  点沿线动画
}
