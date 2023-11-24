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
    <div class="setting" @click="settingShow = true" />
    <template v-for="(v, i) in pageList">
      <div
        v-if="v.name === show"
        :key="i"
        class="page-item"
        :style="{ backgroundImage: `url(${v.img})` }"
      />
    </template>
    <div
      v-if="settingShow"
      class="zhezhao"
      @click="
        () => {
          this.addShow = false;
          this.settingShow = false;
        }
      "
    >
      <img
        v-if="!addShow"
        :src="require('@/assets/png/setting.png')"
        alt=""
        @click.stop="addShow = true"
      >
      <img
        v-if="addShow"
        :src="require('@/assets/png/setting-add.png')"
        alt=""
        @click="
          () => {
            this.addShow = false;
            this.settingShow = false;
          }
        "
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: 'home',
      settingShow: false,
      addShow: false,
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
          name: 'multipoint-detail',
          img: require('@/assets/png/multipoint-click.png'),
          label: '多点触发-详情'
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
      ]
    }
  },
  mounted() {
    if (this.$route.query.show) {
      this.show = this.$route.query.show
    }
  },
  methods: {
    selectShow() {
      this.$refs.select.focus()
    },
    showChange(val) {
      if (['input', 'shunt', 'strategy'].indexOf(val) !== -1) {
        this.$router.push('/scale-big/input-forecast')
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
}

.select {
  position: absolute;
  top: 0;
  left: 0;
  width: getWidth(24);
  height: getHeight(8.13);
  display: flex;
  justify-content: center;
  align-items: center;

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

.setting {
  position: absolute;
  z-index: 1;
  top: 0;
  left: getWidth(326);
  width: getWidth(10);
  height: getHeight(8.13);
}

.zhezhao {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-item {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
}
</style>
