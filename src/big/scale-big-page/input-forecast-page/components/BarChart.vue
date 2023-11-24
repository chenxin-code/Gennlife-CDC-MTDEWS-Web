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
    data: Object,
    picked: String
  },
  data() {
    return {
      options: {
        // grid: {
        //   x: 60,
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
          },
          name: '隔离天数',
          nameTextStyle: {
            color: '#fff'
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
          },
          name: '阳性人数',
          nameTextStyle: {
            color: '#fff'
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
    },
    picked() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.picked === 'mr') {
        this.$set(this.options.xAxis, 'data', this.data.x)
        this.$set(this.options.series[0], 'data', this.data.y)
      } else {
        this.$set(this.options.xAxis, 'data', this.data.x)
        this.$set(this.options.series[0], 'data', this.data.all_yx_y)
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
