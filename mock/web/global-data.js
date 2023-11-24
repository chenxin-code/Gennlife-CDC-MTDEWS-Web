const Mock = require("mockjs");
let data = Mock.mock({
  "items|20": [
    {
      "id|+1": 1,
      population: 1324434323,
      'total-detection-percent': 12345678,
      'detection-million': 123456,
      'total-detection': 1234567,
      'total-case-percent': 1234,
      'total-death-percent': 12345678,
      'death-million': 1234567,
      'count-date': 1234567,
      'country-region': 1234567,
      'total-case': 1234567,
      'new-case': 1234567,
      'total-death': 1234567,
      'new-death': 1234567,
      'case-million': 1234567,
      'active-revere': 111,
      'active-case': 13,
      'total-recovered': 12324
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/mock/globalData",
    type: "post",
    response: config => {
      let { page, limit } = config.query
      const res = data.items
      return {
        msg: "success",
        code: 20000,
        totalCount: res.length,
        pageSize: limit,
        totalPage: res.length / limit,
        currPage: page,
        data: {
          items: res.slice((page - 1) * limit, page * limit)
        }
      };
    }
  }
];