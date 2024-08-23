/* eslint-disable */
import { ElMessage } from 'element-plus'
export function showMessage(message = '成功', type = 'success', duration = 1500) {
  return ElMessage({
    message: message,
    type: type,
    duration
  })
}
