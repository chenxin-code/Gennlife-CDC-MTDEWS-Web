<template>
  <div class="container">
    <svg-icon icon-class="多点触发风险预警驾驶舱icon" />
    境外输入疫情风险预测
    <svg-icon icon-class="头部选择下拉icon" />

    <div
      v-for="(v, i) in nav"
      :key="i"
      :class="{ 'nav-item': true, active: $route.path === v.path }"
      @click="$router.push({ path: v.path })"
    >
      <!-- 四个div分别为四个角上的div -->
      <div class="horn">
        <div class="lt" />
        <div class="rt" />
        <div class="rb" />
        <div class="lb" />
      </div>
      <div class="label">{{ v.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: [
        { label: '首页', path: '/big/input-forecast/home' },
        { label: '入境人员分流方案', path: '/big/input-forecast/diversion' },
        {
          label: '入境隔离策略调整及预测',
          path: '/big/input-forecast/isolation'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  align-items: center;
}

$borderSize: 2px;
$bgColor: #006ef8;
$unBgColor: rgba(#006ef8, 0.3);

.nav-item + .nav-item {
  margin-left: 1rem;
}

.nav-item {
  width: 3.13rem;
  height: 1.88rem;

  background: linear-gradient(
    239deg,
    rgba(#006ef8, 0.19) 0%,
    rgba(#0079ff, 0.19) 100%
  );
  position: relative;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  &:nth-of-type(2) {
    width: 7.69rem;
  }

  &:nth-of-type(3) {
    width: 9.81rem;
  }

  .label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(#e8e9eb, 0.75);
    -webkit-background-clip: text;
  }

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $unBgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $unBgColor;
      border-left: $borderSize solid $unBgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $unBgColor;
      border-right: $borderSize solid $unBgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $unBgColor;
      border-right: $borderSize solid $unBgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $unBgColor;
      border-left: $borderSize solid $unBgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
}
.active {
  background: linear-gradient(
    239deg,
    rgba(#006ef8, 0.54) 0%,
    rgba(#0079ff, 0.54) 100%
  );

  .horn {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 1px solid $bgColor;
    > div {
      width: 10px;
      height: 10px;
      position: absolute;
    }
    .lt {
      border-top: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      top: -$borderSize;
    }
    .rt {
      border-top: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      top: -$borderSize;
    }
    .rb {
      border-bottom: $borderSize solid $bgColor;
      border-right: $borderSize solid $bgColor;
      right: -$borderSize;
      bottom: -$borderSize;
    }
    .lb {
      border-bottom: $borderSize solid $bgColor;
      border-left: $borderSize solid $bgColor;
      left: -$borderSize;
      bottom: -$borderSize;
    }
  }
}
</style>
