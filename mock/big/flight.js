const Mock = require("mockjs");

const place = ["aa", "bb", "cc", "dd", "ee"];
const nationality = ['11', '22', '33', '44', '55'];
const sexType = ["男", "女"];
const population = ['hhh', 'ddd'];
const symptom = ["qqwe", "nhbg"];

let data = Mock.mock({
  "items|100": [
    {
      clusterCaseNumber: "@id",
      'riskLevel|1': ['一般', '高危'],
      "testPlaceList|3": [
        {
          name: 'asdsf',
          'sex|1': ['男', '女'],
          age: 18,
          'identityType|1': ['身份证', 'aaa'],
          identityNumber: 12345443,
          flightNumber: 2323,
          seatNumber: 12343,
          airlineCompany: 'afdsasds',
          aggregationTime: '213243',
          detectionTime: '2132',
          'detectionResult|1': ['阴性', '阳性'],
          'place|1': place,
          'nationality|1': nationality,
          'sexType|1': sexType,
          'population|1': population,
          'symptom|1': symptom
        }
      ]
    }
  ]
});

module.exports = [
  // 查询条件
  {
    url: "/vue-admin-template/cdc-eew/searchFilghtList",
    type: "post",
    response: config => {
      let allSearch = { place, nationality, sexType, population, symptom };
      allSearch = Object.entries(allSearch).reduce((a, b) => {
        return { ...a, [b[0]]: b[1].map(v => ({ label: v, value: v })) };
      }, {});
      return {
        code: 20000,
        data: { ...allSearch }
      };
    }
  },
  {
    url: "/vue-admin-template/cdc-eew/goods/env/flightList",
    type: "post",
    response: config => {
      let {
        page,
        limit,
        placeCode = false,
        nationalityCode = false,
        sexCode = false,
        populationCode = false,
        symptomCode = false
      } = config.query;
      let items = data.items;
      let arr = []
      arr.push([placeCode, "place"])
      arr.push([nationalityCode, "nationality"])
      arr.push([sexCode, "sexType"])
      arr.push([populationCode, "population"])
      arr.push([symptomCode, "symptom"])
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
