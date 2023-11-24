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
import 'echarts/lib/component/visualMap'
import echarts from 'echarts/lib/echarts'

// const xianggang = require(`@/assets/guangdong/810000_full.json`)

export default {
  components: {
    VChart
  },
  props: {
    data: Object,
    area: Array
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          show: true
          // formatter: '{b}<br/>{c}'
        },
        geo: {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          // zoom: 0,
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
              borderColor: 'RGBA(0, 249, 255, 1.00)', // 边界框颜色
              borderWidth: 1.5,
              // areaColor: 'RGBA(255, 90, 134, 1.00)'
              areaColor: 'RGBA(13, 90, 134, 1.00)' // 地图区域颜色
            },
            emphasis: {
              areaColor: '#2AB8FF', // hover 地图区域颜色
              borderWidth: 0,
              color: 'green'
            }
          },
          emphasis: {
            label: {
              color: 'rgba(0, 0, 0, .65)' // hover 文字颜色
            },
            itemStyle: {
              areaColor: '#603fdaa6'
            }
          },
          // nameProperty: "adcode",
          regions: []
          /** {name:'中西区',itemStyle: {
          areaColor: 'red',
          }} */
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
              color: 'RGBA(255, 0, 136, .8)'
            },
            emphasis: {
              label: {
                show: false
              }
            }
          }
        ]
      },
      code: '810000'
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
    // console.log(JSON.stringify(this.options))
    // console.log(this.data)
    this.init(this.code)
  },
  methods: {
    init(code = '810000') {
      // 注册geo json 数据
      const data = require(`@/assets/guangdong/${code}_full.json`)
      // console.log(data.type)
      echarts.registerMap(code, data)
      this.options.geo.map = code
      const arr = []
      // console.log(this.data)
      for (const i of data.features) {
        for (const j in this.data) {
          // console.log(i.properties.name)
          // console.log(j)
          // console.log(i.properties.name.indexOf(j))
          if (i.properties.name.indexOf(j) >= 0) {
            if (this.data[j].value >= 0 && this.data[j].value <= this.area[0]) {
              arr.push({ name: i.properties.name, itemStyle: { areaColor: 'rgba(0, 215, 236, 1)' }})
            } else if (this.data[j].value > this.area[0] && this.data[j].value <= this.area[1]) {
              arr.push({ name: i.properties.name, itemStyle: { areaColor: 'rgba(249, 207, 70, 1)' }})
            } else if (this.data[j].value > this.area[1] && this.data[j].value <= this.area[2]) {
              arr.push({ name: i.properties.name, itemStyle: { areaColor: 'rgba(255, 90, 0, 1)' }})
            } else if (this.data[j].value > this.area[2] && this.data[j].value <= this.area[3]) {
              arr.push({ name: i.properties.name, itemStyle: { areaColor: 'rgba(253, 0, 0, 1)' }})
            } else if (this.data[j].value > this.area[3]) {
              arr.push({ name: i.properties.name, itemStyle: { areaColor: 'rgba(245, 11, 81, 1)' }})
            }
          }
        }
      }
      // console.log(arr)
      this.options.geo.regions = arr
      /* let j = 0

      for(let i in this.data){
        if(this.data[i].value === 0){
          this.$set(this.options.geo.regions[j].itemStyle,'areaColor','rgba(0, 215, 236, 1)')
          j++
        }else if(this.data[i].value >=1 && this.data[i].value <= 500){
          this.$set(this.options.geo.regions[j].itemStyle,'areaColor','rgba(249, 207, 70, 1)')//249  207  70
          j++
        }else if(this.data[i].value >=501 && this.data[i].value <= 1000){
          this.$set(this.options.geo.regions[j].itemStyle,'areaColor','rgba(255, 90, 0, 1)')
          j++
        }else if(this.data[i].value >=1001 && this.data[i].value <= 2000){
          this.$set(this.options.geo.regions[j].itemStyle,'areaColor','rgba(253, 0, 0, 1)')//253  0 0
          j++
        }else if(this.data[i].value >=2001){
          this.$set(this.options.geo.regions[j].itemStyle,'areaColor','rgba(245, 11, 81, 1)')//245  11  81
          j++
        }
        if(j > 17){j = 0}
      } */
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
  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
