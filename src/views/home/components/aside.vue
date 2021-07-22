<template>
  <!--
    el-menu-item 的 index 不能重复，确保唯一即可
   -->
  <el-menu
    class="nav-menu el-menu-vertical-demo"
    :default-active="$route.path"
    background-color="rgb(16, 84, 139)"
    text-color="#fff"
    active-text-color="	#EEEE00"
    router
    :collapse="isCollapse"
  >
    <div class="avatar" style="margin:20px">
      <el-avatar
        shape="square"
        :src="require('../../../assets/avatar3.png')"
      ></el-avatar>
      <span class="username" style="margin-left:5px; color:#fff; font-size:10px"
        >{{ username }}
      </span>
    </div>
    <el-menu-item index="/index">
      <i class="el-icon-s-platform"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/project">
      <i class="el-icon-s-goods"></i>
      <span slot="title">项目管理</span>
    </el-menu-item>
    <el-menu-item index="/interface">
      <i class="el-icon-s-release"></i>
      <span slot="title">基础接口</span>
    </el-menu-item>
    <el-menu-item index="/case">
      <i class="el-icon-star-on"></i>
      <span slot="title">测试用例</span>
    </el-menu-item>
    <el-menu-item index="/suit">
      <i class="el-icon-s-help"></i>
      <span slot="title">测试套件</span>
    </el-menu-item>
    <el-menu-item index="/variable">
      <i class="el-icon-s-shop"></i>
      <span slot="title">全局变量</span>
    </el-menu-item>
    <el-menu-item index="/task">
      <i class="el-icon-s-flag"></i>
      <span slot="title">定时任务</span>
    </el-menu-item>
    <el-menu-item index="/summary">
      <i class="el-icon-video-camera-solid"></i>
      <span slot="title">报告管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "AppAside",
  components: {},
  props: ["is-collapse"],
  data() {
    return {
      // isCollapse: true
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

<style scoped lang="less">
.nav-menu {
  .iconfont {
    margin-right: 10px;
    padding-left: 5px;
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
