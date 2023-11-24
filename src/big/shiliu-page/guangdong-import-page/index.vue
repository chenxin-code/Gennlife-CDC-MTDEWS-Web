<template>
  <div class="container">
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
          <div class="content-t-text">
            <div class="content-t-left">
              <div class="label">{{ v }}</div>
              <div class="value">1996</div>
              <div class="yesterday">较昨日</div>
            </div>
            <div class="content-t-right">
              <div />
              <div class="value">+4</div>
            </div>
          </div>
        </div>
      </div>
      <div class="map box-container">
        <province-map />
      </div>
    </div>
    <div class="right box-container">
      <div class="right-1-item box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          中高风险地区入粤情况
        </div>
        <div class="reagion">
          <div class="reagion-title">
            <span>中高风险地区</span>
            <span>入粤人数</span>
          </div>
          <div class="reagion-title">
            <span>中高风险地区</span>
            <span>入粤人数</span>
          </div>
        </div>
        <div class="chart-container">
          <entry-guang-dong />
        </div>
      </div>
      <div class="right-2-item box-container chart-item-container">
        <div class="title">
          <div class="triangle" />
          广东省新冠肺炎疫情累计时间分布
        </div>
        <div class="chart-container">
          <time-chart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import RingChart from './component/RingChart'
import ProvinceMap from './components/ProvinceMap'
import TimeChart from './components/TimeChart'
import EntryGuangDong from './components/EntryGuangDong'

export default {
  components: {
    ProvinceMap,
    TimeChart,
    EntryGuangDong
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
  .right {
    width: 42.81rem;
    height: 100%;
    flex: none;
  }
  .content {
    width: 100%;
    height: 100%;
  }
}

.right {
  height: 100%;
  display: flex;
  flex-direction: column;

  > div + div {
    margin-top: $boxSpace;
  }

  .right-1-item,
  .right-2-item {
    width: 100%;
    background: #212342;
    border-radius: 0.5rem;
  }

  .right-1-item {
    // height: 15.44rem;
    // height: 36.75;
    flex: 36.75;
    padding: 0;
    .title {
      margin-left: 1rem;
      margin-top: 1.06rem;
    }
    .reagion {
      display: flex;
      font-size: 0.88rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      margin-top: 1.13rem;
      width: 100%;
      .reagion-title:nth-child(1) {
        span:nth-child(1) {
          margin-left: 5.13rem;
          margin-right: 6.13rem;
        }
        span:nth-child(2) {
          margin-right: 6.94rem;
        }
      }
      .reagion-title:nth-child(2) {
        span:nth-child(1) {
          margin-right: 5.88rem;
        }
      }
    }
  }
  .right-2-item {
    // height: 22.06rem;
    flex: 22.06;
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
            font-size: 0.88rem;
            font-family: PingFang-SC-Heavy, PingFang-SC;
            font-weight: 800;
            color: #FFFFFF;
          }
          .yesterday {
            font-size: 0.75rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #FFFFFF;
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
  .chart-container {
    width: 100%;
    height: 100%;
    position: relative;
    margin-top: 0.8rem;
  }
}
</style>
