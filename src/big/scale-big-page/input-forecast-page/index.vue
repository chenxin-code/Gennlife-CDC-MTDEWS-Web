<template>
  <div class="container">
    <div class="left">
      <div class="l-left">
        <div class="l-left-top total-import-date">
          <el-date-picker
            v-model="totalImportTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="total-import-date-panel"
            clearable
          />
        </div>
        <div class="l-left-bottom">
          <div class="title">
            <div class="triangle" />
            累计境外入粤人员管控情况
          </div>
          <div class="total-import">
            <item-list1 :data="totalImportData" :config="totalImportConfig" />
          </div>
        </div>
      </div>
      <div class="l-right">
        <div class="l-top">
          <div class="title">
            <div class="triangle" />
            未来30天{{ hignRiskCountryParam.country }}本土现存感染人数
          </div>
          <div class="line-chart">
            <line-chart :data="hignRiskCountryData" />
          </div>
        </div>
        <div class="l-center">
          <div class="title">
            <div class="triangle" />
            当日境外入粤人员管控情况
          </div>
          <div class="today-import">
            <today-item-list
              :data="todayImportData"
              :config="todayImportConfig"
            />
          </div>
        </div>
        <div class="l-bottom">
          <div class="title">
            <div class="triangle" />
            各国家未来两周入境人数及预估病例数
          </div>
          <div class="two-week-count">
            <two-week-bar :data="twoWeekData.count_num" />
          </div>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="map">
        <true-scatter-map
          :data="rightBottomData"
          :country="leftTopParam.country"
          :days="days"
          @click="mapClick"
        />
      </div>
      <div class="bottom">
        <div class="title">
          <div class="triangle" />
          入境人员累计罹患率
        </div>
        <div class="content">
          <line-bar-chart
            :x="lineBarData.country"
            :data="[lineBarData.count, lineBarData.rate]"
          />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="r-left">
        <div class="r-top">
          <div class="title">
            <div class="triangle" />
            隔离酒店情况
          </div>
          <div class="search-item">
            <el-date-picker
              v-model="hotelFilter.date"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              class="hotel-date-panel"
              value-format="yyyy-MM-dd"
              clearable
            />
            <el-select
              v-model="hotelFilter.city"
              placeholder="请选择城市"
              clearable
            >
              <el-option
                v-for="item in uniq(hotelData.city)"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
            <el-select
              v-model="hotelFilter.hotel_name"
              placeholder="请选择酒店"
              clearable
            >
              <el-option
                v-for="item in uniq(hotelData.hotel_name)"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="pie-item-wrap">
            <div class="pie-item">
              <div class="item1">
                入境隔离人员核酸检测数
                <animated-num :num="hotelData.data.man_all_s" class="num" />
              </div>
              <div class="item2">
                阳性病例
                <span>{{ hotelData.data.man_positive_s }}</span>
              </div>
              <div class="hotel-ring">
                <hotel-ring-chart :num="hotelData.data.man_positive_rate" />
                <span>阳性率</span>
              </div>
            </div>
            <div class="pie-item">
              <div class="item1">
                酒店工作人员核酸检测数
                <animated-num :num="hotelData.data.man_work_s" class="num" />
              </div>
              <div class="item2">
                阳性病例
                <span>{{ hotelData.data.man_work_y_s }}</span>
              </div>
              <div class="hotel-ring">
                <hotel-ring-chart :num="hotelData.data.work_positive_rate" />
                <span>阳性率</span>
              </div>
            </div>
            <div class="pie-item">
              <div class="item1">
                酒店环境样本核酸检测数
                <animated-num :num="hotelData.data.sample_num_s" class="num" />
              </div>
              <div class="item2">
                阳性病例
                <span>{{ hotelData.data.sample_num_y_s }}</span>
              </div>
              <div class="hotel-ring">
                <hotel-ring-chart :num="hotelData.data.sample_positive_rate" />
                <span>阳性率</span>
              </div>
            </div>
          </div>
          <div class="line-item">
            <hotel-line-chart :data="hotelData.lineData" />
          </div>
        </div>
        <div class="r-bottom">
          <div class="title">
            <div class="triangle" />
            <!-- 各国家未来两周入境人数及预估病例数 -->
            各风险等级国家未来两周入境人数及预估病例数
          </div>
          <div class="two-week-count">
            <two-week-risk-bar :data="twoWeekData.grade_num" />
          </div>
        </div>
      </div>
      <div class="r-right">
        <div class="r-right-top total-import-date">
          <el-date-picker
            v-model="importSortTime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="total-import-date-panel"
          />
        </div>
        <div class="r-right-bottom">
          <div class="title">
            <div class="triangle" />
            累计境外入粤人员管控情况
          </div>
          <div class="total-import">
            <import-sort-list
              :sort="true"
              :data="importSortData"
              :config="importSortConfig"
            />
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      v-if="dialogVisible"
      class="input-forecast"
      :destroy-on-close="true"
      :visible="dialogVisible"
      :append-to-body="true"
      :title="
        targetData && targetData.modelName === 'diversion'
          ? '入境人员分流方案'
          : targetData && targetData.modelName === 'isolation'
            ? '入境隔离策略调整及预测'
            : '香港豁免人员输入风险评估'
      "
      @close="dialogClose"
    >
      <diversion v-if="targetData && targetData.modelName === 'diversion'" />
      <isolation v-if="targetData && targetData.modelName === 'isolation'" />
      <hongkong v-if="targetData && targetData.modelName === 'hongkong'" />
    </el-dialog>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
// import CompactBar from './components/CompactBar'
import ItemList1 from './components/ItemList1'
import TodayItemList from './components/TodayItemList'
import TrueScatterMap from './components/TrueScatterMap'
// import RingChart from './components/RingChart'
// import Diversion from './components/Diversion'
import Diversion from './components/Diversion2'
import Isolation from './components/Isolation'
import Hongkong from './components/Hongkong'
// import PictorialBar from './components/PictorialBar'
import TwoWeekBar from './components/TwoWeekBar'
import TwoWeekRiskBar from './components/TwoWeekRiskBar'
import ImportSortList from './components/ImportSortList'
import LineBarChart from './components/LineBarChart'
import HotelLineChart from './components/HotelLineChart'
import HotelRingChart from './components/HotelRingChart'
import AnimatedNum from '@/components/AnimatedNum'

import {
  accumulateCase, // 高风险国家未来累计感染人数趋势预测
  overseasRiskControl, // 境外输入风险评估及分级
  riskAssessment, // 境外输入风险评估
  hotelIsolation, // 酒店隔离情况信息
  inboundNum // 未来两周境外输入人数
} from '@/api/input-forecast'

import { Message } from 'element-ui'
import { uniq } from 'lodash'
// import { random, uniq } from 'lodash'

export default {
  components: {
    LineChart,
    // CompactBar,
    ItemList1,
    TodayItemList,
    TrueScatterMap,
    // RingChart,
    Diversion,
    Isolation,
    Hongkong,
    // PictorialBar,
    TwoWeekBar,
    TwoWeekRiskBar,
    ImportSortList,
    LineBarChart,
    HotelLineChart,
    HotelRingChart,
    AnimatedNum
  },
  props: {
    targetData: {
      type: Object,
      default() {
        return 'diversion'
      }
    }
  },
  data() {
    return {
      model: '',
      totalImportTime: '',
      totalImportParam: {
        starttime: '',
        endtime: ''
      },
      totalImportData: [],
      totalImportConfig: [
        { label: '境外国家', field: 'country' },
        { label: '输入人数', field: 'import_cases' },
        { label: '集中隔离', field: 'newadd_c_cases' },
        { label: '居家隔离', field: 'newadd_f_cases' },
        { label: '解除集中隔离', field: 'no_c_cases' },
        { label: '解除居家隔离', field: 'no_f_cases' }
      ],
      todayImportData: [],
      todayImportConfig: [
        { label: '境外国家', field: 'country' },
        { label: '输入人数', field: 'import_cases' },
        { label: '集中隔离人数', field: 'newadd_c_cases' },
        { label: '居家隔离人数', field: 'newadd_f_cases' },
        { label: '解除集中隔离', field: 'no_c_cases' },
        { label: '解除居家隔离', field: 'no_f_cases' }
      ],
      twoWeekData: {
        count_num: [],
        grade_num: []
      },
      importSortTime: '',
      importSortParam: {
        starttime: '',
        endtime: ''
      },
      importSortData: [],
      importSortConfig: [
        { label: '国家', field: 'name' },
        { label: '风险', field: 'risk' },
        { label: '风险等级', field: 'classgrade' }
      ],
      hignRiskCountryParam: {
        country: ''
      },
      lineBarData: {
        country: [],
        count: [],
        rate: []
      },
      hignRiskCountryData: {},
      hotelParam: {
        starttime: '',
        endtime: ''
      },
      hotelFilter: {
        date: '',
        city: '',
        hotel_name: ''
      },
      hotelData: {
        data: {
          man_all_s: 0,
          man_positive_s: 0,
          man_positive_rate: 0,
          man_work_s: 0,
          man_work_y_s: 0,
          work_positive_rate: 0,
          sample_num_s: 0,
          sample_num_y_s: 0,
          sample_positive_rate: 0
        },
        city: [],
        hotel_name: [],
        lineData: {
          dates: [],
          usage_rate: []
        }
      },
      leftTopParam: { country: '美国' },
      // leftTopData: {},
      // leftCenterData: [],
      // leftCenterConfig: [
      //   { label: '境外国家', field: 'country' },
      //   { label: '输入人数', field: 'import_cases' },
      //   { label: '集中隔离', field: 'c_cases' },
      //   { label: '居家隔离', field: 'f_cases' },
      //   { label: '解除集中隔离', field: 'no_c_cases' },
      //   { label: '解除居家隔离', field: 'no_f_cases' }
      // ],
      // leftBottomData: [],
      // leftBottomConfig: [
      //   { label: '境外国家', field: 'country' },
      //   { label: '输入人数', field: 'import_cases' },
      //   { label: '集中隔离', field: 'c_cases' },
      //   { label: '居家隔离', field: 'f_cases' },
      //   { label: '解除集中隔离', field: 'no_c_cases' },
      //   { label: '解除居家隔离', field: 'no_f_cases' }
      // ],
      // leftCenterParam: {
      //   t: 14,
      //   pageCount: 1
      // },

      rightBottomParam: {
        status: 1
      },
      rightBottomData: [], // classgrade:超高风险name:香港risk:100
      // rightBottomConfig: [
      //   { label: '国家', field: 'name' },
      //   { label: '风险值', field: 'risk' },
      //   { label: '风险等级', field: 'classgrade' }
      // ],
      // centerBottomData: [],
      // allRightTopData: [],
      // rightTopFitrer: {
      //   city: [],
      //   hotel_name: []
      // },
      // rightTopCurrentData: {
      //   city: '',
      //   hotel_name: '',
      //   man_all: 0,
      //   man_positive: 0,
      //   man_work: 0,
      //   man_work_y: 0,
      //   sample_num: 0,
      //   sample_num_y: 0
      // },

      dialogVisible: false,
      days: '',

      time: null
    }
  },
  watch: {
    rightBottomParam: {
      deep: true,
      handler() {
        this.initRightBottom()
      }
    },
    targetData: {
      deep: true,
      handler(val, oldVal) {
        this.dialogVisible = true
      }
    },
    totalImportTime: {
      handler() {
        const t1 = this.totalImportTime[0]
        const t2 = this.totalImportTime[1]
        const t1Month = t1.getMonth() + 1 >= 10 ? t1.getMonth() + 1 : '0' + (t1.getMonth() + 1)
        const t1Date = t1.getDate() >= 10 ? t1.getDate() : '0' + t1.getDate()
        const t2Month = t2.getMonth() + 1 >= 10 ? t2.getMonth() + 1 : '0' + (t2.getMonth() + 1)
        const t2Date = t2.getDate() >= 10 ? t2.getDate() : '0' + t2.getDate()
        const start = t1.getFullYear() + '-' + t1Month + '-' + t1Date
        const end = t2.getFullYear() + '-' + t2Month + '-' + t2Date
        this.totalImportParam.starttime = start
        this.totalImportParam.endtime = end
        const totalImportParam = Object.assign(
          { status: 2 },
          this.totalImportParam
        )
        overseasRiskControl(totalImportParam)
          .then(res => {
            this.totalImportData = res.data
          })
          .catch(err => {
            Message({
              message: err.message,
              type: 'warning'
            })
          })
      }
    },
    importSortTime: {
      handler() {
        const t1 = this.importSortTime[0]
        const t2 = this.importSortTime[1]
        const start =
          t1.getFullYear() + '-' + (t1.getMonth() + 1) + '-' + t1.getDate()
        const end =
          t2.getFullYear() + '-' + (t2.getMonth() + 1) + '-' + t2.getDate()
        this.importSortParam.starttime = start
        this.importSortParam.endtime = end
        const importSortParam = Object.assign(
          { status: 1 },
          this.importSortParam
        )
        const lineBarParam = Object.assign({ status: 3 }, this.importSortParam)
        riskAssessment(importSortParam)
          .then(res => {
            this.importSortData = res.data
          })
          .catch(err => {
            Message({
              message: err.message,
              type: 'warning'
            })
          })
        riskAssessment(lineBarParam)
          .then(res => {
            this.lineBarData.country = res.data.map(v => v.country)
            this.lineBarData.count = res.data.map(v => v.yx_num)
            this.lineBarData.rate = res.data.map(v => v.add_yx_scale)
          })
          .catch(err => {
            Message({
              message: err.message,
              type: 'warning'
            })
          })
      }
    },
    hotelFilter: {
      deep: true,
      handler: function() {
        console.log(this.hotelFilter.date)
        if (this.hotelFilter.date) {
          const t1 = this.hotelFilter.date[0]
          const t2 = this.hotelFilter.date[1]
          const t1Month = t1.getMonth() + 1 >= 10 ? t1.getMonth() + 1 : '0' + (t1.getMonth() + 1)
          const t1Date = t1.getDate() >= 10 ? t1.getDate() : '0' + t1.getDate()
          const t2Month = t2.getMonth() + 1 >= 10 ? t2.getMonth() + 1 : '0' + (t2.getMonth() + 1)
          const t2Date = t2.getDate() >= 10 ? t2.getDate() : '0' + t2.getDate()
          const start = t1.getFullYear() + '-' + t1Month + '-' + t1Date
          const end = t2.getFullYear() + '-' + t2Month + '-' + t2Date
          this.hotelParam.starttime = start
          this.hotelParam.endtime = end
        }
        if (this.hotelFilter.city) {
          const hotelParam = Object.assign({
            status: 1,
            city: this.hotelFilter.city
          })
          hotelIsolation(hotelParam)
            .then(res => {
              this.hotelData.hotel_name = res.data.map(v => v.hotel_name)
            })
            .catch(err => {
              Message({
                message: err.message,
                type: 'warning'
              })
            })
        }
        if (this.hotelFilter.city && this.hotelFilter.hotel_name) {
          // 参数带有hote时，后端返回code： -1
          // const hotelParam = Object.assign({ status: 1, city: this.hotelFilter.city, hotel: this.hotelFilter.hotel_name }, this.hotelParam)
          // const hotelLineParam = Object.assign({ status: 4, city: this.hotelFilter.city, hotel: this.hotelFilter.hotel_name }, this.hotelParam)
          const hotelParam = Object.assign({
            status: 1,
            city: this.hotelFilter.city,
            starttime: '2020-08-17',
            endtime: '2020-08-18'
          })
          const hotelLineParam = Object.assign({
            status: 4,
            city: this.hotelFilter.city,
            starttime: '2020-08-17',
            endtime: '2020-08-18'
          })
          hotelIsolation(hotelParam)
            .then(res => {
              this.hotelData.data = res.data[0]
            })
            .catch(err => {
              Message({
                message: err.message,
                type: 'warning'
              })
            })
          hotelIsolation(hotelLineParam)
            .then(res => {
              this.hotelData.lineData.dates = res.data.map(v => v.dates)
              this.hotelData.lineData.usage_rate = res.data.map(
                v => v.usage_rate
              )
            })
            .catch(err => {
              Message({
                message: err.message,
                type: 'warning'
              })
            })
        }
      }
    }
  },
  mounted() {
    // this.initLeftTop()
    // this.initLeftCenter()
    // this.initCenterBottom()
    this.initRightBottom()
    // this.initRightTop()
    this.initTotalImport()
    this.initTodayImport()
    this.initTwoWeek()
    this.initImportSort()
    this.initHighRiskCountry()
    this.initHotel()

    // this.timer = null
    // 大屏动态事件
    // const moveFunc = () => {
    //   if (this.timer) return
    //   this.timer = setInterval(() => {
    //     // 右上角 更改数据
    //     const randomIndex = random(0, this.allRightTopData.length - 1)
    //     this.rightTopCurrentData = Object.assign(
    //       {},
    //       this.allRightTopData[randomIndex]
    //     )

    //     // 右下角 更改数据
    //     this.rightBottomParam.status = random(1, 21)

    //     // 地图数据
    //     if (this.rightBottomData.length !== 0) {
    //       this.leftTopParam.country = this.rightBottomData[
    //         random(0, this.rightBottomData.length - 1)
    //       ].name
    //     }
    //     this.initLeftTop()
    //   }, 5000)
    // }
    // moveFunc()

    // 鼠标移动， 停止移动
    // document.onmousemove = () => {
    //   clearInterval(this.timer)
    //   this.timer = null
    //   setTimeout(() => {
    //     moveFunc()
    //   }, 5000)
    // }

    // 销毁动态事件
    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(this.timer)
    //   this.timer = null
    // })
  },
  // beforeDestroy() {
  //   clearInterval(this.timer)
  //   this.timer = null
  // },

  methods: {
    uniq,
    // initLeftTop() {
    //   accumulateCase(this.leftTopParam).then(res => {
    //     this.leftTopData = res.data[0]
    //   })
    //     .catch(err => {
    //       Message({
    //         message: err.message,
    //         type: 'warning'
    //       })
    //     })
    // },
    initTotalImport() {
      const totalImportParam = { status: 2 }
      overseasRiskControl(totalImportParam)
        .then(res => {
          this.totalImportData = res.data
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    initTodayImport() {
      const todayImportParam = { status: 1 }
      overseasRiskControl(todayImportParam)
        .then(res => {
          this.todayImportData = res.data
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    initTwoWeek() {
      inboundNum({})
        .then(res => {
          this.twoWeekData.count_num = res.data.count_num
          this.twoWeekData.grade_num = res.data.grade_num
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    initImportSort() {
      riskAssessment({ status: 1 })
        .then(res => {
          this.importSortData = res.data
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
      riskAssessment({ status: 3 })
        .then(res => {
          this.lineBarData.country = res.data.map(v => v.country)
          this.lineBarData.count = res.data.map(v => v.yx_num)
          this.lineBarData.rate = res.data.map(v => v.add_yx_scale)
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    initHighRiskCountry() {
      accumulateCase(this.hignRiskCountryParam)
        .then(res => {
          if (!this.hignRiskCountryParam.country) { this.hignRiskCountryParam.country = res.data[0].country }
          this.hignRiskCountryData = res.data[0]
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    initHotel() {
      const cityParam = { status: 2 }
      // const hotelNameParam = Object.assign({ status: 3 }, this.hotelParam)
      hotelIsolation(cityParam)
        .then(res => {
          this.hotelData.city = res.data
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
      // hotelIsolation(hotelNameParam).then(res => {
      //   this.hotelData.hotel_name = res.data
      //   console.log(res.data)
      // })
    },
    // initLeftCenter() {
    //   overseasRiskControl(this.leftCenterParam).then(res => {
    //     this.leftCenterData = res.data
    //     this.leftBottomData = res.data
    //     this.leftCenterParam.pageCount = res.pagination.pages
    //   })
    //     .catch(err => {
    //       Message({
    //         message: err.message,
    //         type: 'warning'
    //       })
    //     })
    // },
    // initCenterBottom() {
    //   inboundNum({ t: 14 }).then(res => {
    //     this.centerBottomData = res.data
    //     this.days = res.days
    //   })
    //     .catch(err => {
    //       Message({
    //         message: err.message,
    //         type: 'warning'
    //       })
    //     })
    // },
    initRightBottom() {
      riskAssessment(this.rightBottomParam)
        .then(res => {
          this.rightBottomData = res.data
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    // initRightTop() {
    //   hotelIsolation({}).then(res => {
    //     this.allRightTopData = res.data
    //     this.rightTopFitrer.city = res.data.map(v => v.city)
    //     this.rightTopFitrer.hotel_name = res.data.map(v => v.hotel_name)
    //     this.rightTopCurrentData = Object.assign({}, res.data[0])
    //   })
    //     .catch(err => {
    //       Message({
    //         message: err.message,
    //         type: 'warning'
    //       })
    //     })
    // },
    choiceTime() {
      // const index = -1
    },
    // choiceCity() {
    //   let index = -1
    //   for (let i = 0; i < this.allRightTopData.length; i++) {
    //     if (this.allRightTopData[i].city === this.rightTopCurrentData.city) {
    //       index = i
    //       break
    //     }
    //   }
    //   this.rightTopCurrentData = Object.assign({}, this.allRightTopData[index])
    // },
    // choiceData() {
    //   let index = -1
    //   for (let i = 0; i < this.allRightTopData.length; i++) {
    //     if (
    //       this.allRightTopData[i].city === this.rightTopCurrentData.city &&
    //       this.allRightTopData[i].hotel_name ===
    //         this.rightTopCurrentData.hotel_name
    //     ) {
    //       index = i
    //       break
    //     }
    //   }
    //   if (index === -1) {
    //     this.rightTopCurrentData = {
    //       city: '',
    //       hotel_name: '',
    //       man_all: 0,
    //       man_positive: 0,
    //       man_work: 0,
    //       man_work_y: 0,
    //       sample_num: 0,
    //       sample_num_y: 0
    //     }
    //     return
    //   }
    //   this.rightTopCurrentData = Object.assign({}, this.allRightTopData[index])
    // },
    // 切换下一页
    // leftCenterChange(index) {
    //   this.leftCenterParam.page = index + 1
    //   this.initLeftCenter()
    // },
    mapClick(country) {
      // this.leftTopParam.country = country;
      // this.initLeftTop();
      this.hignRiskCountryParam.country = country
      this.initHighRiskCountry()
    },
    dialogClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

.container {
  display: flex;
  padding: getHeight(2) getWidth(2);
  box-sizing: border-box;

  .left {
    width: getWidth(116.75);
    flex: none;
    // flex: 116.75;
    height: 100%;
  }
  .right {
    width: getWidth(116.75);
    flex: none;
    // flex: 116.75;
    height: 100%;
  }
  .center {
    width: 100%;
    position: relative;
  }
}

.left .l-left .total-import-date ::v-deep,
.right .r-right .total-import-date ::v-deep,
.right .r-left .r-top ::v-deep {
  .el-input__inner {
    background-color: #212342;
    color: rgba(255, 255, 255, 0.7);
    border: none;
    cursor: pointer;
    .el-input__icon {
      display: none;
    }
    .el-range-input {
      border: 1px solid rgba(255, 255, 255, 0.7);
      background-color: #212342;
      width: getWidth(9);
      height: getHeight(3);
    }
  }
}
// .right .r-right .total-import-date ::v-deep {
//   .el-input__inner {
//     background-color: #212342;
//     color: rgba(255, 255, 255, 0.7);
//     border: none;
//     cursor: pointer;
//     .el-input__icon {
//       display: none;
//     }
//     .el-range-input {
//       border: 1px solid rgba(255, 255, 255, 0.7);
//       background-color: #212342;
//     }
//   }
// }

.left {
  display: flex;
  > div + div {
    margin-left: getWidth(1.2);
  }
  .l-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #212342;
    border-radius: getWidth(1) getHeight(1);
    padding: getWidth(2) getHeight(2);
    height: getHeight(104.94);
    .l-left-top {
      flex: 1;
    }
    .l-left-bottom {
      flex: 12;
      width: 100%;
      height: 70%;
      .total-import {
        overflow: scroll;
        width: 100%;
        height: 90%;
      }
    }
  }

  .l-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    > div + div {
      margin-top: getHeight(1.2);
    }
    .l-top,
    .l-center,
    .l-bottom {
      width: 100%;
      background: #212342;
      border-radius: getWidth(1) getHeight(1);
      padding: getWidth(2) getHeight(2);
    }

    .l-top {
      height: getHeight(36.75);
      display: flex;
      flex-direction: column;
      .title {
        flex: 1;
      }
      .line-chart {
        flex: 12;
      }
    }

    .l-center {
      height: getHeight(29);
      display: flex;
      flex-direction: column;
      .title {
        flex: 1;
      }
      .today-import {
        overflow: scroll;
        width: 100%;
        height: 100%;
      }
    }
    .l-bottom {
      height: getHeight(37.19);
      display: flex;
      flex-direction: column;
      .title {
        flex: 1;
      }
      .two-week-count {
        width: 100%;
        height: 100%;
      }
    }

    .l-center,
    .l-bottom {
      display: flex;
      flex-direction: column;
      ::v-deep {
        .el-carousel {
          height: 100%;
          .el-carousel__container {
            height: 100%;
          }
        }
      }
    }
  }
}
.center {
  display: flex;
  flex-direction: column;
  .map {
    flex: 3;
  }
  .bottom {
    flex: 1;
    border-radius: getWidth(1) getHeight(1);
    padding: getWidth(2) getHeight(2);
    margin-left: getWidth(1);
    margin-right: getWidth(1);
    background-color: #212342;
    display: flex;
    flex-direction: column;
    .title {
      flex: 1;
    }
    .content {
      flex: 9;
      width: 100%;
      height: 100%;
    }
  }
}
.right {
  display: flex;
  > div + div {
    margin-left: getWidth(1.2);
  }
  .r-right {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #212342;
    border-radius: getWidth(1) getHeight(1);
    padding: getWidth(2) getHeight(2);
    height: getHeight(104.94);
    .r-right-top {
      flex: 1;
    }
    .r-right-bottom {
      flex: 12;
      width: 100%;
      height: 70%;
      .total-import {
        overflow: scroll;
        width: 100%;
        height: 90%;
      }
    }
  }

  .r-left {
    display: flex;
    flex-direction: column;
    flex: 1;
    > div + div {
      margin-top: getHeight(1.2);
    }
    .r-top,
    .r-bottom {
      width: 100%;
      background: #212342;
      border-radius: getWidth(1) getHeight(1);
      padding: getWidth(2) getHeight(2);
    }

    .r-top {
      height: getHeight(66.75);
      display: flex;
      flex-direction: column;
      .search-item {
        flex: 1;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .el-select {
          border: 1px solid rgba(255, 255, 255, 0.7);
          width: getWidth(9);
          height: getHeight(3);
        }
      }
      .pie-item-wrap {
        flex: 4;
        display: flex;
        flex-direction: column;
        .pie-item {
          font-size: $nomalSize;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #0768a0;
          flex: 1;
          border: 1px solid #0768a0;
          width: 100%;
          margin: getHeight(1) getWidth(0);
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item1,
          .item2,
          .hotel-ring {
            flex: 1;
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            .num {
              font-size: $pageHeaderSize;
              color: white;
              font-weight: 500;
            }
          }
          .item1 {
            justify-content: space-around;
          }
          .item2 {
            justify-content: center;
            span {
              margin-top: getHeight(1);
              color: white;
            }
          }
        }
        .pie-item:nth-child(2) {
          margin: getHeight(0) getWidth(0);
        }
      }
      .line-item {
        flex: 5;
      }
    }
    .r-bottom {
      height: getHeight(37.19);
      display: flex;
      flex-direction: column;
      .title {
        flex: 1;
      }
      .two-week-count {
        width: 100%;
        height: 100%;
      }
    }

    .r-bottom {
      display: flex;
      flex-direction: column;
      ::v-deep {
        .el-carousel {
          height: 100%;
          .el-carousel__container {
            height: 100%;
          }
        }
      }
    }
  }
}

.title {
  font-size: $nomalSize;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  margin-bottom: getHeight(2);

  // 标题三角形
  .triangle {
    display: inline-block;
    font-size: 0;
    overflow: hidden;
    margin-right: getWidth(0.6);

    &:before {
      content: "";
      position: relative;
      display: inline-block;
      border: getWidth(0.3) solid transparent;

      position: relative;
      right: getWidth(0.1);
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;

      left: getWidth(0.1);
      border-right-width: 0;
      border-left-width: getWidth(0.6);
      border-left-color: rgb(181, 181, 181);
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/big.scss";
.input-forecast {
  display: flex;
  justify-content: center;
  align-items: center;

  ::v-deep {
    .el-dialog {
      width: getWidth(188.88);
      height: getHeight(106.25);
      display: flex;
      flex-direction: column;
      margin-top: 0 !important;
    }
    .el-dialog__header {
      padding-top: 0;
      padding-bottom: 0;
      height: getHeight(7.5);
      background-color: rgba(#313662, 0.6);
      position: relative;

      .el-dialog__title {
        font-family: PingFangSC-Medium;
        font-size: $itemTitleSize;
        font-weight: normal;
        font-stretch: normal;
        color: #ffffff;
        line-height: getHeight(7.5);
        height: 100%;
      }

      .el-dialog__headerbtn {
        width: getWidth(2.13);
        height: getHeight(2.13);
        top: 50%;
        font-size: 2.13 * 16px;
        transform: translateY(-50%);
        .el-dialog__close {
          color: #00e0ff;
        }
      }
    }
    .el-dialog__body {
      height: calc(100% - #{getHeight(7.5)});
      background-color: #171833;
      border-radius: getHeight(1) getWidth(1);
      border: solid getWidth(0.13) rgba(255, 255, 255, 0.3);
      border: none;
      border-radius: 0;
      padding: 0;
      background: #212342;
    }
  }
}
</style>
<style lang="scss">
// .ceshi1{flex:1;}
// .ceshi2{flex:1;}
// .ceshi3{flex:2;}
</style>
