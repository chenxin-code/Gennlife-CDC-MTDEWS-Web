<template>
  <div class="content">
    <!-- tab栏 -->
    <el-tabs :value="activeName" @tab-click="handleClick">
      <el-tab-pane label="阳性风险人员" name="positive" />
      <el-tab-pane label="有异常未检测人员" name="unusual" />
      <el-tab-pane label="核酸检测阴性人员" name="negative" />
    </el-tabs>

    <!-- tab内容 -->
    <div class="tab-header">
      <!-- 循环搜索条件 -->
      <template v-for="(v, i) in searchs">
        <template v-if="v.type === 'select'">
          <el-select
            :key="i"
            v-model="param[v.field]"
            class="select"
            :placeholder="param[v.placeholder]"
            :popper-append-to-body="false"
            @change="searchFetch"
          >
            <el-option
              v-for="item in allSearch[v.searchArr]"
              :key="item[v.valueName]"
              :label="item[v.labelName]"
              :value="item[v.valueName]"
            />
          </el-select>
        </template>
      </template>
    </div>

    <!-- 详情页面 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :before-close="close"
      class="motaikuang5"
      :append-to-body="true"
    >
      <aggregation-datail :data="dialogVal" />
    </el-dialog>

    <!-- 数据内容 -->
    <div class="tab-content">
      <!-- 表格 -->
      <el-table
        :data="tableData"
        height="100%"
        :cell-style="changeColor"
        class="tableFlow"
      >
        <!-- 循环列表 -->
        <template v-for="(v, i) in Object.entries(fields)">
          <!-- 自定义渲染 -->
          <template v-if="typeof v[1] === 'object' && v[1].label === '操作'">
            <el-table-column :key="i" :label="v[1].label" fixed="right">
              <template slot-scope="scope">
                <component
                  :is="v[1].render"
                  :row="scope.row"
                  :click="details"
                />
              </template>
            </el-table-column>
          </template>
          <template v-else-if="typeof v[1] === 'object'">
            <el-table-column
              v-if="v[1].hasOwnProperty('render')"
              :key="i"
              :type="v[1].type"
              :index="v[1].index"
              :column-key="v[1].columnKey"
              :label="v[1].label"
              :prop="v[1].prop"
              :width="v[1].width"
              :min-width="v[1].minWidth"
              :fixed="v[1].fixed"
              :render-header="v[1].renderHeader"
              :sortable="v[1].sortable"
              :sort-method="v[1].sortMethod"
              :sort-by="v[1].sortBy"
              :sort-orders="v[1].sortOrders"
              :resizable="v[1].resizable"
              :formatter="v[1].formatter"
              :show-overflow-tooltip="v[1].showOverflowTooltip"
              :align="v[1].align"
              :header-align="v[1].headerAlign"
            >
              <template slot-scope="scope">
                <component
                  :is="v[1].render"
                  :row="scope.row"
                  :click="details"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="!v[1].hasOwnProperty('hidden') || !v[1].hidden"
              :key="i"
              :type="v[1].type"
              :index="v[1].index"
              :column-key="v[1].columnKey"
              :label="v[1].label"
              :prop="v[1].prop"
              :width="v[1].width"
              :min-width="v[1].minWidth"
              :fixed="v[1].fixed"
              :render-header="v[1].renderHeader"
              :sortable="v[1].sortable"
              :sort-method="v[1].sortMethod"
              :sort-by="v[1].sortBy"
              :sort-orders="v[1].sortOrders"
              :resizable="v[1].resizable"
              :formatter="v[1].formatter"
              :show-overflow-tooltip="v[1].showOverflowTooltip"
              :align="v[1].align"
              :header-align="v[1].headerAlign"
              :click="details"
            />
          </template>

          <!-- 普通表格项 -->
          <el-table-column v-else :key="i" :prop="v[0]" :label="v[1]" />
        </template>
      </el-table>

      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          background
          :current-page="page"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="limit"
          layout="total, ->, prev, pager, next, sizes,jumper"
          :total="totalCount"
          popper-class="page-size-popper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDictionaryList,
  getImportantList,
  getPersonnelInfo
} from '@/api/real-api'
import AggregationTest from './AggregationTest'

import { dataDesensitization } from '@/utils/index'

// 默认进入tab
const activeName = 'positive'

const typeCode = {
  1: {
    field: 'positive',
    label: '阳性风险人员',
    anotherParam: { testResult: '阳性' }
  },
  2: {
    field: 'unusual',
    label: '有异常未检测人员',
    anotherParam: { isResult: 1 }
  },
  3: {
    field: 'negative',
    label: '核酸检测阴性人员',
    anotherParam: { testResult: '阴性' }
  }
}

// const typeCode1 = {
//   0: { crowdCode: "1", crowdName: "来自香港的货车司机" },
//   1: { crowdCode: "2", crowdName: "港口口岸工作人员" },
//   2: { crowdCode: "3", crowdName: "从事冷链加工和销售人员" },
//   3: { crowdCode: "4", crowdName: "来自高风险地区人员" },
//   4: { crowdCode: "5", crowdName: "解除医学观察人员" },
//   5: { crowdCode: "6", crowdName: "幼儿、学生生" },
//   6: { crowdCode: "7", crowdName: "密切接触者" },
//   7: { crowdCode: "8", crowdName: "入境人员" }
// };

// 页面配置
const singleObj = {
  fields: {
    image: {
      label: '照片',
      render: {
        functional: true,
        props: {
          row: {}
        },
        render(createElement, context) {
          return <img src={context.props.row.image} />
        }
      }
    },
    name: '姓名',
    gender: '性别',
    age: '年龄',
    cardType: '证件类型',
    cardId: {
      label: '证件号码',
      render: {
        functional: true,
        props: {
          row: {}
        },
        render(createElement, context) {
          return (
            <span>{dataDesensitization(context.props.row.cardId, 10, 6)}</span>
          )
        }
      }
    },

    enterDate: {
      label: '入境时间',
      prop: 'enterDate'
    },
    leaveDate: {
      label: '出境时间',
      prop: 'leaveDate'
    },

    school: {
      label: '所属学校',
      prop: 'school'
    },
    className: {
      label: '所属班级',
      prop: 'className'
    },

    simpleNo: {
      label: '冷链名称',
      prop: 'simpleNo'
    },

    // TODO
    // simpleNo: {
    //   label: "冷链名称",
    //   prop: "simpleNo"
    // },

    hospital: '就诊医院',
    testDate: '检测时间',
    testResult: '检测结果',
    symptom: '临床症状',
    medicineEx: {
      label: '购药记录',
      render: {
        functional: true,
        props: {
          row: {}
        },
        render(createElement, context) {
          return (
            <span>
              {String(context.props.row.medicineEx) === '0' ? '有' : '无'}
            </span>
          )
        }
      }
    },
    operation: {
      label: '操作',
      fixed: 'right',
      render: {
        functional: true,

        props: {
          row: {},
          click: Function
        },
        render(createElement, context) {
          return (
            <div
              style='color:#35EAFF;cursor:pointer;'
              onClick={() => {
                context.props.click(context.props.row)
              }}
            >
              查看详情
            </div>
          )
        }
      }
    }
  },
  api: getImportantList,
  searchs: [
    {
      field: 'area',
      type: 'select',
      placeholder: '选择所在区',
      searchArr: 'areaList',
      labelName: 'areaName',
      valueName: 'areaCode'
    },
    {
      field: 'country',
      type: 'select',
      placeholder: '选择国籍',
      searchArr: 'countryList',
      labelName: 'countryCode',
      valueName: 'countryCode'
    },
    {
      field: 'gender',
      type: 'select',
      placeholder: '选择性别',
      searchArr: 'ganderList',
      labelName: 'ganderName',
      valueName: 'ganderCode'
    },
    {
      field: 'crowdCode',
      type: 'select',
      placeholder: '选择人群分类',
      searchArr: 'crowdList',
      labelName: 'crowdName',
      valueName: 'crowdCode'
    },
    {
      field: 'symptomCode',
      type: 'select',
      placeholder: '临床症状',
      searchArr: 'diseaseList',
      labelName: 'symptomName',
      valueName: 'symptomCode'
    }
  ]
}

// 页面配置
let pageConfig = Object.values(typeCode).reduce((a, b) => {
  return { ...a, [b.field]: { ...singleObj, anotherParam: b.anotherParam }}
}, {})

export default {
  components: {
    'aggregation-datail': AggregationTest
  },
  props: {
    type: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      activeName, // 活动tab
      dialogVisible: false,
      dialogVal: {},
      page: 1, // 当前页
      limit: 10, // 一页条数
      totalCount: 0, // 总条数
      tableData: [], // 列表数据
      fields: pageConfig[activeName].fields, // 列表展示数据
      searchs: pageConfig[activeName].searchs, // 列表搜索展示数据
      param: pageConfig[activeName].searchs.reduce((a, b) => {
        return { ...a, [b.field]: '' }
      }, {}), // 搜索条件
      allSearch: {} // 所有搜索条件
    }
  },
  watch: {
    type() {
      this.param.crowdCode = this.type
      this.initConfig()
      this.fetchData()
    }
  },
  mounted() {
    this.initSearch()
    if (this.type) {
      this.param.crowdCode = this.type
      this.initConfig()
      this.fetchData()
    }
    // this.details()
  },
  methods: {
    close() {
      this.dialogVisible = false
    },
    details(data) {
      const { name, cardId } = data
      getPersonnelInfo({ name, cardId }).then(res => {
        this.dialogVal = res.data
        this.dialogVisible = true
      })
    },
    initSearch() {
      getDictionaryList({}).then(res => {
        Object.keys(res.data).map(v => {
          this.allSearch[v] = res.data[v]
        })
      })
    },
    fetchData() {
      const api = pageConfig[this.activeName].api
      const anotherParam = pageConfig[this.activeName].anotherParam
      const { page, limit, param } = this
      api({ page, limit, ...param, ...anotherParam }).then(res => {
        this.tableData = res.data
        this.totalCount = res.totalCount
      })
    },
    handleClick({ name }) {
      this.activeName = name
      this.$set(this, 'fields', pageConfig[this.activeName].fields)
      this.$set(this, 'searchs', pageConfig[this.activeName].searchs)
      this.$set(
        this,
        'param',
        pageConfig[this.activeName].searchs.reduce((a, b) => {
          return { ...a, [b.field]: '' }
        }, {})
      )
      this.page = 1
      this.limit = 10
      this.fetchData()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    },
    searchFetch() {
      this.page = 1
      this.fetchData()
    },
    changeColor(cell) {
      if (cell.column.label === '是否确诊' && cell.row.result === '是') {
        return 'color:#FF4949'
      }
    },
    initConfig() {
      switch (String(this.type)) {
        case '1':
          // 页面配置
          singleObj.fields.enterDate.hidden = false
          singleObj.fields.leaveDate.hidden = false
          break
        case '3':
          // 页面配置
          singleObj.fields.simpleNo.hidden = false
          break
        case '6':
          // 页面配置
          singleObj.fields.className.hidden = false
          singleObj.fields.school.hidden = false
          break
        case '7':
          // 页面配置
          singleObj.fields.className.hidden = false
          break
        default:
          // 页面配置
          singleObj.fields.enterDate.hidden = true
          singleObj.fields.leaveDate.hidden = true
          singleObj.fields.className.hidden = true
          singleObj.fields.school.hidden = true
          singleObj.fields.simpleNo.hidden = true
          break
      }

      // 页面配置 重新生成
      pageConfig = Object.values(typeCode).reduce((a, b) => {
        return {
          ...a,
          [b.field]: { ...singleObj, anotherParam: b.anotherParam }
        }
      }, {})
    }
  }
}
</script>

<style lang="scss" scoped>
.detailsBox {
  width: 75rem;
  height: 40rem;
  background-color: #171833;
}

.details ::v-deep .el-dialog {
  margin: auto;
  width: 75rem;
  height: 40rem;
  padding: 0 !important;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 3.13rem 6.63rem;
}

.content {
  // width: 106.75rem;
  // height: 55.63rem;
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  background: #212342;
  display: flex;
  flex-direction: column;

  .tab-header {
    > .select + .select {
      margin-left: 0.88rem;
    }
  }

  .tab-content {
    margin-top: 1.2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .pages {
      margin-top: 1.2rem;
    }
  }

  /** 修改element 组件样式 */
  ::v-deep {
    /** tabs 样式 */
    .el-tabs {
      // height: 100%;
      display: flex;
      flex-direction: column;
    }
    .el-tabs__content {
      // height: 100%;
    }
    .el-tab-pane {
      // height: 100%;
      display: flex;
      flex-direction: column;
    }
    .el-tabs__item {
      font-size: 1rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #fefefe;
    }
    .el-tabs__nav-wrap::after {
      background-color: rgba(128, 128, 128, 1);
    }
    .el-tabs__item.is-active {
      color: rgba(25, 210, 255, 1);
    }
    .el-tabs__active-bar {
      background-color: rgba(25, 210, 255, 1);
    }
    /** select 样式 */
    .tab-header {
      flex: none;
      .el-input__inner {
        width: 10.56rem;
        height: 2.75rem;
        background: #020423;
        border-radius: 0.25rem;
        border: none;
        font-size: 1rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 2.75rem;
      }
      .el-select .el-input .el-select__caret {
        color: rgba(0, 232, 255, 1);
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
    /** table 样式 */
    .el-table {
      background: transparent;
      color: #fff;
    }
    .el-table thead {
      color: #fff;
      background: #171833;
    }
    .el-table thead td,
    .el-table thead th.is-leaf {
      border-bottom: none;
    }
    .el-table th,
    .el-table tr {
      background: transparent;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: 1px solid rgba(3, 3, 8, 1);
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      display: none;
    }
    // hover
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: rgba(0, 232, 255, 0.2);
    }
    /** 分页样式 */
    .el-pagination__total {
      color: #fff;
    }
    .el-pagination__jump {
      color: #fff;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      margin: 0;
      border: 0.06rem solid #545675;
      background-color: transparent;
      color: #fff;
    }
    .el-pagination.is-background .el-pager li.active {
      background: #151635;
    }
    .el-pagination__sizes .el-input .el-input__inner {
      border-radius: 0.13rem;
      border: 0.06rem solid #545675;
      background: transparent;
      color: #fff;
    }
    .el-pagination__jump .el-input__inner {
      border: 0.06rem solid #545675;
      background: transparent;
      color: #fff;
    }
    .el-table__body tr.hover-row > td {
      background-color: rgba(0, 232, 255, 0.2);
    }
    .el-table__body tr.hover-row > td:nth-last-child(1) {
      background-color: #1a4a68;
    }
    .el-table__body > tbody > tr > td:nth-last-child(1) {
      background-color: #171833;
    }
    .el-table__body > tbody > tr > td:nth-last-child(7) {
      width: 200px;
    }
    .el-table__fixed-right-patch {
      background-color: #171833;
      border-bottom: 1px solid #171833;
    }
    .el-table__fixed-right::before {
      background-color: #171833;
    }
    .el-dialog__headerbtn {
      z-index: 1000;
    }
    .el-dialog__header {
      width: 75rem;
      // height: 40rem;
      background-color: #171833;
      padding: 0;
    }
    .el-dialog__body {
      width: 75rem;
      height: 40rem;
      background-color: #171833;
      overflow: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0;
    }
  }
}
</style>
<style lang="scss">
// 分页器 页面尺寸样式
.page-size-popper {
  border: 0.06rem solid #545675;

  .el-select-dropdown__list {
    background: #212342;
    color: #fff;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__item.selected {
    background: #151635;
    color: rgba(0, 232, 255, 1);
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: rgba(#151635, 0.4);
  }
}
</style>

<style lang="scss">
$fontSize: 0.88rem;
$height: 1.38rem;
.motaikuang5 > .el-dialog {
  width: 15%;
  margin: 0 auto;
  margin-top: 30rem !important;
  background: #212342;
  padding: 0;
  // height: 50%;
  // background-color: blue;
}
.motaikuang5 .el-table__empty-block {
  background-color: #212342;
}
// 分页器 页面尺寸样式
.page-size-popper {
  border: 0.06rem solid #545675;

  .el-select-dropdown__list {
    background: #212342;
    color: #fff;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__item.selected {
    background: #151635;
    color: rgba(0, 232, 255, 1);
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: rgba(#151635, 0.4);
  }
}
</style>
