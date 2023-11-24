<template>
  <v-chart :options="options" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/dataZoom'

export default {
  components: {
    VChart
  },
  props: {
    x: Array,
    data: Array
  },
  data() {
    return {
      options: {
        animationDuration: 5000,
        animationDurationUpdate: 5000,
        // grid: {
        //   x: 100,
        //   y: 20,
        //   x2: 20,
        //   y2: 20
        // },
        dataZoom: {},
        legend: {
          top: 0,
          right: 0,
          textStyle: { color: 'rgba(144, 145, 160, 1.00)' }
        },
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
          data: [],
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 16
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
            fontSize: 16
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
            data: [],
            type: 'line',
            itemStyle: {
              opacity: 0
            },
            areaStyle: {
              normal: { color: 'RGBA(0, 153, 255, 1.00)' }
            },
            name: '跨境司机'
          },
          {
            data: [],
            type: 'line',
            itemStyle: {
              opacity: 0
            },
            areaStyle: {
              normal: { color: 'RGBA(70, 236, 113, 1.00)' }
            },
            name: '商务公务员'
          },
          {
            data: [],
            type: 'line',
            itemStyle: {
              opacity: 0
            },
            areaStyle: {
              normal: { color: 'RGBA(255, 234, 0, 1.00)' }
            },
            name: '船员'
          },
          {
            data: [],
            type: 'line',
            itemStyle: {
              opacity: 0
            },
            areaStyle: {
              normal: { color: 'RGBA(255, 61, 125, 1.00)' }
            },
            name: '跨境学员'
          }
        ]
      }
    }
  },
  watch: {
    x() {
      this.init()
    },
    data() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$set(this.options.xAxis, 'data', this.x)
      this.$set(this.options.series[0], 'data', this.data[0])
      this.$set(this.options.series[1], 'data', this.data[1])
      this.$set(this.options.series[2], 'data', this.data[2])
      this.$set(this.options.series[3], 'data', this.data[3])
    }
  }
}
</script>

<style lang="scss" scoped></style>
