<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pie' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

export default {
  components: {
    VChart
  },
  props: {
    newWeekScanf: {
      type: Array,
      default() {
        return [
          { sick_source: '入境当日口岸检疫发现',
            total_case: 60,
            case_percent: 0.2 },
          { sick_source: '集中隔离点发现',
            total_case: 60,
            case_percent: 0.35 },
          { sick_source: '居家隔离发现',
            total_case: 60,
            case_percent: 0.45 }
        ]
      }
    }
  },
  data() {
    return {
      options: {
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        },
        title: [
          {
            text: `境外输入\n个案发现途径${this.newWeekScanf[0].total_case}人`,
            left: '49.5%',
            top: '42%',
            textAlign: 'center',
            textStyle: {
              fontSize: '12',
              color: '#fff',
              textAlign: 'center',
              fontWeight: '600',
              lineHeight: 16
            }
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
        series: [
          {
            type: 'pie',
            radius: ['38%', '39%'],
            startAngle: 100,
            labelLine: {
              show: false
            },
            data: [
              {
                value: 1,
                value1: 2100000,
                itemStyle: {
                  color: '#00d8ff'
                }
              }
            ],
            z: 3
          },
          {
            type: 'pie',
            startAngle: 100,
            radius: ['40%', '70%'],
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 1)',
              formatter(value) {
                const params = value.name
                let newParamsName = ''
                const paramsNameNumber = params.length
                const provideNumber = 4 // 一行显示几个字
                const rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                  for (let p = 0; p < rowNumber; p++) {
                    let tempStr = ''
                    const start = p * provideNumber
                    const end = start + provideNumber
                    if (p === rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber)
                    } else {
                      tempStr = params.substring(start, end) + '\n'
                    }
                    newParamsName += tempStr
                  }
                } else {
                  newParamsName = params
                }

                return `${newParamsName}: ${value.percent}%`
              }
            },
            labelLine: {
              length: 10,
              length2: 1
            },
            data: [
              {
                name: this.newWeekScanf[0].sick_source,
                value: this.newWeekScanf[0].total_case * this.newWeekScanf[0].case_percent,
                itemStyle: {
                  color: {
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
                        color: 'rgba(0, 115, 255, 1)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              },
              {
                name: this.newWeekScanf[1].sick_source,
                value: this.newWeekScanf[1].total_case * this.newWeekScanf[1].case_percent,
                itemStyle: {
                  color: {
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
                        color: 'rgba(0, 115, 255, 1)' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              },
              {
                name: this.newWeekScanf[2].sick_source,
                value: this.newWeekScanf[2].total_case * this.newWeekScanf[2].case_percent,
                itemStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#F6C94C' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#ffda35' // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  }
                }
              }
            ]
          }
        ]
      }
    }
  }
  // watch: {
  //   newWeekScanf() {
  //     this.init()
  //   }
  // },
  // mounted() {
  //   this.init()
  // },
  // methods: {
  //   init() {
  //     this.$set(
  //       this.options.series[1],
  //       'data',
  //       this.newWeekScanf
  //     )
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
