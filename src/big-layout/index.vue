<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <template v-if="$route.meta.hasOwnProperty('headerSlot')">
          <!-- 搜索插槽 -->
          <component
            :is="
              $route.meta.hasOwnProperty('headerSlot')
                ? $route.meta.headerSlot
                : false
            "
          />
        </template>
        <template v-else>
          <svg-icon icon-class="jiashicang-icon" />
          多点触发
          <svg-icon icon-class="header-down" />
        </template>
      </div>
      <div class="title">广东省疾控中心多点触发预警预测平台</div>
      <div class="right" @click="$router.push('/')">
        <svg-icon icon-class="time-icon" />
        数据截止至2020/03/11 12:00:00
      </div>
    </div>

    <div class="main">
      <router-view :header-data="{ aa: 11 }" />
    </div>
  </div>
</template>

<script>
export default {
  created() {
    function AutoResponse(width = 1920) {
      const target = document.documentElement
      target.style.fontSize = (target.clientWidth / width) * 16 + 'px'
    }
    AutoResponse()

    // 监听屏幕尺寸改变
    if (window.addEventListener) {
      window.addEventListener(
        'resize',
        () => {
          AutoResponse()
        },
        false
      )
    }

    // 销毁事件监听
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', AutoResponse)
      document.documentElement.style.fontSize = 'unset'
    })
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.652rem;
    height: 5.625rem;
    background-image: linear-gradient(
      90deg,
      #272a4a 0%,
      #4c5596 50%,
      #272a4a 100%
    );
    color: #fff;
    position: relative;

    .left,
    .right {
      position: absolute;
    }
    .left {
      left: 1.652rem;
    }
    .right {
      right: 1.652rem;
    }
    .title {
      font-weight: 500;
      width: 100%;
      display: flex;
      justify-content: center;

      font-family: SourceHanSansCN-Regular;
      font-size: 2.5rem;
      font-weight: normal;
      font-stretch: normal;
      color: #ffffff;
      text-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.62);
    }
  }
  .main {
    width: 100%;
    height: calc(100% - 5.625rem);
    background-color: #171833;
  }
}
</style>
