const Mock = require("mockjs");

let data = Mock.mock({
  "items|20": [
    {
      id: "@id",
      "name|1": ["aa", "bb", "cc"],
      "sex|1": ["男", "女"],
      "number|1": /\d{18}/,
      "age|1-100": 1,
      contact: "aa",
      place: "aaabbbcccddd",
      quarantine: "医院",
      "morbidity|1": ["是", "否"],
      time: '@date(yyyy/MM/dd)'
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/mock/userList",
    type: "post",
    response: config => {
      let { page, limit } = config.query
      let queryList = JSON.parse(config.query.params)
      var filterObj = {}
      var isChange = false
      for (const key in queryList) {
        var flag = queryList[key] !== ''
        if (flag) {
          isChange = true
          filterObj[key] = queryList[key]
        }
      }
      let res = data.items
      if (isChange) {
        const keys = Object.keys(filterObj)
        const items = data.items
        res = items.filter(item => {
          return keys.every(key => {
            return item[key] === filterObj[key]
          })
        })
      }
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