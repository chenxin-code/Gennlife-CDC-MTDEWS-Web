import request from '@/utils/request'

// 密接数据
export function fetchUserList(query) {
  return request({
    url: '/vue-admin-template/mock/userList',
    method: 'post',
    params: query
  })
}

// 详情数据
export function fetchDetailsList(query) {
  return request({
    url: '/vue-admin-template/mock/detailsList',
    method: 'post',
    params: query
  })
}

// 详情关联数据
export function fetchRelationList(query) {
  return request({
    url: '/vue-admin-template/mock/relationList',
    method: 'post',
    params: query
  })
}
