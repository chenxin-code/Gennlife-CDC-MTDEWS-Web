<template>
  <div class="container">
    <div :id="uid" />
  </div>
</template>

<script>
import {
  Scene,
  MarkerLayer,
  LineLayer,
  PolygonLayer,
  Marker,
  PointLayer,
  Popup
} from '@antv/l7'
// import { ProvinceLayer } from "@antv/l7-district";
import { Mapbox } from '@antv/l7-maps'

const errorIcon =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODJweCIgaGVpZ2h0PSI4MnB4IiB2aWV3Qm94PSIwIDAgODIgODIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+Cgk8ZyBmaWxsPSJSR0JBKDI0NiwgNTcsIDEyMCwgMS4wMCkiPgoJCTxjaXJjbGUgb3BhY2l0eT0iMC4xIiBjeD0iMjYiIGN5PSIyNiIgcj0iMjYiPgoJCTwvY2lyY2xlPgoJCTxjaXJjbGUgb3BhY2l0eT0iMC4yIiBjeD0iMjYiIGN5PSIyNiIgcj0iMTYiPgoJCQk8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9IjE2OzI2OyIgYmVnaW49IjBzIiBkdXI9IjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KCQkJPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIuNDswOyIgYmVnaW49IjBzIiBkdXI9IjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KCQk8L2NpcmNsZT4KCQk8Y2lyY2xlIGN4PSIyNiIgY3k9IjI2IiByPSI4Ij4KCQkJPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSI4OzE2OyIgYmVnaW49IjBzIiBkdXI9IjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KCQkJPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIuNTsuMjsiIGJlZ2luPSIwcyIgZHVyPSIycyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiIC8+CgkJPC9jaXJjbGU+CgkJPGNpcmNsZSBjeD0iMjYiIGN5PSIyNiIgcj0iOCI+CgkJPC9jaXJjbGU+Cgk8L2c+Cjwvc3ZnPgo='
const warningIcon =
  'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iODJweCIgaGVpZ2h0PSI4MnB4IiB2aWV3Qm94PSIwIDAgODIgODIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+Cgk8ZyBmaWxsPSJSR0JBKDI1NSwgMjI0LCA2LCAxLjAwKSI+CgkJPGNpcmNsZSBvcGFjaXR5PSIwLjEiIGN4PSIyNiIgY3k9IjI2IiByPSIyNiI+CgkJPC9jaXJjbGU+CgkJPGNpcmNsZSBvcGFjaXR5PSIwLjIiIGN4PSIyNiIgY3k9IjI2IiByPSIxNiI+CgkJCTxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9InIiIHZhbHVlcz0iMTY7MjY7IiBiZWdpbj0iMHMiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgoJCQk8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9Ii40OzA7IiBiZWdpbj0iMHMiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgoJCTwvY2lyY2xlPgoJCTxjaXJjbGUgY3g9IjI2IiBjeT0iMjYiIHI9IjgiPgoJCQk8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJyIiB2YWx1ZXM9Ijg7MTY7IiBiZWdpbj0iMHMiIGR1cj0iMnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgoJCQk8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9Ii41Oy4yOyIgYmVnaW49IjBzIiBkdXI9IjJzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KCQk8L2NpcmNsZT4KCQk8Y2lyY2xlIGN4PSIyNiIgY3k9IjI2IiByPSI4Ij4KCQk8L2NpcmNsZT4KCTwvZz4KPC9zdmc+Cg=='

let scene = null
let markerLayer = null
let polygonLayer = null
let lineLayer = null
let pointLayer = null

export default {
  props: {
    data: Array
  },
  data() {
    return {
      uid: `map${this._uid}`
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        // setTimeout(() => {
        //   markerLayer.clear();
        //   scene.removeMarkerLayer(markerLayer);
        // }, 5000);

        this.initMark()
        // this.init();
      }
    }
  },
  mounted() {
    scene = new Scene({
      id: this.uid,
      map: new Mapbox({
        style: 'blank',
        // style: "dark",
        pitch: 0,
        center: [113.347318, 23.242967],
        // zoom: 5.2
        zoom: 8
      })
    })
    markerLayer = new MarkerLayer({})
    if (this.data) {
      this.init()
    }
  },
  methods: {
    init(code = '440000') {
      scene.on('loaded', () => {
        // todo 下钻
        const data = require(`@/assets/guangdong/${code}_full.json`)
        // 地图面
        polygonLayer = new PolygonLayer({})
          .source(data)
          .color('rgba(0, 216, 255, 0.3)')
          .active({
            color: 'red'
          })
        // 单击
        scene.on('click', e => {
          console.log(e)
        })
        // 双击
        scene.on('dblclick', e => {
          console.log(e, e.feature)
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

        this.initMark()
      })
    },
    initMark() {
      if (markerLayer.getMarkers()) {
        document.querySelectorAll('.l7-marker').forEach(v => {
          v.remove()
        })
        markerLayer.getMarkers().forEach(v => {
          markerLayer.removeMarker(v)
        })
        // markerLayer.clear();
        // scene.removeLayer(markerLayer);
      }
      // markrLayer 层
      this.data.forEach((v, i) => {
        // data1.forEach((v, i) => {
        if (!v) return

        const popup = new Popup({
          offsets: [0, 0],
          closeButton: false
        })
          .setLnglat({
            lng: v.longitude,
            lat: v.latitude
          })
          .setHTML(
            `
        ${
  v.placeName
    ? `<div>
                 <span>${v.placeName}</span>
               </div>`
    : ''
}
          ${
  v.address
    ? `
              <div>
                <span>地址</span>
                <span>${v.address}</span>
              </div>
              `
    : ''
}
           ${
  v.organizationName
    ? `<div>
                 <span>所属疾控：</span>
                 <span>${v.organizationName}</span>
               </div>`
    : ''
}
              ${
  v.message
    ? `<div>
                 <span>${v.message}</span>
               </div>`
    : ''
}
            
          `
          )
        scene.addPopup(popup)
        popup.close()

        // 添加散点
        const el = document.createElement('img')
        // console.log(v);

        // todo 根据 类型判断
        el.src = warningIcon

        if (String(v.warnLevel) === '3' || String(v.warnLevel) === '4') {
          el.src = errorIcon
          el.style.width = '200px'
          el.style.height = '200px'
        }
        const marker = new Marker({
          element: el,
          offsets: [0, 0]
        }).setLnglat({ lng: v.longitude, lat: v.latitude })

        // 鼠标移入
        marker.on('mouseover', e => {
          popup.open()
        })
        // 鼠标移入
        marker.on('mouseout', e => {
          popup.close()
        })
        // click
        marker.on('click', e => {
          this.$emit('detail')
        })

        markerLayer.addMarker(marker)
      })
      scene.addMarkerLayer(markerLayer)
      scene.render()
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

.container {
  width: 100%;
  height: 100%;
}
</style>
