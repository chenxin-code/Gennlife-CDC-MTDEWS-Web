const Mock = require("mockjs");
const Random = require("mockjs").Random

let data = Mock.mock({
  items: [
    {
      showInformation: {
        personaInformation: {
          image: Random.image('200x100', '#000', '图'),
          name: "张三",
          sex: "男",
          age: 32,
          birth: "1992年9月24日",
          country: "中国",
          idType: "身份证",
          idNumber: 12345678917,
          tel: 12345678912,
          place: "aaaaaadsfs",
          address: "aaaaaadsfs",
          workPlace: "aaaaaadsfsfv"
        },
        visitInformation: {
          time: "xxxx年xx月xx日",
          result: "阳性",
          hospital: "asfdasfdv",
          feverClinic: "是",
          symptom: "sadsfzcdsvd"
        },
        'placeList|3': [
          {
            location: "bbxszdcvsf",
            number: 1234521345633,
            isTest: "是",
            result: "阴性"
          }
        ],
        'relationList|3': [
          {
            name: "adsacad",
            relation: "朋友",
            idNumber: 2343324356455,
            tel: 2132453435242,
            address: "asfdsgfdgsdfva"
          }
        ]
      }
    }
  ]
});

module.exports = [
  {
    url: "/vue-admin-template/cdc-eew/goods/env/aggregationDetailList",
    type: "post",
    response: config => {
      const items = data.items
      return {
        code: 20000,
        totalCount: items.length,
        data: {
          items
        }
      };
    }
  }
];
