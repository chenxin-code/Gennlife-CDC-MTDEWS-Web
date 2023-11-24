<template>
  <v-chart :options="options" theme="macarons" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pie' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/theme/macarons'

// var len = 0
export default {
  components: {
    VChart
  },
  props: {
    importCountry: {
      type: Array,
      default: () => {
        return []
      }
    },
    countCountry: {
      type: Number,
      default: () => {
        return 0
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
            text: `境外航班\n入境数为${this.countCountry}`,
            left: '30%',
            top: '45%',
            textAlign: 'center',
            textStyle: {
              fontSize: '16',
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
          }, {
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['30%', '50%'],
            label: { show: false },
            data: this.importCountry
            // data: [
            //   { name: '美国', value: 100 },
            //   { name: '柬埔寨', value: 50 },
            //   { name: '缅甸', value: 80 },
            //   { name: '菲律宾', value: 18 },
            //   { name: '新加坡', value: 60 },
            //   { name: '印度尼西亚', value: 28 },
            //   { name: '尼泊尔', value: 38 },
            //   { name: '马拉西亚', value: 22 }
            // ]
          }
        ]
      }
    }
  },
  watch: {
    countCountry() {
      this.$set(this.options.title[0], 'text', `境外航班\n入境数为${this.countCountry}`)
      this.$set(this.options.series[1], 'data', this.importCountry)
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
