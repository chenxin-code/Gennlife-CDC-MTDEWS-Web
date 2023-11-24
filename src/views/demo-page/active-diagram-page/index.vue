<template>
  <div class="container">
    <div>活动热力图</div>
    <v-chart :options="options" />
  </div>
</template>

<script>
// https://echarts.apache.org/examples/zh/editor.html?c=heatmap-bmap
import ECharts from 'vue-echarts'
import 'echarts/lib/echarts'
// 引入基础库
import 'echarts/lib/component/legend' // legend
import 'echarts/lib/component/tooltip' // tooltip
import 'echarts/lib/chart/graph' // 自定义类型

export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      options: {
        color: ['red', 'yellow', 'green'],
        title: {
          text: 'Les Miserables',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [],
        animation: false,
        series: []
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>
