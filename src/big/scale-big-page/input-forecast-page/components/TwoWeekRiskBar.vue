<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/bar' // 自定义类型
import 'echarts/lib/component/tooltip'

export default {
  components: {
    VChart
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      options: {
        legend: {
          orient: 'horizontal',
          top: 0,
          right: 200,
          icon: 'rect',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.47)',
            fontSize: 16
          },
          data: [
            '未来两周入境人数',
            '未来两周入境人员预估病例数'
          ]
        },
        color: [
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(91, 241, 253, 1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(0, 153, 255, 1)' // 100% 处的颜色
              }
            ]
          },
          {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(253, 242, 91, 1)' // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'rgba(253, 215, 91, 1)' // 100% 处的颜色
              }
            ]
          }
        ],
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
        yAxis: [{
          type: 'value',
          fontSize: 16,
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
        {
          type: 'value',
          fontSize: 16,
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
        }],
        series: [
          {
            data: [],
            type: 'bar',
            name: '未来两周入境人数',
            barWidth: '20'
          },
          {
            data: [],
            type: 'bar',
            yAxisIndex: 1,
            name: '未来两周入境人员预估病例数',
            barWidth: '20'
          }
        ]
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler: function() {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const country = this.data.map(v => v.classgrade)
      const num = this.data.map(v => v.num)
      const future_patients_num = this.data.map(v => v.future_patients_num)
      this.$set(this.options.xAxis, 'data', country)
      this.$set(this.options.series[0], 'data', num)
      this.$set(this.options.series[1], 'data', future_patients_num)
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
