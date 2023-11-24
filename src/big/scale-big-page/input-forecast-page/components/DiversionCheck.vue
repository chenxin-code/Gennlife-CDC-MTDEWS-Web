<template>
  <div class="container">
    <div class="content">
      <div class="search-item">
        <div class="title">
          <div class="triangle" />分流城市
        </div>
        <div class="search-content">
          <!-- TODO 港口选择 -->
          <div v-for="(v, i) in Object.keys(filterCheck)" :key="i" class="gangkouChoice">
            <div class="label">{{ filterCheck[v].field }}</div>
            <el-select
              v-model="filterCheck[v].cityname"
              class="selectCity"
              multiple
              placeholder="请选择"
              @change="cityReChange"
            >
              <el-option v-for="item in allCity" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
        </div>
      </div>

      <div class="operation">
        <div class="reset" @click="resetForm">重置</div>
        <div class="submit" @click="fetchLeftTop">执行</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allCity: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    baiyun_citys: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      filterCheck: {
        baiyun_citys: {
          field: '广州白云机场',
          cityname: []
        },
        baoan_citys: {
          field: '深圳宝安机场',
          cityname: []
        },
        shenzhen_bay_citys: {
          field: '深圳湾',
          cityname: []
        },
        bridge_citys: {
          field: '港珠澳大桥',
          cityname: []
        }
      }
    }
  },
  watch: {
    defaultData: {
      deep: true,
      handler: function() {
        this.init()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    cityReChange() {
      console.log(111)
      const baiyun_citys = this.filterCheck['baiyun_citys'].cityname
      const baoan_citys = this.filterCheck['baoan_citys'].cityname
      const shenzhen_bay_citys = this.filterCheck['shenzhen_bay_citys']
        .cityname
      const bridge_citys = this.filterCheck['bridge_citys'].cityname
      this.$emit('checkCityChange', {
        baiyun_citys,
        baoan_citys,
        shenzhen_bay_citys,
        bridge_citys
      })
    },
    // 重置表单
    resetForm() {
      this.$emit('resetSlider')
    },
    fetchLeftTop() {
      const baiyun_citys = this.filterCheck['baiyun_citys'].cityname
      const baoan_citys = this.filterCheck['baoan_citys'].cityname
      const shenzhen_bay_citys = this.filterCheck['shenzhen_bay_citys']
        .cityname
      const bridge_citys = this.filterCheck['bridge_citys'].cityname
      this.$emit('checkValue', {
        baiyun_citys,
        baoan_citys,
        shenzhen_bay_citys,
        bridge_citys
      })
    },
    init() {
      this.filterCheck.baiyun_citys.cityname = Object.assign(
        [],
        this.defaultData.baiyun_citys
      )
      this.filterCheck.baoan_citys.cityname = Object.assign(
        [],
        this.defaultData.baoan_citys
      )
      this.filterCheck.shenzhen_bay_citys.cityname = Object.assign(
        [],
        this.defaultData.shenzhen_bay_citys
      )
      this.filterCheck.bridge_citys.cityname = Object.assign(
        [],
        this.defaultData.bridge_citys
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.content {
  width: 100%;
  height: 100%;

  position: relative;
  .operation {
    position: absolute;
    bottom: getHeight(5);
    display: flex;
    left: 50%;
    transform: translateX(-50%);

    .reset,
    .submit {
      width: getWidth(15.63);
      height: getHeight(4.5);
      border-radius: getHeight(2.5) getWidth(2.5);
      border: solid getWidth(0.13) #00d7ec;
      border-radius: getHeight(4.5);
      font-size: $nomalSize;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      text-align: center;
      line-height: getHeight(4.5);
      cursor: pointer;
      user-select: none;

      &:active {
        transform: scale(1.05);
      }
    }

    .reset {
      border: getHeight(0.12) solid rgba(255, 255, 255, 0.6);
      color: #ffffff;
    }
    .submit {
      border: getHeight(0.12) solid #00d7ec;
      color: #00d7ec;
      margin-left: getWidth(3);
    }
  }
}

.search-item {
  display: flex;
  flex-direction: column;

  .title {
    font-size: $nomalSize;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: getHeight(2);
    // 标题三角形
    .triangle {
      display: inline-block;
      font-size: 0;
      overflow: hidden;
      margin-right: getWidth(0.6);

      &:before {
        content: "";
        position: relative;
        display: inline-block;
        border: getWidth(0.3) solid transparent;

        position: relative;
        right: getWidth(0.1);
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;

        left: getWidth(0.1);
        border-right-width: 0;
        border-left-width: getWidth(0.6);
        border-left-color: rgb(181, 181, 181);
      }
    }
  }

  .search-content {
    margin-top: getHeight(1);
    padding: 0 5%;
    .gangkouChoice:not(:first-child) {
      margin-top: getHeight(3);
    }
    .gangkouChoice {
      .label {
        display: flex;
        justify-content: space-between;
        font-size: $itemTitleSize;
        color: #ffffff;
        margin-bottom: getHeight(0.5);
      }
      .selectCity {
        width: 100%;
      }
      .el-divider {
        opacity: 0.5;
      }
    }
  }
}

.search-item .search-content .gangkouChoice ::v-deep {
  .el-input__inner {
    background-color: #171833;
  }
  .el-scrollbar__wrap--hidden-default {
    background-color: #171833;
  }
}

.el-select-dropdown__item {
  color: #606266;
}
</style>
