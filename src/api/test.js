import request from '@/utils/request'

// 天数
export function getDays() {
  return request({
    url: '/test/getDays'
  })
}

