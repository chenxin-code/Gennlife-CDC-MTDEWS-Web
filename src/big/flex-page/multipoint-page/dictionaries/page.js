// 页面中间顶部数据
const mapTop = [
  {
    label: '累计确诊病例',
    value(data) {
      return data.today.total_case || 0
    },
    diff(data) {
      const res = data.today.total_case - data.yesterday.total_case
      return res > 0 ? `+${res}` : res
    }
  },
  {
    label: '现有确诊病例',
    value(data) {
      return data.today.total_case_active || 0
    },
    diff(data) {
      const res =
        data.today.total_case_active - data.yesterday.total_case_active
      return res > 0 ? `+${res}` : res
    }
  },
  {
    label: '今日新增无症状感染者',
    value(data) {
      return data.today.new_case_asymptomatic || 0
    },
    diff(data) {
      const res =
        data.today.new_case_asymptomatic - data.yesterday.new_case_asymptomatic
      return res > 0 ? `+${res}` : res
    }
  },
  {
    label: '今日新增疑似病例',
    value(data) {
      return data.today.new_case_uncertain || 0
    },
    diff(data) {
      const res =
        data.today.new_case_uncertain - data.yesterday.new_case_uncertain
      return res > 0 ? `+${res}` : res
    }
  }
]
const earlyTopArr = [
  {
    label: '呼吸道症候群监测',
    icon: require('@/assets/images/warning_red.png'),
    syndromeCode: '1',
    monitorTotal: 0,
    normalNum: 0,
    highNum: 0
  },
  {
    label: '腹泻症候群预警',
    icon: require('@/assets/images/warning_red.png'),
    syndromeCode: '2',
    monitorTotal: 0,
    normalNum: 0,
    highNum: 0
  },
  {
    label: '发热症候群预警',
    icon: require('@/assets/images/warning_red.png'),
    syndromeCode: '3',
    monitorTotal: 0,
    normalNum: 0,
    highNum: 0
  }
]
// 环境采样
const earlyWarning = {
  environment: {
    title: '环境采样监测预警',
    label: '冷链监测总数',
    type: 'env',
    monitorTotal: 19,
    render: {
      functional: true,
      props: {},
      render() {
        return (
          <div>
            <div class='rightTitle'>冷链采样预警</div>
            <p class='rightContent'>无</p>
          </div>
        )
      }
    }
  },
  // online: {
  //   title: '网络舆情热点关注',
  //   type: 'network',
  //   monitorTotal: 0
  // },
  drugstore: {
    title: '检测药店总数',
    label: '近7日退烧药购买记录',
    type: 'medicine',
    monitorTotal: 174,
    render: {
      functional: true,
      props: {},
      render() {
        return (
          <div>
            <div class='rightTitle yellow'>
              购药异常信息预警<span class='more'>查看购药人信息</span>
            </div>
            <p class='rightContent yellow'>清远市：1</p>
          </div>
        )
      }
    }
  }
}
// 重点人群， 顶部数据
const importantTopArr = [
  {
    label: '港口工作人员',
    subTitle: '风险人员监测数',
    crowdCode: '2',
    monitorTotal: 217,
    render: {
      functional: true,
      props: {
        row: {}
      },
      render(createElement, context) {
        return (
          <div class='traffic'>
            <div>
              临床症状：<span class='warn'>0人</span>
            </div>
            <div class='items'>
              <div>
                已检测：<span class='warn'>217人</span>
              </div>
              <div>
                阳性：<span class='warn'>0人</span>
              </div>
            </div>
          </div>
        )
      }
    }
  },
  {
    label: '来自香港的货车司机/接驳司机',
    subTitle: '入粤风险人员数',
    crowdCode: '1',
    monitorTotal: 0,
    render: {
      functional: true,
      props: {
        row: {}
      },
      render(createElement, context) {
        return (
          <div class='mechanism'>
            <div class='item2'>
              <div>
                临床症状：
                <span class='warn'>
                  {context.props.row.symptomList
                    ? context.props.row.symptomList[0].symptomNum
                    : 0}
                  人
                </span>
              </div>
              <div>
                （未检测：
                <span class='warn'>
                  {context.props.row.symptomList
                    ? context.props.row.symptomList[0].noTestNum
                    : 0}
                  人
                </span>
                阳性：
                <span class='warn'>
                  {context.props.row.symptomList
                    ? context.props.row.symptomList[0].positiveNum
                    : 0}
                  人
                </span>
                ）
              </div>
            </div>
          </div>
        )
      }
    }
  },
  {
    label: '隔离酒店工作人员',
    subTitle: '风险人员监测数',
    crowdCode: '10',
    monitorTotal: 0,
    render: {
      functional: true,
      props: {
        row: {}
      },
      render(createElement, context) {
        return (
          <div class='traffic'>
            <div>
              临床症状：
              <span class='warn'>
                {context.props.row.symptomList
                  ? context.props.row.symptomList[0].symptomNum
                  : 0}
                人
              </span>
            </div>
            <div class='items'>
              <div>
                未检测：
                <span class='warn'>
                  {context.props.row.symptomList
                    ? context.props.row.symptomList[0].noTestNum
                    : 0}
                  人
                </span>
              </div>
              <div>
                阳性：
                <span class='warn'>
                  {' '}
                  {context.props.row.symptomList
                    ? context.props.row.symptomList[0].positiveNum
                    : 0}
                  人
                </span>
              </div>
            </div>
          </div>
        )
      }
    }
  }
]
// 重点人员， 底部数据
const importantBottomArr = [
  {
    label: '来自中高风险地区人员',
    subTitle: '风险人员监测数',
    crowdCode: '4',
    monitorTotal: 7391
  },
  {
    label: '从事冷链工作人员',
    subTitle: '风险人员监测数',
    crowdCode: '3',
    monitorTotal: 281
  },
  {
    label: '口岸工作人员',
    subTitle: '风险人员监测数',
    crowdCode: '2',
    monitorTotal: 217
  },
  {
    label: '入境人员',
    subTitle: '风险人员监测数',
    crowdCode: '8',
    monitorTotal: 2075
  },
  {
    label: '密切接触者监测',
    subTitle: '风险人员监测数',
    crowdCode: '7',
    monitorTotal: 3631
  }
]

// 航班单独处理
const aircraftArr = [
  {
    label: '监测风险飞机数',
    icon: require('@/assets/images/aircraft.png'),
    monitorTotal: 19,
    unit: '架次',
    gatherCode: '1',
    left: 19,
    right: 2,
    arr: [
      { left: 0, right: 0 },
      { left: 0, right: 0 }
    ]
  }
]

// 交通工具
const vehicleArr = [
  {
    label: '监测风险火车数',
    icon: require('@/assets/images/train.png'),
    monitorTotal: 728,
    unit: '车次',
    gatherCode: '3',
    left: 728,
    right: 0,
    legend: '火车'
  },
  {
    label: '监测风险轮船数',
    icon: require('@/assets/images/ship.png'),
    monitorTotal: 173,
    unit: '船次',
    gatherCode: '2',
    left: 173,
    right: 0,
    legend: '轮船'
  }
]
// 托幼单独处理
const schoolArr = [
  {
    label: '托幼+学校风险监测',
    monitorTotal: 238,
    icon: require('@/assets/images/school.png'),
    gatherCode: '8',
    arr: [
      { left: 0, right: 0, label: '' },
      { left: 0, right: 0 },
      { left: 0, right: 0 }
    ]
  }
]

// 机构
const orgArr = [
  {
    label: '养老福利机构',
    monitorTotal: 147,
    icon: require('@/assets/images/welfare.png'),
    gatherCode: '6'
  },
  {
    label: '精神专科医院',
    monitorTotal: 456,
    icon: require('@/assets/images/hospital.png'),
    gatherCode: '4'
  },
  {
    label: '监管机构',
    monitorTotal: 124,
    icon: require('@/assets/images/org.png'),
    gatherCode: '7'
  },
  {
    label: '农贸市场',
    monitorTotal: 421,
    icon: require('@/assets/images/market.png'),
    gatherCode: '5'
  }
]

export default {
  mapTop,
  earlyTopArr,
  earlyWarning,
  importantTopArr,
  importantBottomArr,
  vehicleArr,
  orgArr,
  aircraftArr,
  schoolArr
}
