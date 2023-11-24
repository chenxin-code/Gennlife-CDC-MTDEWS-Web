<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/bar' // 自定义类型
import 'echarts/lib/component/tooltip'

export default {
  components: {
    VChart
  },
  props: {
    sunPeople: {
      type: Object,
      default() {
        return {
          day_1: 932,
          day_2: 904,
          day_3: 901,
          day_4: 934,
          day_5: 852,
          day_6: 687,
          day_7: 988,
          day_8: 354,
          day_9: 785,
          day_10: 884,
          day_11: 654,
          day_12: 742,
          day_13: 854,
          day_14: 954,
          day_15: 247
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
          }
        ],
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
          // boundaryGap: false,
          splitNumber: 0,
          data: new Array(15).fill().map((v, i) => (i + 1)),
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
            data: [this.sunPeople.day_1, this.sunPeople.day_2, this.sunPeople.day_3,
              this.sunPeople.day_4,
              this.sunPeople.day_5,
              this.sunPeople.day_6,
              this.sunPeople.day_7,
              this.sunPeople.day_8,
              this.sunPeople.day_9,
              this.sunPeople.day_10,
              this.sunPeople.day_11,
              this.sunPeople.day_12,
              this.sunPeople.day_13,
              this.sunPeople.day_14,
              this.sunPeople.day_15
            ],
            type: 'bar',
            barWidth: '15%'
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
