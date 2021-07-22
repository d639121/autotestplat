<template>
  <div class="project">
    <!-- // 数据操作表单 -->
    <el-card>
      <!-- // 面包屑导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/project">项目管理</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <br />
      <!-- // 筛选条件 -->
      <el-form
        ref="form"
        :inline="true"
        :model="form"
        label-width="80px"
        size="mini"
      >
        <el-form-item class="form-name" label="项目名称">
          <el-input v-model="form.name" style="width:200px"></el-input>
        </el-form-item>

        <el-form-item class="status" label="状态">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option label="全部" :value="undefined"></el-option>
            <el-option label="正常" :value="0"></el-option>
            <el-option label="禁用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="date" label="日期">
          <el-date-picker
            style="width:200px"
            v-model="form.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </el-form-item>
        <!-- // 操作按钮 -->
        <el-form-item>
          <el-button class="search" type="primary" @click="handleSearch">
            搜索
          </el-button>
          <el-button class="reset" @click="handleReset">重置</el-button>
          <el-button
            type="success"
            @click="
              dialogFormVisible = true;
              isadd = true;
            "
            >新增</el-button
          >
        </el-form-item>
      </el-form> </el-card
    ><br />
    <!-- // 列表数据 -->
    <el-card>
      <el-table
        class="table"
        :data="tableData"
        border
        style="width: 100%"
        v-loading="loading"
        size="medium"
      >
        <el-table-column prop="project_name" label="项目名称" width="180">
        </el-table-column>
        <el-table-column prop="desc" label="描述" width="400">
        </el-table-column>
        <!-- // 状态显示 -->
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <!-- <el-tag :type="items[scope.row.status].type">{{
              items[scope.row.status].text
            }}</el-tag> -->
            <!-- // 常规判断 -->
            <el-tag v-if="scope.row.status === 0" type="success" effect="plain"
              >正常</el-tag
            >
            <el-tag v-if="scope.row.status === 1" type="danger" effect="plain"
              >禁用</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="300">
        </el-table-column>
        <el-table-column prop="leader" label="负责人" width="120">
          <template slot-scope="scope">
            <el-tag type="primary" effect="plain">{{
              scope.row.leader
            }}</el-tag>
          </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="
                changeData(scope.row);
                dialogFormVisible = true;
                isadd = false;
              "
              type="primary"
            >
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="hanleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <!-- // 分页展示 -->
      <el-pagination
        class="pagination"
        background
        layout="total, prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
        @current-change="loadProjects"
      >
      </el-pagination
    ></el-card>
    <!-- 编辑表单弹窗 -->
    <el-dialog
      title="编辑项目"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      width="500px"
    >
      <el-form :model="dialogForm">
        <el-form-item label-width="10px">
          <el-input
            v-model="dialogForm.project_name"
            autocomplete="off"
            size="medium"
          >
            <template slot="prepend">项目名称</template>
          </el-input>
        </el-form-item>
        <el-form-item label-width="10px">
          <el-input v-model="dialogForm.desc" autocomplete="off" size="medium">
            <template slot="prepend">项目描述</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="medium"
          >取 消</el-button
        >
        <el-button type="primary" @click="handleForm" size="medium"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryProject,
  addProject,
  deleteProject,
  updateProject
} from "@/api/project";

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      form: {
        name: undefined,
        status: undefined,
        date: ""
      },
      tableData: [],
      items: [
        { type: "success", text: "正常" },
        { type: "danger", text: "禁用" }
      ],
      loading: true,
      // 列表页数
      pageSize: 10,
      page: 1,
      totalCount: 0,
      dialogVisible: false,
      dialogFormVisible: false,
      // 取出usernmae字段
      dialogForm: {
        project_name: "",
        leader: window.localStorage.getItem("username"),
        desc: ""
      },
      rowData: {},
      isadd: ""
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadProjects();
  },
  mounted() {},
  methods: {
    // 加载项目方法，进入项目就调用此方法
    loadProjects(page = 1) {
      this.loading = true;

      queryProject({
        page,
        page_size: this.pageSize,
        status: this.form.status
      }).then(res => {
        let data = res.data.data;
        let total = res.data.total;
        this.tableData = data;
        this.totalCount = total;
        // 关闭加载提示
        this.loading = false;
      });
    },

    // 查询方法
    handleSearch() {
      queryProject({
        project_name: this.form.name,
        page_size: this.pageSize,
        status: this.form.status
      }).then(res => {
        this.tableData = res.data.data;
        this.totalCount = res.data.total;
        // 关闭加载提示
        this.loading = false;
      });
    },

    // 重置Form表单
    handleReset() {
      this.form.name = undefined;
      this.form.status = undefined;
      this.form.date = undefined;
      this.loadProjects();
    },

    // 新增项目
    handleAdd() {
      addProject(this.dialogForm)
        .then(res => {
          this.$message({
            message: "添加成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message.error("添加失败");
          console.log(err);
        });
    },

    // 编辑项目
    handleEdit() {
      updateProject(this.dialogForm)
        .then(res => {
          this.$message({
            message: "更新成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message.error("更新失败");
          console.log(err);
        });
    },

    // 修改数据
    changeData(row) {
      this.dialogForm.project_name = row.project_name;
      this.dialogForm.desc = row.desc;
      this.dialogForm.id = row.id;
    },

    // 新增表单确定按钮点击事件
    handleForm() {
      if (!this.isadd) {
        this.handleEdit();
      } else {
        this.handleAdd();
      }
      this.dialogFormVisible = false;
      this.loadProjects(this.page);
    },

    // 删除操作
    hanldeDelete(id) {
      this.$confirm("此操作将永久删除该项目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteProject({ id }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功"
            });
            // 删除成功后，更新当前页的数据列表
            this.loadProjects(this.page);
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="less"></style>
