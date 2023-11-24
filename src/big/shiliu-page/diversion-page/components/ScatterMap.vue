<template>
  <div :id="uid" />
</template>

<script>
import { Scene, PolygonLayer, LineLayer, PointLayer } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'

export default {
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
        this.polygonLayer.color('centroid*name', (centroid, name) => {
          if (name === this.country) {
            this.lngLat = centroid
            return 'red'
          }
          return 'rgba(41, 170, 225, .6)'
        })
        this.scene.render()
      }
    },
    country() {
      this.polygonLayer.color('centroid*name', (centroid, name) => {
        if (name === this.country) {
          this.lngLat = centroid
          return 'red'
        }
        return 'rgba(41, 170, 225, .6)'
      })
      this.scene.render()
    }
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
          return 'rgba(41, 170, 225, .6)'
        })
        .active({
          color: 'red'
        })

      // 设置 click 事件
      this.polygonLayer.on('click', e => {
        this.lngLat = e.lngLat
        this.polygonLayer.color('name', name => {
          if (name === e.feature.properties.name) return 'red'
          return 'rgba(41, 170, 225, .6)'
        })

        this.$emit('click', e.feature.properties.name)
      })

      this.scene.addLayer(this.polygonLayer)

      const lineLayer = new LineLayer({})
        .source(data)
        .color('RGBA(85, 186, 242, 1.00)')
      this.scene.addLayer(lineLayer)
      fetch('https://gw.alipayobjects.com/os/basement_prod/337ddbb7-aa3f-4679-ab60-d64359241955.json')
        .then(res => res.json())
        .then(bubble => {
          bubble.features = bubble.features.filter(item => {
            return item.properties.capacity > 800
          })
          const pointLayer = new PointLayer({})
            .source(bubble)
            .shape('circle')
            .size('capacity', [3, 16])
            .color('capacity', [
              'orange',
              'red',
              'blue',
              'pink',
              'yellow',
              'green'
            ])
            .active(true)
            .style({
              opacity: 0.6,
              strokeWidth: 0
            })

          this.scene.addLayer(pointLayer)
        })
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
