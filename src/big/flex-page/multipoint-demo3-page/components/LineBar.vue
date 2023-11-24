<template>
  <div class="diff-bar">
    <div class="content">
      <!-- <div v-for="(v, i) in caseNationWeek" :key="i" class="bar-item">
        <div class="bar" :style="{ width: `${v.total_case}%` }" />
        <div class="value">{{ v.total_case }}</div>
      </div> -->
      <div class="bar-item">
        <div class="bar1 bar" :style="{ height: `${caseData[0].percent}%` }">
          <div class="value" :style="valueStyle">{{ caseData[0].count }}</div>
        </div>
      </div>
      <div class="bar-item">
        <div class="bar2 bar" :style="{ height: `${caseData[1].percent}%` }">
          <div class="value" :style="valueStyle">{{ caseData[1].count }}</div>
        </div>
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
    },
    valueStyle: {
      type: Object,
      default() {
        return {}
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

  .content {
    width: 100%;
    height: 100%;
    display: flex;

    .bar-item {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column-reverse;
      position: relative;

      .bar1 {
        // background-image: linear-gradient(174deg, #ffa83b 0%, #ffea00 100%);
        background: linear-gradient(
            135deg,
            #f1982b,
            #ffa83b,
            #ffea00,
            #fbe91cf3
          )
          0/400% 400%;
        width: getHeight(1.63);
        border-radius: getWidth(0.25);
        animation: move 2s infinite;
      }

      .bar2 {
        // background-image: linear-gradient(0deg, #f52b7b 0%, #ff7c6e 100%);
        background: linear-gradient(
            135deg,
            rgb(233, 66, 133),
            #f52b7b,
            #ff7c6e,
            #f89f95
          )
          0/400% 400%;
        width: getHeight(1.63);
        border-radius: getWidth(0.25);
        animation: move 2s infinite;
      }
      .bar {
        position: relative;
      }

      .value {
        // height: getHeight(1.81);
        font-family: Helvetica;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0rem;
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: getWidth(1.13);
        position: absolute;
        bottom: -20px;
        // right: 20px;
      }
    }
  }

  @keyframes move {
    0%,
    to {
      background-position-y: bottom;
    }
    40% {
      background-position-y: center;
    }
    60% {
      background-position-y: top;
    }

    80% {
      background-position-y: center;
    }
    100% {
      background-position-y: bottom;
    }
  }
}
</style>
