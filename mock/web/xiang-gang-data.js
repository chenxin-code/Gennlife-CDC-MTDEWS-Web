const Mock = require("mockjs");
let data = Mock.mock({
  "items|20": [
    {
      id: "@id",
      closecontactsidentified: "afdfbfvc",
      "import-country|1": ["aa", "bb", "cc"],
      "patient-place": "sads",
      "currention-situation": "sads",
      "hospital-name": "adsva",
      comfirmed: "aaabb",
      "travel-record": "asadsvfdbvfdczszxvcd",
      residence: "safgsvf",
      symptoms: "bfdsvdzcrvfs",
      remarks: "dfvcrvfs",
      "epidemiological-association": "bfdsvdzcrvfs",
      region: "bfdsvdzcrvfs",
      profession: "bfdsvdzcrvfs",
      group: "bfdsvdzcrvfs",
      "age-2": "bfdsvdzcrvfs",
      "sick-day": "bdrvfs",
      "sick-month": "brvfs",
      "sick-year": "zcrvfs",
      "sick-date": "bfdfs",
      "report-date": "bfdsvdzcrvfs",
      "case-number": "bfcrvfs",
      gender: "bfdsvdzcrvfs",
      age: "bfdsvd",
      "case-classification": "bfdsvdzcrvfs",
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/mock/xiang-gang-data",
    type: "post",
    response: config => {
      let { page, limit } = config.query;
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