<template>
  <div class="container">
    <div class="left">
      <div class="l-top">
        <template>
          <div class="block">
            <el-date-picker
              v-model="value"
              type="daterange"
              range-separator="——"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />
          </div>
          <div class="radio">
            <input id="radio1" v-model="picked" type="radio" name value="mr">
            <input id="radio2" v-model="picked" type="radio" name value="lj">
            <label for="radio1">每日</label>
            <label for="radio2">累计</label>
          </div>
        </template>
        <div class="title">
          <div class="triangle" />
          <!-- 入境隔离人员政策调整推荐方案参数设置 -->
          隔离天数与核酸检测阳性人数
        </div>
        <bar-chart :data="leftTopData" :picked="picked" />
      </div>
      <div class="l-bottom">
        <div class="title">
          <div class="triangle" />
          <!-- 隔离天数累计核酸检测阳性人数占比情况 -->
          隔离天数与累计核酸检测阳性人数占比情况
        </div>
        <line-chart :data="leftTopData" />
      </div>
    </div>
    <div class="center">
      <div class="title">
        <div class="triangle" />
        入境隔离人员政策调整推荐方案参数设置
      </div>

      <div class="search-item">
        <div class="search-title">
          集中隔离
        </div>
        <div class="search-content">
          <div
            v-for="(v, i) in paramConfig"
            :key="i"
            class="search-content-item"
          >
            <div class="label">
              <div class="label-left">{{ v.label }}</div>
              <div class="label-right">{{ centerParam[`${i}_J`] }}</div>
            </div>
            <el-slider
              v-if="v.label === '超高风险国家'"
              v-model="centerParam[`${i}_J`]"
              :min="0"
              :max="28"
              :step="1"
            />
            <el-slider
              v-else
              v-model="centerParam[`${i}_J`]"
              :min="v.min"
              :max="v.max"
              :step="1"
            />
          </div>
        </div>
      </div>

      <div class="search-item">
        <div class="search-title">
          居家隔离
        </div>
        <div class="search-content">
          <div
            v-for="(v, i) in paramConfig"
            :key="i"
            class="search-content-item"
          >
            <div class="label">
              <div class="label-left">{{ v.label }}</div>
              <div class="label-right">{{ centerParam[`${i}_H`] }}</div>
            </div>
            <el-slider
              v-model="centerParam[`${i}_H`]"
              :min="v.min"
              :max="v.max"
              :step="1"
            />
          </div>
        </div>
      </div>

      <div class="operation">
        <div class="reset" @click="initCenterParam">重置</div>
        <div class="submit" @click="initCenterData">执行</div>
      </div>
    </div>
    <div class="right">
      <div class="title">
        <div class="triangle" />
        推演风险值
      </div>
      <div class="search-content">
        <radar-chart
          :param-config="paramConfig"
          :center-param="centerParam"
          :center-data="centerData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RadarChart from './RadarChart'
import BarChart from './BarChart'
// import ItemList1 from './ItemList1'
import LineChart from './LineChart'

import {
  lsolationStrategy,
  positiveTrend
  // cityResourceUsedInfo
} from '@/api/input-forecast'

// import { random } from "lodash";

// const paramConfig = {
//   AS: { label: "亚洲", J: 7, H: 7, min: 0, max: 14 },
//   AF: { label: "非洲", J: 14, H: 0, min: 0, max: 14 },
//   NA: { label: "北美洲", J: 14, H: 0, min: 0, max: 14 },
//   SA: { label: "南美洲", J: 14, H: 0, min: 0, max: 14 },
//   EU: { label: "欧洲", J: 14, H: 0, min: 0, max: 14 },
//   AN_OA: { label: "南极洲+大洋洲", J: 7, H: 7, min: 0, max: 14 }
// };
const paramConfig = {
  MAX_HIGH_RISK: { label: '超高风险国家', J: 7, H: 7, min: 0, max: 14 },
  HIGH_RISK: { label: '高风险国家', J: 14, H: 0, min: 0, max: 14 },
  MEDIUM_RISK: { label: '中风险国家', J: 14, H: 0, min: 0, max: 14 },
  LOW_RISK: { label: '低风险国家', J: 7, H: 7, min: 0, max: 14 }
}

export default {
  components: {
    RadarChart,
    BarChart,
    // ItemList,
    // ItemList1,
    LineChart
  },
  data() {
    return {
      picked: 'mr',
      value: '',
      paramConfig,
      centerParam: {},
      leftTopData: {},
      centerData: {},
      // leftBottomData: {},
      // leftBottomConfig: [
      //   { label: '东莞', field: 'city' },
      //   { label: '已使用容量', field: 'used' },
      //   { label: '总容量', field: 'total' },
      //   { label: '剩余容量', field: 'residue' },
      //   { label: '使用率', field: 'used_rate' }
      // ],
      activeName: 'first'
    }
  },
  watch: {
    value() {
      // this.value[0] = this.value[0].toLocaleDateString()
      // this.value[0] = this.value[0].replace(/\//g, '-')
      // this.value[1] = this.value[1].toLocaleDateString()
      // this.value[1] = this.value[1].replace(/\//g, '-')
      console.log(this.value)
      this.initCenterParam()
      this.$set(this.centerParam, 'starttime', this.value[0])
      this.$set(this.centerParam, 'endtime', this.value[1])
      // this.initLeftTopData()
      // this.initCenterData()
      // this.initLeftBottomData()
    },
    picked() {
      // this.initLeftTopData()
      console.log(this.picked)
    }
  },
  mounted() {
    this.initCenterParam()
    this.initLeftTopData()
    this.initCenterData()
    // this.initLeftBottomData()

    // let timer = null
    // // 大屏动态事件
    // const moveFunc = () => {
    //   if (timer) return
    //   timer = setInterval(() => {
    //     // 更改数据
    //     Object.keys(paramConfig).forEach((v, i) => {
    //       this.$set(this.centerParam, `${v}_J`, random(0, 30))
    //       this.$set(this.centerParam, `${v}_H`, random(0, 30))
    //     })
    //     this.initCenterData()
    //   }, 5000)
    // }
    // moveFunc()

    // // 鼠标移动， 停止移动
    // document.onmousemove = () => {
    //   clearInterval(timer)
    //   timer = null
    //   setTimeout(() => {
    //     moveFunc()
    //   }, 5000)
    // }

    // // 销毁动态事件
    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(timer)
    //   timer = null
    // })
  },
  methods: {
    // 初始化参数
    initCenterParam() {
      this.centerParam = {}
      Object.keys(paramConfig).forEach(v => {
        this.$set(this.centerParam, `${v}_J`, paramConfig[v].J)
        this.$set(this.centerParam, `${v}_H`, paramConfig[v].H)
      })
    },
    initLeftTopData() {
      positiveTrend({ status: 1 }).then(res => {
        console.log(res.data)
        this.leftTopData = res.data
        // if(this.picked == 'mr'){
        //   this.leftTopData.x = res.data.x
        //   this.leftTopData.y = res.data.y
        //   console.log(111)
        // }else if(this.picked == 'lj'){
        //   this.leftTopData.x = res.data.x
        //   this.leftTopData.y = res.data.all_yx_y
        //   console.log(222)
        // }
        // this.leftBottomData.x = res.data.x
        // this.leftBottomData.y = res.data.yx_scale
      })
    },
    initCenterData() {
      lsolationStrategy(this.centerParam).then(res => {
        this.centerData = res.data
      })
    }
    // initLeftBottomData() {
    //   cityResourceUsedInfo({ update_date: '2020-8-15' }).then(res => {
    //     this.leftBottomData = res.date
    //     this.leftBottomData.hotel_data = this.leftBottomData.hotel_data.map(
    //       v => {
    //         v.used_rate = v.used_rate + '%'
    //         return v
    //       }
    //     )
    //     this.leftBottomData.hospital_data = this.leftBottomData.hospital_data.map(
    //       v => {
    //         v.used_rate = v.used_rate + '%'
    //         return v
    //       }
    //     )
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.container {
  // padding: 0.9rem;
  padding: getHeight(1) getWidth(1);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;

  > div + div {
    // margin-left: 0.8rem;
    margin-left: getWidth(0.8);
  }

  .center,
  .right {
    height: 100%;
    // padding: 1.3rem;
    padding: getHeight(1.3) getWidth(1.3);
  }

  .left {
    // width: 22.56rem;
    // flex: none;
    flex: 1;
    border-radius: getHeight(0.38) getWidth(0.38);
  }

  .center {
    // width: 22.81rem;
    // flex: none;
    flex: 1;
    background: #212342;
    border-radius: getHeight(0.38) getWidth(0.38);
  }

  .right {
    // width: 71.69rem;
    // width: 100%;
    flex: 2;
    background: #212342;
    border-radius: getHeight(0.38) getWidth(0.38);
  }
}

.left {
  display: flex;
  flex-direction: column;

  .l-top,
  .l-bottom {
    flex: 1;
    width: 100%;
    background: #212342;
    border-radius: 0.5rem;
    padding: 1.3rem;

    display: flex;
    flex-direction: column;
    overflow: scroll;

    > .echarts {
      width: 100%;
      height: 100%;
    }

    ::v-deep {
      .el-tabs {
        height: calc(100% - #{getHeight(2)});
        display: flex;
        flex-direction: column;

        .el-tabs__item {
          color: #fff;
        }

        .el-tabs__content {
          height: 100%;
          .el-tab-pane {
            height: 100%;
          }
        }
      }
    }
  }
  .l-top {
    .block {
      margin-bottom: getHeight(2);
      ::v-deep {
        .el-input__inner {
          color: #606266;
          background-color: #212342;
          .el-range-input {
            background-color: #212342;
          }
        }
      }
    }
    .radio {
      position: absolute;
      top: getHeight(10);
      left: getWidth(27);
      z-index: 3;
      label {
        display: inline-block;
        width: getWidth(10);
        height: getHeight(3.75);
        text-align: center;
        line-height: getHeight(3.75);
        background-color: rgba(0, 116, 153, 0.17);
        border: solid 0.13rem rgba(0, 232, 255, 0.44);
        opacity: 0.8;
        font-family: PingFangSC-Semibold;
        font-size: $nomalSize;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
      }
      input:checked:nth-of-type(1) ~ label:nth-of-type(1) {
        border: solid 0.13rem #00e8ff;
        background-color: rgba(0, 232, 255, 0.12);
        color: #00e8ff;
      }
      input:checked:nth-of-type(2) ~ label:nth-of-type(2) {
        border: solid 0.13rem #00e8ff;
        background-color: rgba(0, 232, 255, 0.12);
        color: #00e8ff;
      }
      input:checked:nth-of-type(3) ~ label:nth-of-type(3) {
        border: solid 0.13rem #00e8ff;
        background-color: rgba(0, 232, 255, 0.12);
        color: #00e8ff;
      }
      input:checked:nth-of-type(4) ~ label:nth-of-type(4) {
        border: solid 0.13rem #00e8ff;
        background-color: rgba(0, 232, 255, 0.12);
        color: #00e8ff;
      }
      input[type="radio"] {
        display: none;
      }
    }
  }

  .l-bottom {
    // height: 42.06rem;
    margin-top: getHeight(3);
    > .title {
      margin-bottom: getHeight(2);
    }
  }
}

.center {
  .search-item {
    margin-top: getHeight(5);
    padding: getHeight(1.2) getWidth(1.2);

    .search-title {
      font-size: $itemTitleSize;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: getHeight(5);
    }

    .search-content-item {
      margin-top: getHeight(2);
      > .label {
        display: flex;
        justify-content: space-between;
        font-size: 0.88rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(#ffffff, 0.9);
      }

      // 修改滑动条样式
      ::v-deep {
        .el-slider__runway {
          width: 100%;
          height: getHeight(0.6);
        }
        .el-slider__bar {
          width: 100%;
          height: getHeight(0.6);
          border-radius: getHeight(0.3);
          background: linear-gradient(
              135deg,
              #f5e647,
              #ffea00,
              #ffa83b,
              #fd9617
            )
            0/400% 400%;
          animation: move 2s infinite;
        }
        .el-slider__button-wrapper {
          width: getWidth(2);
          height: getHeight(2);
          top: 50%;
          margin-top: getHeight(-1);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .el-slider__button {
          width: getWidth(1);
          height: getHeight(1);
          background: linear-gradient(102deg, #ffea00 0%, #ffa83b 100%);
          box-shadow: 0rem 0rem 0.25rem 0rem rgba(255, 234, 0, 0.3);
          border: none;
        }
        .el-slider__button.hover {
          transform: scale(2.2);
        }
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

.right {
  .search-content {
    width: 100%;
    height: 100%;
    > .echarts {
      width: 100%;
      height: 100%;
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

@keyframes move {
  0%,
  to {
    background-position-x: left;
  }
  40% {
    background-position-x: center;
  }
  60% {
    background-position-x: right;
  }

  80% {
    background-position-x: center;
  }
  100% {
    background-position-x: left;
  }
}
</style>
