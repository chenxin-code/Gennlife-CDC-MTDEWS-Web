<template>
  <div class="container">
    <div class="header">
      <div class="title">
        入境人员分流方案
      </div>
      <div>close</div>
    </div>
    <div class="main">
      <div class="flex-item flex-item-left">
        <div class="flex-item-left-top">
          <div class="item-title">入境隔离人员政策调整推荐方案参数设置</div>
          <div class="chart-bar">
            <bar-chart />
          </div>
        </div>
        <div class="flex-item-left-bottom">
          <div class="item-title">广东省各城市隔离酒店使用率</div>
          <div class="flex-table">
            <table>
              <tr>
                <th class="hotel-use-title">排序</th>
                <th v-for="(item, idx) in List.title" :key="idx" class="hotel-use-title">{{ item }}</th>
              </tr>
              <tr v-for="(item, idx) in List.listData" :key="idx">
                <td class="hotel-use-item">{{ idx }}</td>
                <td class="hotel-use-item">{{ item.city }}</td>
                <td class="hotel-use-item">{{ item.total }}</td>
                <td class="hotel-use-item">{{ item.useTotal }}</td>
                <td class="hotel-use-item">{{ item.useTotal }}</td>
                <td class="hotel-use-item">{{ item.odd }}%</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <div class="flex-item flex-item-right">
        <div class="right-top">
          <div class="item-title">入境隔离人员政策调整推荐方案参数设置</div>
          <div class="item-box">
            <div class="item-title">集中隔离</div>
            <div
              v-for="(item, idx) in paramsSetting"
              :key="idx"
              class="params-content"
            >
              <div class="params-content-text">
                <span class="item-title">
                  {{ item.type }}({{ item.min }},{{ item.max }})
                </span>
                <span class="item-title" style="float: right;">
                  {{ item.num }}
                </span>
              </div>
              <el-slider
                v-model="item.num"
                :min="0"
                :max="14"
              />
            </div>

          </div>
          <div class="item-box">
            <div class="item-title">居家隔离</div>
            <div
              v-for="(item, idx) in paramsSetting"
              :key="idx"
              class="params-content"
            >
              <div class="params-content-text">
                <span class="item-title">
                  {{ item.type }}({{ item.min }},{{ item.max }})
                </span>
                <span class="item-title" style="float: right;">
                  {{ item.num }}
                </span>
              </div>
              <el-slider
                v-model="item.num"
                :min="0"
                :max="14"
              />
            </div>
          </div>
        </div>
        <div class="btns">
          <div class="btn reset">重置</div>
          <div class="btn run">执行</div>
        </div>
      </div>
      <div class="flex-item-big">
        <div class="item-title">推演风险值</div>
        <div class="chart-radar">
          <radar-chart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BarChart from './components/BarChart'
import RadarChart from './components/RadarChart'
import { random } from 'lodash'
// import { getList } from '@/api/immigration'
import { getList } from '@/api/immigration'

const x = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default {
  components: {
    BarChart,
    RadarChart
  },
  data() {
    return {
      options: {
        animationDuration: 2000,
        animationDurationUpdate: 3000,
        tooltip: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: x
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'bar',
            areaStyle: {}
          }
        ]
      },
      paramsSetting: {
        'ONE': { type: '超高风险国家', num: 7, max: 14, min: 0 },
        'TWO': { type: '高风险国家', num: 13, max: 14, min: 0 },
        'THREE': { type: '中低风险国家', num: 7, max: 14, min: 0 },
        'FOUR': { type: '低风险国家', num: 7, max: 14, min: 0 }
      },
      List: {
        title: ['城市', '酒店容量', '已使用容量', '剩余容量', '使用率'],
        listData: {}
      }
    }
  },
  mounted() {
    this.chartRandom()
    this.initTotalImport()
  },
  methods: {
    chartRandom() {
      console.log('line chart change')
      this.options.series[0].data = x.map(v => random(100, 2000))
    },
    initTotalImport() {
      // const totalImportParam = { status: 2 }
      getList().then(res => {
        this.List.listData = res.data.array
        console.log('res:', res)
      })
        .catch(err => {
          console.log('error', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }
  .container {
    width: 100%;
    height: 100%;

    .header {
      display: flex;
      width: 100%;
      height: 5%;
      background-color: #313662;
      justify-content: space-between;
      .title {
        padding-left: 20px;
        height: 40px;
        line-height: 40px;
        color: white;
      }
    }

    .main {
      padding: 30px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 100%;
      height: 95%;
      background-color: #171833;
    }

    .item-title {
      padding-left: 10px;
      // paddding-top: 10px; 拼写错误
      padding-bottom: 10px;
      color: white;
      font-size: 14px;
      height: 24px;
      line-height: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
    }

    .main .flex-item {
      flex:0.3;
      display: flex;
      flex-direction: column;
      border-right:2px solid cornflowerblue;
    }
    .main .flex-item-left {
      .flex-item-left-top {
        flex: 0.4;
        display: flex;
        flex-direction: column;
        .chart-bar {
          flex: 0.9;
        }
      }
      .flex-item-left-bottom {
        flex:0.6;
        display: flex;
        flex-direction: column;
        .flex-table {
          width: 100%;
          flex:0.9;
          th,td {
            height: 26px;
            width: 16.6%;
            line-height: 26px;
            text-align: center;
          }
          .hotel-use-title {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.3);
            white-space: nowrap;
          }
          .hotel-use-item {
            font-size: 14px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
            white-space: nowrap;
          }
        }
      }
    }
    .main .flex-item-right {
      height: 100%;
      display: flex;
      .right-top {
        flex: 0.7;
        .item-box {
          margin: 10px;
        }
        .params-content {
          flex: 0.7;
          padding: 0 20px;
          params-content-text {
            height: 20px;
            width: 100%;
          }
          ::v-deep {
            .el-slider__bar {
              background-image: linear-gradient(102deg,
                #ffa83b 0%,
                #ffea00 100%);
              box-shadow: 0px 0px 8px 0px
              rgba(255, 234, 0, 0.3);
              height: 2px;
            }
            .el-slider__button {
              border: 1px solid #ffea00;
              width: 6px;
              height: 6px;
              background-image: linear-gradient(102deg,
                #ffea00 0%,
                #ffa83b 100%);
              box-shadow: 0px 0px 8px 0px
              rgba(255, 234, 0, 0.3);
            }
            .el-slider__runway {
              height: 2px;
            }
            .el-slider__button-wrapper {
              top: -17px;
              height: 35px;
            }
          }
        }
      }

      .btns {
        flex: 0.3;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
        padding-bottom: 30px;
        .btn{
          width: 100px;
          height: 36px;
          line-height: 36px;
          border: 1px solid pink;
          font-size: 14px;
          border-radius: 14px;
          text-align: center;
          font-family: PingFangSC-Regular;
        }
        .reset {
          border: 1px solid #fff;
          color: #fff;
        }
        .run {
          border: 1px solid #00d7ec;
          color:#00d7ec;
        }
      }
    }

    .main .flex-item-big {
      flex:0.4;
      display: flex;
      flex-direction: column;
      .chart-radar{
        flex: 0.9;
      }
    }
  }
</style>

