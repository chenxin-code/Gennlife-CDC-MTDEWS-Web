import { cloneDeep } from 'lodash'

// 响应码
const resCode = { code: 0 }

// 密接列表
let closePersonListData = []
// 重点人群
let importantListData = []
// 重点人群列表
let getImportantListData = []
// 聚集性
let gatherListData = []
// 聚集性列表
// let getGatherListData = [];

// 酒店隔离人员
const people1 = {
  name: '吴玲',
  gender: '女',
  age: 31,
  birthday: '1989-03-29',
  country: '中国',
  cardType: '身份证号',
  cardId: '440981198903295440',
  phone: '18022421850',
  area: '清城区',
  address: '广东省清远市清城区石角镇美林湖怡景湾6-2梯1506',
  workplace: '南沙区东涌镇隔离酒店普琳酒店',
  crowdCode: '10',
  testDate: '2020-12-07',
  testResult: '初筛阳性',
  hospital: '清远市第一人民医院',
  symptom: '体温 37.1℃，回家后自服感康片，未到医院就诊',
  presentIllnessHistory: '无咳嗽、胸闷、气促，生命体征平稳，精神状态较好',
  chiefComplaint: '头痛',
  underMicroscope: '',
  medicineRecordList: [
    {
      drugstore: '同仁堂药店',
      medName: '感康片',
      address: '广东省清远市清城区城北三路4号南80米',
      date: '2020-12-06'
    }
  ],
  personWarnEventList: [{ eventRule: '重点人群' }, { eventRule: '临床症状' }]
}
// 接驳司机
const people2 = {
  name: '王*阳',
  gender: '男',
  age: 34,
  birthday: '1986-05-17',
  country: '中国',
  cardType: '身份证号',
  cardId: '440981198603295467',
  phone: '18712346578',
  area: '深圳蛇口港',
  address: '广东省清远市清城区石角镇美林湖怡景湾6-2梯1506',
  workplace: '深圳蛇口港',
  crowdCode: '1',
  testDate: '2020-12-08',
  testResult: '初筛阳性',
  hospital: '清远市第一人民医院',
  symptom: '体温 38.1℃，到医院诊',
  presentIllnessHistory: '无咳嗽、胸闷、气促，生命体征平稳，精神状态较好',
  chiefComplaint: '发热、头痛、无力',
  underMicroscope: '',
  medicineRecordList: [
    {
      drugstore: '同仁堂药店',
      medName: '感康片',
      address: '广东省清远市清城区城北三路4号南80米',
      date: '2020-12-06'
    }
  ],
  personWarnEventList: [{ eventRule: '重点人群' }, { eventRule: '密切接触者' }] // 触发规则
}
// 学校儿童
const people3 = {
  name: '王*辉',
  gender: '男',
  age: 6,
  birthday: '2014-08-17',
  country: '中国',
  cardType: '身份证号',
  cardId: '440981201403295420',
  phone: '',
  area: '清城区',
  address: '广东省清远市清城区石角镇美林湖怡景湾6-2梯1506',
  workplace: '广州新豪东安小学',
  crowdCode: '6',
  testDate: '2020-12-08',
  testResult: '初筛阳性',
  school: '广州新豪东安小学',
  className: '一年级2班',
  hospital: '清远市第一人民医院',
  symptom: '咳嗽，发热到医院诊',
  presentIllnessHistory: '咳嗽、生命体征平稳，精神状态较好',
  chiefComplaint: '发热、无力',
  underMicroscope: '',
  medicineRecordList: [],
  personWarnEventList: [
    { eventRule: '密切接触者' },
    { eventRule: '聚集性场所' }
  ] // 触发规则
}
// 学校密接儿童 1
const people4 = {
  name: '林世昌',
  gender: '男',
  age: 5,
  birthday: '2015-01-07',
  country: '中国',
  cardType: '身份证号',
  cardId: '4418022015042730137',
  phone: '',
  area: '清城区',
  address: '广东省清远市清城区石角镇美林湖怡景湾2-2梯1506',
  workplace: '广州新豪东安小学',
  crowdCode: '6',
  testDate: '2020-12-09',
  testResult: '阳性',
  school: '广州新豪东安小学',
  className: '一年级2班',
  hospital: '清远市第一人民医院',
  symptom: '发热到医院诊，体温38.1℃',
  presentIllnessHistory: '发热,四肢无力,轻微咳嗽',
  chiefComplaint: '发热',
  underMicroscope: [], // 购药记录
  personWarnEventList: [
    { eventRule: '密切接触者' },
    { eventRule: '聚集性场所' }
  ] // 触发规则
}
// 学校密接儿童 2
const people5 = {
  name: '李家梁',
  gender: '男',
  age: 5,
  birthday: '2015-09-03',
  country: '中国',
  cardType: '身份证号',
  cardId: '4418022015042730423',
  phone: '',
  area: '清城区',
  address: '广东省清远市清城区石角镇美林湖怡景湾11-2梯506',
  workplace: '广州新豪东安小学',
  crowdCode: '6',
  testDate: '2020-12-09',
  testResult: '阳性',
  school: '广州新豪东安小学',
  className: '一年级2班',
  hospital: '清远市第一人民医院',
  symptom: '发热到医院诊，体温37.8℃',
  presentIllnessHistory: '发热、无力、生命体征平稳，精神状态较好',
  chiefComplaint: '发热',
  underMicroscope: [], // 购药记录
  personWarnEventList: [
    { eventRule: '密切接触者' },
    { eventRule: '聚集性场所' }
  ] // 触发规则
}
// 地址列表 包含报警等级信息
const areaList = [
  {
    crowdCode: '10',
    warnLevel: '2',
    cardId: '440981198903295440',
    name: '吴玲',
    addressList: [
      // {
      //   longitude: 113.465428,
      //   latitude: 22.892045,
      //   placeName: "东涌普琳酒店",
      //   address: "广东南沙区东涌普琳酒店",
      //   organizationName: "已推送南沙区疾控中心",
      //   message: "已推送至流调系统",
      //   cardId: "440981198903295440",
      //   name: "吴玲"
      // },
      {
        longitude: 113.069188,
        latitude: 23.515744,
        placeName: '广东省清远市清城区石角镇美林湖怡景湾',
        address: '广东省清远市清城区石角镇美林湖怡景湾6-2梯1506',
        organizationName: '已推送 清远市清城区疾病预防控制中心',
        message: '已推送至流调系统',
        cardId: '440981198903295440',
        name: '吴玲'
      }
    ]
  },
  {
    crowdCode: '1',
    warnLevel: '1',
    cardId: '440981198603295467',
    name: '王*阳',
    addressList: [
      {
        longitude: 113.902049,
        latitude: 22.470739,
        placeName: '深圳蛇口港',
        address: '深圳蛇口港',
        organizationName: '已推送南山区疾控中心',
        message: '已推送至流调系统',
        cardId: '440981198603295467',
        name: '王*阳'
      }
    ]
  },
  {
    gatherCode: '8',
    crowdCode: '6',
    warnLevel: '1',
    cardId: '440981201403295420',
    name: '王*辉',
    addressList: [
      {
        longitude: 112.790809,
        latitude: 24.138982,
        placeName: '广州新豪东安小学',
        address: '清远市清城区',
        organizationName: '已推送 清远市清新区疾病预防控制中心',
        message: '已推送至流调系统',
        cardId: '440981201403295420',
        name: '王*辉'
      }
    ]
  }
]
// 包含密接信息
const closeList = [
  // 密接列表
  {
    cardId: '440981198903295440',
    name: '吴玲',
    list: [
      {
        name: '王*阳',
        closeRelation: '患者家属：其丈夫',
        job: '接泊司机',
        cardId: '440981198603295467',
        phone: '18712346578',
        address: '深圳蛇口港'
      },
      {
        name: '王*辉',
        closeRelation: '患者家属：其子',
        job: '学生',
        cardId: '440981201503295420',
        phone: '',
        address: '广东省清远市清城区石角镇美林湖怡景湾6-2梯1506'
      },
      {
        name: '叶某玲',
        closeRelation: '患者吴玲同事',
        job: '酒店服务人员',
        cardId: '440981198903295489',
        phone: '18022421850',
        address: '南沙区东涌镇隔离酒店普琳酒店'
      },
      {
        name: '叶某玲',
        closeRelation: '患者吴玲同事',
        job: '酒店服务人员',
        cardId: '440981198903295427',
        phone: '18022421850',
        address: '南沙区东涌镇隔离酒店普琳酒店'
      },
      {
        name: '曾某林',
        closeRelation: '患者吴玲同事',
        job: '酒店服务人员',
        cardId: '440981199101165275',
        phone: '18703981506',
        address: '南沙区东涌镇隔离酒店普琳酒店'
      },
      {
        name: '陆某',
        closeRelation: '患者吴玲同事',
        job: '酒店服务人员',
        cardId: '440981198308195897',
        phone: '18098301293',
        address: '南沙区东涌镇隔离酒店普琳酒店'
      },
      {
        name: '冯某芳',
        closeRelation: '患者吴玲同事',
        job: '酒店服务人员',
        cardId: '440981198607155429',
        phone: '18849243927',
        address: '南沙区东涌镇隔离酒店普琳酒店'
      },
      {
        name: '孙某成',
        closeRelation: '患者吴玲同事',
        job: '酒店服务人员',
        cardId: '440981198706032740',
        phone: '18629403176',
        address: '南沙区东涌镇隔离酒店普琳酒店'
      }
    ]
  },
  {
    cardId: '440981201403295420',
    name: '王*辉',
    list: [
      {
        name: '黎政豪',
        closeRelation: '患者的老师',
        job: '教师',
        cardId: '4418021994042730167',
        phone: '18712346578',
        address: '广州市南沙区金隆小学'
      },
      {
        name: '潘颖枞',
        closeRelation: '患者同班同学',
        job: '学生',
        cardId: '4418022015042730921',
        phone: '18712346578',
        address: '广州市南沙区金隆小学'
      },
      {
        name: '梁焯伟',
        closeRelation: '患者同班同学',
        job: '学生',
        cardId: '4418022015042730182',
        phone: '18712346578',
        address: '广州市南沙区金隆小学'
      },
      {
        name: '潘伟杰',
        closeRelation: '患者同班同学',
        job: '学生',
        cardId: '4418022015042730617',
        phone: '18712346578',
        address: '广州市南沙区金隆小学'
      },
      {
        name: '郑锡健',
        closeRelation: '患者同班同学',
        job: '学生',
        cardId: '4418022015042730712',
        phone: '18712346578',
        address: '广州市南沙区金隆小学'
      },
      {
        name: '陈锋',
        closeRelation: '患者同班同学',
        job: '学生',
        cardId: '4418022015042730926',
        phone: '18712346578',
        address: '广州市南沙区金隆小学'
      },
      {
        name: '覃文浩',
        closeRelation: '患者同班同学',
        job: '学生',
        cardId: '4418022015042730159',
        phone: '18712346578',
        address: '广州市南沙区金隆小学'
      },
      {
        name: '李家梁',
        closeRelation: '患者同班同学',
        job: '学生',
        cardId: '4418022015042730782',
        phone: '18712346578',
        address: '广州市南沙区金隆小学'
      },
      {
        name: '林世昌',
        closeRelation: '患者同班同学',
        job: '学生',
        cardId: '4418022015042730571',
        phone: '18712346578',
        address: '广州市南沙区金隆小学'
      }
    ]
  },
  {
    cardId: '440981198603295467',
    name: '王*阳',
    list: [
      {
        name: '吴玲',
        closeRelation: '患者家属：其妻子',
        job: '酒店服务人员',
        cardId: '440981198903295440',
        phone: '18022421850',
        address: '广东省清远市清城区石角镇美林湖怡景湾6-2梯1506'
      },
      {
        name: '王*辉',
        closeRelation: '患者家属：其子',
        job: '学生',
        cardId: '440981201503295420',
        phone: '',
        address: '广东省清远市清城区石角镇美林湖怡景湾6-2梯1506'
      }
    ]
  }
]

// 步骤1
// 地图报黄色(酒店地址、家庭地址）
// 点击黄色报警点：展示个人基本信息、购药记录、医院就诊信息
export function step1() {
  const clonePeople1 = cloneDeep(people1)
  const cloneAreaList = cloneDeep(areaList)

  // 展示列表、 及个人信息
  getImportantListData = [clonePeople1]

  const useCardIds = [clonePeople1].map(v => v.cardId)
  // 展示 地图报点信息
  importantListData = cloneAreaList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
  const index = importantListData.findIndex(v => {
    return v.cardId === clonePeople1.cardId
  })
  if (index !== -1) {
    importantListData[index].positiveNum = 1
    importantListData[index].symptomNum = 1
    console.log(importantListData[index], 'importantListData[index]')
  }
  // 展示密接信息
  closePersonListData = []
  gatherListData = []
}

// 步骤2
// 地图报红色(酒店地址、家庭地址）
// 母亲的新冠病毒例行核酸检测中，复核结果为阳性，展示家庭关系列表（通过全民健康信息管理平台-全员人口库接口获取的家庭信息或公安接口提供的家庭信息：有一个丈夫,一个上学的儿子），展示每个家庭成员的个人基本信息、购药记录信息和医院的就诊信息，	数据来源：全民健康平台-全员人口库、公安、实验室、药监、监测医院
export function step2() {
  const clonePeople1 = cloneDeep(people1)
  const clonePeople3 = cloneDeep(people3)
  const cloneAreaList = cloneDeep(areaList)
  const cloneCloseList = cloneDeep(closeList)

  // 展示列表、 及个人信息
  clonePeople1.testDate = '2020-12-20'
  clonePeople1.testResult = '阳性'

  clonePeople3.testResult = '检测中'
  getImportantListData = [clonePeople1, clonePeople3]

  // 展示 地图报点信息
  const clonePeople1Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople1.cardId)
  )
  clonePeople1Data.warnLevel = 4
  importantListData = [clonePeople1Data]
  const clonePeople3Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople3.cardId)
  )
  clonePeople3Data.addressList = []
  gatherListData = [clonePeople3Data]

  // 展示密接信息
  const useCardIds = [clonePeople1].map(v => v.cardId)
  closePersonListData = cloneCloseList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
}

// 步骤4
// 标签报儿童监测预警（警值低于黄色）
export function step3() {
  const clonePeople1 = cloneDeep(people1)
  const clonePeople2 = cloneDeep(people2)
  const clonePeople3 = cloneDeep(people3)
  const cloneAreaList = cloneDeep(areaList)
  const cloneCloseList = cloneDeep(closeList)

  // 展示列表、 及个人信息
  clonePeople1.testDate = '2020-12-20'
  clonePeople1.testResult = '阳性'

  clonePeople2.testDate = '2020-12-23'
  clonePeople2.testResult = '检测中'

  clonePeople3.testDate = '2020-12-22'
  clonePeople3.testResult = '初筛阳性'
  getImportantListData = [clonePeople1, clonePeople2, clonePeople3]

  // 展示 地图报点信息
  const clonePeople1Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople1.cardId)
  )
  clonePeople1Data.warnLevel = 4
  const clonePeople2Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople2.cardId)
  )
  clonePeople2Data.addressList = []
  importantListData = [clonePeople1Data, clonePeople2Data]
  const clonePeople3Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople3.cardId)
  )
  clonePeople3Data.warnLevel = 2
  gatherListData = [clonePeople3Data]

  // 展示密接信息
  const useCardIds = [clonePeople1].map(v => v.cardId)
  closePersonListData = cloneCloseList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
}

// 步骤5
// 标签报儿童监测预警（警值低于黄色）
// （主线）儿子复核检测结果：阳性（等待上级复核是否确诊病例，此过程跳过不做处理），地图直接报红点（学校地址,学生家庭地址）点击红色图表：展示儿子的密接列表(由急传系统的密切接触表获取)， (同班、老师、家人)
// （支线）儿子隔离满14天且检测结果阴性：取消地图黄色闪点
export function step4() {
  const clonePeople1 = cloneDeep(people1)
  const clonePeople2 = cloneDeep(people2)
  const clonePeople3 = cloneDeep(people3)
  const cloneAreaList = cloneDeep(areaList)
  const cloneCloseList = cloneDeep(closeList)

  // 展示列表、 及个人信息
  clonePeople1.testDate = '2020-12-20'
  clonePeople1.testResult = '阳性'

  clonePeople2.testDate = '2020-12-23'
  clonePeople2.testResult = '初筛阳性'

  clonePeople3.testDate = '2020-12-22'
  clonePeople3.testResult = '阳性'
  getImportantListData = [clonePeople1, clonePeople2, clonePeople3]

  // 展示 地图报点信息
  const clonePeople1Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople1.cardId)
  )
  clonePeople1Data.warnLevel = 4
  const clonePeople2Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople2.cardId)
  )
  importantListData = [clonePeople1Data, clonePeople2Data]
  const clonePeople3Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople3.cardId)
  )
  clonePeople3Data.warnLevel = 4
  gatherListData = [clonePeople3Data]

  // 展示密接信息
  const useCardIds = [clonePeople1, clonePeople3].map(v => v.cardId)
  closePersonListData = cloneCloseList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
}

// 步骤6
// 发现确诊儿子的密接列表内有2人确诊，报学校聚集性事件报警,地图红闪（学校地址，红闪图形需与个案报警有差异，体现出聚集性时间概念）点击红色图标：显示学校具体信息（地址，联系方式，名称，年级总数,有班级总数，学生总数，老师总数)。
export function step5() {
  const clonePeople1 = cloneDeep(people1)
  const clonePeople2 = cloneDeep(people2)
  const clonePeople3 = cloneDeep(people3)
  const clonePeople4 = cloneDeep(people4)
  const clonePeople5 = cloneDeep(people5)
  const cloneAreaList = cloneDeep(areaList)
  const cloneCloseList = cloneDeep(closeList)

  // 展示列表、 及个人信息
  clonePeople1.testDate = '2020-12-20'
  clonePeople1.testResult = '阳性'

  clonePeople2.testDate = '2020-12-23'
  clonePeople2.testResult = '阳性'

  clonePeople3.testDate = '2020-12-22'
  clonePeople3.testResult = '阳性'
  getImportantListData = [
    clonePeople1,
    clonePeople2,
    clonePeople3,
    clonePeople4,
    clonePeople5
  ]

  // 展示 地图报点信息
  const clonePeople1Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople1.cardId)
  )
  clonePeople1Data.warnLevel = 4
  const clonePeople2Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople2.cardId)
  )
  clonePeople2Data.warnLevel = 4
  importantListData = [clonePeople1Data, clonePeople2Data]
  let clonePeople3Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople3.cardId)
  )
  clonePeople3Data = {
    gatherCode: '8',
    crowdCode: '6',
    warnLevel: '4',
    cardId: '440981201403295420',
    name: '王*辉',
    addressList: [
      {
        type: 2,
        longitude: 112.790809,
        latitude: 24.138982,
        placeName: '广州新豪东安小学',
        address: '清远市清城区',
        organizationName: '已推送 清远市清城区疾病预防控制中心',
        message: `已推送至流调系统<br/> 年级总数：共计6个年级
        班级总数： 18个班级学生总数<br/>
        学生总数： 440人<br/>
        老师总数： 50人`,
        cardId: '440981201403295420',
        name: '王*辉'
      }
    ]
  }
  gatherListData = [clonePeople3Data]

  // 展示密接信息
  const useCardIds = [clonePeople1, clonePeople2, clonePeople3].map(
    v => v.cardId
  )
  closePersonListData = cloneCloseList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
}

export function step13() {
  const clonePeople1 = cloneDeep(people1)
  const clonePeople2 = cloneDeep(people2)
  const clonePeople3 = cloneDeep(people3)
  const cloneAreaList = cloneDeep(areaList)
  const cloneCloseList = cloneDeep(closeList)

  // 展示列表、 及个人信息
  clonePeople1.testDate = '2020-12-20'
  clonePeople1.testResult = '阳性'

  clonePeople2.testDate = '2020-12-23'
  clonePeople2.testResult = '检测中'

  clonePeople3.testDate = '2020-12-22'
  clonePeople3.testResult = '阴性'
  getImportantListData = [clonePeople1, clonePeople2, clonePeople3]

  // 展示 地图报点信息
  const clonePeople1Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople1.cardId)
  )
  clonePeople1Data.warnLevel = 4
  const clonePeople2Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople2.cardId)
  )
  clonePeople2Data.addressList = []
  importantListData = [clonePeople1Data, clonePeople2Data]
  const clonePeople3Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople3.cardId)
  )
  clonePeople3Data.warnLevel = 0
  gatherListData = [clonePeople3Data]

  // 展示密接信息
  const useCardIds = [clonePeople1].map(v => v.cardId)
  closePersonListData = cloneCloseList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
}

export function step14() {
  const clonePeople1 = cloneDeep(people1)
  const clonePeople2 = cloneDeep(people2)
  const clonePeople3 = cloneDeep(people3)
  const cloneAreaList = cloneDeep(areaList)
  const cloneCloseList = cloneDeep(closeList)

  // 展示列表、 及个人信息
  clonePeople1.testDate = '2020-12-20'
  clonePeople1.testResult = '阳性'

  clonePeople2.testDate = '2020-12-23'
  clonePeople2.testResult = '初筛阳性'

  clonePeople3.testDate = '2020-12-22'
  clonePeople3.testResult = '阴性'
  getImportantListData = [clonePeople1, clonePeople2, clonePeople3]

  // 展示 地图报点信息
  const clonePeople1Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople1.cardId)
  )
  clonePeople1Data.warnLevel = 4
  const clonePeople2Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople2.cardId)
  )
  clonePeople2Data.warnLevel = 1
  importantListData = [clonePeople1Data, clonePeople2Data]
  const clonePeople3Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople3.cardId)
  )
  clonePeople3Data.warnLevel = 0
  gatherListData = [clonePeople3Data]

  // 展示密接信息
  const useCardIds = [clonePeople1].map(v => v.cardId)
  closePersonListData = cloneCloseList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
}

export function step15() {
  const clonePeople1 = cloneDeep(people1)
  const clonePeople2 = cloneDeep(people2)
  const clonePeople3 = cloneDeep(people3)
  const cloneAreaList = cloneDeep(areaList)
  const cloneCloseList = cloneDeep(closeList)

  // 展示列表、 及个人信息
  clonePeople1.testDate = '2020-12-20'
  clonePeople1.testResult = '阳性'

  clonePeople2.testDate = '2020-12-23'
  clonePeople2.testResult = '阳性'

  clonePeople3.testDate = '2020-12-22'
  clonePeople3.testResult = '阴性'
  getImportantListData = [clonePeople1, clonePeople2, clonePeople3]

  // 展示 地图报点信息
  const clonePeople1Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople1.cardId)
  )
  clonePeople1Data.warnLevel = 4
  const clonePeople2Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople2.cardId)
  )
  clonePeople2Data.warnLevel = 4
  importantListData = [clonePeople1Data, clonePeople2Data]
  const clonePeople3Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople3.cardId)
  )
  clonePeople3Data.warnLevel = 0
  gatherListData = [clonePeople3Data]

  // 展示密接信息
  const useCardIds = [clonePeople1, clonePeople2].map(v => v.cardId)
  closePersonListData = cloneCloseList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
}

// 步骤4
// 标签报儿童监测预警（警值低于黄色）
export function step24() {
  const clonePeople1 = cloneDeep(people1)
  const clonePeople2 = cloneDeep(people2)
  const clonePeople3 = cloneDeep(people3)
  const cloneAreaList = cloneDeep(areaList)
  const cloneCloseList = cloneDeep(closeList)

  // 展示列表、 及个人信息
  clonePeople1.testDate = '2020-12-20'
  clonePeople1.testResult = '阳性'

  clonePeople2.testDate = '2020-12-23'
  clonePeople2.testResult = '阴性'

  clonePeople3.testDate = '2020-12-22'
  clonePeople3.testResult = '阳性'
  getImportantListData = [clonePeople1, clonePeople2, clonePeople3]

  // 展示 地图报点信息
  const clonePeople1Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople1.cardId)
  )
  clonePeople1Data.warnLevel = 4
  const clonePeople2Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople2.cardId)
  )
  clonePeople2Data.addressList = []
  clonePeople2Data.warnLevel = 0
  importantListData = [clonePeople1Data, clonePeople2Data]
  const clonePeople3Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople3.cardId)
  )
  clonePeople3Data.warnLevel = 4
  gatherListData = [clonePeople3Data]

  // 展示密接信息
  const useCardIds = [clonePeople1, clonePeople3].map(v => v.cardId)
  closePersonListData = cloneCloseList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
}

// 步骤4
// 标签报儿童监测预警（警值低于黄色）
export function step25() {
  const clonePeople1 = cloneDeep(people1)
  const clonePeople2 = cloneDeep(people2)
  const clonePeople3 = cloneDeep(people3)
  const clonePeople4 = cloneDeep(people4)
  const clonePeople5 = cloneDeep(people5)
  const cloneAreaList = cloneDeep(areaList)
  const cloneCloseList = cloneDeep(closeList)

  // 展示列表、 及个人信息
  clonePeople1.testDate = '2020-12-20'
  clonePeople1.testResult = '阳性'

  clonePeople2.testDate = '2020-12-23'
  clonePeople2.testResult = '阴性'

  clonePeople3.testDate = '2020-12-22'
  clonePeople3.testResult = '阳性'
  getImportantListData = [
    clonePeople1,
    clonePeople2,
    clonePeople3,
    clonePeople4,
    clonePeople5
  ]

  // 展示 地图报点信息
  const clonePeople1Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople1.cardId)
  )
  clonePeople1Data.warnLevel = 4
  const clonePeople2Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople2.cardId)
  )
  clonePeople2Data.addressList = []
  clonePeople2Data.warnLevel = 0
  importantListData = [clonePeople1Data, clonePeople2Data]
  let clonePeople3Data = cloneAreaList.find(
    v => String(v.cardId) === String(clonePeople3.cardId)
  )
  clonePeople3Data = {
    gatherCode: '8',
    crowdCode: '6',
    warnLevel: '4',
    cardId: '440981201403295420',
    name: '王*辉',
    addressList: [
      {
        type: 2,
        longitude: 112.790809,
        latitude: 24.138982,
        placeName: '广州新豪东安小学',
        address: '清远市清城区',
        organizationName: '已推送 清远市清城区疾病预防控制中心',
        message: `已推送至流调系统<br/> 年级总数：共计6个年级
        班级总数： 18个班级学生总数<br/>
        学生总数： 440人<br/>
        老师总数： 50人`,
        cardId: '440981201403295420',
        name: '王*辉'
      }
    ]
  }
  gatherListData = [clonePeople3Data]

  // 展示密接信息
  const useCardIds = [clonePeople1, clonePeople3].map(v => v.cardId)
  closePersonListData = cloneCloseList.filter(v => {
    return useCardIds.indexOf(v.cardId) !== -1
  })
}

// 步骤6
// 发现确诊儿子的密接列表内有2人确诊，报学校聚集性事件报警,地图红闪（学校地址，红闪图形需与个案报警有差异，体现出聚集性时间概念）点击红色图标：显示学校具体信息（地址，联系方式，名称，年级总数,有班级总数，学生总数，老师总数)。
export function stepFinal() {
  // 展示列表、 及个人信息
  getImportantListData = []

  // 展示 地图报点信息
  importantListData = []
  gatherListData = []

  // 展示密接信息
  closePersonListData = []
}

// 聚集性预警事件查询
export function gatherList(params) {
  return Promise.resolve({ ...resCode, data: gatherListData })
}

// 重点人群查询
export function importantList(params) {
  return Promise.resolve({ ...resCode, data: importantListData })
}

// 症候群预警事件查询
export function syndromeList(params) {
  return Promise.resolve({ ...resCode, data: [] })
}

// 环境采样预警事件查询 TODO
export function envList(params) {
  return Promise.resolve({ ...resCode, data: [] })
}

// 网络舆情预警事件查询 TODO
export function netList(params) {
  return Promise.resolve({ ...resCode, data: [] })
}

// 药店销售预警事件查询 TODO
export function medicineList(params) {
  return Promise.resolve({ ...resCode, data: [] })
}

/**
 * @param {*} params
 */

// 重点人群查询
export function getImportantList(params) {
  return Promise.resolve({
    ...resCode,
    data: getImportantListData.filter(v => {
      return String(v.crowdCode) === String(params.crowdCode)
    })
  })
}

// 人员详情查询
export function getPersonnelInfo(params) {
  return Promise.resolve({
    ...resCode,
    data: getImportantListData.find(v => {
      return (
        String(v.cardId) === String(params.cardId) &&
        String(v.name) === String(params.name)
      )
    })
  })
}

// 根据姓名身份证号查询密接人员列表
export function getClosePersonList(params) {
  let data = closePersonListData.find(v => {
    return (
      String(v.cardId) === String(params.cardId) &&
      String(v.name) === String(params.name)
    )
  })
  if (data) {
    data = data.list
  } else {
    data = []
  }
  return Promise.resolve({
    ...resCode,
    data
  })
}

// 流程一
export function branch1(init) {
  console.log('branch1')

  const arr = [step1, step2, step3, step4, step5, stepFinal]
  let index = 0
  document.addEventListener('keydown', function f(key) {
    if (key.code === 'Space') {
      console.log(index)
      arr[index]()
      init()
      index++
      if (index >= arr.length) {
        index = 0
      }
    }
  })
}

// 流程二
export function branch2(init) {
  const arr = [step1, step2, step13, step14, step15, stepFinal]
  console.log('branch2')
  // arr.forEach((v, i) => {
  //   setTimeout(() => {
  //     v();
  //     init();
  //   }, (i * 20 + 5) * 1000);
  // });

  let index = 0
  document.addEventListener('keydown', function f(key) {
    if (key.code === 'Space') {
      console.log(index)
      arr[index]()
      init()
      index++
      if (index >= arr.length) {
        index = 0
      }
    }
  })
}

// 流程三
export function branch3(init) {
  const arr = [step1, step2, step3, step24, step25, stepFinal]
  console.log('branch3')
  // arr.forEach((v, i) => {
  //   setTimeout(() => {
  //     v();
  //     init();
  //   }, (i * 20 + 5) * 1000);
  // });

  let index = 0
  document.addEventListener('keydown', function f(key) {
    if (key.code === 'Space') {
      console.log(index)
      arr[index]()
      init()
      index++
      if (index >= arr.length) {
        index = 0
      }
    }
  })
}
