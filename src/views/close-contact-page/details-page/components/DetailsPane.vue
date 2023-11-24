<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form :inline="true" :model="listQuery.params" class="filter-form">
        <el-col :span="22">
          <el-input
            v-model="listQuery.params.name"
            class="filter-name filter-item"
            size="small"
            clearable
            placeholder="请输入人员姓名或证件号码"
            @clear="getList"
          />
          <el-select
            v-model="listQuery.params.diagnosis"
            class="filter-diagnosis filter-item"
            size="small"
            placeholder="诊断结果"
          >
            <el-option label="阴性" value="阴性" />
          </el-select>
          <el-select
            v-model="listQuery.params.treatment"
            class="filter-treatment filter-item"
            size="small"
            placeholder="治疗状态"
          >
            <el-option label="良好" value="良好" />
          </el-select>
          <el-select
            v-model="listQuery.params.diagnosisTime"
            class="filter-diagnosis-time filter-item"
            size="small"
            placeholder="诊断时间"
          >
            <el-option label="中午" value="中午" />
          </el-select>
          <el-date-picker
            v-model="listQuery.params.time"
            class="filter-time"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="-"
            size="small"
          />
        </el-col>
        <el-col :span="2">
          <el-button
            type="primary"
            class="filter-button filter-item"
            size="small"
            @click="onSubmit"
          >查 询</el-button>
        </el-col>
      </el-form>
    </el-card>
    <el-card>
      <h4>关联病例</h4>
      <div class="relation">
        <el-table
          :cell-style="cellStyle"
          :data="relationList"
          :header-cell-style="{background:'#eef1f6'}"
          style="width: 100%, border-bottom: 0"
        >
          <el-table-column label="姓名" prop="name" width="100px" />
          <el-table-column label="性别" prop="sex" width="80px" />
          <el-table-column label="证件号码" prop="number" width="180px" />
          <el-table-column label="年龄" sortable prop="age" />
          <el-table-column label="治疗状态" prop="treatment" width="100px" />
          <el-table-column label="收治医院" prop="hospital" width="200px" />
          <el-table-column label="隔离状态  " prop="quarantine" />
          <el-table-column label="密接地点" prop="place" />
        </el-table>
        <div slot="append" v-loading="loading" class="loading-class">
          <div @click="getMData">
            <a href="javascript:;" style="margin-right: 5px">点击查看更多数据</a>
            <i class="el-icon-arrow-down" />
          </div>
        </div>
      </div>

      <h4>下级密接</h4>
      <el-table
        :data="userList"
        :cell-style="cellStyle"
        :header-cell-style="{background:'#eef1f6'}"
        style="width: 100%"
      >
        <el-table-column label="姓名" prop="name" width="100px" />
        <el-table-column label="性别" prop="sex" width="80px" />
        <el-table-column label="证件号码" prop="number" width="180px" />
        <el-table-column label="年龄" sortable prop="age" />
        <el-table-column label="治疗状态" prop="treatment" width="100px" />
        <el-table-column label="收治医院" prop="hospital" width="200px" />
        <el-table-column label="隔离状态" prop="quarantine" />
        <el-table-column label="密接地点" prop="place" />
      </el-table>

      <el-form :inline="true" class="pagination-form">
        <el-col :span="21">
          <el-pagination
            background
            :current-page="listQuery.page"
            :page-sizes="[3, 5, 7, 10]"
            :page-size="listQuery.limit"
            :pager-count="5"
            layout="total, ->, prev, pager, next, sizes, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-col>
        <el-col :span="3">
          <el-button @click="exportExcel">
            导出 |
            <i class="el-icon-caret-bottom" />
          </el-button>
        </el-col>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { fetchDetailsList, fetchRelationList } from '@/api/close'
import { exportJson2Excel } from '@/utils/excel'
export default {
  data() {
    return {
      userList: [],
      relationList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 3,
        params: {
          name: '',
          diagnosis: '',
          treatment: '',
          diagnosisTime: '',
          time: ''
        }
      },
      relationCount: 1,
      loading: false
    }
  },
  mounted() {
    this.getList()
    this.getRelationList()
  },
  methods: {
    getList() {
      fetchDetailsList(this.listQuery).then(response => {
        this.userList = response.data.items
        this.total = response.totalCount
      })
    },
    getRelationList() {
      var relationSize = this.relationCount
      fetchRelationList({ relationSize }).then(response => {
        this.relationList = response.data.items
      })
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    onSubmit() {
      this.getList()
    },
    cellStyle(cell) {
      if (cell.column.label === '是否发病' && cell.row.morbidity === '是') {
        return 'color: red'
      }
    },
    getMData() {
      this.loading = true
      this.relationCount += 2
      var t = setTimeout(() => {
        this.loading = false
        this.getRelationList()
        clearTimeout(t)
      }, 1000)
    },
    exportExcel() {
      const headerEN = [
        'name',
        'sex',
        'number',
        'age',
        'treatment',
        'hospital',
        'quarantine',
        'place'
      ]
      const header = [
        '姓名',
        '性别',
        '证件号码',
        '年龄',
        '治疗状态',
        '收治医院',
        '隔离状态',
        '密接地点'
      ]
      var arr = []
      for (const key in this.userList) {
        arr.push(key)
      }
      exportJson2Excel({
        header,
        data: arr.map(v => {
          return header.map((j, i) => {
            var headName = headerEN[i]
            return this.userList[v][headName]
          })
        }),
        filename: '密接数据'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin: 0 14px 20px 14px;
  h4 {
    margin: 10px;
  }
}
.filter-form {
  .filter-item {
    height: 32px;
    margin-right: 12px;
    background: #ffffff;
    margin-bottom: 20px;
  }
  .filter-name {
    width: 211px;
  }
  .filter-diagnosis,
  .filter-treatment,
  .filter-diagnosis-time {
    width: 173px;
    border-radius: 4px;
  }
  .filter-time {
    width: 243px;
    margin-bottom: 20px;
  }
  .filter-button {
    width: 80px;
    background: #1890ff;
    border-radius: 2px;
  }
}
.relation {
  margin-bottom: 20px;
  .loading-class {
    margin: 10px auto;
    height: 28px;
    div {
      font-family: "苹方-简 中黑体";
      font-size: 14px;
      height: inherit;
      text-align: center;
    }
  }
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
