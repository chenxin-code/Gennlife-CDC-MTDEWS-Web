<template>
  <div class="container">
    <div class="content box-container">
      <div class="left box-container">
        <div class="lt-item box-container">
          <div class="title">
            <div class="triangle" />
            多点触发预警
          </div>
          <div class="sub">
            <div class="sub-item">
              <div class="value">129034567</div>
              <div class="label">有症状未检测监测预警</div>
            </div>
            <div class="sub-item">
              <div class="value">1294567</div>
              <div class="label">阳性确诊监测预警</div>
            </div>
          </div>
        </div>

        <div class="lc-item box-container">
          <div class="title">
            <div class="triangle" />
            境外输入风险预测
          </div>
          <div class="chart-container">
            <diff-bar />
          </div>
        </div>

        <div class="lb-item box-container">
          <div class="title">
            <div class="triangle" />
            个案扩散风险预测
          </div>
          <div class="chart-container">
            <scatter-map />
          </div>
        </div>
      </div>
      <div class="center box-container">
        <province-map />
      </div>
      <div class="right box-container">
        <div class="guangdong">
          <div class="title">
            <div class="triangle" />
            广东疫情概况
          </div>
          <div class="sub">
            <div class="sub-item">
              <div class="value">12</div>
              <div class="label">新增确诊数</div>
            </div>
            <div class="sub-item">
              <div class="value">10</div>
              <div class="label">新增无症状感染</div>
            </div>
            <div class="sub-item">
              <div class="value">290</div>
              <div class="label">新增核酸检测</div>
            </div>
          </div>
        </div>

        <div class="macao">
          <div class="title">
            <div class="triangle" />
            香港疫情概况
          </div>

          <div class="sub">
            <div class="sub-item">
              <div class="value">1200</div>
              <div class="label">新增个案</div>
            </div>
            <div class="sub-item">
              <div class="value">200</div>
              <div class="label">输入个案</div>
            </div>
            <div class="sub-item">
              <div class="value">390</div>
              <div class="label">本地感染个案</div>
            </div>
          </div>
        </div>

        <div class="country">
          <div class="title">
            <div class="triangle" />
            全国疫情概况
          </div>
          <div class="chart-container">
            <line-chart />
          </div>
        </div>
        <div class="world">
          <div class="title">
            <div class="triangle" />
            国际疫情概况
          </div>
          <div class="chart-container">
            <bar-chart />
          </div>
        </div>
      </div>
    </div>
    <div class="nav box-container">
      <div
        v-for="(v, i) in nav"
        :key="i"
        class="nav-item box-container"
        @click="targetUrl(v.path)"
      >
        <div class="name">{{ v.name }}</div>
        <div class="icon">
          <!-- <svg-icon :icon-class="v.icon" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProvinceMap from './components/ProvinceMap'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import ScatterMap from './components/ScatterMap'
import DiffBar from './components/DiffBar'

export default {
  components: {
    ProvinceMap,
    LineChart,
    BarChart,
    ScatterMap,
    DiffBar
  },
  props: {
    // headerData: Object
  },
  data() {
    return {
      nav: [
        {
          name: '多点触发预警',
          path: '/another-big/index',
          icon: 'early-warning'
        },
        {
          name: '疫情风险预测',
          path: '/big/input-forecast/home',
          icon: 'yuce'
        },
        { name: '舆情看板', path: '', icon: 'yuqing' },
        { name: '广东省疫情概况', path: '/big/guangdong', icon: 'guangdong' },
        { name: '香港疫情概况', path: '/big/hongkong', icon: 'xianggang' },
        { name: '全国疫情概况', path: '', icon: 'quanguo' },
        { name: '全球疫情概况', path: '', icon: 'quanqiu' }
      ]
    }
  },
  mounted() {
    console.log(this.headerData)
  },
  methods: {
    targetUrl(path) {
      if (!path) return
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="scss" scoped>
$topSpace: 0.6rem;

.container {
  display: flex;
  flex-direction: column;
  padding: 0.9rem;
  box-sizing: border-box;
}

// 中间部分
.content {
  height: 100%;
  display: flex;

  .left,
  .right {
    width: 22.25rem;
    height: 100%;
    flex: none;

    .lt-item,
    .lc-item,
    .lb-item,
    .guangdong,
    .macao,
    .country,
    .world {
      padding: 1rem 0.8rem;
      display: flex;
      flex-direction: column;
    }

    .title {
      font-size: 0.88rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }

  .center {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0 $topSpace;
  }
}

.left {
  display: flex;
  flex-direction: column;
  > div + div {
    margin-top: $topSpace;
  }
  .lt-item {
    width: 22.25rem;
    // height: 8.38rem;
    flex: 9.38;
    background: #212342;
    border-radius: 0.5rem;

    > .sub .sub-item {
      flex: 1;
      .label {
        font-size: 0.75rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(#ffffff, 0.4);
      }

      &:nth-child(2) .value {
        color: rgba(255, 234, 0, 1);
      }
    }
  }
  .lc-item {
    width: 22.25rem;
    // height: 17.13rem;
    flex: 17.13;
    background: #212342;
    border-radius: 0.5rem;
    > .chart-container {
      margin-top: 0.8rem;
    }
  }
  .lb-item {
    width: 22.25rem;
    // height: 20.5rem;
    flex: 20.5;
    background: #212342;
    border-radius: 0.5rem;
    > .chart-container {
      margin-top: 0.8rem;
    }
  }
}

.right {
  display: flex;
  flex-direction: column;
  > div + div {
    margin-top: $topSpace;
  }

  .guangdong,
  .macao {
    width: 22.25rem;
    // height: 8.44rem;
    flex: 8.44;
    background: #212342;
    border-radius: 0.5rem;

    > .sub .sub-item {
      flex: 1;
    }
  }
  .country,
  .world {
    width: 22.25rem;
    // height: 14.44rem;
    flex: 14.44;
    background: #212342;
    border-radius: 0.5rem;
  }
}

// 导航
.nav {
  width: 100%;
  height: 12.31rem;
  background: #212342;
  border-radius: 0.38rem;
  display: flex;
  margin-top: $topSpace;
  flex: none;

  // 分割符
  > .nav-item + .nav-item {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      width: 0.14rem;
      height: 7.31rem;
      left: 0rem;
      background: linear-gradient(
        to bottom,
        rgba(0, 215, 236, 0.6),
        rgba(0, 215, 236, 0.6) 0.5rem,
        transparent 0.5rem,
        transparent
      );
      background-size: 100% 1rem;
    }
  }

  > .nav-item {
    width: calc(100% / 7);
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    user-select: none;
    cursor: pointer;

    .name {
      font-size: 0.88rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }

    .icon {
      margin-top: 1.7rem;
      width: 6.8rem;
      height: 6.8rem;
      display: flex;
      justify-content: center;
      align-items: center;

      // &:hover {
      animation: spin 10s linear infinite;
      // }

      > svg {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.chart-container {
  width: 100%;
  height: 100%;
  position: relative;
}

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
    > .label {
      font-size: 0.88rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(#ffffff, 0.75);
      margin-top: 1rem;
    }
    > .value {
      font-size: 1.63rem;
      font-family: ds_digi;
      font-weight: bold;
      color: #00d7ec;
    }
  }
}

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

// 旋转效果
@keyframes spin {
  0% {
    transform: rotate(0deg);
    transform: rotate3d(0, 0, 0, 0deg);
  }
  50% {
    transform: rotate(360deg);
    transform: rotate3d(0, 360, 0, 360deg);
  }
  // 100% {
  //   transform: rotate(0deg);
  //   transform: rotate3d(0, 0, 0, 0deg);
  // }
}

.box-container {
  // border: 1px solid red;
}
</style>
