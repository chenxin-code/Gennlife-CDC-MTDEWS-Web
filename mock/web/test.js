const Mock = require("mockjs");

module.exports = [
  {
    url: '/test/getDays',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: {
          data1: Mock.mock([
            {name: '超高风险国家', day: '@natural(0,14)'},
            {name: '高风险国家', day: '@natural(0,14)'},
            {name: '中低风险国家', day: '@natural(0,14)'},
            {name: '低风险国家', day: '@natural(0,14)'}
          ]),
          data2: Mock.mock([
            {name: '超高风险国家', day: '@natural(0,14)'},
            {name: '高风险国家', day: '@natural(0,14)'},
            {name: '中低风险国家', day: '@natural(0,14)'},
            {name: '低风险国家', day: '@natural(0,14)'}
          ])
        }
    }
  }
  }
];
