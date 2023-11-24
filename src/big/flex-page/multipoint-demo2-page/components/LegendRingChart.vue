<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pie' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'

// var len = 0
export default {
  components: {
    VChart
  },
  props: {
    importCountry: {
      type: Array,
      default: () => {
        return [{ value: 0 }, { value: 100 }]
      }
    },
    color: {
      type: Array,
      default: () => {
        return ['#f32b7b', 'rgba(255,255,255,.2)']
      }
    }
  },
  data() {
    return {
      options: {
        title: [
          {
            text: `${Math.ceil(
              (this.importCountry[0].value /
                (this.importCountry[0].value + this.importCountry[1].value)) *
                100
            )}%`,
            left: '48%',
            top: '43%',
            textAlign: 'center',
            textStyle: {
              fontSize: '16',
              color: '#fff',
              textAlign: 'center',
              fontWeight: '600',
              lineHeight: 16
            }
          }
        ],
        tooltip: {},
        series: [
          {
            color: this.color,
            type: 'pie',
            radius: ['50%', '80%'],
            center: ['50%', '50%'],
            label: { show: false },
            data: this.importCountry
          }
        ]
      }
    }
  },
  watch: {
    importCountry() {
      this.$set(
        this.options.title[0],
        'text',
        `${Math.ceil(
          (this.importCountry[0].value /
            (this.importCountry[0].value + this.importCountry[1].value)) *
            100
        )}%`
      )
      this.$set(this.options.series[0], 'data', this.importCountry)
    }
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 100%;
  // left:50px;
}
</style>
