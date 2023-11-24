const { config } = require("@vue/test-utils");
const Mock = require("mockjs");

let data = Mock.mock({
  "items|1000": [  //items 值为100
    {
      name: "@cname",
      idNumber: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      "sex|1": ['男', '女'],
      "age|1-100": 50,
      symptom: '咳嗽,发烧,肺部阴影',
      firstTime: '2020/11/15',
      hospital: '广州医院302',
      "nowCase|1": ['死亡', '重症', '痊愈', '轻度'],
      "job|1": ['司机', '医生', '教师', '程序员', '学生', '公务员', '护士', '主播'],
      tel: /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/,
      address: '@county(true)',
      company: '@county(true)',
      kind: '确诊病例',
      hospital: '中山大学第一附属医院',
      sickTime: '2020/11/15',
      dieTime: '2020/11/15',
      seeTime: '2020/11/15',
      // msg: "success",
      // code: 0,
      // totalCount: 2000,
      // pageSize: 10,
      // totalPage: 200,
      // currPage: 2,
      // "data|1": [
      //   {
      //     "id": 1,
      //     "sqlName": "visit_sn表查询",
      //     "sql": "select * from ",
      //     "tableName": "visit_sn",
      //     "tableId": 3,
      //     "modelName": "模型名称",
      //     "modelId": 6,
      //     "dbName": "数据库名称",
      //     "dbId": 8,
      //     "operator": "limz",
      //     "createDate": "2020-08-09",
      //     "modifyDate": "2020-08-09",
      //     "checkDate": "2020-08-09",
      //     "checker": "审核人",
      //     "checkStatus": 0,
      //     "publishStatus": 0
      //   },
      //   {
      //     "id": 2,
      //     "sqlName": "visit_sn表查询",
      //     "sql": "select * from ",
      //     "tableName": "visit_sn",
      //     "modelName": "模型名称",
      //     "dbId": 8,
      //     "tableId": 3,
      //     "dbName": "数据库名称",
      //     "modelId": 6,
      //     "operator": "limz",
      //     "createDate": "2020-08-09",
      //     "modifyDate": "2020-08-09",
      //     "reviewDate": "2020-08-09",
      //     "reviewer": "审核人",
      //     "checkStatus": 0,
      //     "publishStatus": 0
      //   }
      // ]
    }]
});

module.exports = [
  {                                          //获取
    url: "/vue-admin-template/mock/userlist",
    type: "post",
    response: config => {
      let { page, limit } = config.query;
      let items = data.items;
      // items = items.map(item=>{
      //   delete item.job
      //   delete item.tel
      //   delete item.address
      //   delete item.company
      //   delete item.kind
      //   delete item.hospital
      //   delete item.sickTime
      //   delete item.dieTime
      //   delete item.seeTime
      // })
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items.slice((page - 1) * limit, page * limit)
        }
      };
    }
  },
  {                                        //basicMessage
    url: "/vue-admin-template/mock/basicMessage",
    type: "post",
    response: config => {
      let { number } = config.query;
      let { items } = data;
      let a = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i].idNumber === number) {
          a = i;
          break;
        }
      }
      return {
        code: 20000,
        data: {
          job: items[a].job,
          tel: items[a].tel,
          name: items[a].name,
          sex: items[a].sex,
          age: items[a].age,
          address: items[a].address,
          company: items[a].company
        }
      }
    }
  },
  {                                        //cdcMessage
    url: "/vue-admin-template/mock/cdcMessage",
    type: "post",
    response: config => {
      let { number } = config.query;
      let { items } = data;
      let a = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i].idNumber === number) {
          a = i;
          break;
        }
      }
      return {
        code: 20000,
        data: {
          kind: items[a].kind,
          sickTime: items[a].sickTime,
          seeTime: items[a].seeTime,
          dieTime: items[a].dieTime,
          hospital: items[a].hospital
        }
      }
    }
  },
  {                                           //查询
    url: "/vue-admin-template/mock/findlist",
    type: "post",
    response: config => {
      let { input, diagnose, condition, time, startEnd } = config.query;
      let items = data.items;
      let findInput = items.filter(item => {
        return (item.name == input || item.idNumber == input)
      })
      return {
        code: 20000,
        data: {
          total: findInput.length,
          items: findInput
        }
      }
      // let findDiagnose = items.filter(item => {
      //   return item.symptom == diagnose
      // })
      // let findCondition = items.filter(item => {
      //   return item.nowCase == condition
      // })
      // let findTime = items.filter(item => {
      //   return item.firstTime == time
      // })
      // if(!input && !diagnose && !condition && !time && !startEnd){
      //   return {
      //     code: 20000,
      //     data: {
      //       total: items.length,
      //       items: items.slice((page - 1) * pageSize, page * pageSize)
      //     }
      //   }
      // }
      // if(input){
      //   return {
      //     code: 20000,
      //     data:{
      //       total: findInput.length,
      //       items: findInput.slice((page - 1) * pageSize, page * pageSize)
      //     }
      //   }
      // }
      // if(diagnose){
      //   return {
      //     code: 20000,
      //     data:{
      //       total: findDiagnose.length,
      //       items: findDiagnose.slice((page - 1) * pageSize, page * pageSize)
      //     }
      //   }
      // }
      // if(condition){
      //   return {
      //     code: 20000,
      //     data:{
      //       total: findCondition.length,
      //       items: findCondition.slice((page - 1) * pageSize, page * pageSize)
      //     }
      //   }
      // }
      // if(time){
      //   return {
      //     code: 20000,
      //     data:{
      //       total: findTime.length,
      //       items: findTime.slice((page - 1) * pageSize, page * pageSize)
      //     }
      //   }
      // }
    }
  }
  /* {
     
     let {result,nowCase,firstTime} = config.query;
     return {
       code:20000,
       
     }
   }, */
];