<template>
  <v-chart :options="options" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    VChart
  },
  data() {
    return {
      options: {
        animationDuration: 5000,
        animationDurationUpdate: 5000,
        // grid: {
        //   x: 100,
        //   y: 20,
        //   x2: 20,
        //   y2: 20
        // },
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
          splitNumber: 0,
          data: [
            1820,
            1932,
            1901,
            1934,
            2290,
            3330,
            3320,
            1932,
            1901,
            1934,
            2290,
            1932,
            1901,
            1934,
            2290,
            1820,
            1932,
            1901,
            1934,
            2290,
            5330,
            2320,
            1932,
            1901,
            2934,
            2290,
            1932,
            1901,
            2934,
            4290
          ],
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
            data: [
              1820,
              1932,
              1901,
              1934,
              2290,
              3330,
              3320,
              1932,
              1901,
              1934,
              2290,
              1932,
              1901,
              1934,
              2290,
              1820,
              1932,
              1901,
              1934,
              2290,
              5330,
              2320,
              1932,
              1901,
              2934,
              2290,
              1932,
              1901,
              2934,
              4290
            ],
            type: 'line',
            itemStyle: {
              opacity: 0,
              color: {
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
            },
            areaStyle: {
              normal: {
                color: {
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
              }
            }
          },
          {
            data: [
              1820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              932,
              901,
              934,
              1290,
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              932,
              901,
              934,
              1290
            ],
            type: 'bar',
            roundCap: true,
            stack: 'aa',
            itemStyle: {
              color: 'RGBA(255, 234, 0, 1.00)'
            }
          },
          {
            data: [
              1820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              932,
              901,
              934,
              1290,
              820,
              932,
              901,
              934,
              1290,
              1330,
              1320,
              932,
              901,
              934,
              1290,
              932,
              901,
              934,
              1290
            ],
            type: 'bar',
            roundCap: true,
            stack: 'aa',
            itemStyle: {
              color: 'RGBA(70, 236, 113, 1.00)'
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
