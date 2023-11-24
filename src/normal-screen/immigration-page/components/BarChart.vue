<template>
  <div ref="chart" class="chart" />
</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/bar' // 自定义类型
import 'echarts/lib/component/tooltip'

export default {
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
          // boundaryGap: false,
          splitNumber: 0,
          data: [0, 2, 4, 6, 8, 10, 12, 14, 16],
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
            data: [820, 932, 901, 934, 1290, 1330, 1320, 600, 800],
            type: 'bar',
            barWidth: '40%'
          }
        ]
      }
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart)
      chart.setOption(this.options)
      window.addEventListener('resize', function() {
        chart.resize()
      })
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

