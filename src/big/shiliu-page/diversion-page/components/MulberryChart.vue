<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/sankey' // 自定义类型
import 'echarts/lib/component/tooltip'
import { uniqBy } from 'lodash'

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
        series: {
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
        data.push({ name: v })
        for (const i in this.data[v]) {
          data.push({ name: i })
          links.push({
            source: v,
            target: i,
            value: this.data[v][i]
          })
        }
      })
      data = uniqBy(data, 'name')
      this.$set(this.options.series, 'data', data)
      this.$set(this.options.series, 'links', links)
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
