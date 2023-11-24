<template>
  <div class="container">
    <v-chart :options="options" />
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import { random } from 'lodash'

const x = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
export default {
  components: {
    VChart
  },
  data() {
    return {
      options: {
        animationDuration: 2000,
        animationDurationUpdate: 3000,
        tooltip: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: x
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
          }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    chartRandom() {
      console.log('line chart change')
      this.options.series[0].data = x.map(v => random(100, 2000))
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
