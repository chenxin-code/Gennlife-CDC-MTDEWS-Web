<template>
  <div class="test-box">
    <!--左-->
    <div class="left">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="~"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
      />
      <div class="two-chart-content">
        <div>
          <tit title="隔离天数与核酸检测阳性人数" />
          <div class="chart-box" style="margin-top: 25px;">
            <div class="x-title">隔离天数</div>
            <div class="y-title">阳<br>性<br>人<br>数</div>
            <div class="tab">
              <div :class="{ item: true, active: curTab === '1' }" style="border-right: 1px solid #00d7ec" @click="curTab = '1'">每日</div>
              <div :class="{ item: true, active: curTab === '2' }" @click="curTab = '2'">累计</div>
            </div>
            <div class="chart-container">
              <bar-chart />
            </div>
          </div>
        </div>
        <div>
          <tit title="隔离天数与累计核酸检测阳性人数占比情况" />
          <div class="chart-box">
            <div class="x-title">隔离天数</div>
            <div class="y-title">阳<br>性<br>人<br>数<br>占<br>比</div>
            <div class="chart-container">
              <line-chart />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--中-->
    <div class="middle">
      <tit title="入境隔离人员政策调整推荐方案参数设置" />
      <svg-icon icon-class="time-icon" /><span>&nbsp;&nbsp;&nbsp;&nbsp;集中隔离</span>
      <div v-for="(v,k) in data1" :key="k" class="content-item">
        <div class="label">
          <div>{{ v.name }}(0,14)</div>
          <div>{{ v.day }}</div>
        </div>
        <el-slider v-model="v.day" :min="0" :max="14" :step="1" />
      </div>
      <svg-icon icon-class="time-icon" /><span>&nbsp;&nbsp;&nbsp;&nbsp;居家隔离</span>
      <div v-for="(v,k) in data2" :key="k+4" class="content-item">
        <div class="label">
          <div>{{ v.name }}(0,14)</div>
          <div>{{ v.day }}</div>
        </div>
        <el-slider v-model="v.day" :min="0" :max="14" :step="1" />
      </div>
      <div class="btn-box">
        <div class="reset">重置</div>
        <div class="submit">执行</div>
      </div>
    </div>
    <!--右-->
    <div class="right">
      <tit title="推演风险值" />
      <div class="chart-box">
        <div class="title1">集中隔离</div>
        <div class="title2">居家隔离</div>
        <radar-chart />
      </div>
    </div>
  </div>
</template>

<script>
import tit from './components/tit'
import BarChart from './components/BarChart'
import LineChart from './components/LineChart'
import RadarChart from './components/RadarChart'
import { getDays } from '@/api/test'
export default {
  components: {
    tit, BarChart, LineChart, RadarChart
  },
  data() {
    return {
      // 左
      dateRange: ['2020-01-01', '2020-12-31'],
      curTab: '1',
      // 中
      data1: [
        { name: '超高风险国家', day: 14 },
        { name: '超高风险国家', day: 14 },
        { name: '超高风险国家', day: 14 },
        { name: '超高风险国家', day: 14 }
      ],
      data2: [
        { name: '超高风险国家', day: 14 },
        { name: '超高风险国家', day: 14 },
        { name: '超高风险国家', day: 14 },
        { name: '超高风险国家', day: 14 }
      ]
      // 右

    }
  },
  mounted() {
    getDays().then(resp => {
      // console.log(resp)
      this.data1 = resp.data.data1
      this.data2 = resp.data.data2
    })
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.test-box {
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  background-color: #171833;
  display: flex;
  .left,
  .middle {
    width: 100%;
    height: 100%;
    flex: 2;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      top: 0;
      right: 10px;
      width: 1px;
      bottom: 0;
      background-image: linear-gradient(to bottom, #00d7ec 0%, #00d7ec 80%, transparent 50%);
      background-size: 100% 18px;
      background-repeat: repeat-y;
      transform: scaleX(0.4);
    }
  }
  .left {
    padding: 0 25px;
    display: flex;
    flex-direction: column;
    ::v-deep {
      .el-input__inner {
        border: none;
      }
      .el-range-editor.el-input__inner {
        background-color: inherit;
      }
      .el-range-editor .el-range-input {
        line-height: 0.8;
      }
      .el-date-editor .el-range-input {
        background-color: inherit;
        color: #fff;
      }
      .el-date-editor .el-range-input, .el-date-editor .el-range-separator {
        font-size: 12px;
      }
      .el-date-editor .el-range-separator {
        color: #fff;
      }
      .el-date-editor .el-range__icon {
        color: #00d7ec;
      }
    }
    .two-chart-content {
      margin-top: 25px;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      > div {
        flex: 1;
        //margin-bottom: 15px;
        width: 100%;
        position: relative;
        .chart-box {
          //display: flex;
          //flex-direction: column;
          //flex: 1;
          padding: 25px 0;
          width: 100%;
          height: 100%;
          .x-title {
            position: absolute;
            bottom: 10px;
            left: 50%;
            color: #fff;
            transform: translateX(-50%);
            font-size: 12px;
          }
          .y-title {
            position: absolute;
            top: 50%;
            left: -10px;
            color: #fff;
            transform: translateY(-50%);
            font-size: 12px;
          }
          .tab {
            position: absolute;
            top: 25px;
            right: 25px;
            margin-bottom: 50px;
            border-radius: 25px;
            font-size: 14px;
            border: 1px solid #00d7ec;
            display: flex;
            .item {
              flex: 1;
              color: #fff;
              padding: 5px 8px;
              cursor: pointer;
            }
            .active {
              color: #00d7ec;
            }
          }
          .chart-container {
            width: 100%;
            height: 100%;
            position: relative;
          }
        }
      }
    }
  }
  .middle {
    padding: 0 35px;
    position: relative;
    .svg-icon {
      margin-top: 17px;
      font-size: 14px;
    }
    //中
    span {
      color: #fff;
      font-size: 14px;
    }
    .content-item {
      margin-top: 17px;
      .label {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        font-weight: 500;
        color: rgba(#ffffff, 0.9);
        margin-bottom: 3px;
      }
      ::v-deep {
        .el-slider__bar {
          height: 3px;
          //background-color: yellow;
          background: linear-gradient(135deg, #f5e647, #ffea00, #ffa83b, #fd9617)
          0/400% 400%;
          animation: move 2s infinite;
        }
        .el-slider__runway {
          height: 3px;
          margin: 8px 0;
        }
        .el-slider__button {
          width: 8px;
          height: 8px;
          border: 1px solid yellow;
          background: linear-gradient(102deg, #ffea00 0%, #ffa83b 100%);
        }
        .el-slider__button-wrapper {
          height: 18px;
          width: 18px;
          top: -7.5px;
        }
      }
  }
    .btn-box {
      position: absolute;
      bottom: 25px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      .reset,
      .submit {
        width: 110px;
        height: 32px;
        border-radius: 16px;
        font-size: 16px;
        text-align: center;
        line-height: 28px;
        cursor: pointer;
      }
      .reset {
        border: 1px solid #fff;
        color: #fff
      }
      .submit {
        border: 1px solid #00d7ec;
        color: #00d7ec;
        margin-left: 20px;
      }
    }
  }
  .right {
    //width: 100%;
    flex: 3;
    width: 100%;
    height: 100%;
    position: relative;
    .chart-box {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .title1 {
        position: absolute;
        top: 25%;
        left: 25px;
        color: #fff;
        //transform: translateX(-50%);
        font-size: 12px;
      }
      .title2 {
        position: absolute;
        bottom: 25%;
        left: 25px;
        color: #fff;
        //transform: translateY(-50%);
        font-size: 12px;
      }
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
