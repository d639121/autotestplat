<template>
  <div class="home-container">
    <el-card :body-style="{ height: '100%' }">
      <el-row>
        <el-col
          :span="6"
          v-for="(o, index) in project_name"
          :key="o"
          :offset="index > 0 ? 2 : 0"
        >
          <el-card :body-style="{ padding: '0px' }">
            <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              class="image"
            />
            <div style="padding: 14px;">
              <span>好吃的汉堡</span>
              <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      currentDate: new Date(),
      project_name: [
        { name: "海川" },
        { name: "师说" },
        { name: "小咖" },
        { name: "伏羲" },
        { name: "超能" },
        { name: "银河" }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {
    return {};
  },
  mounted() {},

  methods: {}
};
</script>

<style lang="less">
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 80px;
  height: 80px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
