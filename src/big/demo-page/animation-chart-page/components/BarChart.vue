<template>
  <div class="container">
    <v-chart :options="options" />
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import { random } from 'lodash'

const xAxisData = []
const data1 = []
const data2 = []
for (let i = 0; i < 100; i++) {
  xAxisData.push('类目' + i)
  data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
  data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
}

export default {
  components: {
    VChart
  },
  data() {
    return {
      options: {
        // animationDuration: 2000,
        // animationDurationUpdate: 3000,
        title: {
          text: '柱状图动画延迟'
        },
        legend: {
          data: ['bar', 'bar2']
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          splitLine: {
            show: false
          }
        },
        yAxis: {},
        series: [
          {
            name: 'bar',
            type: 'bar',
            data: data1,
            animationDelay: function(idx) {
              return (Math.sin(idx / 5) * (idx / 5 - 10) + idx / 6) * 50
            }
          },
          {
            name: 'bar2',
            type: 'bar',
            data: data2,
            animationDelay: function(idx) {
              return (Math.cos(idx / 5) * (idx / 5 - 10) + idx / 6) * 50 + 100
            }
          }
        ],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function(idx) {
          return idx * 5
        }
      }
    }
  },
  mounted() {},
  methods: {
    chartRandom() {
      console.log('bar chart change')
      this.options.series[0].data = []
      this.options.series[1].data = []
      const data1 = []
      const data2 = []
      for (let i = 0; i < 100; i++) {
        data1.push(random(-30, 20))
        data2.push(random(0, 50))
      }
      this.options.series[0].data = data1
      this.options.series[1].data = data2
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  > .echarts {
    width: 100%;
    height: 100%;
  }
}
</style>
