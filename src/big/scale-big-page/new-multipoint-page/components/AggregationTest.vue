<template>
  <div class="detail-wrap">
    <div class="information">
      <div class="image">
        <img
          :src="data.image"
          :onerror="`this.src='${require('@/assets/images/default-head.jpg')}'`"
        >
        <!-- 图片 -->
      </div>
      <div class="details">
        <div>
          <span>姓名：{{ data.name }}</span>
          <span>性别：{{ data.gender }}</span>
          <span>年龄：{{ data.age }}</span>
          <span>出生日期：{{ data.birthday }}</span>
          <span>国籍：{{ data.country }}</span>
        </div>
        <div>
          <span>证件类型：{{ data.cardType }}</span>
          <span>身份证号：{{ dataDesensitization(data.cardId, 10, 6) }}</span>
          <span>联系电话：{{ dataDesensitization(data.phone, 3, 4) }}</span>
        </div>
        <div>
          <!-- <span>所在区：{{ data.area }}</span> -->
          <span>家庭住址：{{ data.address }}</span>
          <!-- <span>工作单位：{{ data.workplace }}</span> -->
        </div>

        <template v-if="String(data.crowdCode) === '6'">
          <br>
          <br>
          <div>
            <span
              :style="{ fontWeight: 600 }"
            >数据来源： 儿童青少年监测系统</span>
          </div>
          <br>
          <div>
            <span>重点人群分类： 学生</span>
          </div>
        </template>
        <template v-else-if="String(data.crowdCode) === '7'">
          <br>
          <br>
          <div>
            <span :style="{ fontWeight: 600 }">数据来源： 国家大疫情网</span>
          </div>
          <br>
        </template>
        <template v-else>
          <br>
          <br>
          <div>
            <span :style="{ fontWeight: 600 }">数据来源： 一码通</span>
          </div>
          <br>
          <div>
            <span>重点人群分类： 香港接驳车司机</span>
          </div>
          <div>
            <span>最近一次接驳时间：2020-12-07</span>
          </div>
        </template>
      </div>
    </div>
    <div class="line" />
    <div v-if="String(data.crowdCode) === '6'" class="diagnosis">
      <div>
        <span>学校名称：{{ data.school }}</span>
        <!-- <span>是否发热门诊：{{ data.feverClinic }}</span> -->
      </div>
      <div>
        <span>所在班级：{{ data.className }}</span>
      </div>
    </div>
    <div v-else class="diagnosis">
      <div>
        <span>新冠核酸检测时间：{{ data.testDate }}</span>
        <span>
          新冠核酸检测结果：
          <span :class="{ resultColor: data.testResult === '阳性' }">{{
            data.testResult
          }}</span>
        </span>
      </div>
      <div>
        <span>就诊医院：{{ data.hospital }}</span>
        <!-- <span>是否发热门诊：{{ data.feverClinic }}</span> -->
      </div>
      <div>
        <span>临床症状：{{ data.symptom }}</span>
      </div>
      <!-- <div> -->
      <!-- <span>现病史：{{ data.presentIllnessHistory }}</span> -->
      <!-- </div> -->
      <div>
        <span>主诉：{{ data.chiefComplaint }}</span>
      </div>
      <div>
        <span>影像学检测报告：{{ data.underMicroscope }}</span>
      </div>
    </div>
    <div class="dividLine" />
    <!-- <div class="placeTable">
      <span class="tabelTitle">14天内曾到地点</span>
      <el-table :data="placeList" height="8.06rem" :header-cell-style="{background: '#212342'}">
        <el-table-column prop="location" label="地点名称" />
        <el-table-column prop="number" label="证件号码" />
        <el-table-column prop="isTest" label="是否检测" />
        <el-table-column prop="result" label="检测结果" />
      </el-table>
    </div> -->
    <!-- <div class="dividLine" /> -->
    <div class="titles">
      <div
        v-if="data.closePersonListData && data.closePersonListData.length > 0"
        :class="{ 'title-item': true, active: show == 'closePersonListData' }"
        @click="show = 'closePersonListData'"
      >
        关系人
      </div>
      <div
        v-if="data.medicineRecordList && data.medicineRecordList.length > 0"
        :class="{ 'title-item': true, active: show == 'medicineRecordList' }"
        @click="show = 'medicineRecordList'"
      >
        购药信息
      </div>
    </div>
    <div
      v-if="data.closePersonListData && show == 'closePersonListData'"
      class="relationTable"
    >
      <span class="tabelTitle">关系人</span>
      <!-- height="8.06rem" -->
      <el-table
        :data="data.closePersonListData"
        :header-cell-style="{ background: '#212342' }"
      >
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="closeRelation" label="关系" />
        <el-table-column prop="job" label="职业" />
        <el-table-column
          v-if="String(data.crowdCode) === '6'"
          prop="absCause"
          label="晨检"
          :formatter="row => row.absCause || '正常'"
        />
        <el-table-column
          prop="cardId"
          label="证件号码"
          :formatter="row => dataDesensitization(row.cardId, 10, 6)"
        />
        <el-table-column
          prop="phone"
          label="联系电话"
          :formatter="row => dataDesensitization(row.phone, 3, 4)"
        />
        <el-table-column prop="address" label="现住址" />
      </el-table>
    </div>
    <div class="dividLine" />
    <div
      v-if="data.medicineRecordList && show == 'medicineRecordList'"
      class="relationTable"
    >
      <span class="tabelTitle">购药信息</span>
      <!-- height="8.06rem" -->
      <el-table
        height="100%"
        :data="data.medicineRecordList"
        :header-cell-style="{ background: '#212342' }"
      >
        <el-table-column prop="drugstore" label="药店名称" />
        <el-table-column prop="medName" label="药品名称" />
        <el-table-column prop="address" label="购药地点" />
        <el-table-column prop="date" label="购药时间" />
      </el-table>
    </div>
  </div>
</template>

<script>
// import {getPersonnelInfo} from '@/api/real-api'
import { dataDesensitization } from '@/utils/index'

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      show: ''
    }
  },
  mounted() {
    if (this.data.medicineRecordList.length > 0) {
      this.show = 'medicineRecordList'
    }
    if (this.data.closePersonListData.length > 0) {
      this.show = 'closePersonListData'
    }
  },
  methods: {
    dataDesensitization
  }
}
</script>

<style lang="scss" scoped>
$fontSize: 0.88rem;
$height: 1.38rem;
.detail-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // background: #212342;
  // margin:30rem auto !important;
  // width:100%
}
.detail-wrap .information {
  margin-left: 1.38rem;
  display: flex;
}
.image {
  margin-right: 1.5rem;
  width: 5rem;
  height: 4.25rem;
  border-radius: 0.06rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.details span,
.diagnosis span {
  display: inline-block;
  height: $height;
  font-size: $fontSize;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: $height;
  margin-right: $height;
}
.details .resultColor,
.diagnosis .resultColor {
  color: red;
}
.details span:not(:last-of-type),
.diagnosis span:not(:last-of-type) {
  margin-bottom: 0.63rem;
}
.diagnosis {
  margin-left: 1.88rem;
}
.placeTable,
.relationTable {
  margin-left: 1.88rem;
  height: 80%;
  .tabelTitle {
    display: inline-block;
    height: $height;
    font-size: $fontSize;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    line-height: $height;
    margin-right: $height;
    margin-bottom: 1.06rem;
  }
}

.line {
  margin-top: 3.5rem;
  margin-bottom: 1.25rem;
  width: 48.75rem;
  height: 0.06rem;
  background: #030308;
}
.dividLine {
  margin-top: 1.25rem;
  margin-bottom: 0.69rem;
  width: 48.75rem;
  height: 0.06rem;
  background: #030308;
}
::v-deep {
  .el-table {
    width: 46.06rem;
    // height: 8.06rem;
    font-size: 0.88rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
  .el-table th,
  .el-table tr {
    background: #131627;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #030308;
  }
  .el-table__body-wrapper is-scrolling-none {
    background: #131627;
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background: #131627;
  }
  // hover
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background: #737dca;
  }
  .el-table,
  .el-table__expanded-cell {
    background: #131627;
  }
}

.titles {
  width: 100%;
  display: flex;
  justify-content: center;
  .title-item + .title-item {
    margin-left: 10px;
  }
  .title-item {
    border: 1px solid #737dca;
    padding: 5px 10px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    &:active {
      transform: scale(1.05);
    }
  }
  > .active {
    border: 1px solid #263ffa;
  }
}
</style>
