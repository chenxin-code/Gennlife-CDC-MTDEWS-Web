import request from '@/utils/request'

export function initSearch(params) {
  return request({
    url: '/vue-admin-template/cdc-eew/findList',
    method: 'post',
    params
  })
}

export function goodsEnvList(params) {
  return request({
    url: '/vue-admin-template/cdc-eew/getList',
    method: 'post',
    params
  })
}
