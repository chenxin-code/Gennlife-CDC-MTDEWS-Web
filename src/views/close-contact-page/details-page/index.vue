<template>
  <div class="app-container">
    <el-tabs v-model="activeName" class="tab">
      <el-tab-pane :label="$route.params.name + '的密切接触者'" name="详情"><details-pane /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DetailsPane from './components/DetailsPane'
export default {
  components: {
    'details-pane': DetailsPane
  },
  data() {
    return {
      activeName: '详情'
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0
}
/* 修改tabs的label部分的背景为白色 */
::v-deep .el-tabs__header {
  background-color: white;
  cursor: auto;
}
/* 将label的文字向右调整 */
::v-deep .el-tabs__nav {
  margin-left: 30px;
}
/* 调节tabs的label的大小 */
::v-deep .el-tabs__item {
  width: 180px;
  height: 60px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 60px;
}
/* 隐藏滚动条 */
::v-deep .el-tabs__active-bar {
  display: none;
}
::v-deep .el-tabs__header {
  z-index: 3;
}
</style>
