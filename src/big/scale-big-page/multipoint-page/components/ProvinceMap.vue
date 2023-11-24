<template>
  <fragment>
    <div :id="uid" />

    <div class="wrap" @click.stop="disapper">
      <div v-show="showLine" ref="line" class="line" />
      <div v-show="showDetail" class="message" @click.stop="">
        <div class="title">
          <div>
            <div class="triangle" />
            <span>预警信息</span>
          </div>
          <div class="titleWarn">
            <span>高风险等级：{{ fakeData[index].region }}</span>
          </div>
        </div>
        <div class="chart-container">
          <div class="item1">
            <span>火车聚集性检测预警</span>
            <span class="detail">
              {{ fakeData[index].train }} 发现：
              <span
                :class="{ resWarn: fakeData[index].count > 0 }"
              >{{ fakeData[index].count }}人确诊</span>
            </span>
          </div>
          <div class="item2">
            <span>风险相关联人员预警</span>
            <span class="detail">
              临床症状：<span
                :class="{ resWarn: fakeData[index].status.c1 > 0 }"
              >{{ fakeData[index].status.c1 }}人</span>
              <span>（ 未检测：<span
                :class="{ resWarn: fakeData[index].status.c2 > 0 }"
              >{{ fakeData[index].status.c2 }}人</span>阳性：<span
                class="resWarn"
              >{{ fakeData[index].status.c3 }}人</span>
                ）</span>
            </span>
            <span class="detail">
              购药记录：<span
                :class="{ resWarn: fakeData[index].drug.c1 > 0 }"
              >{{ fakeData[index].drug.c1 }}人</span>
              <span>（ 未检测：<span
                :class="{ resWarn: fakeData[index].drug.c2 > 0 }"
              >{{ fakeData[index].drug.c2 }}人</span>阳性：<span
                :class="{ resWarn: fakeData[index].drug.c3 > 0 }"
              >{{ fakeData[index].drug.c3 }}人</span>
                ）</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="top-operation">
      <button>境外输入</button>
      <button>本地感染</button>
      <button>省外输入</button>
    </div>-->

    <!-- <div class="left-operation">
      <div class="item">
        <div class="btn" />
        累计输入病例数（0人）
      </div>
      <div class="item">
        <div class="btn" />
        累计输入病例数（0-99人）
      </div>
      <div class="item">
        <div class="btn" />
        累计输入病例数（100以上）
      </div>
    </div>-->
  </fragment>
</template>

<script>
// import { Scene, MarkerLayer, Marker } from "@antv/l7";
import {
  Scene,
  MarkerLayer,
  LineLayer,
  PolygonLayer,
  Marker,
  PointLayer
  // Popup
} from '@antv/l7'
// import { Popup } from "@antv/l7";
// import { ProvinceLayer } from "@antv/l7-district";
import { Mapbox } from '@antv/l7-maps'
import { Fragment } from 'vue-fragment'

let scene = null
// let markerLayer = null;
let polygonLayer = null
let lineLayer = null
let pointLayer = null

export default {
  components: {
    Fragment
  },
  props: {
    data: Array
  },
  data() {
    return {
      uid: `map${this._uid}`,
      showDetail: true,
      showLine: false,
      index: 0,
      place: [{}],
      fakeData: [
        {
          region: '高风险',
          train: 'D090 天津-广州',
          count: 1,
          status: { c1: 3, c2: 2, c3: 1 },
          drug: { c1: 0, c2: 0, c3: 0 }
        },
        {
          region: '高风险',
          train: 'D090 广州-天津',
          count: 3,
          status: { c1: 2, c2: 1, c3: 1 },
          drug: { c1: 1, c2: 1, c3: 0 }
        }
      ]
    }
  },
  watch: {
    data() {
      this.init()
    }
  },
  mounted() {
    scene = new Scene({
      id: this.uid,
      map: new Mapbox({
        style: 'blank',
        // style: "dark",
        pitch: 0,
        center: [110.097892, 33.853662],
        zoom: 5.2
      })
    })
    if (this.data) {
      this.init()
    }
  },
  methods: {
    init(code = '440000') {
      this.scene.on('loaded', () => {
        // // 地图
        // new ProvinceLayer(this.scene, {
        //   data: [],
        //   joinBy: ['adcode', 'code'],
        //   adcode: ['440000'],
        //   depth: 2,
        //   label: {
        //     field: 'NAME_CHN',
        //     textAllowOverlap: false
        //   },
        //   stroke: 'rgba(0, 249, 255, 1)',
        //   strokeWidth: 1.4,
        //   chinaNationalStroke: 'red',
        //   fill: {
        //     color: 'rgba(0, 216, 255, 0.3)'
        //   }
        // })

        const data = require(`@/assets/guangdong/${code}_full.json`)
        // 地图面
        polygonLayer = new PolygonLayer({})
          .source(data)
          .color('rgba(0, 216, 255, 0.3)')
          .active({
            color: 'red'
          })
        scene.addLayer(polygonLayer)
        // 地图线条
        lineLayer = new LineLayer({})
          .source(data)
          .color('rgba(0, 249, 255, 1)')
        scene.addLayer(lineLayer)
        // 地图标注
        pointLayer = new PointLayer({})
          .source(data)
          .shape('name', 'text')
          .size(20)
          .style({
            textAnchor: 'top-left', // 文本相对锚点的位置 center|left|right|top|bottom|top-left
            textOffset: [-40, 30], // 文本相对锚点的偏移量 [水平, 垂直]
            spacing: 2, // 字符间距
            // padding: [1, 1], // 文本包围盒 padding [水平，垂直]，影响碰撞检测结果，避免相邻文本靠的太近
            stroke: '#ffffff', // 描边颜色
            strokeWidth: 0.3, // 描边宽度
            strokeOpacity: 1.0
          })
        scene.addLayer(pointLayer)

        // 数据
        const arr = [
          { Longitude: '113.347318', Latitude: '23.242967', index: 0 },
          { Longitude: '114.058228', Latitude: '22.419421', index: 1 }
        ]
        // markrLayer 层
        const markerLayer = new MarkerLayer()
        arr.forEach(v => {
          // 添加提示
          // const popup = new Popup({
          //   offsets: [-20, 80],
          //   closeButton: false,
          //   closeOnClick: false
          // })
          //   .setLnglat([v.Longitude, v.Latitude])
          //   .setHTML(
          //     `<div class="tip">
          //         <div class="title">
          //           <div class="triangle"></div>
          //           预警信息
          //         </div>
          //     </div>`
          //   )
          // this.scene.addPopup(popup)

          // 添加散点
          const el = document.createElement('img')
          el.src =
            'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODJweCIgaGVpZ2h0PSI4MnB4IiB2aWV3Qm94PSIwIDAgODIgODIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+Cgk8ZyBmaWxsPSIjRkY4MDVCIj4KCQk8Y2lyY2xlIG9wYWNpdHk9IjAuMSIgY3g9IjI2IiBjeT0iMjYiIHI9IjI2Ij4KCQk8L2NpcmNsZT4KCQk8Y2lyY2xlIG9wYWNpdHk9IjAuMiIgY3g9IjI2IiBjeT0iMjYiIHI9IjE2Ij4KCQkJPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSIxNjsyNjsiIGJlZ2luPSIwcyIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CgkJCTxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iLjQ7MDsiIGJlZ2luPSIwcyIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CgkJPC9jaXJjbGU+CgkJPGNpcmNsZSBjeD0iMjYiIGN5PSIyNiIgcj0iOCI+CgkJCTxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iODsxNjsiIGJlZ2luPSIwcyIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CgkJCTxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iLjU7LjI7IiBiZWdpbj0iMHMiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgoJCTwvY2lyY2xlPgoJCTxjaXJjbGUgY3g9IjI2IiBjeT0iMjYiIHI9IjgiPgoJCTwvY2lyY2xlPgoJPC9nPgo8L3N2Zz4K'
          const marker = new Marker({
            element: el
          }).setLnglat({ lng: v.Longitude, lat: v.Latitude })

          // 鼠标移
          marker.on('click', e => {
            // popup.open()
            const x = e.target.clientX
            const y = e.target.clientY

            const len = Math.sqrt(
              (3520 - x) * (3520 - x) + (764 - y) * (764 - y)
            )
            this.$refs['line'].style.width = len - 50 + 'px'
            const angle = Math.atan2(764 - y, 3520 - x)
            const theta = angle * (180 / Math.PI)
            this.$refs['line'].style.transform = `rotate(${theta}deg)`

            this.index = v.index
            this.showDetail = true
            this.showLine = true
            e.target.stopPropagation()
          })

          markerLayer.addMarker(marker)
        })

        this.scene.addMarkerLayer(markerLayer)
      })
    },
    disapper() {
      this.showDetail = false
      this.showLine = false
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

// .top-operation {
//   button {
//     // width: 6rem;
//     width: getWidth(6);
//     // height: 2.06rem;
//     height: getHeight(2.06);
//     font-size: 1.5rem;
//     font-family: PingFangSC-Medium, PingFang SC;
//     font-weight: 500;
//     color: #54EBFD;
//     line-height: getHeight(2.06);
//   }
// }

.wrap {
  position: relative;
  width: 100%;
  height: 100%;
  .line {
    position: absolute;
    top: getHeight(25);
    right: getHeight(45);
    border: getWidth(0.1) solid red;
    transform-origin: right top;
    z-index: 3;
  }
  .message {
    position: absolute;
    right: getWidth(10);
    top: getHeight(10);
    z-index: 1111;
  }
  .message {
    width: getWidth(33.94);
    height: getHeight(27.19);
    background-color: rgba(#212342, 0.97);
    border-style: solid;
    border-width: getWidth(0.13);
    border-image-source: linear-gradient(0deg, #f52b7b 0%, #ff7c6e 100%);
    border-image-slice: 1;
    font-family: PingFangSC-Medium;
    font-size: $nomalSmallSize;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0rem;
    color: rgba(255, 255, 255, 0.9);
    .title {
      display: flex;
      justify-content: space-between;
      margin-left: getWidth(1.5);
      margin-top: getHeight(2.31);
      margin-bottom: getHeight(3.31);
      .titleWarn {
        margin-right: getWidth(1);
        color: #f52b7b;
      }
      span: {
        display: inline-block;
        font-size: $nomalSmallSize;
        height: getHeight(1.81);
        line-height: getHeight(1.81);
      }
      // 标题三角形
      .triangle {
        display: inline-block;
        font-size: 0;
        overflow: hidden;
        margin-right: getWidth(0.69);

        &:before {
          content: "";
          position: relative;
          display: inline-block;
          border: getHeight(0.33) solid transparent;

          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;

          border-right-width: 0;
          border-left-width: getWidth(0.53);
          border-left-color: #ffe7b3;
        }
      }
    }
    .chart-container {
      width: 100%;
      height: 70%;
      overflow-y: scroll;
      overflow-x: hidden;
      margin-left: getWidth(2.81);
      .resWarn {
        color: #f6337a;
      }
      .detail {
        height: getHeight(1.81);
        font-family: PingFangSC-Medium;
        font-size: $nomalSmallSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #ffffff;
        margin-bottom: getHeight(1);
        span:not(:last-child) {
          margin-right: getWidth(1);
        }
      }
      .item1 {
        margin-bottom: getHeight(2.13);
        > span:nth-child(1) {
          margin-bottom: getHeight(1);
        }
      }
      .item2 {
        margin-bottom: getHeight(3.13);
        > span:nth-child(1) {
          margin-bottom: getHeight(1.5);
        }
      }
      .item1,
      .item2 {
        display: flex;
        flex-direction: column;
        > span:nth-child(1) {
          display: inline-block;
          font-size: $nomalSize;
          height: getHeight(2.06);
          line-height: getHeight(2.06);
        }
      }
    }
  }
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
    // width: getWidth(7.5);
    // height: getHeight(1.88);
    // background: rgba(249, 207, 70, 0.1);

    text-align: center;
    margin-bottom: getHeight(1);
    // line-height: getHeight(1.88);
    // font500weight: 500;
    .btn {
      // display: inline-block;
      margin-right: getWidth(1);
      width: getWidth(1.75);
      height: getHeight(1.25);
      background: #00d7ec;
      opacity: 0.8;
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
    }
  }
}

// ::v-deep {
//   .l7-popup-anchor-bottom .l7-popup-tip {
//     border-top-color: #f52b7b;
//   }
//   .l7-popup-content {
//     padding: 0;
//     background-color: #212342;
//   }

//   .tip {
//     width: getWidth(33.94);
//     height: getHeight(27.19);
//     background-color: #212342;
//     border-style: solid;
//     border-width: 0.13rem;
//     border-image-source: linear-gradient(0deg, #f52b7b 0%, #ff7c6e 100%);
//     border-image-slice: 1;
//     opacity: 0.97;
//     padding: getHeight(1.5) getWidth(1.5);
//     box-sizing: border-box;

//     .title {
//       font-size: $nomalSize;
//       font-family: PingFangSC-Medium, PingFang SC;
//       font-weight: 500;
//       color: #ffffff;
//       margin-bottom: getHeight(2);
//       display: flex;
//       align-items: center;

//       // 标题三角形
//       .triangle {
//         display: inline-block;
//         font-size: 0;
//         overflow: hidden;
//         margin-right: getWidth(0.6);
//         display: flex;
//         align-items: center;

//         &:before {
//           content: "";
//           display: inline-block;
//           border: getWidth(0.3) solid transparent;

//           position: relative;
//           right: getWidth(0.1);
//           border-top-right-radius: 50%;
//           border-bottom-right-radius: 50%;

//           left: getWidth(0.1);
//           border-right-width: 0;
//           border-left-width: getWidth(0.6);
//           border-left-color: rgb(181, 181, 181);
//         }
//       }
//     }
//   }
// }
</style>
