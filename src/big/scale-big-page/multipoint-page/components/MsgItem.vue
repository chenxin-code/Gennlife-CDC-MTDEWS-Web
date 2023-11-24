<template>
  <div :class="itemClass">
    <!-- ==聚集性预警== -->
    <template v-if="label === 'gather'">
      <div class="label">
        {{ typeCode[Number(data.gatherCode)] }}聚集性监测预警
      </div>
      <div class="item">
        <span>{{ data.gatherPlace }}</span>
        <span>发现：</span>
        <span>{{ data.diagNum }}人确诊</span>
      </div>

      <!-- 症状列表 -->
      <template v-if="data.symptomList">
        <div v-for="(v, i) in data.symptomList" :key="i" class="item">
          <span>{{ v.symptomType }}：</span>
          <span class="num">{{ v.symptomNum }}人</span><span>（未检测：</span>
          <span class="num">{{ v.noTestNum }}人</span><span>阳性：</span>
          <span class="num">{{ v.positiveNum }}人</span><span>）</span>
        </div>
      </template>

      <!-- 风险关联 -->
      <template v-if="data.riskRelationWarnEvent">
        <div class="label">风险关联预警</div>
        <!-- 临床症状 -->
        <template v-if="data.riskRelationWarnEvent.clinicalSymptom">
          <div class="item">
            <span>临床症状：</span>
            <span
              class="num"
            >{{
              data.riskRelationWarnEvent.clinicalSymptom.symptomNum
            }}人</span><span>（未检测：</span>
            <span
              class="num"
            >{{
              data.riskRelationWarnEvent.clinicalSymptom.noTestNum
            }}人</span><span>阳性：</span>
            <span
              class="num"
            >{{
              data.riskRelationWarnEvent.clinicalSymptom.positiveNum
            }}人</span><span>）</span>
          </div>
        </template>
        <!-- 购药记录 -->
        <template v-if="data.riskRelationWarnEvent.buyMedicine">
          <div class="item">
            <span>购药记录：</span>
            <span class="num">{{ v.symptomNum }}人</span><span>（未检测：</span> <span class="num">{{ v.noTestNum }}人</span><span>阳性：</span> <span class="num">{{ v.positiveNum }}人</span><span>）</span>
          </div>
        </template>
      </template>
    </template>

    <!-- ==早期预警== -->
    <template
      v-if="
        label === 'syndrome' ||
          label === 'env' ||
          label === 'net' ||
          label === 'medicine'
      "
    >
      <div class="label">
        <span>{{ data.warnName }}</span>
        <span v-if="label === 'medicine'">查看购药人信息</span>
      </div>
      <template v-if="data.warnInfo">
        <div v-for="(v, i) in data.warnInfo" :key="i" class="item">
          <span>{{ v.message }}</span>
        </div>
      </template>
    </template>

    <!-- ==重点人群== -->
    <template v-if="label === 'important'">
      <div class="label">
        {{ data.crowdType }}
      </div>
      <div v-if="data.riskValue" class="item">
        <span>今日风险值：</span>
        <span class="num">{{ data.riskValue }}</span>
        <span>风险变化值</span>
        <span class="num">{{ data.riskChange }}</span>
      </div>

      <!-- 症状列表 -->
      <template v-if="data.symptomList">
        <div v-for="(v, i) in data.symptomList" :key="i" class="item">
          <span>{{ v.symptomType }}：</span>
          <span class="num">{{ v.symptomNum }}人</span><span>（未检测：</span>
          <span class="num">{{ v.noTestNum }}人</span><span>阳性：</span>
          <span class="num">{{ v.positiveNum }}人</span><span>）</span>
        </div>
      </template>

      <!-- 风险关联 -->
      <template v-if="data.riskRelationWarnEvent">
        <div class="label">风险关联预警</div>
        <!-- 临床症状 -->
        <template v-if="data.riskRelationWarnEvent.clinicalSymptom">
          <div class="item">
            <span>临床症状：</span>
            <span
              class="num"
            >{{
              data.riskRelationWarnEvent.clinicalSymptom.symptomNum
            }}人</span><span>（未检测：</span>
            <span
              class="num"
            >{{
              data.riskRelationWarnEvent.clinicalSymptom.noTestNum
            }}人</span><span>阳性：</span>
            <span
              class="num"
            >{{
              data.riskRelationWarnEvent.clinicalSymptom.positiveNum
            }}人</span><span>）</span>
          </div>
        </template>
        <!-- 购药记录 -->
        <template v-if="data.riskRelationWarnEvent.buyMedicine">
          <div class="item">
            <span>购药记录：</span>
            <span class="num">{{ v.symptomNum }}人</span><span>（未检测：</span> <span class="num">{{ v.noTestNum }}人</span><span>阳性：</span> <span class="num">{{ v.positiveNum }}人</span><span>）</span>
          </div>
        </template>
      </template>
    </template>

    <!-- ==密切接触者监测== -->
    <template v-if="label === 'close'">
      <div class="label">
        <span>{{ data.warnName }}</span>
        <span>未上传核酸结果</span>
      </div>
      <div class="item">
        <span>第1天：</span>
        <span class="num">{{ data.firstDayNum }}人</span>
        <span>第4天：</span>
        <span class="num">{{ data.fourthDayNum }}人</span>
        <span>第7天：</span>
        <span class="num">{{ data.firstWeekNum }}人</span>
        <span>第14天：</span>
        <span class="num">{{ data.secondWeekNum }}人</span>
      </div>
    </template>

    <!-- ==多点触发预警== -->
    <template v-if="label === 'enter'">
      <div class="label">
        <span class="title">香港入境检测</span>
        <span class="level">
          <span>风险等级：</span>
          <span
            v-for="(v, i) in new Array(data.warnLevel || 0)"
            :key="`${i}` + 'l'"
          >
            <svg-icon
              :icon-class="
                Number(data.warnLevel) > 3 ? 'level-error' : 'level-warning'
              "
            />
          </span>
          <span
            v-for="(v, i) in new Array(5 - data.warnLevel || 0)"
            :key="`${i}` + 'k'"
          >
            <svg-icon
              :icon-class="
                Number(data.warnLevel) > 3
                  ? 'level-error-not'
                  : 'level-warning-not'
              "
            />
          </span>
        </span>
      </div>
      <!-- 舆情列表 -->
      <template v-if="data.publicSentimentList">
        <div class="title">
          <i class="el-icon-caret-right" />
          香港舆情监测
        </div>
        <div class="public">
          <div v-for="(v, i) in data.publicSentimentList" :key="i" class="item">
            <template v-if="v.trend == 1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <div class="lower">{{ v.labelName }}</div>
                <div class="lower">
                  {{ v.labelValue }}<svg-icon icon-class="up" />
                </div>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <div class="middle">{{ v.labelName }}</div>
                <div class="middle">
                  {{ v.labelValue }}<svg-icon icon-class="up" />
                </div>
              </template>
              <template v-else>
                <div class="higher">{{ v.labelName }}</div>
                <div class="higher">
                  {{ v.labelValue }}<svg-icon icon-class="up" />
                </div>
              </template>
            </template>
            <template v-else-if="v.trend == -1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <div class="lower">{{ v.labelName }}</div>
                <div class="lower">
                  {{ v.labelValue }}<svg-icon icon-class="down" />
                </div>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <div class="middle">{{ v.labelName }}</div>
                <div class="middle">
                  {{ v.labelValue }}<svg-icon icon-class="down" />
                </div>
              </template>
              <template v-else>
                <div class="higher">{{ v.labelName }}</div>
                <div class="higher">
                  {{ v.labelValue }}<svg-icon icon-class="down" />
                </div>
              </template>
            </template>
            <template v-else>
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <div class="lower">{{ v.labelName }}</div>
                <div class="lower">{{ v.labelValue }}——</div>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <div class="middle">{{ v.labelName }}</div>
                <div class="middle">{{ v.labelValue }}——</div>
              </template>
              <template v-else>
                <div class="higher">{{ v.labelName }}</div>
                <div class="higher">{{ v.labelValue }}——</div>
              </template>
            </template>
            <!-- <div>tread:{{ v.trend }}</div> -->
            <!-- <div>warnLevel:{{ v.warnLevel }}</div> -->
          </div>
        </div>
      </template>
      <!-- 入境人群症候群监测 -->
      <template v-if="data.syndromeList">
        <div class="title">
          <i class="el-icon-caret-right" />
          香港入境人群症候群监测
        </div>

        <div class="syndrome">
          <div v-for="(v, i) in data.syndromeList" :key="i" class="item">
            <template v-if="v.trend == 1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="lower"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="middle"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="higher"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
            </template>
            <template v-else-if="v.trend == -1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="lower"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="middle"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="higher"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
            </template>
            <template v-else>
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="lower">{{ v.labelValue }}—— </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="middle">{{ v.labelValue }}—— </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="higher">{{ v.labelValue }}—— </span>
              </template>
            </template>
            <!-- <span>{{ v.warnLevel }}</span> -->
          </div>
        </div>
      </template>
      <!-- 药店销量 -->
      <template v-if="data.medicineSalesList">
        <div class="title">
          <i class="el-icon-caret-right" />
          药物销量预警
        </div>
        <div class="medicine">
          <div v-for="(v, i) in data.medicineSalesList" :key="i" class="item">
            <template v-if="v.trend == 1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="lower"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="middle"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="higher"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
            </template>
            <template v-else-if="v.trend == -1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="lower"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="middle"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="higher"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
            </template>
            <template v-else>
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="lower">{{ v.labelValue }}—— </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="middle">{{ v.labelValue }}—— </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="higher">{{ v.labelValue }}—— </span>
              </template>
            </template>
            <!-- <span>{{ v.warnLevel }}</span> -->
          </div>
        </div>
      </template>
      <!-- 入境检测 -->
      <template v-if="data.enterTest">
        <div class="title">
          <i class="el-icon-caret-right" />
          香港入境检测
        </div>
        <!-- 临床症状 -->
        <div class="enter">
          <div v-if="data.enterTest.clinicalSymptom" class="item">
            <span>临床症状：</span>
            <span
              class="num"
            >{{ data.enterTest.clinicalSymptom.symptomNum }}人</span><span>（未检测：</span>
            <span
              class="num"
            >{{ data.enterTest.clinicalSymptom.noTestNum }}人</span><span>阳性：</span>
            <span
              class="num"
            >{{ data.enterTest.clinicalSymptom.positiveNum }}人</span><span>）</span>
          </div>
          <!-- 购药症状 -->
          <div v-if="data.enterTest.buyMedicine" class="item">
            <span>购药记录：</span>
            <span
              class="num"
            >{{ data.enterTest.buyMedicine.symptomNum }}人</span><span>（未检测：</span>
            <span class="num">{{ data.enterTest.buyMedicine.noTestNum }}人</span><span>阳性：</span>
            <span
              class="num"
            >{{ data.enterTest.buyMedicine.positiveNum }}人</span><span>）</span>
          </div>
        </div>
      </template>
    </template>

    <!-- ==多点触发预警== -->
    <template v-if="label === 'student'">
      <div class="label">
        <span class="title">幼儿学生多点监测预警</span>
        <span class="level">
          <span>风险等级：</span>
          <span
            v-for="(v, i) in new Array(data.warnLevel || 0)"
            :key="`${i}` + 'l'"
          >
            <svg-icon
              :icon-class="
                Number(data.warnLevel) > 3 ? 'level-error' : 'level-warning'
              "
            />
          </span>
          <span
            v-for="(v, i) in new Array(5 - data.warnLevel || 0)"
            :key="`${i}` + 'k'"
          >
            <svg-icon
              :icon-class="
                Number(data.warnLevel) > 3
                  ? 'level-error-not'
                  : 'level-warning-not'
              "
            />
          </span>
        </span>
      </div>
      <!-- 学校列表 -->
      <template v-if="data.schoolWarn">
        <div class="title">
          <i class="el-icon-caret-right" />
          广州市东山培正小学
        </div>
        <div class="school">
          <div class="item">
            <span>因病缺勤：</span>
            <span class="num">{{ data.schoolWarn.absenteeismNum }}人</span>
          </div>
          <div v-if="data.schoolWarn.clinicalSymptom" class="item">
            <span>临床症状：</span>
            <span
              class="num"
            >{{ data.schoolWarn.clinicalSymptom.symptomNum }}人</span>
            <span>（未检测：</span>
            <span
              class="num"
            >{{ data.schoolWarn.clinicalSymptom.noTestNum }}人</span>
            <span>阳性：</span>
            <span
              class="num"
            >{{ data.schoolWarn.clinicalSymptom.positiveNum }}人</span><span>）</span>
          </div>

          <div v-if="data.schoolWarn.buyMedicine" class="item">
            <span>购药记录：</span>
            <span class="num">{{ data.schoolWarn.buyMedicine.number }}人</span><span>（未检测：</span>
            <span
              class="num"
            >{{ data.schoolWarn.buyMedicine.noTestNum }}人</span><span>阳性：</span>
            <span
              class="num"
            >{{ data.schoolWarn.buyMedicine.positiveNum }}人</span><span>）</span>
          </div>
        </div>
      </template>

      <!-- 人群症候群监测 -->
      <template v-if="data.syndromeList">
        <div class="title">
          <i class="el-icon-caret-right" />
          香港入境人群症候群监测
        </div>

        <div class="syndrome">
          <div v-for="(v, i) in data.syndromeList" :key="i" class="item">
            <template v-if="v.trend == 1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="lower"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="middle"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="higher"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
            </template>
            <template v-else-if="v.trend == -1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="lower"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="middle"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="higher"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
            </template>
            <template v-else>
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="lower">{{ v.labelValue }}—— </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="middle">{{ v.labelValue }}—— </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="higher">{{ v.labelValue }}—— </span>
              </template>
            </template>
            <!-- <span>{{ v.warnLevel }}</span> -->
          </div>
        </div>
      </template>
      <!-- 药店销量 -->
      <template v-if="data.medicineSalesList">
        <div class="title">
          <i class="el-icon-caret-right" />
          药物销量预警
        </div>
        <div class="medicine">
          <div v-for="(v, i) in data.medicineSalesList" :key="i" class="item">
            <template v-if="v.trend == 1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="lower"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="middle"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="higher"
                >{{ v.labelValue }}<svg-icon icon-class="up" />
                </span>
              </template>
            </template>
            <template v-else-if="v.trend == -1">
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="lower"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="middle"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span
                  class="higher"
                >{{ v.labelValue }}<svg-icon icon-class="down" />
                </span>
              </template>
            </template>
            <template v-else>
              <template v-if="v.warnLevel == 1 || v.warnLevel == 2">
                <span class="lower">{{ v.labelName }}</span>
                <span
                  class="lower blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="lower">{{ v.labelValue }}—— </span>
              </template>
              <template v-else-if="v.warnLevel == 3">
                <span class="middle">{{ v.labelName }}</span>
                <span
                  class="middle blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="middle">{{ v.labelValue }}—— </span>
              </template>
              <template v-else>
                <span class="higher">{{ v.labelName }}</span>
                <span
                  class="higher blank"
                >同期水平<svg-icon
                  icon-class="shandian"
                /></span>
                <span class="higher">{{ v.labelValue }}—— </span>
              </template>
            </template>
            <!-- <span>{{ v.warnLevel }}</span> -->
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    label: String,
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      // iconClasses:['up','down','jiashicang'],
      // colors: ['#85FF00', '#FFA83B', '#F52B7B'],
      itemClass: ['msg-item', 'msg-info'],
      // TODO 待确定
      typeCode: {
        1: '航班',
        2: '轮船',
        3: '火车',
        4: '精神科医院',
        5: '农贸市场',
        6: '养老福利机构',
        7: '监管机构',
        8: '学校'
      }
    }
  },
  watch: {
    data: {
      deep: true,
      handler() {
        switch (String(this.data.warnLevel)) {
          case '1':
          case '2':
            this.itemClass = ['msg-item', 'msg-waring', this.label]
            break
          case '3':
          case '4':
            this.itemClass = ['msg-item', 'msg-error', this.label]
            break
          default:
            this.itemClass = ['msg-item', this.label]
            break
        }
      }
    }
  },
  mounted() {
    switch (String(this.data.warnLevel)) {
      case '1':
      case '2':
        this.itemClass = ['msg-item', 'msg-waring', this.label]
        break
      case '3':
      case '4':
        this.itemClass = ['msg-item', 'msg-error', this.label]
        break
      default:
        this.itemClass = ['msg-item', this.label]
        break
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";
.higher {
  color: rgba(255, 61, 125, 0.9);
}
.middle {
  color: rgba(255, 216, 7, 0.9);
}
.lower {
  color: rgba(255, 255, 255, 0.9);
  // color:#85FF00;
}
.level {
  margin-top: getHeight(1.4);
  font-size: 1.31rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.81rem;
}
.blank > svg {
  margin-left: getWidth(1.76);
}
.public > .item:nth-of-type(odd) {
  padding-right: 1.56rem;
}
.public > .item:nth-of-type(even) {
  padding-left: 1.56rem;
}
.msg-item {
  margin-top: getHeight(0.75);
  width: getWidth(40.94);
  min-height: getHeight(8.88);
  padding: getHeight(1.2) getWidth(1.2);
  background: #212342;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .num {
    margin-right: getWidth(2);
  }

  .label {
    font-size: $nomalSize;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: getHeight(0.6);

    display: flex;
    justify-content: space-between;

    > span:nth-child(2) {
      user-select: none;
      cursor: pointer;
    }
  }

  font-size: $nomalSmallSize;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}

.msg-error,
.msg-waring {
  // 边框
  border: getWidth(0.25) solid;
  clip-path: inset(0 round getWidth(0.25));
  width: getWidth(40.94 - 0.25 * 2);
  min-height: getHeight(8.88 - 0.25 * 2);
  // 角标
  position: relative;
  &:after {
    position: absolute;
    content: "";
    width: getWidth(2);
    height: getWidth(2);
    top: getWidth(-0.25);
    right: getWidth(-0.25);
    border-radius: getWidth(0.25);
  }
}

// 核酸检测阳性
.msg-error {
  border-image: linear-gradient(
      45deg,
      rgba(255, 124, 110, 1),
      rgba(245, 43, 123, 1)
    )
    1;
  &:after {
    background: linear-gradient(
      to top right,
      transparent 0%,
      transparent 50%,
      rgba(255, 124, 110, 1) 50%,
      rgba(245, 43, 123, 1) 100%
    );
  }

  .msg-event-value {
    color: rgba(246, 52, 122, 1);
  }

  .num {
    color: #f73979;
  }
}

// 有异常， 未检测核酸
.msg-waring {
  border-image: linear-gradient(
      45deg,
      rgba(255, 168, 59, 1),
      rgba(255, 168, 59, 1)
    )
    1;
  &:after {
    background: linear-gradient(
      to top right,
      transparent 0%,
      transparent 50%,
      rgba(255, 168, 59, 1) 50%,
      rgba(255, 168, 59, 1) 100%
    );
  }

  .num {
    color: #ffe306;
  }
}
// // 未有异常
// .msg-info {
//   border-image: linear-gradient(45deg, #0099ff, #00ccff) 1;
//   &:after {
//     background: linear-gradient(
//       to top right,
//       transparent 0%,
//       transparent 50%,
//       #0099ff 50%,
//       #00ccff 100%
//     );
//   }
// }

.title {
  margin-top: getHeight(1.4);
  font-size: 1.5rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  line-height: 2.06rem;

  // 标题三角形
  // .triangle {
  //   display: inline-block;
  //   font-size: 0;
  //   overflow: hidden;
  //   margin-right: 0.6rem;

  //   &:before {
  //     content: "";
  //     position: relative;
  //     display: inline-block;
  //     border: 0.3rem solid transparent;

  //     position: relative;
  //     right: 0.1rem;
  //     border-top-right-radius: 50%;
  //     border-bottom-right-radius: 50%;

  //     left: 0.1rem;
  //     border-right-width: 0;
  //     border-left-width: 0.6rem;
  //     border-left-color: rgb(181, 181, 181);
  //   }
  // }
}
.public,
.syndrome,
.medicine,
.enter,
.school {
  padding-left: 2rem;
}
.enter {
  .public {
    display: flex;
    flex-wrap: wrap;
    > .item {
      width: 50%;
      flex: none;
      display: flex;
      justify-content: space-between;
      margin-top: getHeight(1);
    }
  }
  .syndrome,
  .medicine {
    > .item {
      display: flex;
      justify-content: space-between;
      > span:nth-child(1) {
        width: 36%;
      }
    }
  }

  .syndrome,
  .medicine,
  .enter {
    > .item {
      display: flex;
      // justify-content: space-between;
      margin-top: getHeight(0.5);
    }
  }
}

.student {
  .public {
    display: flex;
    flex-wrap: wrap;
    > .item {
      width: 50%;
      flex: none;
      display: flex;
      justify-content: space-between;
      margin-top: getHeight(1);
    }
  }
  .syndrome,
  .medicine {
    > .item {
      display: flex;
      justify-content: space-between;
      > span:nth-child(1) {
        width: 36%;
      }
    }
  }

  .syndrome,
  .school,
  .medicine {
    > .item {
      display: flex;
      // justify-content: space-between;
      margin-top: getHeight(0.5);
    }
  }
}
</style>
