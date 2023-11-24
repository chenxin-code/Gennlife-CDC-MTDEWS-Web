<template>
  <v-chart :options="options" class="line-bar-chart" />
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
  props: {
    data: {
      type: Object,
      default() {
        return {
          ADD_I: [],
          I: []
        }
      }
    },
    x: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      options: {
        animationDuration: 3000,
        animationDurationUpdate: 3000,
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
            type: 'bar',
            name: '新增',
            roundCap: true,
            itemStyle: {
              opacity: 0.3,
              barBorderRadius: [40, 40, 0, 0]
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
                      color: 'rgba(91, 241, 253, 0.6)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(91, 241, 253, 0.1)' // 100% 处的颜色
                    }
                  ]
                }
              }
            }
          },
          {
            data: [],
            type: 'line',
            name: '累计',
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
          }
        ]
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$set(this.options.xAxis, 'data', this.x)
      this.$set(this.options.series[0], 'data', this.data.I)
      this.$set(this.options.series[1], 'data', this.data.ADD_I)
    }
  }
}
</script>

<style lang="scss" scoped>
.line-bar-chart {
  width: 100%;
  height: 100%;
}
</style>
