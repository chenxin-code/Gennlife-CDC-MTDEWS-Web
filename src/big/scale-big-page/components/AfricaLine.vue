<template>
  <v-chart :options="options" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/line' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'

export default {
  components: {
    VChart
  },
  props: {
    x: Array,
    data: Array
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
        dataZoom: {},
        legend: {
          top: 0,
          right: 0,
          textStyle: { color: 'rgba(144, 145, 160, 1.00)' }
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
                color: 'RGBA(205, 39, 111, 1.00)' // 0% 处的颜色
              },
              {
                offset: 0.5,
                color: 'RGBA(238, 104, 108, 1.00)' // 100% 处的颜色
              },
              {
                offset: 1,
                color: 'RGBA(224, 61, 113, 1.00)' // 100% 处的颜色
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
          data: [],
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
            data: [],
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
                      color: 'RGBA(119, 38, 87, 1.00)' // 0% 处的颜色
                    },
                    {
                      offset: 0.2,
                      color: 'RGBA(119, 38, 87, 0.8)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'RGBA(48, 41, 69, 1.00)' // 0% 处的颜色
                    }
                  ]
                }
              }
            },
            name: '七日平均移动数字'
          }
        ]
      }
    }
  },
  watch: {
    x() {
      this.init()
    },
    data() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$set(this.options.xAxis, 'data', this.x)
      this.$set(this.options.series[0], 'data', this.data[0])
    }
  }
}
</script>

<style lang="scss" scoped></style>
