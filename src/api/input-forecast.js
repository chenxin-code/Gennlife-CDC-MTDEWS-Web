import request from '@/utils/input-request'

const prifix = ''

// 1. 境外输入风险评估
export function riskAssessment(query) {
  return request({
    url: prifix + '/api/v1/app/risk_assessment',
    method: 'post',
    data: query
  })
}

// 2. 境外输入风险评估及分级
export function overseasRiskControl(query) {
  return request({
    url: prifix + '/api/v1/app/overseas_risk_control',
    method: 'post',
    data: query
  })
}

// 3. 酒店隔离情况信息
export function hotelIsolation(query) {
  return request({
    url: prifix + '/api/v1/app/hotel_isolation',
    method: 'post',
    data: query,
    timeout: 0
  })
}

// 4. 高风险国家未来累计感染人数趋势预测
export function accumulateCase(query) {
  return request({
    url: prifix + '/api/v1/app/accumulate_case',
    method: 'post',
    data: query
  })
}

// 5. 未来两周境外输入人数
export function inboundNum(query) {
  return request({
    url: prifix + '/api/v1/app/inbound_num',
    method: 'post',
    data: query
  })
}

// 6. 香港豁免人员风险评估
export function xgRisk(query) {
  return request({
    url: prifix + '/api/v1/app/xg_risk',
    method: 'post',
    data: query
  })
}

// 8. 各省市输入风险评估及分级(高中风险小区情况)
export function otherCtRiskNum(query) {
  return request({
    url: prifix + '/api/v1/app/other_ct_risk_num',
    method: 'post',
    data: query
  })
}

// 9. 各分流城市分配资源的使用情况
export function cityResourceUsedInfo(query) {
  return request({
    url: prifix + '/api/v1/app/city_resource_used_info',
    method: 'post',
    data: query
  })
}

// 10. 入境人员分流策略
export function bypassInbound(query) {
  return request({
    url: prifix + '/api/v1/app/bypass_inbound',
    method: 'post',
    data: query
  })
}

// 11. 入境人员隔离策略
export function lsolationStrategy(query) {
  return request({
    url: prifix + '/api/v1/app/lsolation_strategy',
    method: 'post',
    data: query
  })
}

// 12. 阳性人数与隔离天数走势
export function positiveTrend(query) {
  return request({
    url: prifix + '/api/v1/app/positive_trend',
    method: 'post',
    data: query
  })
}

// 13.时空传播模型
export function timesprad(data) {
  return request({
    url: prifix + '/api/v1/app/timesprad',
    method: 'post',
    data,
    timeout: 0 // request timeout
  })
}

// 14.根据状态获取对应字典
export function statusdict(data) {
  return request({
    url: prifix + '/api/v1/app/statusdict',
    method: 'post',
    data
  })
}

// 15. 默认参数接口
export function defaultParameters(data) {
  return request({
    url: prifix + '/api/v1/app/default_parameters',
    method: 'post',
    data
  })
}

// 16. 场景2.1 导入excel数据
export function excel(data) {
  return request({
    url: prifix + '/api/v1/app/excel',
    method: 'post',
    data
  })
}

// 17.场景2.1 高危人群圈定
export function highRiskGroupDelineation(data) {
  return request({
    url: prifix + '/api/v1/app/high_risk_group_delineation',
    method: 'post',
    data
  })
}

// 18.场景2.1 所有病例社交图
export function case2Social(data) {
  return request({
    url: prifix + '/api/v1/app/case2_social',
    method: 'post',
    data
  })
}
