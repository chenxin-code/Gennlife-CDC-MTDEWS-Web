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
          <el-select
            v-model="subjectSelect"
            filterable
            placeholder="请选择专题"
          >
            <el-option
              v-for="item in subjectOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </div>
      <div class="search-item">
        <div class="title">
          <div class="triangle" />
          防控措施设置
        </div>
        <div class="content">
          <div class="sub-title">
            街道初始病例数设置
            <div class="add-icon">
              <i
                class="el-icon-circle-plus operation-icon"
                @click="areaArr.push({})"
              />
            </div>
          </div>
          <el-row class="content-item">
            <div class="input-label">病例发生时间：</div>
            <el-col :span="24">
              <el-date-picker
                v-model="form.case_day"
                type="date"
                value-format="yyyy-MM-dd"
              />
            </el-col>
          </el-row>
          <el-row v-for="(v, i) in areaArr" :key="i" class="content-item">
            <el-col :span="12" class="field-item">
              <div class="input-label">街道：</div>
              <el-popover class="popper" placement="top">
                <area-select :area.sync="v.adcode" :area-label.sync="v.label" />
                <el-input
                  slot="reference"
                  v-model="v.label"
                  placeholder="街道"
                  readonly
                />
              </el-popover>
            </el-col>
            <el-col :span="12" class="field-item">
              <div class="input-label">人数：</div>
              <el-input v-model="v.number" placeholder="初始病例" />
            </el-col>
            <i
              class="el-icon-delete-solid operation-icon"
              @click="areaArr.splice(i, 1)"
            />
          </el-row>

          <div class="sub-title">
            不同防控措施力度
          </div>
          <el-row class="content-item">
            <el-col :span="12" class="field-item">
              <div class="input-label">保护人群比例：</div>
              <el-input
                v-model="form.ratio_of_protecte"
                placeholder="保护人群比例"
              />
            </el-col>
            <el-col :span="12" class="field-item">
              <div class="input-label">医学隔离比例</div>
              <!-- todo 限制对应的是 医学隔离病比例， 是否是 ui文字错了  -->
              <el-input v-model="form.qualantine" placeholder="隔离病例比例" />
            </el-col>
          </el-row>
          <el-row class="content-item">
            <el-col :span="12" class="field-item">
              <div class="input-label">交通限制比例：</div>
              <el-input
                v-model="form.traffic_restrictions"
                placeholder="交通限制比例"
              />
            </el-col>
            <el-col :span="12" class="field-item">
              <div class="input-label">社交疏离程度：</div>
              <el-input
                v-model="form.social_distance"
                placeholder="社交疏离程度"
              />
            </el-col>
          </el-row>
          <div class="sub-title">不同防控开始时间</div>
          <el-row class="content-item">
            <el-col :span="24" class="field-item">
              <div class="input-label">防控起始时间：</div>
              <el-date-picker
                v-model="daterange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              />
            </el-col>
          </el-row>
          <el-row class="content-item">
            <el-col :span="24" class="field-item">
              <div class="input-label">预测天数：</div>
              <el-input v-model="form.max_sim" placeholder="预测天数" />
            </el-col>
          </el-row>

          <div class="sub-title">
            其他设置
          </div>
          <el-row class="content-item">
            <el-col :span="24" class="field-item">
              <div class="input-label">sigma值：</div>
              <el-input v-model="form.sigma" placeholder="sigma值" />
            </el-col>
          </el-row>
          <el-row class="content-item">
            <el-col :span="24" class="field-item">
              <div class="input-label">beta值：</div>
              <el-input v-model="form.beta" placeholder="beta值" />
            </el-col>
          </el-row>
          <el-row class="content-item">
            <el-col :span="24" class="field-item">
              <div class="input-label">gamma值：</div>
              <el-input v-model="form.gamma" placeholder="gamma值" />
            </el-col>
          </el-row>
        </div>
      </div>

      <div class="operation">
        <div class="reset" @click="resetForm">重置</div>
        <div class="submit" @click="fetchData">执行</div>
      </div>
    </div>
    <div class="center">
      <!-- <echarts-map :prints="currentPrints" /> -->
      <!-- <mapbox /> -->
      <!-- <gaode-map
        :prints="currentPrints"
        :allPrints="currentAllPrints"
        :isAdd="isAdd"
        :isNew="isNew"
      /> -->
      <yue-zheng-map
        :prints="currentPrints"
        :allPrints="currentAllPrints"
        :isAdd="isAdd"
        :isNew="isNew"
      />

      <!-- 左下角占比显示 -->
      <div v-if="x_days.length > 0" class="left-bottom">
        <div class="infected_cumulative">
          <div class="label">新增感染者数量</div>
          <div class="value">{{ currentNewNums }}</div>
        </div>
        <div class="infected_cumulative">
          <div class="label">累计感染者数量</div>
          <div class="value">{{ currentAddNums }}</div>
        </div>
        <div class="infected_cumulative">
          <div class="label">累计感染者占总人口数的比值</div>
          <div class="value">{{ currentInfectedCumulative }}</div>
        </div>
      </div>

      <!-- 播放条 -->
      <div v-if="x_days.length > 0" class="player">
        <i
          v-if="!isPlay"
          class="el-icon-video-play player-icon operation-icon"
          @click="play"
        />
        <i
          v-else
          class="el-icon-video-pause player-icon operation-icon"
          @click="stop"
        />

        <el-input-number
          v-model="step"
          class="step"
          label="步长"
          @change="playChange"
        />
        <div class="checkbox">
          <div class="item">
            <span class="label">新增病例</span>
            <el-switch v-model="isNew" active-text="是" inactive-text="否" />
          </div>
          <div class="item">
            <span class="label">累计病例</span>
            <el-switch v-model="isAdd" active-text="是" inactive-text="否" />
          </div>
        </div>
        <el-slider
          v-model="currentDate"
          class="video-slider"
          :min="0"
          :max="x_days.length - 1"
          :marks="x_days_data"
          :format-tooltip="sliderTooltip"
          @change="playChange"
        />
      </div>
    </div>
    <div class="right">
      <div class="title">
        <div class="triangle" />
        不同防控措施流行曲线
      </div>

      <div class="search-item">
        <area-select :area.sync="county" />
      </div>

      <div class="chart">
        <line-bar-chart :data="currentChartData" :x="x_days" />
      </div>
    </div>
  </div>
</template>

<script>
import LineBarChart from './components/LineBarChart'
import AreaSelect from './components/AreaSelect'
// import EchartsMap from "./components/EchartsMap";
// import Mapbox from "./components/Mapbox";
// import GaodeMap from "./components/GaodeMap";
import YueZhengMap from './components/YueZhengMap'

import { timesprad } from '@/api/input-forecast'
import { Message } from 'element-ui'

const defaultAreaArr = [
  { adcode: 44010421, label: '矿泉街道', number: 6 },
  { adcode: 44011106, label: '黄石街道', number: 1 },
  { adcode: 44011111, label: '白云湖街道', number: 1 }
]

const defaultForm = {
  case_day: '2020-04-07', // 病例发生时间
  reduced_start: '2020-04-15', // 防控起始时间
  reduced_stop: '2020-06-06', // 防控结束时间
  ratio_of_protecte: 0, // 保护人群比例，默认值为0.0  | 	取值范围[0,1]
  social_distance: 0.7, // 	社交疏离程度，默认值为0.0  | 	取值范围[0,1]
  qualantine: 0.6, // 医学隔离病比例，默认值为0.0 | 取值范围[0,1]
  traffic_restrictions: 0.2, // 交通限制比例，默认值为0.2 | 取值范围[0,1]
  max_sim: 23, // 	预测天数,默认值60 | 取值范围[30,80]
  zonedt: defaultAreaArr.reduce((a, b) => {
    return { ...a, [b.adcode]: Number(b.number) }
  }, {}), // 病例字典，{编码：人数}
  sigma: 1 / 5.8,
  beta: 0.6,
  gamma: 0.25
}

let playTimeArr = [] // 播放定时器数组

export default {
  components: {
    LineBarChart,
    AreaSelect,
    // EchartsMap,
    // Mapbox,
    // GaodeMap,
    YueZhengMap
  },
  data() {
    return {
      // 专题选择
      subjectOption: [],
      subjectSelect: '广州4月新冠病例分析',
      // 表单相关
      areaArr: Object.assign([], defaultAreaArr), // 地区数据
      daterange: [defaultForm.reduced_start, defaultForm.reduced_stop], // 防控时间
      form: Object.assign({}, defaultForm),
      // 返回数据相关
      prints: {}, // 未来天数对应的感染人数坐标
      x_days: [], // 未来天数
      x_days_data: {}, // 未来天数 对应到进度条
      data_info: {}, // 各个区县未来天数的感染人数情况
      infected: {}, // 感染者占总人口数的比值
      infected_cumulative: {}, // 累计感染者占总人口数的比值
      add_nums: [],
      new_nums: [],
      // 播放相关
      isPlay: false, // 是否在播放
      currentDate: 0, // 播放进度
      step: 1, // 步长
      isAdd: true, // 是否显示累计
      isNew: true, // 是否显示新增
      // loading
      loading: false,
      // 右边图表相关
      county: null // 选中的 街道
    }
  },
  computed: {
    // 播放的数据
    currentPrints() {
      if (this.x_days.length > 0) {
        return this.prints[this.x_days_data[this.currentDate].value]
      }
      return []
    },
    // 当前新增数
    currentNewNums() {
      if (this.x_days.length > 0) {
        return this.new_nums[this.x_days_data[this.currentDate].value]
      }
      return []
    },
    // 当前累计数
    currentAddNums() {
      if (this.x_days.length > 0) {
        return this.add_nums[this.x_days_data[this.currentDate].value]
      }
      return []
    },
    currentAllPrints() {
      if (this.x_days.length > 0) {
        let arr = []
        for (let i = this.currentDate - 1; i >= 0; i--) {
          arr = arr.concat(this.prints[this.x_days_data[i].value])
        }
        return arr
      }
      return []
    },
    // 当前图表数据
    currentChartData() {
      // 取单个 街道数据
      if (this.county) {
        return this.data_info[this.county]
      }

      // 取全部 数据
      return Object.values(this.data_info).reduce(
        (a, b) => {
          if (a.I.length <= 0) return b
          return {
            I: b.I.map((v, i) => {
              return a.I[i] + v
            }),
            ADD_I: b.ADD_I.map((v, i) => {
              return a.ADD_I[i] + v
            })
          }
        },
        { I: [], ADD_I: [] }
      )
    },
    // 当前 累计感染者占总人口数的比值
    currentInfectedCumulative() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.infected_cumulative,
          this.x_days_data[this.currentDate].value
        )
      ) {
        return this.infected_cumulative[
          this.x_days_data[this.currentDate].value
        ]
      }
      return ''
    }
  },
  watch: {
    daterange(val) {
      this.form.reduced_start = val[0]
      this.form.reduced_stop = val[1]
    },
    areaArr: {
      deep: true,
      handler(val) {
        this.form.zonedt = val.reduce((a, b) => {
          return { ...a, [b.adcode]: Number(b.number) }
        }, {})
      }
    }
  },
  mounted() {},
  methods: {
    // 显示播放的时间
    sliderTooltip(value) {
      if (Object.prototype.hasOwnProperty.call(this.x_days, value)) {
        return this.x_days[value]
      }
      return ''
    },
    // 播放
    play() {
      this.isPlay = true
      let time = 0
      for (let i = this.currentDate; i < this.x_days.length; i += this.step) {
        playTimeArr.push(
          setTimeout(() => {
            this.tooltipIsShow = false
            this.currentDate = i
            this.tooltipIsShow = true
          }, time * 2000)
        )
        time++
      }
    },
    // 暂停
    stop() {
      this.isPlay = false
      playTimeArr.forEach(v => {
        clearTimeout(v)
      })
      playTimeArr = []
    },
    // 手动拖拽
    playChange() {
      this.stop()
      // this.play();
    },
    // 重置表单
    resetForm() {
      this.form = Object.assign({}, defaultForm)
      this.areaArr = Object.assign([], defaultAreaArr)
      this.form.daterange = [
        defaultForm.reduced_start,
        defaultForm.reduced_stop
      ]
      this.form.zonedt = defaultAreaArr.reduce((a, b) => {
        return { ...a, [b.adcode]: Number(b.number) }
      }, {})
    },
    // 获取数据
    fetchData() {
      this.loading = true

      const {
        case_day,
        reduced_start,
        reduced_stop,
        zonedt,
        beta,
        gamma,
        sigma,
        max_sim
      } = this.form
      const param = {
        case_day,
        reduced_start,
        reduced_stop,
        zonedt,
        beta,
        gamma,
        sigma,
        max_sim
      }
      // const ratioArr = [
      //   "ratio_of_protecte",
      //   "social_distance",
      //   "qualantine",
      //   "traffic_restrictions"
      // ];
      // ratioArr.forEach(v => {
      //   param[v] = this.form[v] / 100;
      // });

      timesprad(param)
        .then(res => {
          this.prints = res.data.prints
          this.x_days = res.data.x_days

          // 播放进度条默认值
          this.currentDate = 0
          this.x_days_data = res.data.x_days.reduce((a, b, i) => {
            if (b === this.form.case_day) {
              this.currentDate = i
            }
            return { ...a, [i]: { label: '', value: b }}
          }, {})
          this.data_info = res.data.data_info
          this.infected = res.data.infected
          this.infected_cumulative = res.data.infected_cumulative
          this.add_nums = res.data.add_nums
          this.new_nums = res.data.new_nums
          // 播放进度条默认值
          // if (res.data.x_days.length > 0) {
          //   let index = res.data.x_days.findIndex(v => {
          //     return v === this.form.case_day;
          //   });
          //   this.currentDate = 0;
          //   if (index !== -1) this.currentDate = index;
          // }

          // if (Object.keys(res.data.data_info).length > 0) {
          // this.county = Object.keys(res.data.data_info)[0];
          // }

          this.loading = false
        })
        .catch(err => {
          this.loading = false
          Message({ message: err.message, type: 'error' })
        })
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
    min-width: getWidth(59);
    height: 100%;
    background-color: #212342;
    border-radius: getHeight(1) getWidth(1);
    padding: getHeight(1) getWidth(1);
  }

  .right {
    width: getWidth(59);
    height: getHeight(50);
    background-color: #212342;
    border-radius: getHeight(1) getWidth(1);
    padding: getHeight(1) getWidth(1);
  }

  .left,
  .right {
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

    .player {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: getHeight(10);
      z-index: 1;
      // width: calc(100% - #{getWidth(59 * 2 + 2 * 2 + 4)});
      width: getWidth(80);

      display: flex;
      align-items: center;
      .player-icon {
        margin-right: getWidth(4);
        color: #fff;
      }
      .step {
        margin: 0 getWidth(2);
      }

      .checkbox {
        color: #fff;
        margin: 0 getWidth(4);
        display: flex;
        flex-direction: column;

        > .item + .item {
          margin-top: getHeight(4);
        }
        > .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          > .label {
            margin-bottom: getHeight(1);
          }
        }
      }

      .video-slider {
        width: 100%;
        ::v-deep {
          .el-slider__stop {
            background-color: transparent;
          }
        }
      }
    }

    .left-bottom {
      position: absolute;
      left: getWidth(59 + 10);
      bottom: getWidth(10);
      color: #fff;
      .infected_cumulative {
        display: flex;
        > .value {
          margin-right: getWidth(6);
        }
      }
    }
  }
}

.left {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  overflow-y: scroll;

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

      .field-item {
        display: flex;
        align-items: center;
      }

      .input-label {
        color: #fff;
        white-space: nowrap;
        margin-right: getWidth(1);
      }

      .popper {
        width: 100%;
      }
    }
  }

  position: relative;
  .operation {
    // position: absolute;
    position: sticky;
    bottom: getHeight(5);
    margin-top: getHeight(10);
    display: flex;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;

    // transform: translateX(-50%);

    .reset,
    .submit {
      width: getWidth(15.63);
      height: getHeight(4.5);
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

    .reset {
      border: getHeight(0.12) solid rgba(255, 255, 255, 0.6);
      color: #ffffff;
    }
    .submit {
      border: getHeight(0.12) solid #00d7ec;
      color: #00d7ec;
      margin-left: getWidth(3);
    }
  }
}

// 图标样式
.operation-icon {
  color: #fff;
  margin-left: getWidth(2);
  font-size: $nomalSize * 2;
}

.right {
  display: flex;
  flex-direction: column;
  .chart {
    width: 100%;
    height: 100%;
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
