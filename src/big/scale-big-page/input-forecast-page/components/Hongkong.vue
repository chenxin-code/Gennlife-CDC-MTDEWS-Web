<template>
  <div class="containter">
    <div class="left">
      <div class="leftTop">
        <input id="radio1" v-model="picked" type="radio" name value="mrxz">
        <input id="radio2" v-model="picked" type="radio" name value="ljxz">
        <input id="radio3" v-model="picked" type="radio" name value="kjsj">
        <input id="radio4" v-model="picked" type="radio" name value="kjxy">
        <label for="radio1">每日新增病例数分布</label>
        <label for="radio2">累计新增病例数分布</label>
        <label for="radio3">跨境司机住址分布</label>
        <label for="radio4">跨境学员学校分布</label>
      </div>
      <hongkong-map :data="lastData" :area="mapArea" />
      <div class="leftBottom">
        <div>{{ mapArea[0] }}</div>
        <div v-for="(v,i) in mapArea.slice(0,mapArea.length-1)" :key="i">
          {{ mapArea[i]+1 }}-{{ mapArea[i+1] }}
        </div>
        <!-- <div>{{mapArea[0]+1}}-{{mapArea[1]}}</div>
        <div>{{mapArea[1]+1}}-{{mapArea[2]}}</div>
        <div>{{mapArea[2]+1}}-{{mapArea[3]}}</div>
        <div>{{mapArea[3]+1}}-{{mapArea[4]}}</div> -->
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div v-for="(v,i) in rightTopData" :key="i" class="content">
          <div class="title">{{ v.title }}</div>
          <div class="num">{{ v.num }}</div>
          <template v-if="isNaN(v.bottomContent) || v.bottomContent == Infinity">
            <div class="bottomContent">占总比0%</div>
          </template>
          <template v-else>
            <div class="bottomContent">占总比{{ v.bottomContent }}%</div>
          </template>
        </div>
      </div>
      <div class="center">
        <template>
          <div class="block">
            <span>筛选：</span>
            <!--
            <el-date-picker
              v-model="timeValue"
              type="daterange"
              range-separator="——"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              popper-class="chooseTime"
              value-format="yyyy-MM-dd"
            />-->
            <el-select v-model="contentValue" placeholder="请选择" popper-class="chooseType">
              <el-option
                v-for="(v,i) in options"
                :key="i"
                :label="v"
                :value="v"
              />
            </el-select>
          </div>
        </template>
        <div class="title">
          <div class="triangle" />
          {{ `${contentValue}入粤人数变化` }}
        </div>
        <hongkong-line-chart :data="exemptData" :value="contentValue" />
      </div>
      <div class="bottom">
        <div class="title">
          <div class="triangle" />
          {{ `${contentValue}风险值随时间变化` }}
        </div>
        <hongkong-line :data="exemptData" :risk="riskData" :value="contentValue" />
      </div>
    </div>
  </div>
</template>

<script>
import HongkongLineChart from './HongkongLineChart'
import HongkongLine from './HongkongLine'
import HongkongMap from './HongkongMap'

import { xgRisk } from '@/api/input-forecast'

export default {
  components: {
    HongkongLineChart,
    HongkongLine,
    HongkongMap
  },
  data() {
    return {
      picked: 'mrxz',
      // timeValue: '',
      contentValue: '全部豁免人员',
      options: ['全部豁免人员', '跨境司机', '商务公务人员', '船员', '跨境学员'],
      rightTopData: [
        {
          title: '跨境司机体温异常人数',
          num: 0,
          bottomContent: 5
        },
        {
          title: '非定期往返跨境司机人数',
          num: 0,
          bottomContent: 5
        },
        {
          title: '豁免船员体温异常人数',
          num: 0,
          bottomContent: 5
        },
        {
          title: '跨境学员体温异常人数',
          num: 0,
          bottomContent: 5
        }
      ],
      exemptData: [],
      riskData: {},
      lastData: {},
      // timeData: { begin: '2020-11-20', end: '2020-12-04' },
      mapArea: []
    }
  },
  watch: {
    // exemptData: {
    //   deep: true,
    //   handler() {
    //     this.getData()
    //   }
    // },
    // timeValue() {
    //   this.timeData.begin = this.timeValue[0]
    //   this.timeData.end = this.timeValue[1]
    //   console.log(this.timeData)
    //   this.getData() // 后台暂无数据，传默认值，有数据取消注释直接更新
    // },
    picked() {
      this.getData()
      // console.log(this.lastData)
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      xgRisk(
        // this.timeData
      ).then(res => {
        // console.log(res)
        this.exemptData = res.data
        this.riskData = res.other
        // this.lastData = res.data[res.data.length-1]
        if (this.picked === 'mrxz') { // 暂未排序。直接获得最后一个的数据
          this.lastData = res.data[res.data.length - 1].new_cases_area
          this.mapArea = [0, ...res.data[res.data.length - 1].new_cases_area_4]
          // console.log('mapArea------>', this.mapArea)
        } else if (this.picked === 'ljxz') {
          this.lastData = res.data[res.data.length - 1].cumulative_area
          this.mapArea = [0, ...res.data[res.data.length - 1].cumulative_area_4]
          // console.log('mapArea------>', this.mapArea)
        } else if (this.picked === 'kjsj') {
          this.lastData = res.data[res.data.length - 1].driver_area
          this.mapArea = [0, ...res.data[res.data.length - 1].driver_area_4]
          // console.log('mapArea------>', this.mapArea)
        } else if (this.picked === 'kjxy') {
          this.lastData = res.data[res.data.length - 1].student_area
          this.mapArea = [0, ...res.data[res.data.length - 1].student_area_4]
          // console.log('mapArea------>', this.mapArea)
        }
        // console.log(this.lastData)
        this.rightTopData[0].num = res.data.reduce((sum, val) => { return sum + val.ht_driver }, 0)
        this.rightTopData[1].num = res.data.reduce((sum, val) => { return sum + val.interval_3days }, 0)
        this.rightTopData[2].num = res.data.reduce((sum, val) => { return sum + val.ht_boatman }, 0)
        this.rightTopData[3].num = res.data.reduce((sum, val) => { return sum + val.ht_student }, 0)
        this.rightTopData[0].bottomContent = res.data.reduce((sum, val) => { return sum + val.ht_driver }, 0) / res.data.reduce((sum, val) => { return sum + val.driver }, 0) * 100
        this.rightTopData[1].bottomContent = res.data.reduce((sum, val) => { return sum + val.interval_3days }, 0) / res.data.reduce((sum, val) => { return sum + val.driver }, 0) * 100
        this.rightTopData[2].bottomContent = res.data.reduce((sum, val) => { return sum + val.ht_boatman }, 0) / res.data.reduce((sum, val) => { return sum + val.boatman }, 0) * 100
        this.rightTopData[3].bottomContent = res.data.reduce((sum, val) => { return sum + val.ht_student }, 0) / res.data.reduce((sum, val) => { return sum + val.student }, 0) * 100
        // console.log('rightTopData------>',this.rightTopData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.containter{
  padding: getHeight(1) getWidth(1);
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #171833;
  .left{
    flex: 1;
    .leftTop {
      position: absolute;
      top: getHeight(12);
      left: 25%;
      transform: translateX(-50%);
      z-index: 3;
      label {
        display: inline-block;
        width: getWidth(19.25);
        height: getHeight(3.75);
        text-align: center;
        line-height: getHeight(3.75);
        background-color: rgba(0, 116, 153, 0.17);
        border: solid 0.13rem rgba(0, 232, 255, 0.44);
        opacity: 0.8;
        font-family: PingFangSC-Semibold;
        font-size: $nomalSize;
        color: rgba(255, 255, 255, 0.8);
        cursor: pointer;
      }
      input:checked:nth-of-type(1) ~ label:nth-of-type(1) {
        border: solid 0.13rem #00e8ff;
        background-color: rgba(0, 232, 255, 0.12);
        color: #00e8ff;
      }
      input:checked:nth-of-type(2) ~ label:nth-of-type(2) {
        border: solid 0.13rem #00e8ff;
        background-color: rgba(0, 232, 255, 0.12);
        color: #00e8ff;
      }
      input:checked:nth-of-type(3) ~ label:nth-of-type(3) {
        border: solid 0.13rem #00e8ff;
        background-color: rgba(0, 232, 255, 0.12);
        color: #00e8ff;
      }
      input:checked:nth-of-type(4) ~ label:nth-of-type(4) {
        border: solid 0.13rem #00e8ff;
        background-color: rgba(0, 232, 255, 0.12);
        color: #00e8ff;
      }
      input[type="radio"] {
        display: none;
      }
    }
    .leftBottom{
      font-family: PingFangSC-Semibold;
      font-size: $nomalSize;
      // line-height: $nomalSize;
      color: rgba(255, 255, 255, 0.8);
      text-align: center;
      // margin-left: getWidth(20);
      margin-top: getWidth(-5);
      :nth-child(1){
        width: getWidth(8);
        // height: getHeight(3.75);
        background-color: rgba(0, 215, 236, 0.1);
        // border: solid 0.13rem #f9cf46;
        // opacity: 0.5;
        color: rgba(0, 215, 236, 1);
        display: inline-block;
      }
      :nth-child(2){
        width: getWidth(8);
        // height: getHeight(3.75);
        background-color: rgba(#f9cf46,0.1);
        // border: solid 0.13rem #f9cf46;
        // opacity: 0.5;
        color: #f9cf46;
        display: inline-block;
      }
      :nth-child(3){
        width: getWidth(8);
        // height: getHeight(3.75);
        background-color: rgba(255, 90, 0, 0.1);
        // border: solid 0.13rem #f9cf46;
        // opacity: 0.5;
        display: inline-block;
        color: rgba(255, 90, 0, 1);
      }
      :nth-child(4){
        width: getWidth(8);
        // height: getHeight(3.75);
        background-color: rgba(#fd0000, 0.1);
        // border: solid 0.13rem #f9cf46;
        // opacity: 0.5;
        display: inline-block;
        color: #fd0000;
      }
      :nth-child(5){
        width: getWidth(8);
        // height: getHeight(3.75);
        background-color: rgba(#f50b51, 0.1);
        // border: solid 0.13rem #f9cf46;
        // opacity: 0.5;
        display: inline-block;
        color: #f50b51;
      }
    }
  }
  .right{
    flex: 1;
    display: flex;
    flex-direction: column;
    // background-color: #171833;
    margin-right:getWidth(2.13);
    .top{
      flex: 1;
      display:flex;
      margin-top:getHeight(2.13);
      margin-bottom:getHeight(1.5);
      .content{
        flex: 1;
        background-color: #212342;
        margin-right: getWidth(1.13);
        &:nth-child(4){
          margin-right: 0;
        }
        .title{
          font-family: PingFangSC-Medium;   //175 225
          font-size: getFontSize(1.75);
          color: rgba(255, 255, 255, 0.8);
          margin-top:getHeight(1.75);
          margin-left:getWidth(1.75);
        }
        .num{
          font-family: ds_digi;
          margin-left:getWidth(1.75);
          margin-top:getHeight(1);
          margin-bottom:getHeight(1);
          font-size: getFontSize(3.75);
          color: #ff5a07;
        }
        .bottomContent{
          font-family: Helvetica;
          margin-left:getWidth(1.75);
          font-size: getFontSize(1.5);
          color: #ffffff;
        }
      }
    }
    .center{
      flex: 4;
      background-color: #212342;

      .block{
        margin-top: getHeight(1.5);
        margin-left: getWidth(5);
        //text-align: center;
        span{
          color: #ffffff;
          font-size: $itemTitleSize;
          margin-left: getWidth(1);
          margin-right: getWidth(1);
        }
        margin-bottom: getHeight(2);
        ::v-deep {
          .el-input__inner {
            color: #fff;
            margin-right: getWidth(1);
            background-color: #171833;
            .el-range-input{
              background-color: #171833;
            }
          }

          .el-select .el-input.is-focus .el-input__inner,
          .el-select .el-input.is-focus .el-input__inner,
          .el-input.is-active .el-input__inner, .el-input__inner:focus {
            border-color: #171833;
          }
        }
      }
      // widows: 100%;
      // height: 100%;
    }
    .bottom{
      flex: 4;
      background-color: #212342;
    }
    .center,.bottom{
      .title{
        font-size: $itemTitleSize;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-bottom: getHeight(2);
        margin-top: getHeight(2);
        margin-left: getWidth(3.31);
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
  }
}
</style>
<style lang="scss" >
//.chooseTime{
//  background-color: #212342;
//  color: #fff;
//  .el-date-table td.in-range div, .el-date-table td.in-range div:hover, .el-date-table.is-week-mode .el-date-table__row.current div, .el-date-table.is-week-mode .el-date-table__row:hover div
//  {
//    background-color: #171833;
//  }
//  .el-picker-panel__icon-btn{
//    color: #ffffff;
//  }
//}
.chooseType{
  background-color: #212342;
  color: #fff;
  .el-select-dropdown__item.hover, .el-select-dropdown__item:hover{
    background-color: #171833;
  }
}
.el-select-dropdown__item {
  color: #fff;
}
.el-select-dropdown__item.selected {
  color: #00e8ff;
}
</style>
