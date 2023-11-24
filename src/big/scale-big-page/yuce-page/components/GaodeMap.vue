<template>
  <div class="map">
    <div :id="uid" class="amap" />

    <div class="check-layer">
      <div
        v-for="(v, i) in allLayer"
        :key="i"
        :class="{ item: true, active: v.value === currentLayer }"
        @click="switchLayer(v.value)"
      >
        {{ v.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { AMapLoader } from 'amap-js'

let addMarkerList = []
let totalMarkerList = []

// let addMarkerList = null;
// let totalMarkerList = null;

export default {
  props: {
    prints: {
      type: Array,
      default() {
        return []
      }
    },
    allPrints: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      uid: `map${this._uid}`,
      map: null,
      currentLayer: 'nomalLayer',
      allLayer: [
        { label: '平面地图', value: 'nomalLayer' },
        { label: '卫星图层', value: 'satellitelayer' }
      ]
    }
  },
  watch: {
    prints: {
      deep: true,
      handler() {
        this.initPrints()
      }
    },
    allPrints: {
      deep: true,
      handler() {
        this.initAllPrints()
      }
    }
  },
  mounted() {
    const loader = new AMapLoader({
      key: '9b7b64f8836ae137d70de0a3ba2370a4',
      version: '1.4.15',
      plugins: ['AMap.MapType']
    })
    loader.load().then(loader => {
      this.map = new window.AMap.Map(this.uid, {
        center: [113.230035, 23.159527],
        zoom: 13,
        mapStyle: 'amap://styles/grey'
        // mapStyle: "amap://styles/whitesmoke"
      })

      this.satellitelayer = [new window.AMap.TileLayer.Satellite()] // 卫星图层
      this.nomalLayer = [new window.AMap.TileLayer()] // 标准图层

      this.initPrints()
      this.initAllPrints()
    })
  },
  methods: {
    initPrints() {
      this.map.remove(addMarkerList)
      addMarkerList = this.prints.map(v => {
        return new window.AMap.Circle({
          center: [v.lon, v.lat], // 圆心位置
          radius: 10, // 圆半径
          fillColor: 'red', // 圆形填充颜色
          strokeColor: 'red', // 描边颜色
          strokeWeight: 2, // 描边宽度
          strokeOpacity: 0.7,
          fillOpacity: 0.7
        })
      })
      this.map.add(addMarkerList)

      // if (addMarkerList) addMarkerList.clear();
      // const styleObject = {
      //   // url: "//vdata.amap.com/icons/b18/1/2.png", // 图标地址
      //   url: "https://a.amap.com/jsapi_demos/static/images/mass0.png",
      //   size: new window.AMap.Size(11, 11), // 图标大小
      //   anchor: new window.AMap.Pixel(5, 5) // 图标显示位置偏移量，基准点为图标左上角
      // };
      // addMarkerList = new window.AMap.MassMarks(null, {
      //   zIndex: 5, // 海量点图层叠加的顺序
      //   zooms: [3, 19], // 在指定地图缩放级别范围内展示海量点图层
      //   style: styleObject // 设置样式对象
      // });
      // const data = this.prints.map(v => {
      //   return {
      //     lnglat: [v.lon, v.lat]
      //   };
      // });
      // addMarkerList.setData(data);
      // addMarkerList.setMap(this.map);
    },
    initAllPrints() {
      this.map.remove(totalMarkerList)
      totalMarkerList = this.allPrints
        .map(v => {
          if (
            typeof v !== 'object' ||
            !Object.prototype.hasOwnProperty.call(v, 'lon') ||
            !Object.prototype.hasOwnProperty.call(v, 'lat')
          ) {
            return false
          }

          return new window.AMap.Circle({
            center: [v.lon, v.lat], // 圆心位置
            radius: 5, // 圆半径
            fillColor: 'yellow', // 圆形填充颜色
            strokeColor: 'yellow', // 描边颜色
            strokeWeight: 2, // 描边宽度
            strokeOpacity: 0.7,
            fillOpacity: 0.7
          })
        })
        .filter(v => v)
      this.map.add(totalMarkerList)

      // if (totalMarkerList) totalMarkerList.clear();
      // const styleObject = {
      //   // url: "//vdata.amap.com/icons/b18/1/2.png", // 图标地址
      //   url: "https://a.amap.com/jsapi_demos/static/images/mass1.png",
      //   size: new window.AMap.Size(11, 11), // 图标大小
      //   anchor: new window.AMap.Pixel(5, 5) // 图标显示位置偏移量，基准点为图标左上角
      // };
      // totalMarkerList = new AMap.MassMarks(null, {
      //   zIndex: 4, // 海量点图层叠加的顺序
      //   zooms: [3, 19], // 在指定地图缩放级别范围内展示海量点图层
      //   style: styleObject // 设置样式对象
      // });

      // const data = this.allPrints
      //   .map(v => {
      //     if (
      //       typeof v !== "object" ||
      //       !Object.prototype.hasOwnProperty.call(v, "lon") ||
      //       !Object.prototype.hasOwnProperty.call(v, "lat")
      //     ) {
      //       return false;
      //     }

      //     return {
      //       lnglat: [v.lon, v.lat]
      //     };
      //   })
      //   .filter(v => v);
      // totalMarkerList.setData(data);
      // totalMarkerList.setMap(this.map);
    },
    switchLayer(key) {
      this.currentLayer = key
      this.map.setLayers(this[key])
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/big.scss";

.map {
  width: 100%;
  height: 100%;
  position: relative;

  .check-layer {
    position: absolute;
    top: getHeight(4);
    left: getWidth(59 + 10);
    display: flex;
    > .item {
      background-color: RGBA(33, 35, 64, 1);
      color: #fff;
      padding: getHeight(1) getWidth(2);
      cursor: pointer;
      user-select: none;
    }
    > .active {
      border: 1px solid RGBA(95, 164, 189, 1);
      color: RGBA(95, 164, 189, 1);
    }
  }
}
.amap {
  width: 100%;
  height: 100%;
}

::v-deep {
  .amap-logo {
    display: none !important;
  }
  .amap-copyright {
    display: none !important;
  }
}
</style>
