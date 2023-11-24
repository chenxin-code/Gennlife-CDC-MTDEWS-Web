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
                color: 'rgba(91, 241, 253, 1)'
              },
              {
                offset: 1,
                color: 'rgba(0, 153, 255, 1)'
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
                color: 'rgba(133, 255, 0, 1)'
              },
              {
                offset: 1,
                color: 'rgba(55, 176, 35, 1)'
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
                color: 'rgba(255, 168, 59, 1)'
              },
              {
                offset: 1,
                color: 'rgba(255, 234, 0, 1)'
              }
            ]
          }
        ],
        legend: {
          orient: 'horizontal',
          top: 0,
          right: 0,
          icon: 'circle',
          textStyle: {
            color: 'rgba(255, 255, 255, .4)',
            fontSize: 10
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
          data: ['深港口岸', '珠港口岸', '珠澳口岸'],
          // boundaryGap: false,
          splitNumber: 0,
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
            type: 'bar',
            barWidth: 12,
            barGap: 0,
            name: '需要隔离的人'
          },
          {
            data: [800, 632, 501, 234, 290, 330, 1020],
            type: 'bar',
            barWidth: 12,
            name: '不实行隔离的人'
          },
          {
            data: [880, 112, 801, 194, 190, 230, 1100],
            type: 'bar',
            barWidth: 12,
            name: '跨境货车司机'
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
