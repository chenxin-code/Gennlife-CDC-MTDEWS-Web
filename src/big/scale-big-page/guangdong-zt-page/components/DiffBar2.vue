<template>
  <div class="diff-bar">
    <div
      v-for="(v, i) in pageConfig"
      :key="i"
      class="bar-item"
    >
      <div class="top">
        <div class="number" />
        <div class="name">{{ v }}</div>
      </div>
      <div class="bottom">
        <div class="bar" :style="{ width: `${newWeekData[i]*0.87}%` }" />
        <div class="value">{{ newWeekData[i] }}<span v-if="i === 'sumRatio'">%</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    newWeekData: {
      type: Object,
      default() {
        return {
          newCase: 30,
          sumCase: 25,
          newAsymptomatic: 20,
          sumRatio: 40
        }
      }
    }
  },
  data() {
    return {
      pageConfig: {
        newCase: '新增境外输入个案',
        sumCase: '新增确诊个案',
        newAsymptomatic: '新增无症状感染者',
        sumRatio: '新增境外输入环比'
      }
    }
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
  justify-content: space-around;

  .bar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: getWidth(2.19);

    .top {
      display: flex;
      align-items: center;
      width: 100%;

      .number {
        width: getWidth(0.75);
        height: getHeight(0.75);
        background-color: #ffe7b3;
        border-radius: 50%;
        flex: none;
      }

      .name {
        height: getHeight(2.06);
        line-height: getHeight(2.06);
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: #ffffff;
        margin-left: getWidth(2.25);
        flex: none;
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      width: 100%;
      padding-left: getWidth(0.88);
      margin-top: getHeight(0.63);
      position: relative;

      .bar {
        margin-left: getWidth(2.25);
        height: getHeight(0.63);
        background: linear-gradient(135deg, #ffea00, #ffd900, #ff9900, #ff7700) 0/400%
        400%;
        border-radius: getWidth(0.31);
        animation: move 2s infinite;
      }
      .value {
        height: getHeight(1.81);
        font-family: Helvetica;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: rgba(255, 255, 255, 0.8);
        position: absolute;
        right: getWidth(2.63);
      }
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
