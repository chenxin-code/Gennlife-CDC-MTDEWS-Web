import request from '@/utils/request'

// 全球疫情数据
export function fetchGlobalData(query) {
  return request({
    url: '/vue-admin-template/mock/globalData',
    method: 'post',
    params: query
  })
}

// 香港个案数据
export function fetchXiangGangData(query) {
  return request({
    url: '/vue-admin-template/mock/xiang-gang-data',
    method: 'post',
    params: query
  })
}

// 发病途径数据
export function fetchSickStatisticsData(query) {
  return request({
    url: '/vue-admin-template/mock/sick-statistics-data',
    method: 'post',
    params: query
  })
}

// 聚集性疫情
export function fetchEpidemicClusterData(query) {
  return request({
    url: '/vue-admin-template/mock/epidemic-cluster-data',
    method: 'post',
    params: query
  })
}

// 输入国数据
export function fetchImportCountryData(query) {
  return request({
    url: '/vue-admin-template/mock/import-country-data',
    method: 'post',
    params: query
  })
}

// 病例分类数据
export function fetchCaseClassificationData(query) {
  return request({
    url: '/vue-admin-template/mock/case-classification-data',
    method: 'post',
    params: query
  })
}

// 死亡数据
export function fetchDeathStatisticsData(query) {
  return request({
    url: '/vue-admin-template/mock/death-statistics-data',
    method: 'post',
    params: query
  })
}

// 本地病案数据
export function fetchLocalStatisticData(query) {
  return request({
    url: '/vue-admin-template/mock/local-statistic-data',
    method: 'post',
    params: query
  })
}

// 病案年龄数据
export function fetchAgeStatisticsData(query) {
  return request({
    url: '/vue-admin-template/mock/age-statistics-data',
    method: 'post',
    params: query
  })
}

export function fetchCumulativeData(query) {
  return request({
    url: '/vue-admin-template/mock/cumulative-data',
    method: 'post',
    params: query
  })
}
