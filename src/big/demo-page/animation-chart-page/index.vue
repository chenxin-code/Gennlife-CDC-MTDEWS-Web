<template>
  <div class="container">
    <div class="item">
      <line-chart ref="line" />
    </div>
    <div class="item">
      <bar-chart ref="bar" />
    </div>
    <div class="item">
      <animation />
    </div>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import Animation from './components/Animation'

export default {
  components: {
    LineChart,
    BarChart,
    Animation
  },
  data() {
    return {}
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs.div)
    })

    this.$emit

    let timer = null
    // 大屏动态事件
    const moveFunc = () => {
      if (timer) return
      timer = setInterval(() => {
        // this.$refs.line.chartRandom();
        // this.$refs.bar.chartRandom();
      }, 5000)
    }
    moveFunc()

    // 鼠标移动， 停止移动
    document.onmousemove = () => {
      clearInterval(timer)
      timer = null
      setTimeout(() => {
        moveFunc()
      }, 5000)
    }

    // 销毁动态事件
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
      timer = null
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
.item {
  width: 500px;
  height: 400px;
}
</style>
