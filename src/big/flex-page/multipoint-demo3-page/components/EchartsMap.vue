<template>
  <div class="container">
    <v-chart
      class="chart"
      :options="options"
      @click="chartClick"
      @dblclick="dbClick"
    />

    <div v-if="code !== '440000'" class="back" @click="back">
      返回
    </div>
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/geo'
import echarts from 'echarts/lib/echarts'

const guangdong = require(`@/assets/guangdong/440000_full.json`)

// let svg =
//   "image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA4NjE2MDQyOTA5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjYyNjIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTA3LjcxMiAxNTcuNjk2bS05My42OTYgMGExLjQ2NCAxLjQ2NCAwIDEgMCAxODcuMzkyIDAgMS40NjQgMS40NjQgMCAxIDAtMTg3LjM5MiAwWiIgcC1pZD0iNjI2MyIgZmlsbD0iI2Q4MWUwNiI+PC9wYXRoPjxwYXRoIGQ9Ik01NzAuNjI0IDI5Mi44NjQgNDQ4LjcwNCAyOTIuODY0Yy00MS4xNTIgMC03OC4xNDQgMTQuOTc2LTEwNC40NDggMzguOTEybDAgMTcyLjkyOCAwIDQ2Ljc4NCAwIDIxLjk1MiA5MS42NDggMCAxOS43MTIgMjgzLjg0TDU2Ny42OCA4NTcuMjhsMTkuMDcyLTI4My44NCA5Mi45OTIgMEw2NzkuNzQ0IDU2My4zMjggNjc5Ljc0NCA1MDAuMjI0IDY3OS43NDQgMzM2LjMyQzY1My4yNDggMzA5Ljc2IDYxNC4yNzIgMjkyLjg2NCA1NzAuNjI0IDI5Mi44NjR6IiBwLWlkPSI2MjY0IiBmaWxsPSIjZDgxZTA2Ij48L3BhdGg+PHBhdGggZD0iTTY1NC4yNzIgNjg1LjM3NmwwIDQ5LjQwOGMxMDMuODcyIDE1LjM2IDE3NS4yMzIgNDcuMjMyIDE3NS4yMzIgODQuMDMyIDAgNTIuMDMyLTE0Mi4xNDQgOTQuMDgtMzE3LjQ0IDk0LjA4cy0zMTcuNTA0LTQyLjA0OC0zMTcuNTA0LTk0LjA4YzAtMzYuOTI4IDcxLjg3Mi02OC44NjQgMTc2LjQ0OC04NC4yODhsMC00OS4zNDRjLTE3My42MzIgMTguODE2LTI5OC42ODggNzEuNDg4LTI5OC42ODggMTMzLjYzMkM3Mi4xOTIgODk2Ljc2OCAyNjkuMTg0IDk2MCA1MTIgOTYwYzI0Mi44MTYgMCA0MzkuNzQ0LTYzLjIzMiA0MzkuNzQ0LTE0MS4xMkM5NTEuNzQ0IDc1Ni44NjQgODI3LjI2NCA3MDQuMzg0IDY1NC4yNzIgNjg1LjM3NnoiIHAtaWQ9IjYyNjUiIGZpbGw9IiNkODFlMDYiPjwvcGF0aD48L3N2Zz4=";
// const svg =
//   "image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA4NjE2NDAzMzk3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2NTIxIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxOS45IDI2My4zYzU0LjMgMC4xIDk4LjEtNDQuMSA5OC4xLTk3LjggMC42LTU0LjItNDMuMy05Ny44LTk3LjQtOTguMS01My41LTAuMy05Ny44IDQzLjEtOTguNiA5Ni43LTAuOCA1NC44IDQzLjcgOTkuMSA5Ny45IDk5LjJ6IG0yMjMuNyAyNDcuNmwtOTMtMjA3LjFjLTMuNC03LjMtOC44LTEzLjItMTUuNi0xNi45bC0xMC44LTguN2MtMi4xLTAuNC00LjItNS41LTYuNS01LjVoLTM0bC02MS42IDc1LjUtNjMuOC03NS42aC00My4xYy0xNC41IDAtMjcuNyAxMy4zLTMzLjYgMjYuNWwtMTAxLjUgMjI2Yy0yLjEgNC42LTAuOSAxMS40IDMuMSAxNC42bDIzLjMgMTkuN2M1IDQuMiAxMi42IDMuNCAxNi40LTJsNzMuOS0xMDUuMSA2LjQgMTQ1LjItMTMuNCAzMzUuNGMtMC40IDEyLjggOS43IDIzLjYgMjIuNCAyMy42aDQzLjNjMTEuOSAwIDIxLjgtOS40IDIyLjUtMjEuM2wxNi43LTI2M2MwLjctMTEuNyAxMC40LTIwLjkgMjIuMS0yMS4yIDEwLjctMC4zIDE5LjggOC42IDIwLjMgMTkuM0w1NTAuMyA5MzVjMC42IDExLjkgMTAuNSAyMS42IDIyLjQgMjEuN2w1My42IDAuMWMxMC4xIDAgMjAuNC03LjQgMjAuNC0xNy41di0wLjdjMC0xLjcgMy43LTMuOCAzLjctNS41TDYzNC41IDU5OHYtMS4xbDMuOC0xNjEuMiA2MS44IDEwOC4xYzMuNSA2IDEwLjUgNy4zIDE1LjkgMi44bDI1LjMtMjIuMmMzLjktMy42IDQuNC05IDIuMy0xMy41eiBtMCAwIiBwLWlkPSIxNjUyMiIgZmlsbD0iI2Q4MWUwNiI+PC9wYXRoPjwvc3ZnPg==";

const peoples =
  'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA4NjE4MjA5MjA0IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE5OTY3IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTYzNy44MjMgNDgyLjk3OWM0Ny43MzctNDAuOCA3OC41NzktMTAzLjk5OSA3OC41NzktMTc1LjAxOSAwLTEyMi43Ny05MS44MDgtMjIyLjYzMy0yMDQuNjU2LTIyMi42MzMtMTEyLjg2NSAwLTIwNC42NjcgOTkuODYxLTIwNC42NjcgMjIyLjYzMyAwIDcxLjAyIDMwLjg1IDEzNC4yMTkgNzguNTggMTc1LjAxOS0xMjUuODE3IDU0LjY4NC0yMTUuMDI1IDE4OC4zNTItMjE1LjAyNSAzNDQuNDY3djc0LjIwM2MwIDIwLjUxMSAxNS4yNiAzNy4xMDcgMzQuMTExIDM3LjEwN2g2MTMuOTg0YzE4Ljg1OSAwIDM0LjExMi0xNi41OTYgMzQuMTEyLTM3LjEwN3YtNzQuMjAzYzAuMDAxLTE1Ni4xNDktODkuMjAyLTI4OS43ODMtMjE1LjAxOS0zNDQuNDY3eiBtMCAweiIgcC1pZD0iMTk5NjgiIGZpbGw9IiNkODFlMDYiPjwvcGF0aD48cGF0aCBkPSJNODQyLjU4MyA0NjkuNTc0YzI3LjkxNy0zMy40ODMgNDQuMzcyLTc3LjUwOSA0NC4zNzItMTI0LjQ3NyAwLTEwMi4zMzEtNzYuNTE2LTE4NS41NTktMTcwLjU0OC0xODUuNTU5LTIuODM3IDAtNS40NyAwLjc2My04LjI2MSAwLjkwMSAxNC43ODcgMjMuMjMyIDI2LjAxNCA0OS4yMTMgMzMuMjQxIDc3LjAzOCAwLjAxMiAwIDAuMDE2IDAuMDA2IDAuMDI4IDAuMDA2LTAuMjI5IDAuMDIyLTAuMzY4IDAuMDM3LTAuMzY4IDAuMDM3czQ2Ljg0MiAxMzUuNzc4LTQ2LjQzIDI0Mi4zMTNjMTUuNTQzIDcuNjE0IDE5Mi4wMjEgODcuMjk3IDE5MiAzNDcuNjE0IDAuMTE2IDAgMC4yMjgtMC4wMTYgMC4zNC0wLjAxNnYwLjAwN2g2OC4yMjFjMTguODUyIDAgMzQuMTEyLTE2LjU5MiAzNC4xMTItMzcuMDk5di01Ny40MDRjLTAuMDA1LTExMy4yMzktNTcuODk1LTIxMy4zMTgtMTQ2LjcwNS0yNjMuMzYyeiBtMCAweiBtLTUxNC4wNTIgMTAuMjU5Yy05My4yNjgtMTA2LjUzNC00Ni40MzUtMjQyLjMxMy00Ni40MzUtMjQyLjMxMyA3LjItMjcuODY4IDE4LjQ1My01My44NDkgMzMuMjItNzcuMDc1LTIuNzc0LTAuMTUxLTUuNDExLTAuOTA4LTguMjM3LTAuOTA4LTk0LjAzNyAwLTE3MC41NTEgODMuMjI5LTE3MC41NTEgMTg1LjU1OSAwIDQ2Ljk2MSAxNi40NiA5MC45ODkgNDQuMzY5IDEyNC40NzctODguODEgNTAuMDQ2LTE0Ni42OTggMTUwLjEyNC0xNDYuNjk4IDI2My4zNjJ2NTcuNDA0YzAgMjAuNTA3IDE1LjI1NCAzNy4wOTkgMzQuMTEyIDM3LjA5OWg2OC4yMThjLTAuMDE4LTI2MC4zMDggMTc2LjQ1NC0zMzkuOTk0IDE5Mi4wMDItMzQ3LjYwNXogbTAgMHoiIHAtaWQ9IjE5OTY5IiBmaWxsPSIjZDgxZTA2Ij48L3BhdGg+PC9zdmc+'

export default {
  components: {
    VChart
  },
  props: {
    data: Array
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          show: true
        },
        geo: {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          // zoom: 1.4,
          scaleLimit: {
            min: 1.3,
            max: 6
          },
          roam: true,
          label: {
            show: true,
            color: '#fff',
            fontSize: 18
          },
          itemStyle: {
            normal: {
              borderColor: 'RGBA(0, 249, 255, 1.00)',
              borderWidth: 1.5,
              areaColor: 'RGBA(13, 90, 134, 1.00)'
            },
            emphasis: {
              areaColor: '#2AB8FF',
              borderWidth: 0,
              color: 'green'
            }
          },
          emphasis: {
            label: {
              color: 'rgba(0, 0, 0, .65)'
            },
            itemStyle: {
              areaColor: '#603fdaa6'
            }
          },
          // nameProperty: "adcode",
          data: []
        },
        series: [
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            data: [],
            animation: true,
            encode: {
              value: 2
            },
            label: {
              show: false
            },
            itemStyle: {
              color: 'RGBA(255, 248, 136, .8)'
            },
            emphasis: {
              label: {
                show: false
              }
            }
          }
        ]
      },
      code: '440000'
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.init(this.code)
      }
    }
  },
  mounted() {
    this.init(this.code)
  },
  methods: {
    init(code = '440000', center = false) {
      // 注册geo json 数据
      const data = require(`@/assets/guangdong/${code}_full.json`)
      echarts.registerMap(code, data)
      this.options.geo.map = code
      if (center) this.options.geo.center = center

      // 检测是否需要更新地图
      // let flag = false;
      // flag = this.options.series[0].data.some(v => {
      //   return this.data.some(j => {
      //     return (
      //       j.longitude === v.data.longitude &&
      //       j.latitude === v.data.latitude &&
      //       j.warnLevel === v.daga.warnLevel
      //     );
      //   });
      // });
      // if (flag) return;

      // 清空数据
      // this.options.series[0].data = [];
      // 散点图信息

      // todo 对比经纬度、 报警等级， 少进行渲染地图
      const mapData = this.data.map(v => {
        const obj = {
          name: v.address,
          value: [v.longitude, v.latitude],
          data: v,
          tooltip: {
            textStyle: {
              fontSize: 18
            },
            formatter() {
              return `
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
    ? `<div style="color: RGBA(175, 153, 69, 1.00)">
                 <span>${v.message}</span>
               </div>`
    : ''
}
          `
            }
          }
        }

        if (String(v.warnLevel) === '4') {
          obj.symbolSize = 40
          obj.itemStyle = {
            // color: "RGBA(204, 9, 15, 0.7)"
            color: 'RGBA(236, 54, 54, 1)'
          }
        }
        if (String(v.warnLevel) === '3') {
          obj.symbolSize = 30
          obj.itemStyle = {
            color: 'RGBA(234, 85, 6, 1.00)'
          }
        }
        if (String(v.warnLevel) === '2') {
          obj.symbolSize = 20
          obj.itemStyle = {
            color: 'RGBA(255, 170, 55, 1.00)'
          }
        }
        if (String(v.warnLevel) === '1') {
          obj.symbolSize = 15
          obj.itemStyle = {
            color: 'RGBA(175, 153, 69, 1.00)'
          }
        }

        // obj.symbol = svg;
        if (v.type === 2) {
          obj.symbol = peoples
          if (String(v.warnLevel) === '4') {
            obj.symbolSize = 60
            obj.itemStyle = {
              color: 'RGBA(171, 12, 12, 1)'
            }
          }
        }

        return obj
      })
      this.options.series[0].data = mapData
    },
    chartClick(e) {
      if (e.componentSubType === 'effectScatter') {
        this.$emit('detail', e.data.data)
      }
    },
    dbClick(e) {
      const index = guangdong.features.findIndex(v => {
        return v.properties.name === e.name
      })

      if (index !== -1) {
        this.code = guangdong.features[index].properties.adcode
        this.init(this.code, guangdong.features[index].properties.center)
      }
    },
    back() {
      this.code = '440000'
      this.init(this.code)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .back {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 20px 40px;
    border-radius: 5px;
    background-color: rgba(#fff, 0.5);
    &:active {
      transform: scale(1.05);
    }
  }

  .chart {
    width: 100%;
    height: 100%;
  }
}
</style>
