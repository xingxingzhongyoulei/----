import dayjs from 'dayjs'
export function formatTime(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
