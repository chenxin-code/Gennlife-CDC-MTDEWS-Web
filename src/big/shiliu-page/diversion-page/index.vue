<template>
  <div class="container">
    <div class="left">
      <div class="search-item">
        <div class="title">
          <div class="triangle" />
          入境人员分流方案参数设置
        </div>
        <div class="search-content">
          <div class="search-content-item">
            <div class="label">
              <div class="label-left">周期天数</div>
              <div class="label-right">{{ leftTopParam.days }}</div>
            </div>
            <el-slider
              v-model="leftTopParam.days"
              :min="7"
              :max="21"
              :step="1"
            />
          </div>

          <div class="search-content-item">
            <div class="label">
              <div class="label-left">酒店使用阈值</div>
              <div class="label-right">
                {{ leftTopParam.hotel_allot_percent }}
              </div>
            </div>
            <el-slider
              v-model="leftTopParam.hotel_allot_percent"
              :min="0.5"
              :max="1"
              :step="0.01"
            />
          </div>

          <div class="search-content-item">
            <div class="label">
              <div class="label-left">医院使用阈值</div>
              <div class="label-right">
                {{ leftTopParam.hospital_allot_percent }}
              </div>
            </div>
            <el-slider
              v-model="leftTopParam.hospital_allot_percent"
              :min="0.5"
              :max="1"
              :step="0.01"
            />
          </div>

          <div class="search-content-item">
            <div class="label">
              <div class="label-left">其他传染病所需病房占比</div>
              <div class="label-right">
                {{ leftTopParam.other_allot_percent }}
              </div>
            </div>
            <el-slider
              v-model="leftTopParam.other_allot_percent"
              :min="0"
              :max="0.5"
              :step="0.01"
            />
          </div>
        </div>
      </div>

      <div class="search-item">
        <div class="title">
          <div class="triangle" />
          分流城市
        </div>
        <div class="search-content">
          <!-- TODO 港口选择 -->
          <el-checkbox-group v-model="leftTopParam.cityname">
            <el-checkbox v-for="city in allCity" :key="city" :label="city">{{
              city
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>

      <div class="operation">
        <div class="reset" @click="resetForm">重置</div>
        <div class="submit" @click="fetchLeftTop">执行</div>
      </div>
    </div>

    <div class="content">
      <!-- TODO -->
      <!-- <div class="title">
        <div class="triangle" />
        未来两周入境人员分流方案预测分析图
      </div> -->

      <scatter-map />
    </div>

    <div class="right">
      <div class="search-item">
        <div class="title">
          <div class="triangle" />
          预测方案
        </div>
        <div class="search-content">
          <mulberry-chart :data="bypassInboundData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MulberryChart from './components/MulberryChart'
import ScatterMap from './components/ScatterMap'

import { bypassInbound } from '@/api/input-forecast'

// import { random } from 'lodash'

// const leftTopParamDefaultData = {
//   days: 14,
//   hotel_allot_percent: 0.8,
//   hospital_allot_percent: 0.8,
//   other_allot_percent: 0.1,
//   cityname: ["广州", "深圳"],
//   update_date: "2020-08-17"
// };
const leftTopParamDefaultData = {
  days: 7,
  hotel_allot_percent: 0.8,
  hospital_allot_percent: 0.8,
  other_allot_percent: 0.1,
  cityname: ['广州', '深圳'],
  update_date: '2020-08-17'
}
const allCity = [
  '广州',
  '深圳',
  '珠海',
  '汕头',
  '佛山',
  '韶关',
  '河源',
  '梅州',
  '惠州',
  '汕尾',
  '东莞',
  '中山',
  '江门',
  '阳江',
  '湛江',
  '茂名',
  '肇庆',
  '清远',
  '潮州',
  '揭阳',
  '云浮'
]

export default {
  components: {
    MulberryChart,
    ScatterMap
  },
  data() {
    return {
      leftTopParam: Object.assign({}, leftTopParamDefaultData),
      bypassInboundData: {},
      allCity
    }
  },
  mounted() {
    this.fetchLeftTop()

    // let timer = null

    // // 大屏动态事件
    // const moveFunc = () => {
    //   if (timer) return
    //   timer = setInterval(() => {
    //     this.leftTopParam.days = random(7, 21)
    //     this.leftTopParam.hotel_allot_percent = Number(
    //       random(0.5, 1).toFixed(1)
    //     )
    //     this.leftTopParam.hospital_allot_percent = Number(
    //       random(0.5, 1).toFixed(1)
    //     )
    //     this.leftTopParam.other_allot_percent = Number(
    //       random(0, 0.5).toFixed(1)
    //     )
    //     this.leftTopParam.cityname = new Array(random(0, allCity.length - 1))
    //       .fill()
    //       .map(v => allCity[random(0, allCity.length - 1)])

    //     this.fetchLeftTop()
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
    // 重置表单
    resetForm() {
      this.leftTopParam = Object.assign({}, leftTopParamDefaultData)
    },
    fetchLeftTop() {
      bypassInbound(this.leftTopParam).then(res => {
        this.bypassInboundData = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep{
.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
  background-color: rgba(255,255,255,0);
  border:1px solid rgba(255,255,255,.675);
}
.el-checkbox__inner{
  background-color: rgba(255,255,255,0);
  border:1px solid rgba(255,255,255,.675);
  color:rgba(255,255,255,.675);
}
.el-checkbox__input.is-checked+.el-checkbox__label{
  color:rgba(255,255,255,.675);
}
}
.container {
  padding: 0.9rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;

  .left,
  .right {
    height: 100%;
    background: #212342;
    border-radius: 0.5rem;
    padding: 1.3rem;
    position: relative;
    z-index: 1;
    flex: none;
  }

  .left {
    width: 22.81rem;

    .search-content-item {
      margin-top: 1rem;
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
          // width: 13.06rem;
          width: 100%;
          height: 0.2rem;
        }
        .el-slider__bar {
          // width: 13.06rem;
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
    width: 25.5rem;
    display: flex;
    flex-direction: column;

    .search-item {
      width: 100%;
      height: 100%;
    }
    .search-content {
      width: 100%;
      height: 100%;
      > .echarts {
        width: 100%;
        height: 100%;
      }
    }
  }

  .content {
    position: absolute;
    z-index: 0;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    // z-index: -1;
    // position: relative;
  }
}

.search-item + .search-item {
  margin-top: 2rem;
}
.search-item {
  display: flex;
  flex-direction: column;

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

  .search-content {
    margin-top: 1.8rem;
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
