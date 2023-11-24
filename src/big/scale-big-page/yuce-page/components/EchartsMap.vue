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
import echarts from 'echarts/lib/echarts'

const guangdong = require(`@/assets/guangdong/440000_full.json`)

export default {
  components: {
    VChart
  },
  props: {
    prints: {
      type: Array,
      default() {
        return []
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
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            tooltip: { show: false },
            symbolSize: 6,
            encode: {
              value: 20
            },
            label: {
              show: false
            },
            itemStyle: {
              color: 'RGBA(255, 248, 136, .8)'
            },
            emphasis: {
              label: {
                show: false
              }
            }
          },
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            tooltip: { show: false },
            symbolSize: 6,
            encode: {
              value: 20
            },
            label: {
              show: false
            },
            itemStyle: {
              color: 'red'
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
      // code: '440000'
    }
  },
  watch: {
    prints: {
      deep: true,
      handler() {
        this.init(this.code)
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

      // 地图点显示
      const scatterData = this.prints
        .map(v => {
          return {
            value: [v.lon, v.lat]
          }
        })
        .concat(this.options.series[0].data)
      this.$set(this.options.series[0], 'data', scatterData)

      this.$set(
        this.options.series[1],
        'data',
        this.prints.map(v => {
          return {
            value: [v.lon, v.lat]
          }
        })
      )
    },
    chartClick(e) {
      if (e.componentSubType === 'effectScatter') {
        this.$emit('detail', e.data.data)
      }
    },
    dbClick(e) {
      console.log(e)
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
