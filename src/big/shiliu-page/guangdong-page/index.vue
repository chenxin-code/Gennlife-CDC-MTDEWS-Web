<template>
  <div class="container">
    <div class="left box-container">
      <div class="left-1-item box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          最近一周输入个案情况
        </div>
        <div class="chart-container">
          <diff-bar2 :data="leftTopData" />
        </div>
      </div>
      <div class="left-2-item box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          近一周境外输入个案发现途径
        </div>
        <div class="chart-container">
          <rose-chart />
        </div>
      </div>
      <div class="left-3-item box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          最近一周个案国籍分布
        </div>
        <div class="chart-container">
          <diff-bar :data="leftBottomData" />
        </div>
      </div>
    </div>
    <div class="content box-container">
      <div class="top box-container">
        <div
          v-for="(v, i) in [
            '新增确诊病例数',
            '新增无症状病例',
            '累计确诊病例',
            '累计无症状病例'
          ]"
          :key="i"
          class="content-t-item"
        >
          <ring-chart />
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="value">1996</div>
              <div class="label">{{ v }}</div>
            </div>
            <div class="content-t-right">
              <div class="value">+4</div>
              <div class="label">较昨日</div>
            </div>
          </div>
        </div>
      </div>
      <div class="map box-container">
        <province-map />
      </div>
      <div class="bottom box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          广东省新冠肺炎疫情累计时间分布
        </div>
        <div class="chart-container">
          <time-bar-chart />
        </div>
      </div>
    </div>
    <div class="right box-container">
      <div class="right-1-item box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          当日入境人员情况
        </div>
        <div class="sub">
          <div class="sub-item">
            <div class="value">12</div>
            <div class="label">入境人员</div>
          </div>
          <div class="sub-item">
            <div class="value">10</div>
            <div class="label">入境需隔离人员</div>
          </div>
          <div class="sub-item">
            <div class="value">290</div>
            <div class="label">港澳入境不/暂不 实施隔离人员</div>
          </div>
        </div>
      </div>
      <div class="right-2-item box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          境外航班入境来源情况
        </div>
        <div class="chart-container">
          <legend-ring-chart />
        </div>
      </div>
      <div class="right-3-item box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          各口岸人群分类情况
        </div>
        <div class="chart-container">
          <compact-bar />
        </div>
      </div>
      <div class="right-4-item box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          水运口岸入境情况
        </div>
        <div class="chart-container">
          <diff-bar2 :data="rightBottomData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RingChart from './components/RingChart'
import ProvinceMap from './components/ProvinceMap'
import DiffBar from './components/DiffBar'
import DiffBar2 from './components/DiffBar2'
import RoseChart from './components/RoseChart'
import LegendRingChart from './components/LegendRingChart'
import CompactBar from './components/CompactBar'
import TimeBarChart from './components/TimeBarChart'

export default {
  components: {
    RingChart,
    ProvinceMap,
    DiffBar,
    DiffBar2,
    RoseChart,
    LegendRingChart,
    CompactBar,
    TimeBarChart
  },
  data() {
    return {
      leftBottomData: [
        { name: '中国籍', value: 98 },
        { name: '约旦', value: 65 },
        { name: '印度', value: 58 },
        { name: '孟加拉', value: 47 },
        { name: '肯尼亚', value: 38 },
        { name: '意大利', value: 30 },
        { name: '土耳其', value: 68 }
      ],
      leftTopData: [
        { name: '新增境外输入个案', value: 98 },
        { name: '新增确诊个案', value: 65 },
        { name: '新增无症状感染者', value: 58 },
        { name: '新增境外输入环比', value: 47 }
      ],
      rightBottomData: [
        { name: '港澳小型船舶', value: 98 },
        { name: '国际航行船舶', value: 65 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
// 元素间距
$boxSpace: 0.7rem;

.container {
  display: flex;
  padding: 0.9rem;
  box-sizing: border-box;

  > div {
    margin-left: $boxSpace;
  }

  .left,
  .right {
    width: 22.25rem;
    height: 100%;
    flex: none;
  }
  .content {
    width: 100%;
    height: 100%;
  }
}

.left {
  display: flex;
  flex-direction: column;

  > div + div {
    margin-top: $boxSpace;
  }

  .left-1-item,
  .left-2-item,
  .left-3-item {
    width: 100%;
    background: #212342;
    border-radius: 0.5rem;
  }

  .left-1-item {
    // height: 16.25rem;
    flex: 16.25;
  }
  .left-2-item {
    // height: 20.13rem;
    flex: 20.13;
  }
  .left-3-item {
    // height: 22.25rem;
    flex: 22.25;
  }
}

.right {
  display: flex;
  flex-direction: column;

  > div + div {
    margin-top: $boxSpace;
  }

  .right-1-item,
  .right-2-item,
  .right-3-item,
  .right-4-item {
    width: 100%;
    background: #212342;
    border-radius: 0.5rem;
  }

  .right-1-item {
    // height: 9.88rem;
    flex: 9.88;
    .sub {
      display: flex;
      align-items: center;
      height: 100%;

      // 分割符
      .sub-item + .sub-item {
        position: relative;
        &::after {
          position: absolute;
          content: "";
          width: 0.12rem;
          height: 2.8rem;
          left: 0rem;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(
            to bottom,
            rgba(0, 215, 236, 0.6),
            rgba(0, 215, 236, 0.6) 0.4rem,
            transparent 0.4rem,
            transparent
          );
          background-size: 100% 0.8rem;
        }
      }

      .sub-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        flex: 1;
        position: relative;
        height: 100%;
        padding-top: 2rem;
        > .label {
          font-size: 0.88rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(#ffffff, 0.75);
          width: 90%;
          position: absolute;
          top: 4.4rem;
          text-align: center;
        }
        > .value {
          font-size: 1.63rem;
          font-family: ds_digi;
          font-weight: bold;
          color: #00d7ec;
        }
      }
    }
  }
  .right-2-item {
    // height: 15.44rem;
    flex: 15.44;
  }
  .right-3-item {
    // height: 20.94rem;
    flex: 20.94;
  }
  .right-4-item {
    // height: 11.44rem;
    flex: 11.44;
  }
}

// 中间内容
.content {
  display: flex;
  flex-direction: column;

  .top,
  .bottom {
    width: 100%;
    border-radius: 0.5rem;
    flex: none;
  }

  // 顶部环形图
  .top {
    height: 6.19rem;
    display: flex;
    justify-content: space-between;

    .content-t-item + .content-t-item {
      margin-left: $boxSpace;
    }

    .content-t-item {
      flex: none;
      width: calc((100% - #{$boxSpace * 3}) / 4);
      background: #212342;
      padding: 0.9rem 0.6rem;
      display: flex;
      border-radius: 0.5rem;

      .echarts {
        width: 6.19rem - 0.9rem * 2;
        height: 6.19rem - 0.9rem * 2;
        flex: none;
      }

      .content-t-text {
        width: 100%;
        margin-left: 0.7rem;
        display: flex;
        justify-content: space-between;

        .content-t-left,
        .content-t-right {
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .label {
            font-size: 0.75rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            // color: rgba(#ffffff, 0.4);
            color: rgba(#ffffff, 1);
          }
        }

        .content-t-left .value {
          font-family: ds_digi;
          font-size: 2.19rem;
          font-weight: bold;
        }
        .content-t-right .value {
          font-size: 0.88rem;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #ffffff;
          line-height: 1.25rem;
          background: linear-gradient(72deg, #f52b7b 0%, #ffe900 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      }

      &:nth-of-type(odd) .content-t-left .value {
        color: #ffd700;
      }
      &:nth-of-type(even) .content-t-left .value {
        color: rgba(0, 215, 236, 1);
      }
    }
  }

  .bottom {
    height: 18.38rem;
    background: #212342;
  }

  .map {
    height: 100%;
    width: 100%;
    position: relative;
  }
}

// 模块公共样式
.chart-item-container {
  padding: 1rem 0.8rem;
  display: flex;
  flex-direction: column;
  .title {
    // font-size: 0.88rem;
    font-size: 16px;
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
  .chart-container {
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 0.8rem;
  }
}

.box-container {
  // border: 1px solid red;
}
</style>
