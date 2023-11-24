<template>
  <div class="container">
    <div>重点检测人群</div>
    <v-chart :options="options" />
  </div>
</template>

<script>
// 参考demo https://www.makeapie.com/editor.html?c=xfyceghEDQ | https://echarts.apache.org/examples/zh/editor.html?c=custom-profile
import ECharts from 'vue-echarts'
import echarts from 'echarts/lib/echarts'
// 引入基础库
import 'echarts/lib/chart/bar' // 柱状图
// import "echarts/lib/component/tooltip"; // tooltip
import 'echarts/lib/component/dataZoom' // datazoom
import 'echarts/lib/chart/custom' // 自定义类型

const types = [
  '机场工作人员',
  '冷链工作人员',
  '水产工作人员',
  '境外入粤人员',
  '高风险地区入粤'
]
const series = [
  [
    [' ', '2020/11/10', 1],
    [' ', '2020/11/11', 1],
    [' ', '2020/11/12', 1],
    [' ', '2020/11/13', 1],
    [' ', '2020/11/14', 1],
    [' ', '2020/11/15', 1],
    [' ', '2020/11/16', 1],
    [' ', '2020/11/17', 1]
  ],
  [
    [' ', '2020/11/10', 1],
    [' ', '2020/11/11', 1],
    [' ', '2020/11/12', 1],
    [' ', '2020/11/13', 1],
    [' ', '2020/11/14', 1],
    [' ', '2020/11/15', 1],
    [' ', '2020/11/16', 1],
    [' ', '2020/11/17', 1]
  ],
  [
    [' ', '2020/11/10', 1],
    [' ', '2020/11/11', 1],
    [' ', '2020/11/12', 1],
    [' ', '2020/11/13', 1],
    [' ', '2020/11/14', 1],
    [' ', '2020/11/15', 1],
    [' ', '2020/11/16', 1],
    [' ', '2020/11/17', 1]
  ],
  [
    [' ', '2020/11/10', 1],
    [' ', '2020/11/11', 1],
    [' ', '2020/11/12', 1],
    [' ', '2020/11/13', 1],
    [' ', '2020/11/14', 1],
    [' ', '2020/11/15', 1],
    [' ', '2020/11/16', 1],
    [' ', '2020/11/17', 1]
  ],
  [
    [' ', '2020/11/10', 1],
    [' ', '2020/11/11', 1],
    ['异常人数：4', '2020/11/12', 4],
    [' ', '2020/11/13', 1],
    [' ', '2020/11/14', 1],
    [' ', '2020/11/15', 1],
    [' ', '2020/11/16', 1],
    ['异常人数：10', '2020/11/17', 10]
  ]
]
const xAxisData = [
  '2020/11/10',
  '2020/11/11',
  '2020/11/12',
  '2020/11/13',
  '2020/11/14',
  '2020/11/15',
  '2020/11/16',
  '2020/11/17'
]
function renderItem(params, api, data) {
  const start = api.coord([api.value(1), params.seriesName])
  const height = api.size([1, 1])[1] * 0.96
  const width = (params.coordSys.width / xAxisData.length) * 0.96

  // 截取图形
  var rectShape = echarts.graphic.clipRectByRect(
    {
      x: start[0] - width / 2,
      y: start[1] - height / 2,
      width: width,
      height: height
    },
    {
      x: params.coordSys.x,
      y: params.coordSys.y,
      width: params.coordSys.width,
      height: params.coordSys.height
    }
  )

  let fill = '#E0F2D4'
  let stroke = '#8CBB68'

  if (data[params.dataIndex][2] > 1) {
    fill = '#FDF5E6'
    stroke = '#E1BF7F'
  }

  if (data[params.dataIndex][2] > 5) {
    fill = '#F9DDDC'
    stroke = '#EB9899'
  }

  return (
    rectShape && {
      type: 'rect',
      shape: rectShape,
      style: {
        ...api.style(),

        stroke,
        fill,
        lineWidth: 1
      }
    }
  )
}

const dataSeries = types.map((item, index) => {
  return {
    type: 'custom',
    name: item,
    label: {
      show: true
    },
    encode: {
      x: [1],
      label: [0]
    },
    itemStyle: {
      color: '#4C8EC3'
    },
    data: series[index],

    renderItem: (params, api) => {
      return renderItem(params, api, series[index])
    }
  }
})
export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      options: {
        title: {
          text: '多任务24小时监测'
        },
        grid: {
          x: 100
        },
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            align: 'center'

          },
          data: xAxisData
        },
        yAxis: {
          type: 'category',
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          data: types
        },
        series: dataSeries,
        dataZoom: [
          {
            type: 'inside',
            filterMode: 'weakFilter'
          },
          {
            type: 'slider',
            show: true,
            filterMode: 'weakFilter',
            backgroundColor: '#fafafa'
          }
        ]
      }
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .echarts {
    width: 1000px;
    height: 600px;
  }
}
</style>
