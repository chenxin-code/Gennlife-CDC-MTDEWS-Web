<template>
  <div class="diff-bar">
    <div class="left">
      <div v-for="(v, i) in data" :key="i" class="bar-item">
        <div class="top">
          <div class="id-number">{{ i + 1 }}</div>
          <div class="name">{{ v.area_highrisk }}</div>
          <div class="number">{{ v.total_case }}</div>
        </div>
        <div class="line" />
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
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.diff-bar {
  width: 100%;
  height: 100%;
  // height: 29.06rem;
  // flex: 29.06;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  .left {
    height: 100%;
    width: 100%;
    div {
      width: 100%;
    }
  }
  .bar-item {
    display: flex;
    flex-direction: column;
    height: 10%;
    width: 100%;
    .top {
      display: flex;
      .id-number {
        width: getWidth(2);
        height: getHeight(2.13);
        line-height: getHeight(2.13);
        text-align: center;
        font-size: $nomalSize;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #1c1f3c;
        background-color: #ffe7b3;
        border-radius: 50%;
        margin-left: getWidth(3.5);
        margin-right: getWidth(3.69);
        flex: none;
      }

      .name {
        width: getWidth(18.75);
        // height: getHeight(4.13);
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        color: rgba(255, 255, 255, 0.7);
        white-space: normal;
        word-break: break-all;
        overflow: hidden;
        flex: none;
      }
      .number {
        // width: getWidth(2);
        height: getHeight(2.13);
        line-height: getHeight(2.13);
        text-align: center;
        font-size: $nomalSize;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgb(237, 238, 241);
        margin-left: 0.94rem;
      }
    }
      .line {
        display: inline-block;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: getWidth(10);
        width: 70%;
        opacity: 0.2;
        border-bottom: getHeight(0.2) dashed white;
      }
  }
  .left {
    .top {
      .name {
        margin-left: 1.62rem;
      }
      .number {
        margin-left: 0.94rem;
      }
    }
  }
  .right {
    .top {
      .name {
        margin-left: 1.31rem;
      }
      .number {
        margin-left: 0.69rem;
      }
    }
  }
}
</style>
