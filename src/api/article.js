import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/userlist',
    method: 'get',
    params: query
  })
}

export function fetchGet(query) {
  return request({
    url: '/vue-admin-template/mock/userlist',
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

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
