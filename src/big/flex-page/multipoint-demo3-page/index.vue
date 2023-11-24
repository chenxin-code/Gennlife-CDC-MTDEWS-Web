<template>
  <div class="container">
    <!-- 早期预警 -->
    <div class="early box-border">
      <div class="title">早期预警</div>
      <div class="item-title">症状监测预警</div>

      <!-- 症状监测预警 -->
      <div
        v-for="(v, i) in earlyTopArr"
        :key="i"
        :class="getClass(`msg-item syndrome`, v.warnLevel)"
      >
        <div class="left">
          <div class="icon">
            <img :src="v.icon" alt="">
          </div>
          <div class="item">
            <div class="value">
              <animated-num
                :num="v.monitorTotal"
                :style="{
                  color: '#00d7ec',
                  font: 'bold 70px ds_digi'
                }"
              />
            </div>
            <div class="label">{{ v.label }}</div>
          </div>
        </div>
        <svg-icon icon-class="line" class="content-line" />
        <div class="right">
          <span class="aa-label">同期比</span>
          <diff-bar :case-nation-week="[v.left, v.right]" />
        </div>
      </div>

      <template v-for="(v, i) in earlyWarning">
        <!-- 网络舆情 -->
        <template v-if="v.type === 'network'">
          <div :key="`${i}-title`" class="item-title">{{ v.title }}</div>
          <div :key="`${i}-value`" :class="getClass('msg-item env nomal-item')">
            <div class="block">
              <legend-ring-chart
                :import-country="[{ value: 63 }, { value: 37 }]"
                :color="['yellow', 'rgba(255,255,255,.2)']"
              />
              <div class="chartText">新冠肺炎</div>
            </div>
            <div class="block">
              <legend-ring-chart
                :import-country="[{ value: 71 }, { value: 29 }]"
                :color="['yellow', 'rgba(255,255,255,.2)']"
              />
              <div class="chartText">隔离酒店</div>
            </div>
            <div class="block">
              <legend-ring-chart
                :import-country="[{ value: 35 }, { value: 65 }]"
                :color="['green', 'rgba(255,255,255,.2)']"
              />
              <div class="chartText">口罩</div>
            </div>
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
                  <animated-num
                    :num="v.monitorTotal"
                    :style="{
                      color: '#00d7ec',
                      font: 'bold 70px ds_digi'
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

    <!-- 地图部分 -->
    <div class="content box-border">
      <!-- 地图头部统计 -->
      <div class="top">
        <div v-for="(v, i) in mapTop" :key="i" class="content-t-item">
          <ring-chart class="animation-chart" />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">{{ v.label }}</div>
              <animated-num
                :num="topArrNum[v.value]"
                :style="{
                  color: '#00d7ec',
                  font: 'bold 70px ds_digi'
                }"
              />
            </div>
            <div class="content-t-right">
              <div class="label">较昨日</div>
              <div class="value">
                {{ topArrNum[v.diff] }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 地图部分 -->
      <div class="map box-container">
        <echarts-map :data="addressList" @detail="detailShow" />
      </div>
    </div>

    <!-- 重点人群 -->
    <div class="important box-border">
      <div class="title">重点人群</div>

      <!-- 展开部分 -->
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
                <animated-num
                  :num="v.monitorTotal"
                  :style="{
                    color: '#00d7ec',
                    font: 'bold 70px ds_digi'
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

      <!-- 折叠部分 -->
      <div class="items">
        <div v-for="(v, i) in importantBottomArr" :key="i" class="import-item">
          <div class="item-title">{{ v.label }}</div>
          <div :class="getClass('text', v.warnLevel)" @click="modalShow(v)">
            <div class="value">
              <animated-num
                :num="v.monitorTotal"
                :style="{
                  color: '#00d7ec',
                  font: 'bold 70px ds_digi'
                }"
              />
            </div>
            <div class="label">监测总人数</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 聚集性预警 -->
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
          @click="modalShow(v)"
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

    <!-- 列表弹框 -->
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
            @click="changeItem(i)"
          >
            <div class="img">
              <el-avatar :src="v.image" shape="square">
                <img :src="require('@/assets/images/default-head.jpg')">
              </el-avatar>
            </div>
            <div class="info">
              <div
                v-for="(val, idx) in importantListConfig"
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

    <!-- 个人信息 -->
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
import RingChart from './components/RingChart'
import AggregationTest from './components/AggregationTest'
import DiffBar from './components/DiffBar'
import LineBar from './components/LineBar'
import LegendRingChart from './components/LegendRingChart'
import EchartsMap from './components/EchartsMap'
import AnimatedNum from '@/components/AnimatedNum'

// import dayjs from "dayjs";
import { dataDesensitization } from '@/utils/index'
import runIntervel from '@/minxins/run-intervel'

// import {
//   gatherList,
//   importantList,
//   syndromeList,
//   envList,
//   netList,
//   medicineList,
//   getPersonnelInfo,
//   getImportantList,
//   getClosePersonList,
// studentList
// } from "@/api/real-api";

import {
  gatherList,
  importantList,
  syndromeList,
  envList,
  netList,
  medicineList,
  getPersonnelInfo,
  getImportantList,
  getClosePersonList
} from './dictionaries/mockdata'

import { branch1, branch2, branch3 } from './dictionaries/mockdata'

// 引入字典配置
import dictionaries from './dictionaries'
const {
  mapTop,
  earlyTopArr,
  earlyWarning,
  importantTopArr,
  importantBottomArr,
  vehicleArr,
  orgArr,
  importantListConfig
} = dictionaries
import { cloneDeep } from 'lodash'

export default {
  components: {
    RingChart,
    AggregationTest,
    EchartsMap,
    DiffBar,
    LineBar,
    LegendRingChart,
    AnimatedNum
  },
  mixins: [runIntervel],
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
      mapTop: cloneDeep(mapTop),
      earlyTopArr: cloneDeep(earlyTopArr),
      earlyWarning: cloneDeep(earlyWarning),
      importantTopArr: cloneDeep(importantTopArr),
      importantBottomArr: cloneDeep(importantBottomArr),
      vehicleArr: cloneDeep(vehicleArr),
      orgArr: cloneDeep(orgArr),
      importantListConfig: cloneDeep(importantListConfig),
      dialogVisible: false,
      dialogDetailVisible: false,
      addressList: [],
      selectData: {},
      list: [],
      activeIndex: 0,
      topArrNum: {
        num1: 2029,
        num11: '+1',
        num2: 41,
        num22: 0,
        num3: 1,
        num33: '+1',
        num4: 0,
        num44: 0
      }
    }
  },
  mounted() {
    if (this.$route.query.step) {
      const step = this.$route.query.step
      if (Number(step) === 1) {
        branch1(this.init)
      } else if (Number(step) === 2) {
        branch2(this.init)
      } else if (Number(step) === 3) {
        branch3(this.init)
      }
    } else {
      branch1(this.init)
    }

    const that = this
    document.addEventListener('keydown', function f(key) {
      if (key.code === 'F1') {
        that.$router.push({
          path: '/flex-page/multipoint-3',
          query: { step: 1 }
        })
        window.location.reload()
      }
      if (key.code === 'F2') {
        that.$router.push({
          path: '/flex-page/multipoint-3',
          query: { step: 2 }
        })
        window.location.reload()
      }
      if (key.code === 'F3') {
        that.$router.push({
          path: '/flex-page/multipoint-3',
          query: { step: 3 }
        })
        window.location.reload()
      }
    })
  },
  methods: {
    dataDesensitization,
    // 根据level 返回class
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
      this.addressList = []
      this.syndromeList()
      this.envList()
      this.netList()
      this.medicineList()
      this.importantList()
      this.gatherList()
    },
    // 症候群预警事件查询
    syndromeList() {
      syndromeList({}).then(res => {
        res.data.forEach(v => {
          const index = this.earlyTopArr.findIndex(j => {
            return String(j.syndromeCode) === String(v.syndromeCode)
          })
          if (index !== -1) {
            this.$set(this.earlyTopArr, index, {
              ...this.earlyTopArr[index],
              ...v
            })
          }
          // 地图信息
          this.setAddressList(v)
        })
      })
    },
    // 环境采样预警事件查询 TODO
    envList() {
      envList({}).then(res => {
        // res.data.forEach(v => {
        //   let index = this.earlyWarning.findIndex(j => {
        //     return String(j.syndromeCode) === String(v.syndromeCode);
        //   });
        //   if (index !== -1) {
        //     this.$set(this.earlyWarning, environment, {
        //       ...this.earlyTopArr[index],
        //       ...v
        //     });
        //   }
        //   // 地图信息
        //   this.setAddressList(v);
        // });
      })
    },
    // 网络舆情预警事件查询 TODO
    netList() {
      netList({}).then(res => {
        // res.data.forEach(v => {
        //   let index = this.earlyWarning.findIndex(j => {
        //     return String(j.syndromeCode) === String(v.syndromeCode);
        //   });
        //   if (index !== -1) {
        //     this.$set(this.earlyWarning, environment, {
        //       ...this.earlyTopArr[index],
        //       ...v
        //     });
        //   }
        //   // 地图信息
        //   this.setAddressList(v);
        // });
      })
    },
    // 药店销售预警事件查询 TODO
    medicineList() {
      medicineList({}).then(res => {
        // res.data.forEach(v => {
        //   let index = this.earlyWarning.findIndex(j => {
        //     return String(j.syndromeCode) === String(v.syndromeCode);
        //   });
        //   if (index !== -1) {
        //     this.$set(this.earlyWarning, environment, {
        //       ...this.earlyTopArr[index],
        //       ...v
        //     });
        //   }
        //   // 地图信息
        //   this.setAddressList(v);
        // });
      })
    },
    // 重点人群查询
    importantList() {
      importantList({}).then(res => {
        this.importantTopArr = cloneDeep(importantTopArr)
        this.importantBottomArr = cloneDeep(importantBottomArr)

        res.data.forEach(v => {
          let index = this.importantTopArr.findIndex(j => {
            return String(j.crowdCode) === String(v.crowdCode)
          })
          if (index !== -1) {
            this.$set(this.importantTopArr, index, {
              ...this.importantTopArr[index],
              ...v
            })
          }
          index = this.importantBottomArr.findIndex(j => {
            return String(j.crowdCode) === String(v.crowdCode)
          })
          if (index !== -1) {
            this.$set(this.importantBottomArr, index, {
              ...this.importantBottomArr[index],
              ...v
            })
          }
          // 地图信息
          this.setAddressList(v)
        })
      })
    },
    // 聚集性预警事件查询
    gatherList() {
      gatherList({}).then(res => {
        this.vehicleArr = cloneDeep(vehicleArr)
        this.orgArr = cloneDeep(orgArr)
        res.data.forEach(v => {
          let index = this.vehicleArr.findIndex(j => {
            return String(j.gatherCode) === String(v.gatherCode)
          })
          if (index !== -1) {
            this.$set(this.vehicleArr, index, {
              ...this.vehicleArr[index],
              ...v
            })
          }
          index = this.orgArr.findIndex(j => {
            return String(j.gatherCode) === String(v.gatherCode)
          })
          if (index !== -1) {
            this.$set(this.orgArr, index, {
              ...this.orgArr[index],
              ...v
            })
          }
          // 地图信息
          this.setAddressList(v)
        })
      })
    },
    // 设置地图信息
    setAddressList(data) {
      // 地图信息
      if (Number(data.warnLevel) > 0) {
        if (!data.addressList) return
        this.addressList = this.addressList.concat(
          data.addressList
            .filter(v => v)
            .map(j => ({ ...j, warnLevel: data.warnLevel }))
        )
      }
    },
    modalShow(data) {
      getImportantList({ page: 1, limit: 10, crowdCode: data.crowdCode }).then(
        res => {
          if (res.data.length <= 0) return

          this.list = res.data
          // 获取详情数据
          this.activeIndex = 0
          const { name, cardId } = res.data[this.activeIndex]
          Promise.all([
            getPersonnelInfo({ name, cardId }),
            getClosePersonList({ name, cardId, page: 1, limit: 10 })
          ]).then(res => {
            const getPersonnelInfoData = res[0].data
            const getClosePersonListData = res[1].data
            this.selectData = getPersonnelInfoData
            this.dialogVisible = true
            this.selectData.closePersonListData = getClosePersonListData
          })
        }
      )
    },
    detailShow(data) {
      const { name, cardId } = data
      Promise.all([
        getPersonnelInfo({ name, cardId }),
        getClosePersonList({ name, cardId, page: 1, limit: 10 })
      ]).then(res => {
        const getPersonnelInfoData = res[0].data
        const getClosePersonListData = res[1].data
        this.selectData = getPersonnelInfoData
        this.dialogDetailVisible = true
        this.selectData.closePersonListData = getClosePersonListData
      })
    },
    changeItem(index) {
      this.activeIndex = index
      const { name, cardId } = this.list[this.activeIndex]
      Promise.all([
        getPersonnelInfo({ name, cardId }),
        getClosePersonList({ name, cardId, page: 1, limit: 10 })
      ]).then(res => {
        const getPersonnelInfoData = res[0].data
        const getClosePersonListData = res[1].data
        this.selectData = getPersonnelInfoData
        this.dialogVisible = true
        this.selectData.closePersonListData = getClosePersonListData
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

// 元素间距
$boxSpace: calc((100% - #{getWidth(58.44 * 3)} - #{getWidth(42.25 * 4)}) / 8);

// 页面容器
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

  // 标题部分
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

/** 早期预警 */
.early {
  .title::after {
    background: linear-gradient(101deg, #ffa83b 0%, #ffea00 100%);
  }

  .syndrome {
    display: flex;
    flex-direction: row;

    .content-line {
      height: 100%;
      margin: 0 getWidth(2);
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
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex: 7;
      .aa-label {
        font-family: PingFangSC-Medium;
        font-size: $nomalSmallSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: getWidth(0.06);
        color: rgba(255, 255, 255, 1);
        writing-mode: vertical-lr;
        margin-right: getWidth(1);
      }
    }
  }

  // 网络舆情
  .env {
    .block {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
}

/** 重点人群 */
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

/** 聚集性预警 */
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

/** 中间内容 */
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

/** 左边标题 */
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

/** 右上角角标 */
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
// 闪烁
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
      font-size: $nomalSize;
      margin-bottom: getHeight(2);
      white-space: nowrap;
    }
    .more {
      font-family: PingFangSC-Medium;
      font-size: $nomalSize;
      color: rgba(31, 183, 255, 0.9);
      cursor: pointer;
      margin-left: getWidth(13);
      white-space: nowrap;
    }
    .red {
      color: rgba(255, 61, 125, 0.8);
    }
    .yellow {
      color: rgba(255, 224, 9, 0.8);
    }
    .rightContent {
      font-family: PingFangSC-Medium;
      font-size: $nomalSize;
      color: rgba(255, 255, 255, 0.9);
    }
  }
}

// 聚集性 补充样式
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
          width: getWidth(2.8);
          height: getHeight(1.4);
          border-radius: getWidth(0.4);
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

// 模态框样式
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

  .el-dialog__body {
    width: 100%;
    height: 100%;
  }
  .modal-container {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 1rem;
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
        .el-avatar {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
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

      &:hover {
        background-color: rgba(#131627, 0.6);
      }
    }

    > .active {
      background-color: #131627;
    }
  }
  .right {
    background-color: #131627;

    height: 100%;
  }
}

// 模态框样式
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

  .el-dialog__body {
    width: 100%;
    height: 100%;
  }
  .modal-container {
    display: flex;
    width: 100%;
    height: 100%;
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
