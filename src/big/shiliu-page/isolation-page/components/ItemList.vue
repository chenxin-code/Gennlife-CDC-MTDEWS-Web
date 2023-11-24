<template>
  <div class="diff-bar">
    <table>
      <tr>
        <th>排序</th>
        <th style="{ margin: '0 8px' }">时间</th>
        <th>城市</th>
        <th>剩余酒店数</th>
        <th>酒店使用率</th>
        <th>剩余病床数</th>
        <th>病房使用率</th>
      </tr>
      <tr v-for="(v, i) in data" :key="i" class="bar-item">
        <td>
          <div class="number">{{ i + 1 }}</div>
        </td>
        <td>{{ v.city }}</td>
        <td style="{ margin: '0 8px' }">{{ v.dates }}</td>
        <td>{{ v.hotel_residue }}</td>
        <td>{{ v.hotel_used_rate }}%</td>
        <td>{{ v.sickbed_residue }}</td>
        <td>{{ v.hospital_used_rate }}%</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [
          { name: '美国', value: 98 },
          { name: '德国', value: 65 },
          { name: '印度', value: 58 },
          { name: '加拿大', value: 47 },
          { name: '日本', value: 38 }
        ]
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.diff-bar {
  width: 100%;
  height: 100%;
  overflow: scroll;
  // display: flex;
  // flex-direction: column;
  // justify-content: space-around;

  tr th {
    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    white-space: nowrap;
  }

  tr td {
    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    white-space: nowrap;
    padding: 0.4rem 0;
  }

  .number {
    display: block;
    width: 1rem;
    height: 1rem;
    background: rgba(#ffe7b3, 0.9);
    text-align: center;
    line-height: 1rem;
    border-radius: 50%;

    font-size: 0.75rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1c1f3c;
    margin: 0 auto;
  }
}
</style>
