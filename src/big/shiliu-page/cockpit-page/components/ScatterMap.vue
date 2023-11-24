<template>
  <div :id="uid" />
</template>

<script>
import { Scene, PointLayer } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'
export default {
  data() {
    return {
      uid: `map${this._uid}` // 组件id
    }
  },
  mounted() {
    // TODO 中文
    const scene = new Scene({
      id: this.uid,
      map: new Mapbox({
        style: 'dark',
        pitch: 0,
        center: [114.230035, 23.158198],
        zoom: 5.2
      })
    })

    scene.on('loaded', () => {
      // new ProvinceLayer(scene, {
      //   data: [],
      //   joinBy: ["adcode", "code"],
      //   adcode: ["440000"]
      // });

      const pointLayer = new PointLayer({})
        .source(
          [
            {
              Longitude: '113.230035',
              Latitude: '23.158198',
              value: 100
            },
            {
              Longitude: '112.103776',
              Latitude: '22.204259',
              value: 80
            },
            {
              Longitude: '113.09723',
              Latitude: '24.063088',
              value: 40
            },
            {
              Longitude: '113.77333',
              Latitude: '23.009257',
              value: 160
            },
            {
              Longitude: '116.528325',
              Latitude: '24.198167',
              value: 200
            }
          ],
          {
            parser: {
              type: 'json',
              x: 'Longitude',
              y: 'Latitude'
            }
          }
        )
        .shape('circle')
        .active(true)
        .size('value', value => {
          return value / 20
        })
        .color('value', value => {
          if (value > 150) return '#D64376'
          if (value > 100) return '#E6B03D'
          if (value > 50) return '#EDDE4A'
          return '#63D8EF'
        })
        .style({
          opacity: 1
        })

      scene.addLayer(pointLayer)
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
