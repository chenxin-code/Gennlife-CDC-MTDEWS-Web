const Mock = require("mockjs");
let data = Mock.mock({
  "items|20": [
    {
      id: "@id",
      'death-date': 'sadsvf',
      age: 'sacdsvf',
      'case-number': 'dczzxc'
    }
  ]
});

module.exports = [
  {
    url: '/vue-admin-template/mock/death-statistics-data',
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