<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/sankey' // 自定义类型
import 'echarts/lib/component/tooltip'
import { uniqBy, maxBy, minBy, range } from 'lodash'

export default {
  components: {
    VChart
  },
  props: {
    data: Object
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove'
        },
        series: {
          label: {
            color: '#fff'
          },
          itemStyle: {
            borderWidth: 1,
            borderColor: '#aaa'
          },
          lineStyle: {
            color: 'source',
            curveness: 0.5
          },
          type: 'sankey',
          layout: 'none',
          focusNodeAdjacency: 'allEdges',
          data: [],
          links: []
        }
      }
    }
  },
  watch: {
    data() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const links = []
      let data = []

      Object.keys(this.data).forEach(v => {
        let num = 0
        for (const i in this.data[v]) {
          data.push({
            name: i,
            itemStyle: {
              color: 'RGBA(255, 168, 59, 1.00)'
            }
          })
          if (this.data[v][i] > 0) {
            let place
            if (v === 'baiyun_airport') {
              place = '白云机场'
            } else if (v === 'shenzhen_bay') {
              place = '深圳湾'
            } else if (v === 'baoan_ariport') {
              place = '宝安机场'
            } else if (v === 'bridge') {
              place = '珠港澳大桥'
            } else {
              place = v
            }
            links.push({
              source: place,
              target: i,
              value: this.data[v][i]
            })
            num += this.data[v][i]
          }
        }
        data.push({ name: v, value: num })
      })
      data = uniqBy(data, 'name')

      const max = maxBy(data, 'value')
      const min = minBy(data, 'value')

      data = data.map(v => {
        if (v.value) {
          v.itemStyle = {
            color: this.getColor(
              Number(min.value),
              Number(max.value),
              Number(v.value)
            )
          }
          if (v.name === 'baiyun_airport') {
            v.name = '白云机场'
          } else if (v.name === 'shenzhen_bay') {
            v.name = '深圳湾'
          } else if (v.name === 'baoan_ariport') {
            v.name = '宝安机场'
          } else if (v.name === 'bridge') {
            v.name = '珠港澳大桥'
          }
        }
        return v
      })

      this.$set(this.options.series, 'data', data)
      this.$set(this.options.series, 'links', links)
    },
    getColor(min, max, val) {
      // 设置颜色段
      const colors = [
        'RGBA(142, 37, 19, 1.00)',
        'RGBA(255, 168, 59, 1.00)',
        'RGBA(47, 198, 253, 1.00)',
        ''
      ]

      const addStep = (Number(max) - Number(min)) / colors.length
      const step = range(0, colors.length).map(v => (v + 1) * addStep + min)
      let index = 0
      for (let i = 0; i < step.length - 1; i++) {
        if (step[i] >= val && val < step[i + 1]) {
          index = i
        }
      }
      return colors[index]
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
