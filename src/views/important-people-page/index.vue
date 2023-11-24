<template>
  <div>
    <div class="headDiv">
      <div class="divP">
        <p class="titleP">异常人数</p>
        <p class="contentP">{{ peoples.abnormal }}</p>
      </div>
      <div class="grayLine" />
      <div class="divP">
        <p class="titleP">检测人数</p>
        <p class="contentP">{{ peoples.all }}</p>
      </div>
      <div class="grayLine" />
      <div class="divP">
        <p class="titleP">阳性人数</p>
        <p class="contentP">{{ peoples.positive }}</p>
      </div>
      <div class="grayLine" />
      <div class="divP">
        <p class="titleP">阴性人数</p>
        <p class="contentP">{{ peoples.negative }}</p>
      </div>
      <div class="grayLine" />
      <div class="divP">
        <p class="titleP">环境标本采样数</p>
        <p class="contentP">{{ peoples.environmentAll }}</p>
      </div>
      <div class="grayLine" />
      <div class="divP">
        <p class="titleP">环境标本阳性数</p>
        <p class="contentP">{{ peoples.environmentPositive }}</p>
      </div>
      <div class="grayLine" />
      <div class="divP">
        <p class="titleP">环境标本阴性数</p>
        <p class="contentP">{{ peoples.environmentNegative }}</p>
      </div>
    </div>

    <div class="mainDiv">
      <div class="findDiv">

        <el-input
          v-model="findData.input"
          placeholder="请输入人员姓名或证件号码"
          clearable
          class="menInput"
          size="small"
          @clear="getList"
        />
        <el-select
          v-model="findData.sex"
          placeholder="性别"
          class="sex"
          size="small"
        >
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
        <el-select
          v-model="findData.symptom"
          placeholder="症状"
          class="symptom"
          size="small"
        >
          <el-option
            v-for="item in symptoms"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          />
        </el-select>
        <el-select
          v-model="findData.status"
          placeholder="状态"
          class="status"
          size="small"
        >
          <el-option label="正常" value="正常" />
          <el-option label="异常" value="异常" />
        </el-select>
        <el-button
          type="primary"
          class="find"
          @click="findMan"
        >查询</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" :cell-style="changeColor">
        <el-table-column
          prop="name"
          label="姓名"
          sortable
          label-class-name="head"
        />
        <el-table-column prop="sex" label="性别" label-class-name="head" />
        <el-table-column
          prop="idNumber"
          label="证件号"
          label-class-name="head"
          width="200px"
        />
        <el-table-column
          prop="place"
          label="住址"
          width="300px"
          label-class-name="head"
        />
        <el-table-column prop="job" label="职业" label-class-name="head" />
        <el-table-column
          prop="temperature"
          label="体温"
          sortable
          label-class-name="head"
        />
        <el-table-column prop="state" label="状态" label-class-name="head" />
        <el-table-column
          prop="reason"
          label="异常原因"
          width="200px"
          label-class-name="head"
        />
      </el-table>
      <el-divider />
      <!-- 分页 -->
      <div class="pages">
        <el-pagination
          background
          :current-page="1"
          :page-sizes="[10, 50, 100, 200]"
          :page-size="pages.limit	"
          layout="total, ->, prev, pager, next, sizes,jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <span
          class="out"
          @click="excel"
        >导出 |
          <i class="el-icon-caret-bottom" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { importantGet } from '@/api/trace.js'
import { importantFind } from '@/api/trace.js'
import { exportJson2Excel } from '@/utils/excel'

export default {
  data() {
    return {
      add: 1,
      pages: { page: 1, limit: 10 },
      total: 0,
      tableData: [],
      symptoms: [
        { value: '选项1', label: '发热，咽喉痛' },
        { value: '选项2', label: '头疼' },
        { value: '选项3', label: '咳嗽' }
      ],
      findData: {
        input: '',
        sex: '',
        symptom: '',
        status: ''
      },
      peoples: {
        abnormal: '9',
        all: '321',
        positive: '3',
        negative: '319',
        environmentAll: '123',
        environmentPositive: '1',
        environmentNegative: '122'
      }
    }
  },
  created() {
    this.getList()
    setInterval(() => { this.add += 1 }, 1000)
  },
  methods: {
    getList() {
      // 获取表格
      importantGet(this.pages).then((response) => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      // 跳转指定页面
      this.pages.page = val
      this.getList()
    },
    handleSizeChange(val) {
      // 改变页面大小
      this.pages.limit	 = val
      this.getList()
    },
    changeColor(cell) { // 改变异常者的表格显示
      if (cell.column.label === '性别') {
        cell.column.label = <p style='display:inline-block;'>性别<i class='el-icon-s-open'></i></p>
      }
      if (cell.column.label === '住址') {
        cell.column.label = <p style='display:inline-block;'>住址<i class='el-icon-s-open'></i></p>
      }
      if (cell.column.label === '职业') {
        cell.column.label = <p style='display:inline-block;'>职业<i class='el-icon-s-open'></i></p>
      }
      if (cell.column.label === '状态') {
        cell.column.label = <p style='display:inline-block;'>状态<i class='el-icon-s-open'></i></p>
      }
      if (cell.row.temperature >= '37.3') {
        cell.row.state = '异常'
        cell.row.reason = <i class='el-icon-warning'><p style='display:inline-block;'>发热</p></i>
        return 'color:#FF1215;background-color:#FFF1F0;'
      } else {
        cell.row.state = '正常'
        cell.row.reason = '——'
      }
    },
    excel() {
      // 导出
      const header = [
        '姓名',
        '性别',
        '证件号',
        '住址',
        '职业',
        '体温',
        '状态',
        '异常原因'
      ]
      const tablehead = [
        'name',
        'sex',
        'idNumber',
        'place',
        'job',
        'temperature',
        'state',
        'reason'
      ]
      const arr = []
      let headName
      for (const i in this.tableData) {
        arr.push(+i)
      }
      exportJson2Excel({
        header,

        data: arr.map((v) => {
          // v行 j表头
          return header.map((j, index) => {
            headName = tablehead[index]
            return this.tableData[v][headName]
          })
        }),
        filename: '重点人群监测'
      })
    },
    findMan() {
      importantFind(this.findData).then((response) => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
    }
  }
}
</script>
<style scoped>
::v-deep .head {
  background-color: #f0f6fc;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
}
.headDiv {
  background-color: #fff;
  border-radius: 2px;
  margin-top: 14px;
  /* margin-bottom: 17px; */
  /* width: 1172px; */
  height: 106px;
  /* padding-top: 22px; */
  margin-left: 14px;
  margin-right: 14px;
  padding-top: 18px;
  display: flex;
}
.divP{
  /* display: inline-block; */
  width: 14.2%;
}
.grayLine{
  /* display: inline-block; */
  width: 1px;
  height: 58px;
  background-color: #E8E8E8;
}
.titleP{
  width: 100%;
  text-align: center;
  color:#586079;
  font-size: 12px;
  font-weight: 600;
}
.contentP{
  width: 100%;
  text-align: center;
  color: #3F4863;
  font-size: 18px;
}
.findDiv {
  margin-bottom: 14px;
  width: 100%;
  display: flex;
}
.menInput {
  width: 338px;
  height: 32px;
  background: #ffffff;
  /* border: 1px solid #d9d9d9; */
}
.sex {
  width: 173px;
  height: 32px;
  background: #ffffff;
  border-radius: 4px;
  margin-left: 13px;
}
.symptom {
  width: 218px;
  height: 32px;
  background: #ffffff;
  border-radius: 4px;
  margin-left: 13px;
}
.status {
  width: 218px;
  height: 32px;
  background: #ffffff;
  border-radius: 4px;
  margin-left: 13px;
}
.find {
  width: 80px;
  height: 32px;
  background: #1890ff;
  border-radius: 2px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 10px;
  margin-left: 15px;
  padding: 0;
}
.mainDiv {
  /*width: 1172px;*/
  background: #ffffff;
  margin-top: 15px;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 25px;
  margin-left: 14px;
  margin-right: 14px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #393c4d;
  line-height: 22px;
}
.el-pagination {
  display: inline-block;
  width: 90%;
}
.out {
  width: 76px;
  height: 28px;
  border-radius: 4px;
  padding: 0;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.15);
  display: inline-block;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #39425e;
  line-height: 22px;
  cursor: pointer;
  margin-left: 20px;
}
.pages {
  padding-bottom: 20px;
}
/* .el-button{
     float: right;
   } */
</style>
