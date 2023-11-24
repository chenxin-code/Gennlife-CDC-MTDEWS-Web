<template>
  <div class="container">
    <v-chart
      class="chart"
      :options="options"
      @click="chartClick"
      @dblclick="dbClick"
    />

    <div v-if="code !== '440000'" class="back" @click="back">
      返回
    </div>
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
            min: 1.3,
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
          // nameProperty: "adcode",
          data: []
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
      const data = require(`@/assets/guangdong/${code}_full.json`)
      echarts.registerMap(code, data)
      this.options.geo.map = code

      // 检测是否需要更新地图
      // let flag = false;
      // flag = this.options.series[0].data.some(v => {
      //   return this.data.some(j => {
      //     return (
      //       j.longitude === v.data.longitude &&
      //       j.latitude === v.data.latitude &&
      //       j.warnLevel === v.daga.warnLevel
      //     );
      //   });
      // });
      // if (flag) return;

      // 清空数据
      // this.options.series[0].data = [];
      // 散点图信息

      // todo 对比经纬度、 报警等级， 少进行渲染地图
      //       const mapData = this.data.map(v => {
      //         const obj = {
      //           name: v.address,
      //           value: [v.longitude, v.latitude],
      //           data: v,
      //           tooltip: {
      //             textStyle: {
      //               fontSize: 18
      //             },
      //             formatter() {
      //               return `
      //         ${
      //   v.placeName
      //     ? `<div>
      //                  <span>${v.placeName}</span>
      //                </div>`
      //     : ''
      // }
      //           ${
      //   v.address
      //     ? `
      //               <div>
      //                 <span>地址</span>
      //                 <span>${v.address}</span>
      //               </div>
      //               `
      //     : ''
      // }
      //            ${
      //   v.organizationName
      //     ? `<div>
      //                  <span>所属疾控：</span>
      //                  <span>${v.organizationName}</span>
      //                </div>`
      //     : ''
      // }
      //               ${
      //   v.message
      //     ? `<div style="color: RGBA(175, 153, 69, 1.00)">
      //                  <span>${v.message}</span>
      //                </div>`
      //     : ''
      // }

      //           `
      //             }
      //           }
      //         }

      //         if (String(v.warnLevel) === '4') {
      //           obj.symbolSize = 60
      //           obj.itemStyle = {
      //             color: 'RGBA(204, 9, 15, 1.00)'
      //           }
      //         }
      //         if (String(v.warnLevel) === '3') {
      //           obj.symbolSize = 40
      //           obj.itemStyle = {
      //             color: 'RGBA(234, 85, 6, 1.00)'
      //           }
      //         }
      //         if (String(v.warnLevel) === '2') {
      //           obj.symbolSize = 20
      //           obj.itemStyle = {
      //             color: 'RGBA(255, 170, 55, 1.00)'
      //           }
      //         }
      //         if (String(v.warnLevel) === '1') {
      //           obj.symbolSize = 15
      //           obj.itemStyle = {
      //             color: 'RGBA(175, 153, 69, 1.00)'
      //           }
      //         }

      //         return obj
      //       })
      //       this.options.series[0].data = mapData
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

      if (index) {
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
