const Mock = require("mockjs");
let data = Mock.mock({
  "items|20": [
    {
      id: "@id",
      'total-death': 'sadsvf',
      summary: 'sacdsvf',
      'total-case-local-epidemic': 'dczzxc',
      'total-case-input-epidemic': 'adfvf',
      'total-case-local': 'adsf',
      'total-case-input': 'adsf',
      'report-date': 'adsf',
      'total-recovered': 'adsf',
      'total-case': 'adsf'
    }
  ]
});

module.exports = [
  {
    url: '/vue-admin-template/mock/case-classification-data',
    type: "post",
    response: config => {
      let { page, limit } = config.query
      let res = data.items
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