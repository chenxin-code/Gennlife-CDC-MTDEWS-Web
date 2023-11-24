<template>
  <div class="detail-wrap">
    <div class="information">
      <div class="image">
        <img :src="personaInformation.image">
        <!-- 图片 -->
      </div>
      <div class="details">
        <span
          v-for="(v, i) in Object.entries(information.personaInformation)"
          :key="i"
        >{{ v[1] }}: {{ personaInformation[v[0]] }}</span>
      </div>
    </div>
    <div class="line" />
    <div class="diagnosis">
      <span
        v-for="(v, i) in Object.entries(information.visitInformation)"
        :key="i"
      >
        {{ v[1] }}: {{ visitInformation[v[0]] }}
      </span>
    </div>
    <div class="dividLine" />
    <div class="placeTable">
      <span class="tabelTitle">14天内曾到地点</span>
      <el-table :data="placeList" height="8.06rem" :header-cell-style="{background: '#212342'}">
        <el-table-column v-for="(v, i) in information.placeList" :key="i" :prop="v.prop" :label="v.label" />
      </el-table>
    </div>
    <div class="dividLine" />
    <div class="relationTable">
      <span class="tabelTitle">关系人</span>
      <el-table :data="relationList" height="8.06rem" :header-cell-style="{background: '#212342'}">
        <el-table-column v-for="(v, i) in information.relationList" :key="i" :prop="v.prop" :label="v.label" />
      </el-table>
    </div>
  </div>
</template>

<script>
const pageConfig = {
  // 航班列表
  information: {
    // fields: {
    personaInformation: {
      name: '姓名',
      sex: '性别',
      age: '年龄',
      birth: '出生日期',
      country: '国籍',
      idType: '证件类别',
      idNumber: '身份证号',
      tel: '联系电话',
      place: '所在区',
      address: '家庭住址',
      workPlace: '工作单位'
    },
    visitInformation: {
      time: '检测时间',
      result: '检测结果',
      hospital: '就诊医院',
      feverClinic: '是否发热门诊',
      symptom: '临床症状'
    },
    placeList: [
      { label: '地点名称', prop: 'location' },
      { label: '证件号码', prop: 'number' },
      { label: '是否检测', prop: 'isTest' },
      { label: '检测结果', prop: 'result' }
    ],
    relationList: [
      { label: '姓名', prop: 'name' },
      { label: '关系', prop: 'relation' },
      { label: '证件号码', prop: 'idNumber' },
      { label: '联系电话', prop: 'tel' },
      { label: '现住址', prop: 'address' }
    ]
  }
  // }
}

export default {
  props: {
    personaInformation: {
      type: Object,
      default: () => {
        return {}
      }
    },
    visitInformation: {
      type: Object,
      default: () => {
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
  data() {
    return {
      information: pageConfig.information
    }
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
}
.detail-wrap .information {
  margin-left: 1.38rem;
  display: flex;
}
.image {
  margin-right: 1.5rem;
  width: 3.75rem;
  height: 4.25rem;
  border-radius: 0.06rem;
  img {
    width: 100%;
    height: 100%;
  }
}
.details div:nth-child(2) {
  margin-top: 0.63rem;
  margin-bottom: 0.63rem;
}
.diagnosis {
  margin-left: 1.88rem;
}
.diagnosis div:nth-child(2) {
  margin-top: 0.63rem;
  margin-bottom: 0.63rem;
}
.placeTable,
.relationTable {
  margin-left: 1.88rem;
  .tabelTitle {
    margin-bottom: 1.06rem;
  }
}
span {
  display: inline-block;
  height: $height;
  font-size: $fontSize;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: $height;
  margin-right: $height;
  margin-bottom: 0.63rem;
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
.resultColor {
  color: red;
}
</style>
