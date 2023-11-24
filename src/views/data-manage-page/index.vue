<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="tab" @tab-click="handleClick">
      <el-tab-pane label="香港" name="香港">
        <xiang-gang
          :change-tab="changeTab"
          :list-query="listQuery"
          :is-query="isQuery"
          :show-time="showTime"
        />
      </el-tab-pane>
      <el-tab-pane label="全球" name="全球">
        <global
          :global-data="globalData"
          :is-query="isQuery"
          :show-time="showTime"
          @epidemicList="getList"
          @globalList="getGlobalData"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { fetchGlobalData } from '@/api/data-manage'
import Global from './components/Global'
import XiangGang from './components/XiangGang'
export default {
  components: {
    global: Global,
    'xiang-gang': XiangGang
  },
  data() {
    return {
      activeName: '全球',
      globalData: {
        items: [],
        total: 0,
        page: 1,
        limit: 5
      },
      changeTab: false,
      isQuery: false,
      showTime: {
        detailsTime: '',
        date: ''
      },
      listQuery: {
        page: 1,
        limit: 5,
        params: {
          time: null
        }
      }
    }
  },
  methods: {
    // 选择时间，请求全球页面数据
    getList(listQuery) {
      if (!listQuery.params.time) {
        this.globalData.items = []
        this.globalData.total = 0
        this.globalData.page = 1
        this.globalData.limit = 5
        this.isQuery = false
        this.showTime.date = ''
        this.showTime.detailsTime = ''
        return
      }
      this.listQuery = listQuery
      this.isQuery = true
      // 请求全球数据
      this.getGlobalData(listQuery)
      this.getTime(listQuery)
    },
    getGlobalData(listQuery) {
      if (!listQuery.params.time) {
        return
      }
      // 请求全球数据
      fetchGlobalData(listQuery).then(response => {
        this.globalData.items = response.data.items
        this.globalData.total = response.totalCount
        this.globalData.page = response.currPage
        this.globalData.limit = response.pageSize
      })
    },
    getTime(listQuery) {
      const t = listQuery.params.time
      if (t) {
        var year = t.getFullYear()
        var month = t.getMonth() + 1
        var day = t.getDate()
        var hour = t.getHours()
        var minute = t.getMinutes()
        var second = t.getSeconds()
        var date = year + '.' + month + '.' + day
        var dataTime = date + ' ' + hour + ':' + minute + ':' + second
        this.showTime.date = date
        this.showTime.detailsTime = dataTime
      } else {
        this.showTime.date = ''
        this.showTime.detailsTime = ''
      }
    },
    handleClick({ name }) {
      this.activeName = name
      if (name === '全球') {
        this.getGlobalData(this.listQuery)
        this.changeTab = false
      } else if (name === '香港') {
        this.changeTab = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
/* 修改tabs的label部分的背景为白色 */
::v-deep .el-tabs__header {
  background-color: white;
}
/* 将label的文字向右调整 */
.tab ::v-deep .el-tabs__nav {
  margin-left: 30px;
  /* padding-left: 30px; */
}
/* 调节tabs的label的大小 */
::v-deep .el-tabs__item {
  box-sizing: content-box;
  min-width: 50px;
  text-align: center;
}
/* 调节选中状态的滚动条 */
::v-deep .el-tabs__active-bar {
  width: 50px;
}
::v-deep .el-tabs__header {
  z-index: 3;
}
</style>
