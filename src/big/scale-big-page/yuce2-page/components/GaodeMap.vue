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

let casePointList = []
let trackPointList = []
let workPointList = []
let douliuPointList = []
let case2CaseLineList = []
let case2TrackLineList = []
let case2WorkLineList = []
let casePointAreaList = []
let workPointAreaList = []

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
      map: null,
      currentLayer: 'nomalLayer',
      allLayer: [
        { label: '平面地图', value: 'nomalLayer' },
        { label: '卫星图层', value: 'satellitelayer' }
      ],
      infoWindow: null
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
      const bool2Var = {
        isCase: [casePointList, casePointAreaList],
        isTrack: [trackPointList],
        isWork: [workPointList, workPointAreaList],
        isDouliu: [douliuPointList],
        isCase2Case: [case2CaseLineList],
        isCase2Track: [case2TrackLineList],
        isCase2Work: [case2WorkLineList]
      }
      Object.keys(bool2Var).forEach(v => {
        let func = 'show'
        if (!this[v]) func = 'hide'
        bool2Var[v].forEach(j => {
          j.forEach(k => {
            k[func]()
          })
        })
      })
    },
    radius: {
      deep: true,
      handler() {
        this.initArea()
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

      this.infoWindow = new window.AMap.InfoWindow({
        offset: new window.AMap.Pixel(0, -30)
      })
    })
  },
  methods: {
    switchLayer(key) {
      this.currentLayer = key
      this.map.setLayers(this[key])
    },
    // 初始化病例点
    initCasePoint() {
      this.map.remove(casePointList)
      casePointList = this.casePoint.map(v => {
        const mass = new window.AMap.Circle({
          center: [v.permanent_longitude, v.permanent_latitude], // 圆心位置
          radius: 50, // 圆半径
          fillColor: 'red', // 圆形填充颜色
          strokeColor: 'red', // 描边颜色
          strokeWeight: 2, // 描边宽度
          zIndex: 10
        })
        mass.on('mouseover', e => {
          this.infoWindow.setContent(` <div class="item">
                  <span class="label">姓名</span>
                  <span class="value">${v.name}</span>
                </div>
                <div class="item">
                  <span class="label">发病日期</span>
                  <span class="value">${v.onset_date}</span>
                </div>
                <div class="item">
                  <span class="label">常住地址</span>
                  <span class="value">${v.permanent_address}</span>
                </div>
                 <div class="item">
                  <span class="label">工作地址</span>
                  <span class="value">${
  v.work_address.length > 0 ? v.work_address[0].address : ''
}</span>
                </div>
                 <div class="item">
                  <span class="label">病例备注</span>
                  <span class="value">${v.remark}</span>
                </div>`)
          this.infoWindow.open(this.map, [
            v.permanent_longitude,
            v.permanent_latitude
          ])
        })

        return mass
      })
      this.map.add(casePointList)
    },
    // 初始化轨迹点
    initTrackPoint() {
      if (trackPointList.length > 0) this.map.remove(trackPointList)
      trackPointList = this.trackPoint.map(v => {
        const mass = new window.AMap.Circle({
          center: [v.longitude, v.latitude], // 圆心位置
          radius: 50, // 圆半径
          fillColor: 'blue', // 圆形填充颜色
          strokeColor: 'blue', // 描边颜色
          strokeWeight: 2, // 描边宽度
          zIndex: 10
        })
        mass.on('mouseover', e => {
          this.infoWindow.setContent(`<div class="item">
                  <span class="label">姓名</span>
                  <span class="value">${v.name}</span>
                </div>
                <div class="item">
                  <span class="label">发病日期</span>
                  <span class="value">${v.onset_date}</span>
                </div>
                <div class="item">
                  <span class="label">常住地址</span>
                  <span class="value">${v.address}</span>
                </div>
                 <div class="item">
                  <span class="label">轨迹地址</span>
                  <span class="value">${v.guiji_address}</span>
                </div>
                 <div class="item">
                  <span class="label">轨迹备注</span>
                  <span class="value">${v.guiji_remark}</span>
                </div>`)
          this.infoWindow.open(this.map, [v.longitude, v.latitude])
        })

        return mass
      })
      this.map.add(trackPointList)
    },
    // 初始化工作地点
    initWorkPoint() {
      if (workPointList.length > 0) this.map.remove(workPointList)
      workPointList = this.workPoint.map(v => {
        const mass = new window.AMap.Circle({
          center: [v.longitude, v.latitude], // 圆心位置
          radius: 50, // 圆半径
          fillColor: 'yellow', // 圆形填充颜色
          strokeColor: 'yellow', // 描边颜色
          strokeWeight: 2, // 描边宽度
          zIndex: 10
        })
        mass.on('mouseover', e => {
          this.infoWindow.setContent(`<div class="item">
                  <span class="label">姓名</span>
                  <span class="value">${v.name}</span>
                </div>
                <div class="item">
                  <span class="label">发病日期</span>
                  <span class="value">${v.onset_date}</span>
                </div>
                <div class="item">
                  <span class="label">常住地址</span>
                  <span class="value">${v.address}</span>
                </div>
                 <div class="item">
                  <span class="label">工作地址</span>
                  <span class="value">${v.work_work_address}</span>
                </div>
                 <div class="item">
                  <span class="label">工作备注</span>
                  <span class="value">${v.work_remark}</span>
                </div>`)
          this.infoWindow.open(this.map, [v.longitude, v.latitude])
        })

        return mass
      })
      this.map.add(workPointList)
    },
    // 初始化逗留
    initDouliuPoint() {
      if (douliuPointList.length > 0) this.map.remove(douliuPointList)
      douliuPointList = this.douliuPoint.map(v => {
        const mass = new window.AMap.Circle({
          center: [v.longitude, v.latitude], // 圆心位置
          radius: 50, // 圆半径
          fillColor: 'green', // 圆形填充颜色
          strokeColor: 'green', // 描边颜色
          strokeWeight: 2, // 描边宽度
          zIndex: 10
        })
        mass.on('mouseover', e => {
          this.infoWindow.setContent(`<div class="item">
                  <span class="label">地址</span>
                  <span class="value">${v.address}</span>
                </div>
                <div class="item">
                  <span class="label">报告日期</span>
                  <span class="value">${v.report_date}</span>
                </div>
                 <div class="item">
                  <span class="label">工作备注</span>
                  <span class="value">${v.remark}</span>
                </div>`)
          this.infoWindow.open(this.map, [v.longitude, v.latitude])
        })

        return mass
      })
      this.map.add(douliuPointList)
    },
    // 初始化 病例间连线
    initCase2CaseLine() {
      if (case2CaseLineList.length > 0) this.map.remove(case2CaseLineList)
      case2CaseLineList = this.case2CaseLine.map(v => {
        return new window.AMap.Polyline({
          path: v.coords,
          borderWeight: 2, // 线条宽度，默认为 1
          strokeColor: 'red', // 线条颜色
          lineJoin: 'round' // 折线拐点连接处样式
        })
      })
      if (!this.isCase2Case) {
        case2CaseLineList.forEach(v => {
          v.hide()
        })
      }
      this.map.add(case2CaseLineList)
    },
    // 初始化 病例 轨迹连线
    initCase2TrackLine() {
      if (case2TrackLineList.length > 0) this.map.remove(case2TrackLineList)
      case2TrackLineList = this.case2TrackLine.map(v => {
        return new window.AMap.Polyline({
          path: v.coords,
          borderWeight: 2, // 线条宽度，默认为 1
          strokeColor: 'blue', // 线条颜色
          lineJoin: 'round' // 折线拐点连接处样式
        })
      })
      if (!this.isCase2Track) {
        case2TrackLineList.forEach(v => {
          v.hide()
        })
      }
      this.map.add(case2TrackLineList)
    },
    // 初始化 病例 工作地点连线
    initCase2WorkLine() {
      if (case2WorkLineList.length > 0) this.map.remove(case2WorkLineList)
      case2WorkLineList = this.case2WorkLine.map(v => {
        return new window.AMap.Polyline({
          path: v.coords,
          borderWeight: 2, // 线条宽度，默认为 1
          strokeColor: 'yellow', // 线条颜色
          lineJoin: 'round' // 折线拐点连接处样式
        })
      })
      if (!this.isCase2Work) {
        case2WorkLineList.forEach(v => {
          v.hide()
        })
      }
      this.map.add(case2WorkLineList)
    },
    initArea() {
      if (casePointAreaList.length > 0) this.map.remove(casePointAreaList)
      casePointAreaList = this.casePoint.map(v => {
        const mass = new window.AMap.Circle({
          center: [v.permanent_longitude, v.permanent_latitude], // 圆心位置
          radius: this.radius, // 圆半径
          fillColor: 'red', // 圆形填充颜色
          strokeColor: 'red', // 描边颜色
          strokeWeight: 2, // 描边宽度
          fillOpacity: 0.5,
          zIndex: 9
        })
        mass.on('mouseover', e => {
          this.infoWindow.setContent(`<div class="item">
                  <span class="label">人数</span>
                  <span class="value">${v[`pop_${this.radius}`]}</span>
                </div>
               `)
          this.infoWindow.open(this.map, [
            v.permanent_longitude,
            v.permanent_latitude
          ])
        })

        return mass
      })
      this.map.add(casePointAreaList)
      if (workPointAreaList.length > 0) this.map.remove(workPointAreaList)
      workPointAreaList = this.workPoint.map(v => {
        const mass = new window.AMap.Circle({
          center: [v.longitude, v.latitude], // 圆心位置
          radius: this.radius, // 圆半径
          fillColor: 'yellow', // 圆形填充颜色
          strokeColor: 'yellow', // 描边颜色
          strokeWeight: 2, // 描边宽度
          fillOpacity: 0.5,
          zIndex: 9
        })
        mass.on('mouseover', e => {
          this.infoWindow.setContent(`<div class="item">
                  <span class="label">人数</span>
                  <span class="value">${v[`pop_${this.radius}`]}</span>
                </div>
               `)
          this.infoWindow.open(this.map, [v.longitude, v.latitude])
        })

        return mass
      })
      this.map.add(workPointAreaList)
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
