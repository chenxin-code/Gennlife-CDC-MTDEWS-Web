const Mock = require("mockjs");
let data = Mock.mock({
  "items|20": [
    {
      id: "@id",
      'import-case': 'sadsvf',
      'import-country': 'sacdsvf',
      'report-date': 'dczzxc',
    }
  ]
});

module.exports = [
  {
    url: '/vue-admin-template/mock/import-country-data',
    type: "post",
    response: config => {
      let { page, limit, params } = config.query
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