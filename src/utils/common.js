import * as XLSX from 'xlsx'

/**
 * 获取assets文件夹下的静态图片资源
 * @param url // 文件路径
 */
const getAssetsFile = (url) => new URL(`../assets/images/${url}`, import.meta.url).href

/**
 * 将表格数据导出excel
 * @param {*} jsonData
 * @param {*} customHeaders
 * @param {*} filename
 */
// function exportToExcel(data) {
//   // 创建一个工作簿
//   const workbook = XLSX.utils.book_new()

//   // 转换数据为工作表
//   const ws = XLSX.utils.json_to_sheet(
//     data.map((item) => ({
//       船名: item.shipName,
//       船主: item.shipLength, // 注意：这里的shipLength实际上是船主的名字
//       渔港名称: item.portName,
//       联系方式: item.phone,
//       终端类型: item.cmdType,
//       进出港类型: item.portTypes,
//       进出港时间: item.startTime
//     }))
//   )

//   // 将工作表添加到工作簿
//   XLSX.utils.book_append_sheet(workbook, ws, '船只数据')

//   // 生成Excel文件
//   const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })

//   // 触发下载
//   function s2ab(s) {
//     const buf = new ArrayBuffer(s.length)
//     const view = new Uint8Array(buf)
//     for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff
//     return buf
//   }

//   const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
//   const url = URL.createObjectURL(blob)
//   const a = document.createElement('a')
//   a.href = url
//   a.download = '船只数据.xlsx'
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)
//   URL.revokeObjectURL(url)
// }

function exportToExcel(data, headers) {
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
  XLSX.utils.book_append_sheet(workbook, ws, '船只数据')

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
  a.download = '船只数据.xlsx'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export { getAssetsFile, exportToExcel }
