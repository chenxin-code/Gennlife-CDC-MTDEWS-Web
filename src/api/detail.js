import request from '@/utils/request'

export function goodsEnvList(params) {
  return request({
    url: '/vue-admin-template/details/getList',
    method: 'post',
    params
  })
}
