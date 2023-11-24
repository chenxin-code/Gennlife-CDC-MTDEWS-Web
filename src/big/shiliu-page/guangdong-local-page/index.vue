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
        <guang-dong-local />
      </div>
    </div>
    <div class="right box-container">
      <div class="right-1-item box-container chart-item-container">
        <div class="general">
          <h4><i class="el-icon-warning" />本地感染概况</h4>
          <p>{{ pTable.all }}</p>
        </div>
      </div>

      <div class="right-2-item box-container chart-item-container">
        <div class="block">
          <div class="radio">
            <h4><i class="el-icon-caret-right" />本地感染个案概况</h4>
            <p>{{ pTable.one }}</p>
          </div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              placement="top"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>

      <div class="right-3-item box-container chart-item-container">
        <div class="title">
          <h4><i class="el-icon-caret-right" />本地感染个案概况</h4>
        </div>
        <div class="chart-container">
          <local-time />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GuangDongLocal from './components/GuangDongLocal'

import LocalTime from './components/LocalTime'

export default {
  components: {
    GuangDongLocal,
    LocalTime
  },
  data() {
    return {
      reverse: true,
      activities: [{
        content: '深圳市疾控中心复核，结果亦为阳性。杨某随即被转运至深圳市第三人民医院应急院区，经专家组诊断，为无症状感染者，目前情况稳定。经初步流行病学调查，11月29日、30日下午，杨某曾乘坐陈某的货车回家。经初步判定，杨某的密切接触者有2人，均为其同住的家人，2人已于12月1日接受集中隔离医学观察，目前核酸检测结果均为阴性。此2人的密切接触者又有9名，已于12月2日晚全部接受…',
        timestamp: '2018-04-15'
      }, {
        content: '杨某再次接受采样检测，初筛结果呈阳性。',
        timestamp: '2018-04-13'
      }, {
        content: '杨某，男，54岁，家住深圳市罗湖区笋岗街道笋岗村146栋。11月30日，港籍司机陈某初筛结果呈阳性后，杨某被判定为陈某的',
        timestamp: '2018-04-11'
      }],
      pTable: {
        all: '自8月15日起，我省已连续115天未报告本地确诊病例。12月2日起，深圳市报告一例香港输入病例关联的无症状感染者。',
        one: '深圳1例与香港输入病例关联的无症状感染者，系12月1日确诊港籍跨境货车司机陈某的密切接触者。详情如下：'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep{
  .el-timeline {
    padding-left: 1.94rem;
  }
  .el-timeline-item__node--normal{
    width:0.44rem;
    height: 0.44rem;
    border: 0.06rem solid #FFE7B3;
    background-color: #212342;
    margin-top: 6px;
  }
  .el-timeline-item__tail{
    left: 0;
    border-left: 0.06rem dashed rgba(#ffffff, .3)
  }
  .radio{
  }
  .radio>h4{
    margin-left: 1.56rem;
    font-size: 0.88rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(#ffffff, .9);
    line-height: 1.25rem;
  }
  .radio>p{
    margin-left: 3.12rem;
    font-size: 0.88rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba( #ffffff,  .6);
    // line-height: 1.38rem;
  }
  .el-timeline-item__timestamp.is-top{
    font-size: 0.88rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba( #FFE7B3,  .89);
    line-height: 1.25rem;
  }
  .el-timeline-item__content{
    font-size: 0.88rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    // line-height: 1.38rem;
    color: rgba( #ffffff,  .6);
  }
  .el-timeline-item__wrapper{
    padding-left: 1.13rem;
  }
  .general>h4{
    margin-left: 1.5rem;
    font-size: 0.88rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color:rgba( #FF0466 ,.9);
    line-height: 1.25rem;
  }
  .general>p{
    margin-left: 3.63rem;
    font-size: 0.88rem;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(#FFFFFF,.7);
    line-height: 1.25rem;
  }
  .title>h4{
    margin-left: 1.5rem;
    font-size: 0.88rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(#ffffff, .9);
    line-height: 1.25rem;
  }
  // .l7-control-scale-line{
  //   top: -350px;
  //   position: relative;
  //   left: 3px;
  // }
  // .l7-control{
  //   left: 800px;
  //   top: 320px;
  // }
}
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
  .right-3-item {
    width: 100%;
    background: #212342;
    border-radius: 0.5rem;
  }

  .right-1-item {
    // height: 9.88rem;
    overflow: auto;
    flex: 8;
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
    flex: 31;
    overflow: auto;
  }
  .right-3-item {
    // height: 20.94rem;
    flex: 18.38;
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
    height: 7.75rem;
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
            line-height: 1.25rem;
            color: rgba(#ffffff, 0.8);
          }
          .yesterday{
            font-size: 0.75rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(#ffffff, 0.6);
            line-height: 1.06rem;
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
        font-size: 1.88rem;
        font-weight: bold;
        line-height: 1.88rem;
      }
      &:nth-of-type(even) .content-t-left .value {
        font-size: 1.88rem;
        font-weight: bold;
        color: #00D7EC;
        line-height: 1.88rem;
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
    // padding-top: -5px;
    height: 1.25rem;
    // margin-bottom: 5px;
    // 标题三角形
    // .triangle {
    //   display: inline-block;
    //   font-size: 0;
    //   overflow: hidden;
    //   margin-right: 0.6rem;

    //   &:before {
    //     content: "";
    //     position: relative;
    //     display: inline-block;
    //     border: 0.3rem solid transparent;

    //     position: relative;
    //     right: 0.1rem;
    //     border-top-right-radius: 50%;
    //     border-bottom-right-radius: 50%;

    //     left: 0.1rem;
    //     border-right-width: 0;
    //     border-left-width: 0.6rem;
    //     border-left-color: rgb(181, 181, 181);
    //   }
    // }
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
