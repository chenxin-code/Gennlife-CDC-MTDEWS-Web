<template>
  <div class="container">
    <div class="left">
      <div class="l-top">
        <div class="title">
          <div class="triangle" />
          隔离天数及核酸检测阳性人数
        </div>
        <bar-chart :data="leftTopData" />
      </div>
      <div class="l-bottom">
        <div class="title">
          <div class="triangle" />
          广东省各城市隔离酒店使用率
        </div>
        <item-list :data="leftBottomData" />
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
import RadarChart from './components/RadarChart'
import BarChart from './components/BarChart'
import ItemList from './components/ItemList'

import {
  lsolationStrategy,
  positiveTrend,
  cityResourceUsedInfo
} from '@/api/input-forecast'

// import { random } from 'lodash'

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
    ItemList
  },
  data() {
    return {
      paramConfig,
      centerParam: {},
      leftTopData: {},
      centerData: {},
      leftBottomData: []
    }
  },
  mounted() {
    this.initCenterParam()
    this.initLeftTopData()
    this.initCenterData()
    this.initLeftBottomData()

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
      positiveTrend({}).then(res => {
        this.leftTopData = res.data
      })
    },
    initCenterData() {
      lsolationStrategy(this.centerParam).then(res => {
        this.centerData = res.data
      })
    },
    initLeftBottomData() {
      // TODO 是否需要传参 待确认
      // let params = {
      //   citys: ["广州", "深圳", "东莞"]
      // };
      cityResourceUsedInfo({}).then(res => {
        // TODO 格式错误
        // this.leftBottomData = res.data;
        this.leftBottomData = res.date
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0.9rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  > div + div {
    margin-left: 0.8rem;
  }

  .center,
  .right {
    height: 100%;
    padding: 1.3rem;
  }

  .left {
    width: 22.56rem;
    flex: none;
    // flex: 22.56;
    border-radius: 0.5rem;
  }

  .center {
    width: 22.81rem;
    flex: none;
    // flex: 22.81;
    background: #212342;
    border-radius: 0.38rem;
  }

  .right {
    // width: 71.69rem;
    width: 100%;
    flex: 71.69;
    background: #212342;
    border-radius: 0.5rem;
  }
}

.left {
  display: flex;
  flex-direction: column;

  .l-top,
  .l-bottom {
    width: 100%;
    background: #212342;
    border-radius: 0.5rem;
    padding: 1.3rem;

    > .echarts {
      width: 100%;
      height: 100%;
    }
  }

  .l-top {
    // height: 17.56rem;
    flex: 17.56;
  }
  .l-bottom {
    // height: 42.06rem;
    flex: 42.06;
    margin-top: 0.6rem;
    > .title {
      margin-bottom: 1rem;
    }
  }
}

.center {
  .search-item {
    margin-top: 0.6rem;
    padding: 0.6rem;

    .search-title {
      font-size: 0.88rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 1.2rem;
    }

    .search-content-item {
      margin-top: 0.2rem;
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
          width: 13.06rem;
          height: 0.2rem;
        }
        .el-slider__bar {
          width: 13.06rem;
          height: 0.2rem;
          border-radius: 0.38rem;
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
          width: 0.8rem;
          height: 0.8rem;
          top: 50%;
          margin-top: -0.4rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .el-slider__button {
          width: 0.4rem;
          height: 0.4rem;
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
    bottom: 1.88rem;
    display: flex;
    left: 50%;
    transform: translateX(-50%);

    .reset,
    .submit {
      width: 7.81rem;
      height: 2.25rem;
      border-radius: 1.25rem;
      font-size: 1rem;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      text-align: center;
      line-height: 2.25rem;
      cursor: pointer;
      user-select: none;

      &:active {
        transform: scale(1.05);
      }
    }

    .reset {
      border: 0.06rem solid rgba(255, 255, 255, 0.6);
      color: #ffffff;
    }
    .submit {
      border: 0.06rem solid #00d7ec;
      color: #00d7ec;
      margin-left: 1.5rem;
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
  font-size: 0.88rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  // 标题三角形
  .triangle {
    display: inline-block;
    font-size: 0;
    overflow: hidden;
    margin-right: 0.6rem;

    &:before {
      content: "";
      position: relative;
      display: inline-block;
      border: 0.3rem solid transparent;

      position: relative;
      right: 0.1rem;
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;

      left: 0.1rem;
      border-right-width: 0;
      border-left-width: 0.6rem;
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
