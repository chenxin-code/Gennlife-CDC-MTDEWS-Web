<template>
  <v-chart :options="options" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/pie' // 自定义类型
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  components: {
    VChart
  },
  props: {
    data: Array,
    color: Array
  },
  data() {
    return {
      // options: {
      //   backgroundColor: "#212342",
      //   color: ["RGBA(255, 234, 0, 1.00)", "RGBA(50, 53, 89, 1.00)"],
      //   grid: {
      //     x: 0,
      //     y: 0,
      //     x2: 0,
      //     y2: 0
      //   },
      //   title: [
      //     {
      //       text:
      //         this.data[1].value === 0
      //           ? "0%"
      //           : Math.ceil(
      //               Number(
      //                 Number(this.data[0].value) /
      //                   Number(this.data[1].value).toFixed(2)
      //               ) * 100
      //             ) + "%",
      //       left: "50%",
      //       top: "center",
      //       textAlign: "center",
      //       textStyle: {
      //         fontFamily: "Arial-Black, Arial",
      //         fontSize: 24,
      //         color: "#ffea00",
      //         textAlign: "center",
      //         fontWeight: "900"
      //       }
      //     }
      //   ],
      //   legend: {
      //     show: false
      //   },
      //   tooltip: {},
      //   series: [
      //     {
      //       name: "访问来源",
      //       type: "pie",
      //       hoverOffset: 2,
      //       radius: ["40%", "70%"],
      //       center: ["50%", "50%"],
      //       label: {
      //         show: false,
      //         position: "center"
      //       },
      //       emphasis: {
      //         label: {
      //           show: true,
      //           fontSize: "30",
      //           fontWeight: "bold"
      //         }
      //       },
      //       labelLine: {
      //         show: false
      //       },
      //       minAngle: 20,
      //       data: []
      //     }
      //   ]
      // }

      options: {
        backgroundColor: '#212342',
        color: ['#fff', 'rgba(50, 53, 89, 1)'],
        grid: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 0
        },
        title: [
          {
            text: 'aaa',
            left: '45%',
            top: 'center',
            textAlign: 'center',
            textStyle: {
              fontFamily: 'Arial-Black, Arial',
              fontSize: '12',
              color: '#ffea00',
              textAlign: 'center',
              fontWeight: '900'
              // lineHeight: 16
            }
          }
        ],
        legend: {
          show: false
        },
        tooltip: {},
        series: [
          {
            itemStyle: {
              normal: {
                borderColor: '#212342',
                borderWidth: 5
              }
            },
            type: 'pie',
            hoverOffset: 2,
            radius: ['50%', '98%'],
            center: ['50%', '50%'],
            label: {
              show: false
            },
            minAngle: 20,
            data: [
              { name: '11', value: 11 },
              { name: '22', value: 100 }
            ]
          }
        ]
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.$set(this.options.series[0], 'data', this.data)
      this.$set(this.options, 'color', this.color)
    }
  }
}
</script>

<style lang="scss" scoped></style>
