<template>
  <div class="container">
    <v-chart
      class="chart"
      :options="options"
      @click="chartClick"
    />
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/geo'
import echarts from 'echarts/lib/echarts'

const guangdong = require(`@/assets/guangdong/440000_full.json`)
const svg =
  'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODJweCIgaGVpZ2h0PSI4MnB4IiB2aWV3Qm94PSIwIDAgODIgODIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+Cgk8ZyBmaWxsPSIjRkY4MDVCIj4KCQk8Y2lyY2xlIG9wYWNpdHk9IjAuMSIgY3g9IjI2IiBjeT0iMjYiIHI9IjI2Ij4KCQk8L2NpcmNsZT4KCQk8Y2lyY2xlIG9wYWNpdHk9IjAuMiIgY3g9IjI2IiBjeT0iMjYiIHI9IjE2Ij4KCQkJPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIxNjsyNjsiIGJlZ2luPSIwcyIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CgkJCTxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iLjQ7MDsiIGJlZ2luPSIwcyIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CgkJPC9jaXJjbGU+CgkJPGNpcmNsZSBjeD0iMjYiIGN5PSIyNiIgcj0iOCI+CgkJCTxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iODsxNjsiIGJlZ2luPSIwcyIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CgkJCTxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iLjU7LjI7IiBiZWdpbj0iMHMiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgoJCTwvY2lyY2xlPgoJCTxjaXJjbGUgY3g9IjI2IiBjeT0iMjYiIHI9IjgiPgoJCTwvY2lyY2xlPgoJPC9nPgo8L3N2Zz4K'

export default {
  components: {
    VChart
  },
  props: {
    data: Array
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
            min: 1,
            max: 6
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
          regions: []
        },
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            encode: {
              value: 2
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
          }
        ]
      },
      code: '440000'
    }
  },
  watch: {
    data: {
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
      // console.log(this.data)
      const data = require(`@/assets/guangdong/${code}_full.json`)
      echarts.registerMap(code, data)
      this.options.geo.map = code
      for (let i = 0; i < guangdong.features.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
          if (guangdong.features[i].properties.name === this.data[j].city_name) {
            this.data[j].value = guangdong.features[i].properties.center
          }
        }
      }
      // console.log(this.data)
      const mapData = this.data.map((v, i) => {
        // console.log(guangdong.features[i].properties.center)
        const obj = {
          name: v.city_name,
          // value: guangdong.features[i].properties.center,
          value: v.value,
          data: v,
          tooltip: {
            textStyle: {
              fontSize: 18
            },
            formatter() {
              return `
                ${v.city_name ? `<div><span>${v.city_name}</span></div>` : ''}
                ${v.input_from_highrisk ? `<div><span>中高风险地区入粤人数：</span><span>${v.input_from_highrisk}</span></div>` : ''}
                ${v.total_case ? `<div><span>累计病例数：</span><span>${v.total_case}</span></div>` : ''}
                ${v.active_case ? `<div><span>现存病例数：</span><span>${v.active_case}</span></div>` : ''}
              `
            }
          }
        }
        // obj.value = guangdong.features[i].properties.center
        obj.symbol = svg
        obj.symbolSize = 30
        obj.itemStyle = {
          color: 'RGBA(204, 9, 15, 1.00)'
        }
        return obj
      })
      console.log(mapData)
      this.options.series[0].data = mapData
    },
    chartClick(e) {
      if (e.componentSubType === 'effectScatter') {
        this.$emit('detail', e.data.data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
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
