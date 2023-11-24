<template>
  <div class="container">
    <div class="content box-container">
      <div class="left box-container">
        <div class="lt-item box-container">
          <div class="title">
            <div class="triangle" />
            <span>最近一周输入个案情况</span>
          </div>
          <div class="sub">
            <diff-bar2 :new-case-week="filterData.newCaseWeek" />
          </div>
        </div>

        <div class="lc-item box-container">
          <div class="title">
            <div class="triangle" />
            <span>最近一周境外输入个案发现途径</span>
          </div>
          <div class="chart-container">
            <rose-chart :sicksource-week="filterData.sicksourceWeek" />
          </div>
        </div>

        <div class="lb-item box-container">
          <div class="title">
            <div class="triangle" />
            <span>最近一周个案国籍分布</span>
          </div>
          <div class="chart-container">
            <diff-bar :case-nation-week="guangDongData.caseNationWeek" />
          </div>
        </div>
      </div>
      <div class="center box-container">
        <div class="top-operation">
          <input id="radio1" v-model="picked" type="radio" name value="import">
          <input id="radio2" v-model="picked" type="radio" name value="local">
          <input id="radio3" v-model="picked" type="radio" name value="outter">
          <label for="radio1">境外输入</label>
          <label for="radio2">本地感染</label>
          <label for="radio3">省外输入</label>
        </div>
        <center
          :new-case="filterData.filterCaseData"
          :case-month="filterData.caseMonth"
          :news-week="guangDongData.newsWeek"
          :highrisk-case-day="guangDongData.highriskCaseDay"
          :case-distributed="filterData.caseDistributed"
        />
      </div>
      <div class="right box-container">
        <div class="guangdong">
          <div class="title">
            <div class="triangle" />
            <span>境外航班入境来源情况</span>
          </div>
          <div class="chart-container">
            <legend-ring-chart
              :count-country="filterData.importCountry.count"
              :import-country="filterData.importCountry.data"
            />
          </div>
        </div>

        <div class="country">
          <div class="title">
            <div class="triangle" />
            <span>各口岸人群分类情况</span>
          </div>
          <div class="chart-container">
            <compact-bar2 :port-cluster="filterData.portCluster" />
          </div>
        </div>
        <div class="world">
          <div class="title">
            <div class="triangle" />
            <span>入境隔离第N天检测阳性人数</span>
          </div>
          <div class="chart-container">
            <bar-chart2 :isolation-interval="filterData.isolationInterval" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  newCaseDayGD,
  newCaseWeekGD,
  caseDistributedGD,
  caseMonthGD,
  sicksourceWeekGD,
  caseNationWeekGD,
  highriskCaseDayGD,
  newsWeekGD,
  importCountryGD,
  portClusterGD,
  isolationIntervalGD
  // newCaseWeek
} from '@/api/polymerize'
import BarChart2 from './components/BarChart2'
import CompactBar2 from './components/CompactBar2'
import DiffBar from './components/DiffBar'
import DiffBar2 from './components/DiffBar2'
// import RingChart from './components/RingChart'
import LegendRingChart from './components/LegendRingChart'
import RoseChart from './components/RoseChart'
import Center from './components/Center'

export default {
  components: {
    // RingChart,
    LegendRingChart,
    // LineChart,
    BarChart2,
    CompactBar2,
    Center,
    DiffBar,
    DiffBar2,
    RoseChart
  },
  data() {
    return {
      guangDongData: {
        newCaseData: {
          today: [],
          yesterday: []
        },
        newCaseWeek: {},
        caseDistributed: [],
        caseMonth: [],
        sicksourceWeek: [],
        caseNationWeek: [],
        highriskCaseDay: [],
        newsWeek: [],
        importCountry: [],
        portCluster: {},
        isolationInterval: {}
      },
      filterData: {
        filterCaseData: {
          'new-case': {
            count: 0,
            change: 0
          },
          'new-asymptomatic': {
            count: 0,
            change: 0
          },
          'total-case': {
            count: 0,
            change: 0
          },
          'total-asymptomatic': {
            count: 0,
            change: 0
          }
        },
        newCaseWeek: {
          'new-case': {
            count: 0,
            width: 0
          },
          'sum-case': {
            count: 0,
            width: 0
          },
          'new-asymptomatic': {
            count: 0,
            width: 0
          },
          'sum-ratio': {
            count: 0,
            width: 0
          }
        },
        caseMonth: {
          countDate: [],
          data: {
            totalImport: {
              title: '境外输入个案时间分布',
              'total-case': [],
              'total-asymptomatic': []
            },
            totalLocal: {
              title: '本地输入个案时间分布',
              'total-case': [],
              'total-asymptomatic': []
            },
            totalOutter: {
              title: '省外输入个案时间分布',
              'total-case': [],
              'total-asymptomatic': []
            }
          }
        },
        sicksourceWeek: {
          sicksourceData: []
        },
        importCountry: {
          count: 0,
          data: []
        },
        portCluster: {
          'case-isolation': [],
          'case-unisolation': [],
          driver: []
        },
        isolationInterval: [],
        highriskCaseDay: [],
        caseDistributed: []
      },
      picked: 'import'
    }
  },
  watch: {
    picked() {
      this.newCaseDayConfig(this.picked)
      this.newCaseWeekConfig(this.picked)
      this.caseDistributedConfig(this.picked)
    }
  },
  mounted() {
    this.getNewCaseData()
    this.getNewCaseWeek()
    this.getCaseDistributed()
    this.getCaseMonth()
    this.getSicksourceWeek()
    this.getCaseNationWeek()
    this.getHighriskCaseDay()
    this.getNewsWeek()
    this.getImportCountry()
    this.getPortCluster()
    this.getIsolationInterval()
  },
  methods: {
    getNewCaseData() {
      newCaseDayGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.newCaseData = response.data
        this.newCaseDayConfig(this.picked)
      })
    },
    getNewCaseWeek() {
      newCaseWeekGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.newCaseWeek = response.data
        this.newCaseWeekConfig(this.picked)
      })
    },
    getCaseDistributed() {
      caseDistributedGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.caseDistributed = response.data
        this.caseDistributedConfig(this.picked)
      })
    },
    getCaseMonth() {
      caseMonthGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.caseMonth = response.data
        this.caseMonthConfig()
      })
    },
    getSicksourceWeek() {
      sicksourceWeekGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.sicksourceWeek = response.data
        this.sicksourceWeekConfig()
      })
    },
    getCaseNationWeek() {
      caseNationWeekGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.caseNationWeek = response.data
      })
    },
    getHighriskCaseDay() {
      highriskCaseDayGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.highriskCaseDay = response.data
      })
    },
    getNewsWeek() {
      newsWeekGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.newsWeek = response.data
      })
    },
    getImportCountry() {
      importCountryGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.importCountry = response.data
        this.importCountryConfig()
      })
    },
    getPortCluster() {
      portClusterGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.portCluster = response.data
        this.portClusterConfig()
      })
    },
    getIsolationInterval() {
      isolationIntervalGD({ count_date: '2020-12-14' }).then(response => {
        this.guangDongData.isolationInterval = response.data
        this.isolationIntervalConfig()
      })
    },
    newCaseDayConfig(pick) {
      this.filterData.filterCaseData[
        'new-case'
      ].count = this.guangDongData.newCaseData.today['new_case_' + pick]
      this.filterData.filterCaseData[
        'new-asymptomatic'
      ].count = this.guangDongData.newCaseData.today[
        'new_asymptomatic_' + pick
      ]
      this.filterData.filterCaseData[
        'total-case'
      ].count = this.guangDongData.newCaseData.today['total_case_' + pick]
      this.filterData.filterCaseData[
        'total-asymptomatic'
      ].count = this.guangDongData.newCaseData.today[
        'total_asymptomatic_' + pick
      ]

      this.filterData.filterCaseData['new-case'].change =
        this.guangDongData.newCaseData.today['new_case_' + pick] -
        this.guangDongData.newCaseData.yesterday['new_case_' + pick]
      this.filterData.filterCaseData['new-asymptomatic'].change =
        this.guangDongData.newCaseData.today['new_asymptomatic_' + pick] -
        this.guangDongData.newCaseData.yesterday['new_asymptomatic_' + pick]
      this.filterData.filterCaseData['total-case'].change =
        this.guangDongData.newCaseData.today['total_case_' + pick] -
        this.guangDongData.newCaseData.yesterday['total_case_' + pick]
      this.filterData.filterCaseData['total-asymptomatic'].change =
        this.guangDongData.newCaseData.today['total_asymptomatic_' + pick] -
        this.guangDongData.newCaseData.yesterday['total_asymptomatic_' + pick]
    },
    newCaseWeekConfig(pick) {
      let maxWidth = 0
      this.filterData.newCaseWeek[
        'sum-case'
      ].count = this.guangDongData.newCaseWeek['sum_case_' + pick]
      maxWidth = Math.max(
        maxWidth,
        this.filterData.newCaseWeek['sum-case'].count
      )
      this.filterData.newCaseWeek[
        'new-case'
      ].count = this.guangDongData.newCaseWeek['new_case_' + pick]
      maxWidth = Math.max(
        maxWidth,
        this.filterData.newCaseWeek['new-case'].count
      )
      this.filterData.newCaseWeek[
        'new-asymptomatic'
      ].count = this.guangDongData.newCaseWeek['new_asymptomatic_' + pick]
      maxWidth = Math.max(
        maxWidth,
        this.filterData.newCaseWeek['new-asymptomatic'].count
      )
      this.filterData.newCaseWeek[
        'sum-ratio'
      ].count = this.guangDongData.newCaseWeek['sum_' + pick + '_ratio']

      this.filterData.newCaseWeek['sum-case'].width =
        (this.filterData.newCaseWeek['sum-case'].count / maxWidth).toFixed(2) *
        86
      this.filterData.newCaseWeek['new-case'].width =
        (this.filterData.newCaseWeek['new-case'].count / maxWidth).toFixed(2) *
        86
      this.filterData.newCaseWeek['new-asymptomatic'].width =
        (
          this.filterData.newCaseWeek['new-asymptomatic'].count / maxWidth
        ).toFixed(2) * 86
      this.filterData.newCaseWeek['sum-ratio'].width =
        this.filterData.newCaseWeek['sum-ratio'].count > 86
          ? 86
          : this.filterData.newCaseWeek['sum-ratio'].count
    },
    caseDistributedConfig(pick) {
      this.filterData.caseDistributed = []
      for (const item of this.guangDongData.caseDistributed) {
        this.filterData.caseDistributed.push({
          name: item.region,
          'case-2week': item['case_' + pick + '_2week'],
          'total-case': item['total_case_' + pick],
          'case-last': item['case_' + pick + '_last']
        })
      }
    },
    caseMonthConfig() {
      for (const item of this.guangDongData.caseMonth) {
        this.filterData.caseMonth.countDate.push(item.count_date)
        this.filterData.caseMonth.data.totalImport['total-case'].push(
          item.total_case_import
        )
        this.filterData.caseMonth.data.totalImport['total-asymptomatic'].push(
          item.total_asymptomatic_import
        )
        this.filterData.caseMonth.data.totalLocal['total-case'].push(
          item.total_case_local
        )
        this.filterData.caseMonth.data.totalLocal['total-asymptomatic'].push(
          item.total_asymptomatic_local
        )
        this.filterData.caseMonth.data.totalOutter['total-case'].push(
          item.total_case_outter
        )
        this.filterData.caseMonth.data.totalOutter['total-asymptomatic'].push(
          item.total_asymptomatic_outter
        )
      }
    },
    sicksourceWeekConfig() {
      for (const item of this.guangDongData.sicksourceWeek) {
        this.filterData.sicksourceWeek.sicksourceData.push({
          name: item.sick_source,
          value: item.total_case,
          percent: item.case_percent
        })
      }
    },
    importCountryConfig() {
      for (const item of this.guangDongData.importCountry) {
        this.filterData.importCountry.count++
        this.filterData.importCountry.data.push({
          name: item.patient_place,
          value: item.import_case
        })
      }
    },
    portClusterConfig() {
      for (const i in this.guangDongData.portCluster) {
        this.filterData.portCluster['case-isolation'].push(
          this.guangDongData.portCluster[i].case_isolation
        )
        this.filterData.portCluster['case-unisolation'].push(
          this.guangDongData.portCluster[i].case_unisolation
        )
        this.filterData.portCluster['driver'].push(
          this.guangDongData.portCluster[i].driver
        )
      }
    },
    isolationIntervalConfig() {
      for (const i in this.guangDongData.isolationInterval) {
        this.filterData.isolationInterval.push(
          this.guangDongData.isolationInterval[i]
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
// $topSpace: getWidth(0.6);
$topSpace: 0.6rem;

.container {
  display: flex;
  flex-direction: column;
  padding: getHeight(0.9) getWidth(0.9);
  box-sizing: border-box;
}

// 中间部分
.content {
  height: 100%;
  display: flex;
  .title {
    height: getHeight(2.5);
    font-family: PingFangSC-Medium;
    font-size: $itemTitleSize;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: getHeight(1.88);
    margin-top: getHeight(2);
    margin-left: getHeight(2.19);
    // 标题三角形
    .triangle {
      display: inline-block;
      font-size: 0;
      overflow: hidden;
      margin-right: getWidth(1);

      &:before {
        content: "";
        position: relative;
        display: inline-block;
        border: getWidth(0.6) solid transparent;

        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;

        border-right-width: 0;
        border-left-width: getWidth(0.9);
        border-left-color: #ffe7b3;
      }
    }
  }

  .left,
  .right {
    width: getWidth(58.69);
    height: 100%;
    flex: none;
    .lt-item,
    .lc-item,
    .lb-item,
    .guangdong,
    .country,
    .world {
      // padding: 1rem 0.8rem;
      padding: getHeight(1) getWidth(0.8);
      display: flex;
      flex-direction: column;
    }
  }

  .center {
    width: 100%;
    height: 100%;
    margin: 0 $topSpace;
    position: relative;
    .top-operation {
      position: absolute;
      top: getHeight(2);
      left: getWidth(45);
      z-index: 3;
      label {
        display: inline-block;
        width: getWidth(12.88);
        height: getHeight(3.75);
        text-align: center;
        line-height: getHeight(3.75);
        background-color: #212342;
        border: solid getWidth(0.13) rgba(255, 255, 255, 0.3);
        margin-right: getWidth(1.63);
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: rgba(255, 255, 255, 0.5);
        cursor: pointer;
      }
      input:checked:nth-of-type(1) ~ label:nth-of-type(1) {
        border: solid 0.13rem #54ebfd;
        opacity: 0.5;
        color: #54ebfd;
      }
      input:checked:nth-of-type(2) ~ label:nth-of-type(2) {
        border: solid 0.13rem #54ebfd;
        opacity: 0.5;
        color: #54ebfd;
      }
      input:checked:nth-of-type(3) ~ label:nth-of-type(3) {
        border: solid 0.13rem #54ebfd;
        opacity: 0.5;
        color: #54ebfd;
      }
      input[type="radio"] {
        display: none;
      }
    }
  }
}

.left {
  display: flex;
  flex-direction: column;
  > div + div {
    margin-top: $topSpace;
  }
  .lt-item {
    width: getWidth(58.44);
    flex: 28.5;
    border-radius: getHeight(1) getWidth(1);
    opacity: 0.92;
    background: #212342;
    // margin-top: getHeight(1.44);
    > .sub {
      flex: 1;
    }
  }
  .lc-item {
    width: getWidth(58.44);
    // height: 17.13rem;
    flex: 36;
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
    > .chart-container {
      display: flex;
      margin-top: getHeight(1.44);
      width: getWidth(58.44);
      > .echarts {
        width: 80%;
        height: 80%;
      }
    }
  }
  .lb-item {
    width: getWidth(58.44);
    flex: 38.56;
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
    > .chart-container {
      margin-top: getHeight(1.44);
      // overflow-y: scroll;
      // height: getHeight(38.56);
    }
  }
}

.right {
  display: flex;
  flex-direction: column;
  > div + div {
    margin-top: $topSpace;
  }

  .guangdong {
    width: getWidth(58.44);
    // flex: 28.13;
    flex: 26.5;
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
    > .chart-container {
      display: flex;
      margin-top: getHeight(1.44);
      width: getWidth(58.44);
      > .echarts {
        width: 100%;
        height: 100%;
      }
    }
  }
  .country {
    width: getWidth(58.44);
    flex: 36.63;
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
  }
  .world {
    width: getWidth(58.44);
    flex: 37.81;
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
    opacity: 0.92;
  }
}

.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
