<template>
  <div class="inner-container">
    <div class="inner-content">
      <div class="inner-left box-container">
        <div class="left-1-item box-container chart-item-container">
          <div class="general title">
            <div class="triangle" />
            <span style="color: red">本地感染概况</span>
            <div class="text">{{ pTable.all }}</div>
          </div>
        </div>

        <div class="left-2-item box-container chart-item-container">
          <div class="block">
            <div class="radio title">
              <div class="triangle" />
              <span>本地感染个案概况</span>
              <div class="text">{{ pTable.one }}</div>
            </div>
            <el-timeline :reverse="reverse">
              <el-timeline-item
                v-for="(activity, index) in newsWeek"
                :key="index"
                :timestamp="activity.count_date"
                placement="top"
              >{{ activity.new_content }}</el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
      <div class="inner-center">
        <province-map :case-distributed="caseDistributed" />
        <div class="right box-container">
          <div
            v-for="(v, i) in this.fetchConfig.rightConfig"
            :key="i"
            class="content-t-item"
          >
            <div class="content-t-text">
              <div class="content-t-left">
                <fan-pai
                  :new-num="newCase[i].count"
                  :styles="{
                    i:fetchConfig.rightConfigIndex[i],
                    color:'#00d7ec',
                    font:'bold 3.2rem ds_digi'
                  }"
                />
                <div class="label">{{ v }}</div>
              </div>
              <div class="content-t-right">
                <template v-if="newCase[i].change > 0">
                  <div class="change compareWarn">
                    {{ newCase[i].change }}
                    <svg-icon icon-class="up" />
                  </div>
                </template>
                <template v-else-if="newCase[i].change < 0">
                  <div class="change green">
                    {{ newCase[i].change }}
                    <svg-icon icon-class="down" />
                  </div>
                </template>
                <template v-else>
                  <div class="change">
                    {{ newCase[i].change }}
                  </div>
                </template>
                <div class="yesterday">较昨日</div>
              </div>
            </div>
          </div>
        </div>
        <echarts-map />
      </div>
      <div class="inner-right">
        <div class="title">
          <div class="triangle" />
          <span>中高风险地区入粤情况</span>
        </div>
        <div class="reagion">
          <div class="reagion-title">
            <span>中高风险地区</span>
            <span>入粤人数</span>
          </div>
        </div>
        <div class="chart-container">
          <entry-guang-dong :data="highriskCaseDay" />
        </div>
      </div>
    </div>
    <div class="nav box-container">
      <div
        v-for="(v, i) in caseMonth.data"
        :key="i"
        class="nav-item box-container"
      >
        <div class="title">
          <div class="triangle" />
          <span>{{ v.title }}</span>
        </div>
        <div class="chart-container">
          <time-bar-chart :count-date="caseMonth.countDate" :data="v" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProvinceMap from './ProvinceMap'
import EchartsMap from './EchartsMap'
import TimeBarChart from './TimeBarChart'
import EntryGuangDong from './EntryGuangDong'
import FanPai from '@/big/scale-big-page/components/FanPai'
// import { newCaseDay } from "@/api/polymerize";

export default {
  components: {
    ProvinceMap,
    EchartsMap,
    TimeBarChart,
    EntryGuangDong,
    FanPai
  },
  props: {
    newCase: {
      type: Object,
      default: () => {
        return {}
      }
    },
    caseMonth: {
      type: Object,
      default: () => {
        return {}
      }
    },
    newsWeek: {
      type: Array,
      default: () => {
        return []
      }
    },
    highriskCaseDay: {
      type: Array,
      default: () => {
        return []
      }
    },
    caseDistributed: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      fetchConfig: {
        rightConfig: {
          'new-case': '新增确诊病例数',
          'new-asymptomatic': '新增无症状病例',
          'total-case': '累计确诊病例数',
          'total-asymptomatic': '累计无症状病例'
        },
        rightConfigIndex: {
          'new-case': 0,
          'new-asymptomatic': 1,
          'total-case': 2,
          'total-asymptomatic': 3
        }
      },
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
      ],
      pTable: {
        all:
          '自8月15日起，我省已连续115天未报告本地确诊病例。12月2日起，深圳市报告一例香港输入病例关联的无症状感染者。',
        one:
          '深圳1例与香港输入病例关联的无症状感染者，系12月1日确诊港籍跨境货车司机陈某的密切接触者。详情如下：'
      },
      reverse: true,
      activities: [
        {
          content:
            '深圳市疾控中心复核，结果亦为阳性。杨某随即被转运至深圳市第三人民医院应急院区，经专家组诊断，为无症状感染者，目前情况稳定。',
          timestamp: '2018-04-15'
        },
        {
          content: '杨某再次接受采样检测，初筛结果呈阳性。',
          timestamp: '2018-04-13'
        },
        {
          content: '杨某再次接受采样检测，初筛结果呈阳性。',
          timestamp: '2018-04-13'
        },
        {
          content: '杨某再次接受采样检测，初筛结果呈阳性。',
          timestamp: '2018-04-13'
        },
        {
          content:
            '杨某，男，54岁，家住深圳市罗湖区笋岗街道笋岗村146栋。11月30日，港籍司机陈某初筛结果呈阳性后，杨某被判定为陈某的港籍司机陈某初筛结果呈阳性后',
          timestamp: '2018-04-11'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
// $topSpace: getWidth(0.6);
$topSpace: 0.6rem;
$boxSpace: 0.7rem;

.inner-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  > .inner-content {
    flex: 66.13;
  }
  > .nav {
    flex: 38.56;
  }
  .title {
    // 标题三角形
    .triangle {
      display: inline-block;
      font-size: 0;
      overflow: hidden;
      margin-right: getWidth(1);

      &:before {
        content: "";
        position: relative;
        display: inline-block;
        border: getWidth(0.6) solid transparent;

        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;

        border-right-width: 0;
        border-left-width: getWidth(0.9);
        border-left-color: #ffe7b3;
      }
    }
  }
}

// 中间部分
.inner-content {
  height: 100%;
  display: flex;

  .inner-right {
    background: #212342;
  }
  .inner-left,
  .inner-right {
    width: getWidth(42.25);
    border-radius: getHeight(1) getHeight(1);
    flex: none;
    .item1,
    .item2 {
      padding: getHeight(1) getWidth(0.8);
      display: flex;
      flex-direction: column;
    }
  }

  .inner-center {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0 $topSpace;
  }
}

.inner-center .right {
  height: 100%;
  // height: getHeight(6.19);
  display: flex;
  position: absolute;
  right: 0;
  flex-direction: column;
  align-items: flex-end;
  // justify-content: space-around;
  .content-t-item + .content-t-item {
    margin-left: $boxSpace;
  }

  .content-t-item {
    z-index: 3;
    width: getWidth(29.25);
    height: getHeight(11.69);
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
    flex: none;
    padding: getHeight(0.9) getWidth(0.6);
    margin-bottom: getHeight(1.31);
    display: flex;

    .echarts {
      width: getWidth(4.25);
      height: getHeight(3.25);
      font-size: $digiFontSize;
      font-family: DS-Digital-Bold, DS-Digital;
      font-weight: bold;
      color: #54ebfd;
      line-height: getHeight(3.25);
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
        width: 40%;
      }

      .content-t-left {
        .value {
          height: getHeight(3.5);
          line-height: getHeight(3.5);
          text-align: center;
          font-family: ds_digi;
          font-size: $pageHeaderSize;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          // color: #54ebfd;
          color: rgba(84, 235, 253, 1)
        }
        .label {
          height: getHeight(2.06);
          line-height: getHeight(2.06);
          font-family: PingFangSC-Medium;
          font-size: $nomalSize;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: rgba(255, 255, 255, 0.75);
        }
      }
      .content-t-right {
        align-items: center;
        .yesterday {
          width: getWidth(4.56);
          height: getHeight(2.06);
          font-family: PingFangSC-Medium;
          font-size: $nomalSize;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
          line-height: getHeight(2.06);
        }
        .change {
          // width: getWidth(5);
          margin-top: getWidth(1);
          // width: 100%;
          height: getHeight(2.5);
          line-height: getHeight(2.5);
          text-align: center;
          font-family: Arial-Black;
          font-size: $itemTitleSize;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0rem;
          color: rgba(255, 255, 255, 0.8);
        }
        .compareWarn {
          color: rgba($color: red, $alpha: .8)
        }
        .green {
          color: rgba($color: green, $alpha: .8)
        }
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

.inner-right {
  display: flex;
  flex-direction: column;
  // width: 100%;
  height: 100%;
  .title {
    margin-left: getWidth(4);
    margin-top: getHeight(2.25);
    span {
      font-size: $nomalSize;
      font-family: PingFangSC-Medium;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: rgba(255, 255, 255, 0.9);
    }
  }
  .reagion {
    display: flex;
    margin-top: getHeight(1.13);
    margin-bottom: getHeight(2.13);
    font-family: PingFangSC-Medium;
    font-size: $nomalSize;
    font-weight: normal;
    font-stretch: normal;
    color: rgba(255, 255, 255, 0.7);
    width: 100%;
    .reagion-title {
      span:nth-child(1) {
        margin-left: getWidth(11);
        margin-right: getWidth(16);
      }
    }
  }
  .chart-container {
    width: 100%;
    height: 100%;
  }
}
.inner-left .left-2-item ::v-deep {
  .el-timeline {
    // padding-left: 1.94rem;
  }
  .el-timeline-item__node--normal {
    width: getWidth(0.88);
    height: getHeight(0.88);
    border: getWidth(0.13) solid #ffe7b3;
    background-color: #212342;
    margin-top: getHeight(0.88);
  }
  .el-timeline-item__tail {
    left: getWidth(0.38);
    top: getHeight(0.9);
    border-left: getWidth(0.13) dashed rgba(#ffffff, 0.3);
  }
}
.inner-content .inner-left ::v-deep .el-timeline-item__content {
  width: getWidth(34.25);
  min-height: getHeight(2);
  font-family: PingFangSC-Medium;
  font-size: $nomalSize;
  font-weight: normal;
  font-stretch: normal;
  line-height: getHeight(2);
  color: rgba(255, 255, 255, 0.6);
}
.inner-content .inner-left ::v-deep .el-timeline-item__timestamp {
  width: getWidth(8.94);
  min-height: getHeight(2.5);
  font-family: PingFangSC-Medium;
  font-size: $nomalSize;
  font-weight: normal;
  font-stretch: normal;
  line-height: getHeight(2.5);
  color: rgba(255, 231, 179, 0.9);
}
.inner-left {
  width: getWidth(42.25);
  border-radius: getHeight(1) getHeight(1);
  display: flex;
  flex-direction: column;
  font-size: 0.88rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: blod;
  color: #ffffff;
  > div + div {
    margin-top: $boxSpace;
  }

  span {
    // width: 32.56;
    height: getHeight(2.5);
    font-family: PingFangSC-Medium;
    font-size: $nomalSize;
    font-weight: normal;
    font-stretch: normal;
    color: rgba(255, 255, 255, 0.9);
  }

  .left-1-item,
  .left-2-item {
    width: 100%;
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
  }

  .left-1-item {
    width: 100%;
    flex: 14.13;
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
    overflow: auto;
    .general {
      margin-left: getWidth(3);
      margin-top: getHeight(2.25);
      .text {
        width: getWidth(34.44);
        height: getHeight(4.75);
        margin-left: getWidth(1.88);
        margin-top: getHeight(1);
        display: inline-block;
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        line-height: getHeight(2.5);
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
  .left-2-item {
    width: getWidth(42.25);
    flex: 50.31;
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
    // height: 15.44rem;
    // flex: 31;
    overflow: auto;
    .el-timeline-item {
      font-size: $nomalSize;
      // font-family: ds_digi;
      font-weight: bold;
      color: "white";
    }
    .radio {
      margin-left: getWidth(3);
      margin-top: getHeight(2.25);
      margin-bottom: getHeight(2);
      .text {
        width: getWidth(34.44);
        height: getHeight(4.75);
        margin-left: getWidth(1.88);
        margin-top: getHeight(1);
        display: inline-block;
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        line-height: getHeight(2.5);
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
}

// 导航
.nav {
  width: 100%;
  // width: getWidth(75.63);
  // background: #212342;

  // width: 100%;
  // height: 12.31rem;
  // border-radius: 0.38rem;
  display: flex;
  margin-top: $topSpace;
  flex: none;
  > .nav-item {
    width: calc(100% / 3);
    height: 100%;
    background: #212342;
    border-radius: getHeight(1) getWidth(1);
  }
  > .nav-item:nth-child(2) {
    margin-left: getWidth(1.06);
    margin-right: getWidth(1.06);
  }
  .chart-container {
    width: 100%;
    height: 80%;
  }
  .title {
    height: getHeight(2.5);
    font-family: PingFangSC-Medium;
    font-size: $itemTitleSize;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: getHeight(1.88);
    margin-top: getHeight(2);
    margin-left: getHeight(2.19);
    // 标题三角形
    .triangle {
      display: inline-block;
      font-size: 0;
      overflow: hidden;
      margin-right: getWidth(1);

      &:before {
        content: "";
        position: relative;
        display: inline-block;
        border: getWidth(0.6) solid transparent;

        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;

        border-right-width: 0;
        border-left-width: getWidth(0.9);
        border-left-color: #ffe7b3;
      }
    }
  }
}
</style>
