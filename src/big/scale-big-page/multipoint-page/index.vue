<template>
  <div class="container">
    <div class="left-1 box-container">
      <div class="title">聚集性预警</div>
      <msg-item
        v-for="(v, i) in gatherData"
        :key="i"
        :data="v"
        :label="'gather'"
        @click.native="
          () => {
            targetModal('aggregation', v.gatherCode);
          }
        "
      />
    </div>
    <div class="left-2 box-container">
      <div class="title">早期预警</div>
      <div class="item-title">症候群检测预警</div>
      <msg-item
        v-for="(v, i) in syndromeData"
        :key="`${i}syndromeData`"
        :data="v"
        :label="'syndrome'"
        @click.native="
          () => {
            targetModal('syndrome', v.diseaseCode);
          }
        "
      />
      <div class="item-title">环境采样监测预警</div>
      <msg-item
        v-for="(v, i) in envData"
        :key="`${i}envData`"
        :data="v"
        :label="'env'"
        @click.native="
          () => {
            targetModal('early-warning', v.goodsCode);
          }
        "
      />
      <div class="item-title">网络舆情监控预警</div>
      <msg-item
        v-for="(v, i) in netData"
        :key="`${i}netData`"
        :data="v"
        :label="'net'"
      />
      <div class="item-title">药店销售监测预警</div>
      <msg-item
        v-for="(v, i) in medicineData"
        :key="`${i}medicineData`"
        :data="v"
        :type="'medicine'"
        :label="'medicine'"
      />
    </div>
    <div class="content box-container">
      <div class="top">
        <div class="content-t-item">
          <ring-chart class="animation-chart" />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">累计确诊病例</div>
              <fan-pai
                :new-num="totalCaseFrontData.today.total_case"
                :styles="{
                  i: 0,
                  color: '#00d7ec',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="content-t-right">
              <div class="label">较昨日</div>
              <div class="value">
                {{
                  totalCaseFrontData.today.total_case -
                    totalCaseFrontData.yesterday.total_case
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="content-t-item">
          <ring-chart class="animation-chart" />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">现有确诊病例</div>
              <fan-pai
                :new-num="totalCaseFrontData.today.total_case_active"
                :styles="{
                  i: 1,
                  color: 'rgba(244, 12, 113, 0.8)',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="content-t-right">
              <div class="label">较昨日</div>
              <div class="value">
                {{
                  totalCaseFrontData.today.total_case_active -
                    totalCaseFrontData.yesterday.total_case_active
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="content-t-item">
          <ring-chart class="animation-chart" />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">今日新增无症状感染者</div>
              <fan-pai
                :new-num="totalCaseFrontData.today.new_case_asymptomatic"
                :styles="{
                  i: 2,
                  color: '#00d7ec',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="content-t-right">
              <div class="label">较昨日</div>
              <div class="value">
                {{
                  totalCaseFrontData.today.new_case_asymptomatic -
                    totalCaseFrontData.yesterday.new_case_asymptomatic
                }}
              </div>
            </div>
          </div>
        </div>
        <div class="content-t-item">
          <ring-chart class="animation-chart" />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">今日新增疑似病例</div>
              <fan-pai
                :new-num="totalCaseFrontData.today.new_case_uncertain"
                :styles="{
                  i: 3,
                  color: '#ffd807',
                  font: 'bold 3.6rem ds_digi'
                }"
              />
            </div>
            <div class="content-t-right">
              <div class="label">较昨日</div>
              <div class="value">
                {{
                  totalCaseFrontData.today.new_case_uncertain -
                    totalCaseFrontData.yesterday.new_case_uncertain
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="map box-container">
        <province-map :data="[enterData, studentData]" />
      </div>
    </div>
    <div class="right-2 box-container">
      <div class="title">多点触发预警</div>
      <msg-item :data="enterData" :label="'enter'" />
      <msg-item :data="studentData" :label="'student'" />
    </div>
    <div class="right-1 box-container">
      <div class="title">重点人群</div>
      <msg-item
        v-for="(v, i) in importantData"
        :key="`${i}important`"
        :data="v"
        :label="'important'"
        @click.native="
          () => {
            targetModal('crowd-warning', v.crowdCode);
          }
        "
      />
      <msg-item
        v-for="(v, i) in closeData"
        :key="`${i}close`"
        :data="v"
        :label="'close'"
      />
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      width="1920px"
      :append-to-body="true"
      class="motaikuang"
    >
      <early-warning
        v-if="modalType === 'early-warning' && dialogVisible"
        :type="type"
      />
      <aggregation
        v-if="modalType === 'aggregation' && dialogVisible"
        :type="type"
      />
      <syndrome v-if="modalType === 'syndrome' && dialogVisible" :type="type" />
      <crowd-warning
        v-if="modalType === 'crowd-warning' && dialogVisible"
        :type="type"
      />
    </el-dialog>
  </div>
</template>

<script>
import ProvinceMap from './components/ProvinceMap'
import MsgItem from './components/MsgItem'
import RingChart from './components/RingChart'
import EarlyWarning from './components/EarlyWarning'
import Aggregation from './components/Aggregation'
import Syndrome from './components/Syndrome'
import CrowdWarning from './components/CrowdWarning'
import FanPai from '@/big/scale-big-page/components/FanPai'

import {
  gatherList,
  importantList,
  syndromeList,
  envList,
  netList,
  medicineList,
  closeList,
  enterList,
  studentList
} from '@/api/real-api'

import { totalCaseFront } from '@/api/polymerize'

export default {
  components: {
    ProvinceMap,
    MsgItem,
    RingChart,
    EarlyWarning,
    Aggregation,
    Syndrome,
    CrowdWarning,
    FanPai
  },
  data() {
    return {
      // 聚集性事件
      gatherData: [],
      // 侯群
      syndromeData: [],
      // 环境采样预警
      envData: [],
      // 网络舆情预警
      netData: [],
      // 药店销售监测预警
      medicineData: [],
      // 重点检测人群
      importantData: [],
      // 密接人员预警
      closeData: [],
      // 入境预警监测(香港)
      enterData: {},
      // 幼儿学生多点监测预警
      studentData: {},

      dialogVisible: false,
      type: '',
      modalType: '',
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
      }
    }
  },
  mounted() {
    this.init()

    // 大屏动态事件
    // const moveFunc = () => {
    //   if (timer) return;
    //   timer = setInterval(() => {
    //     this.init();
    //   }, 5000);
    // };
    // moveFunc();

    // // 鼠标移动， 停止移动
    // document.onmousemove = () => {
    //   clearInterval(timer);
    //   timer = null;
    //   setTimeout(() => {
    //     moveFunc();
    //   }, 5000);
    // };

    // // 销毁动态事件
    // this.$once("hook:beforeDestroy", () => {
    //   clearInterval(timer);
    //   timer = null;
    // });
  },
  methods: {
    init() {
      this.gatherList()
      this.importantList()
      this.syndromeList()
      this.envList()
      this.netList()
      this.medicineList()
      this.closeList()
      this.enterList()
      this.studentList()
      // 111
      this.totalCaseFront()
    },
    gatherList() {
      gatherList({}).then(res => {
        this.gatherData = res.data
      })
    },
    importantList() {
      importantList({}).then(res => {
        this.importantData = res.data
      })
    },
    syndromeList() {
      syndromeList({}).then(res => {
        this.syndromeData = res.data
      })
    },
    envList() {
      envList({}).then(res => {
        this.envData = res.data
      })
    },
    netList() {
      netList({}).then(res => {
        this.netData = res.data
      })
    },
    medicineList() {
      medicineList({}).then(res => {
        this.medicineData = res.data
      })
    },
    closeList() {
      closeList({}).then(res => {
        this.closeData = res.data
      })
    },
    enterList() {
      enterList({}).then(res => {
        this.enterData = res.data
      })
    },
    studentList() {
      studentList({}).then(res => {
        this.studentData = res.data
      })
    },
    totalCaseFront() {
      totalCaseFront({ count_date: '2020-12-14' }).then(res => {
        this.totalCaseFrontData = res.data
      })
    },
    targetModal(modalType, type) {
      this.dialogVisible = true

      this.modalType = modalType
      this.type = type
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

// 元素间距
$boxSpace: calc((100% - #{getWidth(41 * 4)} - #{getWidth(42.25 * 4)}) / 9);

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
.left-1,
.left-2,
.right-1,
.right-2 {
  flex: none;
  width: getWidth(41);
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
    height: getHeight(5.44 + 0.38);
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
.left-1 .title::after {
  background: linear-gradient(101deg, #56ff6d 0%, #07a081 100%);
}
.left-2 .title::after {
  background: linear-gradient(270deg, #ffa83b 0%, #ffea00 100%);
}
.right-2 .title::after {
  background: linear-gradient(
    80deg,
    rgba(255, 233, 0, 1) 0%,
    rgba(245, 43, 123, 1) 100%
  );
}
.right-1 .title::after {
  background: linear-gradient(80deg, #f52b7b 0%, #ff8375 100%);
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

.container {
  height: 100%;
  // border: 1px solid red;
}

.item-title {
  width: getWidth(41.13);
  height: getHeight(3.62);
  background: #212342;
  margin-top: getHeight(1.94);
  line-height: getHeight(3.62);
  padding-left: 0.88rem;

  font-size: $itemTitleSize;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: #ffe703;

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

::v-deep {
  .el-dialog__header {
    padding: 0;
    .el-dialog__headerbtn {
      z-index: 1;
    }
  }
  .el-dialog__body {
    width: 1920px;
    height: 1080px;
    padding: 0;
  }
}
// .motaikuang{
//   background-color: red;
//     // width:15%;
//     // margin:30rem auto !important;
// }
//第二层模态框
// ::v-deep{
//   .el-popup-parent > .aggregation > .el-dialog, .el-pager li{
//     background: #212342;
//   }
// }

// 动画特效
.animation-chart {
  animation: move 6s infinite;
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
</style>
<style lang="scss">
.motaikuang {
  // background-color: red;
  // width:15%;
  // margin:30rem auto !important;
}
</style>
