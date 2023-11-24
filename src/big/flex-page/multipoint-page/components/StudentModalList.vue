<template>
  <div class="content">
    <!-- tab栏 -->
    <el-tabs :value="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(v, i) in Object.values(typeCode)"
        :key="i"
        :label="v.label"
        :name="v.field"
      />
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

    <!-- 数据内容 -->
    <div class="tab-content">
      <!-- 表格 -->
      <el-table :data="tableData" style="width:100%" height="100%">
        <!-- 循环列表 -->
        <template v-for="(v, i) in Object.entries(fields)">
          <!-- 自定义渲染 -->
          <template v-if="typeof v[1] === 'object'">
            <el-table-column :key="i" :label="v[1].label">
              <template slot-scope="scope">
                <component
                  :is="v[1].render"
                  :row="scope.row"
                  :click="testClick"
                />
              </template>
            </el-table-column>
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
import { syndromeDictionary, studentSchoolList } from '@/api/real-api'

import dayjs from 'dayjs'

// 默认进入tab
const activeName = 'flight'

const typeCode = {
  1: {
    field: 'flight',
    label: '缺勤信息',
    otherParam: {
      startDate: dayjs()
      //   .subtract(1, "day")
        .format('YYYY-MM-DD')
    }
  }
}

const singleObj = {
  fields: {
    name: '姓名',
    className: '所在班级',
    absReason: '缺勤原因',
    absStartDate: '缺勤开始时间',
    absEndDate: '缺勤结束时间'
  },
  api: studentSchoolList,
  searchs: [
    // {
    //   field: "city",
    //   type: "select",
    //   placeholder: "选择所在地",
    //   searchArr: "cityList",
    //   labelName: "city",
    //   valueName: "city"
    // },
    // {
    //   field: "area",
    //   type: "select",
    //   placeholder: "选择所在区",
    //   searchArr: "areaList",
    //   labelName: "area",
    //   valueName: "area"
    // }
  ]
}

// 页面配置
const pageConfig = Object.values(typeCode).reduce((a, b) => {
  return { ...a, [b.field]: { ...singleObj, otherParam: b.otherParam }}
}, {})

export default {
  props: {
    propsParam: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      activeName, // 活动tab
      typeCode,
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
  mounted() {
    this.initSearch().then(res => {
      Object.keys(res.data).map(v => {
        this.allSearch[v] = res.data[v]
      })
      // this.activeName = typeCode[this.type].field
      this.handleClick({ name: this.activeName })
    })
  },
  methods: {
    testClick(data) {
      this.$emit('detail', { schoolName: data.schoolName })
    },
    initSearch() {
      return syndromeDictionary({})
    },
    fetchData() {
      const api = pageConfig[this.activeName].api
      const { page, limit, param } = this
      api({
        page,
        limit,
        ...param,
        ...pageConfig[this.activeName].otherParam,
        ...this.propsParam
      }).then(res => {
        console.log(res)
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
    }
  }
}
</script>

<style lang="scss" scoped>
$fontSize: 0.88rem;
$height: 1.38rem;
// .container {
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   padding: 3.13rem 6.63rem;
//   height: 100%;
//   width: 100%;
// }
.dialog ::v-deep {
  .el-dialog__headerbtn {
    z-index: 1000;
  }
  .el-dialog__header {
    width: 75rem;
    background-color: #171833;
    padding: 0;
  }
  .el-dialog {
    width: 50rem;
    height: 45.94rem;
    background-color: #171833;
    border-radius: 0.13rem;
    margin: auto;
    padding: 0;
    font-size: $fontSize;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-top: 9rem !important;
  }
  .el-dialog__body {
    padding: 30px 0.63rem 30px 0.63rem;
  }
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
}

// .dialog ::v-deep .el-dialog {
// }
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
    .el-table,
    .el-table__expanded-cell {
      background: #020423;
    }
    .aggregation .el-dialog {
      background: #020423;
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
      .cellClass {
        .el-table-column--selection {
          background-color: #ebf7ff;
        }
      }
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
  }
}
</style>
