<template>
  <div class="diff-bar">
    <div v-for="(v, i) in data" :key="i" class="bar-item">
      <div class="top">
        <div class="number" />
        <div class="name">{{ v.name }}</div>
      </div>
      <div class="bottom">
        <div class="bar" :style="{ width: `${v.value}%` }" />
        <div class="value">{{ v.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [
          { name: '美国', value: 98 },
          { name: '德国', value: 65 },
          { name: '印度', value: 58 },
          { name: '加拿大', value: 47 },
          { name: '日本', value: 38 }
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
.diff-bar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .bar-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .top {
      display: flex;
      align-items: center;
      width: 100%;

      .number {
        width: 0.38rem;
        height: 0.38rem;
        background: #ffe7b3;
        border-radius: 50%;
        flex: none;
      }

      .name {
        margin-left: 1rem;

        font-size: 0.88rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #ffffff;
        flex: none;
      }
    }

    .bottom {
      display: flex;
      align-items: center;
      width: 100%;
      padding-right: 1.5rem;
      padding-left: 1rem + 0.38rem;
      margin-top: 0.4rem;

      .bar {
        height: 0.38rem;
        background: linear-gradient(135deg, #faea37, #ffea00, #ffa83b, #fd9a22)
          0/400% 400%;
        border-radius: 0.38rem;

        animation: move 2s infinite;
      }

      .value {
        font-size: 0.75rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(#ffffff, 0.7);
        position: absolute;
        right: 0;
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
