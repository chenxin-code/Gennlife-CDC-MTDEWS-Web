<template>
  <div class="container">
    <fragment>
      <!-- 底部操作栏 -->
      <div class="bottom-operation">
        <div class="item">低风险</div>
        <div class="item">中风险</div>
        <div class="item">高风险</div>
        <div class="item">超高风险</div>
      </div>
    </fragment>
    <div class="left">
      <div class="l-top">
        <div class="title">
          <div class="triangle" />
          未来30天{{ leftTopParam.country }}本地疫情走势
        </div>
        <line-chart :data="leftTopData" />
      </div>
      <div class="l-center">
        <div class="title">
          <div class="triangle" />
          当日境外入粤人员管控情况
        </div>
        <el-carousel
          indicator-position="none"
          arrow="never"
          direction="vertical"
          @change="leftCenterChange"
        >
          <el-carousel-item
            v-for="item in leftCenterParam.pageCount"
            :key="item"
          >
            <item-list1 :data="leftCenterData" :config="leftCenterConfig" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="l-bottom">
        <div class="title">
          <div class="triangle" />
          累计境外入粤人员管控情况
        </div>
        <el-carousel
          indicator-position="none"
          arrow="never"
          direction="vertical"
          @change="leftCenterChange"
        >
          <el-carousel-item
            v-for="item in leftCenterParam.pageCount"
            :key="item"
          >
            <item-list1 :data="leftBottomData" :config="leftBottomConfig" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="center">
      <true-scatter-map
        :data="rightBottomData"
        :country="leftTopParam.country"
        @click="mapClick"
      />
      <div class="bottom">
        <div class="title">
          <div class="triangle" />
          未来两周境外输入广东省人数统计
        </div>
        <compact-bar :data="centerBottomData" />
      </div>
    </div>

    <div class="right">
      <div class="r-top">
        <div class="title">
          <div class="triangle" />
          酒店上报阳性率
        </div>
        <div class="search-item">
          <el-select
            v-model="rightTopCurrentData.city"
            placeholder="请选择城市"
            @change="choiceCity"
          >
            <el-option
              v-for="item in uniq(rightTopFitrer.city)"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
          <el-select
            v-model="rightTopCurrentData.hotel_name"
            placeholder="请选择酒店"
            @change="choiceData"
          >
            <el-option
              v-for="item in uniq(rightTopFitrer.hotel_name)"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>

        <div class="content">
          <div class="chart-item">
            <ring-chart
              :data="[
                { name: '阳性人数', value: rightTopCurrentData.man_positive },
                { name: '检测人数', value: rightTopCurrentData.man_all }
              ]"
            />
            入境工作人员
          </div>
          <div class="chart-item">
            <ring-chart
              :data="[
                { name: '阳性人数', value: rightTopCurrentData.man_work_y },
                { name: '检测人数', value: rightTopCurrentData.man_work }
              ]"
            />
            酒店工作人员
          </div>
          <div class="chart-item">
            <ring-chart
              :data="[
                { name: '阳性人数', value: rightTopCurrentData.sample_num_y },
                { name: '检测人数', value: rightTopCurrentData.sample_num }
              ]"
            />
            隔离酒店环境样本
          </div>
        </div>
      </div>
      <div class="r-bottom">
        <div class="title">
          <div class="triangle" />
          各国入粤风险排名
        </div>

        <div class="search-content-item">
          <div class="label">
            <div class="label-left">过去T天内的风险值（1，21）</div>
            <div class="label-right">{{ rightBottomParam.t }}</div>
          </div>
          <el-slider
            v-model="rightBottomParam.t"
            :min="1"
            :max="21"
            :step="1"
          />
        </div>

        <item-list1
          :sort="true"
          :data="rightBottomData"
          :config="rightBottomConfig"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RingChart from './components/RingChart'
import LineChart from './components/LineChart'
import ItemList1 from './components/ItemList1'
import CompactBar from './components/CompactBar'
import TrueScatterMap from './components/TrueScatterMap'
import { uniq } from 'lodash'

import {
  accumulateCase, // 高风险国家未来累计感染人数趋势预测
  overseasRiskControl, // 境外输入风险评估及分级
  riskAssessment, // 境外输入风险评估
  hotelIsolation, // 酒店隔离情况信息
  inboundNum // 未来两周境外输入人数
} from '@/api/input-forecast'

// import { random } from 'lodash'

export default {
  components: {
    RingChart,
    LineChart,
    ItemList1,
    CompactBar,
    TrueScatterMap
  },
  data() {
    return {
      model: '',

      leftTopParam: { country: '美国' },
      leftTopData: {},
      leftCenterData: [],
      leftCenterConfig: [
        { label: '境外国家', field: 'country' },
        { label: '输入人数', field: 'import_cases' },
        { label: '集中隔离', field: 'c_cases' },
        { label: '居家隔离', field: 'f_cases' },
        { label: '解除集中隔离', field: 'no_c_cases' },
        { label: '解除居家隔离', field: 'no_f_cases' }
      ],
      leftBottomData: [],
      leftBottomConfig: [
        { label: '境外国家', field: 'country' },
        { label: '输入人数', field: 'all_import_cases' },
        { label: '集中隔离', field: 'all_c_cases' },
        { label: '居家隔离', field: 'all_f_cases' },
        { label: '解除集中隔离', field: 'all_no_c_cases' },
        { label: '解除居家隔离', field: 'all_no_f_cases' }
      ],
      leftCenterParam: {
        t: 14,
        pageCount: 1
      },

      rightBottomParam: {
        t: 14
      },
      rightBottomData: [], // classgrade:超高风险name:香港risk:100
      rightBottomConfig: [
        { label: '国家', field: 'name' },
        { label: '风险值', field: 'risk' },
        { label: '风险等级', field: 'classgrade' }
      ],
      centerBottomData: [],

      allRightTopData: [],
      rightTopFitrer: {
        city: [],
        hotel_name: []
      },
      rightTopCurrentData: {
        city: '',
        hotel_name: '',
        man_all: 0,
        man_positive: 0,
        man_work: 0,
        man_work_y: 0,
        sample_num: 0,
        sample_num_y: 0
      }
    }
  },
  watch: {
    rightBottomParam: {
      deep: true,
      handler() {
        this.initRightBottom()
      }
    }
  },
  mounted() {
    this.initLeftTop()
    this.initLeftCenter()
    this.initCenterBottom()
    this.initRightBottom()
    this.initRightTop()

    // let timer = null

    // // 大屏动态事件
    // const moveFunc = () => {
    //   if (timer) return
    //   timer = setInterval(() => {
    //     // 右上角 更改数据
    //     const randomIndex = random(0, this.allRightTopData.length - 1)
    //     this.rightTopCurrentData = Object.assign(
    //       {},
    //       this.allRightTopData[randomIndex]
    //     )

    //     // 右下角 更改数据
    //     this.rightBottomParam.t = random(1, 21)

    //     // 地图数据
    //     this.leftTopParam.country = this.rightBottomData[
    //       random(0, this.rightBottomData.length - 1)
    //     ].name
    //     this.initLeftTop()
    //   }, 5000)
    // }
    // // moveFunc()

    // // 鼠标移动， 停止移动
    // document.onmousemove = () => {
    //   clearInterval(timer)
    //   timer = null
    //   setTimeout(() => {
    //     moveFunc()
    //   }, 5000)
    // }

    // // 销毁动态事件
    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(timer)
    //   timer = null
    // })
  },
  methods: {
    uniq,
    initLeftTop() {
      accumulateCase(this.leftTopParam).then(res => {
        this.leftTopData = res.data[0]
      })
    },
    initLeftCenter() {
      overseasRiskControl(this.leftCenterParam).then(res => {
        this.leftCenterData = res.data
        this.leftBottomData = res.data
        this.leftCenterParam.pageCount = res.pagination.pages
      })
    },
    initCenterBottom() {
      inboundNum({}).then(res => {
        this.centerBottomData = res.data
      })
    },
    initRightBottom() {
      riskAssessment(this.rightBottomParam).then(res => {
        this.rightBottomData = res.data
      })
    },
    initRightTop() {
      hotelIsolation({}).then(res => {
        this.allRightTopData = res.data
        this.rightTopFitrer.city = res.data.map(v => v.city)
        this.rightTopFitrer.hotel_name = res.data.map(v => v.hotel_name)
        this.rightTopCurrentData = Object.assign({}, res.data[0])
      })
    },
    choiceCity() {
      let index = -1
      for (let i = 0; i < this.allRightTopData.length; i++) {
        if (this.allRightTopData[i].city === this.rightTopCurrentData.city) {
          index = i
          break
        }
      }
      this.rightTopCurrentData = Object.assign(
        {},
        this.allRightTopData[index]
      )
    },
    choiceData() {
      let index = -1
      for (let i = 0; i < this.allRightTopData.length; i++) {
        if (this.allRightTopData[i].city === this.rightTopCurrentData.city && this.allRightTopData[i].hotel_name === this.rightTopCurrentData.hotel_name) {
          index = i
          break
        }
      }
      if (index === -1) {
        this.rightTopCurrentData = {
          city: '',
          hotel_name: '',
          man_all: 0,
          man_positive: 0,
          man_work: 0,
          man_work_y: 0,
          sample_num: 0,
          sample_num_y: 0
        }
        return
      }
      this.rightTopCurrentData = Object.assign(
        {},
        this.allRightTopData[index]
      )
    },
    // 切换下一页
    leftCenterChange(index) {
      this.leftCenterParam.page = index + 1
      this.initLeftCenter()
    },
    mapClick(country) {
      this.leftTopParam.country = country
      this.initLeftTop()
    }
  }
}
</script>

<style lang="scss" scoped>
$space: 0.8rem;
::v-deep{
  .bottom-operation {
  position: absolute;
  z-index: 1;
  display: flex;
  bottom: getHeight(4.56);
  left: 50%;
  transform: translateX(-50%);

  > .item + .item {
    margin-left: getWidth(0.44);
  }
  > .item {
    width: getWidth(7.5);
    height: getHeight(1.88);
    background: rgba(249, 207, 70, 0.1);

    text-align: center;
    line-height: getHeight(1.88);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;

    &:nth-child(1) {
      border: getWidth(0.6) solid rgba(41, 170, 225,.6);
      color: rgba(41, 170, 225, 1);
    }
    &:nth-child(2) {
      border: getWidth(0.6) solid rgba(196,181,12,.6);
      color:rgba(196,181,12,1);
    }
    &:nth-child(3) {
      border: getWidth(0.6) solid rgba(249,207,70, .6);
      color:rgba(249,207,70, 1);
    }
    &:nth-child(4) {
      border: getWidth(0.6) solid rgba(245,43,123 , .6);
      color: rgba(245,43,123 , 1);
    }
  }
}
}

.container {
  padding: 0.9rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;

  > div + div {
    margin-left: 0.8rem;
  }

  > .left {
    // width: 22.25rem;
    flex: 22.25;
    height: 100%;
  }

  .center {
    // width: 71.88rem;
    flex: 71.88;
    height: 100%;
  }

  .right {
    // width: 22.25rem;
    flex: 22.25;
    height: 100%;
  }
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div + div {
    margin-top: $space;
  }

  .l-top,
  .l-center,
  .l-bottom {
    width: 100%;
    background: #212342;
    border-radius: 0.5rem;

    padding: 0.8rem;
  }

  .l-top {
    height: 18.38rem;
    flex: 18.38;
    display: flex;
    flex-direction: column;
    > .echarts {
      width: 100%;
      height: 100%;
    }
  }

  .l-center {
    height: 17rem;
    flex: 17;
    display: flex;
    flex-direction: column;
    .title {
      margin-bottom: 0.7rem;
    }
    .diff-bar {
      height: 100%;
    }
    ::v-deep {
      .el-carousel {
        height: 100%;
      }
      .el-carousel__container {
        height: 100%;
        .el-carousel__item {
          height: 100%;
        }
      }
    }
  }

  .l-bottom {
    height: 22.94rem;
    flex: 22.94;
    display: flex;
    flex-direction: column;
    .title {
      margin-bottom: 0.7rem;
    }
    .diff-bar {
      height: 100%;
    }
    ::v-deep {
      .el-carousel {
        height: 100%;
      }
      .el-carousel__container {
        height: 100%;
        .el-carousel__item {
          height: 100%;
        }
      }
    }
  }
}

.center {
  position: relative;
  .bottom {
    bottom: 0;
    position: absolute;
    width: 100%;
    height: 18.38rem;
    background: #212342;
    border-radius: 0.5rem;
    padding: 0.8rem;

    > .echarts {
      width: 100%;
      height: 100%;
    }
  }
}

.right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > div + div {
    margin-top: $space;
  }

  .r-top,
  .r-bottom {
    width: 100%;
    background: #212342;
    border-radius: 0.5rem;
    padding: 0.8rem;
  }

  .r-top {
    height: 16rem;
    // flex: none;
    display: flex;
    flex-direction: column;
    .title {
      flex: none;
    }

    .search-item {
      margin-top: 1.2rem;
      display: flex;
      justify-content: space-around;
      flex: none;
      ::v-deep {
        .el-input__inner {
          width: 9.19rem;
          height: 1.88rem;
          background: #171833;
          border: none;
          font-size: 1rem;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #ffffff;
          line-height: 2.75rem;
        }
        .el-select .el-input .el-select__caret {
          color: rgba(0, 232, 255, 1);
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .el-select-dropdown {
          background: #020423;
          border: none;
        }
        .el-select-dropdown__item {
          color: #fff;
        }
        .el-select-dropdown__item.hover,
        .el-select-dropdown__item:hover {
          background-color: rgba(0, 232, 255, 0.2);
        }
        .el-popper[x-placement^="bottom"] .popper__arrow {
          border-bottom-color: #020423;
        }
        .el-popper[x-placement^="bottom"] .popper__arrow::after {
          border-bottom-color: #020423;
        }
      }
    }

    .content {
      display: flex;
      width: 100%;
      height: 100%;
      margin-top: 2rem;

      .chart-item + .chart-item {
        margin-left: 2.75rem;
      }
      .chart-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        white-space: nowrap;
        width: calc((22.25rem - 0.8rem * 2 - 2.75rem * 2) / 3);
        // height: calc((22.25rem - 0.8rem * 2) / 3);
        height: 100%;

        > .echarts {
          width: 100%;
          height: 100%;
        }

        font-size: 0.75rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }

  .r-bottom {
    height: 43.19rem;
    // height: 100%;
    flex: 43.29;
    display: flex;
    flex-direction: column;

    .search-content-item {
      margin-top: 1.2rem;
      width: 100%;
      > .label {
        display: flex;
        justify-content: space-between;
        font-size: 0.88rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(#ffffff, 0.9);
      }

      // 修改滑动条样式
      ::v-deep {
        .el-slider__runway {
          width: 100%;
          height: 0.2rem;
        }
        .el-slider__bar {
          width: 13.06rem;
          height: 0.2rem;
          border-radius: 0.38rem;
          background: linear-gradient(
              135deg,
              #f5e647,
              #ffea00,
              #ffa83b,
              #fd9617
            )
            0/400% 400%;
          animation: move 2s infinite;
        }
        .el-slider__button-wrapper {
          width: 0.8rem;
          height: 0.8rem;
          top: 50%;
          margin-top: -0.4rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .el-slider__button {
          width: 0.4rem;
          height: 0.4rem;
          background: linear-gradient(102deg, #ffea00 0%, #ffa83b 100%);
          box-shadow: 0rem 0rem 0.25rem 0rem rgba(255, 234, 0, 0.3);
          border: none;
        }
        .el-slider__button.hover {
          transform: scale(2.2);
        }
      }
    }
  }
}

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
</style>
