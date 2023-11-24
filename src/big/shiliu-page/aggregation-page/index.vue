<template>
  <div class="container">
    <div class="content">
      <!-- tab栏 -->
      <el-tabs :value="activeName" @tab-click="handleClick">
        <el-tab-pane label="航班聚集性病例" name="flight" />
        <el-tab-pane label="轮船聚集性病例" name="ship" />
        <el-tab-pane label="火车聚集性病例" name="train" />
        <el-tab-pane label="学校聚集性病例" name="school" />
        <el-tab-pane
          label="精神专科医院聚集性病例"
          name="psychiatricHospital"
        />
        <el-tab-pane label="农贸市场聚集性病例" name="market" />
        <el-tab-pane label="养老福利机构聚集性病例" name="beadhouse" />
        <el-tab-pane label="监管机构聚集性病例" name="regulators" />
      </el-tabs>

      <!-- tab内容 -->
      <div class="tab-header">
        <!-- 循环搜索条件 -->
        <template v-for="(v, i) in searchs">
          <template v-if="v.type === 'select'">
            <el-select
              :key="i"
              v-model="param[v.field]"
              class="select"
              :placeholder="param[v.placeholder]"
              :popper-append-to-body="false"
              @change="searchFetch"
            >
              <el-option
                v-for="item in allSearch[v.searchArr]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </template>
        </template>
      </div>

      <!-- 数据内容 -->
      <div class="tab-content">
        <!-- 表格 -->
        <el-table :data="tableData" style="width:100%" height="100%">
          <!-- 循环列表 -->
          <template v-for="(v, i) in Object.entries(fields)">
            <!-- 自定义渲染 -->
            <template v-if="typeof v[1] === 'object'">
              <el-table-column :key="i" :label="v[1].label" width="120">
                <template slot-scope="scope">
                  <component
                    :is="v[1].render"
                    :row="scope.row"
                    :click="testClick"
                  />
                </template>
              </el-table-column>
            </template>
            <!-- 普通表格项 -->
            <el-table-column
              v-else
              :key="i"
              :prop="v[0]"
              :label="v[1]"
              width="120"
            />
          </template>
        </el-table>

        <!-- 分页 -->
        <div class="pages">
          <el-pagination
            background
            :current-page="page"
            :page-sizes="[10, 50, 100, 200]"
            :page-size="limit"
            layout="total, ->, prev, pager, next, sizes,jumper"
            :total="totalCount"
            popper-class="page-size-popper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <div class="dialog">
      <el-dialog top="0" :visible.sync="dialogVisible">
        <aggregation-datail
          :persona-information="dialogVal.personaInformation"
          :visit-information="dialogVal.visitInformation"
          :place-list="dialogVal.placeList"
          :relation-list="dialogVal.relationList"
        />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  // initSearch,
  flightList,
  fetchAggregationList
} from '@/api/aggregation'
// import AggregationDatail from './AggregationDetail'
import AggregationTest from './components/AggregationTest'

import { getDictionaryList, getGatherList } from '@/api/real-api'

// 默认进入tab
const activeName = 'flight'
// 页面配置
const pageConfig = {
  // 航班列表
  flight: {
    fields: {
      clusterCaseNumber: '聚集性病例编号',
      name: {
        label: '姓名',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.name}</div>
            })
          }
        }
      },
      sex: {
        label: '性别',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.sex}</div>
            })
          }
        }
      },
      age: {
        label: '年龄',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.age}</div>
            })
          }
        }
      },
      identityType: {
        label: '证件类型',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityType}</div>
            })
          }
        }
      },
      identityNumber: {
        label: '证件号码',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityNumber}</div>
            })
          }
        }
      },
      flightNumber: {
        label: '航班号',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.flightNumber}</div>
            })
          }
        }
      },
      seatNumber: {
        label: '座位号',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.seatNumber}</div>
            })
          }
        }
      },
      airlineCompany: {
        label: '航空公司',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.airlineCompany}</div>
            })
          }
        }
      },
      aggregationTime: {
        label: '聚集时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.aggregationTime}</div>
            })
          }
        }
      },
      detectionTime: {
        label: '检测时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.detectionTime}</div>
            })
          }
        }
      },
      detectionResult: {
        label: '检测结果',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              if (v.detectionResult === '阳性') {
                return <div style='color: red'>{v.detectionResult}</div>
              } else {
                return <div>{v.detectionResult}</div>
              }
            })
          }
        }
      },
      riskLevel: '风险等级',
      operation: {
        label: '操作',
        render: {
          functional: true,
          props: {
            row: {},
            click: Function
          },
          render(createElement, context) {
            return [0, 1, 2].map(v => {
              return (
                <div
                  style='cursor: pointer; color: #35eaff'
                  onClick={() =>
                    context.props.click(
                      context.props.row.testPlaceList[v].identityNumber
                    )
                  }
                >
                  查看详情
                </div>
              )
            })
          }
        }
      }
    },
    api: getGatherList,
    searchs: [
      {
        field: 'area',
        type: 'select',
        placeholder: '选择所在地',
        searchArr: 'place'
      },
      {
        field: 'country',
        type: 'select',
        placeholder: '选择国籍',
        searchArr: 'nationality'
      },
      {
        field: 'gender',
        type: 'select',
        placeholder: '选择性别',
        searchArr: 'sexType'
      },
      {
        field: 'crowdCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'population'
      },
      {
        field: 'symptomCode',
        type: 'select',
        placeholder: '临床症状',
        searchArr: 'symptom'
      }
    ]
  },
  ship: {
    fields: {
      shipCaseNumber: '聚集性病例编号',
      name: {
        label: '姓名',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.name}</div>
            })
          }
        }
      },
      sex: {
        label: '性别',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.sex}</div>
            })
          }
        }
      },
      age: {
        label: '年龄',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.age}</div>
            })
          }
        }
      },
      identityType: {
        label: '证件类型',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityType}</div>
            })
          }
        }
      },
      identityNumber: {
        label: '证件号码',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityNumber}</div>
            })
          }
        }
      },
      shipNumber: {
        label: '轮船号',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.shipNumber}</div>
            })
          }
        }
      },
      shipCompany: {
        label: '邮轮公司',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.shipCompany}</div>
            })
          }
        }
      },
      aggregationTime: {
        label: '聚集时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.aggregationTime}</div>
            })
          }
        }
      },
      detectionTime: {
        label: '检测时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.detectionTime}</div>
            })
          }
        }
      },
      detectionResult: {
        label: '检测结果',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              if (v.detectionResult === '阳性') {
                return <div style='color: red'>{v.detectionResult}</div>
              } else {
                return <div>{v.detectionResult}</div>
              }
            })
          }
        }
      },
      riskLevel: '风险等级',
      operation: {
        label: '操作',
        render: {
          functional: true,
          props: {
            row: {},
            click: Function
          },
          render(createElement, context) {
            return [0, 1, 2].map(v => {
              return (
                <div
                  style='cursor: pointer; color: #35eaff'
                  onClick={() =>
                    context.props.click(
                      context.props.row.testPlaceList[v].identityNumber
                    )
                  }
                >
                  查看详情
                </div>
              )
            })
          }
        }
      }
    },
    api: flightList,
    searchs: [
      {
        field: 'placeCode',
        type: 'select',
        placeholder: '选择所在地',
        searchArr: 'place'
      },
      {
        field: 'nationalityCode',
        type: 'select',
        placeholder: '选择国籍',
        searchArr: 'nationality'
      },
      {
        field: 'sexCode',
        type: 'select',
        placeholder: '选择性别',
        searchArr: 'sexType'
      },
      {
        field: 'populationCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'population'
      },
      {
        field: 'symptomCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'symptom'
      }
    ]
  },
  train: {
    fields: {
      trainCaseNumber: '聚集性病例编号',
      name: {
        label: '姓名',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.name}</div>
            })
          }
        }
      },
      sex: {
        label: '性别',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.sex}</div>
            })
          }
        }
      },
      age: {
        label: '年龄',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.age}</div>
            })
          }
        }
      },
      identityType: {
        label: '证件类型',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityType}</div>
            })
          }
        }
      },
      identityNumber: {
        label: '证件号码',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityNumber}</div>
            })
          }
        }
      },
      trainNumber: {
        label: '火车号',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.trainNumber}</div>
            })
          }
        }
      },
      seatNumber: {
        label: '座位号',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.seatNumber}</div>
            })
          }
        }
      },
      aggregationTime: {
        label: '聚集时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.aggregationTime}</div>
            })
          }
        }
      },
      detectionTime: {
        label: '检测时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.detectionTime}</div>
            })
          }
        }
      },
      detectionResult: {
        label: '检测结果',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              if (v.detectionResult === '阳性') {
                return <div style='color: red'>{v.detectionResult}</div>
              } else {
                return <div>{v.detectionResult}</div>
              }
            })
          }
        }
      },
      riskLevel: '风险等级',
      operation: {
        label: '操作',
        render: {
          functional: true,
          props: {
            row: {},
            click: Function
          },
          render(createElement, context) {
            return [0, 1, 2].map(v => {
              return (
                <div
                  style='cursor: pointer; color: #35eaff'
                  onClick={() =>
                    context.props.click(
                      context.props.row.testPlaceList[v].identityNumber
                    )
                  }
                >
                  查看详情
                </div>
              )
            })
          }
        }
      }
    },
    api: flightList,
    searchs: [
      {
        field: 'placeCode',
        type: 'select',
        placeholder: '选择所在地',
        searchArr: 'place'
      },
      {
        field: 'nationalityCode',
        type: 'select',
        placeholder: '选择国籍',
        searchArr: 'nationality'
      },
      {
        field: 'sexCode',
        type: 'select',
        placeholder: '选择性别',
        searchArr: 'sexType'
      },
      {
        field: 'populationCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'population'
      },
      {
        field: 'symptomCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'symptom'
      }
    ]
  },
  school: {
    fields: {
      schoolCaseNumber: '聚集性病例编号',
      name: {
        label: '姓名',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.name}</div>
            })
          }
        }
      },
      sex: {
        label: '性别',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.sex}</div>
            })
          }
        }
      },
      age: {
        label: '年龄',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.age}</div>
            })
          }
        }
      },
      identityType: {
        label: '证件类型(家长)',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityType}</div>
            })
          }
        }
      },
      identityNumber: {
        label: '证件号码(家长)',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityNumber}</div>
            })
          }
        }
      },
      schoolName: {
        label: '学校/幼儿园名称',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.schoolName}</div>
            })
          }
        }
      },
      classeGrade: {
        label: '所在班级',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.classeGrade}</div>
            })
          }
        }
      },
      clinicalSymptoms: '临床病症',
      aggregationTime: {
        label: '聚集时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.aggregationTime}</div>
            })
          }
        }
      },
      detectionTime: {
        label: '检测时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.detectionTime}</div>
            })
          }
        }
      },
      detectionResult: {
        label: '检测结果',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              if (v.detectionResult === '阳性') {
                return <div style='color: red'>{v.detectionResult}</div>
              } else {
                return <div>{v.detectionResult}</div>
              }
            })
          }
        }
      },
      riskLevel: '风险等级',
      operation: {
        label: '操作',
        render: {
          functional: true,
          props: {
            row: {},
            click: Function
          },
          render(createElement, context) {
            return [0, 1, 2].map(v => {
              return (
                <div
                  style='cursor: pointer; color: #35eaff'
                  onClick={() =>
                    context.props.click(
                      context.props.row.testPlaceList[v].identityNumber
                    )
                  }
                >
                  查看详情
                </div>
              )
            })
          }
        }
      }
    },
    api: flightList,
    searchs: [
      {
        field: 'placeCode',
        type: 'select',
        placeholder: '选择所在地',
        searchArr: 'place'
      },
      {
        field: 'nationalityCode',
        type: 'select',
        placeholder: '选择国籍',
        searchArr: 'nationality'
      },
      {
        field: 'sexCode',
        type: 'select',
        placeholder: '选择性别',
        searchArr: 'sexType'
      },
      {
        field: 'populationCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'population'
      },
      {
        field: 'symptomCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'symptom'
      }
    ]
  },
  psychiatricHospital: {
    fields: {
      psychiatricHospitalNumber: '聚集性病例编号',
      name: {
        label: '姓名',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.name}</div>
            })
          }
        }
      },
      sex: {
        label: '性别',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.sex}</div>
            })
          }
        }
      },
      age: {
        label: '年龄',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.age}</div>
            })
          }
        }
      },
      identityType: {
        label: '证件类型',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityType}</div>
            })
          }
        }
      },
      identityNumber: {
        label: '证件号码',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityNumber}</div>
            })
          }
        }
      },
      hospitalName: {
        label: '精神专科医院名称',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.hospitalName}</div>
            })
          }
        }
      },
      clinicalSymptoms: '临床病症',
      aggregationTime: {
        label: '聚集时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.aggregationTime}</div>
            })
          }
        }
      },
      detectionTime: {
        label: '检测时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.detectionTime}</div>
            })
          }
        }
      },
      detectionResult: {
        label: '检测结果',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              if (v.detectionResult === '阳性') {
                return <div style='color: red'>{v.detectionResult}</div>
              } else {
                return <div>{v.detectionResult}</div>
              }
            })
          }
        }
      },
      riskLevel: '风险等级',
      operation: {
        label: '操作',
        render: {
          functional: true,
          props: {
            row: {},
            click: Function
          },
          render(createElement, context) {
            return [0, 1, 2].map(v => {
              return (
                <div
                  style='cursor: pointer; color: #35eaff'
                  onClick={() =>
                    context.props.click(
                      context.props.row.testPlaceList[v].identityNumber
                    )
                  }
                >
                  查看详情
                </div>
              )
            })
          }
        }
      }
    },
    api: flightList,
    searchs: [
      {
        field: 'placeCode',
        type: 'select',
        placeholder: '选择所在地',
        searchArr: 'place'
      },
      {
        field: 'nationalityCode',
        type: 'select',
        placeholder: '选择国籍',
        searchArr: 'nationality'
      },
      {
        field: 'sexCode',
        type: 'select',
        placeholder: '选择性别',
        searchArr: 'sexType'
      },
      {
        field: 'populationCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'population'
      },
      {
        field: 'symptomCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'symptom'
      }
    ]
  },
  market: {
    fields: {
      marketCaseNumber: '聚集性病例编号',
      name: {
        label: '姓名',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.name}</div>
            })
          }
        }
      },
      sex: {
        label: '性别',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.sex}</div>
            })
          }
        }
      },
      age: {
        label: '年龄',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.age}</div>
            })
          }
        }
      },
      identityType: {
        label: '证件类型',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityType}</div>
            })
          }
        }
      },
      identityNumber: {
        label: '证件号码',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityNumber}</div>
            })
          }
        }
      },
      marketName: {
        label: '农贸市场名称',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.marketName}</div>
            })
          }
        }
      },
      clinicalSymptoms: '临床病症',
      aggregationTime: {
        label: '聚集时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.aggregationTime}</div>
            })
          }
        }
      },
      detectionTime: {
        label: '检测时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.detectionTime}</div>
            })
          }
        }
      },
      detectionResult: {
        label: '检测结果',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              if (v.detectionResult === '阳性') {
                return <div style='color: red'>{v.detectionResult}</div>
              } else {
                return <div>{v.detectionResult}</div>
              }
            })
          }
        }
      },
      riskLevel: '风险等级',
      operation: {
        label: '操作',
        render: {
          functional: true,
          props: {
            row: {},
            click: Function
          },
          render(createElement, context) {
            return [0, 1, 2].map(v => {
              return (
                <div
                  style='cursor: pointer; color: #35eaff'
                  onClick={() =>
                    context.props.click(
                      context.props.row.testPlaceList[v].identityNumber
                    )
                  }
                >
                  查看详情
                </div>
              )
            })
          }
        }
      }
    },
    api: flightList,
    searchs: [
      {
        field: 'placeCode',
        type: 'select',
        placeholder: '选择所在地',
        searchArr: 'place'
      },
      {
        field: 'nationalityCode',
        type: 'select',
        placeholder: '选择国籍',
        searchArr: 'nationality'
      },
      {
        field: 'sexCode',
        type: 'select',
        placeholder: '选择性别',
        searchArr: 'sexType'
      },
      {
        field: 'populationCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'population'
      },
      {
        field: 'symptomCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'symptom'
      }
    ]
  },
  beadhouse: {
    fields: {
      beadhouseNumber: '聚集性病例编号',
      name: {
        label: '姓名',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.name}</div>
            })
          }
        }
      },
      sex: {
        label: '性别',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.sex}</div>
            })
          }
        }
      },
      age: {
        label: '年龄',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.age}</div>
            })
          }
        }
      },
      identityType: {
        label: '证件类型',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityType}</div>
            })
          }
        }
      },
      identityNumber: {
        label: '证件号码',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityNumber}</div>
            })
          }
        }
      },
      neadhouseName: {
        label: '养老福利机构名称',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.neadhouseName}</div>
            })
          }
        }
      },
      clinicalSymptoms: '临床病症',
      aggregationTime: {
        label: '聚集时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.aggregationTime}</div>
            })
          }
        }
      },
      detectionTime: {
        label: '检测时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.detectionTime}</div>
            })
          }
        }
      },
      detectionResult: {
        label: '检测结果',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              if (v.detectionResult === '阳性') {
                return <div style='color: red'>{v.detectionResult}</div>
              } else {
                return <div>{v.detectionResult}</div>
              }
            })
          }
        }
      },
      operation: {
        label: '操作',
        render: {
          functional: true,
          props: {
            row: {},
            click: Function
          },
          render(createElement, context) {
            return [0, 1, 2].map(v => {
              return (
                <div
                  style='cursor: pointer; color: #35eaff'
                  onClick={() =>
                    context.props.click(
                      context.props.row.testPlaceList[v].identityNumber
                    )
                  }
                >
                  查看详情
                </div>
              )
            })
          }
        }
      }
    },
    api: flightList,
    searchs: [
      {
        field: 'placeCode',
        type: 'select',
        placeholder: '选择所在地',
        searchArr: 'place'
      },
      {
        field: 'nationalityCode',
        type: 'select',
        placeholder: '选择国籍',
        searchArr: 'nationality'
      },
      {
        field: 'sexCode',
        type: 'select',
        placeholder: '选择性别',
        searchArr: 'sexType'
      },
      {
        field: 'populationCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'population'
      },
      {
        field: 'symptomCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'symptom'
      }
    ]
  },
  regulators: {
    fields: {
      regulatorsNumber: '聚集性病例编号',
      name: {
        label: '姓名',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.name}</div>
            })
          }
        }
      },
      sex: {
        label: '性别',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.sex}</div>
            })
          }
        }
      },
      age: {
        label: '年龄',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.age}</div>
            })
          }
        }
      },
      identityType: {
        label: '证件类型',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityType}</div>
            })
          }
        }
      },
      identityNumber: {
        label: '证件号码',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.identityNumber}</div>
            })
          }
        }
      },
      regulatorsName: {
        label: '监管机构名称',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.regulatorsName}</div>
            })
          }
        }
      },
      clinicalSymptoms: '临床病症',
      aggregationTime: {
        label: '聚集时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.aggregationTime}</div>
            })
          }
        }
      },
      detectionTime: {
        label: '检测时间',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              return <div>{v.detectionTime}</div>
            })
          }
        }
      },
      detectionResult: {
        label: '检测结果',
        render: {
          functional: true,
          props: {
            row: {
              testPlaceList: []
            }
          },
          render(createElement, context) {
            const testPlaceList = context.props.row.testPlaceList
            return testPlaceList.map(v => {
              if (v.detectionResult === '阳性') {
                return <div style='color: red'>{v.detectionResult}</div>
              } else {
                return <div>{v.detectionResult}</div>
              }
            })
          }
        }
      },
      operation: {
        label: '操作',
        render: {
          functional: true,
          props: {
            row: {},
            click: Function
          },
          render(createElement, context) {
            return [0, 1, 2].map(v => {
              return (
                <div
                  style='cursor: pointer; color: #35eaff'
                  onClick={() =>
                    context.props.click(
                      context.props.row.testPlaceList[v].identityNumber
                    )
                  }
                >
                  查看详情
                </div>
              )
            })
          }
        }
      }
    },
    api: flightList,
    searchs: [
      {
        field: 'placeCode',
        type: 'select',
        placeholder: '选择所在地',
        searchArr: 'place'
      },
      {
        field: 'nationalityCode',
        type: 'select',
        placeholder: '选择国籍',
        searchArr: 'nationality'
      },
      {
        field: 'sexCode',
        type: 'select',
        placeholder: '选择性别',
        searchArr: 'sexType'
      },
      {
        field: 'populationCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'population'
      },
      {
        field: 'symptomCode',
        type: 'select',
        placeholder: '选择人群分类',
        searchArr: 'symptom'
      }
    ]
  }
}

export default {
  components: {
    'aggregation-datail': AggregationTest
  },
  data() {
    return {
      activeName: 'flight', // 活动tab
      isCell: false,
      model: '',
      dialogVisible: false,
      dialogVal: {},
      page: 1, // 当前页
      limit: 10, // 一页条数
      totalCount: 0, // 总条数
      tableData: [], // 列表数据
      fields: pageConfig[activeName].fields, // 列表展示数据
      searchs: pageConfig[activeName].searchs, // 列表搜索展示数据
      param: pageConfig[activeName].searchs.reduce((a, b) => {
        return { ...a, [b.field]: '' }
      }, {}), // 搜索条件
      allSearch: {} // 所有搜索条件
    }
  },
  mounted() {
    this.initSearch()
    this.fetchData()
  },
  methods: {
    testClick(identityNumber) {
      fetchAggregationList({ identityNumber }).then(response => {
        this.dialogVal = response.data.items[0].showInformation
      })
      this.dialogVisible = true
    },
    initSearch() {
      getDictionaryList({}).then(res => {
        // console.log(res)
        Object.keys(res.data).map(v => {
          this.allSearch[v] = res.data[v]
        })
      })
    },
    fetchData() {
      const api = pageConfig[this.activeName].api
      const { page, limit, param } = this
      api({ page, limit, ...param }).then(res => {
        this.tableData = res.data
        this.totalCount = res.totalCount
      })
    },
    handleClick({ name }) {
      this.activeName = name
      this.$set(this, 'fields', pageConfig[this.activeName].fields)
      this.$set(this, 'searchs', pageConfig[this.activeName].searchs)
      this.$set(
        this,
        'param',
        pageConfig[this.activeName].searchs.reduce((a, b) => {
          return { ...a, [b.field]: '' }
        }, {})
      )
      this.page = 1
      this.limit = 10
      this.fetchData()
    },
    handleSizeChange(limit) {
      this.limit = limit
      this.fetchData()
    },
    handleCurrentChange(page) {
      this.page = page
      this.fetchData()
    },
    searchFetch() {
      this.page = 1
      this.fetchData()
    }
  }
}
</script>

<style lang="scss" scoped>
$fontSize: 0.88rem;
$height: 1.38rem;
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 3.13rem 6.63rem;
}

.dialog ::v-deep {
  .el-dialog__headerbtn {
    z-index: 1000;
  }
  .el-dialog__header {
    width: 75rem;
    background-color: #171833;
    padding: 0;
  }
  .el-dialog {
    width: 50rem;
    height: 45.94rem;
    background-color: #171833;
    border-radius: 0.13rem;
    margin: auto;
    padding: 0;
    font-size: $fontSize;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-top: 9rem !important;
  }
  .el-dialog__body {
    padding: 30px 0.63rem 30px 0.63rem;
  }
  .el-table {
    background: transparent;
    color: #fff;
  }
  .el-table thead {
    color: #fff;
    background: #171833;
  }
  .el-table thead td,
  .el-table thead th.is-leaf {
    border-bottom: none;
  }
  .el-table th,
  .el-table tr {
    background: transparent;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid rgba(3, 3, 8, 1);
  }
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    display: none;
  }
  // hover
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(0, 232, 255, 0.2);
  }
}

// .dialog ::v-deep .el-dialog {
// }
.content {
  // width: 106.75rem;
  // height: 55.63rem;
  width: 100%;
  height: 100%;
  padding: 1.25rem;
  background: #212342;
  display: flex;
  flex-direction: column;

  .tab-header {
    > .select + .select {
      margin-left: 0.88rem;
    }
  }

  .tab-content {
    margin-top: 1.2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .pages {
      margin-top: 1.2rem;
    }
  }

  /** 修改element 组件样式 */
  ::v-deep {
    /** tabs 样式 */
    .el-tabs {
      // height: 100%;
      display: flex;
      flex-direction: column;
    }
    .el-tabs__content {
      // height: 100%;
    }
    .el-tab-pane {
      // height: 100%;
      display: flex;
      flex-direction: column;
    }
    .el-tabs__item {
      font-size: 1rem;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #fefefe;
    }
    .el-tabs__nav-wrap::after {
      background-color: rgba(128, 128, 128, 1);
    }
    .el-tabs__item.is-active {
      color: rgba(25, 210, 255, 1);
    }
    .el-tabs__active-bar {
      background-color: rgba(25, 210, 255, 1);
    }
    /** select 样式 */
    .tab-header {
      flex: none;
      .el-input__inner {
        width: 10.56rem;
        height: 2.75rem;
        background: #020423;
        border-radius: 0.25rem;
        border: none;
        font-size: 1rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #ffffff;
        line-height: 2.75rem;
      }
      .el-select .el-input .el-select__caret {
        color: rgba(0, 232, 255, 1);
      }
      .el-select-dropdown {
        background: #020423;
        border: none;
      }
      .el-select-dropdown__item {
        color: #fff;
      }
      .el-select-dropdown__item.hover,
      .el-select-dropdown__item:hover {
        background-color: rgba(0, 232, 255, 0.2);
      }
      .el-popper[x-placement^="bottom"] .popper__arrow {
        border-bottom-color: #020423;
      }
      .el-popper[x-placement^="bottom"] .popper__arrow::after {
        border-bottom-color: #020423;
      }
    }
    /** table 样式 */
    .el-table {
      background: transparent;
      color: #fff;
      .cellClass {
        .el-table-column--selection {
          background-color: #ebf7ff;
        }
      }
    }
    .el-table thead {
      color: #fff;
      background: #171833;
    }
    .el-table thead td,
    .el-table thead th.is-leaf {
      border-bottom: none;
    }
    .el-table th,
    .el-table tr {
      background: transparent;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: 1px solid rgba(3, 3, 8, 1);
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      display: none;
    }
    // hover
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: rgba(0, 232, 255, 0.2);
    }
    /** 分页样式 */
    .el-pagination__total {
      color: #fff;
    }
    .el-pagination__jump {
      color: #fff;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      margin: 0;
      border: 0.06rem solid #545675;
      background-color: transparent;
      color: #fff;
    }
    .el-pagination.is-background .el-pager li.active {
      background: #151635;
    }
    .el-pagination__sizes .el-input .el-input__inner {
      border-radius: 0.13rem;
      border: 0.06rem solid #545675;
      background: transparent;
      color: #fff;
    }
    .el-pagination__jump .el-input__inner {
      border: 0.06rem solid #545675;
      background: transparent;
      color: #fff;
    }
  }
}
</style>
<style lang="scss">
// 分页器 页面尺寸样式
.page-size-popper {
  border: 0.06rem solid #545675;

  .el-select-dropdown__list {
    background: #212342;
    color: #fff;
  }
  .el-select-dropdown__item {
    color: #fff;
  }
  .el-select-dropdown__item.selected {
    background: #151635;
    color: rgba(0, 232, 255, 1);
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: rgba(#151635, 0.4);
  }
}
</style>
