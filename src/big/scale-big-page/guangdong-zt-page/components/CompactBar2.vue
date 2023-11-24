<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/bar' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  components: {
    VChart
  },
  props: {
    peopleKind: {
      type: Object,
      default() {
        return {
          shengang: {
            case_isolation: 820, // 需要隔离
            case_unisolation: 932, // 不需要隔离
            driver: 901 // 司机
          },
          zhugang: {
            case_isolation: 800,
            case_unisolation: 632,
            driver: 501
          },
          zhuao: {
            case_isolation: 880,
            case_unisolation: 112,
            driver: 801
          }
        }
      }
    }
  },
  data() {
    return {
      options: {
        grid: {
          // x: 40,
          // y: 20,
          // x2: 20,
          // y2: 20
        },
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(91, 241, 253, 1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0, 153, 255, 1)' // 100% 处的颜色
              }
            ]
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(133, 255, 0, 1)' // 0% 处的颜色  85ff00
              },
              {
                offset: 1,
                color: 'rgba(55, 176, 35, 1)' // 100% 处的颜色
              }
            ]
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 168, 59, 1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(255, 234, 0, 1)' // 100% 处的颜色
              }
            ]
          }
        ],
        legend: {
          orient: 'horizontal',
          top: 0,
          right: 0,
          icon: 'circle',
          textStyle: {
            color: 'rgba(255, 255, 255, .4)',
            fontSize: 16
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器 快捷方式设置
            animation: false,
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          fontSize: 16,
          data: ['深港口岸', '珠港口岸', '珠澳口岸'],
          // boundaryGap: false,
          splitNumber: 0,
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 16
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          fontSize: 16,
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 16
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(151, 151, 151, 0.1)'
            }
          }
        },
        series: [
          {
            data: [this.peopleKind.shengang.case_isolation, this.peopleKind.zhugang.case_isolation, this.peopleKind.zhuao.case_isolation],
            type: 'bar',
            barWidth: '10%',
            barGap: 0,
            name: '需要隔离的人'
          },
          {
            data: [this.peopleKind.shengang.case_unisolation, this.peopleKind.zhugang.case_unisolation, this.peopleKind.zhuao.case_unisolation],
            type: 'bar',
            barWidth: '10%',
            name: '不实行隔离的人'
          },
          {
            data: [this.peopleKind.shengang.driver, this.peopleKind.zhugang.driver, this.peopleKind.zhuao.driver],
            type: 'bar',
            barWidth: '10%',
            name: '跨境货车司机'
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 75%;
}
</style>
