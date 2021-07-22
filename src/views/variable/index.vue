<template>
  <div class="variable">
    <el-card class="searchForm">
      <!-- // 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
          <a href="/">全局变量</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <br />
      <!-- // 查询表单 -->
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        size="small"
        :inline="true"
      >
        <el-form-item label="变量名称" prop="key">
          <el-input v-model="form.name" placeholder="请输入变量名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loadVariable()">搜索</el-button>
          <el-button @click="handleResert">重置</el-button>
          <el-button type="success" @click="handleAdd()">新增</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <br />
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="key" label="变量名" width="220">
        </el-table-column>
        <el-table-column prop="value" label="变量值" width="220">
        </el-table-column>
        <el-table-column prop="desc" label="描述"> </el-table-column>
        <el-table-column prop="update_time" label="更新时间" width="250">
        </el-table-column>
        <!-- // 操作按钮 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="
                isadd = false;
                handleEdit(scope.row);
              "
              >编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <br />
      <!-- // 分页展示 -->
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="pagination.total"
        :page-size="pagination.pageSize"
        :current-page.sync="pagination.page"
        @current-change="loadVariable"
      >
      </el-pagination>
    </el-card>
    <el-dialog
      :title="title"
      :visible.sync="dialogFormVisible"
      :modal-append-to-body="false"
      @close="dialogFormClosed"
      width="500px"
    >
      <el-form :model="dialogForm" :rules="dialogFormRules" ref="dialogFormRef">
        <el-form-item prop="key" label="变量名称" label-width="120px">
          <el-input
            v-model="dialogForm.key"
            autocomplete="off"
            style="width:270px"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="value" label="变量值" label-width="120px">
          <el-input
            v-model="dialogForm.value"
            autocomplete="off"
            style="width:270px"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="desc" label="描述" label-width="120px">
          <el-input
            v-model="dialogForm.desc"
            autocomplete="off"
            style="width:270px"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addVariable,
  deleteVariable,
  updateVariable,
  queryVariable
} from "@/api/variable";

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      // 筛选表单数据
      form: {
        name: undefined
      },
      // 列表数据
      tableData: [],
      // 分页数据
      pagination: {
        total: 0,
        page: 1,
        pageSize: 10
      },
      // 表单名称
      title: "",
      // 添加和编辑表单的数据绑定对象
      dialogForm: {
        key: "",
        value: "",
        desc: ""
      },
      // 控制添加对话框的显示和隐藏
      dialogFormVisible: false,
      dialogFormRules: {
        key: [
          {
            required: true,
            message: "请输入变量名",
            trigger: "blur"
          },
          {
            max: 30,
            min: 2,
            message: "长度在 2 到 30 个字符",
            trigger: blur
          }
        ],
        value: [
          {
            required: true,
            message: "请输入变量值",
            trigger: "blur"
          },
          {
            max: 30,
            min: 2,
            message: "长度在 2 到 30 个字符",
            trigger: blur
          }
        ],
        desc: [
          {
            max: 50,
            min: 2,
            message: "长度在 2 到 50 个字符",
            trigger: blur
          }
        ]
      }
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadVariable();
  },
  mounted() {},
  methods: {
    // 获取全局变量数据
    loadVariable(page = 1) {
      queryVariable({
        key: this.form.key,
        page,
        page_size: this.pagination.pageSize
      }).then(res => {
        let varData = res.data;
        this.tableData = varData.data;
        this.pagination.total = varData.total;
      });
    },

    // 重置表单
    dialogFormClosed() {
      this.$refs.dialogFormRef.resetFields();
    },

    // 重置筛选表单
    handleResert() {
      this.form.key = undefined;
      this.loadVariable();
    },

    // 新增方法
    handleAdd() {
      this.dialogFormVisible = true;
      // 项目ID暂时是写死的
      let id = window.localStorage.getItem("project_id");
      this.dialogForm = { project_id: id };
      this.title = "添加变量";
    },

    // 编辑方法
    handleEdit(formInfo) {
      this.title = "编辑变量";
      //使用深拷贝
      this.dialogForm = JSON.parse(JSON.stringify(formInfo));
      this.dialogForm.update_time = undefined;
      this.dialogFormVisible = true;
    },

    // 弹窗表单处理
    handleForm() {
      // 校验表单
      this.$refs.dialogFormRef.validate(valid => {
        if (!valid) {
          return;
        }
        // 根据id是否为null判断是新增还是编辑
        if (this.dialogForm.id != null) {
          updateVariable(this.dialogForm).then(res => {
            this.$message("更新成功");
          });
        } else {
          addVariable(this.dialogForm).then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "新增成功"
              });
            } else {
              this.$message.error(res.data.msg);
            }
          });
        }
        // 关闭弹窗表单
        this.dialogFormVisible = false;
        // 清空表单
        this.$refs.dialogFormRef.resetFields();
        // 重新加载数据
        this.loadVariable(this.pagination.page);
      });
    },

    // 删除方法
    handleDelete(id) {
      {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteVariable({ id }).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.loadVariable(this.pagination.page);
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    }
  }
};
</script>

<style lang="less">
.vertical-line {
  height: 1px;
  border-top: 1px solid #dcdfe6;
  text-align: center;
  width: 132px;
  margin-left: 1px;
}
</style>
