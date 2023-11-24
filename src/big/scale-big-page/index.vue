<template>
  <div class="container">
    <div class="left-1 box-border">
      <div class="left-1-top box-border">
        <div class="title">
          <div class="triangle" />
          全球疫情概览
        </div>
        <div class="content-box box-border">
          <div class="left-bg animation-img">
            <img :src="require('@/assets/images/left1_1.png')" alt="">
          </div>
          <svg-icon icon-class="line" class="content-line" />
          <div class="right-content">
            <div class="item">
              <div class="value">{{ overview.world.total_case }}</div>
              <div class="label">累计确诊病例</div>
            </div>
            <div class="item">
              <div class="value">{{ overview.world.total_death }}</div>
              <div class="label">累计死亡例</div>
            </div>
          </div>
        </div>
      </div>
      <div class="left-1-item-1 box-border">
        <div class="item"><ring-chart class="animation-chart" /></div>
        <div class="item">
          <div class="value">{{ overview.world.new_case }}</div>
          <div class="label">新增确诊病例数</div>
        </div>
        <div class="item">
          <div class="value">{{ overview.world.new_case_yesterday }}</div>
          <div class="label">较昨日</div>
        </div>
        <div class="item">
          <div class="value">{{ overview.world.new_case_ratio }}</div>
          <div class="label">环比</div>
        </div>
      </div>
      <div class="left-1-item-2 box-border">
        <div class="item"><ring-chart class="animation-chart" /></div>
        <div class="item">
          <div class="value">{{ overview.world.new_death }}</div>
          <div class="label">新增死亡病例数</div>
        </div>
        <div class="item">
          <div class="value">{{ overview.world.new_death_yesterday }}</div>
          <div class="label">较昨日</div>
        </div>
        <div class="item">
          <div class="value">{{ overview.world.new_death_ratio }}</div>
          <div class="label">环比</div>
        </div>
      </div>
      <div class="left-1-center box-border">
        <div class="title">
          <div class="triangle" />
          全球报告新冠肺炎疫情时间分布
        </div>
        <div class="content-box box-border">
          <world-line-bar
            :x="worldLineBar.x"
            :data="[
              worldLineBar.new_case_global_average_week,
              worldLineBar.total_case
            ]"
          />
        </div>
      </div>
      <div class="left-1-bottom box-border">
        <div class="title">
          <div class="triangle" />
          全球疫情重点关注—非洲七日平均曲线
        </div>
        <div class="content-box box-border">
          <africaLine
            :x="africaLineBar.x"
            :data="[africaLineBar.new_case_Africa_average_week]"
          />
        </div>
      </div>
    </div>
    <div class="left-2 box-border">
      <div class="left-2-top box-border">
        <div class="title">
          <div class="triangle" />
          全国疫情概览
        </div>
        <div class="content-box box-border">
          <div class="left-bg animation-img">
            <img :src="require('@/assets/images/left2_1.png')" alt="">
          </div>
          <svg-icon icon-class="line" class="content-line" />
          <div class="right-content">
            <div class="item">
              <div class="value">{{ overview.china.total_case }}</div>
              <div class="label">累计确诊病例</div>
            </div>
            <div class="item">
              <div class="value">{{ overview.china.total_death }}</div>
              <div class="label">累计死亡例</div>
            </div>
          </div>
        </div>
      </div>
      <div class="left-2-item-1 box-border">
        <div class="top">
          <div class="item">
            <div class="label">新增确诊病例</div>
            <div class="value">
              <svg-icon
                v-for="(v, i) in overview.china.new_case"
                :key="`${i}-1`"
                icon-class="pink-spot"
                class="content-spot"
              />
              <svg-icon
                v-for="(v, i) in 15"
                :key="`${i}-2`"
                icon-class="yellow-spot"
                class="content-spot"
              />
            </div>
          </div>
          <div class="item">
            <div class="label">本土感染</div>
            <div class="value">{{ overview.china.new_case_local }}</div>
          </div>
          <div class="item">
            <div class="label">境外输入</div>
            <div class="value">{{ overview.china.new_case_input }}</div>
          </div>
          <div class="item">
            <div class="label">总计</div>
            <template
              v-if="
                isNaN(
                  overview.china.new_case_local + overview.china.new_case_input
                )
              "
            >
              <div class="value">0</div>
            </template>
            <template v-else>
              <div class="value">
                {{
                  overview.china.new_case_local + overview.china.new_case_input
                }}
              </div>
            </template>
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="label">新增无症状感染者</div>
            <div class="value">
              <svg-icon
                v-for="(v, i) in overview.china.new_asymptomatic"
                :key="`${i}-1`"
                icon-class="pink-spot"
                class="content-spot"
              />
              <svg-icon
                v-for="(v, i) in 15"
                :key="`${i}-2`"
                icon-class="yellow-spot"
                class="content-spot"
              />
            </div>
          </div>
          <div class="item">
            <div class="label">本土感染</div>
            <div class="value">{{ overview.china.new_asymptomatic_local }}</div>
          </div>
          <div class="item">
            <div class="label">境外输入</div>
            <div class="value">{{ overview.china.new_asymptomatic_input }}</div>
          </div>
          <div class="item">
            <div class="label">总计</div>
            <template
              v-if="
                isNaN(
                  overview.china.new_asymptomatic_local +
                    overview.china.new_asymptomatic_input
                )
              "
            >
              <div class="value">0</div>
            </template>
            <template v-else>
              <div class="value">
                {{
                  overview.china.new_asymptomatic_local +
                    overview.china.new_asymptomatic_input
                }}
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="left-2-item-2 box-border">
        <div class="header">
          <div class="title">
            <div class="triangle" />
            全国风险等级情况
          </div>
          <div class="time">截止：{{ count_date }}</div>
        </div>
        <div class="content-box box-border">
          <div class="left">
            <div class="icon">
              <img :src="require('@/assets/images/warning_red.png')" alt="">
            </div>
            <div class="item">
              <div class="value">{{ riskLevelData.high_risk_area }}个</div>
              <div class="label">高风险地区</div>
            </div>
            <div class="item">
              <div class="value">{{ riskLevelData.high_risk_area_yday }}</div>
              <div class="label">较昨日</div>
            </div>
          </div>
          <svg-icon icon-class="line" class="content-line" />
          <div class="right">
            <div class="icon">
              <img
                :src="require('@/assets/images/warning_yellow.png')"
                alt=""
              >
            </div>
            <div class="item">
              <div class="value">{{ riskLevelData.medium_risk_area }}个</div>
              <div class="label">中风险地区</div>
            </div>
            <div class="item">
              <div class="value">{{ riskLevelData.medium_risk_area_yday }}</div>
              <div class="label">较昨日</div>
            </div>
          </div>
        </div>
      </div>
      <div class="left-2-bottom box-border">
        <div class="header">
          <div class="title">
            <div class="triangle" />
            全国疫情中高风险名单
          </div>
          <template v-if="isNaN(riskLevelData.high_risk_area + riskLevelData.medium_risk_area)">
            <div class="time">中高风险地区（0个）</div>
          </template>
          <template v-else>
            <div class="time">中高风险地区（{{ riskLevelData.high_risk_area + riskLevelData.medium_risk_area }}个）</div>
          </template>
        </div>
        <div class="content-box box-border">
          <div v-for="(v, i) in mediumHighRiskAreaData" :key="i" class="item">
            <div class="top">
              <svg-icon icon-class="position" />
              <div class="title">{{ v.area_name }}</div>
            </div>
            <div class="bottom">
              <span v-for="(val, j) in v.community" :key="j" class="span">
                {{ val.name }}&nbsp;&nbsp;&nbsp;{{ val.level }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="center box-border">
      <div class="c-content box-border">
        <province-map :data="mapData" />
      </div>
      <div class="c-bottom">
        <div
          v-for="(v, i) in navList"
          :key="i"
          class="nav-item box-border"
          @click="targetUrl(v.path)"
        >
          <div class="label">{{ v.name }}</div>
          <div class="icon animation-chart">
            <img :src="v.icon" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="right-2 box-border">
      <div class="right-2-top box-border">
        <div class="title">
          <div class="triangle" />
          广东省疫情概览
        </div>
        <div class="content-box box-border">
          <div class="left-bg animation-img">
            <img :src="require('@/assets/images/right2_1.png')" alt="">
          </div>
          <svg-icon icon-class="line" class="content-line" />
          <div class="right-content">
            <div class="item">
              <div class="value">{{ overview.guangdong.total_case }}</div>
              <div class="label">累计确诊病例</div>
            </div>
            <div class="item">
              <div class="value">{{ overview.guangdong.total_death }}</div>
              <div class="label">累计死亡例</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-2-item box-border">
        <div class="left">
          <div class="title">
            新增确诊病例
          </div>
          <div class="content">
            <div class="animation-value">
              <lottie :options="defaultOptions" class="lottie" />
              <template
                v-if="
                  isNaN(
                    overview.guangdong.newCaseLocal +
                      overview.guangdong.newCaseOut
                  )
                "
              >
                <div class="value">0</div>
              </template>
              <template v-else>
                <div class="value">
                  {{
                    overview.guangdong.newCaseLocal +
                      overview.guangdong.newCaseOut
                  }}
                </div>
              </template>
            </div>
            <div class="right-2-item-content">
              <div class="top">
                <div class="label">本土感染：</div>
                <div class="value">{{ overview.guangdong.newCaseLocal }}例</div>
              </div>
              <div class="bottom">
                <div class="label">境外输入：</div>
                <div class="value">{{ overview.guangdong.newCaseOut }}例</div>
              </div>
            </div>
            <!--锚点 -->
          </div>
        </div>
        <svg-icon icon-class="line" class="content-line" />
        <div class="right">
          <div class="title">
            新增无症状感染者
          </div>
          <div class="content">
            <div class="animation-value">
              <lottie :options="defaultOptions" class="lottie" />
              <template
                v-if="
                  isNaN(
                    overview.guangdong.newNoLocal + overview.guangdong.newNoOut
                  )
                "
              >
                <div class="value">0</div>
              </template>
              <template v-else>
                <div class="value">
                  {{
                    overview.guangdong.newNoLocal + overview.guangdong.newNoOut
                  }}
                </div>
              </template>
            </div>
            <div class="right-2-item-content">
              <div class="top">
                <div class="label">本土感染：</div>
                <div class="value">{{ overview.guangdong.newNoLocal }}例</div>
              </div>
              <div class="bottom">
                <div class="label">境外输入：</div>
                <div class="value">{{ overview.guangdong.newNoOut }}例</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-2-center box-border">
        <div class="title">
          <div class="triangle" />
          广东省省外输入新冠疫情时间分布
        </div>
        <div class="content-box box-border">
          <guangdong-outter
            :x="guangdongTimeLineBar.x"
            :data="[
              guangdongTimeLineBar.total_case_outter,
              guangdongTimeLineBar.total_asymptomatic_outter,
              guangdongTimeLineBar.total_case_outter_sum
            ]"
          />
        </div>
      </div>
      <div class="right-2-bottom box-border">
        <div class="title">
          <div class="triangle" />
          广东省本地感染新冠疫情时间分布
        </div>
        <div class="content-box box-border">
          <guangdong-local
            :x="guangdongTimeLineBar.x"
            :data="[
              guangdongTimeLineBar.total_case_local,
              guangdongTimeLineBar.total_asymptomatic_local,
              guangdongTimeLineBar.total_case_local_sum
            ]"
          />
        </div>
      </div>
    </div>
    <div class="right-1 box-border">
      <div class="right-1-top box-border">
        <div class="title">
          <div class="triangle" />
          香港疫情概览
        </div>
        <div class="content-box box-border">
          <div class="left-bg animation-img">
            <img :src="require('@/assets/images/right1_1.png')" alt="">
          </div>
          <svg-icon icon-class="line" class="content-line" />
          <div class="right-content">
            <div class="item">
              <div class="value">{{ overview.hongkong.total_case }}</div>
              <div class="label">累计确诊病例</div>
            </div>
            <div class="item">
              <div class="value">{{ overview.hongkong.total_death }}</div>
              <div class="label">累计死亡例</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-1-item box-border">
        <div class="title">
          新增确诊病例
        </div>
        <div class="content-box">
          <!--锚点 -->
          <div class="animation-value">
            <lottie :options="defaultOptions" class="lottie" />
            <template
              v-if="
                isNaN(
                  overview.hongkong.new_case_local +
                    overview.hongkong.new_case_input
                )
              "
            >
              <div class="value">0</div>
            </template>
            <template v-else>
              <div class="value">
                {{
                  overview.hongkong.new_case_local +
                    overview.hongkong.new_case_input
                }}
              </div>
            </template>
          </div>
          <div class="right-1-content-box">
            <div class="top">
              <div class="item">
                <div class="label">本土感染：</div>
                <div class="value">{{ overview.hongkong.new_case_local }}</div>
              </div>
              <div class="item">
                <div class="label">较昨日：</div>
                <template v-if="overview.hongkong.new_case_local_than_yday > 0">
                  <div class="value">
                    +{{ overview.hongkong.new_case_local_than_yday }}
                  </div>
                </template>
                <template v-else>
                  <div class="value">
                    {{ overview.hongkong.new_case_local_than_yday }}
                  </div>
                </template>
              </div>
              <div class="item">
                <div class="label">环比：</div>
                <template v-if="overview.hongkong.new_case_local_ratio > 0">
                  <div class="value">
                    +{{ overview.hongkong.new_case_local_ratio }}%
                  </div>
                </template>
                <template v-else>
                  <div class="value">
                    {{ overview.hongkong.new_case_local_ratio }}%
                  </div>
                </template>
              </div>
            </div>
            <div class="bottom">
              <div class="item">
                <div class="label">境外输入：</div>
                <div class="value">{{ overview.hongkong.new_case_input }}</div>
              </div>
              <div class="item">
                <div class="label">较昨日：</div>
                <template v-if="overview.hongkong.new_case_input_than_yday > 0">
                  <div class="value">
                    +{{ overview.hongkong.new_case_input_than_yday }}
                  </div>
                </template>
                <template v-else>
                  <div class="value">
                    {{ overview.hongkong.new_case_input_than_yday }}
                  </div>
                </template>
              </div>
              <div class="item">
                <div class="label">环比：</div>
                <template v-if="overview.hongkong.new_case_input_ratio > 0">
                  <div class="value">
                    +{{ overview.hongkong.new_case_input_ratio }}%
                  </div>
                </template>
                <template v-else>
                  <div class="value">
                    {{ overview.hongkong.new_case_input_ratio }}%
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="right-1-center box-border">
        <div class="title">
          <div class="triangle" />
          香港11月新冠肺炎疫情新增时间分布
        </div>
        <div class="content-box box-border">
          <hongkong-line-bar
            :x="hongkongTimeLineBar.x"
            :data="[
              hongkongTimeLineBar.new_case_import,
              hongkongTimeLineBar.new_case_local,
              hongkongTimeLineBar.total_case
            ]"
          />
        </div>
      </div>
      <div class="right-1-bottom box-border">
        <div class="title">
          <div class="triangle" />
          全部豁免人员入粤人数变化
          <!--锚点 -->
        </div>
        <div class="content-box box-border">
          <hongkong-line-chart :data="exemptData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RingChart from './components/RingChart'
import Lottie from 'vue-lottie'
import ProvinceMap from './components/ProvinceMap'
import GuangdongLocal from './components/GuangdongLocal'
import GuangdongOutter from './components/GuangdongOutter'
import HongkongLineBar from './components/HongkongLineBar'
// import HongkongExemption from './components/HongkongExemption'
import WorldLineBar from './components/WorldLineBar'
import AfricaLine from './components/AfricaLine'
import HongkongLineChart from './components/HongkongLineChart'

import {
  mapOveview,
  // newCaseDay,
  newCaseDayGD,
  caseMonthGD,
  caseOverview,
  caseClassificationMonth,
  exemptPersonnelChange,
  newData,
  caseGlobalAverageSevendays,
  caseAfricaAverageSevendays,
  epidemicOverview,
  riskLevel,
  mediumHighRiskArea
  // gdNewCaseDay
} from '@/api/polymerize'
import { xgRisk } from '@/api/input-forecast'

import * as favAnmData from '@/assets/json/ball.json'
import dayjs from 'dayjs'

// const param = {count_date:'2020-12-20'}

export default {
  components: {
    RingChart,
    // LineBarChart,
    // LineChart,
    // StackBar,
    Lottie,
    ProvinceMap,
    GuangdongLocal,
    GuangdongOutter,
    HongkongLineBar,
    // HongkongExemption,
    WorldLineBar,
    AfricaLine,
    HongkongLineChart
  },
  data() {
    return {
      exemptData: [],
      defaultOptions: { animationData: favAnmData.default },
      navList: [
        {
          name: '多点触发预警',
          path: '/flex-page/multipoint',
          icon: require('@/assets/images/nav/nav_multipoint.png')
        },
        {
          name: '疫情风险预测',
          path: '/scale-big/input-forecast',
          icon: require('@/assets/images/nav/nav_input.png')
        },
        {
          name: '个案扩散预测',
          path: '/scale-big/yuce1',
          icon: require('@/assets/images/nav/nav_single.png')
        },
        {
          name: '舆情看板',
          path: '',
          icon: require('@/assets/images/nav/nav_sentiment.png')
        },
        {
          name: '广东省疫情概况',
          path: '/scale-big/guangdong',
          icon: require('@/assets/images/nav/nav_guangdong.png')
        },
        {
          name: '香港疫情概况',
          path: '',
          icon: require('@/assets/images/nav/nav_hongkong.png')
        },
        {
          name: '全国疫情概况',
          path: '',
          icon: require('@/assets/images/nav/nav_china.png')
        },
        {
          name: '全球疫情概况',
          path: '',
          icon: require('@/assets/images/nav/nav_world.png')
        }
      ],
      count_date: '', // 搜索条件
      currentKey: '', // 当前选择

      // 概览
      overview: {
        guangdong: {
          total_case: 0, // 累计确诊
          total_death: 0, // 累计死亡
          newCaseLocal: 0, // 新增确诊病例  本地
          newCaseOut: 0, // 新增确诊病例  境外输入
          newNoLocal: 0, // 新增无症状  本地
          newNoOut: 0 // 新增无症状  境外输入             //锚点
        },
        hongkong: {
          total_case: 0, // 累计确诊
          total_death: 0, // 累计死亡
          new_case_local: 0, // 新增确诊病例  本地
          new_case_local_than_yday: 0, // 新增确诊病例  较昨日
          new_case_local_ratio: 0, // 新增确诊 环比
          new_case_input: 0, // 新增确诊  境外输入
          new_case_input_than_yday: 0, // 新增确诊  较昨日
          new_case_input_ratio: 0 // 新增确诊  环比
        },
        china: {
          total_case: 0, // 累计确诊
          total_death: 0, // 累计死亡
          new_case: 0, // 新增确诊病例
          new_case_local: 0, // 新增本土感染
          new_cade_input: 0, // 新增境外输入
          new_asymptomatic: 0, // 新增无症状感染者
          new_asymptomatic_local: 0, // 新增本土无症状感染
          new_asymptomatic_input: 0 // 新增境外无症状感染
        },
        world: {
          total_case: 0, // 累计确诊
          total_death: 0, // 累计死亡
          new_case: 0, // 新增确诊病例数
          new_case_yesterday: 0, // 昨日新增病例
          new_case_ratio: 0, // 环比
          new_death: 0, // 新增死亡病例数
          new_death_yesterday: 0, // 昨日新增死亡
          new_death_ratio: 0 // 环比
        }
      },
      // 外省输入新冠疫情时间分布
      guangdongTimeLineBar: {
        x: [],
        total_case_import: [], // 境外输入确诊
        total_case_local: [], // 本地输入确诊
        total_case_outter: [], // 省外输入确诊
        total_case_local_sum: [], // 本地累计
        total_asymptomatic_import: [], // 境外输入无症状
        total_asymptomatic_local: [], // 本地输入无症状
        total_asymptomatic_outter: [], // 省外输入无症状
        total_case_outter_sum: [] // 省外累计
      },
      hongkongTimeLineBar: {
        x: [],
        new_case_import: [],
        new_case_local: [],
        total_case: []
      },
      hongkongLine: {
        x: [],
        crossborder_driver: [],
        Business_civil_servant: [],
        sailor: [],
        crossborder_student: []
      },
      worldLineBar: {
        x: [],
        new_case_global_average_week: [],
        total_case: []
      },
      africaLineBar: {
        x: [],
        new_case_Africa_average_week: [],
        total_case: []
      },
      mediumHighRiskAreaData: [],
      mapData: [],
      riskLevelData: {}
    }
  },
  mounted() {
    this.count_date = dayjs()
      .subtract(1, 'day')
      .format('YYYY-MM-DD')
    this.init()
  },
  methods: {
    targetUrl(path) {
      if (!path) return
      this.$router.push({ path })
    },
    init() {
      this.newCaseDayGD()
      this.caseOverview()
      this.newData()
      this.epidemicOverview()
      this.caseMonthGD()
      this.caseClassificationMonth()
      // this.exemptPersonnelChange(); // todo 接口没通
      this.caseGlobalAverageSevendays()
      this.caseAfricaAverageSevendays()
      this.mediumHighRiskArea()
      this.riskLevel()
      this.mapOveview()
      this.xgRisk()
      // this.
    },
    // 广东概览
    newCaseDayGD() {
      // 锚点
      const { count_date } = this
      const param = { count_date }
      newCaseDayGD(param).then(res => {
        // console.log(res.data.today)
        this.overview.guangdong.total_case = res.data.today.total_case
        this.overview.guangdong.total_death = res.data.today.total_death
        this.overview.guangdong.newCaseLocal = res.data.today.new_case_local
        this.overview.guangdong.newCaseOut = res.data.today.new_case_import
        this.overview.guangdong.newNoLocal =
          res.data.today.new_asymptomatic_local
        this.overview.guangdong.newNoOut =
          res.data.today.new_asymptomatic_import
      })
    },
    // 香港概览
    caseOverview() {
      const { count_date } = this
      const param = { count_date }
      // console.log(param)   {count_date: "2020-12-21"}
      caseOverview(param).then(res => {
        // console.log(res)
        this.overview.hongkong.total_case = res.data.total_case
        this.overview.hongkong.total_death = res.data.total_death
        this.overview.hongkong.new_case_local = res.data.new_case_local
        this.overview.hongkong.new_case_local_than_yday =
          res.data.new_case_local_than_yday
        this.overview.hongkong.new_case_local_ratio =
          res.data.new_case_local_ratio
        this.overview.hongkong.new_case_input = res.data.new_case_input
        this.overview.hongkong.new_case_input_than_yday =
          res.data.new_case_input_than_yday
        this.overview.hongkong.new_case_input_ratio =
          res.data.new_case_input_ratio
      })
    },
    // 全球概览
    newData() {
      const { count_date } = this
      const param = { count_date }
      newData(param).then(res => {
        this.overview.world.total_case = res.data.total_case
        this.overview.world.total_death = res.data.total_death
        this.overview.world.new_case = res.data.new_case // 新增确诊病例数
        this.overview.world.new_case_yesterday = res.data.new_case_yesterday // 昨日新增病例
        this.overview.world.new_case_ratio = res.data.new_case_ratio // 环比
        this.overview.world.new_death = res.data.new_death // 新增死亡病例数
        this.overview.world.new_death_yesterday = res.data.new_death_yesterday // 昨日新增死亡
        this.overview.world.new_death_ratio = res.data.new_death_ratio // 环比
      })
    },
    // 全国概览
    epidemicOverview() {
      const { count_date } = this
      const param = { count_date }
      epidemicOverview(param).then(res => {
        this.overview.china.total_case = res.data.total_case
        this.overview.china.total_death = res.data.total_death
        this.overview.china.new_case = res.data.new_case // 新增确诊病例
        this.overview.china.new_case_local = res.data.new_case_local // 新增本土感染
        this.overview.china.new_case_input = res.data.new_case_input // 新增境外输入
        this.overview.china.new_asymptomatic = res.data.new_asymptomatic // 新增无症状感染者
        this.overview.china.new_asymptomatic_local =
          res.data.new_asymptomatic_local // 新增本土无症状感染
        this.overview.china.new_asymptomatic_input =
          res.data.new_asymptomatic_input // 新增境外无症状感染
      })
    },
    // 广东省外省输入新冠疫情时间分布
    caseMonthGD() {
      const { count_date } = this
      const param = { count_date }
      caseMonthGD(param).then(res => {
        const x = []
        const total_case_local = []
        // const total_asymptomatic_import = [];
        const total_case_outter = []
        const total_asymptomatic_local = []
        const total_asymptomatic_outter = []
        // const total_case_import = [];
        const total_case_local_sum = []
        const total_case_outter_sum = []
        res.data.forEach(v => {
          x.push(v.count_date)
          total_case_local.push(v.total_case_local)
          total_case_outter.push(v.total_case_outter)
          total_asymptomatic_local.push(v.total_asymptomatic_local)
          total_asymptomatic_outter.push(v.total_asymptomatic_outter)
          total_case_local_sum.push(
            Number(v.total_case_local) + Number(v.total_asymptomatic_local)
          )
          total_case_outter_sum.push(
            Number(v.total_case_outter) + Number(v.total_asymptomatic_outter)
          )
        })

        this.guangdongTimeLineBar = {
          x,
          total_case_local,
          total_case_outter,
          total_asymptomatic_local,
          total_asymptomatic_outter,
          total_case_local_sum,
          total_case_outter_sum
        }
      })
    },
    // 香港11月新冠肺炎疫情新增时间分布
    caseClassificationMonth() {
      const { count_date } = this
      const param = { count_date }
      caseClassificationMonth(param).then(res => {
        const x = []
        const new_case_import = []
        const new_case_local = []
        const total_case = []
        res.data.forEach(v => {
          x.push(v.count_date)
          new_case_import.push(v.new_case_import)
          new_case_local.push(v.new_case_local)
          total_case.push(v.total_case)
        })
        this.hongkongTimeLineBar = {
          x,
          new_case_import,
          new_case_local,
          total_case
        }
      })
    },
    // 全部豁免人员入粤人数变化
    exemptPersonnelChange() {
      const { count_date } = this
      const param = { count_date } // count_date: "2020-12-21"
      exemptPersonnelChange(param).then(res => {
        // console.log(res)
        const x = []
        const crossborder_driver = []
        const Business_civil_servant = []
        const sailor = []
        const crossborder_student = []
        res.data.forEach(v => {
          x.push(v.count_date)
          crossborder_driver.push(v.crossborder_driver)
          Business_civil_servant.push(v.Business_civil_servant)
          sailor.push(v.sailor)
          crossborder_student.push(v.crossborder_student)
        })
        this.hongkongLine = {
          x,
          crossborder_driver,
          Business_civil_servant,
          sailor,
          crossborder_student
        }
      })
    },
    // 全球报告新冠疫情时间分布
    caseGlobalAverageSevendays() {
      const { count_date } = this
      const param = { count_date }
      caseGlobalAverageSevendays(param).then(res => {
        // console.log(res)
        const x = []
        const new_case_global_average_week = []
        const total_case = []
        res.data.forEach(v => {
          x.push(v.count_date)
          new_case_global_average_week.push(v.new_case_global_average_week)
          total_case.push(v.total_case)
        })
        this.worldLineBar = {
          x,
          new_case_global_average_week,
          total_case
        }
      })
    },
    // 全球疫情重点关注非洲七日平均曲线
    caseAfricaAverageSevendays() {
      const { count_date } = this
      const param = { count_date }
      caseAfricaAverageSevendays(param).then(res => {
        const x = []
        const new_case_Africa_average_week = []
        const total_case = []
        res.data.forEach(v => {
          x.push(v.count_date)
          new_case_Africa_average_week.push(v.new_case_Africa_average_week)
          total_case.push(v.total_case)
        })
        this.africaLineBar = {
          x,
          new_case_Africa_average_week,
          total_case
        }
      })
    },
    // 全国疫情中高风险名单
    mediumHighRiskArea() {
      const { count_date } = this
      const param = { count_date }
      mediumHighRiskArea(param).then(res => {
        // console.log(res)
        this.mediumHighRiskAreaData = res.data
      })
    },
    mapOveview() {
      // const { count_date } = this
      // const param = { count_date }
      mapOveview({ count_date: '2020-12-25' }).then(res => {
        // console.log(res)
        // console.log(111)
        this.mapData = res.data
      })
    },
    riskLevel() {
      const { count_date } = this
      const param = { count_date }
      riskLevel(param).then(res => {
        this.riskLevelData = res.data
        // console.log(res.data)
      })
    },
    xgRisk() {
      xgRisk({ begin: '2020-11-20', end: '2020-12-04' }).then(res => {
        this.exemptData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

// 元素间距
$boxSpace: calc((100vw - #{getWidth(58.44 * 4)} - #{getWidth(26.5 * 4)}) / 9);
// 左右两侧 容器 公共样式
@mixin side-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div + div {
    margin-top: $boxSpace;
  }

  > div {
    width: 100%;
    background-color: #212342;
    border-radius: getHeight(0.5) getWidth(0.5);
    flex: none;
    padding: getHeight(0.9) getWidth(0.9);

    display: flex;
    flex-direction: column;

    .content-box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      padding: 0 getWidth(2);

      .echarts {
        width: 100%;
        height: 100%;
      }

      .content-line {
        height: 70%;
        margin: 0 getWidth(3.8);
        width: getWidth(2);
      }

      .right-content {
        display: flex;
        flex-direction: column;
        > .item {
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          > .value {
            font-family: Helvetica;
            font-size: $pageHeaderSize;
            color: #f3c819;
          }
          > .label {
            font-family: PingFangSC-Medium;
            font-size: $itemTitleSize;
            color: rgba(255, 255, 255, 0.5);
            margin-top: getHeight(1.1);
          }
          &:nth-child(2) {
            margin-top: getHeight(3);
            > .value {
              color: #ff3d7d;
            }
          }
        }
      }
    }
  }
}

.container {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: $boxSpace;

  > div + div {
    margin-left: $boxSpace;
  }
}

.left-1,
.left-2,
.right-1,
.right-2 {
  width: getWidth(58.44);
  flex: none;
  height: 100%;
}

// 左1
.left-1 {
  @include side-container;

  .left-1-top {
    height: getHeight(28.31);

    .content-box {
      display: flex;
      align-items: center;

      .left-bg {
        width: getWidth(16.13);
        height: getWidth(16.13);
        flex: none;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .left-1-item-1,
  .left-1-item-2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: getHeight(10.94);
    padding: 0 getWidth(4);

    > .item {
      height: getHeight(7.94);
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;

      > .echarts {
        width: getWidth(7.94 * 0.8);
        height: getHeight(7.94 * 0.8);
      }

      &:nth-child(2) {
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        .value {
          font-family: Helvetica;
          font-size: $digiFontSize;
          color: #00d7ec;
        }
        .label {
          font-family: PingFangSC-Medium;
          font-size: $nomalSize;
          color: rgba(255, 255, 255, 0.8);
        }
      }
      &:nth-child(3),
      &:nth-child(4) {
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        .value {
          font-family: Arial-Black;
          font-size: $itemTitleSize;
          color: rgba(255, 255, 255, 0.8);
        }
        .label {
          font-family: PingFangSC-Medium;
          font-size: $nomalSize;
          color: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }

  .left-1-center,
  .left-1-bottom {
    height: getHeight(25.56);
  }
}

// 左二
.left-2 {
  @include side-container;

  .left-2-top {
    height: getHeight(28.31);
    flex: none;

    .content-box {
      display: flex;
      align-items: center;

      .left-bg {
        width: getWidth(16.13 / 17.25 * 25.44);
        height: getWidth(16.13);

        flex: none;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .left-2-item-1 {
    height: getHeight(16.69);
    flex: none;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    .top,
    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;

        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        font-size: $nomalSize;

        .content-spot + .content-spot {
          margin-left: getWidth(0.2);
        }
        .content-spot {
          width: getWidth(0.88);
          height: getHeigth(1);
        }

        .label {
          font-family: PingFangSC-Medium;
          color: rgba(255, 255, 255, 0.5);
        }
        .value {
          margin-top: getHeight(1.25);
          font-family: Arial-Black;
          // color: rgba(255, 255, 255, 0.8);
          // box-shadow: 0rem 0.13rem 0.25rem 0rem rgba(207, 88, 101, 0.3);
          background-image: -webkit-linear-gradient(bottom, #f52b7b, #ff7c6e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        &:first-child {
          align-items: flex-start;
          .label {
            font-family: PingFangSC-Medium;
            font-size: $nomalSize;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: rgba(255, 255, 255, 0.8);
          }
          .value {
            font-size: $nomalSize;
          }
        }

        &:nth-child(3) .value {
          background-image: -webkit-linear-gradient(bottom, #ffa83b, #ffea00);
        }
        &:nth-child(4) .value {
          background-image: -webkit-linear-gradient(bottom, #5bf1fd, #0099ff);
        }
      }
    }
  }
  .left-2-item-2 {
    height: getHeight(15.5);
    flex: none;

    > .header {
      display: flex;
      justify-content: space-between;
      .time {
        font-family: PingFangSC-Medium;
        font-size: 1.25rem;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    > .content-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .content-line {
        height: 70%;
        margin: 0 getWidth(2);
      }
      > .left,
      > .right {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        > .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          > img {
            width: getWidth(5.94);
            height: getWidth(5.94);
          }
        }
        > .item {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          .label {
            font-family: PingFangSC-Medium;
            font-size: $nomalSize;
            color: rgba(255, 255, 255, 0.7);
          }
          .value {
            font-size: $pageHeaderSize;
            font-family: Helvetica;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: #fff300;
          }
        }
      }
    }
  }
  .left-2-bottom {
    height: getHeight(41.44);
    flex: none;
    .header {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      .time {
        font-family: PingFangSC-Medium;
        font-size: $nomalSmallSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: rgba(255, 255, 255, 0.4);
      }
    }
    .content-box {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      overflow-y: scroll;
      .item + .item {
        margin-top: getHeight(2);
      }
      .item {
        .top {
          display: flex;
          .title {
            font-family: PingFangSC-Medium;
            font-size: $nomalSize;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;
            color: rgba(229, 208, 166, 0.9);
            margin-left: getWidth(1);
          }
        }
        .bottom {
          font-family: PingFangSC-Medium;
          font-size: $nomalSmallSize;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: rgba(255, 255, 255, 0.7);
          padding-left: getWidth(2);

          // overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          > .span + .span {
            margin-left: getWidth(2);
          }
        }
      }
    }
  }
}

// 右二
.right-2 {
  @include side-container;

  .right-2-top {
    height: getHeight(28.31);

    .content-box {
      display: flex;
      align-items: center;

      .left-bg {
        width: getWidth(16.13 / 21.81 * 30.25);
        height: getWidth(16.13);

        flex: none;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .right-2-item {
    height: getHeight(14.81);
    display: flex;
    align-items: center;
    flex-direction: row;
    .content-line {
      height: 70%;
      margin: 0 getWidth(2);
    }
    > .left,
    > .right {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      > .content {
        display: flex;
        align-items: center;
        .right-2-item-content {
          margin-left: getWidth(1);
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          height: 100%;

          > .top,
          > .bottom {
            display: flex;
            justify-content: space-around;

            font-size: $nomalSize;
            font-weight: normal;
            font-stretch: normal;
            letter-spacing: 0rem;

            > .label {
              font-family: PingFangSC-Medium;
              color: rgba(255, 255, 255, 0.5);
            }
            > .value {
              font-family: Helvetica;
              color: #ff3d7d;
            }
          }
          > .bottom > .value {
            color: #f0e504;
          }
        }
      }
    }
  }
  .right-2-center {
    height: getHeight(30);
  }
  .right-2-bottom {
    height: getHeight(28.81);
  }
}

// 右一
.right-1 {
  @include side-container;

  .right-1-top {
    height: getHeight(28.31);

    .content-box {
      display: flex;
      align-items: center;

      .left-bg {
        width: getWidth(16.13 / 21.81 * 30.25);
        height: getWidth(16.13);
        flex: none;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .right-1-item {
    height: getHeight(14.81);

    .content-box {
      display: flex;
      align-items: center;
    }

    .right-1-content-box {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      height: 100%;
      margin-left: getWidth(2);
      > .top,
      > .bottom {
        display: flex;
        justify-content: space-between;

        .item {
          font-size: $nomalSize;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          width: 33%;
          display: flex;
          justify-content: space-around;

          .label {
            font-family: PingFangSC-Medium;
            color: rgba(255, 255, 255, 0.5);
          }
          .value {
            font-family: Helvetica;
            color: #ff3d7d;
          }
        }
      }
      > .bottom .item .value {
        color: #f0e504;
      }
    }
  }
  .right-1-center {
    height: getHeight(30);
  }
  .right-1-bottom {
    height: getHeight(28.81);
  }
}

.center {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .c-content {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .c-bottom {
    width: 100%;
    height: getHeight(41.56);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-content: space-between;

    > .nav-item + .nav-item {
      margin-left: $boxSpace;
    }

    .nav-item {
      width: calc((100% - #{$boxSpace} * 3) / 4);
      height: calc((100% - #{$boxSpace}) / 2);
      background-color: #212342;
      border-radius: getHeight(0.5) getWidth(0.5);
      &:nth-child(5) {
        margin-left: 0;
      }

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .label {
        font-family: PingFangSC-Medium;
        font-size: $itemTitleSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: rgba(255, 255, 255, 0.75);
      }

      > .icon {
        width: getWidth(10.7);
        height: getHeight(10.7);
        margin-top: getHeight(2.25);
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

// 动效 球
.animation-value {
  width: getHeight(8.8);
  height: getHeight(8.8);
  position: relative;

  > .value {
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    font-family: Helvetica;
    font-size: $pageHeaderSize;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: rgba(#fff, 0.8);
    // background-image: -webkit-linear-gradient(bottom, #f52b7b, #ff7c6e);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
}

// 标题样式
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
      border-left-color: #ffe7b3;
    }
  }
}

// 动画特效
.animation-chart {
  animation: move 10s infinite;
}
@keyframes move {
  0%,
  to {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 图片动画
.animation-img {
  background-image: linear-gradient(
    90deg,
    RGBA(0, 253, 254, 1),
    RGBA(2, 242, 249, 1)
  );
  background-clip: text;
  color: transparent;
  animation: hue 4s linear infinite;
}
@keyframes hue {
  from {
    filter: hue-rotate(0);
  }
  to {
    filter: hue-rotate(0.1turn);
  }
}

.box-border {
  // border: 1px solid red;
}
</style>
