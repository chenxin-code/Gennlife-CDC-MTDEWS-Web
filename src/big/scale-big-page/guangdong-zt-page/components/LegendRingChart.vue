<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pie' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

export default {
  components: {
    VChart
  },
  props: {
    outsideFlight: {
      type: Array,
      default() {
        return [
          { name: '美国', value: 100 },
          { name: '柬埔寨', value: 50 },
          { name: '缅甸', value: 80 },
          { name: '菲律宾', value: 18 },
          { name: '新加坡', value: 60 },
          { name: '印度尼西亚', value: 28 },
          { name: '尼泊尔', value: 38 },
          { name: '马拉西亚', value: 22 }
        ]
      }
    }
  },
  data() {
    return {
      options: {
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        },
        title: [
          {
            text: `境外航班\n入境数为${this.outsideFlight.length}`,
            left: '30%',
            top: '45%',
            textAlign: 'center',
            textStyle: {
              fontSize: '12',
              color: '#fff',
              textAlign: 'center',
              fontWeight: '600',
              lineHeight: 16
            }
          }
        ],
        legend: {
          orient: 'vertical',
          top: 'center',
          left: '65%',
          icon: 'circle',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        series: [
          {
            type: 'pie',
            radius: ['45%', '46%'],
            center: ['30%', '50%'],
            startAngle: 100,
            labelLine: { show: false },
            data: [
              {
                value: 1,
                itemStyle: { color: '#00d8ff' }
              }
            ],
            z: 3
          },
          {
            color: [
              'rgba(70, 236, 113, 1)',
              'RGBA(46, 98, 223, 1.00)',
              'rgba(218, 48, 48, 1)',
              'RGBA(251, 234, 78, 1.00)',
              'rgba(0, 153, 255, 1)',
              'RGBA(226, 73, 117, 1.00)',
              'rgba(249, 168, 37, 1)',
              'RGBA(97, 212, 233, 1.00)'
            ],
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['30%', '50%'],
            label: { show: false },
            data: this.outsideFlight
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
