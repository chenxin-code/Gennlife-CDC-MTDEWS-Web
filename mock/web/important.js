const Mock = require("mockjs");

let data = Mock.mock({
    "items|1000": [
        {
            name: "@cname",
            "sex|1": ['男', '女'],
            idNumber: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            place:"@county(true)",
            "job|1": ['司机','医生','教师','程序员','学生','公务员'],
            temperature: /^(3\d|4[0-5])(\.\d)?$/,
            // "state|1":['异常','正常'] ,
            // "reason|1": ['重症', '痊愈', '轻度']
        }
    ]
});
module.exports = [
    {                                          //获取
      url: "/vue-admin-template/mock/importantList",
      type: "post",
      response: config => {
        let { page, limit } = config.query;
        const items = data.items;
        return {
          code: 20000,
          data: {
            total: items.length,
            items: items.slice((page - 1) * limit, page * limit)
          }
        };
      }
    },
    {                                           //查询
      url:"/vue-admin-template/mock/importFindList",
      type:"post",
      response: config =>{
        let {input,diagnose,condition,time,startEnd} = config.query;
        let items = data.items;
        let findInput = items.filter(item =>{
          return (item.name == input || item.idNumber == input)
        })
        return {
          code:20000,
          data:{
            total: findInput.length,
            items: findInput
          }
        }
      }
    }              
]