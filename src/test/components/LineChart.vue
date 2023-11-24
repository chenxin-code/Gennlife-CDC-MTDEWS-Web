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
                color: 'rgba(245, 43, 123, 1)'
              },
              {
                offset: 0.3,
                color: 'rgb(217,66,192)'
              },
              {
                offset: 0.5,
                color: 'rgb(236,169,169)'
              },
              {
                offset: 0.7,
                color: 'rgb(238,190,190)'
              },
              {
                offset: 1,
                color: 'transparent'
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
          boundaryGap: false,
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 8
          },
          data: [0, 2, 4, 6, 8, 10, 12, 14, '>14']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 8
          }
        },
        series: [{
          data: [0.6, 0.64, 0.68, 0.72, 0.79, 0.83, 0.88, 0.93, 0.98],
          type: 'line',
          lineStyle: {
            color: 'rgba(245, 43, 123, 1)',
            width: 5
          },
          areaStyle: {}
        }]
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
