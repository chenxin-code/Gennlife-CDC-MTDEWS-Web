import request from '@/utils/request'

export function initSearch(params) {
  return request({
    url: '/vue-admin-template/cdc-eew/searchList',
    method: 'post',
    params
  })
}

export function goodsEnvList(params) {
  return request({
    url: '/vue-admin-template/cdc-eew/goods/env/list',
    method: 'post',
    params
  })
}
