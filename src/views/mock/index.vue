<template>
  <div>
    <el-button size="small" @click="addHandle">添加</el-button>
    <el-button size="small" @click="exportExcel">导出excel</el-button>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="author" label="作者" />
      <el-table-column prop="display_time" label="时间" />
      <el-table-column prop="pageviews" label="浏览量" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="editHandle(scope.row)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteHandle(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="page"
      :page-sizes="[10, 20, 30, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <!-- 模态框 -->
    <el-dialog title="表单" :visible.sync="show">
      <el-form :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.region" placeholder="请选择状态">
            <el-option label="published" value="published" />
            <el-option label="draft" value="draft" />
            <el-option label="deleted" value="deleted" />
          </el-select>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="form.author" autocomplete="off" />
        </el-form-item>
        <el-form-item label="时间">
          <el-input v-model="form.display_time" autocomplete="off" />
        </el-form-item>
        <el-form-item label="浏览量">
          <el-input v-model="form.pageviews" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="mockFormHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData, addData, editData, deleteData } from '@/api/mock'
import { exportJson2Excel } from '@/utils/excel'

export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
      isEdit: false, // 是否是编辑
      show: false,
      form: {} // 表单数据
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      const { page, pageSize } = this
      fetchData({ page, pageSize }).then(res => {
        const { data } = res
        this.tableData = data.items
        this.total = data.total
      })
    },
    // 添加
    addHandle() {
      this.modalShow()
      this.isEdit = false
    },
    // 编辑
    editHandle(row) {
      this.modalShow()
      this.isEdit = true
      this.form = row
    },
    // 模态框显示
    modalShow() {
      this.show = true
      this.form = {}
    },
    // 表单处理
    mockFormHandle() {
      let api = addData
      if (this.isEdit) {
        api = editData
      }
      api(this.form).then(res => {
        this.show = false
        this.$message({
          type: 'success',
          message: res.msg
        })
        this.fetchData()
      })
    },
    // 删除
    deleteHandle(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id } = row
        deleteData({ id }).then(res => {
          this.$message({
            type: 'success',
            message: res.msg
          })
          this.fetchData()
        })
      })
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    },
    // 导出excel
    exportExcel() {
      const header = ['表头1', '表头2', '表头3', '表头4']
      exportJson2Excel({
        header,
        data: [1, 2, 3].map(v => {
          return header.map(j => {
            return Math.ceil(Math.random() * 10)
          })
        }),
        filename: '测试excel'
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>
