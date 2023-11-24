<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/line' // 自定义类型
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    VChart
  },
  data() {
    return {
      options: {
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
                color: 'rgba(0, 153, 255, 1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(91, 241, 253, 1)' // 100% 处的颜色
              }
            ]
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(255, 0, 12, 1)' // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(233, 255, 0, 1)' // 0% 处的颜色
              }
            ]
          }
        ],
        grid: {
          x: 40,
          y: 20,
          x2: 20,
          y2: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器 快捷方式设置
            animation: false,
            type: 'cross'
          }
        },
        legend: {
          top: 0,
          right: 0,
          textStyle: {
            color: 'rgba(255, 255, 255, 0.4)'
          },
          data: [
            { name: '本土', icon: 'roundRect' },
            { name: '境外', icon: 'roundRect' }
          ]
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          splitNumber: 0,
          data: [
            '第一天',
            '第二天',
            '第三天',
            '第四天',
            '第五天',
            '第六天',
            '第七天'
          ],
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 8
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
            fontSize: 8
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
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            name: '本土',
            itemStyle: {
              opacity: 0
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 153, 255, .1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(91, 241, 253, .1)' // 100% 处的颜色
                  }
                ]
              }
            },
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 153, 255, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(91, 241, 253, 1)' // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            data: [100, 2032, 201, 634, 290, 130, 1020],
            type: 'line',
            name: '境外',
            itemStyle: {
              opacity: 0
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255, 0, 12, .1)' // 100% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(233, 255, 0, .1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 0, 12, .1)' // 100% 处的颜色
                  }
                ]
              }
            },
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(255, 0, 12, 1)' // 100% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(233, 255, 0, 1)' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(255, 0, 12, 1)' // 100% 处的颜色
                  }
                ]
              }
            }
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
  height: 100%;
}
</style>
