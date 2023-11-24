<template>
  <div class="container">
    <div class="btns">
      <input id="radio1" v-model="picked" type="radio" value="port">
      <input id="radio2" v-model="picked" type="radio" value="country">
      <label for="radio1">口岸</label>
      <label for="radio2">国家</label>
    </div>
    <div class="rose-chart">
      <v-chart :options="options" theme="macarons" class="chart" />
    </div>
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pie' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/theme/macarons'

const picked = 'port'
const inboundData = {
  port: [],
  country: []
}
export default {
  components: {
    VChart
  },
  props: {
    inbound: {
      type: Object,
      default: () => {
        return {
          inbound_by_country: [],
          inbound_by_port: {}
        }
      }
    }
  },
  data() {
    return {
      picked,
      inboundData,
      options: {
        // grid: {
        //   x: 0,
        //   y: 0,
        //   x2: 0,
        //   y2: 0
        // },
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
                const v = value.name
                let place
                if (v === 'baiyun_airport_count') {
                  place = '白云机场'
                } else if (v === 'shenzhen_bay_count') {
                  place = '深圳湾'
                } else if (v === 'baoan_airport_count') {
                  place = '宝安机场'
                } else if (v === 'bridge_count') {
                  place = '港珠澳大桥'
                } else {
                  place = v
                }
                return `${place}: ${value.percent}%`
              }
            },
            labelLine: {
              length: 10,
              length2: 1
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    inbound: {
      deep: true,
      handler: function() {
        this.init()
      }
    },
    picked() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.filterData()
      this.$set(this.options.series[1], 'data', this.inboundData[this.picked])
    },
    filterData() {
      this.inboundData.country = this.inbound.inbound_by_country.map(v => {
        return {
          name: v.country,
          value: v.count,
          percent: Number(v.rate).toFixed(2)
        }
      })
      const total = Object.keys(this.inbound.inbound_by_port).reduce(
        (oldVal, val) => {
          return oldVal + this.inbound.inbound_by_port[val]
        },
        0
      )
      this.inboundData.port = Object.keys(this.inbound.inbound_by_port).map(
        v => {
          return {
            name: v,
            value: this.inbound.inbound_by_port[v],
            percent: (this.inbound.inbound_by_port[v] / total).toFixed(2)
          }
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .btns {
    flex: 1;
    input[type="radio"] {
      display: none;
    }
    label {
      display: inline-block;
      width: getWidth(5);
      height: getHeight(2.6);
      text-align: center;
      line-height: getHeight(2.6);
      background-color: #212342;
      border: solid getWidth(0.13) rgba(255, 255, 255, 0.3);
      margin-right: getWidth(1.63);
      font-family: PingFangSC-Medium;
      font-size: $nomalSize;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }
    input:checked:nth-of-type(1) ~ label:nth-of-type(1) {
      border: solid 0.13rem #54ebfd;
      opacity: 0.5;
      color: #54ebfd;
    }
    input:checked:nth-of-type(2) ~ label:nth-of-type(2) {
      border: solid 0.13rem #54ebfd;
      opacity: 0.5;
      color: #54ebfd;
    }
  }
  .rose-chart {
    flex: 9;
    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
