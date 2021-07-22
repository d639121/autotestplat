<template>
  <div>
    <el-container class="work">
      <el-container class="work-container">
        <el-aside class="aside" width="250px">
          <div class="avatar">
            <el-avatar
              :size="medium"
              shape="square"
              :src="require('../../assets/avatar3.png')"
            >
            </el-avatar>
            <span class="username">{{ username }} </span>
          </div>
          <div class="aside-menu">
            <el-menu
              :default-active="$route.path"
              background-color="rgba(213, 218, 221, 0.842)"
              text-color="rgba(26, 24, 24, 0.932)"
              active-text-color="	#EEEE00"
              router
              :collapse="isCollapse"
            >
              <el-menu-item>
                <i class="el-icon-s-platform"></i>
                <span slot="title">所有项目</span>
              </el-menu-item>
              <el-menu-item>
                <i class="el-icon-star-off"></i>
                <span slot="title">我的关注</span>
              </el-menu-item>
              <el-menu-item>
                <i class="el-icon-s-platform"></i>
                <span slot="title">项目分组</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-container class="body-container">
          <el-header class="header">Hello Motoaa</el-header>
          <el-main class="main">Mainaaassss</el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      username: window.localStorage.getItem("username")
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
.work {
  background-color: rgb(36, 102, 77);
  .work-container {
    position: fixed;
    left: 3cm;
    right: 3cm;
    top: 0;
    bottom: 0;
    .aside {
      background-color: rgba(213, 218, 221, 0.842);
      height: 100%;
      .avatar {
        margin-top: 200px;
        margin-left: 30px;
        .username {
          margin-left: 20px;
          color: rgba(26, 24, 24, 0.932);
          font-size: 20px;
        }
      }
      .aside-menu {
        margin-top: 20px;
        margin-left: 20px;
      }
    }
    .header {
      background-color: cornflowerblue;
    }
    .main {
      background-color: rgb(124, 25, 124);
    }
  }
}
</style>
