<template>
  <div class="map-container">
    <v-chart
      class="chart"
      :options="options"
      @click="chartClick"
      @dblclick="dbClick"
    />

    <!-- <div v-if="code !== '440000'" class="back" @click="back">
      返回
    </div> -->
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/lines'
import echarts from 'echarts/lib/echarts'

const guangdong = require(`@/assets/guangdong/440000_full.json`)

export default {
  components: {
    VChart
  },
  props: {
    casePoint: {
      type: Array,
      default() {
        return []
      }
    },
    trackPoint: {
      type: Array,
      default() {
        return []
      }
    },
    workPoint: {
      type: Array,
      default() {
        return []
      }
    },
    douliuPoint: {
      type: Array,
      default() {
        return []
      }
    },
    case2CaseLine: {
      type: Array,
      default() {
        return []
      }
    },
    case2TrackLine: {
      type: Array,
      default() {
        return []
      }
    },
    case2WorkLine: {
      type: Array,
      default() {
        return []
      }
    },
    isCase: {
      type: Boolean,
      default() {
        return true
      }
    },
    isTrack: {
      type: Boolean,
      default() {
        return true
      }
    },
    isWork: {
      type: Boolean,
      default() {
        return true
      }
    },
    isDouliu: {
      type: Boolean,
      default() {
        return true
      }
    },
    isCase2Case: {
      type: Boolean,
      default() {
        return false
      }
    },
    isCase2Track: {
      type: Boolean,
      default() {
        return false
      }
    },
    isCase2Work: {
      type: Boolean,
      default() {
        return false
      }
    },
    radius: {
      type: Number,
      default() {
        return 100
      }
    }
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          show: true
        },
        geo: {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          // zoom: 1.4,
          scaleLimit: {
            min: 1.3,
            max: 12
          },
          roam: true,
          label: {
            show: true,
            color: '#fff',
            fontSize: 18
          },
          itemStyle: {
            normal: {
              borderColor: 'RGBA(0, 249, 255, 1.00)',
              borderWidth: 1.5,
              areaColor: 'RGBA(13, 90, 134, 1.00)'
            },
            emphasis: {
              areaColor: '#2AB8FF',
              borderWidth: 0,
              color: 'green'
            }
          },
          emphasis: {
            label: {
              color: 'rgba(0, 0, 0, .65)'
            },
            itemStyle: {
              areaColor: '#603fdaa6'
            }
          },
          // nameProperty: "adcode",
          data: []
        },
        series: [
          // casePoint 病例点
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            symbolSize: 6,
            label: {
              show: false
            },
            itemStyle: {
              color: 'red',
              opacity: this.isCase ? 0.8 : 0
            },
            emphasis: {
              label: {
                show: false
              }
            },
            tooltip: {
              formatter(val) {
                return `
                <div class="item">
                  <span class="label">姓名</span>
                  <span class="value">${val.data.name}</span>
                </div>
                <div class="item">
                  <span class="label">发病日期</span>
                  <span class="value">${val.data.arrival_date}</span>
                </div>
                <div class="item">
                  <span class="label">常住地址</span>
                  <span class="value">${val.data.permanent_address}</span>
                </div>
                 <div class="item">
                  <span class="label">工作地址</span>
                  <span class="value">${val.data.address}</span>
                </div>
                 <div class="item">
                  <span class="label">病例备注</span>
                  <span class="value">${val.data.remark}</span>
                </div>
                `
              }
            }
          },
          // trackPoint 轨迹点
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            symbolSize: 6,
            label: {
              show: false
            },
            itemStyle: {
              color: 'blue',
              opacity: this.isTrack ? 0.8 : 0
            },
            emphasis: {
              label: {
                show: false
              }
            },
            tooltip: {
              formatter(val) {
                return `
                <div class="item">
                  <span class="label">姓名</span>
                  <span class="value">${val.data.name}</span>
                </div>
                <div class="item">
                  <span class="label">发病日期</span>
                  <span class="value">${val.data.arrival_date}</span>
                </div>
                <div class="item">
                  <span class="label">常住地址</span>
                  <span class="value">${val.data.permanent_address}</span>
                </div>
                 <div class="item">
                  <span class="label">轨迹地址</span>
                  <span class="value">${val.data.address}</span>
                </div>
                 <div class="item">
                  <span class="label">轨迹备注</span>
                  <span class="value">${val.data.remark}</span>
                </div>
                `
              }
            }
          },
          // workPoint 工作地点
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            symbolSize: 6,
            label: {
              show: false
            },
            itemStyle: {
              color: 'yellow',
              opacity: this.isWork ? 0.8 : 0
            },
            emphasis: {
              label: {
                show: false
              }
            },
            tooltip: {
              formatter(val) {
                return `
                <div class="item">
                  <span class="label">姓名</span>
                  <span class="value">${val.data.name}</span>
                </div>
                <div class="item">
                  <span class="label">发病日期</span>
                  <span class="value">${val.data.arrival_date}</span>
                </div>
                <div class="item">
                  <span class="label">常住地址</span>
                  <span class="value">${val.data.permanent_address}</span>
                </div>
                 <div class="item">
                  <span class="label">工作地址</span>
                  <span class="value">${val.data.address}</span>
                </div>
                 <div class="item">
                  <span class="label">工作备注</span>
                  <span class="value">${val.data.remark}</span>
                </div>
                `
              }
            }
          },
          // douliuPoint 逗留点
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            symbolSize: 6,
            label: {
              show: false
            },
            itemStyle: {
              color: 'green',
              opacity: this.isDouliu ? 0.8 : 0
            },
            emphasis: {
              label: {
                show: false
              }
            },
            tooltip: {
              formatter(val) {
                return `
                <div class="item">
                  <span class="label">地址</span>
                  <span class="value">${val.data.name}</span>
                </div>
                <div class="item">
                  <span class="label">报告日期</span>
                  <span class="value">${val.data.arrival_date}</span>
                </div>
                 <div class="item">
                  <span class="label">工作备注</span>
                  <span class="value">${val.data.remark}</span>
                </div>
                `
              }
            }
          },
          // case2CaseLine 病例点 对 病例点 连线
          {
            type: 'lines',
            zlevel: 1, // 设置这个才会有轨迹线的小尾巴
            polyline: true,
            lineStyle: {
              normal: {
                color: 'red', // 线条颜色
                width: 1.5,
                curveness: 0.2,
                shadowColor: '#fff',
                opacity: this.isCase2Case ? 0.8 : 0
              }
            },
            data: []
          },
          // case2TrackLine 病例点 对 轨迹点 连线
          {
            type: 'lines',
            zlevel: 1, // 设置这个才会有轨迹线的小尾巴
            polyline: true,
            lineStyle: {
              normal: {
                color: 'blue', // 线条颜色
                width: 1.5,
                curveness: 0.2,
                shadowColor: '#fff',
                opacity: this.isCase2Track ? 0.8 : 0
              }
            },
            data: []
          },
          // case2WorkLine 病例点 对 工作点 连线
          {
            type: 'lines',
            zlevel: 1, // 设置这个才会有轨迹线的小尾巴
            polyline: true,
            symbol: 'none',
            lineStyle: {
              normal: {
                color: 'yellow', // 线条颜色
                width: 1.5,
                curveness: 0.2,
                shadowColor: '#fff',
                opacity: this.isCase2Work ? 0.8 : 0
              }
            },
            data: []
          },
          // area 病例点范围
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            symbolSize: this.radius / 6,
            label: {
              show: false
            },
            itemStyle: {
              color: 'red',
              opacity: this.isCase ? 0.4 : 0
            },
            emphasis: {
              label: {
                show: false
              }
            }
          },
          // area 工作地点范围
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            symbolSize: this.radius / 6,
            label: {
              show: false
            },
            itemStyle: {
              color: 'yellow',
              opacity: this.isCase ? 0.4 : 0
            },
            emphasis: {
              label: {
                show: false
              }
            }
          }
        ]
      },
      code: '440100'
    }
  },
  computed: {
    // 点和线  是否显示
    pointLineShowObj() {
      const {
        isCase,
        isTrack,
        isWork,
        isDouliu,
        isCase2Case,
        isCase2Track,
        isCase2Work
      } = this
      return {
        isCase,
        isTrack,
        isWork,
        isDouliu,
        isCase2Case,
        isCase2Track,
        isCase2Work
      }
    }
  },
  watch: {
    casePoint: {
      deep: true,
      immediate: true,
      handler() {
        this.initCasePoint()
        this.initArea()
      }
    },
    trackPoint: {
      deep: true,
      immediate: true,
      handler() {
        this.initTrackPoint()
      }
    },
    workPoint: {
      deep: true,
      handler() {
        this.initWorkPoint()
        this.initArea()
      }
    },
    douliuPoint: {
      deep: true,
      immediate: true,
      handler() {
        this.initDouliuPoint()
      }
    },
    case2CaseLine: {
      deep: true,
      immediate: true,
      handler() {
        this.initCase2CaseLine()
      }
    },
    case2TrackLine: {
      deep: true,
      immediate: true,
      handler() {
        this.initCase2TrackLine()
      }
    },
    case2WorkLine: {
      deep: true,
      immediate: true,
      handler() {
        this.initCase2WorkLine()
      }
    },
    // 点和线  是否显示
    pointLineShowObj() {
      this.$set(
        this.options.series[0].itemStyle,
        'opacity',
        this.isCase ? 0.8 : 0
      )
      this.$set(
        this.options.series[1].itemStyle,
        'opacity',
        this.isTrack ? 0.8 : 0
      )
      this.$set(
        this.options.series[2].itemStyle,
        'opacity',
        this.isWork ? 0.8 : 0
      )
      this.$set(
        this.options.series[3].itemStyle,
        'opacity',
        this.isDouliu ? 0.8 : 0
      )
      this.$set(
        this.options.series[4].lineStyle.normal,
        'opacity',
        this.isCase2Case ? 0.8 : 0
      )
      this.$set(
        this.options.series[5].lineStyle.normal,
        'opacity',
        this.isCase2Track ? 0.8 : 0
      )
      this.$set(
        this.options.series[6].lineStyle.normal,
        'opacity',
        this.isCase2Work ? 0.8 : 0
      )
      this.$set(
        this.options.series[7].itemStyle,
        'opacity',
        this.isCase ? 0.4 : 0
      )
      this.$set(
        this.options.series[8].itemStyle,
        'opacity',
        this.isWork ? 0.4 : 0
      )
    },
    radius: {
      deep: true,
      immediate: true,
      handler() {
        this.initArea()
      }
    }
  },
  mounted() {
    this.init(this.code)
  },
  methods: {
    init(code = '440000') {
      // 注册geo json 数据
      const data = require(`@/assets/guangdong/${code}_full.json`)
      echarts.registerMap(code, data)
      this.options.geo.map = code
    },
    chartClick(e) {
      if (e.componentSubType === 'effectScatter') {
        this.$emit('detail', e.data.data)
      }
    },
    dbClick(e) {
      const index = guangdong.features.findIndex(v => {
        return v.properties.name === e.name
      })

      if (index !== -1) {
        this.code = guangdong.features[index].properties.adcode
        this.init(this.code)
      }
    },
    back() {
      this.code = '440000'
      this.init(this.code)
    },
    // 初始化病例点
    initCasePoint() {
      this.$set(
        this.options.series[0],
        'data',
        this.casePoint.map(v => {
          return {
            ...v,
            // name: v.name,
            value: [v.permanent_longitude, v.permanent_latitude]
          }
        })
      )
    },
    // 初始化轨迹点
    initTrackPoint() {
      this.$set(
        this.options.series[1],
        'data',
        this.trackPoint.map(v => {
          console.log(v)
          return {
            ...v,
            // name: v.address,
            value: [v.longitude, v.latitude]
          }
        })
      )
    },
    // 初始化工作地点
    initWorkPoint() {
      this.$set(
        this.options.series[2],
        'data',
        this.workPoint.map(v => {
          return {
            ...v,
            // name: v.address,
            value: [v.longitude, v.latitude]
          }
        })
      )
    },
    // 初始化逗留
    initDouliuPoint() {
      this.$set(
        this.options.series[3],
        'data',
        this.douliuPoint.map(v => {
          return {
            ...v,
            // name: v.address,
            value: [v.longitude, v.latitude]
          }
        })
      )
    },
    // 初始化 病例间连线
    initCase2CaseLine() {
      this.$set(this.options.series[4], 'data', this.case2CaseLine)
    },
    // 初始化 病例 轨迹连线
    initCase2TrackLine() {
      this.$set(this.options.series[5], 'data', this.case2TrackLine)
    },
    // 初始化 病例 工作地点连线
    initCase2WorkLine() {
      this.$set(this.options.series[6], 'data', this.case2WorkLine)
    },
    initArea() {
      this.$set(this.options.series[7], 'symbolSize', this.radius / 6)
      this.$set(
        this.options.series[7],
        'data',
        this.casePoint.map(v => {
          return {
            ...v,
            name: v.name,
            value: [v.permanent_longitude, v.permanent_latitude]
          }
        })
      )

      this.$set(this.options.series[8], 'symbolSize', this.radius / 6)
      this.$set(
        this.options.series[8],
        'data',
        this.workPoint.map(v => {
          return {
            ...v,
            name: v.address,
            value: [v.longitude, v.latitude]
          }
        })
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  .back {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 20px 40px;
    border-radius: 5px;
    background-color: rgba(#fff, 0.5);
    &:active {
      transform: scale(1.05);
    }
  }

  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
