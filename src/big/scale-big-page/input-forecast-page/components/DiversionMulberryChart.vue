<template>
  <div class="mulberry-container">
    <div class="sangshen">
      <v-chart :options="options" class="chart" />
    </div>
    <div class="bottom">
      <div
        v-for="(v, i) in ['低风险', '中风险', '高风险', '超高风险']"
        :key="i"
        class="nav-item"
      >
        <!-- 四个div分别为四个角上的div -->
        <div class="horn">
          <div class="lt" />
          <div class="rt" />
          <div class="rb" />
          <div class="lb" />
        </div>
        <div class="label">{{ v }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/sankey' // 自定义类型
import 'echarts/lib/component/tooltip'
import { uniqBy, range } from 'lodash'

export default {
  components: {
    VChart
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          baiyun_airport: {
            广州: [
              {
                country: '加蓬',
                count: 213,
                risk_level: '低风险'
              },
              {
                country: '伊拉克',
                count: 233,
                risk_level: '高风险'
              }
            ]
          },
          baoan_ariport: {
            深圳: [
              {
                country: '伊拉克',
                count: 445,
                risk_level: '高风险'
              }
            ]
          },
          shenzhen_bay: {
            深圳: [
              {
                country: '中国香港',
                count: 14706,
                risk_level: '超高风险'
              }
            ]
          },
          bridge: {
            珠海: [
              {
                country: '中国香港',
                count: 1985,
                risk_level: '超高风险'
              }
            ]
          }
        }
      }
    }
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter(v) {
            return (
              `${v.name}` +
              ':' +
              `${v.value}` +
              ' 来源国:' +
              `${v.data.country}`
            )
          }
        },
        series: {
          label: {
            color: '#fff'
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: '#aaa'
          },
          // lineStyle: {
          //   color: "source",
          //   curveness: 0.5
          // },
          type: 'sankey',
          layout: 'none',
          focusNodeAdjacency: 'allEdges',
          data: [],
          links: []
        }
      }
    }
  },
  watch: {
    data() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const links = []
      let data = []

      Object.keys(this.data).forEach(v => {
        let place
        if (v === 'baiyun_airport') {
          place = '白云机场'
        } else if (v === 'shenzhen_bay') {
          place = '深圳湾'
        } else if (v === 'baoan_ariport') {
          place = '宝安机场'
        } else if (v === 'bridge') {
          place = '港珠澳大桥'
        } else {
          place = v
        }
        for (const i in this.data[v]) {
          // const num = 0;
          const airportColor = {
            low: 0,
            medium: 0,
            high: 0,
            superHigh: 0
          }
          for (const item of this.data[v][i]) {
            let color = ''
            if (item.risk_level === '低风险') {
              airportColor.low = 1
              color = 'rgba(41, 170, 225, 1)'
            } else if (item.risk_level === '中风险') {
              color = 'rgba(249, 207, 70, 1)'
              airportColor.medium = 1
            } else if (item.risk_level === '高风险') {
              color = 'rgba(255, 90, 0, 1)'
              airportColor.high = 1
            } else if (item.risk_level === '超高风险') {
              color = 'rgba(253, 0, 0, 1)'
              airportColor.superHigh = 1
            }
            if (item.count > 0) {
              links.push({
                source: place,
                target: i,
                value: item.count,
                country: item.country,
                lineStyle: {
                  color: color
                }
              })
            }
          }
          let airportC = ''
          if (airportColor.superHigh === 1) {
            airportC = 'rgba(253, 0, 0, 1)'
          } else if (airportColor.high === 1) {
            airportC = 'rgba(255, 90, 0, 1)'
          } else if (airportColor.medium === 1) {
            airportC = 'rgba(249, 207, 70, 1)'
          } else if (airportColor.low === 1) {
            airportC = 'rgba(41, 170, 225, 1)'
          }
          // 添加城市节点
          data.push({
            name: i,
            itemStyle: {
              color: airportC
            }
          })
        }
        data.push({
          name: place,
          itemStyle: {
            color: 'rgba(255, 255, 255, 1)'
          }
        })
      })
      data = uniqBy(data, 'name')

      this.$set(this.options.series, 'data', data)
      this.$set(this.options.series, 'links', links)
      this.$set(this.options.series, 'levels', [{
        depth: 0,
        lineStyle: {
          opacity: 0.6
        }
      }, {
        depth: 1,
        lineStyle: {
          opacity: 0.6
        }
      }])
    },
    getColor(min, max, val) {
      // 设置颜色段
      const colors = [
        'RGBA(142, 37, 19, 1.00)',
        'RGBA(255, 168, 59, 1.00)',
        'RGBA(47, 198, 253, 1.00)',
        ''
      ]

      const addStep = (Number(max) - Number(min)) / colors.length
      const step = range(0, colors.length).map(v => (v + 1) * addStep + min)
      let index = 0
      for (let i = 0; i < step.length - 1; i++) {
        if (step[i] >= val && val < step[i + 1]) {
          index = i
        }
      }
      return colors[index]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.mulberry-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .sangshen {
    flex: 9;
    .chart {
      width: 100%;
      height: 100%;
    }
  }
  .bottom {
    flex: 1;
  }
}
.bottom {
  position: absolute;
  bottom: getHeight(2);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

$borderSize: 2px;
$unBgColor: rgba(41, 170, 225, 1);

.nav-item + .nav-item {
  margin-left: getWidth(1);
}

.nav-item {
  width: getWidth(6);
  height: getHeight(2.6);
  text-align: center;
  line-height: getHeight(2.6);
  font-size: $nomalSize;

  background: linear-gradient(
    239deg,
    rgba($unBgColor, 0.19) 0%,
    rgba($unBgColor, 0.19) 100%
  );
  position: relative;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  .label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $unBgColor;
    -webkit-background-clip: text;
  }

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $unBgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $unBgColor;
      border-left: $borderSize solid $unBgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $unBgColor;
      border-right: $borderSize solid $unBgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $unBgColor;
      border-right: $borderSize solid $unBgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $unBgColor;
      border-left: $borderSize solid $unBgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
}

$bgColor: rgba(249, 207, 70, 1);
.nav-item:nth-child(2) {
  background: linear-gradient(
    239deg,
    rgba($bgColor, 0.19) 0%,
    rgba($bgColor, 0.19) 100%
  );

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $bgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
  .label {
    color: $bgColor;
  }
}

$bgColor: rgba(255, 90, 0, 1);
.nav-item:nth-child(3) {
  background: linear-gradient(
    239deg,
    rgba($bgColor, 0.19) 0%,
    rgba($bgColor, 0.19) 100%
  );

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $bgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
  .label {
    color: $bgColor;
  }
}

$bgColor: rgba(253, 0, 0, 1);
.nav-item:nth-child(4) {
  background: linear-gradient(
    239deg,
    rgba($bgColor, 0.19) 0%,
    rgba($bgColor, 0.19) 100%
  );

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $bgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
  .label {
    color: $bgColor;
  }
}
</style>
