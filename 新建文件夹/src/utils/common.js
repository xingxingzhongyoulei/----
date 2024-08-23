import * as XLSX from 'xlsx'

/**
 * 获取assets文件夹下的静态图片资源
 * @param url // 文件路径
 */
const getAssetsFile = (url) => new URL(`../assets/images/${url}`, import.meta.url).href

/**
 *将对象数组导出为excel
 * @param {*} data  [{}]
 * @param {*} headers {标题名：数据的属性名,......}
 * @param {*} filename
 */
function exportToExcel(data, headers, filename = '船只数据') {
  // 创建一个工作簿
  const workbook = XLSX.utils.book_new()

  // 转换数据为工作表，使用传入的headers作为列名
  const ws = XLSX.utils.json_to_sheet(
    data.map((item) => {
      const row = {}
      for (const header in headers) {
        if (headers.hasOwnProperty(header) && item.hasOwnProperty(headers[header])) {
          row[header] = item[headers[header]]
        }
      }
      return row
    })
  )

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(workbook, ws, filename)

  // 生成Excel文件
  const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })

  // 触发下载
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff
    }
    return buf
  }

  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${filename}.xlsx`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
/**
 * 传入参数的时间值为elements的时间选择器的值，未作处理  直接传入
 * @param {*} start  起始时间
 * @param {*} end  结束时间
 * @returns 2024-12-12 12:12:12这样类型的时间
 */
function getRandomTimestampInRange(start, end) {
  const startTime = new Date(start).getTime()
  const endTime = new Date(end).getTime()
  const randomTime = startTime + Math.random() * (endTime - startTime)
  return new Date(randomTime)
    .toISOString()
    .replace('T', ' ')
    .replace(/\.\d+Z/, '')
}

/**
 * 随机返回数组中的任意一个值
 * @param {*} arr
 * @returns
 */
function randomArr(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
export { getAssetsFile, exportToExcel, getRandomTimestampInRange, randomArr }
