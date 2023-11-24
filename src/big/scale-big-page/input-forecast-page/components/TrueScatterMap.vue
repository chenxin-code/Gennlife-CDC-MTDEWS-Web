<template>
  <div class="container">
    <div :id="uid" />
    <div v-if="days" class="left-top">
      新冠肺炎确诊病例各国境外输入风险评估等级分布图
      <div class="time">（截止于{{ days }}）</div>
    </div>

    <div class="bottom">
      <div
        v-for="(v, i) in ['低风险', '中风险', '高风险', '超高风险']"
        :key="i"
        class="nav-item"
      >
        <!-- 四个div分别为四个角上的div -->
        <div class="horn">
          <div class="lt" />
          <div class="rt" />
          <div class="rb" />
          <div class="lb" />
        </div>
        <div class="label">{{ v }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Scene, PolygonLayer, LineLayer, Popup } from '@antv/l7'
import { Mapbox } from '@antv/l7-maps'

export default {
  props: {
    country: String,
    data: Array,
    days: String
  },
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
        let find = this.data.find(v => {
          return v.name === this.country
        })
        // let data = this.data
        if (!find) {
          find = {}
          find.risk = 0
          find.classgrade = '低风险'
          find.lhl = 0
        }
        this.polygonLayer.color('centroid*name', (centroid, name) => {
          if (name === this.country) {
            this.lngLat = centroid
            return 'red'
          }
          let count = this.data.find(v => {
            return v.name === name
          })
          if (!count) {
            count = {}
            count.risk = 0
            count.classgrade = '低风险'
            count.lhl = 0
          }
          if (count.classgrade === '超高风险') {
            return 'rgba(245,43,123 , .6)'
          } else if (count.classgrade === '高风险') {
            return 'rgba(249,207,70, .6)'
          } else if (count.classgrade === '中风险') {
            return 'rgba(196,181,12,.6)'
          } else {
            return 'rgba(41, 170, 225, .6)'
          }
        })
        this.scene.render()

        const popup = new Popup({
          offsets: [0, 0],
          closeButton: false
        }).setLnglat(this.lngLat).setHTML(`<div>
              <div class="title">${this.country}输入风险评估</div>
              <div class="content">
              <div class="item">入粤风险值：${find.risk}</div>
              <div class="item">入粤风险等级：${find.classgrade}</div>
              <div class="item">两周罹患率：${find.lhl}‱</div>
              </div>
              </div>`)
        this.scene.addPopup(popup)
      }
    },
    country() {
      let find = this.data.find(v => {
        return v.name === this.country
      })
      if (!find) {
        find = {}
        find.risk = 0
        find.classgrade = '低风险'
        find.lhl = 0
      }

      this.polygonLayer.color('centroid*name', (centroid, name) => {
        if (name === this.country) {
          this.lngLat = centroid
          return 'red'
        }
        let count = this.data.find(v => {
          return v.name === name
        })
        if (!count) {
          count = {}
          count.risk = 0
          count.classgrade = '低风险'
          count.lhl = 0
        }
        if (count.classgrade === '超高风险') {
          return 'rgba(245,43,123 , .6)'
        } else if (count.classgrade === '高风险') {
          return 'rgba(249,207,70, .6)'
        } else if (count.classgrade === '中风险') {
          return 'rgba(196,181,12,.6)'
        } else {
          return 'rgba(41, 170, 225, .6)'
        }
        // return 'rgba(41, 170, 225, .6)'
      })
      this.scene.render()

      const popup = new Popup({
        offsets: [0, 0],
        closeButton: false
      }).setLnglat(this.lngLat).setHTML(`<div>
              <div class="title">${this.country}输入风险评估</div>
              <div class="content">
              <div class="item">入粤风险值：${find.risk}</div>
              <div class="item">入粤风险等级：${find.classgrade}</div>
              <div class="item">两周罹患率：${find.lhl}‱</div>
              </div>
              </div>`)
      this.scene.addPopup(popup)
    }
  },
  mounted() {
    this.scene = new Scene({
      id: this.uid,
      map: new Mapbox({
        center: [1.0032, 46.698022],
        // center: [-13.516867, 16.78437],
        pitch: 0,
        style: 'blank',
        zoom: 2
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
          let count = this.data.find(v => {
            return v.name === name
          })
          if (!count) {
            count = {}
            count.risk = 0
            count.classgrade = '低风险'
            count.lhl = 0
          }
          if (count.classgrade === '超高风险') {
            return ' rgba(253, 0, 0, .6)'
          } else if (count.classgrade === '高风险') {
            return 'rgba(255, 90, 0, .6)'
          } else if (count.classgrade === '中风险') {
            return 'rgba(249, 207, 70, .6)'
          } else {
            return 'rgba(41, 170, 225, .6)'
          }
          // return 'rgba(41, 170, 225, .6)'
        })
        .active({
          color: 'red'
        })
      // 设置 hover 事件
      this.polygonLayer.on('mousemove', e => {
        let find = this.data.find(v => {
          return v.name === e.feature.properties.name
        })
        if (!find) {
          find = {}
          find.risk = 0
          find.classgrade = '低风险'
          find.lhl = 0
        }
        const popup = new Popup({
          offsets: [0, 0],
          closeButton: false
        }).setLnglat(e.lngLat).setHTML(`<div>
              <div class="title">${e.feature.properties.name}输入风险评估</div>
              <div class="content">
              <div class="item">入粤风险值：${find.risk}</div>
              <div class="item">入粤风险等级：${find.classgrade}</div>
              <div class="item">两周罹患率：${find.lhl}‱</div>
              </div>
              </div>`)
        this.scene.addPopup(popup)
      })
      // 设置 click 事件
      this.polygonLayer.on('click', e => {
        this.lngLat = e.lngLat
        let find = this.data.find(v => {
          return v.name === e.feature.properties.name
        })
        if (!find) {
          find = {}
          find.risk = 0
          find.classgrade = '低风险'
          find.lhl = 0
        }
        const popup = new Popup({
          offsets: [0, 0],
          closeButton: false
        }).setLnglat(e.lngLat).setHTML(`<div>
              <div class="title">${e.feature.properties.name}输入风险评估</div>
              <div class="content">
              <div class="item">入粤风险值：${find.risk}</div>
              <div class="item">入粤风险等级：${find.classgrade}</div>
              <div class="item">两周罹患率：${find.lhl}‱</div>
              </div>
              </div>`)
        this.scene.addPopup(popup)
        this.polygonLayer.color('name', name => {
          if (name === e.feature.properties.name) return 'red'
          // return 'rgba(41, 170, 225, .6)'
          let count = this.data.find(v => {
            return v.name === name
          })
          if (!count) {
            count = {}
            count.risk = 0
            count.classgrade = '低风险'
            count.lhl = 0
          }
          if (count.classgrade === '超高风险') {
            return 'rgba(245,43,123 , .6)'
          } else if (count.classgrade === '高风险') {
            return 'rgba(249,207,70, .6)'
          } else if (count.classgrade === '中风险') {
            return 'rgba(196,181,12,.6)'
          } else {
            return 'rgba(41, 170, 225, .6)'
          }
        })
        this.$emit('click', e.feature.properties.name)
      })
      this.scene.addLayer(this.polygonLayer)

      const lineLayer = new LineLayer({})
        .source(data)
        .color('RGBA(85, 186, 242, 1.00)')
      this.scene.addLayer(lineLayer)
    })
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

.container {
  width: 100%;
  height: 100%;

  position: relative;

  .left-top {
    font-family: PingFangSC-Medium;
    font-size: $itemTitleSize;
    font-weight: normal;
    font-stretch: normal;
    color: rgba(255, 255, 255, 0.8);
    position: absolute;
    top: getHeight(2);
    left: getWidth(2);
  }
}

.bottom {
  position: absolute;
  bottom: getHeight(5);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

$borderSize: 2px;
$unBgColor: rgba(41, 170, 225, 1);

.nav-item + .nav-item {
  margin-left: getWidth(1);
}

.nav-item {
  width: getWidth(14);
  height: getHeight(3.75);
  text-align: center;
  line-height: getHeight(3.75);
  font-size: $nomalSize;

  background: linear-gradient(
    239deg,
    rgba($unBgColor, 0.19) 0%,
    rgba($unBgColor, 0.19) 100%
  );
  position: relative;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  .label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: $unBgColor;
    -webkit-background-clip: text;
  }

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $unBgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $unBgColor;
      border-left: $borderSize solid $unBgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $unBgColor;
      border-right: $borderSize solid $unBgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $unBgColor;
      border-right: $borderSize solid $unBgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $unBgColor;
      border-left: $borderSize solid $unBgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
}

$bgColor: rgba(249, 207, 70, 1);
.nav-item:nth-child(2) {
  background: linear-gradient(
    239deg,
    rgba($bgColor, 0.19) 0%,
    rgba($bgColor, 0.19) 100%
  );

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $bgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
  .label {
    color: $bgColor;
  }
}

$bgColor: rgba(255, 90, 0, 1);
.nav-item:nth-child(3) {
  background: linear-gradient(
    239deg,
    rgba($bgColor, 0.19) 0%,
    rgba($bgColor, 0.19) 100%
  );

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $bgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
  .label {
    color: $bgColor;
  }
}

$bgColor: rgba(253, 0, 0, 1);
.nav-item:nth-child(4) {
  background: linear-gradient(
    239deg,
    rgba($bgColor, 0.19) 0%,
    rgba($bgColor, 0.19) 100%
  );

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $bgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
  .label {
    color: $bgColor;
  }
}

// 隐藏logo
::v-deep .l7-ctrl-logo {
  display: none;
}
</style>
