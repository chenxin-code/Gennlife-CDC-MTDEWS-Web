const Mock = require('mockjs')

const data = Mock.mock({
  'array|10-15': [
    {
      'city|+1': ['广州', '云浮', '肇庆', '江门', '茂名', '湛江', '深圳', '阳江'],
      'total|100000-200000': 199999,
      'useTotal|100000-200000': 100000,
      'odd|1-100': 20
    }
  ]
})

// export function getList() {
//   return { data: data }
// }
module.exports = [
  {
    url: '/vue-admin-template/immigration/getList',
    type: 'post',
    response: config => {
      console.log('123')
      return {
        code: 20000,
        data: data,
        msg: '添加成功'
      }
    }
  }
]

