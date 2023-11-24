<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pie' // 自定义类型
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  components: {
    VChart
  },
  props: {
    num: Number
  },
  data() {
    return {
      options: {
        backgroundColor: '#212342',
        color: ['#fff', 'rgba(50, 53, 89, 1)'],
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        },
        title: [
          {
            text: '0%',
            left: '50%',
            top: 'center',
            textAlign: 'center',
            textStyle: {
              fontFamily: 'Arial-Black, Arial',
              fontSize: '20',
              color: '#ffea00',
              textAlign: 'center',
              fontWeight: '900'
              // lineHeight: 16
            }
          }
        ],
        legend: {
          show: false
        },
        tooltip: {},
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
            radius: ['45%', '88%'],
            center: ['50%', '50%'],
            label: {
              show: false
            },
            minAngle: 20,
            data: [
              { name: '11', value: 11 },
              { name: '22', value: 100 }
            ]
          }
        ]
      }
    }
  },
  watch: {
    num() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const data = []
      data[0] = 1
      data[1] = this.num / 100 * 1
      this.$set(this.options.series[0], 'data', data)
      if (isNaN(this.num)) {
        this.$set(this.options.title[0], 'text', '暂无数据')
      } else {
        this.$set(this.options.title[0], 'text', this.num + '%')
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
