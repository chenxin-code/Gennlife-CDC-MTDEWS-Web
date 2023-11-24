<template>
  <div class="diff-bar">
    <div class="content">
      <!-- <div v-for="(v, i) in caseNationWeek" :key="i" class="bar-item">
        <div class="bar" :style="{ width: `${v.total_case}%` }" />
        <div class="value">{{ v.total_case }}</div>
      </div> -->
      <div class="bar-item">
        <div class="bar1" :style="{ width: `${caseData[0].percent}%` }" />
        <div class="value">{{ caseData[0].count }}</div>
      </div>
      <div class="bar-item">
        <div class="bar2" :style="{ width: `${caseData[1].percent}%` }" />
        <div class="value">{{ caseData[1].count }}</div>
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
        return [0, 0]
      }
    }
  },
  data() {
    return {
      caseData: [
        {
          count: 0,
          percent: 0
        },
        {
          count: 0,
          percent: 0
        }
      ]
    }
  },
  watch: {
    caseNationWeek() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const max = Math.max(this.caseNationWeek[0], this.caseNationWeek[1])
      this.caseData[0].count = this.caseNationWeek[0]
      this.caseData[0].percent =
        (this.caseNationWeek[0] / max).toFixed(2) * 100
      this.caseData[1].count = this.caseNationWeek[1]
      this.caseData[1].percent =
        (this.caseNationWeek[1] / max).toFixed(2) * 100
    }
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
  // overflow-y: auto;
  // overflow-x: hidden;

  .content {
    width: 100%;
    height: 100%;

    .bar-item {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;

      .bar1 {
        background-image: linear-gradient(174deg, #ffa83b 0%, #ffea00 100%);
        height: getHeight(1.63);
        border-radius: getWidth(0.25);
        animation: move 2s infinite;
      }

      .bar2 {
        background-image: linear-gradient(0deg, #f52b7b 0%, #ff7c6e 100%);
        height: getHeight(1.63);
        border-radius: getWidth(0.25);
        animation: move 2s infinite;
      }

      .value {
        height: getHeight(1.75);
        line-height: getHeight(1.75);
        font-family: Helvetica;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: rgba(255, 255, 255, 0.8);
        margin-left: getWidth(1.13);
        position: absolute;
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
