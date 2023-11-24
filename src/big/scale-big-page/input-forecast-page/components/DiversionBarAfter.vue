<template>
  <div class="container">
    <div v-show="false" class="btns">
      <input id="rd1" v-model="picked" type="radio" value="hotel">
      <input id="rd2" v-model="picked" type="radio" value="hospital">
      <label for="rd1">酒店</label>
      <label for="rd2">医院</label>
    </div>
    <div class="bar-chart">
      <template v-if="picked === 'hotel'">
        <v-chart :options="option1" theme="macarons" class="chart" />
      </template>
      <template v-else-if="picked === 'hospital'">
        <v-chart :options="option2" theme="macarons" class="chart" />
      </template>
    </div>
  </div>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/bar' // 自定义类型
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/dataZoom'
import 'echarts/lib/component/legend'
import 'echarts/theme/macarons'
import { max } from 'lodash'
import eventBus from '@/eventBus'
export default {
  components: {
    VChart
  },
  props: {
    citys: {
      type: Array,
      default: () => {
        return []
      }
    },
    distribute_after: {
      type: Object,
      default: () => {
        return {
          hotel: {
            hotel_zzglrys: [],
            hotel_krnrs: [],
            hotel_distribute: [],
            hotel_residue: []
          },
          hospital: {
            hospital_sick: [],
            hospital_total: [],
            hospital_native: [],
            hospital_out_province: [],
            hospital_overseas: [],
            hospital_other: []
          }
        }
      }
    },
    hotel_threshold: {
      type: Number,
      default: () => {
        return 0
      }
    },
    hospital_threshold: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
      picked: 'hotel',
      option1: {
        legend: {
          orient: 'horizontal',
          // top: 0,
          // right: 200,
          icon: 'rect',
          // itemGap: 66,
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          data: ['酒店已用容量', '酒店总容量', '分流数量', '剩余容量', '预警阈值']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器 快捷方式设置
            animation: false,
            type: 'cross'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.citys,
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
          {
            type: 'category',
            data: this.citys,
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          {
            type: 'category',
            data: this.citys,
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 16
            },
            // boundaryGap: [0, "30%"],
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
          {
            type: 'value',
            // max: 7000, // 需要对应网格一柱图的最大值，比例才能相等
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            // max: 7000, // 需要对应网格一柱图的最大值，比例才能相等
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '酒店已用容量',
            stack: 'a',
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '分流数量',
            stack: 'a',
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '剩余容量',
            stack: 'a',
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            name: '预警阈值', // 借助透明层把覆盖层顶上去
            type: 'bar',
            stack: 'B',
            barWidth: 30,
            xAxisIndex: 1,
            yAxisIndex: 0,
            itemStyle: {
              barBorderColor: 'rgba(233, 57, 57, 0.5)',
              color: 'rgba(233, 57, 57, 0.5)',
              barBorderRadius: 5
              // opacity: 0.5
            },
            data: [],
            z: 0
          },
          {
            data: [],
            type: 'bar',
            barWidth: 30,
            name: '酒店总容量',
            stack: 'c',
            xAxisIndex: 2,
            yAxisIndex: 0,
            itemStyle: {
              barBorderColor: 'rgba(181, 181, 181, 0.5)',
              color: 'rgba(181, 181, 181, 0.5)',
              barBorderRadius: 5
            },
            z: 1
          }
        ],
        dataZoom: {
          type: 'slider',
          show: true,
          xAxisIndex: [0, 1, 2],
          fillerColor: '#191b36',
          handleIcon:
            'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDFweCIgaGVpZ2h0PSI0MnB4IiB2aWV3Qm94PSIwIDAgNDEgNDIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+R3JvdXAgMjDlpIfku708L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggZD0iTTE2LjE2NzA0MTksMzMuNTQ2MDA2OCBDMjUuMDk1ODUyMSwzMy41NDYwMDY4IDMyLjMzNDA4MzgsMjYuMDM2NDc2OSAzMi4zMzQwODM4LDE2Ljc3MzAwMzQgQzMyLjMzNDA4MzgsNy41MDk1Mjk1NyAyNS4wOTU4NTIxLDAgMTYuMTY3MDQxOSwwIEM3LjIzODIzMTM3LDAgOS4wOTQ5NDcwMmUtMTMsNy41MDk1Mjk1NyA5LjA5NDk0NzAyZS0xMywxNi43NzMwMDM0IEM5LjA5NDk0NzAyZS0xMywyNi4wMzY0NzY5IDcuMjM4MjMxMzcsMzMuNTQ2MDA2OCAxNi4xNjcwNDE5LDMzLjU0NjAwNjggWiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgICAgIDxmaWx0ZXIgeD0iLTIxLjYlIiB5PSItMTQuOSUiIHdpZHRoPSIxNDMuMyUiIGhlaWdodD0iMTQxLjclIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjIiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUdhdXNzaWFuQmx1cj4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVDb21wb3NpdGU+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjIgMCIgdHlwZT0ibWF0cml4IiBpbj0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjMwMjMyNTU4MSI+CiAgICAgICAgPGcgaWQ9IuW5v+S4nOecgSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1NzMuMDAwMDAwLCAtMTc2OC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjIxNi4wMDAwMDAsIDEyNDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTMyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NS4xMDY5MTgsIDUyNy4zMjkxOTYpIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjDlpIfku70iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2Ni4xMjk3ODQsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJPdmFsLTMtQ29weSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItMikiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlPSIjMEExODhBIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xNi4xNjcwNDE5LDEgQzIwLjM1MTIyMjQsMSAyNC4xMzc0NzcsMi43NjI1MzI1NSAyNi44Nzg4NzM5LDUuNjA2NjgwNTkgQzI5LjYzMzM0NDEsOC40NjQzOTE4NCAzMS4zMzQwODM4LDEyLjQxMzA4MTEgMzEuMzM0MDgzOCwxNi43NzMwMDM0IEMzMS4zMzQwODM4LDIxLjEzMjkyNTYgMjkuNjMzMzQ0MSwyNS4wODE2MTQ4IDI2Ljg3ODg3MzksMjcuOTM5MzI2MSBDMjQuMTM3NDc2OSwzMC43ODM0NzQyIDIwLjM1MTIyMjQsMzIuNTQ2MDA2OCAxNi4xNjcwNDE5LDMyLjU0NjAwNjggQzExLjk4Mjg2MTMsMzIuNTQ2MDA2OCA4LjE5NjYwNjg0LDMwLjc4MzQ3NDIgNS40NTUyMDk5MiwyNy45MzkzMjYyIEMyLjcwMDczOTY5LDI1LjA4MTYxNDkgMSwyMS4xMzI5MjU2IDEsMTYuNzczMDAzNCBDMSwxMi40MTMwODExIDIuNzAwNzM5NjQsOC40NjQzOTE3OCA1LjQ1NTIwOTgzLDUuNjA2NjgwNTIgQzguMTk2NjA2NzUsMi43NjI1MzI1MiAxMS45ODI4NjEzLDEgMTYuMTY3MDQxOSwxIFoiIHN0cm9rZS1saW5lam9pbj0ic3F1YXJlIiBmaWxsPSIjODg4QUE0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4xMDQ0MDEsIDEwLjQ4MzEyNykiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEuNjg0MDY2OSwwIEMyLjYxNDE1MTM2LC0xLjcwODUzNzQ1ZS0xNiAzLjM2ODEzMzgsMC43NTM5ODI0MzMgMy4zNjgxMzM4LDEuNjg0MDY2OSBMMy4zNjgxMzM4LDEyLjI5MzQzNTYgQzMuMzY4MTMzOCwxMy4yMjM1MiAyLjYxNDE1MTM2LDEzLjk3NzUwMjUgMS42ODQwNjY5LDEzLjk3NzUwMjUgQzAuNzUzOTgyNDMzLDEzLjk3NzUwMjUgLTkuMDY3MTYyNjRlLTEzLDEzLjIyMzUyIC05LjA5NDk0NzAyZS0xMywxMi4yOTM0MzU2IEwtOS4wOTQ5NDcwMmUtMTMsMS42ODQwNjY5IEMtOS4wOTM4NjU2ZS0xMywwLjc1Mzk4MjQzMyAwLjc1Mzk4MjQzMywxLjcwODUzNzQ1ZS0xNiAxLjY4NDA2NjksMCBaIiBpZD0iUmVjdGFuZ2xlLTI0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuNDQxMTczNSwwIEMxMS4zNzEyNTgsLTEuNzA4NTM3NDVlLTE2IDEyLjEyNTI0MDQsMC43NTM5ODI0MzMgMTIuMTI1MjQwNCwxLjY4NDA2NjkgTDEyLjEyNTI0MDQsMTIuMjkzNDM1NiBDMTIuMTI1MjQwNCwxMy4yMjM1MiAxMS4zNzEyNTgsMTMuOTc3NTAyNSAxMC40NDExNzM1LDEzLjk3NzUwMjUgQzkuNTExMDg5MDQsMTMuOTc3NTAyNSA4Ljc1NzEwNjYsMTMuMjIzNTIgOC43NTcxMDY2LDEyLjI5MzQzNTYgTDguNzU3MTA2NiwxLjY4NDA2NjkgQzguNzU3MTA2NiwwLjc1Mzk4MjQzMyA5LjUxMTA4OTA0LDEuNzA4NTM3NDVlLTE2IDEwLjQ0MTE3MzUsMCBaIiBpZD0iUmVjdGFuZ2xlLTI0LUNvcHkiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
        }
      },
      option2: {
        legend: {
          orient: 'horizontal',
          // top: 0,
          // right: 200,
          icon: 'rect',
          textStyle: {
            color: '#fff',
            fontSize: 16
          },
          data: [
            '医院已用容量',
            '医院总容量',
            '本地人员预估未来占用容量',
            '省外人员预估未来占用容量',
            '分流人员预估未来占用容量',
            '其他传染病占用容量',
            '医院剩余容量',
            '预警阈值'
          ]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器 快捷方式设置
            animation: false,
            type: 'cross'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.citys,
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
          {
            type: 'category',
            data: this.citys,
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          },
          {
            type: 'category',
            data: this.citys,
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: 16
            },
            // boundaryGap: [0, "30%"],
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
          {
            type: 'value',
            // max: 25, // 需要对应网格一柱图的最大值，比例才能相等
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            // max: 25, // 需要对应网格一柱图的最大值，比例才能相等
            axisLabel: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '医院已用容量',
            stack: 'a',
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '本地人员预估未来占用容量',
            stack: 'a',
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '省外人员预估未来占用容量',
            stack: 'a',
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '分流人员预估未来占用容量',
            stack: 'a',
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '其他传染病占用容量',
            stack: 'a',
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            data: [],
            type: 'bar',
            barWidth: 12,
            name: '医院剩余容量',
            stack: 'a',
            xAxisIndex: 0,
            yAxisIndex: 0
          },
          {
            name: '预警阈值', // 借助透明层把覆盖层顶上去
            type: 'bar',
            stack: 'B',
            barWidth: 30,
            xAxisIndex: 1,
            yAxisIndex: 0,
            itemStyle: {
              barBorderColor: 'rgba(233, 57, 57, 0.5)',
              color: 'rgba(233, 57, 57, 0.5)',
              barBorderRadius: 5
              // opacity: 0.5
            },
            data: [],
            z: 0
          },
          {
            name: '医院总容量', // 借助透明层把覆盖层顶上去
            type: 'bar',
            stack: 'c',
            barWidth: 30,
            xAxisIndex: 2,
            yAxisIndex: 0,
            itemStyle: {
              barBorderColor: 'rgba(181, 181, 181, 0.5)',
              color: 'rgba(181, 181, 181, 0.5)',
              barBorderRadius: 5
            },
            data: [],
            z: 1
          }
        ],
        dataZoom: {
          type: 'slider',
          show: true,
          xAxisIndex: [0, 1, 2],
          fillerColor: '#191b36',
          handleIcon:
            'image://data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDFweCIgaGVpZ2h0PSI0MnB4IiB2aWV3Qm94PSIwIDAgNDEgNDIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+R3JvdXAgMjDlpIfku708L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPHBhdGggZD0iTTE2LjE2NzA0MTksMzMuNTQ2MDA2OCBDMjUuMDk1ODUyMSwzMy41NDYwMDY4IDMyLjMzNDA4MzgsMjYuMDM2NDc2OSAzMi4zMzQwODM4LDE2Ljc3MzAwMzQgQzMyLjMzNDA4MzgsNy41MDk1Mjk1NyAyNS4wOTU4NTIxLDAgMTYuMTY3MDQxOSwwIEM3LjIzODIzMTM3LDAgOS4wOTQ5NDcwMmUtMTMsNy41MDk1Mjk1NyA5LjA5NDk0NzAyZS0xMywxNi43NzMwMDM0IEM5LjA5NDk0NzAyZS0xMywyNi4wMzY0NzY5IDcuMjM4MjMxMzcsMzMuNTQ2MDA2OCAxNi4xNjcwNDE5LDMzLjU0NjAwNjggWiIgaWQ9InBhdGgtMSI+PC9wYXRoPgogICAgICAgIDxmaWx0ZXIgeD0iLTIxLjYlIiB5PSItMTQuOSUiIHdpZHRoPSIxNDMuMyUiIGhlaWdodD0iMTQxLjclIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJmaWx0ZXItMiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeD0iMCIgZHk9IjIiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dPZmZzZXRPdXRlcjEiPjwvZmVPZmZzZXQ+CiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjIiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiIHJlc3VsdD0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUdhdXNzaWFuQmx1cj4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVDb21wb3NpdGU+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwICAgMCAwIDAgMCAwICAgMCAwIDAgMCAwICAwIDAgMCAwLjIgMCIgdHlwZT0ibWF0cml4IiBpbj0ic2hhZG93Qmx1ck91dGVyMSI+PC9mZUNvbG9yTWF0cml4PgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIwLjMwMjMyNTU4MSI+CiAgICAgICAgPGcgaWQ9IuW5v+S4nOecgSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTI1NzMuMDAwMDAwLCAtMTc2OC4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC0xNCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjIxNi4wMDAwMDAsIDEyNDMuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTMyIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NS4xMDY5MTgsIDUyNy4zMjkxOTYpIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iR3JvdXAtMjDlpIfku70iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI2Ni4xMjk3ODQsIDAuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxnIGlkPSJPdmFsLTMtQ29weSI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dXNlIGZpbGw9ImJsYWNrIiBmaWxsLW9wYWNpdHk9IjEiIGZpbHRlcj0idXJsKCNmaWx0ZXItMikiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggc3Ryb2tlPSIjMEExODhBIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xNi4xNjcwNDE5LDEgQzIwLjM1MTIyMjQsMSAyNC4xMzc0NzcsMi43NjI1MzI1NSAyNi44Nzg4NzM5LDUuNjA2NjgwNTkgQzI5LjYzMzM0NDEsOC40NjQzOTE4NCAzMS4zMzQwODM4LDEyLjQxMzA4MTEgMzEuMzM0MDgzOCwxNi43NzMwMDM0IEMzMS4zMzQwODM4LDIxLjEzMjkyNTYgMjkuNjMzMzQ0MSwyNS4wODE2MTQ4IDI2Ljg3ODg3MzksMjcuOTM5MzI2MSBDMjQuMTM3NDc2OSwzMC43ODM0NzQyIDIwLjM1MTIyMjQsMzIuNTQ2MDA2OCAxNi4xNjcwNDE5LDMyLjU0NjAwNjggQzExLjk4Mjg2MTMsMzIuNTQ2MDA2OCA4LjE5NjYwNjg0LDMwLjc4MzQ3NDIgNS40NTUyMDk5MiwyNy45MzkzMjYyIEMyLjcwMDczOTY5LDI1LjA4MTYxNDkgMSwyMS4xMzI5MjU2IDEsMTYuNzczMDAzNCBDMSwxMi40MTMwODExIDIuNzAwNzM5NjQsOC40NjQzOTE3OCA1LjQ1NTIwOTgzLDUuNjA2NjgwNTIgQzguMTk2NjA2NzUsMi43NjI1MzI1MiAxMS45ODI4NjEzLDEgMTYuMTY3MDQxOSwxIFoiIHN0cm9rZS1saW5lam9pbj0ic3F1YXJlIiBmaWxsPSIjODg4QUE0IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTI1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMC4xMDQ0MDEsIDEwLjQ4MzEyNykiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEuNjg0MDY2OSwwIEMyLjYxNDE1MTM2LC0xLjcwODUzNzQ1ZS0xNiAzLjM2ODEzMzgsMC43NTM5ODI0MzMgMy4zNjgxMzM4LDEuNjg0MDY2OSBMMy4zNjgxMzM4LDEyLjI5MzQzNTYgQzMuMzY4MTMzOCwxMy4yMjM1MiAyLjYxNDE1MTM2LDEzLjk3NzUwMjUgMS42ODQwNjY5LDEzLjk3NzUwMjUgQzAuNzUzOTgyNDMzLDEzLjk3NzUwMjUgLTkuMDY3MTYyNjRlLTEzLDEzLjIyMzUyIC05LjA5NDk0NzAyZS0xMywxMi4yOTM0MzU2IEwtOS4wOTQ5NDcwMmUtMTMsMS42ODQwNjY5IEMtOS4wOTM4NjU2ZS0xMywwLjc1Mzk4MjQzMyAwLjc1Mzk4MjQzMywxLjcwODUzNzQ1ZS0xNiAxLjY4NDA2NjksMCBaIiBpZD0iUmVjdGFuZ2xlLTI0Ij48L3BhdGg+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTAuNDQxMTczNSwwIEMxMS4zNzEyNTgsLTEuNzA4NTM3NDVlLTE2IDEyLjEyNTI0MDQsMC43NTM5ODI0MzMgMTIuMTI1MjQwNCwxLjY4NDA2NjkgTDEyLjEyNTI0MDQsMTIuMjkzNDM1NiBDMTIuMTI1MjQwNCwxMy4yMjM1MiAxMS4zNzEyNTgsMTMuOTc3NTAyNSAxMC40NDExNzM1LDEzLjk3NzUwMjUgQzkuNTExMDg5MDQsMTMuOTc3NTAyNSA4Ljc1NzEwNjYsMTMuMjIzNTIgOC43NTcxMDY2LDEyLjI5MzQzNTYgTDguNzU3MTA2NiwxLjY4NDA2NjkgQzguNzU3MTA2NiwwLjc1Mzk4MjQzMyA5LjUxMTA4OTA0LDEuNzA4NTM3NDVlLTE2IDEwLjQ0MTE3MzUsMCBaIiBpZD0iUmVjdGFuZ2xlLTI0LUNvcHkiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+'
        }
      }
    }
  },
  watch: {
    citys: {
      deep: true,
      handler: function() {
        this.init()
      }
    },
    picked() {
      eventBus.$emit('changePicked', this.picked)
      this.init()
    }
  },
  mounted() {
    this.init()
    eventBus.$on('changePicked', picked => {
      this.picked = picked
    })
  },
  methods: {
    init() {
      const threshold = {
        hotel: this.hotel_threshold,
        hospital: this.hospital_threshold
      }
      if (this.picked === 'hotel') {
        const maxNum = max(this.distribute_after[this.picked]['hotel_krnrs'])
        this.$set(this.option1.yAxis[1], 'max', maxNum)
        this.$set(this.option1.yAxis[2], 'max', maxNum)

        this.$set(this.option1.xAxis[0], 'data', this.citys)
        this.$set(this.option1.xAxis[1], 'data', this.citys)
        this.$set(this.option1.xAxis[2], 'data', this.citys)
        this.$set(
          this.option1.series[0],
          'data',
          this.distribute_after[this.picked]['hotel_zzglrys']
        )
        this.$set(
          this.option1.series[1],
          'data',
          this.distribute_after[this.picked]['hotel_distribute']
        )
        this.$set(
          this.option1.series[2],
          'data',
          this.distribute_after[this.picked]['hotel_residue']
        )
        this.$set(
          this.option1.series[3],
          'data',
          this.distribute_after[this.picked]['hotel_krnrs'].map(v =>
            (v * threshold[this.picked]).toFixed(0)
          )
        )
        this.$set(
          this.option1.series[4],
          'data',
          this.distribute_after[this.picked]['hotel_krnrs']
        )
      } else if (this.picked === 'hospital') {
        const maxNum = max(this.distribute_after[this.picked]['hospital_total'])
        this.$set(this.option1.yAxis[1], 'max', maxNum)
        this.$set(this.option1.yAxis[2], 'max', maxNum)

        this.$set(this.option2.xAxis[0], 'data', this.citys)
        this.$set(this.option2.xAxis[1], 'data', this.citys)
        this.$set(this.option2.xAxis[2], 'data', this.citys)
        this.$set(
          this.option2.series[0],
          'data',
          this.distribute_after[this.picked]['hospital_sick']
        )
        this.$set(
          this.option2.series[1],
          'data',
          this.distribute_after[this.picked]['hospital_native']
        )
        this.$set(
          this.option2.series[2],
          'data',
          this.distribute_after[this.picked]['hospital_out_province']
        )
        this.$set(
          this.option2.series[3],
          'data',
          this.distribute_after[this.picked]['hospital_overseas']
        )
        this.$set(
          this.option2.series[4],
          'data',
          this.distribute_after[this.picked]['hospital_other']
        )
        this.$set(
          this.option2.series[5],
          'data',
          this.distribute_after[this.picked]['hospital_residue']
        )
        this.$set(
          this.option2.series[6],
          'data',
          this.distribute_after[this.picked]['hospital_total'].map(v =>
            (v * threshold[this.picked]).toFixed(0)
          )
        )
        this.$set(
          this.option2.series[7],
          'data',
          this.distribute_after[this.picked]['hospital_total']
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .btns {
    flex: 1;
    input[type="radio"] {
      display: none;
    }
    label {
      display: inline-block;
      width: getWidth(5);
      height: getHeight(2.6);
      text-align: center;
      line-height: getHeight(2.6);
      background-color: #212342;
      border: solid getWidth(0.13) rgba(255, 255, 255, 0.3);
      margin-right: getWidth(1.63);
      font-family: PingFangSC-Medium;
      font-size: $nomalSize;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }
    input:checked:nth-of-type(1) ~ label:nth-of-type(1) {
      border: solid 0.13rem #54ebfd;
      opacity: 0.5;
      color: #54ebfd;
    }
    input:checked:nth-of-type(2) ~ label:nth-of-type(2) {
      border: solid 0.13rem #54ebfd;
      opacity: 0.5;
      color: #54ebfd;
    }
  }
  .bar-chart {
    flex: 9;
    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
