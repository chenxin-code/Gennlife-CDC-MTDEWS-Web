<template>
  <div class="container">
    <header-slot class="header" />
    <div class="main">
      <div class="one">
        <div class="one-time">
          <el-date-picker
            v-model="totalImportTime"
            type="daterange"
            range-separator="~"
            clearable
          />
        </div>
        <div class="one-title item-title">累积境外入粤人员管控情况</div>
        <div class="flex-table">
          <table>
            <tr>
              <th class="hotel-use-title">排序</th>
              <th v-for="(item, idx) in List.title" :key="idx" class="hotel-use-title">{{ item }}</th>
            </tr>
            <tr v-for="(item, idx) in List.listData" :key="idx">
              <td class="hotel-use-item">{{ idx }}</td>
              <td class="hotel-use-item">{{ item.city }}</td>
              <td class="hotel-use-item">{{ item.total }}</td>
              <td class="hotel-use-item">{{ item.useTotal }}</td>
              <td class="hotel-use-item">{{ item.useTotal }}</td>
              <td class="hotel-use-item">{{ item.odd }}%</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="two" />
      <div class="three" />
      <div class="four" />
      <div class="five" />
    </div>
  </div>
</template>

<script>
import HeaderSlot from './components/HeaderSlot'
import { getList } from '@/api/immigration'
export default {
  components: {
    HeaderSlot
  },
  data() {
    return {
      totalImportTime: '',
      List: {
        title: ['城市', '酒店容量', '已使用容量', '剩余容量', '使用率'],
        listData: {}
      }
    }
  },
  watch: {
    totalImportTime: {
      handler() {
        console.log('this.totalImportTime', this.totalImportTime)
      }
    }
  },
  mounted() {
    this.initOverseaList()
  },
  methods: {
    initOverseaList() {
      // const totalImportParam = { status: 2 }
      getList().then(res => {
        this.List.listData = res.data.array
        console.log('res:', res)
      })
        .catch(err => {
          console.log('error', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  *{box-sizing: border-box;}
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .item-title {
      padding-left: 10px;
      paddding-top: 10px;
      padding-bottom: 10px;
      color: white;
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      font-family: PingFangSC-Medium, PingFang SC;
    }
    .header {
      flex: 0.08;
      width: 100%;
    }
    .main {
      flex: 0.92;
      width: 100%;
      padding: 10px;
      display: flex;
      .one,.two,.four,.five {
        flex: 0.16;
        border: 1px solid black;
        background-color: #202241;
      }
      .three {
        flex: 0.36;
      }
      .one {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .one-time {
          flex: 0.05;
          width: 100%;
          padding: 20px;
          ::v-deep {
            .el-range-editor.el-input__inner{
              width: 90%;
              height: 90%;
              background-color: #141634;
              border: 0;
            }
            .el-range-editor .el-range-input{
              background-color: #141634;
              font-size: 14px;
            }
            .el-date-editor .el-range-separator{
              color: white;
            }
          }
        }
        .one-title {
          flex: 0.03;
          width: 100%;
        }
        .flex-table {
          width: 100%;
          flex:0.9;
          th,td {
            height: 26px;
            width: 16.6%;
            line-height: 26px;
            text-align: center;
          }
          .hotel-use-title {
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.3);
            white-space: nowrap;
          }
          .hotel-use-item {
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.8);
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
