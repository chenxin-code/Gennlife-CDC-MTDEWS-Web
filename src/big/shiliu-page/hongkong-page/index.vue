<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <div class="title">
          <div class="triangle" />
          每日新增
        </div>
        <div class="t-content">
          <div v-for="(v, i) in todayInfo" :key="i" class="t-content-item">
            <div class="item-t">{{ v.title }}</div>
            <div class="item-c">{{ v.value }}</div>
            <div class="item-b">
              <div class="label">{{ v.label }}</div>
              <div class="diff">{{ v.diff }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <div class="triangle" />
          近一周新增
        </div>
        <div class="t-content">
          <div v-for="(v, i) in weekInfo" :key="i" class="t-content-item">
            <div class="item-t">{{ v.title }}</div>
            <div class="item-c">{{ v.value }}</div>
            <div class="item-b">
              <div class="label">{{ v.label }}</div>
              <div class="diff">{{ v.diff }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="left" />
      <div class="right" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todayInfo: [
        { title: '新增个案', value: '5000', label: '较昨日', diff: '20%' },
        { title: '输入个案', value: '5000', label: '较昨日', diff: '20%' },
        { title: '本地感染个案', value: '5000', label: '较昨日', diff: '20%' },
        { title: '新增死亡个案', value: '5000', label: '较昨日', diff: '20%' }
      ],
      weekInfo: [
        { title: '新增个案', value: '5000', label: '较上周', diff: '20%' },
        { title: '输入个案', value: '5000', label: '较上周', diff: '20%' },
        { title: '本地感染个案', value: '5000', label: '较上周', diff: '20%' },
        { title: '新增死亡个案', value: '5000', label: '较上周', diff: '20%' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0.9rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  .top {
    width: 100%;
    height: 11.94rem;
    background: rgba(#212342, 0.6);
    border-radius: 0.5rem;
  }
}

.top {
  padding: 1rem 0.8rem;
  display: flex;

  .left,
  .right {
    flex: 1;

    display: flex;
    flex-direction: column;

    .title {
      font-size: 0.88rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      // 标题三角形
      .triangle {
        display: inline-block;
        font-size: 0;
        overflow: hidden;
        margin-right: 0.6rem;

        &:before {
          content: "";
          position: relative;
          display: inline-block;
          border: 0.3rem solid transparent;

          position: relative;
          right: 0.1rem;
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;

          left: 0.1rem;
          border-right-width: 0;
          border-left-width: 0.6rem;
          border-left-color: rgb(181, 181, 181);
        }
      }
    }

    .t-content {
      width: 100%;
      height: 100%;
      position: relative;
      margin-top: 0.8rem;
    }
  }
}
</style>
