const Mock = require("mockjs");

const goodsType = ["海鲜", "水产"];
const fromArea = ["美国", "澳大利亚", "英国", "意大利"];
const traceType = ["海运", "空运"];
const testResult = ["阴性", "阳性"];

let data = Mock.mock({
  "items|100": [
    {
      // simpleNo: "", //冷链编号
      // goodsType: "", //物品类型
      // goodsName: "", //物品名称
      // fromArea: "", //来源地
      // traceType: "", //运输方式
      // testDate: "", //检测时间
      // testResult: "", //检测结果
      // testPlaceList: [
      //   ("place": ""), //采样地点
      //   ("testResult": "") //采样结果
      // ],
      
    /*  "testPlaceList|3": [
        {
          simpleNo: "@id",
          "goodsType|1": goodsType,
          goodsName: "@cword(3, 7)",
          "fromArea|1": fromArea,
          "traceType|1": traceType,
          testDate: "@datetime",
          "testResult|1": testResult,
        }
      ],
      */
      simpleNo: "@id",
      "goodsType|1": goodsType,
      goodsName: "@cword(3, 7)",
      "fromArea|1": fromArea,
      "traceType|1": traceType,
      testDate: "@datetime",
      "testResult|1": testResult,
      "testPlaceList|2-6": [
        {
          place: "@city(true)",
          "testResult|1": testResult
        }
      ]
    }
  ]
});

module.exports = [
  // 查询条件
  {
    url: "/vue-admin-template/cdc-eew/searchList",
    type: "post",
    response: config => {
      let allSearch = { goodsType, fromArea, traceType, testResult };
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
    url: "/vue-admin-template/cdc-eew/goods/env/list",
    type: "post",
    response: config => {
      let {
        page,
        limit,
        goodsCode = false,
        fromArea = false,
        traceCode = false
      } = config.query;
      let items = data.items;
      let arr = [
        [goodsCode, "goodsType"],
        [fromArea, "fromArea"],
        [traceCode, "traceType"]
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
