<template>
  <div class="container">
    <v-chart :options="options" class="chart" />
    <div class="strategy">
      <div class="item">
        <div class="value">{{ centerData.risk_new }}%</div>
        <div class="label">推荐方案风险值</div>
      </div>
      <div class="item">
        <div class="value">{{ centerData.risk_relative_ratio }}%</div>
        <div class="label">相对风险比</div>
      </div>
      <div class="item">
        <div class="value">{{ centerData.risk_14_all }}%</div>
        <div class="label">统一隔离风险值</div>
      </div>
    </div>
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/radar' // 自定义类型
import 'echarts/lib/component/tooltip'

// const paramConfig = [
//   { label: "亚洲", J: 7, H: 7 },
//   { label: "非洲", J: 14, H: 0 },
//   { label: "北美洲", J: 14, H: 0 },
//   { label: "南美洲", J: 14, H: 0 },
//   { label: "欧洲", J: 14, H: 0 },
//   { label: "南极洲+大洋洲", J: 7, H: 7 }
// ];

export default {
  components: {
    VChart
  },
  props: {
    paramConfig: Object,
    centerParam: Object,
    centerData: {
      type: Object,
      default() {
        return {
          risk_14_all: 0,
          risk_new: 0,
          risk_relative_ratio: 0
        }
      }
    }
  },
  data() {
    return {
      options: {
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              borderRadius: 3
            }
          },
          startAngle: 23,
          splitNumber: 7,
          indicator: [{ name: ' ', max: 7 }],
          splitLine: {
            lineStyle: {
              color: [
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(255, 124, 110, 1)'
              ]
            }
          },
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(245, 43, 123, 1)'
            }
          }
        },
        series: [
          {
            type: 'radar',
            tooltip: {
              trigger: 'item'
            },
            data: [
              {
                name: '入境隔离人员政策调整推荐方案参数设置',
                value: [],
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: 'rgba(245, 43, 123, 1)' },
                      { offset: 1, color: 'rgba(255, 124, 110, 1)' }
                    ]
                  }
                }
              },
              {
                name: '统一隔离风险值',
                value: [14, 14, 14, 14, 0, 0, 0, 0],
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      { offset: 0, color: 'rgba(112, 43, 123, 0.6)' },
                      { offset: 1, color: 'rgba(223, 124, 110, 0.6)' }
                    ]
                  }
                }
              }
            ]
          }
        ]
      }
    }
  },
  watch: {
    paramConfig() {
      this.initRadar()
    },
    centerParam: {
      deep: true,
      handler() {
        this.initParam()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.initRadar()
      this.initParam()
    },
    initRadar() {
      const paramConfig = Object.values(this.paramConfig)
      this.$set(
        this.options.radar,
        'indicator',
        paramConfig
          .map(v => ({ name: '(集中隔离)' + v.label, max: v.max }))
          .concat(
            paramConfig.map(v => ({
              name: '(居家隔离)' + v.label,
              max: v.max
            }))
          )
      )
    },
    initParam() {
      const paramConfig = Object.keys(this.paramConfig)
      this.$set(
        this.options.series[0].data[0],
        'value',
        paramConfig
          .map(v => this.centerParam[`${v}_J`])
          .concat(paramConfig.map(v => this.centerParam[`${v}_H`]))
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
  .chart {
    width: 100%;
    height: 100%;
  }
  .strategy {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    justify-content: center;
    .item + .item {
      margin-left: 5rem;
    }
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .label {
        font-size: 1.5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        white-space: nowrap;
      }
      .value {
        font-size: 3.75rem;
        font-family: JCHEadA;
        color: #ffffff;
        margin-top: 0.8rem;
      }
    }
  }
}
</style>
