<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="introduction">
        <div>
          <span>数据类别：</span>
          <b>香港</b>
          <span>数据日期：</span>
          <b>{{ showTime.date }}</b>
        </div>
        <div>
          <span>数据获取来源：</span>
          <a href="https://www.baidu.com/">大疫情网</a>
        </div>
        <div>
          <span>数据内容：当前数据为香港数据，截止时间为：{{ showTime.detailsTime }}</span>
        </div>
      </div>
    </el-card>
    <el-card class="box-card tab-style">
      <el-form :inline="true" class="filter-form">
        <el-row>
          <el-col :span="24">
            <template v-for="(v, i) in filterInput[activeName]">
              <template v-if="v.type === 'select'">
                <el-select
                  :key="i"
                  v-model="allData[activeName].params[v.field]"
                  class="filter-item"
                  :placeholder="v.placeholder"
                  :popper-append-to-body="false"
                  size="small"
                >
                  <el-option v-for="item in v.choice" :key="item" :label="item" :value="item" />
                </el-select>
              </template>
              <template v-else-if="v.type === 'text'">
                <el-input
                  :key="i"
                  v-model="allData[activeName].params[v.field]"
                  :placeholder="v.placeholder"
                  class="filter-item"
                  size="small"
                />
              </template>
              <template v-else-if="v.type === 'time'">
                <el-date-picker
                  :key="i"
                  v-model="allData[activeName].params[v.field]"
                  type="datetime"
                  :placeholder="v.placeholder"
                  size="small"
                  class="filter-item"
                  clearable
                />
              </template>
            </template>
            <el-button
              class="filter-button filter-item"
              type="primary"
              size="small"
              @click="onSubmit"
            >查 询</el-button>
          </el-col>
        </el-row>
      </el-form>

      <!-- tab栏 -->
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in tabLables"
          :key="index"
          :label="item.label"
          :name="item.name"
        />
      </el-tabs>

      <!-- 表格 -->
      <el-table
        :data="allData[activeName].items"
        :header-cell-style="{background:'#f0f6fc'}"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in rows[activeName]"
          :key="index"
          :label="item.label"
          :prop="item.prop"
        />
      </el-table>

      <!-- 分页器 -->
      <el-form :inline="true" class="pagination-form">
        <el-col :span="21">
          <el-pagination
            background
            :current-page="parseInt(allData[activeName].page)"
            :page-sizes="[3, 5, 7, 10]"
            :page-size="parseInt(allData[activeName].limit)"
            :pager-count="5"
            layout="total, ->, prev, pager, next, sizes, jumper"
            :total="allData[activeName].total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
        <el-col :span="3">
          <el-button class="pagination-button" @click="exportExcel">
            导出 |
            <i class="el-icon-caret-bottom" />
          </el-button>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  fetchXiangGangData,
  fetchSickStatisticsData,
  fetchEpidemicClusterData,
  fetchImportCountryData,
  fetchCaseClassificationData,
  fetchDeathStatisticsData,
  fetchLocalStatisticData,
  fetchAgeStatisticsData,
  fetchCumulativeData
} from '@/api/data-manage'
import { exportJson2Excel } from '@/utils/excel'
export default {
  props: {
    changeTab: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    showTime: {
      type: Object,
      default: function() {
        return {}
      }
    },
    isQuery: {
      type: Boolean,
      default: function() {
        return false
      }
    },
    listQuery: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      total: 0,
      filterList: {
        number: '',
        sex: '',
        hospitalization: '',
        resident: ''
      },
      filterItems: [],
      activeName: 'epidemic',
      allData: {
        epidemic: {
          items: [],
          total: 0,
          page: 1,
          limit: 5,
          params: {
            number: '',
            sex: '',
            hospitalization: '',
            resident: ''
          },
          api: fetchXiangGangData
        },
        sickStatistics: {
          items: [],
          total: 0,
          page: 1,
          limit: 5,
          params: {
            'sick-source': ''
          },
          api: fetchSickStatisticsData
        },
        epidemicCluster: {
          items: [],
          total: 0,
          page: 1,
          limit: 5,
          params: {
            group: '',
            'group-classification': ''
          },
          api: fetchEpidemicClusterData
        },
        importCountry: {
          items: [],
          total: 0,
          page: 1,
          limit: 5,
          params: {
            'import-country': '',
            'report-date': ''
          },
          api: fetchImportCountryData
        },
        caseClassification: {
          items: [],
          total: 0,
          page: 1,
          limit: 5,
          params: {
            'report-date': ''
          },
          api: fetchCaseClassificationData
        },
        deathStatistics: {
          items: [],
          total: 0,
          page: 1,
          limit: 5,
          params: {
            'case-number': '',
            'death-date': '',
            age: ''
          },
          api: fetchDeathStatisticsData
        },
        localStatistic: {
          items: [],
          total: 0,
          page: 1,
          limit: 5,
          params: {
            region: '',
            'report-date': ''
          },
          api: fetchLocalStatisticData
        },
        ageStatistic: {
          items: [],
          total: 0,
          page: 1,
          limit: 5,
          params: {
            'age-range': ''
          },
          api: fetchAgeStatisticsData
        },
        cumulative: {
          items: [],
          total: 0,
          page: 1,
          limit: 5,
          params: {
            date: ''
          },
          api: fetchCumulativeData
        }
      },
      tabLables: [
        {
          label: '个案',
          name: 'epidemic'
        },
        {
          label: '发病途径统计',
          name: 'sickStatistics'
        },
        {
          label: '聚集性疫情',
          name: 'epidemicCluster'
        },
        {
          label: '输入国统计',
          name: 'importCountry'
        },
        {
          label: '病例分类',
          name: 'caseClassification'
        },
        {
          label: '死亡数据',
          name: 'deathStatistics'
        },
        {
          label: '本地病案统计',
          name: 'localStatistic'
        },
        {
          label: '病案年龄统计',
          name: 'ageStatistic'
        },
        {
          label: '累计治愈累计死亡表',
          name: 'cumulative'
        }
      ],
      rows: {
        ageStatistic: [
          { label: '男性个案数', prop: 'case-male' },
          { label: '女性个案数', prop: 'case-female' },
          { label: '年龄分布', prop: 'age-range' },
          { label: '总计', prop: 'case-local' }
        ],
        caseClassification: [
          { label: '累计病例', prop: 'total-case' },
          { label: '累计治愈', prop: 'total-recovered' },
          { label: '报告日期', prop: 'report-date' },
          { label: '当日输入个案', prop: 'total-case-input' },
          { label: '当日本地个案', prop: 'total-case-local' },
          {
            label: '当日与输入个案有流行病学关连联',
            prop: 'total-case-input-epidemic'
          },
          {
            label: '当日与本地个案有流行病学关连',
            prop: 'total-case-local-epidemic'
          },
          { label: '小计', prop: 'summary' },
          { label: '累计死亡', prop: 'total-death' }
        ],
        cumulative: [
          { label: '日期', prop: 'date' },
          { label: '累计治愈', prop: 'total-recovered' },
          { label: '累计死亡', prop: 'total-death' }
        ],
        deathStatistics: [
          { label: '个案编号', prop: 'case-number' },
          { label: '年龄', prop: 'age' },
          { label: '死亡日期', prop: 'death-date' }
        ],
        epidemic: [
          { label: '个案分类', prop: 'case-classification' },
          { label: '年龄', prop: 'age' },
          { label: '性别', prop: 'gender' },
          { label: '个案编号', prop: 'case-number' },
          { label: '报告日期', prop: 'report-date' },
          { label: '发病日期', prop: 'sick-date' },
          { label: '发病年', prop: 'sick-year' },
          { label: '发病月', prop: 'sick-month' },
          { label: '发病日', prop: 'sick-day' },
          { label: '年龄2', prop: 'age-2' },
          { label: '群组', prop: 'group' },
          { label: '职业', prop: 'profession' },
          { label: '地区', prop: 'region' },
          { label: '流行病学关联', prop: 'epidemiological-association' },
          { label: '备注', prop: 'remarks' },
          { label: '病征', prop: 'symptoms' },
          { label: '住处', prop: 'residence' },
          { label: '潜伏期及传染期内外游记录', prop: 'travel-record' },
          { label: '确诊/疑似个案', prop: 'comfirmed' },
          { label: '入住医院名称', prop: 'hospital-name' },
          { label: '当前状况', prop: 'currention-situation' },
          { label: '患者来源', prop: 'patient-place' },
          { label: '输入国', prop: 'import-country' },
          { label: '密切接触者', prop: 'closecontactsidentified' }
        ],
        importCountry: [
          { label: '报告日期', prop: 'report-date' },
          { label: '来源国', prop: 'import-country' },
          { label: '输入个案个数', prop: 'import-case' }
        ],
        localStatistic: [
          { label: '报告日期', prop: 'report-date' },
          { label: '地区', prop: 'region' },
          { label: '本地感染个数', prop: 'case-local' }
        ],
        sickStatistics: [
          { label: '病案个数', prop: 'total-case' },
          { label: '百分比', prop: 'case-percent' },
          { label: '发病途径', prop: 'sick-source' }
        ],
        epidemicCluster: [
          { label: '最早一例发病日期', prop: 'first-sick-date' },
          { label: '最后一例发病日期', prop: 'last-sick-date' },
          { label: '群组名称', prop: 'group' },
          { label: '群组类别', prop: 'group-classification' },
          { label: '病例数', prop: 'total-case' }
        ]
      },
      filterInput: {
        epidemic: [
          { field: 'number', type: 'text', placeholder: '请输入患者编号' },
          {
            field: 'sex',
            type: 'select',
            placeholder: '性别',
            choice: ['男', '女']
          },
          {
            field: 'hospitalization',
            type: 'select',
            placeholder: '住院状态',
            choice: ['住院', '出院', '死亡']
          },
          {
            field: 'resident',
            type: 'select',
            placeholder: '接触方式',
            choice: ['同餐', '同车']
          }
        ],
        epidemicCluster: [
          { field: 'group', type: 'text', placeholder: '请输入群组名称' },
          {
            field: 'group-classification',
            type: 'select',
            placeholder: '群组类别',
            choice: ['a组', 'b组']
          }
        ],
        sickStatistics: [
          {
            field: 'sick-source',
            type: 'select',
            placeholder: '发病途径',
            choice: ['同餐', '聚会']
          }
        ],
        localStatistic: [
          {
            field: 'region',
            type: 'text',
            placeholder: '地区'
          },
          {
            field: 'report-date',
            type: 'time',
            placeholder: '报告日期'
          }
        ],
        importCountry: [
          {
            field: 'import-country',
            type: 'text',
            placeholder: '来源国'
          },
          {
            field: 'report-date',
            type: 'time',
            placeholder: '报告日期'
          }
        ],
        deathStatistics: [
          {
            field: 'case-number',
            type: 'text',
            placeholder: '个案编号'
          },
          {
            field: 'age',
            type: 'text',
            placeholder: '年龄'
          },
          {
            field: 'death-date',
            type: 'time',
            placeholder: '死亡日期'
          }
        ],
        cumulative: [
          {
            field: 'date',
            type: 'time',
            placeholder: '日期'
          }
        ],
        caseClassification: [
          {
            field: 'report-date',
            type: 'time',
            placeholder: '报告日期'
          }
        ],
        ageStatistic: [
          {
            field: 'report-date',
            type: 'select',
            placeholder: '年龄分布',
            choice: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
          }
        ]
      }
    }
  },
  watch: {
    changeTab() {
      if (this.changeTab) {
        this.getData()
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit(this.activeName, this.allData[this.activeName])
    },
    getData() {
      if (!this.listQuery.params.time) {
        for (const key in this.allData) {
          this.allData[key].items = []
          this.allData[key].total = 0
          // this.allData[key].page = 1
          // this.allData[key].limit = 5
        }
        this.isQuery = false
        this.showTime.date = ''
        this.showTime.detailsTime = ''
        return
      }
      const { page, limit, params } = this.allData[this.activeName]
      this.allData[this.activeName].api({ page, limit, params }).then(response => {
        this.allData[this.activeName].items = response.data.items
        this.allData[this.activeName].total = response.totalCount
        this.allData[this.activeName].page = response.currPage
        this.allData[this.activeName].limit = response.pageSize
      })
    },
    handleSizeChange(val) {
      this.allData[this.activeName].limit = val
      if (!this.isQuery) {
        return
      }
      this.getData()
    },
    handleCurrentChange(val) {
      this.allData[this.activeName].page = val
      if (!this.isQuery) {
        return
      }
      this.getData()
    },
    handleClick() {
      this.getData()
    },
    exportExcel() {
      const list = this.rows[this.activeName]
      const header = list.map(item => item.label)
      const headerEN = list.map(item => item.prop)
      var arr = []
      for (const key in this.allData[this.activeName].items) {
        arr.push(key)
      }
      exportJson2Excel({
        header,
        data: arr.map(v => {
          return header.map((j, i) => {
            var headName = headerEN[i]
            return this.allData[this.activeName].items[v][headName]
          })
        }),
        filename: '密接数据'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box-card {
  margin: 0 14px 0 14px;
}
.box-card:nth-child(2) {
  margin: 14px 14px 20px 14px;
}
.el-tabs {
  margin: 0;
}
.introduction {
  margin: 20px 0 20px 30px;
  div {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    line-height: 22px;
    height: 21px;
    span {
      color: gray;
    }
  }
}
.introduction div:nth-child(1) {
  b {
    margin-right: 20px;
  }
}
.introduction div:nth-child(2) {
  margin: 20px 0;
  a {
    color: #1890ff;
  }
}
.filter-form {
  .filter-item {
    width: 243px;
    height: 32px;
    margin-right: 12px;
    background-color: #ffffff;
    margin-bottom: 24px;
  }
  .filter-button {
    width: 80px;
    background-color: #1890ff;
    border-radius: 2px;
  }
}
.time {
  position: relative;
  overflow: hidden;
  height: 24px;
  div {
    display: inline-block;
  }
}
.time div:nth-child(1) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 6px;
  height: 6px;
  background: #1890ff;
  border-radius: 50%;
}
.time div:nth-child(2) {
  position: absolute;
  left: 20px;
  width: 83px;
  height: inherit;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 24px;
}

.box-card.tab-style ::v-deep .el-tabs__nav {
  margin-left: 0;
}
.pagination-form {
  margin-top: 20px;
  .el-button {
    padding: 0;
    width: 82px;
    height: 28px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #39425e;
    margin-left: 30px;
    margin-bottom: 20px;
  }
}
</style>
