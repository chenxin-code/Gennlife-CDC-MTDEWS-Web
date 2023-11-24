<template>
  <div class="container">
    <div class="header">
      <div class="left">
        <div class="logo">
          <svg-icon icon-class="logo" class="logo" />
        </div>
        <div class="title">广东省疾控中心多点触发预警预测平台</div>
      </div>
      <div class="right">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper">
            <img
              :src="avatar + '?imageView2/1/w/80/h/80'"
              class="user-avatar"
            >
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
            </router-link>

            <router-link to="/sys/change">
              <el-dropdown-item>
                切换病种
              </el-dropdown-item>
            </router-link>

            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">Log Out</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <baseLayout />
  </div>
</template>

<script>
import baseLayout from './base'
import { mapGetters } from 'vuex'

export default {
  components: {
    baseLayout
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
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
      &:focus {
        outline: none;
      }
      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: -20px;
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
