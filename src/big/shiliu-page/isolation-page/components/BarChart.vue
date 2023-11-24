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
    data: Object
  },
  data() {
    return {
      options: {
        grid: {
          x: 40,
          y: 20,
          x2: 20,
          y2: 20
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
          splitNumber: 0,
          data: [],
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
            data: [],
            type: 'bar',
            barWidth: '40%'
          }
        ]
      }
    }
  },
  watch: {
    data() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$set(this.options.xAxis, 'data', this.data.x)
      this.$set(this.options.series[0], 'data', this.data.y)
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
