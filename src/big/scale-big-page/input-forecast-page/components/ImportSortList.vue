<template>
  <div class="diff-bar">
    <table>
      <tr>
        <th v-if="sort">排序</th>
        <th v-for="(v, i) in config" :key="i">{{ v.label }}</th>
      </tr>
      <tr v-for="(v, i) in data" :key="i" class="bar-item">
        <td v-if="sort">
          <div class="number">{{ i + 1 }}</div>
        </td>
        <td v-for="(j, i) in config" :key="i">{{ v[j.field] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    sort: {
      type: Boolean,
      default() {
        return false
      }
    },
    config: {
      type: Array,
      default() {
        return [
          { label: '国家', field: 'name' },
          { label: '风险', field: 'risk' },
          { label: '风险等级', field: 'classgrade' }
        ]
      }
    },
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import "~@/styles/big.scss";

.diff-bar {
  width: 100%;
  height: 100%;
  overflow: scroll;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-around;

  table {
    width: 100%;
  }

  tr th {
    font-size: $nomalSize;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    white-space: nowrap;
  }

  tr td {
    font-size: $nomalSize;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    white-space: nowrap;
    padding: getHeight(0.4) 0;
  }

  .number {
    display: block;
    width: getWidth(2);
    height: getHeight(2);
    background: rgba(#ffe7b3, 0.9);
    text-align: center;
    line-height: getHeight(2);
    border-radius: 50%;

    font-size: $nomalSize;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1c1f3c;
    margin: 0 auto;
  }
}
</style>
