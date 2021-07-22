<template>
  <div>
    <div>
      <el-card>
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>测试套件</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <br />
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item label="套件名称">
            <el-input v-model="formInline.user" placeholder="请输入套件名称">
            </el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.region" placeholder="用例类型">
              <el-option label="冒烟测试" value="0"></el-option>
              <el-option label="集成测试" value="1"></el-option>
              <el-option label="系统测试" value="2"></el-option>
              <el-option label="回归测试" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <br />
    <div class="main">
      <el-card>
        <el-table
          border=""
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          size="medium"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            label="套件名称"
            width="160"
            show-overflow-tooltip
            prop="name"
          >
          </el-table-column>
          <el-table-column label="套件类型" width="120">
            <template slot-scope="scope">
              <el-tag type="primary" effect="plain">
                {{ scope.row.tag }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="关联用例"
            show-overflow-tooltip
            width="200"
            prop="env"
          >
          </el-table-column>
          <el-table-column label="状态" show-overflow-tooltip width="120">
            <template slot-scope="scope">
              <el-tag type="info" effect="plain">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="创建时间"
            show-overflow-tooltip
            width="180"
            prop="date"
          >
          </el-table-column>
          <el-table-column
            label="执行结果"
            show-overflow-tooltip
            width="100"
            prop="result"
          >
            <template slot-scope="scope">
              <el-tag type="success" effect="dark">
                {{ scope.row.result }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="执行次数" width="80" prop="times">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
                >编辑
              </el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
                type="success"
                plain
                >运行
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <br />
        <div>
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
    const td = {
      name: "LOUIE测试套件",
      tag: "集成",
      env: "登录相关、购物车相关",
      status: "新建",
      date: "2020-02-02 10:10",
      result: "成功",
      times: "121"
    };
    return {
      formInline: {
        user: "",
        region: ""
      },
      tableData: Array(10).fill(td),
      multipleSelection: []
    };
  },
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {},
  mounted() {},
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="less"></style>
