<template>
  <fragment>
    <div :id="uid" />

    <div class="left-operation">
      <div class="item">
        <div class="btn btn1" />累计输入病例数（0人）
      </div>
      <div class="item">
        <div class="btn btn2" />累计输入病例数（0-99人）
      </div>
      <div class="item">
        <div class="btn btn3" />累计输入病例数（100以上）
      </div>
    </div>
  </fragment>
</template>

<script>
import { Scene, Popup } from '@antv/l7'
// import {  PointLayer } from "@antv/l7";
import { ProvinceLayer } from '@antv/l7-district'
import { Mapbox } from '@antv/l7-maps'
import { Fragment } from 'vue-fragment'
export default {
  components: {
    Fragment
  },
  props: {
    caseDistributed: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      uid: `map${this._uid}`,
      ProvinceLayer: null,
      polygonLayer: null
    }
  },
  watch: {
    caseDistributed() {
      this.init()
    }
  },
  mounted() {
    this.scene = new Scene({
      id: this.uid,
      map: new Mapbox({
        style: 'blank',
        // style: "dark",
        pitch: 0,
        center: [110.097892, 33.853662],
        zoom: 5.2
      })
    })
    this.init()
  },
  methods: {
    init() {
      this.scene.on('loaded', () => {
        this.ProvinceLayer = new ProvinceLayer(this.scene, {
          data: this.caseDistributed,
          joinBy: ['adcode', 'code'],
          adcode: ['440000'],
          depth: 2,
          label: {
            field: 'NAME_CHN',
            textAllowOverlap: false
          },
          stroke: 'rgba(0, 249, 255, 1)',
          strokeWidth: 1.4,
          chinaNationalStroke: 'red',
          fill: {
            // color: "rgba(0, 216, 255, 0.3)"
            color: {
              field: 'NAME_CHN',
              values: name => {
                name = name.split('').slice(0, name.length - 1).join('')
                const find = this.caseDistributed.find(v => {
                  return v.name === name
                })
                if (!find) {
                  return 'rgba(0, 216, 255, 0.3)'
                }
                if (find['total-case'] <= 0) {
                  return 'rgba(0, 215, 236, 1)'
                } else if (find['total-case'] < 100) {
                  return 'rgba(244, 248, 31, 1)'
                } else {
                  return 'rgba(255, 90, 0, 1)'
                }
              }
            }
          }
        })

        //   this.ProvinceLayer.on('mousemove', e => {
        //     // console.log(e)
        //   let find = this.data.find(v => {
        //     return v.name === e.feature.properties.name
        //   })
        //   if (!find) {
        //     find = {}
        //     find.risk = 0
        //     find.classgrade = '低风险'
        //   }
        //   const popup = new Popup({
        //     offsets: [0, 0],
        //     closeButton: false
        //   }).setLnglat(e.lngLat).setHTML(`<div>
        //         <div class="title">${e.feature.properties.name}输入风险评估</div>
        //         <div class="content">
        //         <div class="item">入粤风险值：${find.risk}</div>
        //         <div class="item">入粤风险等级：${find.classgrade}</div>
        //         </div>
        //         </div>`)
        //   this.scene.addPopup(popup)
        // })

        this.ProvinceLayer.on('mousemove', e => {
          // console.log(e)
          let place = e.feature.properties.NAME_CHN
          place = place
            .split('')
            .slice(0, place.length - 1)
            .join('')
          let find = this.caseDistributed.find(v => {
            return v.name === place
          })
          if (!find) {
            find = {}
            find.name = 'aa'
            find['case-2week'] = 0
            find['total-case'] = 0
            find['case-last'] = 0
          }
          const popup = new Popup({
            offsets: [0, 0],
            closeButton: false
          }).setLnglat(e.lngLat).setHTML(`
            <div class="tip">
              <div class="title">
                <div class="triangle" />
                <span>${e.feature.properties.NAME_CHN}</span>
              </div>
              <div class="content">
                <div class="item">近十四天输入病例数：${find['case-2week']}</div>
                <div class="item">累计输入病例数：${find['total-case']}</div>
                <div class="item">末例时间：${find['case-last']}</div>
              </div>
            </div>`)
          this.scene.addPopup(popup)
        })

        // const pointLayer = new PointLayer({})
        //   .source(
        //     [
        //       {
        //         Longitude: '113.77333',
        //         Latitude: '23.009257',
        //         value: 160
        //       },
        //       {
        //         Longitude: '116.528325',
        //         Latitude: '24.198167',
        //         value: 160
        //       }
        //     ],
        //     {
        //       parser: {
        //         type: 'json',
        //         x: 'Longitude',
        //         y: 'Latitude'
        //       }
        //     }
        //   )
        //   .shape('circle')
        //   .active(true)
        //   .animate({
        //     enable: true,
        //     speed: 1,
        //     rings: 3
        //   })
        //   .size('value', value => value)
        //   .color('rgba(245, 43, 123, 1)')
        //   .style({
        //     opacity: 1
        //   })

        // // // 设置 hover 事件
        // pointLayer.on('mousemove', e => {
        //   console.log(e)
        //   const popup = new Popup({
        //     offsets: [0, 0],
        //     closeButton: false
        //   }).setLnglat(e.lngLat).setHTML(`<div class="tip">
        //       <div class="title">输入风险评估</div>
        //       <div class="content">
        //       <div class="item">入粤风险值：</div>
        //       <div class="item">入粤风险等级：</div>
        //       </div>
        //       </div>`)
        //   this.scene.addPopup(popup)
        // })

        // this.scene.addLayer(pointLayer)

        // const popup = new Popup({
        //   offsets: [0, 0],
        //   closeButton: false
        // }).setLnglat(['116.528325', '24.198167']).setHTML(`<div class="tip">
        //       <div class="title">1输入风险评估</div>
        //       <div class="content">
        //       <div class="item">入粤风险值：</div>
        //       <div class="item">入粤风险等级：</div>
        //       </div>
        //       </div>`)
        // this.scene.addPopup(popup)
      })
    }
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
    }
    .btn1 {
      background-color: rgba(0, 215, 236, 1);
    }
    .btn2 {
      background-color: rgba(244, 248, 31, 1);
    }
    .btn3 {
      background-color: rgba(255, 90, 0, 1);
    }
  }
}

::v-deep {
  .l7-popup-anchor-bottom .l7-popup-tip {
    border-top-color: #f52b7b;
  }
  .l7-popup-content {
    padding: 0;
  }

  .tip {
    width: getWidth(28.44);
    height: getHeight(23.38);
    display: flex;
    flex-direction: column;
    background-color: rgba(#212342, 0.97);
    border-style: solid;
    border-width: getWidth(0.13);
    border-image-source: linear-gradient(0deg, #f52b7b 0%, #ff7c6e 100%);
    border-image-slice: 1;
    .title {
      margin-top: getHeight(2.33);
      margin-left: getWidth(1.75);
      // 标题三角形
      .triangle {
        display: inline-block;
        font-size: 0;
        overflow: hidden;

        // margin-right: getWidth(1);
        &:before {
          content: "";
          position: relative;
          display: inline-block;
          border: getWidth(0.6) solid transparent;

          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;

          border-right-width: 0;
          border-left-width: getWidth(0.6);
          border-left-color: #ffe7b3;
        }
      }
      span {
        margin-left: getWidth(1);
        height: getHeight(2.88);
        line-height: getHeight(2.88);
        font-family: PingFangSC-Medium;
        font-size: $itemTitleSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #ffffff;
      }
    }
    .content {
      .item {
        margin-left: getWidth(1.5);
        height: getHeight(5);
        line-height: getHeight(5);
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #ffffff;
      }
    }
  }
}
</style>
