import request from '@/utils/input-request'

const prifix = '/epidemicdatamng'

// 香港每日新增个案
export function newCaseDay(data) {
  return request({
    url: prifix + '/hongkong/new_case_day',
    method: 'post',
    data
  })
}

// 香港近一周新增个案
export function newCaseWeek(data) {
  return request({
    url: prifix + '/hongkong/new_case_week',
    method: 'post',
    data
  })
}

// 香港近一周新增个案
export function totalCaseFront(data) {
  return request({
    url: prifix + '/guangdong/total_case_front',
    method: 'post',
    data
  })
}

// 广东省每日个案统计
export function newCaseDayGD(data) {
  return request({
    url: prifix + '/guangdong/new_case_day',
    method: 'post',
    data
  })
}

// 广东省每周个案统计
export function newCaseWeekGD(data) {
  return request({
    url: prifix + '/guangdong/new_case_week',
    method: 'post',
    data
  })
}

// 确诊病例分布图
export function caseDistributedGD(data) {
  return request({
    url: prifix + '/guangdong/case_distributed',
    method: 'post',
    data
  })
}

// 全省近一个月病例情况
export function caseMonthGD(data) {
  return request({
    url: prifix + '/guangdong/case_month',
    method: 'post',
    data
  })
}

// 近一周境外个案发现途径
export function sicksourceWeekGD(data) {
  return request({
    url: prifix + '/guangdong/sicksource_week',
    method: 'post',
    data
  })
}

// 近一周个案国籍分布
export function caseNationWeekGD(data) {
  return request({
    url: prifix + '/guangdong/case_nation_week',
    method: 'post',
    data
  })
}

// 每日高风险地区入粤人数
export function highriskCaseDayGD(data) {
  return request({
    url: prifix + '/guangdong/highrisk_case_day',
    method: 'post',
    data
  })
}

// 广东省感染个案情况简报
export function newsWeekGD(data) {
  return request({
    url: prifix + '/guangdong/news_week',
    method: 'post',
    data
  })
}

// 境外航班入境来源情况
export function importCountryGD(data) {
  return request({
    url: prifix + '/guangdong/import_country',
    method: 'post',
    data
  })
}

// 各口岸人群分类情况
export function portClusterGD(data) {
  return request({
    url: prifix + '/guangdong/port_cluster',
    method: 'post',
    data
  })
}

// 各口岸人群分类情况
export function isolationIntervalGD(data) {
  return request({
    url: prifix + '/guangdong/isolation_interval',
    method: 'post',
    data
  })
}

/** 驾驶仓相关接口 */
// 地图
export function mapOveview(data) {
  return request({
    url: prifix + '/guangdong/map_overview',
    method: 'post',
    data
  })
}

// 广东省疫情概览 newCaseDay 已定义
// export function gdNewCaseDay(data){
//   return request({
//     url: prifix + '/guangdong/new_case_day',
//     method: 'post',
//     data
//   })
// }

// 广东省外省输入新冠疫情时间分布 caseMonthGD 已定义

// 香港疫情概览
export function caseOverview(data) {
  return request({
    url: prifix + '/hongkong/case_overview',
    method: 'post',
    data
  })
}

// 香港11月新冠肺炎疫情新增时间分布
export function caseClassificationMonth(data) {
  return request({
    url: prifix + '/hongkong/case_classification_month',
    method: 'post',
    data
  })
}

// 全部豁免人员入粤人数变化
export function exemptPersonnelChange(data) {
  return request({
    url: prifix + '/hongkong/exempt_personnel_change',
    method: 'post',
    data
  })
}

// 全球疫情概览
export function newData(data) {
  return request({
    url: prifix + '/global/new_data',
    method: 'post',
    data
  })
}

// 全球报告新冠疫情时间分布
export function caseGlobalAverageSevendays(data) {
  return request({
    url: prifix + '/global/case_global_average_sevendays',
    method: 'post',
    data
  })
}

// 全球疫情重点关注非洲七日平均曲线
export function caseAfricaAverageSevendays(data) {
  return request({
    url: prifix + '/global/case_africa_average_sevendays',
    method: 'post',
    data
  })
}

// 全国疫情概览
export function epidemicOverview(data) {
  return request({
    url: prifix + '/national/epidemic_overview',
    method: 'post',
    data
  })
}

// 全国风险等级情况
export function riskLevel(data) {
  return request({
    url: prifix + '/national/risk_level',
    method: 'post',
    data
  })
}

// 全国疫情中高风险名单
export function mediumHighRiskArea(data) {
  return request({
    url: prifix + '/national/medium_high_risk_area',
    method: 'post',
    data
  })
}
