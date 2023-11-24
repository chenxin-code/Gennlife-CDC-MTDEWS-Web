const Mock = require("mockjs");
const Random = require('mockjs').Random;

const region = ["番禺区", "天河区",'东莞'];
const nationality = ["美国", "澳大利亚", "英国", "意大利",'中国'];
const sex = ["男", "女"];
const peopleKind = ["解除人医学观察人员", "非正常人员"];
const clinic = ["发热", "无"];

let data = Mock.mock({
  "items|100": [
    {
        // name: '姓名',
        // sex: '性别',
        // age: '年龄',
        // region: '所在区',
        // nationality: '国籍',
        // idType: '证件类型',
        // idCard: '证件号码',
        // peopleKind: '人群分类',
        // source: '来源地',
        // hospital:'就诊医院',
        // result:'是否确诊',
        // clinic:'临床症状',
      // photo:Random.image('150x170'),
      name: "@cname",
      "sex|1": sex,
      "age|1-100": 50,
      "region|1": region,
      "nationality|1": nationality,
      idType: "身份证",
      idCard:/^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      "peopleKind|1": peopleKind,
      source:'天津',
      hospital:'广州第一医院',
      "result|1":['是','否'],
      "clinic|1":clinic,
      "testPlaceList": [
        {
          photo:Random.image('60x70')
        }
      ]
    }
  ]
});

module.exports = [
  // 查询条件
  {
    url: "/vue-admin-template/crowd/searchList",
    type: "post",
    response: config => {
      let allSearch = { region, nationality, sex, peopleKind,clinic };
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
    url: "/vue-admin-template/crowd/goods/env/list",
    type: "post",
    response: config => {
      let {
        page,
        limit,
        region = false,
        nationality = false,
        sex = false,
        peopleKind = false,
        clinic = false
      } = config.query;
      let items = data.items;
      let arr = [
        [region, "region"],
        [nationality, "nationality"],
        [sex, "sex"],
        [peopleKind, "peopleKind"],
        [clinic, "clinic"]
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
