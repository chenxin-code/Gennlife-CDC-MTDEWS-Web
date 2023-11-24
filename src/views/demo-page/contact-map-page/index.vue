<template>
  <div class="container">
    <div>密接图谱</div>
    <v-chart :options="options" />
  </div>
</template>

<script>
// https://echarts.apache.org/examples/zh/editor.html?c=graph-force
import ECharts from 'vue-echarts'
import 'echarts/lib/echarts'
// 引入基础库
import 'echarts/lib/component/legend' // tooltip
import 'echarts/lib/component/tooltip' // tooltip
import 'echarts/lib/chart/graph' // 自定义类型

const graph = {
  nodes: [
    {
      id: '0',
      name: 'Myriel',
      attributes: { modularity_class: 0 },
      category: '第一代',
      symbolSize: 50,
      symbol:
        'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z'
    },
    {
      id: '1',
      name: 'Myriel',
      symbolSize: 10,
      attributes: { modularity_class: 0 },
      category: '第二代'
    },
    {
      id: '2',
      name: 'Myriel',
      symbolSize: 10,
      attributes: { modularity_class: 0 },
      category: '第二代'
    },
    {
      id: '3',
      name: 'Myriel',
      symbolSize: 10,
      attributes: { modularity_class: 0 },
      category: '第二代'
    },
    {
      id: '4',
      name: 'Myriel',
      symbolSize: 10,
      attributes: { modularity_class: 0 },
      category: '密切接触者'
    },
    {
      id: '5',
      name: 'Myriel',
      symbolSize: 10,
      attributes: { modularity_class: 0 },
      category: '密切接触者'
    }
  ],
  links: [
    { source: '0', target: '1' },
    { source: '0', target: '2' },
    { source: '0', target: '3' },
    { source: '1', target: '4' },
    { source: '2', target: '5' }
  ]
}

const categories = [
  { name: '第一代', color: 'red' },
  { name: '第二代', color: 'yellow' },
  { name: '密切接触者', color: 'green' }
]

export default {
  components: {
    'v-chart': ECharts
  },
  data() {
    return {
      options: {
        color: ['red', 'yellow', 'green'],
        title: {
          text: 'Les Miserables',
          subtext: 'Default layout',
          top: 'bottom',
          left: 'right'
        },
        tooltip: {},
        legend: [
          {
            data: categories.map(function(a) {
              return a.name
            })
          }
        ],
        animation: false,
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: graph.nodes,
            links: graph.links,
            categories: categories,
            roam: true,
            label: {
              position: 'right'
            },
            force: {
              repulsion: 100
            }
          }
        ]
      }
    }
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
    height: 1000px;
  }
}
</style>
