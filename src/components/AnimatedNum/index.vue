<template>
  <v-number v-if="flag" v-model="componentNum" :speed="speed" />
  <animated-number v-else :value="componentNum" :duration="speed" :round="1" />
</template>

<script>
/**
 * 暂不确定使用哪种 翻牌器， 先封装一层
 */
import AnimatedNumber from 'animated-number-vue'
import { VNumber } from '@maxflex/v-number'

import intervel from '@/minxins/intervel'

export default {
  components: {
    AnimatedNumber,
    VNumber
  },
  mixins: [intervel],
  props: {
    num: [Number, String]
  },
  data() {
    return {
      flag: true,
      speed: 500,
      componentNum: 0
    }
  },
  watch: {
    num() {
      this.componentNum = this.num
    }
  },
  mounted() {
    this.componentNum = this.num
  },
  methods: {
    // 在 intervel  mixins 中注册的周期执行方法
    init() {
      // 定时更改数据， 让翻牌器变化
      const num = this.componentNum
      this.speed = 0
      // this.componentNum = "0".repeat(String(this.componentNum).length);
      this.componentNum = String(this.componentNum).trim(' ') + ' '
      setTimeout(() => {
        this.speed = 500
        this.componentNum = num
      }, 400)
    }
  }
}
</script>

<style lang="scss" scoped></style>
