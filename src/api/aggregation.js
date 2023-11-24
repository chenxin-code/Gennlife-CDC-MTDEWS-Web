import request from '@/utils/request'

export function initSearch(params) {
  return request({
    url: '/vue-admin-template/cdc-eew/searchFilghtList',
    method: 'post',
    params
  })
}

export function flightList(params) {
  return request({
    url: '/vue-admin-template/cdc-eew/goods/env/flightList',
    method: 'post',
    params
  })
}

export function fetchAggregationList(query) {
  return request({
    url: '/vue-admin-template/cdc-eew/goods/env/aggregationDetailList',
    method: 'post',
    params: query
  })
}
