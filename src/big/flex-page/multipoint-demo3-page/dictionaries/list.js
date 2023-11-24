import { dataDesensitization } from '@/utils/index'

const importantListConfig = [
  { label: '姓名', field: 'name' },
  { label: '性别', field: 'gender' },
  { label: '国籍', field: 'country' },
  { label: '证件类型', field: 'cardType' },
  {
    label: '证件号',
    field: 'cardId',
    render: data => {
      return dataDesensitization(data.cardId, 10, 6)
    }
  },
  { label: '就诊医院', field: 'hospital' },
  { label: '检测时间', field: 'testDate' },
  {
    label: '检测结果',
    field: 'testResult',
    render: data => {
      return data.testResult ? data.testResult : '未检测'
    }
  },
  {
    label: '购药记录',
    field: 'medicineEx',
    render: data => {
      return Number(data.medicineEx) === 0 ? '有' : '无'
    }
  },
  { label: '临床症状', field: 'symptom' },
  {
    label: '触发规则',
    field: 'personWarnEventList',
    style: { color: '#1491ff' },
    render: data => {
      return data.personWarnEventList.map(v => v.eventRule).join(',')
    }
  }
]

export default {
  importantListConfig
}
