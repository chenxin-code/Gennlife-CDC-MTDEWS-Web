<template>
  <v-chart :options="options" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pie' // 自定义类型
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    VChart
  },
  props: {
    data: Array
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
            text: this.data[1].value === 0 ? '0%' : Math.tofixed(Number(this.data[0].value) / Number(this.data[1].value), 5) * 100 + '%',
            left: '45%',
            top: 'center',
            textAlign: 'center',
            textStyle: {
              fontFamily: 'Arial-Black, Arial',
              fontSize: '12',
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
            radius: ['50%', '98%'],
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
    data: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$set(this.options.series[0], 'data', this.data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
