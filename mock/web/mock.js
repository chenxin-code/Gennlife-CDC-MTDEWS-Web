const Mock = require("mockjs");

let data = Mock.mock({
  "items|100": [
    {
      id: "@id",
      title: "@sentence(10, 20)",
      "status|1": ["published", "draft", "deleted"],
      author: "name",
      display_time: "@datetime",
      pageviews: "@integer(300, 5000)"
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/mock/list",
    type: "post",
    response: config => {
      let { page, pageSize } = config.query;
      const items = data.items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items.slice((page - 1) * pageSize, page * pageSize)
        }
      };
    }
  },
  {
    url: "/vue-admin-template/mock/add",
    type: "post",
    response: config => {
      let { title, status, author, display_time, pageviews } = config.query;
      data.items.push({
        id: Mock.mock("@id"),
        title,
        status,
        author,
        display_time,
        pageviews
      });
      return {
        code: 20000,
        data: {},
        msg: "添加成功"
      };
    }
  },
  {
    url: "/vue-admin-template/mock/edit",
    type: "post",
    response: config => {
      let { id, title, status, author, display_time, pageviews } = config.query;
      data.items = data.items.map(v => {
        if (v.id === id) {
          return { id, title, status, author, display_time, pageviews };
        }
        return v;
      });
      return {
        code: 20000,
        data: {},
        msg: "编辑成功"
      };
    }
  },
  {
    url: "/vue-admin-template/mock/delete",
    type: "post",
    response: config => {
      let { id } = config.query;
      if (!id) {
        return {
          code: 20000,
          data: {},
          msg: "删除失败"
        };
      }
      data.items = data.items.filter(v => {
        return v.id !== id;
      });
      return {
        code: 20000,
        data: {},
        msg: "删除成功"
      };
    }
  }
];
