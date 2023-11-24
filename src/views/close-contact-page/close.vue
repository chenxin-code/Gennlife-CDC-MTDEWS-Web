<template>
  <div class="app-container">
    <el-card class="box-card">
      <el-form :inline="true" :model="listQuery.params" class="filter-form">
        <el-col :span="21">
          <el-input
            v-model="listQuery.params.name"
            class="filter-name filter-item"
            size="small"
            clearable
            placeholder="请输入人员姓名或证件号码"
            @clear="getList"
          />
          <el-select
            v-model="listQuery.params.contact"
            class="filter-contact filter-item"
            size="small"
            clearable
            placeholder="接触方式"
          >
            <el-option label="同餐" value="同餐" />
          </el-select>
          <el-select
            v-model="listQuery.params.place"
            class="filter-place filter-item"
            size="small"
            clearable
            placeholder="隔离场所"
          >
            <el-option label="医院" value="医院" />
          </el-select>
          <el-date-picker
            v-model="listQuery.params.time"
            type="datetimerange"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            range-separator="-"
            size="small"
            clearable
            class="filter-time filter-item"
          />
          <el-select
            v-model="listQuery.params.sex"
            class="filter-sex filter-item"
            size="small"
            clearable
            placeholder="性别"
            @clear="getList"
          >
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
          <el-select
            v-model="listQuery.params.age"
            class="filter-age filter-item"
            size="small"
            clearable
            placeholder="年龄"
          >
            <el-option label="10" value="10" />
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-button
            class="filter-button filter-item"
            type="primary"
            size="small"
            @click="onSubmit"
          >查 询</el-button>
        </el-col>
      </el-form>
      <el-table
        :data="userList"
        :cell-style="cellStyle"
        :header-cell-style="{background:'#f0f6fc'}"
        class="close-table"
        style="width: 100%"
      >
        <el-table-column label="姓名" prop="name" width="100px" />
        <el-table-column label="性别" prop="sex" width="80px" />
        <el-table-column label="证件号码" prop="number" width="180px" />
        <el-table-column label="年龄" sortable prop="age" />
        <el-table-column label="接触方式" prop="contact" width="100px" />
        <el-table-column label="接触地点" prop="place" width="200px" />
        <el-table-column label="隔离场所" prop="quarantine" />
        <el-table-column label="是否发病" prop="morbidity" />
        <el-table-column label="开始观察时间" prop="time" width="150px" />
        <el-table-column fixed="right" label="操作" width="200px">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              :class="{'details-class': scope.row.morbidity === '否'}"
              :disabled="scope.row.morbidity === '否'"
              @click="details(scope.row)"
            >密接详情</el-button>
            <el-button
              type="text"
              size="small"
              :class="{'details-class': scope.row.morbidity === '否'}"
              :disabled="scope.row.morbidity === '否'"
            >密接图谱</el-button>
          </template>
        </el-table-column>
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
import { fetchUserList } from '@/api/close'
import { exportJson2Excel } from '@/utils/excel'
export default {
  data() {
    return {
      userList: [],
      total: 0,
      listQuery: {
        page: 1,
        limit: 5,
        params: {
          name: '',
          number: '',
          contact: '',
          place: '',
          time: '',
          sex: '',
          age: ''
        }
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      fetchUserList(this.listQuery).then(response => {
        this.userList = response.data.items
        this.total = response.totalCount
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
        return 'color: #ff1215'
      }
    },
    details(row) {
      if (row.morbidity === '否') {
        return
      } else {
        var name = row.name
        this.$router.push({ path: `/close-contact/index/details/${name}` })
      }
    },
    exportExcel() {
      const headerEN = [
        'name',
        'sex',
        'number',
        'age',
        'contact',
        'place',
        'quarantine',
        'morbidity',
        'time'
      ]
      const header = [
        '姓名',
        '性别',
        '证件号码',
        '年龄',
        '接触方式',
        '接触地点',
        '隔离场所',
        '是否发病',
        '开始观察时间'
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
  .box-card {
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #393c4d;
}
.filter-form {
  .filter-item {
    height: 32px;
    margin-right: 12px;
    background-color: #ffffff;
  }
  .filter-name {
    width: 338px;
  }
  .filter-contact {
    width: 173px;
    border-radius: 4px;
  }
  .filter-place {
    width: 218px;
  }
  .filter-time {
    width: 243px;
  }
  .filter-sex,
  .filter-age {
    width: 173px;
    border-radius: 4px;
  }
  .filter-age {
    margin-bottom: 20px;
    margin-top: 12px;
  }
  .filter-button {
    width: 80px;
    background: #1890ff;
    border-radius: 2px;
  }
}
.close-table .el-button {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
.details-class {
  cursor: default;
  color: gray;
}
.details-class:visited {
  color: gray;
}
.details-class:hover {
  color: gray;
}
.details-class:active {
  color: gray;
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
