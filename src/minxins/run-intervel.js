import { mapState } from 'vuex'

/**
 * 执行定时器任务
 */
export default {
  computed: {
    ...mapState('page', ['timeIntervalFun'])
  },
  mounted() {
    // 执行全部任务
    let timer = setInterval(() => {
      this.timeIntervalFun.forEach(v => {
        v()
      })
    }, 10000)

    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer)
      timer = null
    })
  }
}
