<template>
  <div class="diff-bar">
    <div class="content">
      <div v-for="(v, i) in caseNationWeek" :key="i" class="bar-item">
        <div class="number">{{ i + 1 }}</div>
        <div class="name">{{ v.nation }}</div>
        <div class="bar" :style="{ width: `${v.total_case}%` }" />
        <div class="value">{{ v.total_case }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    caseNationWeek: {
      type: Array,
      default() {
        return []
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
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;

  .content {
    width: 100%;
    height: 100%;

    .bar-item {
      width: 100%;
      height: 20%;
      display: flex;
      align-items: center;
      margin-left: getWidth(2.19);

      .number {
        width: getWidth(2);
        height: getHeight(2.06);
        line-height: getHeight(2.06);
        text-align: center;
        opacity: 0.8;
        background-color: #ffe7b3;
        border-radius: 50%;
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: rgba(28, 31, 60, 0.8);
        flex: none;
      }

      .name {
        width: getWidth(6);
        height: getHeight(2.06);
        line-height: getHeight(2.06);
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        text-align: justify;
        // letter-spacing: 0;
        color: #ffffff;
        margin-left: getWidth(2.25);
        flex: none;
      }

      .bar {
        margin-left: getWidth(2.25);
        height: getHeight(1);
        border-radius: getWidth(0.75);
        background: linear-gradient(135deg, #5bf1fd, #5bbcfd, #45a4fd, #0099ff)
          0/400% 400%;
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
        margin-left: getWidth(1.56);
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
