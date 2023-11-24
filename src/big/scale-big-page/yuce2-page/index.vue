<template>
  <div
    v-loading="loading"
    class="container"
    element-loading-text="拼命计算中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="left">
      <div class="search-item">
        <div class="title">
          <div class="triangle" />
          散发疫情专题选择
        </div>
        <div class="content">
          <el-select v-model="subjectSelect" placeholder="请选择专题">
            <el-option
              v-for="item in subjectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <div class="box-item">
            <div class="sub-title">数据时间段选择</div>
            <el-radio-group v-model="type" @change="init">
              <el-radio :label="'report'">按报告时间</el-radio>
              <el-radio :label="'onset'">按发病时间</el-radio>
            </el-radio-group>
            <div>
              <el-date-picker
                v-model="onsetRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="init"
              />
              <!-- <el-date-picker
                v-if="String(type) === 'onset'"
                v-model="onsetRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="init"
              />
              <el-date-picker
                v-if="String(type) === 'report'"
                v-model="reportRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                @change="init"
              /> -->
            </div>
          </div>
        </div>
      </div>
      <div class="search-item">
        <div class="title">
          <div class="triangle" />
          病例点时空分析
        </div>
        <div class="content">
          <div class="sub-title">
            常驻地址
          </div>
          <el-row class="content-item">
            <el-col :span="24" class="field-item">
              <div class="input-label">
                前N天轨迹（0， 30）
              </div>
              <!-- range -->
              <el-slider
                v-model="timeRange"
                :min="0"
                :max="30"
                @change="init"
              />
            </el-col>
          </el-row>
          <el-row class="box-item">
            <div class="sub-title">病例与病例间关系连线</div>
            <el-col :span="24">
              <el-radio-group v-model="isCase2Case">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row class="box-item">
            <div class="sub-title">病例与其活动轨迹连线</div>
            <el-col :span="24">
              <el-radio-group v-model="isCase2Track">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row class="box-item">
            <div class="sub-title">病例与其工作地点连线</div>
            <el-col :span="24">
              <el-radio-group v-model="isCase2Work">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="search-item">
        <div class="title">
          <div class="triangle" />
          病例点范围圈定（默认病例点100米半径）
        </div>
        <div class="content">
          <el-radio-group v-model="radius">
            <el-radio :label="100">100米半径</el-radio>
            <el-radio :label="300">300米半径</el-radio>
            <el-radio :label="500">500米半径</el-radio>
            <el-radio :label="1000">1000米半径</el-radio>
            <el-radio :label="3000">3000米半径</el-radio>
            <el-radio :label="5000">5000米半径</el-radio>
          </el-radio-group>
        </div>
      </div>

      <div class="operation">
        <div class="submit" @click="showCaseNode">病例社交图</div>
      </div>
    </div>
    <div class="center">
      <!-- <echarts-map
        :casePoint="casePoint"
        :trackPoint="trackPoint"
        :workPoint="workPoint"
        :douliuPoint="douliuPoint"
        :case2CaseLine="case2CaseLine"
        :case2TrackLine="case2TrackLine"
        :case2WorkLine="case2WorkLine"
        :radius="radius"
        :isCase2Case="isCase2Case"
        :isCase2Track="isCase2Track"
        :isCase2Work="isCase2Work"
        :isCase="isCase"
        :isTrack="isTrack"
        :isWork="isWork"
        :isDouliu="isDouliu"
      /> -->
      <!-- <gaode-map
        :casePoint="casePoint"
        :trackPoint="trackPoint"
        :workPoint="workPoint"
        :douliuPoint="douliuPoint"
        :case2CaseLine="case2CaseLine"
        :case2TrackLine="case2TrackLine"
        :case2WorkLine="case2WorkLine"
        :radius="radius"
        :isCase2Case="isCase2Case"
        :isCase2Track="isCase2Track"
        :isCase2Work="isCase2Work"
        :isCase="isCase"
        :isTrack="isTrack"
        :isWork="isWork"
        :isDouliu="isDouliu"
      /> -->
      <yue-zheng-map
        :casePoint="casePoint"
        :trackPoint="trackPoint"
        :workPoint="workPoint"
        :douliuPoint="douliuPoint"
        :case2CaseLine="case2CaseLine"
        :case2TrackLine="case2TrackLine"
        :case2WorkLine="case2WorkLine"
        :radius="radius"
        :isCase2Case="isCase2Case"
        :isCase2Track="isCase2Track"
        :isCase2Work="isCase2Work"
        :isCase="isCase"
        :isTrack="isTrack"
        :isWork="isWork"
        :isDouliu="isDouliu"
      />

      <div class="left-top">
        <el-checkbox v-model="isCase">
          <span
            style="margin: 0 0.5rem;opacity: 0.5; background-color:red;border-radius: 50%; width: 1rem;height: 1rem; display: inline-block"
          />
          病例点</el-checkbox>
        <el-checkbox v-model="isTrack">
          <span
            style="margin: 0 0.5rem;opacity: 0.5;background-color:blue;border-radius: 50%; width: 1rem;height: 1rem; display: inline-block"
          />轨迹点</el-checkbox>
        <el-checkbox v-model="isDouliu">
          <span
            style="margin: 0 0.5rem;opacity: 0.5;background-color:green;border-radius: 50%; width: 1rem;height: 1rem; display: inline-block"
          />逗留点</el-checkbox>
        <el-checkbox v-model="isWork">
          <span
            style="margin: 0 0.5rem;opacity: 0.5;background-color:yellow;border-radius: 50%; width: 1rem;height: 1rem; display: inline-block"
          />工作地点</el-checkbox>
      </div>
    </div>

    <el-drawer
      :visible.sync="modelShow"
      :append-to-body="false"
      :with-header="false"
      custom-class="drawer"
    >
      <iframe
        src="/nodes.html"
        style="width:100%; height:100%"
        frameborder="0"
      />
      <!-- <case-node :data="caseNodeData" /> -->
    </el-drawer>
  </div>
</template>

<script>
// 组件相关
// import EchartsMap from "./components/EchartsMap";
// import CaseNode from "./components/CaseNode";
// import GaodeMap from "./components/GaodeMap";
import YueZhengMap from './components/YueZhengMap'

// api 相关
import {
  highRiskGroupDelineation
  // case2Social
} from '@/api/input-forecast'

// 方法相关
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)

export default {
  components: {
    // EchartsMap,
    // CaseNode,
    // GaodeMap,
    YueZhengMap
  },
  data() {
    return {
      // 专题选择
      subjectOption: [],
      subjectSelect: '广州4月新冠病例分析',
      allData: {}, // 所有数据
      // 表单相关
      type: 'onset', // 数据时间段选择
      // timeRange: [0, 30], // 前 n 天轨迹
      timeRange: 30, // 前 n 天轨迹
      onsetRange: ['2020-03-23', '2020-04-02'], // 发病时间
      reportRange: ['2020-03-23', '2020-04-02'], // 报告时间
      // loading
      loading: false,
      modelShow: false,
      caseNodeData: {},
      // 传递到地图的变量
      casePoint: [], // 病例点
      trackPoint: [], // 轨迹点
      workPoint: [], // 工作地点
      douliuPoint: [], // 逗留点
      case2CaseLine: [], // 病例间连线
      case2TrackLine: [], // 病例 轨迹连线
      case2WorkLine: [], // 病例 工作地点连线
      radius: 100, // 病例点范围圈定， 病例点、 工作地点
      isCase2Case: false, // 是否显示 病例间关联
      isCase2Track: false, // 是否显示 病例关联轨迹
      isCase2Work: false, // 是否显示 病例关联工作地点
      isCase: true, // 病例点是否显示
      isTrack: true, // 轨迹点是否显示
      isDouliu: true, // 逗留点是否显示
      isWork: true // 工作点是否显示
    }
  },
  computed: {
    // 点和线  是否显示
    pointLineShowObj() {
      const {
        isCase,
        isTrack,
        isWork,
        isDouliu,
        isCase2Case,
        isCase2Track,
        isCase2Work
      } = this
      return {
        isCase,
        isTrack,
        isWork,
        isDouliu,
        isCase2Case,
        isCase2Track,
        isCase2Work
      }
    }
  },
  watch: {
    // 监听 病例点
    casePoint: {
      deep: true,
      handler(val) {
        this.initCase2CaseLine()
        this.initCase2TrackLine()
        this.initCase2WorkLine()
      }
    },
    pointLineShowObj() {
      this.initCase2CaseLine()
      this.initCase2TrackLine()
      this.initCase2WorkLine()
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this.loading = true
      highRiskGroupDelineation({})
        .then(res => {
          this.allData = res.data
          this.init()
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 根据现有参数 做数据处理
    init() {
      this.initCasePoint()
      this.initDouliuPoint()
      this.initTrackPoint()
      this.initWorkPoint()
    },
    // 初始化 病例点 数据
    initCasePoint() {
      // const typeRange = this[`${this.type}Range`];
      const typeRange = this[`onsetRange`]
      this.casePoint = this.allData.cases.filter(v => {
        return dayjs(v[`${this.type}_date`]).isBetween(
          typeRange[0],
          typeRange[1],
          'day',
          '[]'
        )
      })
    },
    // 初始化 轨迹点 数据
    initTrackPoint() {
      this.trackPoint = this.casePoint
        .filter(v => {
          return v.guiji.length > 0
        })
        .reduce((a, b) => {
          b.guiji = b.guiji.map(v => ({
            ...v,
            ...b,
            guiji_address: v.address,
            guiji_remark: v.remark
          }))
          return [...a, ...b.guiji]
        }, [])
        .filter(v => {
          return (
            // this.timeRange[0] < v[`days_${this.type}_date`] &&
            // v[`days_${this.type}_date`] < this.timeRange[1]
            v[`days_${this.type}_date`] < this.timeRange
          )
        })
    },
    // 初始化 工作地点 数据
    initWorkPoint() {
      this.workPoint = this.casePoint
        .filter(v => {
          return v.work_address.length > 0
        })
        .reduce((a, b) => {
          b.work_address = b.work_address.map(v => ({
            ...v,
            ...b,
            work_work_address: v.address,
            work_remark: v.remark
          }))
          return [...a, ...b.work_address]
        }, [])
    },
    // 初始化 逗留点 数据
    initDouliuPoint() {
      this.douliuPoint = this.allData.douliu
    },
    // 初始化 病例间连线
    initCase2CaseLine(val) {
      if (!this.isCase) {
        this.case2CaseLine = []
        return
      }
      this.case2CaseLine = this.allData.relation
        .map(v => {
          const from = this.casePoint.find(j => {
            return Number(j.id) === Number(v.case_id)
          })
          const to = this.casePoint.find(j => {
            return Number(j.id) === Number(v.related_case_id)
          })
          if (!from || !to) return false
          return {
            coords: [
              [from.permanent_longitude, from.permanent_latitude],
              [to.permanent_longitude, to.permanent_latitude]
            ]
          }
        })
        .filter(v => v)
    },
    // 初始化 病例 轨迹连线
    initCase2TrackLine() {
      if (!this.isCase || !this.isTrack) {
        this.case2TrackLine = []
        return
      }
      this.case2TrackLine = this.casePoint.reduce((a, b) => {
        if (b.guiji.length <= 0) {
          return a
        }
        const guiji = b.guiji.map(v => {
          return {
            coords: [
              [b.permanent_longitude, b.permanent_latitude],
              [v.longitude, v.latitude]
            ]
          }
        })

        return [...a, ...guiji]
      }, [])
    },
    // 初始化 病例 工作地点连线
    initCase2WorkLine() {
      if (!this.isCase || !this.isWork) {
        this.case2WorkLine = []
        return
      }

      this.case2WorkLine = this.casePoint.reduce((a, b) => {
        if (b.work_address.length <= 0) {
          return a
        }
        const work_address = b.work_address.map(v => {
          return {
            coords: [
              [b.permanent_longitude, b.permanent_latitude],
              [v.longitude, v.latitude]
            ]
          }
        })

        return [...a, ...work_address]
      }, [])
    },
    showCaseNode() {
      this.modelShow = true
      // case2Social({}).then(res => {
      //   this.caseNodeData = res.data;
      //   this.modelShow = true;
      // });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

.container {
  display: flex;
  justify-content: space-between;
  padding: getHeight(2) getWidth(2);

  .left {
    width: getWidth(59);
    height: 100%;
    background-color: #212342;
    border-radius: getHeight(1) getWidth(1);
    padding: getHeight(1) getWidth(1);
  }

  .left {
    z-index: 1;
  }

  position: relative;
  .center {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    .left-top {
      position: absolute;
      left: getWidth(59 + 10);
      top: getHeight(10);

      ::v-deep {
        .el-checkbox {
          display: flex;
          align-items: center;
        }
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
    }
  }

  ::v-deep {
    .el-drawer__wrapper {
      // 抽屉显示
      .drawer {
        background-color: #212342;
      }
    }
  }
}

.left {
  display: flex;
  flex-direction: column;

  .search-item + .search-item {
    margin-top: getHeight(2);
  }
  .search-item {
    .sub-title {
      font-size: $nomalSize;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: getHeight(1.5);
      margin-top: getHeight(1.5);

      display: flex;
      align-items: center;
    }

    .content-item + .content-item {
      margin-top: getHeight(1);
    }

    .content-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .field-item + .field-item {
        margin-left: getWidth(2);
      }

      // .field-item {
      //   display: flex;
      //   align-items: center;
      // }

      .input-label {
        color: #fff;
        white-space: nowrap;
        margin-right: getWidth(1);
      }
    }
  }

  position: relative;
  .operation {
    position: absolute;
    bottom: getHeight(5);
    display: flex;
    left: 50%;
    transform: translateX(-50%);

    .reset,
    .submit {
      min-width: getWidth(15.63);
      height: getHeight(4.5);
      // padding: getHeight(0.5) getWidth(1);
      border-radius: getHeight(2.5) getWidth(2.5);
      border: solid getWidth(0.13) #00d7ec;
      border-radius: getHeight(4.5);
      font-size: $nomalSize;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      text-align: center;
      line-height: getHeight(4.5);
      cursor: pointer;
      user-select: none;

      &:active {
        transform: scale(1.05);
      }
    }

    .submit {
      border: getHeight(0.12) solid #00d7ec;
      color: #00d7ec;
    }
  }
}

.left {
  .search-item {
    .content {
      .sub-title {
        font-size: $nomalSize;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: getHeight(1.5);
        margin-top: getHeight(1.5);
      }

      .content-item + .content-item {
        margin-top: getHeight(1);
      }

      // 表单样式
      ::v-deep {
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: 100%;
        }
      }
    }
  }
}

// 组件样式修改
.container {
  ::v-deep {
    .el-select {
      width: 100%;
    }
    .el-input__inner {
      background-color: rgba(#020423, 0.38);
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
      width: 100%;
    }
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
</style>
