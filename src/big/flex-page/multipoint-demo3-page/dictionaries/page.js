// 页面中间顶部数据
const mapTop = [
  {
    label: '累计确诊病例',
    value: 'num1',
    diff: 'num11'
  },
  {
    label: '现有确诊病例',
    value: 'num2',
    diff: 'num22'
  },
  {
    label: '今日新增无症状感染者',
    value: 'num3',
    diff: 'num33'
  },
  {
    label: '今日新增疑似病例',
    value: 'num4',
    diff: 'num44'
  }
]
const earlyTopArr = [
  {
    label: '呼吸道症候群监测',
    icon: require('@/assets/images/warning_red.png'),
    syndromeCode: '1',
    monitorTotal: 93,
    left: 93,
    right: 120
  },
  {
    label: '腹泻症候群预警',
    icon: require('@/assets/images/warning_red.png'),
    syndromeCode: '2',
    monitorTotal: 35,
    left: 35,
    right: 42
  },
  {
    label: '发热症候群预警',
    icon: require('@/assets/images/warning_red.png'),
    syndromeCode: '3',
    monitorTotal: 72,
    left: 72,
    right: 96
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
  online: {
    title: '网络舆情热点关注',
    type: 'network',
    monitorTotal: 0
  },
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
    crowdCode: '2',
    monitorTotal: 217,
    render: {
      functional: true,
      props: {
        row: {}
      },
      render(createElement, context) {
        console.log(context.props.row)
        return (
          <div class='traffic'>
            <div>
              临床症状：
              <span class='warn'>{context.props.row.positiveNum || 0}人</span>
            </div>
            <div class='items'>
              <div>
                已检测：<span class='warn'>217人</span>
              </div>
              <div>
                阳性：
                <span class='warn'>{context.props.row.symptomNum || 0}人</span>
              </div>
            </div>
          </div>
        )
      }
    }
  },
  {
    label: '来自香港的货车司机/接驳司机',
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
    crowdCode: '4',
    monitorTotal: 7391
  },
  {
    label: '从事冷链工作人员',
    crowdCode: '3',
    monitorTotal: 281
  },
  {
    label: '口岸工作人员',
    crowdCode: '2',
    monitorTotal: 217
  },
  {
    label: '入境人员',
    crowdCode: '8',
    monitorTotal: 2075
  },
  {
    label: '密切接触者监测',
    crowdCode: '7',
    monitorTotal: 3631
  }
]
// 交通工具
const vehicleArr = [
  {
    label: '监测航班数',
    icon: require('@/assets/images/aircraft.png'),
    monitorTotal: 19,
    unit: '架次',
    gatherCode: '1',
    left: 19,
    right: 2
  },
  {
    label: '监测火车数',
    icon: require('@/assets/images/train.png'),
    monitorTotal: 728,
    unit: '车次',
    gatherCode: '3',
    left: 728,
    right: 0
  },
  {
    label: '监测轮船数',
    icon: require('@/assets/images/ship.png'),
    monitorTotal: 173,
    unit: '船次',
    gatherCode: '2',
    left: 173,
    right: 0
  }
]
// 机构
const orgArr = [
  {
    label: '托幼+学校',
    monitorTotal: 238,
    icon: require('@/assets/images/school.png'),
    gatherCode: '8'
  },
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
  orgArr
}
