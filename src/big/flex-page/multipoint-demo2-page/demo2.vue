<template>
  <div class="container">
    <!-- demo演示2 -->
    <div class="early box-border">
      <div class="title">早期预警</div>
      <div class="item-title">症状监测预警</div>
      <div
        v-for="(v, i) in earlyTopArr"
        :key="i"
        :class="getClass(`msg-item syndrome syndrome-${i}`, v.warnLevel)"
      >
        <div class="left">
          <div class="icon">
            <img :src="v.icon" alt="">
          </div>
          <div class="item">
            <div class="value">
              <v-number
                v-model="v.monitorTotal"
                :speed="speed"
                :style="{
                  color: '#00d7ec',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="label">{{ v.label }}</div>
          </div>
        </div>
        <svg-icon icon-class="line" class="content-line" />
        <template v-if="i === 0">
          <div class="right">
            <div v-for="(j, i) in 1" :key="i" class="right-item">
              <div class="barWarp">
                <line-bar
                  :case-nation-week="[v.left, v.right]"
                  :value-style="{ top: '-20px' }"
                />
              </div>
              <span>呼吸道疾病同期比</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="right">
            <span class="aa-label">同期比</span>
            <diff-bar :case-nation-week="[v.left, v.right]" />
          </div>
        </template>
      </div>
      <template v-for="(v, i) in earlyWarning">
        <template v-if="v.title === '网络舆情热点关注'">
          <div :key="`${i}-title`" class="item-title">{{ v.title }}</div>
          <div :key="`${i}-value`" :class="getClass('msg-item env nomal-item')">
            <div class="block">
              <legend-ring-chart
                :import-country="[{ value: 63 }, { value: 37 }]"
                :color="['yellow', 'rgba(255,255,255,.2)']"
              />
              <div class="chartText">新冠肺炎</div>
            </div>
            <!-- <svg-icon icon-class="line" class="content-line" /> -->
            <div class="block">
              <legend-ring-chart
                :import-country="[{ value: 71 }, { value: 29 }]"
                :color="['yellow', 'rgba(255,255,255,.2)']"
              />
              <div class="chartText">隔离酒店</div>
            </div>
            <!-- <svg-icon icon-class="line" class="content-line" /> -->
            <div class="block">
              <legend-ring-chart
                :import-country="[{ value: 35 }, { value: 65 }]"
                :color="['green', 'rgba(255,255,255,.2)']"
              />
              <div class="chartText">口罩</div>
            </div>
            <!-- <svg-icon icon-class="line" class="content-line" /> -->
            <div class="block">
              <legend-ring-chart
                :import-country="[{ value: 85 }, { value: 15 }]"
                :color="['yellow', 'rgba(255,255,255,.2)']"
              />
              <div class="chartText">新冠疫苗</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div :key="`${i}-title`" class="item-title">{{ v.title }}</div>
          <div :key="`${i}-value`" :class="getClass('msg-item env nomal-item')">
            <div class="left">
              <div class="item">
                <div class="value">
                  <v-number
                    v-model="v.monitorTotal"
                    :speed="speed"
                    :style="{
                      color: '#00d7ec',
                      font: 'bold 3.6rem ds_digi'
                    }"
                  />
                </div>
                <div class="label">{{ v.label }}</div>
              </div>
            </div>
            <svg-icon icon-class="line" class="content-line" />
            <div class="right">
              <component :is="v.render" />
            </div>
          </div>
        </template>
      </template>
    </div>
    <div class="content box-border">
      <div class="top">
        <div class="content-t-item">
          <ring-chart class="animation-chart" />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">累计确诊病例</div>
              <v-number
                v-model="num1"
                :speed="speed"
                :style="{
                  color: '#00d7ec',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="content-t-right">
              <div class="label">较昨日</div>
              <div class="value">
                <!-- {{
                  totalCaseFrontData.today.total_case -
                  totalCaseFrontData.yesterday.total_case
                }} -->
                {{ num11 }}
              </div>
            </div>
          </div>
        </div>
        <div class="content-t-item">
          <ring-chart class="animation-chart" />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">现有确诊病例</div>
              <v-number
                v-model="num2"
                :speed="speed"
                :style="{
                  color: '#00d7ec',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="content-t-right">
              <div class="label">较昨日</div>
              <div class="value">
                <!-- {{
                  totalCaseFrontData.today.total_case_active -
                  totalCaseFrontData.yesterday.total_case_active
                }} -->
                {{ num22 }}
              </div>
            </div>
          </div>
        </div>
        <div class="content-t-item">
          <ring-chart class="animation-chart" />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">今日新增无症状感染者</div>
              <v-number
                v-model="num3"
                :speed="speed"
                :style="{
                  color: '#00d7ec',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="content-t-right">
              <div class="label">较昨日</div>
              <div class="value">
                <!-- {{
                  totalCaseFrontData.today.new_case_asymptomatic -
                  totalCaseFrontData.yesterday.new_case_asymptomatic
                }} -->
                {{ num33 }}
              </div>
            </div>
          </div>
        </div>
        <div class="content-t-item">
          <ring-chart class="animation-chart" />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">今日新增疑似病例</div>

              <v-number
                v-model="num4"
                :speed="speed"
                :style="{
                  color: '#00d7ec',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="content-t-right">
              <div class="label">较昨日</div>
              <div class="value">
                <!-- {{
                  totalCaseFrontData.today.new_case_uncertain -
                  totalCaseFrontData.yesterday.new_case_uncertain
                }} -->
                {{ num44 }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="map box-container">
        <!-- <province-map :data="addressList" /> -->
        <echarts-map :data="addressList" @detail="detailShow" />
      </div>
    </div>
    <div class="important box-border">
      <div class="title">重点人群</div>
      <template v-for="(v, i) in importantTopArr">
        <div :key="`${i}-label`" class="item-title">
          {{ v.label }}
        </div>
        <div
          :key="`${i}-value`"
          :class="getClass('msg-item important-item nomal-item', v.warnLevel)"
          @click="modalShow(v)"
        >
          <div class="left">
            <div class="item">
              <div class="value">
                <v-number
                  v-model="v.monitorTotal"
                  :speed="speed"
                  :style="{
                    color: '#00d7ec',
                    font: 'bold 3.6rem ds_digi'
                  }"
                />
              </div>
              <div class="label">监测总人数</div>
            </div>
          </div>
          <svg-icon icon-class="line" class="content-line" />
          <div class="right">
            <component :is="v.render" :row="v" />
          </div>
        </div>
      </template>
      <div class="items">
        <div v-for="(v, i) in importantBottomArr" :key="i" class="import-item">
          <div class="item-title">{{ v.label }}</div>
          <div :class="getClass('text', v.warnLevel)" @click="modalShow(v)">
            <div class="value">
              <v-number
                v-model="v.monitorTotal"
                :speed="speed"
                :style="{
                  color: '#00d7ec',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="label">监测总人数</div>
          </div>
        </div>
      </div>
    </div>
    <div class="gather box-border">
      <div class="title">聚集性预警</div>
      <div class="item-title">交通工具聚集性</div>
      <div class="gather-item vehicle">
        <div class="left">
          <div
            v-for="(v, i) in vehicleArr"
            :key="i"
            :class="getClass('item', v.warnLevel)"
          >
            <div class="icon">
              <img :src="v.icon" alt="">
            </div>
            <div class="label">{{ v.label }}</div>
            <div class="value">{{ v.monitorTotal }}{{ v.unit }}</div>
          </div>
        </div>
        <svg-icon icon-class="line" class="content-line" />
        <div class="right">
          <div class="legend">
            <div class="item">
              <div class="block" />
              监测班次
            </div>
            <div class="item">
              <div class="block" />
              确诊班次
            </div>
          </div>
          <div class="vehicle-chart">
            <div
              v-for="(j, i) in ['飞机', '火车', '轮船']"
              :key="i"
              class="right-item"
            >
              <div class="barWarp">
                <line-bar
                  :case-nation-week="[vehicleArr[i].left, vehicleArr[i].right]"
                  :value-style="{ top: '-20px' }"
                />
              </div>
              <span>{{ j }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="item-title">机构聚集性</div>
      <div class="gather-item org">
        <div
          v-for="(v, i) in orgArr"
          :key="i"
          :class="getClass('item', v.warnLevel)"
        >
          <div class="icon">
            <img :src="v.icon" alt="">
          </div>
          <div class="label">{{ v.label }}</div>
          <div class="value">监测{{ v.monitorTotal }}所</div>
        </div>
      </div>
      <div class="gather-chart">
        <!-- <bar-chart /> -->
      </div>
    </div>

    <el-dialog
      v-if="dialogVisible"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      class="new-multipoint"
    >
      <div class="modal-container">
        <div class="left">
          <div
            v-for="(v, i) in list"
            :key="i"
            :class="{ item: true, active: i === activeIndex }"
          >
            <div class="img">
              <img
                :src="v.image"
                alt=""
                :onerror="
                  `this.src='${require('@/assets/images/default-head.jpg')}'`
                "
              >
            </div>
            <div class="info">
              <div
                v-for="(val, idx) in [
                  { label: '姓名', field: 'name' },
                  { label: '性别', field: 'gender' },
                  { label: '国籍', field: 'country' },
                  { label: '证件类型', field: 'cardType' },
                  {
                    label: '证件号',
                    field: 'cardId',
                    render: data => {
                      return dataDesensitization(data.cardId, 10, 6);
                    }
                  },
                  { label: '就诊医院', field: 'hospital' },
                  { label: '检测时间', field: 'testDate' },
                  {
                    label: '检测结果',
                    field: 'testResult',
                    render: data => {
                      return data.testResult ? data.testResult : '未检测';
                    }
                  },
                  {
                    label: '购药记录',
                    field: 'medicineEx',
                    render: data => {
                      return Number(data.medicineEx) === 0 ? '有' : '无';
                    }
                  },
                  { label: '临床症状', field: 'symptom' },
                  {
                    label: '触发规则',
                    field: 'personWarnEventList',
                    style: { color: '#1491ff' },
                    render: data => {
                      return data.personWarnEventList
                        .map(v => v.eventRule)
                        .join(',');
                    }
                  }
                ]"
                :key="idx"
                class="info-item"
              >
                <div class="label">{{ val.label }}</div>
                <div class="value" :style="val.style">
                  {{ val.render ? val.render(v) : v[val.field] }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <aggregation-test :data="selectData" />
        </div>
      </div>
    </el-dialog>

    <el-dialog
      v-if="dialogDetailVisible"
      :visible.sync="dialogDetailVisible"
      :append-to-body="true"
      class="new-multipoint-detail"
    >
      <div class="modal-container">
        <aggregation-test :data="selectData" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { VNumber } from '@maxflex/v-number'
import RingChart from './components/RingChart'
import AggregationTest from './components/AggregationTest'
import DiffBar from './components/DiffBar'
import LineBar from './components/LineBar'
import LegendRingChart from './components/LegendRingChart'
import EchartsMap from './components/EchartsMap'

// import dayjs from "dayjs";
import { dataDesensitization } from '@/utils/index'

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
const earlyBottomArr = [
  {
    title: '环境采样监测预警',
    label: '冷链监测总数',
    type: 'env',
    monitorTotal: 0
  },
  {
    title: '网络舆情热点关注',
    type: 'network',
    monitorTotal: 0
  },
  {
    title: '药店销售监测预警',
    label: '近7日退烧药购买记录',
    type: 'medicine',
    monitorTotal: 0
  }
]
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
        // <p class="rightContent">广东市南沙仓库，第23890808批次物品阳性；</p>
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
    title: '药店销售监测预警',
    label: '近7日退烧药购买记录',
    type: 'medicine',
    monitorTotal: 174,
    render: {
      functional: true,
      props: {},
      render() {
        // 广州市，白云区康健药店退热药销售高于同期水平；
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
    crowdCode: '1',
    monitorTotal: 0,
    render: {
      functional: true,
      props: {
        row: {}
      },
      render(createElement, context) {
        // <div class="item1">
        //       <div>
        //         今日风险值：<span>0</span>
        //       </div>
        //       <div>
        //         风险变化值：<span>0</span>
        //       </div>
        //     </div>
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
    label: '托幼机构+学校学生监测',
    crowdCode: '6',
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
    label: '解除医学观察人员',
    crowdCode: '5',
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
  components: {
    RingChart,
    // ProvinceMap,
    VNumber,
    AggregationTest,
    EchartsMap,
    DiffBar,
    LineBar,
    // BarChart,
    LegendRingChart
  },
  data() {
    return {
      count_date: '2020-12-20',
      totalCaseFrontData: {
        today: {
          total_case: '',
          total_case_active: '',
          new_case_asymptomatic: '',
          new_case_uncertain: ''
        },
        yesterday: {
          total_case: '',
          total_case_active: '',
          new_case_asymptomatic: '',
          new_case_uncertain: ''
        }
      },
      speed: 500,
      earlyTopArr,
      earlyBottomArr,
      earlyWarning,
      importantTopArr,
      importantBottomArr,
      vehicleArr,
      orgArr,
      dialogVisible: false,
      dialogDetailVisible: false,
      addressList: [
        {
          longitude: 113.465428,
          latitude: 22.892045,
          placeName: '东涌普琳酒店',
          address: '广东南沙区东涌普琳酒店',
          organizationName: '广州市疾控中心',
          warnLevel: '4',
          type: 1,
          message: '已推送至流调系统'
        },
        {
          longitude: 114.465428,
          latitude: 23.892045,
          placeName: '东涌普琳酒店',
          address: '广东南沙区东涌普琳酒店',
          organizationName: '广州市疾控中心',
          warnLevel: '4',
          type: 2,
          message: '已推送至流调系统'
        }
      ],
      selectData: {},
      list: [],
      activeIndex: 0,
      num1: 2029,
      num11: '+1',
      num2: 41,
      num22: 0,
      num3: 1,
      num33: '+1',
      num4: 0,
      num44: 0
    }
  },
  mounted() {
    let timer = null
    timer = setInterval(() => {
      this.init()
    }, 3000)
    // 销毁动态事件
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
      timer = null
    })
  },
  methods: {
    dataDesensitization,
    getClass(classes, level) {
      classes = classes.split(' ')
      const strLevel = String(level)
      if (strLevel === '1' || strLevel === '2') {
        return [...classes, 'msg-waring']
      }
      if (strLevel === '3' || strLevel === '4') {
        return [...classes, 'msg-error']
      }
      return [...classes]
    },
    init() {
      // this.addressList = [];
      // this.importantList();
    },
    // 重点人群查询
    importantList() {
      return
    },
    // 设置地图信息
    setAddressList(data) {
      return
    },
    modalShow(data) {
      return
    },
    detailShow(data) {
      this.selectData = {
        name: '吴玲',
        gender: '女',
        age: 31,
        birthday: '1989-03-29',
        country: '中国',
        cardType: '身份证号',
        cardId: '440981198903295440',
        phone: '18022421850',
        area: '南沙区',
        address: '南沙区东涌濠涌上街 96 号三楼 301 房',
        workplace: '南沙区东涌镇隔离酒店普琳酒店',

        // 寒颤、头晕

        crowdCode: '7',
        testDate: '2020-12-20',
        testResult: '阳性',
        hospital: '南沙区第二人民医院',

        symptom: '体温 37.1℃，回家后自服小柴胡颗粒，未到医院诊',
        presentIllnessHistory: '无咳嗽、胸闷、气促，生命体征平稳，精神状态较好',
        chiefComplaint: '头痛',
        underMicroscope: '',

        closePersonListData: [
          {
            name: '某某辉',
            closeRelation: '患者家属：其子',
            job: '学生',
            cardId: '440981201503295420',
            phone: '',
            address: '南沙区东涌濠涌上街 96 号三楼 301 房'
          },
          {
            name: '某某枫',
            closeRelation: '患者家属：其女',
            job: '学生',
            cardId: '440981201803295412',
            phone: '',
            address: '南沙区东涌濠涌上街 96 号三楼 301 房'
          },
          {
            name: '叶某玲',
            closeRelation: '患者吴玲同事',
            job: '酒店服务人员',
            cardId: '440981198903295489',
            phone: '18022421850',
            address: '南沙区东涌镇隔离酒店普琳酒店'
          },
          {
            name: '叶某玲',
            closeRelation: '患者吴玲同事',
            job: '酒店服务人员',
            cardId: '440981198903295427',
            phone: '18022421850',
            address: '南沙区东涌镇隔离酒店普琳酒店'
          },
          {
            name: '曾某林',
            closeRelation: '患者吴玲同事',
            job: '酒店服务人员',
            cardId: '440981199101165275',
            phone: '18703981506',
            address: '南沙区东涌镇隔离酒店普琳酒店'
          },
          {
            name: '陆某',
            closeRelation: '患者吴玲同事',
            job: '酒店服务人员',
            cardId: '440981198308195897',
            phone: '18098301293',
            address: '南沙区东涌镇隔离酒店普琳酒店'
          },
          {
            name: '冯某芳',
            closeRelation: '患者吴玲同事',
            job: '酒店服务人员',
            cardId: '440981198607155429',
            phone: '18849243927',
            address: '南沙区东涌镇隔离酒店普琳酒店'
          },
          {
            name: '孙某成',
            closeRelation: '患者吴玲同事',
            job: '酒店服务人员',
            cardId: '440981198706032740',
            phone: '18629403176',
            address: '南沙区东涌镇隔离酒店普琳酒店'
          }
        ],

        medicineRecordList: []
      }
      this.dialogDetailVisible = true
      return
      // const { name, cardId } = data;
      // Promise.all([
      //   getPersonnelInfo({ name, cardId }),
      //   getClosePersonList({ name, cardId, page: 1, limit: 10 }),
      // ]).then((res) => {
      //   const getPersonnelInfoData = res[0].data;
      //   const getClosePersonListData = res[1].data;
      //   this.selectData = getPersonnelInfoData;
      //   this.dialogDetailVisible = true;
      //   this.selectData.closePersonListData = getClosePersonListData;
      // });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

// 元素间距
$boxSpace: calc((100% - #{getWidth(58.44 * 3)} - #{getWidth(42.25 * 4)}) / 8);

.container {
  padding: $boxSpace;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  > div + div {
    margin-left: $boxSpace;
  }
}

// 左右两侧内容
.early,
.important,
.gather {
  flex: none;
  width: getWidth(58.44);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  .title {
    width: 100%;
    height: getHeight(5.81 + 0.38);
    background: #212342;
    padding: 0 getWidth(2.06);
    flex: none;
    display: flex;
    align-items: center;

    font-size: $itemTitleSize;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #ffffff;

    // position: relative;
    position: sticky;
    top: 0;
    z-index: 1;
    &::after {
      position: absolute;
      content: "";
      top: 0;
      left: 0;
      width: 100%;
      height: getHeight(0.38);
    }
  }
}
.early {
  .title::after {
    background: linear-gradient(101deg, #ffa83b 0%, #ffea00 100%);
  }

  .syndrome {
    display: flex;
    flex-direction: row;

    .content-line {
      height: 100%;
      margin: 0 getWidth(3.44);
    }
    .left {
      flex: 13;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 getWidth(3.5);
      > .icon {
        width: getWidth(7.88);
        height: getHeight(7.88);
        margin-right: getWidth(2.8);
        > img {
          width: 100%;
          height: 100%;
        }
      }
      > .item {
        display: flex;
        flex-direction: column;
        .label {
          margin-top: getHeight(1.25);
        }
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      flex: 7;
      .right-item {
        display: flex;
        flex-direction: column;
        width: 100%;
        .barWarp {
          flex: 6.94;
        }
        span {
          margin-top: 1rem;
          flex: 1.75;
          height: getHeight(1.75);
          line-height: getHeight(1.75);
          font-family: PingFangSC-Medium;
          font-size: $nomalSmallSize;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: getWidth(0.06);
          color: rgba(255, 255, 255, 1);
        }
      }
    }
  }

  .syndrome-1,
  .syndrome-2 {
    .right {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .aa-label {
        writing-mode: vertical-lr;
        margin: 1rem;
      }
    }
  }

  .env {
    .block {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

.important {
  .traffic,
  .mechanism {
    margin-left: getWidth(2);
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-around;
    font-family: PingFangSC-Medium;
    font-size: $nomalSize;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: #ffffff;
    .warn {
      color: #ff3d7d;
    }
  }
  .traffic .items {
    div:nth-child(1) {
      margin-right: getWidth(10);
    }
  }
  .mechanism {
    .item1 {
      display: flex;
      div:nth-child(1) {
        margin-right: getWidth(2);
      }
    }
    .item2 {
      display: flex;
      div:nth-child(2) {
        span:nth-child(1) {
          margin-right: getWidth(1);
        }
      }
    }
  }
  .title::after {
    background: linear-gradient(270deg, #ffe900 0%, #f52b7b 100%);
  }

  .items {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    > .import-item + .import-item {
      margin-left: getWidth(1);
    }
    > .import-item {
      width: calc((100% - #{getWidth(2)}) / 3);
      border-radius: getHeight(0.25) getWidth(0.25);
      margin-top: getHeight(1.1);
      &:nth-child(3n + 1) {
        margin-left: 0;
      }

      .item-title {
        background-color: #212342;
      }

      > .text {
        margin-top: getHeight(1);
        background-color: #212342;
        height: getHeight(10.63);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 getWidth(2.44);

        .label {
          font-family: PingFangSC-Medium;
          font-size: $nomalSize;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: rgba(255, 255, 255, 0.8);
          margin-top: getHeight(1.25);
        }
      }
    }
  }
}
.gather {
  .title::after {
    background: linear-gradient(80deg, #f52b7b 0%, #ff8375 100%);
  }

  .gather-item {
    width: 100%;
    height: getHeight(19.06);
    background-color: #212342;
    margin-top: getHeight(1);
  }

  .gather-item.vehicle {
    display: flex;
    justify-content: space-between;
    .content-line {
      height: 100%;
      margin: 0 getWidth(2);
    }
    > .left,
    > .right {
      width: 50%;
    }
    > .left {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      > .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: rgba(255, 255, 255, 0.9);
        padding: 0 getWidth(2);
      }
    }
  }

  .gather-item.org {
    display: flex;
    flex-wrap: wrap;
    > .item {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 getWidth(2);

      font-family: PingFangSC-Medium;
      font-size: $nomalSize;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: rgba(255, 255, 255, 0.9);
    }
  }

  .gather-chart {
    width: 100%;
    height: getHeight(35.25);
    background-color: #212342;
    margin-top: getHeight(1);
  }
  .right {
    display: flex;
    justify-content: space-around;
    // flex: 7;
    .right-item {
      margin-top: getHeight(2);
      display: flex;
      flex-direction: column;
      width: 20%;
      .barWarp {
        flex: 9.44;
      }
      span {
        flex: 1.75;
        height: getHeight(1.75);
        line-height: getHeight(1.75);
        text-align: center;
        font-family: PingFangSC-Medium;
        font-size: $nomalSmallSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: getWidth(0.06);
        color: rgba(255, 255, 255, 0.5);
      }
    }
  }
}

//  中间内容
.content {
  width: 100%;
  display: flex;
  flex-direction: column;

  .top {
    display: flex;
    justify-content: space-between;
    height: getHeight(12.38);
    flex: none;
    overflow: hidden;

    .content-t-item + .content-t-item {
      margin-left: $boxSpace;
    }

    .content-t-item {
      flex: none;
      width: getWidth(42.25);
      background: #212342;
      padding: getHeight(1.2) getWidth(1.2);
      display: flex;

      position: relative;
      &::after {
        position: absolute;
        content: "";
        top: 0;
        left: 0;
        width: 100%;
        height: getHeight(0.38);
        background: linear-gradient(262deg, #0099ff 0%, #00ecff 100%);
      }

      .echarts {
        width: getHeight(12.38 - 1.2 * 2);
        height: getHeight(12.38 - 1.2 * 2);
        flex: none;
      }
      .content-t-text {
        width: 100%;
        margin-left: getWidth(1.5);
        display: flex;
        justify-content: space-between;

        .content-t-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .label {
            font-size: $itemTitleSize;
            font-family: PingFang-SC-Heavy, PingFang-SC;
            font-weight: 800;
            color: #ffffff;
          }
          .value {
            font-family: ds_digi;
            font-size: $digiFontSize;
            font-weight: bold;
            color: #00d7ec;
          }
        }
        .content-t-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .label {
            font-size: $itemTitleSize;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #ffffff;
          }
          .value {
            font-size: $nomalSize;
            font-family: Arial-Black, Arial;
            font-weight: 800;
            color: #ffffff;
            background: linear-gradient(53deg, #f52b7b 0%, #ffe900 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        }
      }
    }
  }

  .map {
    width: 100%;
    height: 100%;
    position: relative;
  }
}

// 左边有标题
.item-title {
  // width: getWidth(58.38);
  width: 100%;
  height: getHeight(3.62);
  background: #212342;
  margin-top: getHeight(1.94);
  line-height: getHeight(3.62);
  padding-left: getWidth(0.88);

  font-size: $itemTitleSize;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: rgba(#fff, 0.9);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  position: relative;
  &::after {
    position: absolute;
    content: "";
    width: getWidth(0.36);
    height: 100%;
    background: #ffe703;
    left: 0;
    top: 0;
  }
}

// 右上角
.msg-item {
  margin-top: getHeight(0.75);
  width: getWidth(58.38);
  min-height: getHeight(11.63);
  padding: getHeight(1.2) getWidth(1.2);
  background: #212342;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .num {
    margin-right: getWidth(2);
  }

  .label {
    font-size: $nomalSize;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: getHeight(0.6);

    display: flex;
    justify-content: space-between;

    > span:nth-child(2) {
      user-select: none;
      cursor: pointer;
    }
  }

  font-size: $nomalSmallSize;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.msg-error,
.msg-waring {
  // // 边框
  // border: getWidth(0.25) solid;
  // clip-path: inset(0 round getWidth(0.25));
  // width: getWidth(58.38 - 0.25 * 2);
  // min-height: getHeight(8.88 - 0.25 * 2);
  // 角标
  position: relative;
  &:after {
    position: absolute;
    content: "\e7a3";
    font-family: element-icons !important;
    color: #fff;
    font-size: 34px;
    padding-left: getWidth(2);
    padding-bottom: getWidth(1.4);
    width: getWidth(6);
    height: getWidth(6);
    top: getWidth(-0.25);
    right: getWidth(-0.25);
    border-radius: getWidth(0.25);
  }
}
// 核酸检测阳性
.msg-error {
  border-image: linear-gradient(
      45deg,
      rgba(255, 124, 110, 1),
      rgba(245, 43, 123, 1)
    )
    1;
  &:after {
    background: linear-gradient(
      to top right,
      transparent 0%,
      transparent 50%,
      rgba(255, 124, 110, 1) 50%,
      rgba(245, 43, 123, 1) 100%
    );
    animation: hue 1s infinite ease-in-out;
  }
}
// 有异常， 未检测核酸
.msg-waring {
  border-image: linear-gradient(
      45deg,
      rgba(255, 168, 59, 1),
      rgba(255, 168, 59, 1)
    )
    1;
  &:after {
    background: linear-gradient(
      to top right,
      transparent 0%,
      transparent 50%,
      rgba(255, 168, 59, 1) 50%,
      rgba(255, 168, 59, 1) 100%
    );
    animation: hue 1s infinite ease-in-out;
  }
}
@keyframes hue {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

// 普通框样式
.nomal-item {
  display: flex;
  flex-direction: row;
  > .content-line {
    height: 100%;
  }
  .left {
    flex: 27;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > .item .label {
      margin-top: getHeight(1.2);
    }
  }
  .block {
    flex: 1;
    height: 100%;
    width: 100%;
    .chartText {
      margin-bottom: getWidth(1);
    }
    // padding-left: 1.85rem;
  }
  .right {
    flex: 73;
    margin-left: getWidth(3.75);
    margin-top: getHeight(2);
    .rightTitle {
      font-family: PingFangSC-Medium;
      font-size: 1.5rem;
      margin-bottom: getHeight(2);
    }
    .more {
      font-family: PingFangSC-Medium;
      font-size: 1.31rem;
      color: rgba(31, 183, 255, 0.9);
      cursor: pointer;
      margin-left: getWidth(13);
    }
    .red {
      color: rgba(255, 61, 125, 0.8);
    }
    .yellow {
      color: rgba(255, 224, 9, 0.8);
    }
    .rightContent {
      font-family: PingFangSC-Medium;
      font-size: 1.31rem;
      color: rgba(255, 255, 255, 0.9);
    }
  }
}
.vehicle {
  .right {
    display: flex;
    flex-direction: column;
    padding: 1rem 0;
    position: relative;
    .legend {
      position: absolute;
      top: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > .item {
        margin-left: getWidth(1);
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        color: rgba(255, 255, 255, 0.9);
        display: flex;
        align-items: center;

        .block {
          width: 2.8rem;
          height: 1.4rem;
          border-radius: 0.4rem;
          margin-right: getWidth(0.5);
        }
        &:nth-child(1) .block {
          background-image: linear-gradient(174deg, #ffa83b 0%, #ffea00 100%);
        }
        &:nth-child(2) .block {
          background-image: linear-gradient(0deg, #f52b7b 0%, #ff7c6e 100%);
        }
      }
    }
    .vehicle-chart {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      height: 100%;
      margin-top: 1rem;
    }
  }
}
</style>
<style lang="scss">
$fontSize: 0.88rem;
$height: 1.38rem;
.new-multipoint > .el-dialog {
  // width: 15%;
  width: 1920px;
  height: 1080px;
  margin: 0 auto;
  margin-top: 30rem !important;
  background: #212342;
  padding: 0;
  // height: 50%;
  // background-color: blue;

  .modal-container {
    display: flex;
  }
  .left,
  .right {
    width: 50%;
  }
  .left {
    display: flex;
    flex-direction: column;
    > .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(39, 51, 88, 0.829);

      > .img {
        // width: getWidth(180);
        // height: getWidth(180);
        width: 5rem;
        height: 4.25rem;
        border-radius: 0.06rem;
        margin-right: 1rem;
        flex: none;
        > img {
          width: 100%;
          height: 100%;
          flex: none;
        }
      }

      .info {
        display: flex;
        flex-wrap: wrap;
        > .info-item {
          width: 33.33%;
          padding: 0 2%;
          margin-top: 0.2rem;
          display: flex;
          justify-content: space-between;
          color: #fff;
        }
      }
    }
    > .active {
      background-color: #131627;
    }
  }
  .right {
    background-color: #131627;
    padding: 1rem;
  }
}
.new-multipoint-detail > .el-dialog {
  // width: 15%;
  width: 960px;
  height: 1080px;
  margin: 0 auto;
  margin-top: 30rem !important;
  background: #212342;
  padding: 0;
  // height: 50%;
  // background-color: blue;

  .modal-container {
    display: flex;
  }
  .left,
  .right {
    width: 50%;
  }
}
.new-multipoint .el-table__empty-block,
.new-multipoint-detail > .el-table__empty-block {
  background-color: #212342;
}
// 分页器 页面尺寸样式
.page-size-popper {
  border: 0.06rem solid #545675;

  .el-select-dropdown__list {
    background: #212342;
    color: #fff;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__item.selected {
    background: #151635;
    color: rgba(0, 232, 255, 1);
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: rgba(#151635, 0.4);
  }
}
.new-multipoint-detail-yuqing {
  width: 940px;
  height: 400px;
  .el-notification__content {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    > p > img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
