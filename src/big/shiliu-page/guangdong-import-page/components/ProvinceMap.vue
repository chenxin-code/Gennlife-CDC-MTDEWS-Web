<template>
  <fragment>
    <div :id="uid" />

    <!-- 右边操作栏 -->
    <div class="right-operation" />

    <!-- 底部操作栏 -->
    <div class="bottom-operation">
      <div class="item">正常</div>
      <div class="item">低风险</div>
      <div class="item">中风险</div>
      <div class="item">高风险</div>
    </div>
  </fragment>
</template>

<script>
import { Scene, PointLayer } from '@antv/l7'
import { ProvinceLayer } from '@antv/l7-district'
import { Mapbox } from '@antv/l7-maps'
import { Fragment } from 'vue-fragment'
export default {
  components: {
    Fragment
  },
  data() {
    return {
      uid: `map${this._uid}`
    }
  },
  mounted() {
    const scene = new Scene({
      id: this.uid,
      map: new Mapbox({
        style: 'blank',
        // style: "dark",109.515272,36.653543
        pitch: 0,
        center: [110.19382669582967, 50.258134],
        zoom: 5.2
      })
    })

    var adCode = [
      '441400',
      '441700',
      '440200',
      '441300',
      '440300',
      '440400',
      '440500',
      '440600',
      '440700',
      '440800',
      '440900',
      '441200',
      '440100',
      '441500',
      '441600',
      '441800',
      '441900',
      '442000',
      '442100',
      '445100',
      '445200',
      '445300'
    ]
    scene.on('loaded', () => {
      new ProvinceLayer(scene, {
        data: [],
        joinBy: ['adcode', 'code'],
        adcode: adCode,
        depth: 2,
        field: 'NAME_CHN',
        label: {
          color: 'rgba(0, 216, 255, 0.3)',
          size: {
            field: 'NAME_CHN',
            values: [
              20,
              20,
              20,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10,
              10
            ]
          }, // 1400 1700 0200
          // },
          // size: 20,
          textAllowOverlap: false
        },
        // stroke: "rgba(0, 249, 255, 1)",
        // strokeWidth: 2,

        // chinaNationalStroke: 'red',
        // provinceStroke: 'rgba(0, 249, 255, 1)',
        // provinceStrokeWidth: 2,
        // cityStroke: 'rgba(0, 249, 255, 1)',
        // cityStrokeWidth: 1,
        // countyStroke: "rgba(0, 249, 255, .2)",
        // countyWidth: 1,
        fill: {
          color: 'rgba(0, 216, 255, 0.3)'
        }
      })

      const pointLayer = new PointLayer({})
        .source(
          [
            //       {
            //         Longitude: "112.103776",
            //         Latitude: "22.204259",
            //         value: 100
            //       },
            {
              Longitude: '112.103776',
              Latitude: '22.204259',
              value: 80
            },
            {
              Longitude: '113.09723',
              Latitude: '24.063088',
              value: 80
            },
            {
              Longitude: '113.77333',
              Latitude: '23.009257',
              value: 80
            }
            //       // {
            //       //   Longitude: '116.528325',
            //       //   Latitude: '24.198167',
            //       //   value: 160
            //       // }
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
        .animate({
          enable: true,
          speed: 1,
          rings: 3
        })
        .size('value', value => value)
        .color('rgba(245, 43, 123, 1)')
        .style({
          opacity: 1
          // strokeWidth: 1
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

.bottom-operation {
  position: absolute;
  z-index: 1;
  display: flex;
  bottom: getHeight(4.56);
  left: 50%;
  transform: translateX(-50%);

  > .item + .item {
    margin-left: getWidth(0.44);
  }
  > .item {
    width: getWidth(7.5);
    height: getHeight(1.88);
    background: rgba(249, 207, 70, 0.1);

    text-align: center;
    line-height: getHeight(1.88);
    font-size: $nomalSize;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;

    &:nth-child(1) {
      border: getWidth(0.06) solid rgba(rgba(0, 215, 236, 1), 0.5);
      color: rgba(0, 215, 236, 1);
    }
    &:nth-child(2) {
      border: getWidth(0.06) solid rgba(#f9cf46, 0.5);
      color: #f9cf46;
    }
    &:nth-child(3) {
      border: getWidth(0.06) solid rgba(rgba(255, 90, 0, 1), 0.5);
      color: rgba(255, 90, 0, 1);
    }
    &:nth-child(4) {
      border: getWidth(0.06) solid rgba(#fd0000, 0.5);
      color: #fd0000;
    }
  }
}
</style>
