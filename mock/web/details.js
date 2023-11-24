const Mock = require("mockjs");
let data = Mock.mock({
  "items|20": [
    {
      id: "@id",
      "name|1": ["aa", "bb", "cc"],
      // name: "张三李四",
      "sex|1": ["男", "女"],
      "number|1": /\d{18}/,
      "age|1-100": 1,
      treatment: "住院",
      hospital: "广州医院302",
      quarantine: "隔离点隔离",
      place: "酒店"
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/mock/detailsList",
    type: "post",
    response: config => {
      let { page, limit } = config.query;
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
  },
  {
    url: "/vue-admin-template/mock/relationList",
    type: "post",
    response: config => {
      let { relationSize } = config.query;
      const items = data.items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items.slice(0, relationSize)
        }
      };
    }
  }
];