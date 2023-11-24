<template>
  <div class="chartNum">
    <div class="box-item">
      <li
        v-for="(item,index) in orderNum"
        :key="index"
        :class="{'number-item': !isNaN(item), 'mark-item': isNaN(item) }"
      >
        <span v-if="!isNaN(item)">
          <i ref="numberItem">0123456789</i>
        </span>
        <span v-else class="comma">{{ item }}</span>
      </li>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    newNum: [String, Number],
    styles: Object
  },
  data() {
    return {
      orderNum: ['0'], // 默认订单总数
      num: 0
    }
  },
  watch: {
    newNum: function(val) {
      const boxItem = document.getElementsByClassName('box-item')
      const { i } = this.styles
      boxItem[i].style.cssText = 'color:' + this.styles.color + ';font:' + this.styles.font + ';'
      // console.log(val)
      this.num = val
      this.numChange(this.num)
    }
    // styles:function(val){
    //   let boxItem = document.getElementsByClassName("box-item")[0];
    //   boxItem.style.cssText = 'color:'+val.color + ';font:'+val.font+';';
    // }
  },
  mounted() {
    // console.log(this.newNum)
    const boxItem = document.getElementsByClassName('box-item')
    const { i } = this.styles
    boxItem[i].style.cssText = 'color:' + this.styles.color + ';font:' + this.styles.font + ';'
    this.num = this.newNum || 0
    this.numChange(this.num)
  },
  methods: {
    numChange(num) {
      // console.log(num)
      for (let i = 0; i < ((num + '').split('')).length; i++) {
        this.orderNum.push('0')
      }
      num = num * 1
      this.toOrderNum(num) // 这里输入数字即可调用
    },
    // 设置文字滚动
    setNumberTransform() {
      const numberItems = this.$refs.numberItem // 拿到数字的ref，计算元素数量
      const numberArr = this.orderNum.filter(item => !isNaN(item))
      // 结合CSS 对数字字符进行滚动,显示订单数量
      for (let i = 0; i < numberItems.length; i++) {
        const elem = numberItems[i]
        elem.style.transform = `translate(-50%, -${numberArr[i] * 10}%)`
      }
    },
    // 处理总订单数字
    toOrderNum(num) {
      this.num = this.num + ''
      // 把订单数变成字符串
      this.orderNum = this.num.split('') // 将其便变成数据，渲染至滚动数组
      this.setNumberTransform()
    }
  }
}
</script>
<style scoped lang='scss'>
   /*订单总量滚动数字设置*/
  .box-item {
    position: relative;
    height: 4.3rem;
    margin-left: -12px;
    // font-size: 54px;
    // font-family: ds_digi;
    // font-size: $digiFontSize;
    // font-weight: bold;
    // color: #00d7ec;
    // line-height: 41px;
    text-align: center;
    list-style: none;
    writing-mode: vertical-lr;
    text-orientation: upright;
    /*文字禁止编辑*/
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
  }
  /*滚动数字设置*/
  .number-item {
    width: 1.8rem;
    height: 4.3rem;
    background-color: #212343;
    list-style: none;
    & > span {
      position: relative;
      display: inline-block;
      // margin-right: 10px;
      width: 100%;
      height: 100%;
      writing-mode: vertical-rl;
      text-orientation: upright;
      overflow: hidden;
      & > i {
        font-style: normal;
        position: absolute;
        top: 11px;
        left: 40%;
        transform: translate(-50%,0);
        transition: transform 1s ease-in-out;
        // letter-spacing: 10px;
      }
    }
  }
  .number-item:last-child {
    margin-right: 0;
  }
</style>
