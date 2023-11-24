<template>
  <div class="diff-bar">
    <div class="divider" />
    <div class="left">
      <div v-for="(v, i) in data.slice(0, len)" :key="i" class="bar-item">
        <div class="top">
          <!-- sadsfgdf -->
          <div class="id-number">{{ i + 1 }}</div>
          <div class="name">{{ v.name }}</div>
          <div class="number">{{ v.value }}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div v-for="(v, i) in data.slice(len)" :key="i" class="bar-item">
        <div class="top">
          <!-- sadsfgdf -->
          <div class="id-number">{{ i + len + 1 }}</div>
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
.diff-bar {
  width: 100%;
  height: 100%;
  // height: 29.06rem;
  // flex: 29.06;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  .divider {
    position: absolute;
    left: 50%;
    border-left: 2px dashed white;
    height: 95%;
  }
  .left {
    margin-left: 2.44rem;
  }
  .right {
    margin-left: 4.56rem;
  }
  .left, .right {
    height: 100%;
    width: 50%;
    div {
      width: 100%;
    }
  }
  .bar-item {
    display: flex;
    flex-direction: column;
    height: 14%;
    width: 100%;
    .top {
      display: flex;
      .id-number {
        width: 1rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.75rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #1C1F3C;
        background-color: #ffe7b3;
        border-radius: 50%;
        flex: none;
      }

      .name {
        width: 10.63rem;
        white-space:normal;
        word-break:break-all;
        overflow:hidden;
        font-size: 0.88rem;
        font-family: PingFang-SC-Medium, PingFang-SC;
        font-weight: 500;
        color: #ffffff;
        flex: none;
      }
      .number {
        margin-left: 0.94rem;
        width: 3.5rem;
        height: 1.19rem;
        text-align: center;
        color: #ffffff;
        text-align: center;
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
