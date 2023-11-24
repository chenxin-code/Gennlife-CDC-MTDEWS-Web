<template>
  <v-chart :options="options" theme="macarons" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/line' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/theme/macarons'
import 'echarts/lib/component/legend'
import { cloneDeep } from 'lodash'

export default {
  components: {
    VChart
  },
  props: {
    data: Object
  },
  data() {
    return {
      options: {
        animationDuration: 5000,
        animationDurationUpdate: 5000,
        legend: {
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          x: 100,
          y: 50,
          x2: 20,
          y2: 20
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
            type: 'line'
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
    if (this.data) {
      this.init()
    }
  },
  methods: {
    init() {
      const options = cloneDeep(this.options)
      options.xAxis.data = this.data.x
      options.series = this.data.data.map((v, i) => {
        return {
          name: v.city,
          data: v.citySchoolStatics.map(j => j.absNum),
          type: 'line'
        }
      })
      this.options = options
      // this.$set(this.options.xAxis, "data", this.data.x);
      // this.$set(
      //   this.options,
      //   "series",
      //   this.data.data.map((v, i) => {
      //     return {
      //       name: v.city,
      //       data: v.citySchoolStatics.map(j => j.absNum),
      //       type: "line"
      //     };
      //   })
      // );
    }
  }
}
</script>

<style lang="scss" scoped></style>
