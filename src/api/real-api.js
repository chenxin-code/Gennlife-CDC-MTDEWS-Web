import request from '@/utils/input-request'

const prifix = ''

// 聚集性预警事件
export function gatherList(params) {
  return request({
    url: prifix + '/cdc-eew/warn/gather/list',
    method: 'get',
    params
  })
}

// 重点人群预警事件
export function importantList(params) {
  return request({
    url: prifix + '/cdc-eew/warn/important/list',
    method: 'get',
    params
  })
}

// 症候群预警事件
export function syndromeList(params) {
  return request({
    url: prifix + '/cdc-eew/warn/syndrome/list',
    method: 'get',
    params
  })
}

// 症候群预警事件
export function syndromeDictionary(params) {
  return request({
    url: prifix + '/cdc-eew/syndrome/dictionary/list',
    method: 'get',
    params
  })
}

// 环境采样预警
export function envList(params) {
  return request({
    url: prifix + '/cdc-eew/warn/env/list',
    method: 'get',
    params
  })
}

// 网络舆情预警
export function netList(params) {
  return request({
    url: prifix + '/cdc-eew/warn/net/list',
    method: 'get',
    params
  })
}

// 药店销售监测预警
export function medicineList(params) {
  return request({
    url: prifix + '/cdc-eew/warn/medicine/list',
    method: 'get',
    params
  })
}

// 	密接人员预警
export function closeList(params) {
  return request({
    url: prifix + '/cdc-eew/warn/close/list',
    method: 'get',
    params
  })
}

// 入境预警监测(香港)
export function enterList(params) {
  return request({
    url: prifix + '/cdc-eew/warn/enter/list',
    method: 'get',
    params
  })
}

// 幼儿学生多点监测预警
export function studentList(params) {
  return request({
    url: prifix + '/cdc-eew/warn/student/list',
    method: 'get',
    params
  })
}

/**
 * 列表相关
 */
// 聚集人群列表查询
export function getGatherList(data) {
  return request({
    url: prifix + '/cdc-eew/personnel/gather/list',
    method: 'post',
    data
  })
}

// 环境采样列表查询
export function getEnvList(data) {
  return request({
    url: prifix + '/cdc-eew/goods/env/list',
    method: 'post',
    data
  })
}

// 环境采样列表查询
export function getEnvInfo(data) {
  return request({
    url: prifix + '/cdc-eew/goods/env/info/list',
    method: 'post',
    data
  })
}

// 重点人群列表查询
export function getImportantList(data) {
  return request({
    url: prifix + '/cdc-eew/personnel/important/list',
    method: 'post',
    data
  })
}

export function getRiskList(data) {
  return request({
    url: prifix + '/cdc-eew/personnel/risk/list',
    method: 'post',
    data
  })
}
// 症候群
export function getSyndromeList(data) {
  return request({
    url: prifix + '/cdc-eew/personnel/syndrome/list',
    method: 'post',
    data
  })
}

export function getPersonnelInfo(data) {
  return request({
    url: prifix + '/cdc-eew/personnel/info',
    method: 'post',
    data
  })
}

export function getDictionaryList(params) {
  return request({
    url: prifix + '/cdc-eew/dictionary/List',
    method: 'get',
    params
  })
}

// 获取密接信息
export function getClosePersonList(data) {
  return request({
    url: prifix + '/cdc-eew/personnel/close/person/list',
    method: 'post',
    data
  })
}

// 学校缺勤情况 线形图
export function staticList(data) {
  return request({
    url: prifix + '/cdc-eew/warn/school/static/list',
    method: 'post',
    data
  })
}
// 学校缺勤情况 列表
export function schoolList(data) {
  return request({
    url: prifix + '/cdc-eew/school/city/list',
    method: 'post',
    data
  })
}
// 学校缺勤情况 列表
export function citySchoolList(data) {
  return request({
    url: prifix + '/cdc-eew/school/city/school/list',
    method: 'post',
    data
  })
}
// 学校缺勤情况 列表
export function studentSchoolList(data) {
  return request({
    url: prifix + '/cdc-eew/school/student/list',
    method: 'post',
    data
  })
}

// 广东地市查询
export function gdCity(params) {
  return request({
    url: prifix + '/cdc-eew/gdCity/dictionary/list',
    method: 'get',
    params
  })
}

// 症候群 城市 列表
export function syndromeCity(data) {
  return request({
    url: prifix + '/cdc-eew/syndrome/city/list',
    method: 'post',
    data
  })
}
// 症候群 医院 列表
export function syndromeHospital(data) {
  return request({
    url: prifix + '/cdc-eew/syndrome/hospital/list',
    method: 'post',
    data
  })
}
// 症候群 人员 列表
export function syndromePatient(data) {
  return request({
    url: prifix + '/cdc-eew/syndrome/patient/list',
    method: 'post',
    data
  })
}

/**
 * 演示接口
 */
// 1. 初始化
export function demoInit(params) {
  return request({
    url: prifix + '/cdc-eew/init',
    method: 'get',
    params
  })
}
// 2. 症候群
export function demoZhq(params) {
  return request({
    url: prifix + '/cdc-eew/zhq',
    method: 'get',
    params
  })
}
// 3. 疑似病例
export function demoYs(params) {
  return request({
    url: prifix + '/cdc-eew/ys',
    method: 'get',
    params
  })
}
// 4.确诊病例
export function demoQz(params) {
  return request({
    url: prifix + '/cdc-eew/qz',
    method: 'get',
    params
  })
}
// 5.生成密接数据
export function demoMj(params) {
  return request({
    url: prifix + '/cdc-eew/mj',
    method: 'get',
    params
  })
}
