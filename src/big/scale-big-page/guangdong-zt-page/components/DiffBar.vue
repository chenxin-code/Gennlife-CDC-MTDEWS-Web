<template>
  <div class="diff-bar">
    <div v-for="(v, i) in newWeekNation" :key="i" class="bar-item">
      <div class="number" />
      <div class="name">{{ v.nation }}</div>
      <div class="bar" :style="{ width: `${v.total_case}%` }" />
      <div class="value">{{ v.total_case }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newWeekNation: {
      type: Array,
      default() {
        return [
          { nation: '美国', total_case: 220 },
          { nation: '德国', total_case: 65 },
          { nation: '印度', total_case: 58 },
          { nation: '加拿大', total_case: 47 },
          { nation: '日本', total_case: 38 },
          { nation: '印度', total_case: 58 },
          { nation: '加拿大', total_case: 47 },
          { nation: '日本', total_case: 38 }
        ]
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.diff-bar {
  width: 100%;
  height: 75%;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  overflow-y: auto;
  overflow-x: hidden;
  .bar-item {
    width: 100%;
    height: 20%;
    // flex: 1;
    display: flex;
    align-items: center;
    padding-right: getWidth(1.5);

    .number {
      width: getWidth(2);
      height: getHeight(2.06);
      background: rgba(#ffe7b3, 0.9);
      text-align: center;
      line-height: getHeight(2.06);
      border-radius: 50%;
      font-size: $nomalSize;
      font-family: PingFangSC-Medium;
      font-weight: normal;
      font-stretch: normal;
      color: rgba(28, 31, 60, 0.8);
      margin-right: getWidth(2.05);
      margin-left: getWidth(3.13);
      flex: none;
    }

    .name {
      font-size: $nomalSize;
      font-family: PingFangSC-Medium;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: rgba(255, 255, 255, 0.8);
      // margin-right: getWidth(2.13);
      width:getWidth(5);
      flex: none;
    }

    .bar {
      height: getHeight(1);
      background-image: linear-gradient(59deg, #5bf1fd 0%, #0099ff 100%);
      border-radius: getWidth(0.75);
      animation: move 2s infinite;
    }

    .value {
      height: hetHeight(2.06);
      font-family: PingFangSC-Medium;
      font-size: $nomalSize;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0rem;
      color: rgba(255, 255, 255, 0.7);
      margin-left: getWidth(1.56);
    }
  }

  @keyframes move {
    0%,
    to {
      background-position-x: left;
    }
    40% {
      background-position-x: center;
    }
    60% {
      background-position-x: right;
    }

    80% {
      background-position-x: center;
    }
    100% {
      background-position-x: left;
    }
  }
}
</style>
