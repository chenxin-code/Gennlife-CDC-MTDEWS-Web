<template>
  <div class="container">
    <div class="left">
      <div class="l-up">
        <div class="title">
          <div class="triangle" />预测窗口天数内入境人员分布
        </div>
        <div class="content">
          <diversion-rose-chart :inbound="inbound" />
        </div>
      </div>
      <div class="l-middle">
        <div class="title">
          <div class="triangle" />分流前
        </div>
        <div class="content">
          <diversion-bar-before
            :distribute_before="distribute_before"
            :citys="distribute_before.citys"
            :hotel_threshold="filterSliderData.hotel_threshold"
            :hospital_threshold="filterSliderData.hospital_threshold"
          />
        </div>
      </div>
      <div class="l-down">
        <div class="title">
          <div class="triangle" />分流后
        </div>
        <div class="content">
          <diversion-bar-after
            :distribute_after="distribute_after"
            :citys="distribute_after.citys"
            :hotel_threshold="filterSliderData.hotel_threshold"
            :hospital_threshold="filterSliderData.hospital_threshold"
          />
        </div>
      </div>
    </div>
    <div class="center">
      <div class="up">
        <diversion-slider
          :default-data="filterSliderData"
          @dayChange="fetchInbound"
          @sliderValue="getSlider"
        />
      </div>
      <div class="down">
        <diversion-check
          :default-data="filterCheckData"
          :all-city="allCity"
          @checkValue="getCheck"
          @resetSlider="resetForm"
          @checkCityChange="cityChange"
        />
      </div>
    </div>
    <div class="right">
      <div class="search-item">
        <div class="title">
          <div class="triangle" />预测方案
        </div>
        <div class="search-content">
          <!--桑基图-->
          <diversion-mulberry-chart :data="distribute_result" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DiversionMulberryChart from './DiversionMulberryChart'
import DiversionCheck from './DiversionCheck'
import DiversionSlider from './DiversionSlider'
import DiversionBarBefore from './DiversionBarBefore'
import DiversionBarAfter from './DiversionBarAfter'
import DiversionRoseChart from './DiversionRoseChart'
import { bypassInbound, defaultParameters } from '@/api/input-forecast'
import { Message } from 'element-ui'

export default {
  components: {
    DiversionMulberryChart,
    DiversionSlider,
    DiversionCheck,
    DiversionBarBefore,
    DiversionBarAfter,
    DiversionRoseChart
  },
  data() {
    return {
      defaultData: {},
      defaultParam: {},
      // filterData: {},
      filterSliderData: {},
      filterCheckData: {
        baiyun_citys: [],
        baoan_citys: [],
        shenzhen_bay_citys: [],
        bridge_citys: []
      },
      allCity: [],
      // 饼图
      inbound: {
        inbound_by_country: [],
        inbound_by_port: {}
      },
      // 分流前
      distribute_before: {
        citys: [],
        hotel: {
          hotel_zzglrys: [],
          hotel_krnrs: [],
          hotel_distribute: [],
          hotel_residue: []
        },
        hospital: {
          hospital_sick: [],
          hospital_total: [],
          hospital_native: [],
          hospital_out_province: [],
          hospital_overseas: [],
          hospital_other: []
        }
      },
      // 分流后
      distribute_after: {
        citys: [],
        hotel: {
          hotel_zzglrys: [],
          hotel_krnrs: [],
          hotel_distribute: [],
          hotel_residue: []
        },
        hospital: {
          hospital_sick: [],
          hospital_total: [],
          hospital_native: [],
          hospital_out_province: [],
          hospital_overseas: [],
          hospital_other: []
        }
      },
      // 桑基图
      distribute_result: {}
    }
  },
  mounted() {
    this.fetchLeftTop()
    // let timer = null;
    // // 大屏动态事件
    // const moveFunc = () => {
    //   if (timer) return;
    //   timer = setInterval(() => {
    //     this.inboundFilter.days = random(7, 21);
    //     this.inboundFilter.hotel_allot_percent = Number(
    //       random(0.5, 1).toFixed(1)
    //     );
    //     this.inboundFilter.hospital_allot_percent = Number(
    //       random(0.5, 1).toFixed(1)
    //     );
    //     this.inboundFilter.other_allot_percent = Number(
    //       random(0, 0.5).toFixed(1)
    //     );
    //     this.inboundFilter.cityname = new Array(random(0, allCity.length - 1))
    //       .fill()
    //       .map(v => allCity[random(0, allCity.length - 1)]);

    //     this.fetchLeftTop();
    //   }, 5000);
    // };
    // moveFunc();

    // // 鼠标移动， 停止移动
    // document.onmousemove = () => {
    //   clearInterval(timer);
    //   timer = null;
    //   setTimeout(() => {
    //     moveFunc();
    //   }, 5000);
    // };

    // // 销毁动态事件
    // this.$once("hook:beforeDestroy", () => {
    //   clearInterval(timer);
    //   timer = null;
    // });
  },
  methods: {
    // 重置表单
    resetForm() {
      // this.filterData = Object.assign({}, this.defaultData);
      const { days, hotel_threshold, hospital_threshold, other_threshold } = this.defaultData
      this.filterSliderData = { days, hotel_threshold, hospital_threshold, other_threshold }

      // 分流城市
      this.filterCheckData.baiyun_citys = Object.assign([], this.defaultData.baiyun_citys)
      this.filterCheckData.baoan_citys = Object.assign([], this.defaultData.baoan_citys)
      this.filterCheckData.shenzhen_bay_citys = Object.assign([], this.defaultData.shenzhen_bay_citys)
      this.filterCheckData.bridge_citys = Object.assign([], this.defaultData.bridge_citys)

      this.fetchDistributeBefore(this.filterCheckData)
    },
    fetchLeftTop() {
      // 默认参数
      defaultParameters({ endpoint: 'bypass_inbound' })
        .then(res => {
          this.defaultParam = res.data
          this.allCity = [
            ...res.data.baiyun_citys.default,
            ...res.data.baiyun_citys.other
          ]
          this.defaultData.days = res.data.days
          this.defaultData.hotel_threshold = res.data.hotel_threshold
          this.defaultData.hospital_threshold = res.data.hospital_threshold
          this.defaultData.other_threshold = res.data.other_threshold
          this.defaultData.baiyun_citys = res.data.baiyun_citys.default
          this.defaultData.baoan_citys = res.data.baoan_citys.default
          this.defaultData.shenzhen_bay_citys =
            res.data.shenzhen_bay_citys.default
          this.defaultData.bridge_citys = res.data.bridge_citys.default

          // 分流参数
          const { days, hotel_threshold, hospital_threshold, other_threshold } = this.defaultData
          this.filterSliderData = { days, hotel_threshold, hospital_threshold, other_threshold }

          // 分流城市
          this.filterCheckData.baiyun_citys = Object.assign([], this.defaultData.baiyun_citys)
          this.filterCheckData.baoan_citys = Object.assign([], this.defaultData.baoan_citys)
          this.filterCheckData.shenzhen_bay_citys = Object.assign([], this.defaultData.shenzhen_bay_citys)
          this.filterCheckData.bridge_citys = Object.assign([], this.defaultData.bridge_citys)
          this.fetchInbound(days)
          this.fetchDistributeBefore(this.filterCheckData)
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    fetchInbound(days) {
      this.filterSliderData.days = days
      const inboundFilter = Object.assign(
        { result: 'inbound' },
        this.filterSliderData, this.filterCheckData
      )
      bypassInbound(inboundFilter)
        .then(res => {
          this.inbound = res.data
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    fetchDistributeBefore(filterCheckData) {
      this.filterCheckData = filterCheckData
      const distributeBeforeFilter = Object.assign(
        { result: 'distribute_before_citys_info' },
        this.filterSliderData, this.filterCheckData
      )
      bypassInbound(distributeBeforeFilter)
        .then(res => {
          this.distribute_before.citys = res.data.map(v => v.city)
          this.distribute_before.hotel.hotel_zzglrys = res.data.map(
            v => v.hotel_zzglrys
          )
          this.distribute_before.hotel.hotel_krnrs = res.data.map(
            v => v.hotel_krnrs
          )
          this.distribute_before.hotel.hotel_distribute = res.data.map(
            v => v.hotel_distribute
          )
          this.distribute_before.hotel.hotel_residue = res.data.map(
            v => v.hotel_residue
          )
          this.distribute_before.hospital.hospital_sick = res.data.map(
            v => v.hospital_sick
          )
          this.distribute_before.hospital.hospital_total = res.data.map(
            v => v.hospital_total
          )
          this.distribute_before.hospital.hospital_native = res.data.map(
            v => v.hospital_native
          )
          this.distribute_before.hospital.hospital_out_province = res.data.map(
            v => v.hospital_out_province
          )
          this.distribute_before.hospital.hospital_overseas = res.data.map(
            v => v.hospital_overseas
          )
          this.distribute_before.hospital.hospital_other = res.data.map(
            v => v.hospital_other
          )
          this.distribute_before.hospital.hospital_residue = res.data.map(
            v => v.hospital_residue
          )
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    getSlider(filterSilder) {
      this.filterSliderData = Object.assign(this.filterSliderData, filterSilder)
      this.getClear()
    },
    getCheck(filterCheck) {
      this.filterCheckData = Object.assign(this.filterCheckData, filterCheck)
      this.fetchAfter()
    },
    fetchAfter() {
      const distributeResultFilter = Object.assign(
        { result: 'distribute_result' },
        this.filterSliderData, this.filterCheckData
      )
      bypassInbound(distributeResultFilter)
        .then(res => {
          this.distribute_after.citys = res.data.distribute_after_citys_info.map(
            v => v.city
          )
          this.distribute_after.hotel.hotel_zzglrys = res.data.distribute_after_citys_info.map(
            v => v.hotel_zzglrys
          )
          this.distribute_after.hotel.hotel_krnrs = res.data.distribute_after_citys_info.map(
            v => v.hotel_krnrs
          )
          this.distribute_after.hotel.hotel_distribute = res.data.distribute_after_citys_info.map(
            v => v.hotel_distribute
          )
          this.distribute_after.hotel.hotel_residue = res.data.distribute_after_citys_info.map(
            v => v.hotel_residue
          )
          this.distribute_after.hospital.hospital_sick = res.data.distribute_after_citys_info.map(
            v => v.hospital_sick
          )
          this.distribute_after.hospital.hospital_total = res.data.distribute_after_citys_info.map(
            v => v.hospital_total
          )
          this.distribute_after.hospital.hospital_native = res.data.distribute_after_citys_info.map(
            v => v.hospital_native
          )
          this.distribute_after.hospital.hospital_out_province = res.data.distribute_after_citys_info.map(
            v => v.hospital_out_province
          )
          this.distribute_after.hospital.hospital_overseas = res.data.distribute_after_citys_info.map(
            v => v.hospital_overseas
          )
          this.distribute_after.hospital.hospital_other = res.data.distribute_after_citys_info.map(
            v => v.hospital_other
          )
          this.distribute_after.hospital.hospital_residue = res.data.distribute_after_citys_info.map(
            v => v.hospital_residue
          )
          this.distribute_result = res.data.distribute_result
        })
        .catch(err => {
          Message({
            message: err.message,
            type: 'warning'
          })
        })
    },
    getClear() {
      // 清空分流后
      console.log('清空分流后')
      this.distribute_after.citys = []
      this.distribute_after.hotel.hotel_zzglrys = []
      this.distribute_after.hotel.hotel_krnrs = []
      this.distribute_after.hotel.hotel_distribute = []
      this.distribute_after.hotel.hotel_residue = []
      this.distribute_after.hospital.hospital_sick = []
      this.distribute_after.hospital.hospital_total = []
      this.distribute_after.hospital.hospital_native = []
      this.distribute_after.hospital.hospital_out_province = []
      this.distribute_after.hospital.hospital_overseas = []
      this.distribute_after.hospital.hospital_other = []
      this.distribute_after.hospital.hospital_residue = []
      this.distribute_result = {}
    },
    cityChange(filterCheckData) {
      this.fetchDistributeBefore(filterCheckData)
      this.getClear()
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

.container {
  padding: getHeight(1) getWidth(1);
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 100%;
  > div + div {
    // margin-left: 0.8rem;
    margin-left: getWidth(2.8);
  }

  .left,
  .center,
  .right {
    height: 100%;
    background: #212342;
    border-radius: getWidth(0.5);
    padding: getHeight(1.3) getWidth(1.3);
    position: relative;
    z-index: 1;
    flex: none;
    .title {
      font-size: $nomalSize;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      // margin-bottom: getHeight(2);
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
  }

  .left {
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    .l-up {
      flex: 1;
      display: flex;
      flex-direction: column;
      .title {
        flex: 1;
      }
      .content {
        flex: 9;
      }
    }
    .l-middle {
      flex: 1;
      display: flex;
      flex-direction: column;
      .title {
        flex: 1;
      }
      .content {
        flex: 9;
      }
    }
    .l-down {
      flex: 1;
      display: flex;
      flex-direction: column;
      .title {
        flex: 1;
      }
      .content {
        flex: 9;
      }
    }
  }

  .center {
    // width: 22.81rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    .up {
      flex: 1;
    }
    .down {
      flex: 1;
    }
  }

  .right {
    // width: 25.5rem;
    flex: 1;
    display: flex;
    flex-direction: column;

    .search-item {
      width: 100%;
      height: 100%;
      .search-content {
        width: 100%;
        height: 100%;
        // > .echarts {
        //   width: 100%;
        //   height: 100%;
        // }
      }
    }
  }
}

.search-item + .search-item {
  margin-top: 2rem;
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
    margin-top: getHeight(1.8);
  }
}
</style>
