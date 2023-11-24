<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    VChart
  },
  data() {
    return {
      options: {
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              // backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '超高风险', max: 14 },
            { name: '低风险', max: 14 },
            { name: '高风险', max: 14 },
            { name: '中风险', max: 14 },
            { name: '超高风险', max: 14 },
            { name: '低风险', max: 14 },
            { name: '高风险', max: 14 },
            { name: '中风险', max: 14 }
          ],
          axisLine: {
            lineStyle: {
              color: 'rgba(245, 43, 123, 1)'
            }
          },
          splitArea: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(255, 124, 110, 1)'
              ]
            }
          }
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [14, 14, 7, 7, 0, 14, 0, 14],
              name: '预算分配（Allocated Budget）',
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: 'rgb(245,147,43)' },
                    // { offset: 0.2, color: 'rgb(120,12,33)' },
                    // { offset: 0.4, color: 'rgb(110,233,255)' },
                    // { offset: 0.6, color: 'rgb(245,110,255)' },
                    // { offset: 0.8, color: 'rgba(255, 124, 110, 1)' },
                    // { offset: 0.9, color: 'rgb(141,255,110)' },
                    // { offset: 0.3, color: 'rgb(110,255,255)' },
                    { offset: 1, color: 'rgb(224,110,255)' }
                  ]
                }
              }
            }
          ]
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
