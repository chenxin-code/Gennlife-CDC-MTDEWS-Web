<template>
  <div class="diff-bar">
    <div class="left">
      <div v-for="(v, i) in data.slice(0, len)" :key="i" class="bar-item">
        <div class="top">
          <div class="id-number">{{ i + 1 }}</div>
          <div class="name">{{ v.name }}</div>
          <div class="number">{{ v.value }}</div>
        </div>
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
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 },
          { name: '内蒙古自治区呼伦贝尔市满洲里市北区街道办事处', value: 3 }
        ]
      }
    }
  },
  data() {
    return {
      flag: false,
      len: 7
    }
  },
  mounted() {
    if (this.data.length > 14) {
      this.flag = true
      this.len = Math.round(this.data.length / 2)
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
    height: 20%;
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
        width: getWidth(18.81);
        height: getHeight(4.13);
        font-family: PingFangSC-Medium;
        font-size: $nomalSize;
        font-weight: normal;
        font-stretch: normal;
        color: rgba(255, 255, 255, 0.7);
        white-space: normal;
        word-break: break-all;
        overflow: hidden;
        margin-right: getWidth(7.75);
        flex: none;
      }
      .number {
        width: getWidth(2);
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
