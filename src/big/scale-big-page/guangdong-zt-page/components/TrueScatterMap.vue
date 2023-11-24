<template>
  <div :id="uid" />
</template>

<script>
import { Scene, PolygonLayer, LineLayer, Popup } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'

export default {
  props: {
    country: String,
    data: Array
  },
  data() {
    return {
      uid: `map${this._uid}`, // 组件id
      scene: null,
      polygonLayer: null,
      lngLat: { lng: 76.42820135937563, lat: 59.316835455122515 }
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        let find = this.data.find(v => {
          return v.name === this.country
        })
        // let data = this.data
        if (!find) {
          find = {}
          find.risk = 0
          find.classgrade = '低风险'
        }
        this.polygonLayer.color('centroid*name', (centroid, name) => {
          if (name === this.country) {
            this.lngLat = centroid
            return 'red'
          }
          let count = this.data.find(v => {
            return v.name === name
          })
          if (!count) {
            count = {}
            count.risk = 0
            count.classgrade = '低风险'
          }
          if (count.classgrade === '超高风险') { return 'rgba(245,43,123 , .6)' } else if (count.classgrade === '高风险') { return 'rgba(249,207,70, .6)' } else if (count.classgrade === '中风险') { return 'rgba(196,181,12,.6)' } else { return 'rgba(41, 170, 225, .6)' }
        })
        this.scene.render()

        const popup = new Popup({
          offsets: [0, 0],
          closeButton: false
        }).setLnglat(this.lngLat).setHTML(`<div>
              <div class="title">${this.country}输入风险评估</div>
              <div class="content">
              <div class="item">入粤风险值：${find.risk}</div>
              <div class="item">入粤风险等级：${find.classgrade}</div>
              </div>
              </div>`)
        this.scene.addPopup(popup)
      }
    }
    // country() {
    //   let find = this.data.find(v => {
    //     return v.name === this.country
    //   })
    //   if (!find) {
    //     find = {}
    //     find.risk = 0
    //     find.classgrade = '低风险'
    //   }

    //   this.polygonLayer.color('centroid*name', (centroid, name) => {
    //     if (name === this.country) {
    //       this.lngLat = centroid
    //       return 'red'
    //     }
    //     let count = this.data.find(v => {
    //       return v.name === name
    //     })
    //     if (!count) {
    //       count = {}
    //       count.risk = 0
    //       count.classgrade = '低风险'
    //     }
    //     if (count.classgrade === '超高风险') { return 'rgba(245,43,123 , .6)' } else if (count.classgrade === '高风险') { return 'rgba(249,207,70, .6)' } else if (count.classgrade === '中风险') { return 'rgba(196,181,12,.6)' } else { return 'rgba(41, 170, 225, .6)' }
    //     // return 'rgba(41, 170, 225, .6)'
    //   })
    //   this.scene.render()

    //   const popup = new Popup({
    //     offsets: [0, 0],
    //     closeButton: false
    //   }).setLnglat(this.lngLat).setHTML(`<div>
    //           <div class="title">${this.country}输入风险评估</div>
    //           <div class="content">
    //           <div class="item">入粤风险值：${find.risk}</div>
    //           <div class="item">入粤风险等级：${find.classgrade}</div>
    //           </div>
    //           </div>`)
    //   this.scene.addPopup(popup)
    // }
  },
  mounted() {
    this.scene = new Scene({
      id: this.uid,
      map: new Mapbox({
        center: [-13.516867, 16.78437],
        pitch: 0,
        style: 'blank',
        zoom: 1
      })
    })

    this.scene.on('loaded', () => {
      const data = require('@/assets/json/word.json')

      this.polygonLayer = new PolygonLayer({
        fill: {
          activeColor: 'red'
        }
      })
        .source(data)
        .color('centroid*name', (centroid, name) => {
          if (name === this.country) {
            this.lngLat = centroid
            return 'red'
          }
          let count = this.data.find(v => {
            return v.name === name
          })
          if (!count) {
            count = {}
            count.risk = 0
            count.classgrade = '低风险'
          }
          if (count.classgrade === '超高风险') { return 'rgba(245,43,123 , .6)' } else if (count.classgrade === '高风险') { return 'rgba(249,207,70, .6)' } else if (count.classgrade === '中风险') { return 'rgba(196,181,12,.6)' } else { return 'rgba(41, 170, 225, .6)' }
          // return 'rgba(41, 170, 225, .6)'
        })
        .active({
          color: 'red'
        })

      // 设置 hover 事件
      this.polygonLayer.on('mousemove', e => {
        let find = this.data.find(v => {
          return v.name === e.feature.properties.name
        })
        if (!find) {
          find = {}
          find.risk = 0
          find.classgrade = '低风险'
        }
        const popup = new Popup({
          offsets: [0, 0],
          closeButton: false
        }).setLnglat(e.lngLat).setHTML(`<div>
              <div class="title">${e.feature.properties.name}输入风险评估</div>
              <div class="content">
              <div class="item">入粤风险值：${find.risk}</div>
              <div class="item">入粤风险等级：${find.classgrade}</div>
              </div>
              </div>`)
        this.scene.addPopup(popup)
      })

      // 设置 click 事件
      this.polygonLayer.on('click', e => {
        this.lngLat = e.lngLat
        let find = this.data.find(v => {
          return v.name === e.feature.properties.name
        })
        if (!find) {
          find = {}
          find.risk = 0
          find.classgrade = '低风险'
        }
        const popup = new Popup({
          offsets: [0, 0],
          closeButton: false
        }).setLnglat(e.lngLat).setHTML(`<div>
              <div class="title">${e.feature.properties.name}输入风险评估</div>
              <div class="content">
              <div class="item">入粤风险值：${find.risk}</div>
              <div class="item">入粤风险等级：${find.classgrade}</div>
              </div>
              </div>`)
        this.scene.addPopup(popup)

        this.polygonLayer.color('name', name => {
          if (name === e.feature.properties.name) return 'red'
          // return 'rgba(41, 170, 225, .6)'
          let count = this.data.find(v => {
            return v.name === name
          })
          if (!count) {
            count = {}
            count.risk = 0
            count.classgrade = '低风险'
          }
          if (count.classgrade === '超高风险') { return 'rgba(245,43,123 , .6)' } else if (count.classgrade === '高风险') { return 'rgba(249,207,70, .6)' } else if (count.classgrade === '中风险') { return 'rgba(196,181,12,.6)' } else { return 'rgba(41, 170, 225, .6)' }
        })

        this.$emit('click', e.feature.properties.name)
      })

      this.scene.addLayer(this.polygonLayer)

      const lineLayer = new LineLayer({})
        .source(data)
        .color('RGBA(85, 186, 242, 1.00)')
      this.scene.addLayer(lineLayer)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

// 隐藏logo
::v-deep .l7-ctrl-logo {
  display: none;
}
</style>
