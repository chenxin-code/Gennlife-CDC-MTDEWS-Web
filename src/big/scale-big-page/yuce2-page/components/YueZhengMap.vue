<template>
  <div class="map">
    <div :id="uid" class="mapbox" />

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
import loadjs from 'loadjs'
import { circle } from '@turf/turf'

let map, // 地图实例
  wmtsUtil, // 底图工具实例
  wfsUtil // 地图要素工具实例
let mapLayerIds = [] // 底图 + 要素 图层
// 定义 点要素图层
// let addMarkerList, totalMarkerList;

// 数据中台模式 配置
const serviceUrls = {
  wmts: [
    { url: 'YZT1597746939964' } // 广东2018年7_17级矢量图
    // { url: "YZT1597746953278" } //广东2018年7_17级矢量注记
  ], // 示例使用，可替换为需要查看的地图服务地址，或者在页面上进行添加与删除
  wfs: [
    // {
    //   url: "YZT1597746923010", //广州市县级工作底图界线，面
    //   resultType: "XML"
    // }
  ]
}

export default {
  props: {
    casePoint: {
      type: Array,
      default() {
        return []
      }
    },
    trackPoint: {
      type: Array,
      default() {
        return []
      }
    },
    workPoint: {
      type: Array,
      default() {
        return []
      }
    },
    douliuPoint: {
      type: Array,
      default() {
        return []
      }
    },
    case2CaseLine: {
      type: Array,
      default() {
        return []
      }
    },
    case2TrackLine: {
      type: Array,
      default() {
        return []
      }
    },
    case2WorkLine: {
      type: Array,
      default() {
        return []
      }
    },
    isCase: {
      type: Boolean,
      default() {
        return true
      }
    },
    isTrack: {
      type: Boolean,
      default() {
        return true
      }
    },
    isWork: {
      type: Boolean,
      default() {
        return true
      }
    },
    isDouliu: {
      type: Boolean,
      default() {
        return true
      }
    },
    isCase2Case: {
      type: Boolean,
      default() {
        return false
      }
    },
    isCase2Track: {
      type: Boolean,
      default() {
        return false
      }
    },
    isCase2Work: {
      type: Boolean,
      default() {
        return false
      }
    },
    radius: {
      type: Number,
      default() {
        return 100
      }
    }
  },
  data() {
    return {
      uid: `map${this._uid}`,
      currentLayer: 'nomalLayer',
      allLayer: [
        {
          label: '平面地图',
          value: 'nomalLayer',
          wmts: [
            { url: 'YZT1597746954560' }, // 广东2018年7_17级矢量图
            { url: 'YZT1597746953278' } // 广东2018年7_17级矢量注记
          ]
        },
        {
          label: '卫星图层',
          value: 'satellitelayer',
          wmts: [{ url: 'YZT1597746939964' }]
        }
      ]
    }
  },
  computed: {
    // 点和线  是否显示
    pointLineShowObj() {
      const {
        isCase,
        isTrack,
        isWork,
        isDouliu,
        isCase2Case,
        isCase2Track,
        isCase2Work
      } = this
      return {
        isCase,
        isTrack,
        isWork,
        isDouliu,
        isCase2Case,
        isCase2Track,
        isCase2Work
      }
    }
  },
  watch: {
    casePoint: {
      deep: true,
      handler() {
        this.initCasePoint()
        this.initArea()
      }
    },
    trackPoint: {
      deep: true,
      handler() {
        this.initTrackPoint()
      }
    },
    workPoint: {
      deep: true,
      handler() {
        this.initWorkPoint()
        this.initArea()
      }
    },
    douliuPoint: {
      deep: true,
      handler() {
        this.initDouliuPoint()
      }
    },
    case2CaseLine: {
      deep: true,
      handler() {
        this.initCase2CaseLine()
      }
    },
    case2TrackLine: {
      deep: true,
      handler() {
        this.initCase2TrackLine()
      }
    },
    case2WorkLine: {
      deep: true,
      handler() {
        this.initCase2WorkLine()
      }
    },
    // 点和线  是否显示
    pointLineShowObj() {
      // const bool2Var = {
      //   isCase: [casePointList, casePointAreaList],
      //   isTrack: [trackPointList],
      //   isWork: [workPointList, workPointAreaList],
      //   isDouliu: [douliuPointList],
      //   isCase2Case: [case2CaseLineList],
      //   isCase2Track: [case2TrackLineList],
      //   isCase2Work: [case2WorkLineList]
      // };
      // Object.keys(bool2Var).forEach(v => {
      //   let func = "show";
      //   if (!this[v]) func = "hide";
      //   bool2Var[v].forEach(j => {
      //     j.forEach(k => {
      //       k[func]();
      //     });
      //   });
      // });
    },
    radius: {
      deep: true,
      handler() {
        this.initArea()
      }
    }
  },
  mounted() {
    // 加载js
    window.onload = () => {
      loadjs(
        [
          `${process.env.BASE_URL}mapbox/css/mapbox-gl.css`,
          `${process.env.BASE_URL}mapbox/js/mapbox-gl.js`,
          `${process.env.BASE_URL}GeoGlobeSDK/GeoGlobeJS.min.js`,
          `${process.env.BASE_URL}map/jquery-3.4.1.min.js`,
          `${process.env.BASE_URL}map/Tianditu.js`,
          `${process.env.BASE_URL}map/urlUtil.js`,
          `${process.env.BASE_URL}map/wmtsUtil.js`,
          `${process.env.BASE_URL}map/wfsUtil.js`
        ],
        'init',
        {
          async: false
        }
      )
    }

    this.init()
  },
  methods: {
    // 初始化
    init() {
      loadjs.ready('init', () => {
        wmtsUtil = window.wmtsUtil()
        wfsUtil = window.wfsUtil()

        const simple = {
          version: 8,
          sources: {},
          layers: []
        }
        const wgs84_wgs84_mapcrs = {
          topTileExtent: [-180, -270, 180, 90],
          coordtransform: 'none',
          tileSize: 256
        }
        map = new window.GeoGlobe.Map({
          mapCRS: wgs84_wgs84_mapcrs,
          style: simple,
          container: this.uid,
          zoom: 4,
          center: [112.939, 31.377],
          isIntScrollZoom: true, // 缩放级别是否为整数处理模式
          renderWorldCopies: false,
          isAttributionControl: false,
          is3Dpitching: false, // 是否到指定层级自动倾斜
          pitch3Dzoom: 16 // 自动倾斜的层级，默认16
        })

        map.on('style.load', function() {
          // //比例尺控件
          // var Sca_control = new GeoGlobe.Control.Scale({
          //   position: "bottom-right",
          //   maxWidth: 80,
          //   unit: "m"
          // });
          // map.addControl(Sca_control, Sca_control.options.position);
          // //导航控件
          // var Na_control = new GeoGlobe.Control.Navigation();
          // map.addControl(Na_control, "bottom-right");
          map.setZoom(10)
          map.setCenter([113.272753, 23.139257])
        })

        map.on('load', () => {
          // 加载街道地图
          wfsUtil.draWfsFeature(map, require('@/assets/guangdong/street.json'))

          try {
            // 加载地图服务
            this.addWmtsLayers(serviceUrls['wmts'])

            // 加载要素服务
            this.addWfsLayers(serviceUrls['wfs'])
          } catch (error) {
            console.log(error)
          }
        })
      })
    },
    // 清除图层
    clearLayers() {
      for (var i = 0; i < mapLayerIds.length; i++) {
        var layer = map.getLayer(mapLayerIds[i])
        if (layer) {
          map.removeLayer(layer.id)
          if (map.getSource(layer.source)) {
            map.removeSource(layer.source)
          }
        }
      }
      mapLayerIds = []
    },
    // 加载地图服务
    addWmtsLayers(wmtsConfigs = []) {
      for (let i = 0; i < wmtsConfigs.length; i++) {
        const wmtsConfig = wmtsConfigs[i]
        const layerOptions = wmtsUtil.getMatchServiceOption(wmtsConfig.url)
        const layerInf = wmtsUtil.createLayer(wmtsConfig.url, layerOptions[0])
        map.addSource(layerInf.source.id, layerInf.source)
        map.addLayer(layerInf.layer)
        mapLayerIds.push(layerInf.layer.id)
      }
    },
    // 加载要素服务
    addWfsLayers(wfsConfigs = []) {
      for (let i = 0; i < wfsConfigs.length; i++) {
        const wfsConfig = wfsConfigs[i]
        wfsUtil.getLayer(wfsConfig.url, (url, layerWfsOpt) => {
          const featureType = layerWfsOpt[0].name
          const queryObj = wfsUtil.initwfsQueryObj(
            url,
            featureType,
            wfsConfig.resultType
          )
          wfsUtil.queryWFS(queryObj, result => {
            const layerId = wfsUtil.draWfsFeature(map, result.geojson)
            mapLayerIds.push(layerId)
          })
        })
      }
    },
    // 切换地图
    switchLayer(key) {
      this.currentLayer = key
      const find = this.allLayer.find(v => {
        return v.value === key
      })
      if (find) {
        this.clearLayers()
        this.addWmtsLayers(find['wmts'])
      }
    },
    // 初始化病例点
    initCasePoint() {
      console.log(123, this.casePoint)
      if (map.getLayer('casePointList')) { map.removeLayerAndSource('casePointList') }
      map.addLayer({
        id: 'casePointList',
        type: 'fill',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: this.casePoint.map(v => {
              return circle(
                [v.permanent_longitude, v.permanent_latitude],
                (1 / 1.609344 / 100) * 5, // 50米
                {
                  steps: 36,
                  units: 'miles'
                }
              )
            })
          }
        },
        paint: {
          'fill-color': 'red',
          'fill-opacity': 1
        }
      })
    },
    // 初始化轨迹点
    initTrackPoint() {},
    // 初始化工作地点
    initWorkPoint() {},
    // 初始化逗留
    initDouliuPoint() {},
    // 初始化 病例间连线
    initCase2CaseLine() {},
    // 初始化 病例 轨迹连线
    initCase2TrackLine() {},
    // 初始化 病例 工作地点连线
    initCase2WorkLine() {},
    initArea() {}
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
.mapbox {
  width: 100%;
  height: 100%;
}
</style>
