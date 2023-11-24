const Mock = require("mockjs");

const hospitalName = ['广州第一医院','广州第二医院','广州第三医院'];

let data = Mock.mock({
  "items|100": [
    {
    //   hospitalName: "医院名称",
    //   lastYear: "上一年ILI%",
    //   nowYear: "当前ILI%",
    //   synchronous1: "同期退热药平均用量",
    //   current: "当前退热药平均用量",
    //   warnContent:"预警内容",
    //   warnTime: "预警日期",
      "hospitalName|1": hospitalName,
      lastYear: '3%',
      nowYear: "6%",
      synchronous1: '500/日',
      current: '800/日',
      warnContent: "ILI高于同期水平 退热药用药量高于同期水平 神经氨酸酶抑制剂用药量增大",
      warnTime: '2020.12.03 14:00:00',
    }
  ]
});

module.exports = [
    // 查询条件
    {
      url: "/vue-admin-template/cdc-eew/findList",
      type: "post",
      response: config => {
        let allSearch = { hospitalName };
        allSearch = Object.entries(allSearch).reduce((a, b) => {
          return { ...a, [b[0]]: b[1].map(v => ({ label: v, value: v })) };
        }, {});
        return {
          code: 20000,
          data: { ...allSearch }
        };
      }
    },
    // 环境采样列表查询
    {
      url: "/vue-admin-template/cdc-eew/getList",
      type: "post",
      response: config => {
        let {
          page,
          limit,
          hospitalName = false
        } = config.query;
        let items = data.items;
        let arr = [
          [hospitalName, "hospitalName"]
        ];
        arr.map(v => {
          if (v[0]) {
            items = items.filter(j => {
              return j[v[1]] === v[0];
            });
          }
        });
  
        return {
          code: 20000,
          totalCount: items.length,
          totalPage: Math.ceil(items.length / limit),
          data: items.slice((page - 1) * limit, page * limit)
        };
      }
    }
  ];
  
