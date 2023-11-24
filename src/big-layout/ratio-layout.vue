<template>
  <div class="container">
    <div class="select" @click="selectShow">
      <el-select
        ref="select"
        v-model="show"
        :popper-append-to-body="false"
        @change="showChange"
      >
        <el-option
          v-for="item in pageList"
          :key="item.name"
          :label="item.label"
          :value="item.name"
        />
      </el-select>
    </div>

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
            @event="targetEvent"
            @time="timeUpdate"
          />
        </template>
        <template v-else>
          <svg-icon icon-class="jiashicang-icon" />
          <span>多点触发风险预警首页</span>
          <svg-icon icon-class="header-down" />
        </template>
      </div>
      <div class="title">广东省智慧化多点触发疾病防控预警系统</div>
      <div class="right">
        <div class="time">
          <svg-icon icon-class="time-icon" />
          <span>数据截止至 {{ days }}</span>
        </div>
        <div class="setting">
          <svg-icon icon-class="time-icon" />
          <span>设置</span>
        </div>
        <div class="head">
          <div class="img">
            <img
              src="data:image/jpg;base64,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"
              alt=""
            >
          </div>
          <span>管理员</span>
          <svg-icon icon-class="header-down" />
        </div>
      </div>
    </div>

    <div class="main">
      <router-view :target-data="targetData" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      targetData: null,
      days: '2020-12-20',
      pageList: [
        {
          name: 'home',
          img: require('@/assets/png/home.png'),
          label: '驾驶舱'
        },
        {
          name: 'multipoint',
          img: require('@/assets/png/multipoint.png'),
          label: '多点触发'
        },
        {
          name: 'input',
          img: require('@/assets/png/input.png'),
          label: '输入预测'
        },
        {
          name: 'shunt',
          img: require('@/assets/png/shunt.png'),
          label: '人员分流'
        },
        {
          name: 'strategy',
          img: require('@/assets/png/strategy.png'),
          label: '隔离策略'
        },
        {
          name: 'guangdong',
          img: require('@/assets/png/guangdong.png'),
          label: '广东疫情'
        },
        {
          name: 'hongkong',
          img: require('@/assets/png/hongkong.png'),
          label: '香港疫情'
        },
        {
          name: 'world',
          img: require('@/assets/png/world.png'),
          label: '全球'
        },
        {
          name: 'china',
          img: require('@/assets/png/china.png'),
          label: '全国'
        },
        {
          name: 'yuqing',
          img: require('@/assets/png/yuqing.png'),
          label: '舆情'
        }
      ],
      show: 'input'
    }
  },
  created() {
    // function AutoResponse(width = 1950) {
    //   const target = document.documentElement
    //   target.style.fontSize = (target.clientWidth / width) * 16 + 'px'
    // }
    // AutoResponse()
    // // 监听屏幕尺寸改变
    // if (window.addEventListener) {
    //   window.addEventListener('resize', AutoResponse, false)
    // }
    // // 销毁事件监听
    // this.$once('hook:beforeDestroy', () => {
    //   window.removeEventListener('resize', AutoResponse)
    //   document.documentElement.style.fontSize = 'unset'
    // })
  },
  methods: {
    targetEvent(targetData) {
      this.targetData = targetData
    },
    timeUpdate(days) {
      this.days = days
    },
    selectShow() {
      this.$refs.select.focus()
    },
    showChange(val) {
      if (['input', 'shunt', 'strategy'].indexOf(val) === -1) {
        this.$router.push({ path: '/all-page', query: { show: val }})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

.container {
  width: 100%;
  height: 100%;
  position: relative;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 getWidth(2.7);
    height: getHeight(8.13);

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

      font-size: $nomalSize;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
    .left {
      left: getWidth(2.7);
      > span {
        margin: 0 getWidth(0.75);
      }
    }
    .right {
      right: getWidth(2.7);
      display: flex;
      align-items: center;

      .head {
        display: flex;
        align-items: center;
        .img {
          width: getWidth(2.75);
          height: getWidth(2.75);
          border-radius: 50%;
          flex: none;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
        }
      }

      > div {
        margin: 0 getWidth(3);
        > span {
          margin: 0 getWidth(0.75);
        }
      }
    }
    .title {
      font-weight: 500;
      width: 100%;
      display: flex;
      justify-content: center;

      font-size: $pageHeaderSize;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: #ffffff;
      text-shadow: 0px 0px 0px rgba(0, 0, 0, 0.005);
      background: linear-gradient(180deg, #ffffff 0%, #ffe7af 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .main {
    width: 100%;
    height: calc(100% - #{getHeight(8.13)});
    background-color: #171833;
  }
}

.select {
  position: absolute;
  top: 0;
  left: 0;
  width: getWidth(18);
  height: getHeight(8.13);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;

  ::v-deep {
    .el-select {
      width: 100%;
      height: 100%;
    }
    .el-input {
      width: 100%;
      height: 100%;
    }
    .el-input__inner {
      width: 100%;
      height: 100%;
      // display: none;
      opacity: 0;
    }
    .el-input__suffix {
      opacity: 0;
    }

    .el-popper {
      background-color: RGBA(33, 35, 64, 1);
    }
    .el-select-dropdown {
      border-color: RGBA(33, 35, 64, 1);
    }
    .el-popper[x-placement^="bottom"] .popper__arrow::after {
      border-color: RGBA(33, 35, 64, 1);
    }
    .el-select-dropdown__item.hover,
    .el-select-dropdown__item:hover {
      background-color: rgba(34, 146, 190, 0.2);
      color: rgb(34, 146, 190);
    }
    .el-select-dropdown__item {
      color: rgba(#fff, 0.5);
    }
  }
}
</style>
