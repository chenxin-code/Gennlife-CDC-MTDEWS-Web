import request from '@/utils/request'

export function fetchGet(query) {
  return request({
    url: '/vue-admin-template/mock/userlist',
    method: 'post',
    params: query
  })
}

export function importantGet(query) {
  return request({
    url: '/vue-admin-template/mock/importantList',
    method: 'post',
    params: query
  })
}

export function basicGet(query) {
  return request({
    url: '/vue-admin-template/mock/basicMessage',
    method: 'post',
    params: query
  })
}

export function cdcGet(query) {
  return request({
    url: '/vue-admin-template/mock/cdcMessage',
    method: 'post',
    params: query
  })
}

export function fetchFind(query) {
  return request({
    url: '/vue-admin-template/mock/findlist',
    method: 'post',
    params: query
  })
}

export function importantFind(query) {
  return request({
    url: '/vue-admin-template/mock/importFindList',
    method: 'post',
    params: query
  })
}

