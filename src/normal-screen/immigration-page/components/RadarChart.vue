<template>
  <div class="container">
    <div ref="chart" class="chart" />
    <div class="risk">
      <div class="item">
        <div class="value">{{ riskData.risk_new }}%</div>
        <div class="label">推荐方案风险值</div>
      </div>
      <div class="item">
        <div class="value">{{ riskData.risk_relative }}</div>
        <div class="label">相对风险比</div>
      </div>
      <div class="item">
        <div class="value">{{ riskData.risk_all }}%</div>
        <div class="label">统一隔离风险值</div>
      </div>
    </div>
  </div>

</template>

<script>
import echarts from 'echarts'
import 'echarts/lib/chart/bar' // 自定义类型
import 'echarts/lib/component/tooltip'

export default {
  data() {
    return {
      options: {
        tooltip: {},
        radar: {
          // shape: 'circle',
          splitNumber: 14, // 圈数
          name: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.8)',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            { name: '高风险', max: 100 },
            { name: '超高风险', max: 100 },
            { name: '低风险', max: 100 },
            { name: '中风险', max: 100 },
            { name: '高风险', max: 100 },
            { name: '超高风险', max: 100 },
            { name: '低风险', max: 100 },
            { name: '中风险', max: 100 }
          ],
          splitArea: {
            show: true,
            areaStyle: {
              color: [
                'rgba(245,43,123,0.8)',
                'rgba(245,43,123,0.8)',
                'rgba(245,43,123,0.7)',
                'rgba(245,43,123,0.7)',
                'rgba(245,43,123,0.6)',
                'rgba(245,43,123,0.6)',
                'rgba(245,43,123,0.5)',
                'rgba(245,43,123,0.5)',
                'rgba(245,43,123,0.4)',
                'rgba(245,43,123,0.4)',
                'rgba(245,43,123,0.3)',
                'rgba(245,43,123,0.2)',
                'rgba(245,43,123,0.1)',
                'rgba(245,43,123,0)'
              ]
            }
          },
          splitLine: {
            lineStyle: {
              color: [
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)',
                'rgba(245, 43, 123, 1)' // 设置网格的颜色
              ]
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(245, 43, 123, 1)'
            }
          }
        },
        series: [{
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          data: [
            {
              value: [0, 100, 50, 0, 0, 0, 100, 100],
              name: '推荐方案风险值',
              areaStyle: {
                color: [
                  'rgba(245,141,38,0.66)',
                  'rgba(255, 124, 110, 0.8)',
                  'rgba(255,108,20,0.74)'
                ]
              }
            },
            {
              value: [100, 100, 0, 0, 0, 0, 50, 100],
              name: '相对风险比',
              areaStyle: {
                color: [
                  'rgba(255, 124, 110, 0.8)'
                ]
              },
              lineStyle: {
                color: [
                  'rgba(255, 124, 110, 0.8)'
                ]
              }
            }
          ]
        }]
      },
      riskData: {
        risk_new: 3.39,
        risk_relative: 0.42,
        risk_all: 2.39
      }
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const chart = echarts.init(this.$refs.chart)
      chart.setOption(this.options)
      window.addEventListener('resize', function() {
        chart.resize()
      })
      console.log('options:', this.options)
    }
  }
}
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    .chart {
      width: 100%;
      height: 100%;
    }
    .risk {
      position: absolute;
      top: 40%;
      left: 15%;
      width: 80%;
      height: 60%;
      .item {
        float: left;
        font-family: PingFangSC-Medium, PingFang SC;
        color: white;
        width: 30%;
        text-align: center;
        .value {
          font-size: 22px;
          font-weight: 900;
        }
        .label {
          font-size: 12px;
        }
      }
    }
  }

</style>

