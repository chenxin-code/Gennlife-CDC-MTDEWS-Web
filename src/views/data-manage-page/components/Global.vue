<template>
  <div class="app-container">
    <el-card class="box-card">
      <div class="introduction">
        <div>
          <span>数据类别：</span>
          <b>全球</b>
          <span>数据日期：</span>
          <b>{{ showTime.date }}</b>
        </div>
        <div>
          <span>数据获取来源：</span>
          <a href="https://www.baidu.com/">大疫情网</a>
        </div>
        <div>
          <span>数据内容：当前数据为全球数据，截止时间为：{{ showTime.detailsTime }}</span>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <el-form :inline="true" class="filter-form">
        <el-row>
          <el-col :span="24">
            <span class="filter-span">选择日期：</span>
            <el-date-picker
              v-model="listQuery.params.time"
              type="datetime"
              placeholder="选择时间"
              size="small"
              clearable
              class="filter-time filter-item"
            />
            <el-button
              class="filter-button filter-item"
              type="primary"
              size="small"
              @click="onSubmit"
            >查 询</el-button>
          </el-col>
        </el-row>
        <el-row>
          <div v-if="isQuery" class="time">
            <div />
            <div>{{ showTime.date }}</div>
          </div>
        </el-row>
      </el-form>
      <el-table
        :data="globalData.items"
        :header-cell-style="{background:'#f0f6fc'}"
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in rowList"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          min-width="140px"
        />
      </el-table>

      <el-form :inline="true" class="pagination-form">
        <el-col :span="21">
          <el-pagination
            background
            :current-page="parseInt(globalData.page)"
            :page-sizes="[3, 5, 7, 10]"
            :page-size="parseInt(globalData.limit)"
            :pager-count="5"
            layout="total, ->, prev, pager, next, sizes, jumper"
            :total="globalData.total"
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
import { exportJson2Excel } from '@/utils/excel'
export default {
  props: {
    globalData: {
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
    showTime: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 5,
        params: {
          time: null
        }
      },
      rowList: [
        { label: '国家或地区', prop: 'country-region' },
        { label: '人口', prop: 'population' },
        { label: '累计检测率', prop: 'total-detection-percent' },
        { label: '累计检测', prop: 'total-detection' },
        { label: '累计患病率', prop: 'total-case-percent' },
        { label: '累计死亡率', prop: 'total-death-percent' },
        { label: '累计病例数', prop: 'total-case' },
        { label: '累计死亡病例数', prop: 'total-death' },
        { label: '累计治愈病例数', prop: 'total-recovered' },
        { label: '每百万人检测人数', prop: 'detection-million' },
        { label: '每百万确认人数', prop: 'case-million' },
        { label: '每百万死亡人数', prop: 'death-million' },
        { label: '新增病例数', prop: 'new-case' },
        { label: '新增死亡病例数', prop: 'new-death' },
        { label: '现存病例数', prop: 'active-case' },
        { label: '现存重症病例数', prop: 'active-revere' },
        { label: '统计日期', prop: 'count-date' }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.listQuery.page = this.globalData.page
      this.listQuery.limit = this.globalData.limit
      this.$emit('epidemicList', this.listQuery)
    },
    handleSizeChange(val) {
      this.globalData.limit = val
      this.listQuery.limit = val
      this.$emit('globalList', this.listQuery)
    },
    handleCurrentChange(val) {
      this.globalData.page = val
      this.listQuery.page = val
      this.$emit('globalList', this.listQuery)
    },
    exportExcel() {
      const header = this.rowList.map(item => item.label)
      const headerEN = this.rowList.map(item => item.prop)
      var arr = []
      for (const key in this.globalData.items) {
        arr.push(key)
      }
      exportJson2Excel({
        header,
        data: arr.map(v => {
          return header.map((j, i) => {
            var headName = headerEN[i]
            return this.globalData.items[v][headName]
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
  margin: 14px 14px 14px 14px;
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
    height: 32px;
    margin-right: 12px;
    background-color: #ffffff;
    margin-bottom: 24px;
  }
  .filter-span {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }
  .filter-time {
    width: 243px;
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
.el-table {
  margin-top: 12px;
}
.pagination-form {
  margin-top: 20px;
  .pagination-button {
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
