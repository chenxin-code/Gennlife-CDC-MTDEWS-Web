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
          splitNumber: 0,
          data: [
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
            type: 'line',
            itemStyle: {
              opacity: 0
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
                      color: 'rgba(91, 241, 253, 0.3)' // 0% 处的颜色
                    },
                    {
                      offset: 0.4,
                      color: 'rgba(91, 241, 253, 0.1)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(0, 153, 255, 0.01)' // 100% 处的颜色
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
            itemStyle: {
              opacity: 0.3,
              barBorderRadius: [40, 40, 0, 0]
            },
            areaStyle: {
              normal: {
                // color: {
                //   type: "linear",
                //   x: 0,
                //   y: 0,
                //   x2: 0,
                //   y2: 1,
                //   colorStops: [
                //     {
                //       offset: 0,
                //       color: "rgba(91, 241, 253, 0.3)" // 0% 处的颜色
                //     },
                //     {
                //       offset: 0.4,
                //       color: "rgba(91, 241, 253, 0.1)" // 0% 处的颜色
                //     },
                //     {
                //       offset: 1,
                //       color: "rgba(0, 153, 255, 0.01)" // 100% 处的颜色
                //     }
                //   ]
                // }
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
