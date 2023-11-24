import request from '@/utils/request'

export function fetchData(params) {
  return request({
    url: '/vue-admin-template/mock/list',
    method: 'post',
    params
  })
}

export function addData(params) {
  return request({
    url: '/vue-admin-template/mock/add',
    method: 'post',
    params
  })
}

export function editData(params) {
  return request({
    url: '/vue-admin-template/mock/edit',
    method: 'post',
    params
  })
}

export function deleteData(params) {
  return request({
    url: '/vue-admin-template/mock/delete',
    method: 'post',
    params
  })
}
