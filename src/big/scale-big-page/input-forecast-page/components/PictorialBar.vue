<template>
  <v-chart :options="options" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pictorialBar'
import 'echarts/lib/component/tooltip'

export default {
  components: {
    VChart
  },
  props: {
    data1: {
      type: Array,
      default() {
        return [
          { name: '阳性人数', value: 100 },
          { name: '检测人数', value: 400 }
        ]
      }
    }
  },
  data() {
    return {
      options: {}
    }
  },
  watch: {
    data1: {
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
      // console.log(this.data1)
      const spirit = ''
      let baifen = (this.data1[0].value / this.data1[1].value) * 100
      if (isNaN(baifen)) {
        baifen = '0%'
      } else {
        baifen = baifen + '%'
      }
      this.options = {
        grid: {
          // top: "50%",
          bottom: '50%'
        },
        tooltip: {
          // trigger: "axis",
          formatter: (params, ticket, callback) => {
            return (
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#5bc057;'></span>阳性" +
              this.data1[0].value +
              "<br /><span style='display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#fff;'></span>" +
              '未检测' +
              (this.data1[1].value - this.data1[0].value)
            )
          }
          // axisPointer.axis = 'auto'
        },
        xAxis: {
          max: this.data1[1].value,
          offset: 10,
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        yAxis: {
          data: '阳性人数',
          // inverse: true,
          splitLine: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false },
          axisTick: { show: false }
        },
        series: [
          {
            type: 'pictorialBar',
            symbol: spirit,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbolClip: true,
            symbolSize: 30,
            data: [this.data1[0].value],
            itemStyle: {
              normal: {
                color: '#5bc057'
              }
            },
            markLine: {
              symbol: 'none',
              label: {
                formatter: 'max: {c}',
                position: 'start'
              },
              lineStyle: {
                color: 'red',
                type: 'dotted',
                opacity: 0.2,
                width: 2
              },
              data: [
                {
                  type: 'max'
                }
              ]
            },
            z: 10
          },
          {
            type: 'pictorialBar',
            itemStyle: {
              normal: {
                opacity: 0.2,
                color: '#fff'
              }
            },
            label: {
              show: true,
              formatter: baifen,
              position: 'right',
              offset: [10, 0],
              color: '#5bc057',
              fontSize: 18
            },
            animationDuration: 0,
            symbolRepeat: 'fixed',
            symbolMargin: '5%',
            symbol: spirit,
            symbolSize: 30,
            data: [this.data1[1].value - this.data1[0].value],
            z: 5
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.myChart {
  width: 100%;
  height: 100%;
}
</style>
