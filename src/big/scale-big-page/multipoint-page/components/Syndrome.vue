<template>
  <div class="content">
    <!-- tab栏 -->
    <el-tabs :value="activeName" @tab-click="handleClick">
      <el-tab-pane label="呼吸道症候群" name="breathe" />
      <el-tab-pane label="腹泻症候群" name="diarrhea" />
      <el-tab-pane label="发热伴其他症状症候群" name="hot" />
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
      <el-table :data="tableData" height="100%">
        <!-- 循环列表 -->
        <template v-for="(v, i) in Object.entries(fields)">
          <!-- 自定义渲染 -->
          <template v-if="typeof v[1] === 'object'">
            <el-table-column :key="i" :label="v[1].label">
              <template slot-scope="scope">
                <component :is="v[1].render" :row="scope.row" />
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
import { getDictionaryList, getSyndromeList } from '@/api/real-api'

// 默认进入tab
const activeName = 'breathe'

// 页面配置
const pageConfig = {
  // 呼吸道症候群
  breathe: {
    fields: {
      hospital: {
        label: '医院名称',
        render: {
          functional: true,
          props: {
            row: {
              personList: []
            }
          },
          render(createElement, context) {
            return <div>{context.props.row.hospital}</div>
          }
        }
      },
      respiratoryTractValue: {
        label: '呼吸道疾病指数',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.respiratoryTractValue}</div>
          }
        }
      },
      respiratoryTractLevel: {
        label: '呼吸道疾病预警等级',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.respiratoryTractLevel}</div>
          }
        }
      },
      iliValue: {
        label: 'ili指数',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.iliValue}</div>
          }
        }
      },
      iliLevel: {
        label: 'ili预警等级',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.iliLevel}</div>
          }
        }
      },
      antipyreticValue: {
        label: '退热药指数',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.antipyreticValue}</div>
          }
        }
      },
      antipyreticLevel: {
        label: '退热药预警等级',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.antipyreticLevel}</div>
          }
        }
      },
      neuraminidaseValue: {
        label: '神经氨酸酶抑制剂指数',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.neuraminidaseValue}</div>
          }
        }
      },
      neuraminidaseLevel: {
        label: '神经氨酸酶抑制剂预警等级',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.neuraminidaseLevel}</div>
          }
        }
      }
    },
    api: getSyndromeList,
    searchs: [
      {
        field: 'hospital',
        type: 'select',
        placeholder: '医院名称',
        searchArr: 'hospitalList',
        labelName: 'hospitalName',
        valueName: 'hospitalCode'
      }
    ]
  },
  diarrhea: {
    fields: {
      hospital: {
        label: '医院名称',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.hospital}</div>
          }
        }
      },
      diarrhoeaValue: {
        label: '腹泻指数',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.diarrhoeaValue}</div>
          }
        }
      },
      diarrhoeaLevel: {
        label: '腹泻预警等级',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.diarrhoeaLevel}</div>
          }
        }
      }
    },
    api: getSyndromeList,
    searchs: [
      {
        field: 'hospital',
        type: 'select',
        placeholder: '医院名称',
        searchArr: 'hospitalList',
        labelName: 'hospitalName',
        valueName: 'hospitalCode'
      }
    ]
  },
  hot: {
    fields: {
      hospital: {
        label: '医院名称',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.hospital}</div>
          }
        }
      },
      hotWithSymptomValue: {
        label: '腹泻指数',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.hotWithSymptomValue}</div>
          }
        }
      },
      hotWithSymptomLevel: {
        label: '腹泻预警等级',
        render: {
          functional: true,
          props: {
            row: {}
          },
          render(createElement, context) {
            return <div>{context.props.row.hotWithSymptomLevel}</div>
          }
        }
      }
    },
    api: getSyndromeList,
    searchs: [
      {
        field: 'hospital',
        type: 'select',
        placeholder: '医院名称',
        searchArr: 'hospitalList',
        labelName: 'hospitalName',
        valueName: 'hospitalCode'
      }
    ]
  }
}

export default {
  props: {
    type: {
      type: String,
      default() {
        return 1
      }
    }
  },
  data() {
    return {
      activeName, // 活动tab
      model: '',
      page: 1, // 当前页
      limit: 10, // 一页条数
      diseaseCode: 0, // 疾病编号
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
    })
    this.fetchData()
  },
  methods: {
    initSearch() {
      return getDictionaryList({})
    },
    fetchData() {
      const api = pageConfig[this.activeName].api
      const { page, limit, diseaseCode, param } = this
      api({ page, limit, diseaseCode, ...param }).then(res => {
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
