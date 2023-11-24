<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <div class="logo">
          <svg-icon icon-class="logo" class="logo" />
        </div>
        <div class="title">广东省疾控中心多点触发预警预测平台</div>
      </div>
      <div class="right" />
    </div>
    <div class="content">
      <!-- 常用病种 -->
      <div v-for="(v, i) in usedMenu" :key="`${i}-used`" class="type-item">
        <div class="top">
          <div class="label">
            <div class="split" />
            {{ v.name }}
          </div>
        </div>
        <div class="items">
          <div
            v-for="(item, index) in v.menus"
            :key="index"
            class="item"
            @click="targetUrl(item)"
          >
            <div class="icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="label">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>

      <!-- 其他 -->
      <div v-for="(v, i) in sysMenu" :key="`${i}-sys`" class="type-item">
        <div class="top">
          <div class="label">
            <div class="split" />
            {{ v.name }}
          </div>
          <div class="more">更多</div>
        </div>
        <div class="items">
          <div
            v-for="(item, index) in v.menus"
            :key="index"
            class="item"
            @click="targetUrl(item)"
          >
            <div class="icon">
              <img :src="item.icon" alt="">
            </div>
            <div class="label">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sysMenu: [
        {
          name: '传染病管理',
          menus: [
            {
              name: '新冠肺炎',
              icon: require('@/assets/syschange/xinguan.png'),
              path: '/'
            },
            {
              name: '艾滋病',
              icon: require('@/assets/syschange/aizi.png'),
              path: ''
            },
            {
              name: '登革热',
              icon: require('@/assets/syschange/denggere.png'),
              path: ''
            },
            {
              name: '布鲁氏菌病',
              icon: require('@/assets/syschange/bulushijun.png'),
              path: ''
            },
            {
              name: '血吸虫病',
              icon: require('@/assets/syschange/xuexichong.png'),
              path: ''
            },
            {
              name: '天花病毒',
              icon: require('@/assets/syschange/tianhua.png'),
              path: ''
            },
            {
              name: '麻疹',
              icon: require('@/assets/syschange/mazhen.png'),
              path: ''
            },
            {
              name: '白喉杆菌',
              icon: require('@/assets/syschange/baihouganjun.png'),
              path: ''
            },
            {
              name: 'SARS冠状病毒',
              icon: require('@/assets/syschange/sars.png'),
              path: ''
            },
            {
              name: '马尔堡病毒',
              icon: require('@/assets/syschange/maerbao.png'),
              path: ''
            },
            {
              name: '汉坦病毒',
              icon: require('@/assets/syschange/hantan.png'),
              path: ''
            },
            {
              name: '埃博拉病毒',
              icon: require('@/assets/syschange/aibola.png'),
              path: ''
            }
          ]
        },
        {
          name: '慢性病',
          menus: [
            {
              name: '慢性肾功能障碍',
              icon: require('@/assets/syschange/shengongneng.png'),
              path: ''
            },
            {
              name: '类风湿性关节炎',
              icon: require('@/assets/syschange/leifengshi.png'),
              path: ''
            },
            {
              name: '僵硬脊椎',
              icon: require('@/assets/syschange/jizhui.png'),
              path: ''
            },
            {
              name: '心脏病',
              icon: require('@/assets/syschange/xinzangbing.png'),
              path: ''
            },
            {
              name: '心脑血管',
              icon: require('@/assets/syschange/xinnaoxueguan.png'),
              path: ''
            },
            {
              name: '慢性支气管炎哮喘',
              icon: require('@/assets/syschange/xiaochuan.png'),
              path: ''
            }
          ]
        },
        {
          name: '食品安全',
          menus: [
            {
              name: '食源性疾病',
              icon: require('@/assets/syschange/shiyuan.png'),
              path: ''
            },
            {
              name: '食品污染监测',
              icon: require('@/assets/syschange/shipinwuran.png'),
              path: ''
            },
            {
              name: '食品安全监测',
              icon: require('@/assets/syschange/shipinanquan.png'),
              path: ''
            },
            {
              name: '突发性事件报告',
              icon: require('@/assets/syschange/tufa.png'),
              path: ''
            }
          ]
        }
      ],
      usedMenu: [
        {
          name: '常用病种',
          menus: [
            {
              name: '新冠肺炎',
              icon: require('@/assets/syschange/xinguan.png'),
              path: '/'
            },
            {
              name: '布鲁氏菌病',
              icon: require('@/assets/syschange/bulushijun.png'),
              path: ''
            },
            {
              name: '血吸虫病',
              icon: require('@/assets/syschange/xuexichong.png'),
              path: ''
            }
          ]
        }
      ]
    }
  },
  methods: {
    targetUrl(item) {
      if (!item.path) return
      this.$router.push({ path: item.path })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    height: 70px;
    background: linear-gradient(180deg, #018fff 0%, #0d6dff 100%);
    box-shadow: 0px 2px 4px 0px rgba(61, 149, 235, 0.5);
    padding: 0 16px;
    display: flex;
    justify-content: space-between;

    .left,
    .right {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .left {
      .logo {
        color: #fff;
        font-size: 60px;
      }

      .title {
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-left: 12px;
      }
    }

    .right {
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  padding: 20px;

  .type-item + .type-item {
    margin: 10px 0;
  }

  .type-item {
    display: flex;
    flex-direction: column;

    .top {
      display: flex;
      justify-content: space-between;

      > .label {
        display: flex;
        margin-bottom: 20px;
        > .split {
          width: 3px;
          height: 17px;
          background-color: #0d6dff;
          margin-right: 15px;
        }
        font-family: PingFangSC-Medium;
        font-size: 16px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #3f4863;
      }

      .more {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #0d6dff;
        user-select: none;
        cursor: pointer;
      }
    }

    .items {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .item {
        width: calc((100% - 10px * 12) / 6);
        height: 97px;
        margin: 10px;
        background-color: #ffffff;
        border-radius: 4px;
        border: solid 1px #f1f1f1;
        display: flex;
        align-items: center;
        padding: 0 20px;
        user-select: none;
        cursor: pointer;
        > .icon {
          width: 55px;
          height: 55px;
          margin-right: 20px;
          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        > .label {
          font-family: PingFangSC-Medium;
          font-size: 18px;
          font-weight: normal;
          font-stretch: normal;
          letter-spacing: 0px;
          color: #3f4863;
        }

        &:hover {
          border: solid 2px #0b75ff;
        }
      }
    }
  }
}
</style>
