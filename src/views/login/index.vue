<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->

    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form
        class="login-form"
        ref="loginForm"
        :rules="formRules"
        :model="user"
      >
        <el-form-item prop="username">
          <el-input
            v-model="user.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-milk-tea"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            show-password
            placeholder="请输入密码"
            prefix-icon="el-icon-dish"
          >
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="promot">提示信息：请注意，航班即将起飞！系好安全带！</div>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            type="primary"
            :loading="loginLoading"
            @click="onLogin"
            >登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      user: {
        username: "", // 用户名
        password: "" // 密码
      },
      loginLoading: false, // 登录的 loading 状态
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onLogin() {
      // 校验提交表单
      this.$refs["loginForm"].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return;
        }

        // 验证通过，请求登录
        this.doLogin();
      });
    },

    doLogin() {
      // 开启登陆中 loading...
      this.loginLoading = true;

      // 对于代码中的请求操作
      // 1、接口请求可能需要重用
      // 2、实际工作中，接口非常容易变动，改起来麻烦
      // 我们建议的做法是把所有的请求都封装成函数然后统一的组织到模块中进行管理
      // 这样做的好处就是：管理维护更方便，也好重用
      login(this.user)
        .then(res => {
          if (res.data.code === 200) {
            // 登录成功
            this.$message({
              message: "登录成功",
              type: "success"
            });
            console.log(res);
            window.localStorage.setItem("userId", res.data.id);
            window.localStorage.setItem("token", res.data.token);
            window.localStorage.setItem("projectId", 1);
            // 跳转到首页
            this.$router.push("/work");
          } else {
            this.$message.error("用户名或密码错误");
            console.log("登录失败", res.data.msg);
          }

          // 关闭 loading
          this.loginLoading = false;
        })
        .catch(err => {
          // 登录失败
          console.log("登录失败", err);
          this.$message.error("登录失败，用户名或密码错误");

          // 关闭 loading
          this.loginLoading = false;
        });
    }
  }
};
</script>

<style scoped lang="less">
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../../assets/login_bg.jpg") no-repeat;
  background-size: cover;
  .login-form-wrap {
    min-width: 300px;
    padding: 30px 50px 10px;
    background-color: #fff;
    .login-head {
      display: flex;
      justify-content: center;
      align-items: center;
      .logo {
        display: flex;
        width: 150px;
        height: 50px;
        background: url("../../assets/logo.png") no-repeat;
        background-size: contain;
        justify-content: center;
        align-items: center;
      }
    }
    .login-form {
      .promot {
        color: rgba(255, 0, 119, 0.918);
      }
      .login-btn {
        width: 100%;
      }
    }
  }
}
</style>
