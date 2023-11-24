<template>
  <v-chart :options="options" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pie' // 自定义类型

export default {
  components: {
    VChart
  },
  data() {
    return {
      options: {
        backgroundColor: '#212342',
        color: ['#fff', 'rgba(0, 215, 236, 1)'],
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        },
        legend: {
          show: false,
          selected: {
            11: true
          }
        },
        series: [
          {
            itemStyle: {
              normal: {
                borderColor: '#212342',
                borderWidth: 5
              }
            },
            type: 'pie',
            hoverOffset: 2,
            radius: ['50%', '98%'],
            center: ['50%', '50%'],
            label: {
              show: false
            },
            data: [
              { name: '11', value: 11 },
              { name: '22', value: 100 }
            ]
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
