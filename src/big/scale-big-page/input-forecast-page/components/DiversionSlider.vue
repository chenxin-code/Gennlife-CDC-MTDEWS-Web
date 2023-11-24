<template>
  <div class="container">
    <div class="content">
      <div class="search-item">
        <div class="title">
          <div class="triangle" />入境人员分流方案参数设置
        </div>
        <div class="search-content">
          <div class="search-content-item">
            <div class="label">
              <div class="label-left">预测窗口天数（7，21）</div>
              <div class="label-right">{{ filterSlider.days }}</div>
            </div>
            <el-slider v-model="filterSlider.days" :min="7" :max="21" :step="1" @change="dayChange" />
          </div>

          <div class="search-content-item">
            <div class="label">
              <div class="label-left">隔离酒店容纳量预警阈值（0.5，1）</div>
              <div class="label-right">{{ filterSlider.hotel_threshold }}</div>
            </div>
            <el-slider v-model="filterSlider.hotel_threshold" :min="0.5" :max="1" :step="0.01" />
          </div>

          <div class="search-content-item">
            <div class="label">
              <div class="label-left">隔离医院容纳量预警阈值（0.5，1）</div>
              <div class="label-right">{{ filterSlider.hospital_threshold }}</div>
            </div>
            <el-slider
              v-model="filterSlider.hospital_threshold"
              :min="0.5"
              :max="1"
              :step="0.01"
            />
          </div>

          <div class="search-content-item">
            <div class="label">
              <div class="label-left">其他传染病所需病房占比（0，0.5）</div>
              <div class="label-right">{{ filterSlider.other_threshold }}</div>
            </div>
            <el-slider v-model="filterSlider.other_threshold" :min="0" :max="0.5" :step="0.01" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    defaultData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      filterSlider: {
        days: 7,
        hotel_threshold: 0.5,
        hospital_threshold: 0.5,
        other_threshold: 0
      }
    }
  },
  watch: {
    filterSlider: {
      handler: function() {
        this.$emit('sliderValue', this.filterSlider)
      },
      deep: true
    },
    defaultData: {
      handler: function() {
        this.filterSlider.days = this.defaultData.days
        this.filterSlider.hotel_threshold = this.defaultData.hotel_threshold
        this.filterSlider.hospital_threshold = this.defaultData.hospital_threshold
        this.filterSlider.other_threshold = this.defaultData.other_threshold
      },
      deep: true
    }
  },
  methods: {
    dayChange() {
      this.$emit('dayChange', this.filterSlider.days)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
::v-deep {
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgba(255, 255, 255, 0.675);
  }
  .el-checkbox__inner {
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgba(255, 255, 255, 0.675);
    color: rgba(255, 255, 255, 0.675);
  }
  .el-checkbox__input.is-checked + .el-checkbox__label {
    color: rgba(255, 255, 255, 0.675);
  }
  .el-checkbox__label {
    font-size: $nomalSize;
  }
  .el-checkbox {
    margin-top: getHeight(1);
  }
}
.content {
  width: 100%;
  height: 100%;
  .search-content-item:not(:first-child) {
    margin-top: getHeight(5);
  }
  .search-content-item {
    > .label {
      display: flex;
      justify-content: space-between;
      font-size: $nomalSize;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(#ffffff, 0.9);
      margin-bottom: getHeight(1);
    }

    // 修改滑动条样式
    ::v-deep {
      .el-slider__runway {
        width: 100%;
        height: getHeight(0.6);
      }
      .el-slider__bar {
        width: 100%;
        height: getHeight(0.6);
        border-radius: getHeight(0.3);
        background: linear-gradient(135deg, #f5e647, #ffea00, #ffa83b, #fd9617)
          0/400% 400%;
        animation: move 2s infinite;
      }
      .el-slider__button-wrapper {
        width: getWidth(2);
        height: getHeight(2);
        top: 50%;
        margin-top: getHeight(-1);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .el-slider__button {
        width: getWidth(1);
        height: getHeight(1);
        background: linear-gradient(102deg, #ffea00 0%, #ffa83b 100%);
        box-shadow: 0rem 0rem 0.25rem 0rem rgba(255, 234, 0, 0.3);
        border: none;
      }
      .el-slider__button.hover {
        transform: scale(2.2);
      }
    }
  }
  position: relative;
}

.search-item {
  display: flex;
  flex-direction: column;
  padding: 0 5%;

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
    margin-top: getHeight(1.8);
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
</style>
