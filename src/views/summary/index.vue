<template>
  <div>
    <div class="search-form">
      <el-card>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>报告管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br />
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item label="名称">
            <el-input
              v-model="formInline.user"
              placeholder="请输入报告名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formInline.region"
              placeholder="报告类型"
              style="width:120px"
            >
              <el-option label="全部" value="undefind"></el-option>
              <el-option label="调试" value="1"></el-option>
              <el-option label="定时" value="2"></el-option>
              <el-option label="异步" value="3"></el-option>
              <el-option label="部署" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formInline.region"
              placeholder="报告结果"
              style="width:120px"
            >
              <el-option label="全部" value="undefind"></el-option>
              <el-option label="通过" value="0"></el-option>
              <el-option label="失败" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">搜索</el-button>
            <el-button @click="onSubmit">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <br />
    <div class="table-form">
      <el-card>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="报告类型" width="120">
            <template slot-scope="scope">
              <el-tag
                size="medium"
                v-if="scope.row.type === 1"
                type="info"
                effect="plain"
                >调试</el-tag
              >
              <el-tag
                size="medium"
                v-if="scope.row.type === 2"
                type="success"
                effect="plain"
                >定时</el-tag
              >
              <el-tag
                size="medium"
                v-if="scope.row.type === 3"
                type="danger"
                effect="plain"
                >异步</el-tag
              >
              <el-tag
                size="medium"
                v-if="scope.row.type === 4"
                type="warning"
                effect="plain"
                >部署</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="报告名称" width="300" prop="name">
          </el-table-column>
          <el-table-column label="报告结果" width="180">
            <template slot-scope="scope">
              <el-tag
                size="medium"
                v-if="scope.row.status === true"
                type="success"
                effect="dark"
                >PASS</el-tag
              >
              <el-tag
                size="medium"
                v-if="scope.row.status === false"
                type="danger"
                effect="dark"
                >FAILD</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="运行时间" width="240px" prop="create_time">
          </el-table-column>
          <el-table-column label="耗时" width="120" prop="type">
          </el-table-column>
          <el-table-column label="接口总数" width="120" prop="type">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
                plain
                >详情
              </el-button>
              <el-button
                size="mini"
                type="danger"
                plain
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="1000"
        >
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
import { querySummary, SummaryDetail, deleteSummary } from "@/api/summary";

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: []
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadSummary();
  },
  mounted() {},
  methods: {
    loadSummary(page = 1) {
      querySummary({
        page,
        page_size: 10
      }).then(res => {
        let varData = res.data;
        this.tableData = varData.data;
      });
    },
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
