<template>
  <fragment>
    <div :id="uid" />

    <!-- 左侧状态栏 -->
    <div class="left-operation">
      <div class="item">
        <div class="btn" />累计输入病例数（0人）
      </div>
      <div class="item">
        <div class="btn yellow" />累计输入病例数（0-99人）
      </div>
      <div class="item">
        <div class="btn red" />累计输入病例数（100以上）
      </div>
    </div>
  </fragment>
</template>

<script>
import { Scene, PointLayer } from '@antv/l7'
import { ProvinceLayer } from '@antv/l7-district'
import { Mapbox } from '@antv/l7-maps'
import { Fragment } from 'vue-fragment'
// import { Scale, Zoom } from '@antv/l7'
export default {
  components: {
    Fragment
  },
  data() {
    return {
      uid: `map${this._uid}` // 组件id
    }
  },
  mounted() {
    const scene = new Scene({
      id: this.uid,
      map: new Mapbox({
        style: 'blank',
        // style: "dark",
        pitch: 0,
        center: [110.097892, 33.853662],
        zoom: 3
      })
    })
    const arrCode = ['440100', '440200', '445300', '441800', '441200', '440800', '440900', '441700', '441600', '445200', '445100', '440500', '441500',
      '440700', '441900', '441300', '440600', '442000', '441400', '440400', '440300', '442100', '820000', '810000']
    scene.on('loaded', () => {
      new ProvinceLayer(scene, {
        data: [],
        joinBy: ['adcode', 'code'],
        adcode: arrCode,
        depth: 2,
        label: {
          size: {
            field: 'NAME_CHN',
            values: [10, 10, 10, 10, 50, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
          }
        }, // 100 200 5300 1800 1200 800 900 1700 1600 5200 5100 500 1500 700 1900 1300 600 2000 1400 400 300 2100  820000 810000
        stroke: 'rgba(0, 249, 255, 1)',
        strokeWidth: 0.1,

        chinaNationalStroke: 'red',
        fill: {
          color: 'rgba(0, 216, 255, 0.3)'
        }
      })

      const pointLayer = new PointLayer({})
        .source(
          [

            {
              Longitude: '113.280637',
              Latitude: '23.125178',
              value: 160
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
        .animate({
          enable: true,
          speed: 1,
          rings: 3
        })
        .size('value', value => value)
        .color('rgba(245, 43, 123, 1)')
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
.left-operation {
  position: absolute;
  z-index: 1;
  display: flex;
  flex-direction: column;
  bottom: getHeight(4.56);
  left: 0;
  top: getHeight(15);

  > .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: getWidth(25);
    height: getHeight(2.06);
    font-size: $nomalSize;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: getHeight(2.06);
    text-align: center;
    margin-bottom: getHeight(1);
    .btn {
      margin-right: getWidth(1);
      width: getWidth(1.75);
      height: getHeight(1.25);
      background: #00d7ec;
      opacity: 0.8;
      border: getWidth(0.06) solid rgba(rgba(0, 215, 236, 1), 0.5);
    }
    .yellow{
      border: getWidth(0.06) solid rgba(#f9cf46, 0.5);
      background-color: #f9cf46;
    }
    .red{
      border: getWidth(0.06) solid rgba(#e1346e, 0.5);
      background-color: #e1346e;
    }
  }
}
</style>
