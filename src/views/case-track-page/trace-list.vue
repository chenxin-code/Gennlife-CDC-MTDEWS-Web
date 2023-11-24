<template>
  <div>
    <el-container>
      <el-header>
        <div class="headDiv">
          <el-input
            v-model="findData.input"
            placeholder="请输入人员姓名或证件号码"
            clearable
            class="manInput"
            size="small"
            @clear="getList"
          />
          <el-select
            v-model="findData.diagnose"
            placeholder="诊断结果"
            class="select"
            size="small"
          >
            <el-option
              v-for="item in result"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-select
            v-model="findData.condition"
            placeholder="目前病情"
            class="select"
            size="small"
          >
            <el-option
              v-for="item in nowCase"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-select
            v-model="findData.time"
            placeholder="首次就诊时间"
            class="select"
            size="small"
          >
            <el-option
              v-for="item in firstTime"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
          <el-date-picker
            v-model="findData.startEnd"
            type="datetimerange"
            align="right"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00', '08:00:00']"
            class="chooseTime"
          />
          <el-button
            type="primary"
            class="find"
            @click="findMan"
          >查询</el-button>
        </div>
      </el-header>
      <el-main>
        <div class="mainDiv">
          <!-- 表格 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" label-class-name="head" />
            <el-table-column
              prop="idNumber"
              label="证件号"
              label-class-name="head"
              width="200px"
            />
            <el-table-column prop="sex" label="性别" label-class-name="head" />
            <el-table-column
              prop="age"
              label="年龄"
              sortable
              label-class-name="head"
            />
            <el-table-column
              prop="symptom"
              label="症状"
              label-class-name="head"
              width="200px"
            />
            <el-table-column
              prop="firstTime"
              label="首次就诊时间"
              sortable
              label-class-name="head"
              width="150px"
            />
            <el-table-column
              prop="hospital"
              label="医院"
              label-class-name="head"
              width="200px"
            />
            <el-table-column
              prop="nowCase"
              label="目前病情"
              label-class-name="head"
            />
            <el-table-column fixed="right" label="操作" label-class-name="head">
              <template slot-scope="scope">
                <el-button type="text" @click="traceMan(scope.row)">轨迹追踪</el-button>
              </template>
            </el-table-column>
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { fetchGet } from '@/api/trace.js'
import { fetchFind } from '@/api/trace.js'
import { exportJson2Excel } from '@/utils/excel'

export default {
  data() {
    return {
      pages: { page: 1, limit: 10, params: {
        tableId: 1,
        sqlName: '',
        tableName: ''
      }},
      total: 0,
      tableData: [],
      result: [
        { value: '选项1', label: '咳嗽，发烧，肺部阴影' },
        { value: '选项2', label: '确诊' },
        { value: '选项3', label: '密切接触者' }
      ],
      nowCase: [
        { value: '选项1', label: '重症' },
        { value: '选项2', label: '痊愈' },
        { value: '选项3', label: '轻度' }
      ],
      firstTime: [
        { value: '选项1', label: '2020/11/15' },
        { value: '选项2', label: '2020/11/14' },
        { value: '选项3', label: '2020/11/11' }
      ],
      findData: {
        input: '',
        diagnose: '',
        condition: '',
        time: '',
        startEnd: ''
      }
    }
  },
  computed: {},

  created() {
    this.getList()
  },
  methods: {
    getList() {
      // 获取表格
      fetchGet(this.pages).then((response) => {
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
    excel() {
      // 导出
      const header = [
        '姓名',
        '证件号',
        '性别',
        '年龄',
        '症状',
        '首次就诊时间',
        '医院',
        '目前病情'
      ]
      const tablehead = [
        'name',
        'idNumber',
        'sex',
        'age',
        'symptom',
        'firstTime',
        'hospital',
        'nowCase'
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
        filename: '追踪患者数据列表'
      })
    },
    findMan() {
      fetchFind(this.findData).then((response) => {
        this.tableData = response.data.items
        this.total = response.data.total
      })
    },
    traceMan(row) {
      const { idNumber } = row
      if (row.nowCase === '死亡') {
        // let name = row.name
        this.$router.push({ path: `/case-track-page/index/track-page/index/${idNumber}` })
        // alert("啪，你死了！！！")
      } else {
        // let name = row.name
        this.$router.push({ path: `/case-track-page/index/nodie-track-page/index/${idNumber}` })
        // alert("恭喜你，还活着！")
      }
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
  margin-top: 16px;
  margin-bottom: 17px;
  /* width: 1172px; */
  height: 80px;
  padding-top: 22px;
  display: flex;
}
.manInput {
  width: 211px;
  height: 32px;
  background: #ffffff;
  margin-left: 22px;
}
.select {
  width: 173px;
  height: 32px;
  background: #ffffff;
  border-radius: 4px;
  margin-left: 22px;
}
.chooseTime {
  width: 243px;
  height: 32px;
  background: #ffffff;
  margin-left: 22px;
  padding: 0 10px;
}
.find {
  width: 80px;
  height: 32px;
  background-color: #1890ff;
  border-radius: 2px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 10px;
  margin-left: 15px;
  /* display: block; */
}
.mainDiv {
  /*width: 1172px;*/
  background: #ffffff;
  margin-top: 27px;
  padding-top: 22px;
  padding-left: 23px;
  padding-right: 23px;
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
