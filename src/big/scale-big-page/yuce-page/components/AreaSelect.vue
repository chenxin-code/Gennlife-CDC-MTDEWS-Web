<template>
  <div class="area-select">
    <el-row class="area-select-item">
      <el-col :span="12">
        <!-- 市 -->
        <el-select
          v-model="citySelect"
          filterable
          clearable
          placeholder=""
          @change="selectChange(3, 'city')"
        >
          <el-option
            v-for="item in cityOption"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <!-- 区 -->
        <el-select
          v-model="countySelect"
          filterable
          clearable
          placeholder=""
          @change="selectChange(4, 'county')"
        >
          <el-option
            v-for="item in countyOption"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row class="area-select-item">
      <!-- 街道 -->
      <el-col :span="24">
        <el-select
          v-model="areaSelect"
          filterable
          clearable
          placeholder=""
          @change="selectChange(5, 'area')"
        >
          <el-option
            v-for="(value, label) in areaOption"
            :key="value"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { statusdict } from '@/api/input-forecast'

// 下一级对应关系
const nextLevel = {
  init: 'province',
  province: 'city',
  city: 'county',
  county: 'area'
}
// 默认数据
const defaultDataConfig = {
  province: 2,
  city: 3
}

export default {
  props: {
    province: {
      type: [String, Number],
      default() {
        return ''
      }
    },
    city: {
      type: [String, Number],
      default() {
        return ''
      }
    },
    county: {
      type: [String, Number],
      default() {
        return ''
      }
    },
    area: {
      type: [String, Number],
      default() {
        return ''
      }
    },
    areaLabel: {
      type: [String, Number],
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      provinceOption: [],
      provinceSelect: '',
      cityOption: [],
      citySelect: '',
      areaOption: [],
      areaSelect: '',
      countyOption: [],
      countySelect: ''
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(status = 1, name = 'init') {
      const params = { status }
      if (name) params[name] = this[`${name}Select`]
      if (Object.prototype.hasOwnProperty.call(nextLevel, name)) {
        statusdict(params).then(res => {
          this[`${nextLevel[name]}Option`] = res.data
          if (
            Object.prototype.hasOwnProperty.call(
              defaultDataConfig,
              nextLevel[name]
            )
          ) {
            this[`${nextLevel[name]}Select`] = res.data[0]
            this.init(defaultDataConfig[nextLevel[name]], nextLevel[name])
          }
        })
      }
    },
    selectChange(status, name) {
      // 通知更新props
      this.$emit(`update:${name}`, this[`${name}Select`])
      const find = Object.keys(this[`${name}Option`]).find(v => {
        return (
          String(this[`${name}Option`][v]) === String(this[`${name}Select`])
        )
      })
      if (find) {
        this.$emit(`update:${name}Label`, find)
      }
      // 请求下一级数据
      if (Object.prototype.hasOwnProperty.call(nextLevel, name)) {
        this.init(status, name)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.area-select {
  width: 100%;
  height: 100%;

  .area-select-item + .area-select-item {
    margin-top: 20px;
  }
}
</style>
