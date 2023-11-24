<template>
  <div class="container">
    <div class="left">
      <div class="top">
        <p><i class="el-icon-caret-right" />最近一周输入个案情况</p>
        <!-- <diff-bar2 :newWeekData="chartData.newWeekData"/> -->
        <diff-bar2 />
        <!-- 进度条宽度问题待解决 -->
      </div>
      <div class="center">
        <p><i class="el-icon-caret-right" />近一周境外输入个案发现途径</p>
        <!-- <rose-chart :newWeekScanf="chartData.newWeekScanf"/> -->
        <rose-chart />
        <!-- 暂无数据 -->
      </div>
      <div class="bottom">
        <p><i class="el-icon-caret-right" />最近一周个案国籍分布</p>
        <diff-bar />
        <!-- 进度条宽度问题待解决 -->
      </div>
    </div>
    <div class="content">
      <div class="top">
        <div class="topLeft">
          <div class="leftTop">
            <h4><svg-icon icon-class="red-warning" />本地感染概况</h4>
            <p>自8月15日起，我省已连续115天未报告本地确诊病例。12月2日起，深圳市报告一例香港输入…</p>
          </div>
          <div class="leftBottom">
            <h4><i class="el-icon-caret-right" />本地感染个案概况</h4>
            <p>深圳1例与香港输入病例关联的无症状感染者，系12月1日确诊港籍跨境货车司机陈某的密切接触者。详情如下：</p>
            <el-timeline :reverse="reverse">
              <el-timeline-item
                v-for="(v, i) in chartData.activities"
                :key="i"
                :timestamp="v.count_date"
                placement="top"
              >
                {{ v.new_content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
        <div class="topContent">
          <div class="map">
            <province-map />
            <div class="display">
              <div
                v-for="(v, i) in this.displayData.config"
                :key="i"
                class="content-t-item"
              >
                <div class="content-t-text">
                  <div class="content-t-left">
                    <fan-pai
                      :new-num="displayData.newCase[i].num"
                      :styles="{
                        i:displayData.configIndex[i],
                        color:'#00d7ec',
                        font:'bold 3.6rem ds_digi'
                      }"
                    />
                    <div class="label">{{ v }}</div>
                  </div>
                  <div class="content-t-right">
                    <template v-if="(displayData.newCase[i].change > 0)">
                      <div class="compareWarn">
                        {{ displayData.newCase[i].change }}
                        <svg-icon icon-class="up" />
                      </div>
                    </template>
                    <template v-else-if="(displayData.newCase[i].change < 0)">
                      <div class="green">
                        {{ displayData.newCase[i].change }}
                        <svg-icon icon-class="down" />
                      </div>
                    </template>
                    <template v-else>
                      <div class="change">
                        {{ displayData.newCase[i].change }}
                      </div>
                    </template>
                    <div class="yesterday">较昨日</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="topRight">
          <p><i class="el-icon-caret-right" />中高风险地区入粤情况</p>
          <div class="title">
            <span>中高风险地区</span>
            <span>入粤人数</span>
          </div>
          <div class="details">
            <div v-for="(v,i) in chartData.detailsData" :key="i" class="item">
              <div class="row">
                <div class="idNumber">{{ i+1 }}</div>
                <div class="name">{{ v.name }}</div>
                <div class="number">{{ v.value }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottomLeft">
          <p><i class="el-icon-caret-right" />境外输入个案时间分布</p>
          <time-bar-chart />
        </div>
        <div class="bottomContent">
          <p><i class="el-icon-caret-right" />外省输入个案时间分布</p>
          <time-bar-chart />
        </div>
        <div class="bottomRight">
          <p><i class="el-icon-caret-right" />广东省新冠肺炎疫情累计时间分布</p>
          <time-bar-chart />
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <p><i class="el-icon-caret-right" />境外航班入境来源情况</p>
        <legend-ring-chart />
      </div>
      <div class="center">
        <p><i class="el-icon-caret-right" />各口岸人群分类情况</p>
        <compact-bar2 />
      </div>
      <div class="bottom">
        <p><i class="el-icon-caret-right" />入境隔离第N天监检测阳性人数</p>
        <bar-chart2 />
      </div>
    </div>
  </div>
</template>

<script>
import DiffBar2 from './components/DiffBar2'
import RoseChart from './components/RoseChart'
import DiffBar from './components/DiffBar'
import LegendRingChart from './components/LegendRingChart'
import CompactBar2 from './components/CompactBar2'
import BarChart2 from './components/BarChart2'
import TimeBarChart from './components/TimeBarChart'
import ProvinceMap from './components/ProvinceMap'
import FanPai from '@/big/scale-big-page/components/FanPai'

export default {
  components: {
    DiffBar2,
    RoseChart,
    DiffBar,
    LegendRingChart,
    CompactBar2,
    BarChart2,
    TimeBarChart,
    ProvinceMap,
    FanPai
  },
  data() {
    return {
      reverse: true,
      chartData: {
        newWeekData: { // 最近一周输入个案

        },
        newWeekScanf: [ // 近一周境外输入发现途径

        ],
        newWeekNation: [ // 近一周个案国籍分布

        ],
        outsideFlight: [], // 境外航班
        peopleKind: {}, // 人群分类
        sunPeople: {}, // 阳性人数
        overseasTime: {}, // 境外时间
        provinceTime: {}, // 省外
        guangdongTime: {}, // 广东
        activities: [{ // 个案感染情况
          new_content: '深圳市疾控中心复核，结果亦为阳性。杨某随即被转运至深圳市第三人民医院应急院区，经专家组诊断，为无症状感染者，目前情况稳定。经初步流行病学调查，11月29日、30日下午，杨某曾乘坐陈某的货车回家。经初步判定，杨某的密切接触者有2人，均为其同住的家人，2人已于12月1日接受集中隔离医学观察，目前核酸检测结果均为阴性。此2人的密切接触者又有9名，已于12月2日晚全部接受…',
          count_date: '2018-04-15'
        }, {
          new_content: '杨某再次接受采样检测，初筛结果呈阳性。',
          count_date: '2018-04-13'
        }, {
          new_content: '杨某，男，54岁，家住深圳市罗湖区笋岗街道笋岗村146栋。11月30日，港籍司机陈某初筛结果呈阳性后，杨某被判定为陈某的',
          count_date: '2018-04-11'
        }],
        detailsData: [
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: '3' },
          { name: '四川省成都市成华区崔家店华都云景台小区', value: '4' },
          { name: '四川省成都市郫都区唐昌镇永安村8组', value: '2' },
          { name: '四川省成都市郫都区郫筒街道太平村', value: '4' },
          { name: '内蒙古自治区呼伦贝尔市扎赉诺尔区第三街道办事处', value: '6' },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: '3' },
          { name: '四川省成都市成华区崔家店华都云景台小区', value: '4' },
          { name: '四川省成都市郫都区唐昌镇永安村8组', value: '2' },
          { name: '四川省成都市郫都区郫筒街道太平村', value: '4' },
          { name: '内蒙古自治区呼伦贝尔市扎赉诺尔区第三街道办事处', value: '6' },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: '3' },
          { name: '四川省成都市成华区崔家店华都云景台小区', value: '4' },
          { name: '四川省成都市郫都区唐昌镇永安村8组', value: '2' },
          { name: '四川省成都市郫都区郫筒街道太平村', value: '4' },
          { name: '内蒙古自治区呼伦贝尔市扎赉诺尔区第三街道办事处', value: '6' }
        ] // 中高风险地区入粤
      },
      displayData: {
        config: {
          newCase: '新增确诊病例数',
          newAsymptomatic: '新增无症状病例',
          totalCase: '累计确诊病例数',
          totalAsymptomatic: '累计无症状病例'
        },
        configIndex: {
          newCase: 0,
          newAsymptomatic: 1,
          totalCase: 2,
          totalAsymptomatic: 3
        },
        newCase: {
          newCase: { num: 4, change: 4 },
          newAsymptomatic: { num: 4, change: -4 },
          totalCase: { num: 4, change: 4 },
          totalAsymptomatic: { num: 4, change: 0 }
        }
      }
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.container{
  display: flex;
  background-color: #171833;
}
.left{
  display: flex;
  flex: 1;
  flex-direction: column;
  margin:getWidth(1) getWidth(1.19) getWidth(1) getWidth(2.13);
  >.top{
    flex: 1;
    margin: getWidth(1) 0;
    background-color: #212342;
    >p{
      font-family: PingFangSC-Medium;
      font-size: getFontSize(1.75);
      color: rgba(255, 255, 255, 0.9);
      padding-top: 2.81rem;
      padding-left: 1.81rem;
    }
  }
  >.center{
    flex: 1;
    margin: getWidth(1) 0;
    background-color: #212342;
    >p{
      font-family: PingFangSC-Medium;
      font-size: getFontSize(1.75);
      color: rgba(255, 255, 255, 0.9);
      padding-top: 2.06rem;
      padding-left: 1.75rem;
    }
  }
  >.bottom{
    flex: 1;
    margin: getWidth(1) 0;
    background-color: #212342;
    >p{
      font-family: PingFangSC-Medium;
      font-size: getFontSize(1.75);
      color: rgba(255, 255, 255, 0.9);
      padding-top: 2.5rem;
      padding-left: 1.75rem;
    }
  }
}
.content{
  display: flex;
  flex: 3;
  flex-direction: column;
  margin: getWidth(1) 0;
  >.top{
    display: flex;
    flex: 3;
    margin: getWidth(1) 0;
    >.topLeft{
      flex: 1;
      // background-color: #212342;
      display: flex;
      flex-direction: column;
      >.leftTop{
        flex: 1;
        margin-bottom: getWidth(1);
        background-color: #212342;
        >h4{
          font-family: PingFangSC-Medium;
          font-size: getFontSize(1.75);
          color: rgba(255, 4, 102, 0.9);
          margin-top: getWidth(2.38);
          margin-left: getWidth(1.63);
          >svg{
            margin-right: getWidth(1);
          }
        }
        >p{
          font-family: PingFangSC-Medium;
          font-size: getFontSize(1.5);
          line-height: getHeight(2.5);
          color: rgba(255, 255, 255, 0.7);
          margin-left: getWidth(5.69);
          margin-right: getWidth(2.13);
        }
      }
      >.leftBottom{
        flex: 4;
        background-color: #212342;
        >h4{
          margin-left: getWidth(2.75);
          margin-top: getWidth(3.31);
          font-family: PingFangSC-Medium;
          font-size: 1.75rem;
          color: rgba(255, 255, 255, 0.9);
        }
        >p{
          font-family: PingFangSC-Medium;
          font-size: getFontSize(1.25);
          line-height: getHeight(2.38);
          color: rgba(255, 255, 255, 0.6);
          margin-left: getWidth(5.38);
        }
        ::v-deep{
          .el-timeline.is-reverse{
            margin-left: getWidth(1.3);
            .el-timeline-item__node--normal{
              width:getWidth(0.88);
              height: getHeight(0.88);
              border: getWidth(0.13) solid #FFE7B3;
              background-color: #212342;
              margin-top: getWidth(0.8);
            }
            .el-timeline-item__tail{
              top:getHeight(0.8);
              // left: 0;
              border-left: getWidth(0.13) dashed rgba(#ffffff, .3)
            }
            .el-timeline-item__wrapper>.el-timeline-item__timestamp{
              font-family: PingFangSC-Medium;
              font-size: 1.75rem;
              line-height: 2.5rem;
              color: rgba(255, 231, 179, 0.9);
            }
            .el-timeline-item__wrapper>.el-timeline-item__content{
              font-family: PingFangSC-Medium;
              font-size: getFontSize(1.25);
              line-height: getHeight(2.38);
              color: rgba(255, 255, 255, 0.6);
            }
          }
        }
      }
    }
    >.topContent{
      // background-color: #212342;
      flex: 3;
      margin: 0 getWidth(1);
      .map{
        width: 100%;
        height: 100%;
        position: relative;
        // z-index: -1;
        .display {
          height: 100%;
          // height: getHeight(6.19);
          display: flex;

          flex-direction: column;
          align-items: flex-end;
          // justify-content: space-around;
          .content-t-item + .content-t-item {
            margin-left: getWidth(0.7);
          }

          .content-t-item {
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
              }

              .content-t-left {
                .value {
                  width: getWidth(4.25);
                  height: getHeight(3.25);
                  line-height: getHeight(3.25);
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
                  width: 100%;
                  height: getHeight(2.5);
                  line-height: getHeight(2.5);
                  text-align: center;
                  font-family: Arial-Black;
                  font-size: $itemTitleSize;
                  color: rgba(255, 255, 255, 0.8);
                  margin-top:getWidth(2)
                }
                .compareWarn {
                  width: 100%;
                  height: getHeight(2.5);
                  line-height: getHeight(2.5);
                  text-align: center;
                  font-family: Arial-Black;
                  font-size: $itemTitleSize;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0rem;
                  color: rgba(255, 4, 102, 0.9);
                  margin-top:getWidth(2)
                }
                .green{
                  width: 100%;
                  height: getHeight(2.5);
                  line-height: getHeight(2.5);
                  text-align: center;
                  font-family: Arial-Black;
                  font-size: $itemTitleSize;
                  font-weight: normal;
                  font-stretch: normal;
                  letter-spacing: 0rem;
                  color:rgba($color: green, $alpha: .8);
                  margin-top:getWidth(2);
                  // margin-left:getWidth(-2)
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
      }
    }
    >.topRight{
      background-color: #212342;
      flex: 1;
      >p{
        margin-left: getWidth(3.13);
        margin-top: getWidth(2.75);
        font-family: PingFangSC-Medium;
        font-size: 1.75rem;
        color: rgba(255, 255, 255, 0.9);
      }
      .title{
        :nth-child(1){
          font-family: PingFangSC-Medium;
          font-size: 1.5rem;//913  1238
          color: rgba(255, 255, 255, 0.3);
          margin-left: getWidth(9.13);
          margin-right: getWidth(12.38);
        }
        :nth-child(2){
          font-family: PingFangSC-Medium;
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.3);
        }
        margin-bottom: getWidth(1.75);
      }
      .details{
        overflow: auto;
        height: getHeight(52.88);
        .item{
          display: flex;
          flex-direction: column;
          // height: 20%;
          width: 100%;
          .row{
            display: flex;
            .idNumber{
              width: getWidth(2);
              height: getHeight(2.13);
              line-height: getHeight(2.13);
              text-align: center;
              font-size: $nomalSize;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #1c1f3c;
              background-color: #ffe7b3;
              border-radius: 50%;
              margin-left: getWidth(3.5);
              margin-right: getWidth(3.69);
              flex: none;
            }
            .name{
              width: getWidth(18.81);
              height: getHeight(4.13);
              font-family: PingFangSC-Medium;
              font-size: $nomalSize;
              font-weight: normal;
              font-stretch: normal;
              color: rgba(255, 255, 255, 0.7);
              white-space: normal;
              word-break: break-all;
              overflow: hidden;
              margin-right: getWidth(4);
              flex: none;
            }
            .number{
              width: getWidth(2);
              height: getHeight(2.13);
              line-height: getHeight(2.13);
              text-align: center;
              font-size: $nomalSize;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: rgb(237, 238, 241);
              margin-left: 0.94rem;
            }
          }
        }
      }
    }
  }
  >.bottom{
    display: flex;
    flex: 2;
    margin: getWidth(1) 0;
    >.bottomLeft{
      flex: 1;
      background-color: #212342;
      font-family: PingFangSC-Medium;
      font-size: getFontSize(1.75);
      color: rgba(255, 255, 255, 0.9);
      padding-top: 2.69rem;
      padding-left: 2.31rem;
    }
    >.bottomContent{
      flex: 1;
      margin: 0 getWidth(1);
      background-color: #212342;
      font-family: PingFangSC-Medium;
      font-size: getFontSize(1.75);
      color: rgba(255, 255, 255, 0.9);
      padding-top: 2.69rem;
      padding-left: 2.31rem;
    }
    >.bottomRight{
      flex: 1;
      background-color: #212342;
      font-family: PingFangSC-Medium;
      font-size: getFontSize(1.75);
      color: rgba(255, 255, 255, 0.9);
      padding-top: 2.69rem;
      padding-left: 2.31rem;
    }
  }
}
.right{
  display: flex;
  flex-direction: column;
  flex: 1;
  margin:getWidth(1) getWidth(2.13) getWidth(1) getWidth(1.19);
  >.top{
    flex: 1;
    margin: getWidth(1) 0;
    background-color: #212342;
    >p{
      font-family: PingFangSC-Medium;
      font-size: getFontSize(1.75);
      color: rgba(255, 255, 255, 0.9);
      padding-top: 2.5rem;   //2.69
      padding-left: 1.75rem; //2.31
    }
  }
  >.center{
    flex: 1;
    margin: getWidth(1) 0;
    background-color: #212342;
    >p{
      font-family: PingFangSC-Medium;
      font-size: getFontSize(1.75);
      color: rgba(255, 255, 255, 0.9);
      padding-top: 2.69rem;
      padding-left: 2.31rem;
    }
  }
  >.bottom{
    flex: 1;
    margin: getWidth(1) 0;
    background-color: #212342;
    >p{
      font-family: PingFangSC-Medium;
      font-size: getFontSize(1.75);
      color: rgba(255, 255, 255, 0.9);
      padding-top: 2.69rem;
      padding-left: 2.31rem;
    }
  }
}
</style>
