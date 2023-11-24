<template>
  <div>
    <!-- 患者基本信息-->
    <div class="head">
      <div class="message">
        <div class="basic">
          <h4>基本信息</h4>
          <div class="oneLine">
            <p class="basicJob">人群分类：{{ basicMessage.job }}</p>
            <p class="basicTel">联系电话：{{ basicMessage.tel }}</p>
          </div>
          <div class="twoLine">
            <p class="basicName">患者姓名：{{ basicMessage.name }}</p>
            <p class="basicSex">性别：{{ basicMessage.sex }}</p>
            <p class="basicAge">年龄：{{ basicMessage.age }}</p>
          </div>
          <p class="threeLine">现住详细地址：{{ basicMessage.address }}</p>
          <p class="fourLine">患者工作单位：{{ basicMessage.company }}</p>
        </div>
        <div class="cdc">
          <h4>CDC疫情报卡信息</h4>
          <div class="oneLine">
            <p class="cdcKind">病例分类：{{ cdcMessage.kind }}</p>
            <p class="cdcHospital">诊断单位：{{ cdcMessage.hospital }}</p>
          </div>
          <p class="twoLine">发病日期：{{ cdcMessage.sickTime }}</p>
          <p class="threeLine">死亡日期：{{ cdcMessage.dieTime }}</p>
          <p class="fourLine">诊断时间：{{ cdcMessage.seeTime }}</p>
        </div>
      </div>
      <el-divider />
      <div class="timerLine">
        <h4 class="stepTitle">疫情报卡记录</h4>
        <div class="divStatus">
          <div
            v-for="(value, index) in peopleTrack"
            :key="index"
            class="pstaDiv"
          >
            <p class="pStatus">
              {{ value.status }}
            </p>
          </div>
        </div>
        <div class="map">
          <div v-for="(value, index) in blueNumber" :key="index" class="inmap">
            <div class="blueCircle" />
            <div class="blueLine" />
          </div>
          <div class="inmap">
            <div class="blueCircle" />
          </div>
        </div>
        <div class="divTime">
          <div
            v-for="(value, index) in peopleTrack"
            :key="index"
            class="indivTime"
          >
            <p class="pTime">{{ value.time }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 患者活动轨迹-->
    <div class="activityDiv">
      <div class="titleDiv">
        <h4 class="actTitle">患者活动轨迹</h4>
        <el-button type="text" class="lookMap">查看活动热力图</el-button>
        <el-divider />
        <div class="actLine" />
      </div>
      <div class="block">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
            placement="top"
          >
            <p class="timeP">交通工具：{{ activity.vehicle }}</p>
            <p class="timeP">是否戴口罩：{{ activity.mask }}</p>
            <!-- {{ activity.content }} -->
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import { basicGet } from '@/api/trace.js'
import { cdcGet } from '@/api/trace.js'
export default {
  data() {
    return {
      activities: [
        {
          vehicle: '飞机场',
          mask: '否',
          timestamp: '2020年5月23日   10:00   广州市人民第一医院'
        },
        {
          vehicle: '火车站',
          mask: '否',
          timestamp: '2020年5月24日   11:00   中山大学附属第一医院'
        },
        {
          vehicle: '太平间',
          mask: '否',
          timestamp: '2020年5月25日   12:00   中山大学附属第一医院'
        },
        {
          vehicle: '太平间',
          mask: '否',
          timestamp: '2020年5月25日   12:00   中山大学附属第一医院'
        },
        {
          vehicle: '太平间',
          mask: '否',
          timestamp: '2020年5月25日   12:00   中山大学附属第一医院'
        },
        {
          vehicle: '太平间',
          mask: '否',
          timestamp: '2020年5月25日   12:00   中山大学附属第一医院'
        },
        {
          vehicle: '太平间',
          mask: '否',
          timestamp: '2020年5月25日   12:00   中山大学附属第一医院'
        },
        {
          vehicle: '太平间',
          mask: '否',
          timestamp: '2020年5月25日   12:00   中山大学附属第一医院'
        },
        {
          vehicle: '太平间',
          mask: '否',
          timestamp: '2020年5月25日   12:00   中山大学附属第一医院'
        }
      ],
      idNumber: {
        number: this.$route.params.idNumber
      },
      basicMessage: {},
      cdcMessage: {},
      peopleTrack: [
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '上班'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '游玩'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '吃饭'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '睡觉'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '上班'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '上班'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '上班'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '上班'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '上班'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '上班'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '居家'
        },
        {
          time: '2020-05-23 12:00:00',
          status: '上班'
        }
      ]
    }
  },
  computed: {
    blueNumber() {
      return this.peopleTrack.slice(0, this.peopleTrack.length - 1)
    }
  },
  mounted() {
    this.journey()
    this.getmessage()
  },
  methods: {
    journey() {
      const pstaDiv = document.getElementsByClassName('pstaDiv')
      const indivTime = document.getElementsByClassName('indivTime')
      const length = parseInt(getComputedStyle(document.getElementsByClassName('timerLine')[0], null).width)
      for (let i = 0; i < pstaDiv.length; i++) {
        pstaDiv[i].style.cssText =
          'width:' + length / this.peopleTrack.length + 'px;'
      }
      for (let i = 0; i < indivTime.length; i++) {
        indivTime[i].style.cssText =
          'width:' + length / this.peopleTrack.length + 'px;'
      }
    },
    getmessage() {
    // this.idNumber = this.$route.params.idNumber
      basicGet(this.idNumber).then(response => {
        this.basicMessage = response.data
      })
      cdcGet(this.idNumber).then(response => {
        this.cdcMessage = response.data
      })
    }
  }
}
</script>

<style scoped>
.head {
  background-color: #fff;
  margin-left: 15px;
  margin-top: 16px;
  width: 97%;
}
.message {
  display: flex;
  justify-content: space-around;
  padding-left: 23px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3f4863;
  line-height: 22px;
}
.basic {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.cdc {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.oneLine {
  display: flex;
  justify-content: flex-start;
  flex: 1;
}
.twoLine {
  display: flex;
  justify-content: flex-start;
  flex: 1;
}
.threeLine {
  flex: 1;
}
.fourLine {
  flex: 1;
}
.basicJob {
  flex: 1;
}
.basicTel {
  flex: 2;
}
.basicName {
  flex: 1;
}
.basicSex {
  flex: 1;
}
.basicAge {
  flex: 1;
}
.cdcKind {
  flex: 2;
}
.cdcHospital {
  flex: 3;
}
.stepTitle {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 600;
  color: #3f4863;
  line-height: 22px;
  margin-top: 29px;
  margin-left: 23px;
}
.timerLine {
  width: 100%;
  overflow: auto;
}
/* .indivTime {
  margin-right: -37px;
} */
.map {
  display: flex;
  justify-content: flex-start;
  padding-left: 78px;
  padding-right: 78px;
  width: 100%;
}
.inmap {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}
.divStatus {
  display: flex;
  justify-content: flex-start;
  margin-left: 78px;
  margin-right: 78px;
}
.pstaDiv{
  min-width: 97px;
}
.pStatus {
  /* text-align: center; */
  /* margin-bottom: -16px; */
  /* width: 33%; */
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3f4863;
  line-height: 24px;
  /* min-width: 97px; */
  /* margin-left: -6px; */
}
.blueCircle {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #1890ff;
  margin-left: 2px;
}
.blueLine {
  height: 2px;
  width: 100%;
  background-color: #1890ff;
  margin-top: 3px;
  margin-left: 2px;
  min-width: 85px;
  /* flex-grow: 1; */
}
.divTime {
  display: flex;
  justify-content: flex-start;
  margin-left: 78px;
  margin-right: 78px;
}
.indivTime {
  min-width: 97px;
}
.pTime {
  width: 82px;
  text-align: center;
  font-size: 14px;
  font-family: Helvetica;
  color: #999cac;
  line-height: 22px;
  margin-left: -38px;
}
.activityDiv {
  background-color: #fff;
  margin-top: 15px;
  margin-left: 15px;
  width: 97%;
}
.timeTitle {
  display: inline-block;
  width: 142px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #3f4863;
  line-height: 22px;
}
.timeP {
  display: inline-block;
  width: 326px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #586079;
  line-height: 20px;
}
.titleDiv {
  width: 94%;
  margin: auto;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #1890ff;
  line-height: 24px;
}
.actTitle {
  display: inline-block;
  margin-bottom: -24px;
}
.lookMap {
  float: right;
  margin-top: 15px;
}
.actLine {
  width: 96px;
  height: 3px;
  background: #1890ff;
  margin-top: -27px;
  margin-bottom: 27px;
  z-index: initial;
}
</style>
