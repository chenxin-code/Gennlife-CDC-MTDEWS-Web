<template>
  <v-chart :options="options" class="chart" />
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/bar' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'

export default {
  components: {
    VChart
  },
  props: {
    countDate: {
      type: Array,
      default() {
        return ['11.20', '11.21', '11.22', '11.23', '11.24', '11.25', '11.26']
      }
    },
    data: {
      type: Object,
      default() {
        return {
          'total-case': [55, 66, 77, 88, 99, 11, 22],
          'total-asymptomatic': [88, 33, 55, 14, 25, 6, 14]
        }
      }
    }
  },
  data() {
    return {
      options: {
        grid: {
          // x: 40,
          y: 40,
          // x2: 20
          y2: 60
        },
        color: ['rgba(91, 241, 253, 1)', 'rgba(0, 153, 255, 1)'],
        legend: {
          orient: 'horizontal',
          top: 0,
          right: 0,
          icon: 'rect',
          textStyle: {
            color: 'rgba(255, 255, 255, 0.47)',
            fontSize: 16
          },
          data: ['本地感染-无症状', '本地感染-确诊']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器 快捷方式设置
            animation: false,
            type: 'cross'
          }
        },
        xAxis: {
          type: 'category',
          splitNumber: 0,
          data: this.countDate,
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 16
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: 16
          },
          boundaryGap: [0, '20%'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(151, 151, 151, 0.1)'
            }
          }
        },
        series: [
          {
            data: this.data['total-case'],
            type: 'bar',
            barWidth: 12,
            name: '本地感染-无症状',
            stack: 'a'
            // lineStyle: {color: '#00d7ec'}
          },
          {
            data: this.data['total-asymptomatic'],
            type: 'bar',
            barWidth: 12,
            name: '本地感染-确诊',
            stack: 'a'
            // lineStyle: {color: '#0099ff'}
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: true,
            start: 0,
            end: 60,
            fillerColor: '#191b36',
            handleIcon:
              'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDFweCIgaGVpZ2h0PSI0MnB4IiB2aWV3Qm94PSIwIDAgNDEgNDIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+R3JvdXAgMjDlpIfku708L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggZD0iTTE2LjE2NzA0MTksMzMuNTQ2MDA2OCBDMjUuMDk1ODUyMSwzMy41NDYwMDY4IDMyLjMzNDA4MzgsMjYuMDM2NDc2OSAzMi4zMzQwODM4LDE2Ljc3MzAwMzQgQzMyLjMzNDA4MzgsNy41MDk1Mjk1NyAyNS4wOTU4NTIxLDAgMTYuMTY3MDQxOSwwIEM3LjIzODIzMTM3LDAgOS4wOTQ5NDcwMmUtMTMsNy41MDk1Mjk1NyA5LjA5NDk0NzAyZS0xMywxNi43NzMwMDM0IEM5LjA5NDk0NzAyZS0xMywyNi4wMzY0NzY5IDcuMjM4MjMxMzcsMzMuNTQ2MDA2OCAxNi4xNjcwNDE5LDMzLjU0NjAwNjggWiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgICAgIDxmaWx0ZXIgeD0iLTIxLjYlIiB5PSItMTQuOSUiIHdpZHRoPSIxNDMuMyUiIGhlaWdodD0iMTQxLjclIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjIiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUdhdXNzaWFuQmx1cj4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVDb21wb3NpdGU+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjIgMCIgdHlwZT0ibWF0cml4IiBpbj0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjMwMjMyNTU4MSI+CiAgICAgICAgPGcgaWQ9IuW5v+S4nOecgSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1NzMuMDAwMDAwLCAtMTc2OC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjIxNi4wMDAwMDAsIDEyNDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTMyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NS4xMDY5MTgsIDUyNy4zMjkxOTYpIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjDlpIfku70iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2Ni4xMjk3ODQsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJPdmFsLTMtQ29weSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItMikiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlPSIjMEExODhBIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xNi4xNjcwNDE5LDEgQzIwLjM1MTIyMjQsMSAyNC4xMzc0NzcsMi43NjI1MzI1NSAyNi44Nzg4NzM5LDUuNjA2NjgwNTkgQzI5LjYzMzM0NDEsOC40NjQzOTE4NCAzMS4zMzQwODM4LDEyLjQxMzA4MTEgMzEuMzM0MDgzOCwxNi43NzMwMDM0IEMzMS4zMzQwODM4LDIxLjEzMjkyNTYgMjkuNjMzMzQ0MSwyNS4wODE2MTQ4IDI2Ljg3ODg3MzksMjcuOTM5MzI2MSBDMjQuMTM3NDc2OSwzMC43ODM0NzQyIDIwLjM1MTIyMjQsMzIuNTQ2MDA2OCAxNi4xNjcwNDE5LDMyLjU0NjAwNjggQzExLjk4Mjg2MTMsMzIuNTQ2MDA2OCA4LjE5NjYwNjg0LDMwLjc4MzQ3NDIgNS40NTUyMDk5MiwyNy45MzkzMjYyIEMyLjcwMDczOTY5LDI1LjA4MTYxNDkgMSwyMS4xMzI5MjU2IDEsMTYuNzczMDAzNCBDMSwxMi40MTMwODExIDIuNzAwNzM5NjQsOC40NjQzOTE3OCA1LjQ1NTIwOTgzLDUuNjA2NjgwNTIgQzguMTk2NjA2NzUsMi43NjI1MzI1MiAxMS45ODI4NjEzLDEgMTYuMTY3MDQxOSwxIFoiIHN0cm9rZS1saW5lam9pbj0ic3F1YXJlIiBmaWxsPSIjODg4QUE0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4xMDQ0MDEsIDEwLjQ4MzEyNykiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEuNjg0MDY2OSwwIEMyLjYxNDE1MTM2LC0xLjcwODUzNzQ1ZS0xNiAzLjM2ODEzMzgsMC43NTM5ODI0MzMgMy4zNjgxMzM4LDEuNjg0MDY2OSBMMy4zNjgxMzM4LDEyLjI5MzQzNTYgQzMuMzY4MTMzOCwxMy4yMjM1MiAyLjYxNDE1MTM2LDEzLjk3NzUwMjUgMS42ODQwNjY5LDEzLjk3NzUwMjUgQzAuNzUzOTgyNDMzLDEzLjk3NzUwMjUgLTkuMDY3MTYyNjRlLTEzLDEzLjIyMzUyIC05LjA5NDk0NzAyZS0xMywxMi4yOTM0MzU2IEwtOS4wOTQ5NDcwMmUtMTMsMS42ODQwNjY5IEMtOS4wOTM4NjU2ZS0xMywwLjc1Mzk4MjQzMyAwLjc1Mzk4MjQzMywxLjcwODUzNzQ1ZS0xNiAxLjY4NDA2NjksMCBaIiBpZD0iUmVjdGFuZ2xlLTI0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuNDQxMTczNSwwIEMxMS4zNzEyNTgsLTEuNzA4NTM3NDVlLTE2IDEyLjEyNTI0MDQsMC43NTM5ODI0MzMgMTIuMTI1MjQwNCwxLjY4NDA2NjkgTDEyLjEyNTI0MDQsMTIuMjkzNDM1NiBDMTIuMTI1MjQwNCwxMy4yMjM1MiAxMS4zNzEyNTgsMTMuOTc3NTAyNSAxMC40NDExNzM1LDEzLjk3NzUwMjUgQzkuNTExMDg5MDQsMTMuOTc3NTAyNSA4Ljc1NzEwNjYsMTMuMjIzNTIgOC43NTcxMDY2LDEyLjI5MzQzNTYgTDguNzU3MTA2NiwxLjY4NDA2NjkgQzguNzU3MTA2NiwwLjc1Mzk4MjQzMyA5LjUxMTA4OTA0LDEuNzA4NTM3NDVlLTE2IDEwLjQ0MTE3MzUsMCBaIiBpZD0iUmVjdGFuZ2xlLTI0LUNvcHkiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
          }
        ]
      }
    }
  },
  mounted() {
    // console.log(this.data)
    // console.log(this.countData)
  }
}
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 85%;
}
</style>
