<template>
  <div>
    <div>
      <el-card>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>定时任务</el-breadcrumb-item>
        </el-breadcrumb>
        <br />
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item label="任务名称">
            <el-input
              v-model="formInline.user"
              placeholder="请输入任务名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="formInline.region"
              placeholder="状态"
              style="width:150px"
            >
              <el-option label="执行" value="0"></el-option>
              <el-option label="停止" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <br />
    </div>
    <div>
      <el-card>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="任务名称" width="180">
            LOUIE定时任务
          </el-table-column>
          <el-table-column label="时间配置" width="180"
            >*1*1*2
          </el-table-column>
          <el-table-column label="任务状态" width="180">
            发送
          </el-table-column>
          <el-table-column label="关联套件" width="180">
            LOUIE测试套件
          </el-table-column>
          <el-table-column label="邮件状态" width="180">
            已发送
          </el-table-column>
          <el-table-column label="邮件策略" width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>姓名: {{ scope.row.name }}</p>
                <p>住址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">LOUIE</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div>
          <br />
          <el-pagination
            background
            layout="total, prev, pager, next"
            :total="1000"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: Array(10).fill(item)
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style lang="less"></style>
