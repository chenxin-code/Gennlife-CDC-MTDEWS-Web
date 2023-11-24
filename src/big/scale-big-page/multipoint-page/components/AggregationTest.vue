<template>
  <div class="detail-wrap">
    <div class="information">
      <div class="image">
        <img :src="data.image">
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
          <span>联系电话：{{ data.phone }}</span>
        </div>
        <div>
          <span>所在区：{{ data.area }}</span>
          <span>家庭住址：{{ data.address }}</span>
          <span>工作单位：{{ data.workplace }}</span>
        </div>
      </div>
    </div>
    <div class="line" />
    <div class="diagnosis">
      <div>
        <span>核酸检测时间：{{ data.testDate }}</span>
        <span>
          核酸检测结果：
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
      <div>
        <span>现病史：{{ data.presentIllnessHistory }}</span>
      </div>
      <div>
        <span>主诉：{{ data.chiefComplaint }}</span>
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
    <!-- <div class="relationTable">
      <span class="tabelTitle">关系人</span>
      <el-table :data="relationList" height="8.06rem" :header-cell-style="{background: '#212342'}">
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="relation" label="关系" />
        <el-table-column prop="idNumber" label="证件号码" />
        <el-table-column prop="tel" label="联系电话" />
        <el-table-column prop="address" label="现住址" />
      </el-table>
    </div> -->
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
    },
    placeList: {
      type: Array,
      default: () => {
        return []
      }
    },
    relationList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {},
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
.el-table {
  width: 46.06rem;
  // height: 8.06rem;
  font-size: 0.88rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
