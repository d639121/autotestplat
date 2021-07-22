<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside class="aside" width="auto">
      <app-aside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <!-- 顶部布局 -->
      <el-header class="header">
        <div>
          <i
            :class="{
              'el-icon-s-fold': isCollapse,
              'el-icon-s-unfold': !isCollapse
            }"
            @click="isCollapse = !isCollapse"
          ></i>
          <span class="platform">LOUIE自动化测试平台</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <el-avatar
              class="avatar"
              shape="square"
              :src="require('../../../assets/avatar3.png')"
              style="margin-right:10px"
            >
            </el-avatar>
            <span class="username">{{ user.username }}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!-- 主体布局 -->
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from "./aside";
import { getUserInfo } from "@/api/user";
import globalBus from "@/utils/global-bus";

export default {
  name: "LayoutIndex",
  components: {
    AppAside
  },
  props: {},
  data() {
    return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边菜单栏的展示状态
    };
  },
  computed: {},
  watch: {},
  created() {
    // 组件初始化好，请求获取用户资料
    this.loadUserProfile();

    // 注册自定义事件
    // 当这个事件发布以后，这个注册函数就会被调用到
    globalBus.$on("update-user", data => {
      // this.user = data // 注意：不要这么做，对象之间赋值的是引用，会导致相互影响的问题
      this.user.username = data.name;
      this.user.email = data.email;
    });
  },
  mounted() {},
  methods: {
    // 除了登录接口，其它所有接口都需要授权才能请求使用
    // 或者说，除了登录接口，其它接口都需要提供你的身份令牌才能获取数据
    loadUserProfile() {
      let userId = { id: window.localStorage.getItem("userId") };
      getUserInfo(userId).then(res => {
        let userInfo = res.data.data;
        this.user = userInfo;
        window.localStorage.setItem("username", userInfo.username);
      });
    },

    onLogout() {
      this.$confirm("确认退出吗？", "退出提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 把用户的登录状态清除
          window.localStorage.removeItem("token");

          // 跳转到登录页面
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
  }
  .platform {
    margin-left: 10px;
    font-weight: 600;
    color: #303133;
    line-height: 1.5em;
    font-family: Verdana, Geneva, sans-serif;
  }
}

.main {
  background-color: #e9eef3;
}
</style>
