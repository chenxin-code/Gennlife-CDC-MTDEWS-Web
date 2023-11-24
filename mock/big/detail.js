const Mock = require("mockjs");

let data = Mock.mock({
  "items|100": [
    {
      name: "@cname",
      card: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      "sex|1": ['男', '女'],
      "age|1-100": 50,
      symptom: '无',
      "detection|1": ['是','否'],
      time: '2020.12.03 14:00:00',
      "result|1": ['阴性','阳性']
    }
  ]
});

module.exports = [
    // 环境采样列表查询
    {
      url: "/vue-admin-template/details/getList",
      type: "post",
      response: config => {
        let {
          page,
          limit,
          hospitalName = false
        } = config.query;
        let items = data.items;
        for(let i of items){
            if(i.detection == "否"){
                i.time = "——";
                i.result = "——";
            }
        }
        return {
          code: 20000,
          totalCount: items.length,
          totalPage: Math.ceil(items.length / limit),
          data: items.slice((page - 1) * limit, page * limit)
        };
      }
    }
  ];
  
