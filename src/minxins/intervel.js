import { mapState } from 'vuex'

/**
 * 注册定时器任务
 */
export default {
  computed: {
    ...mapState('page', ['timeIntervalFun'])
  },
  mounted() {
    // 注册到定时函数到vuex 中
    this.$store.commit('page/CHANGE_DATA', {
      key: 'timeIntervalFun',
      value: [...this.timeIntervalFun, this.init]
    })
  }
}
