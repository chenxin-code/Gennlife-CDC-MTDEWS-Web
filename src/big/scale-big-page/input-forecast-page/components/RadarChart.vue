<template>
  <div class="container">
    <v-chart :options="options" class="chart" />
    <div class="strategy">
      <div class="item">
        <div class="value">{{ centerData.risk_new }}‱</div>
        <div class="label">调整后解除隔离的阳性率</div>
      </div>
      <div class="item">
        <div class="value">{{ centerData.risk_relative_ratio }}‱</div>
        <div class="label">相对风险比</div>
      </div>
      <div class="item">
        <div class="value">{{ centerData.risk_14_all }}‱</div>
        <div class="label">调整前解除隔离的阳性率</div>
      </div>
    </div>
    <div class="box">
      <p>
        超高风险国家(集中隔离{{ boxData[0] }}天，居家隔离{{ boxData[4] }}天)
      </p>
      <p>高风险国家(集中隔离{{ boxData[1] }}天，居家隔离{{ boxData[5] }}天)</p>
      <p>中风险国家(集中隔离{{ boxData[2] }}天，居家隔离{{ boxData[6] }}天)</p>
      <p>低风险国家(集中隔离{{ boxData[3] }}天，居家隔离{{ boxData[7] }}天)</p>
      <p>解除隔离后的阳性率{{ centerData.risk_14_all }}‱</p>
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
      boxData: {
        MAX_HIGH_RISK: { J: 7, H: 7 },
        HIGH_RISK: { J: 14, H: 0 },
        MEDIUM_RISK: { J: 14, H: 0 },
        LOW_RISK: { J: 7, H: 7 }
      },
      options: {
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: '#fff',
              borderRadius: 3
            }
          },
          startAngle: 45,
          splitNumber: 14,
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
      // let box = document.getElementsByClassName("box")[0]
      // box.innerHTML = `<p>超高风险国家(集中隔离${paramConfig.MAX_HIGH_RISK.J}天，居家隔离${paramConfig.MAX_HIGH_RISK.H}天)</p>
      //   <p>高风险国家(集中隔离${paramConfig.HIGH_RISK.J}天，居家隔离${paramConfig.HIGH_RISK.H}天)</p>
      //   <p>中风险国家(集中隔离${paramConfig.MEDIUM_RISK.J}天，居家隔离${paramConfig.MEDIUM_RISK.H}天)</p>
      //   <p>低风险国家(集中隔离${paramConfig.LOW_RISK.J}天，居家隔离${paramConfig.LOW_RISK.H}天)</p>
      //   <p>解除隔离后的阳性率${ centerData.risk_14_all }%</p>`
    },
    centerParam: {
      deep: true,
      handler() {
        this.initParam()
        // this.boxData.MAX_HIGH_RISK.J = this.paramConfig.MAX_HIGH_RISK.J
        // this.boxData.MAX_HIGH_RISK.H = this.paramConfig.MAX_HIGH_RISK.H
        // this.boxData.HIGH_RISK.J = this.paramConfig.HIGH_RISK.J
        // this.boxData.HIGH_RISK.H = this.paramConfig.HIGH_RISK.H
        // this.boxData.MEDIUM_RISK.J = this.paramConfig.MEDIUM_RISK.J
        // this.boxData.MEDIUM_RISK.H = this.paramConfig.MEDIUM_RISK.H
        // this.boxData.LOW_RISK.J = this.paramConfig.LOW_RISK.J
        // this.boxData.LOW_RISK.H = this.paramConfig.LOW_RISK.H
        // console.log(this.paramConfig.MAX_HIGH_RISK.J)
        // console.log(this.paramConfig.MAX_HIGH_RISK.H)
        // console.log(this.paramConfig.HIGH_RISK.J)
        // console.log(this.paramConfig.HIGH_RISK.H)
        // console.log(this.paramConfig.MEDIUM_RISK.J)
        // console.log(this.paramConfig.MEDIUM_RISK.H)
        // console.log(this.paramConfig.LOW_RISK.J)
        // console.log(this.paramConfig.LOW_RISK.H)
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
          .map(v => {
            if (v.label === '超高风险国家') {
              return { name: '(集中隔离)' + v.label, max: 28 }
            } else {
              return { name: '(集中隔离)' + v.label, max: v.max }
            }
          })
          .concat(
            paramConfig.map(v => ({
              name: '(居家隔离)' + v.label,
              max: v.max
            }))
          )
      )
      // this.boxData.MAX_HIGH_RISK.J = this.paramConfig.MAX_HIGH_RISK.J
      // this.boxData.MAX_HIGH_RISK.H = this.paramConfig.MAX_HIGH_RISK.H
      // this.boxData.HIGH_RISK.J = this.paramConfig.HIGH_RISK.J
      // this.boxData.HIGH_RISK.H = this.paramConfig.HIGH_RISK.H
      // this.boxData.MEDIUM_RISK.J = this.paramConfig.MEDIUM_RISK.J
      // this.boxData.MEDIUM_RISK.H = this.paramConfig.MEDIUM_RISK.H
      // this.boxData.LOW_RISK.J = this.paramConfig.LOW_RISK.J
      // this.boxData.LOW_RISK.H = this.paramConfig.LOW_RISK.H
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
      this.boxData = paramConfig
        .map(v => this.centerParam[`${v}_J`])
        .concat(paramConfig.map(v => this.centerParam[`${v}_H`]))
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
        white-space: nowrap;
        margin-top: 0.8rem;
      }
    }
  }
  .box {
    position: absolute;
    top: 55%;
    left: 60%;
    // transform: translate(-50%, -50%);
    color: #ffffff;
  }
}
</style>
