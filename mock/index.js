const Mock = require("mockjs");
const { param2Obj } = require("./utils");
const fs = require("fs");
const path = require("path");

// 引入 web、big 目录下 mock 文件
let mocks = [];

if (process.env.NODE_ENV === "production") {
  const arr = [
    "web/age-statistic-data.js",
    "web/case-classification-data.js",
    "web/close.js",
    "web/cumulative-data.js",
    "web/death-statistics-data.js",
    "web/details.js",
    "web/epidemic-cluster-data.js",
    "web/global-data.js",
    "web/import-country-data.js",
    "web/important.js",
    "web/local-statistic-data.js",
    "web/mock.js",
    "web/sick-statistics.js",
    "web/trace.js",
    "web/user.js",
    "web/xiang-gang-data.js",
    "big/aggregation-detail.js",
    "big/crowd-warning.js",
    "big/detail.js",
    "big/flight.js",
    "big/multipoint-forecast.js",
    "big/syndrome.js",
    "big/immigration.js"
  ];
  arr.forEach(v => {
    mocks = [...mocks, ...require("./" + v)];
  });
} else {
  const files = fs
    .readdirSync(path.resolve(__dirname, "./web"))
    .map(v => `./web/${v}`)
    .concat(
      fs.readdirSync(path.resolve(__dirname, "./big")).map(v => `./big/${v}`)
    );
  files.forEach(file => {
    mocks.push(...require(fs.realpathSync(path.resolve(__dirname, file))));
  });
}

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    this.proxy_send(...arguments);
  };

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null;
      if (respond instanceof Function) {
        const { body, type, url } = options;
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        });
      } else {
        result = respond;
      }
      return Mock.mock(result);
    };
  }

  for (const i of mocks) {
    Mock.mock(
      new RegExp(i.url),
      i.type || "get",
      XHR2ExpressReqWrap(i.response)
    );
  }
}

module.exports = {
  mocks,
  mockXHR
};
