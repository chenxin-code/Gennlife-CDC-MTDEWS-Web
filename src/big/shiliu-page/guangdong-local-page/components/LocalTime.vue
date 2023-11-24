<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/bar' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import { random } from 'lodash'

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

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
          y2: 60
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
          data: new Array(50).fill().map((v, i) => '11.' + formatNumber(i + 1)),
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
            data: new Array(50).fill().map((v, i) => random(100, 1000)),
            type: 'bar',
            barWidth: 8,
            name: '境外输入无症状',
            stack: 'a'
          },
          {
            data: new Array(50).fill().map((v, i) => random(100, 1000)),
            type: 'bar',
            barWidth: 8,
            name: '境外输入确诊',
            stack: 'a'
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 30,
            height: 10
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
