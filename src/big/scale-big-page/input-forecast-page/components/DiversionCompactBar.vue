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
    beforeAfterData: {
      type: Object,
      default: () => {
        return {}
      }
    }
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
          }
        ],
        legend: {
          orient: 'horizontal',
          top: 0,
          right: 66,
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
          data: [],
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
          boundaryGap: [0, '30%'],
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
            barWidth: 12,
            barGap: 0,
            name: '当前隔离人数'
          },
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '分流后隔离人数'
          }
        ]
      }
    }
  },
  watch: {
    beforeAfterData: {
      handler: function() {
        this.init()
      },
      deep: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$set(
        this.options.xAxis,
        'data',
        this.beforeAfterData.city
      )
      this.$set(
        this.options.series[0],
        'data',
        this.beforeAfterData.before
      )
      this.$set(
        this.options.series[1],
        'data',
        this.beforeAfterData.after
      )
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
