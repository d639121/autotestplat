<template>
  <div>
    <div>
      <el-card>
        <!-- // 面包屑 -->
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>基础接口</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <br />
        <!-- // 筛选表单 -->
        <el-form
          :inline="true"
          :model="operationForm"
          class="operation-form"
          size="small"
          ref="SearchForm"
        >
          <el-form-item label="接口名称">
            <el-input
              v-model="operationForm.apiName"
              placeholder="请输入接口名称"
              clearable
              style="width:180px"
            ></el-input>
          </el-form-item>

          <el-form-item label="状态">
            <el-select
              v-model="operationForm.status"
              placeholder="选择状态"
              clearable
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.lable"
                :value="item.value"
                :label="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="loadInterface()">搜索</el-button>
            <el-button @click="handleResert">重置</el-button>
            <el-button type="success" @click="handeAdd">新增</el-button>
          </el-form-item>
          <!-- // 环境变量 -->
          <el-form-item class="config" style="margin-left:500px">
            <el-select
              v-model="operationForm.config"
              placeholder="Environment"
              style="width:160px"
              clearable
            >
              <el-option label="线上" value="Prod"></el-option>
            </el-select>
            <el-button
              icon="el-icon-share"
              circle
              plain
              style="padding-left:10px; border:None;"
              @click="configVisible = true"
            >
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <!-- // 环境变量操作页面弹窗 -->
      <el-dialog
        title="环境变量"
        :visible.sync="configVisible"
        :modal-append-to-body="false"
        width="1100px"
        center=""
      >
        <config></config>

        <div slot="footer" class="copy-footer">
          <el-button type="" @click="configVisible = false" size="small"
            >取 消
          </el-button>
          <el-button type="primary" @click="configVisible = false" size="small"
            >确 定
          </el-button>
        </div>
      </el-dialog>
      <br />
    </div>

    <!-- // 内容主体 -->
    <div class="case-table">
      <el-container>
        <!-- // 树结构侧边栏 -->
        <el-aside width="220px">
          <el-card style="height: 96.7%;padding:0px">
            <div>
              <el-button
                circle
                plain
                icon="el-icon-circle-plus-outline"
                size="medium"
                style="margin-left:3px;border:None;"
                @click="addTree"
              ></el-button>

              <el-button
                icon="el-icon-edit"
                circle
                plain
                size="medium"
                style="margin-left:15px;border:None;"
              ></el-button>
              <el-button
                icon="el-icon-delete"
                circle
                plain
                size="medium"
                style="margin-left:18px;border:None;"
              ></el-button>

              <!-- // 树结构操作弹窗 -->
              <el-dialog
                :title="treeTitle"
                :visible.sync="treeVisible"
                :modal-append-to-body="false"
                width="450px"
              >
                <el-form inline :model="treeForm" class="tree-form-inline">
                  <el-form-item>
                    <el-input
                      v-model="treeForm.name"
                      placeholder="名称需保持其唯一性，方便识别"
                      size="small"
                      style="width:400px"
                    >
                      <template slot="prepend">分组名称</template>
                    </el-input>
                  </el-form-item>
                </el-form>

                <div slot="footer" class="tree-footer">
                  <el-button @click="treeVisible = false" size="small"
                    >取 消
                  </el-button>
                  <el-button type="primary" @click="append(data)" size="small"
                    >确 定
                  </el-button>
                </div>
              </el-dialog>

              <div class="vertical-line"></div>
            </div>

            <!-- // 树节点页面 -->
            <div class="block">
              <el-tree
                class="filter-tree"
                node-key="id"
                :data="treeData"
                :props="defaultProps"
                ref="tree"
                @node-click="handleNodeClick"
                :expand-on-click-node="false"
                current-node-key="currentNode"
                :highlight-current="true"
              >
                <div
                  class="custom-tree-node"
                  style="position:relative"
                  slot-scope="{ node }"
                >
                  <span class="tree-lable">{{ node.label }}</span>
                  <span>
                    <i class="el-icon-more" @click="visable = true"></i>
                  </span>
                  <div
                    style="width:50px;height:40px;position:absolute;z-index:1;top:0;right:0"
                    :key="node.id"
                  ></div>
                  <!-- <span class="treeBtn" v-show="isEdit">
                    <el-button
                      type="text"
                      size="small"
                      class="el-icon-circle-plus-outline"
                      @click="addTree"
                      style="color:#808080"
                    >
                    </el-button>
                    <el-button
                      type="text"
                      size="small"
                      class="el-icon-edit"
                      style="color:#808080"
                      @click="() => edit(data)"
                    >
                    </el-button>
                    <el-button
                      type="text"
                      size="small"
                      class="el-icon-delete"
                      style="color:#808080"
                      @click="() => remove(node, data)"
                    >
                    </el-button>
                  </span> -->
                </div>
              </el-tree>
            </div>
          </el-card>
        </el-aside>

        <!-- // 主体表格 -->
        <el-main style="padding-top: 0; padding-right: 0">
          <el-card>
            <el-table
              border
              size="medium"
              :data="tableData"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              ref="multipleTable"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>

              <!-- // 接口类型 -->
              <el-table-column prop="method" label="接口类型" width="120">
                <template slot-scope="scope">
                  <el-tag
                    :type="intefaceType[scope.row.method]"
                    effect="dark"
                    size="small"
                  >
                    <span>{{ scope.row.method }}</span>
                  </el-tag>
                </template>
              </el-table-column>

              <el-table-column
                prop="name"
                label="接口名称"
                width="200"
                show-overflow-tooltip
              >
              </el-table-column>

              <el-table-column
                prop="url"
                label="接口地址"
                show-overflow-tooltip
              >
              </el-table-column>

              <el-table-column
                prop="status"
                label="接口状态"
                width="120"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="intefaceStatus[scope.row.status].type"
                    effect="plain"
                    size="small"
                  >
                    {{ intefaceStatus[scope.row.status].text }}
                  </el-tag>
                </template>
              </el-table-column>

              <!-- // 操作按钮 -->
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.row)"
                    type="primary"
                    plain
                  >
                    编辑
                  </el-button>
                  <el-button
                    size="mini"
                    type="info"
                    plain
                    @click="handleCopy(scope.row)"
                  >
                    复制
                  </el-button>
                  <el-button
                    size="mini"
                    type="success"
                    plain
                    @click="handleRun(scope.row)"
                  >
                    运行
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row.id)"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <br />

            <el-pagination
              background
              layout="total, prev, pager, next"
              :total="pagination.total"
              :current-page.sync="pagination.page"
              @current-change="loadInterface(pagination.page)"
            >
            </el-pagination>
          </el-card>

          <!-- // 添加接口弹窗表单 -->
          <el-dialog
            :title="addTitle"
            :visible.sync="addFormVisible"
            :modal-append-to-body="false"
          >
            <div>
              <div>
                <el-input
                  v-model="addForm.name"
                  placeholder="名称尽量保持其唯一性，方便识别"
                  size="small"
                >
                  <template slot="prepend">接口名称</template>
                </el-input>
                <br />
                <br />

                <!-- // 请求行 -->
                <el-input
                  size="small"
                  v-model="addForm.url"
                  placeholder="http://127.0.0.1:8005/api/manage/interface/"
                >
                  <el-select
                    border
                    v-model="method"
                    size="small"
                    style="width:91.5px;"
                    slot="prepend"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.label"
                    >
                    </el-option>
                  </el-select>

                  <!-- // 接口请求次数 -->
                  <el-input-number
                    v-model="count"
                    controls-position="right"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    size="small"
                    style="padding-right:0px"
                    slot="suffix"
                  >
                  </el-input-number>
                </el-input>
                <br />
                <br />
              </div>

              <!-- // 列表数据 -->
              <div class="request">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                  <el-tab-pane label="请求头" name="first" style="color:#F00">
                    <request-header></request-header>
                  </el-tab-pane>

                  <!-- // 参数 -->
                  <el-tab-pane label="参数" name="second">
                    <request-body></request-body>
                  </el-tab-pane>

                  <!-- // 提取表单 -->
                  <el-tab-pane label="响应提取" name="third">
                    <response-extract></response-extract>
                  </el-tab-pane>

                  <!-- // 断言表单 -->
                  <el-tab-pane label="断言" name="fourth">
                    <response-asserts></response-asserts>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>

            <div slot="footer" class="add-footer">
              <el-button @click="addFormVisible = false" size="small"
                >取 消
              </el-button>
              <el-button
                type="primary"
                @click="addFormVisible = false"
                size="small"
                >确 定
              </el-button>
            </div>
          </el-dialog>

          <!-- // 复制接口弹窗表单 -->
          <el-dialog
            :title="copyTitle"
            :visible.sync="copyFormVisible"
            :modal-append-to-body="false"
            width="450px"
          >
            <el-form inline :model="copyForm" class="copy-form-inline">
              <el-form-item>
                <el-input
                  v-model="copyForm.name"
                  placeholder="名称尽量保持其唯一性，方便识别"
                  size="small"
                  style="width:400px"
                >
                  <template slot="prepend">接口名称</template>
                </el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="copy-footer">
              <el-button @click="copyFormVisible = false" size="small"
                >取 消
              </el-button>
              <el-button type="primary" @click="copyEnsure()" size="small"
                >确 定
              </el-button>
            </div>
          </el-dialog>

          <!-- // 运行接口结果弹窗 -->
          <el-dialog
            :visible.sync="reportVisible"
            :modal-append-to-body="false"
            width="1300px"
            center
          >
            <report></report>

            <div slot="footer" class="copy-footer">
              <el-button
                type="primary"
                @click="reportVisible = false"
                size="small"
                >确 定
              </el-button>
            </div>
          </el-dialog>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import {
  queryInterface,
  addInterface,
  deleteInterface,
  updateInterface,
  copyInterface,
  updateStatus
} from "@/api/interface";
import { queryGroup, addGroup, deleteGroup, updateGroup } from "@/api/group";
import { runApi } from "@/api/run";
import Config from "./components/config";
import RequestHeader from "./components/header";
import RequestBody from "./components/body";
import ResponseExtract from "./components/extract";
import ResponseAsserts from "./components/asserts";
import Report from "./components/report";

let id = 1000;

export default {
  name: "",
  props: {},
  components: {
    RequestHeader,
    RequestBody,
    ResponseExtract,
    ResponseAsserts,
    Config,
    Report
  },
  data() {
    const data = [];
    return {
      // 【筛选表单属性】
      operationForm: {
        config: undefined,
        apiName: undefined,
        envVar: undefined,
        status: undefined,
        node: undefined
      },
      // 请求方法选项
      options: [
        {
          label: "GET"
        },
        {
          label: "POST"
        },
        {
          label: "PATCH"
        },
        {
          label: "DELETE"
        },
        {
          label: "PUT"
        },
        {
          label: "OPTIONS"
        },
        {
          label: "HEADE"
        }
      ],
      statusOptions: [
        {
          label: "未知",
          value: "0",
          type: "info"
        },
        {
          label: "成功",
          value: "1"
        },
        {
          label: "失败",
          value: "2"
        },
        {
          label: "调试",
          value: "3"
        }
      ],
      // 选项绑定的属性method、protocol、interface
      method: "GET",
      protocol: "",
      api: "",
      activeName: "first",
      // 接口请求标签
      intefaceType: {
        POST: "success",
        DELETE: "danger",
        PATCH: "info",
        GET: "primary",
        PUT: "warning",
        OPTIONS: "primary",
        HEAD: "success"
      },
      // 接口状态标签
      intefaceStatus: [
        { text: "未知", type: "info" },
        { text: "成功", type: "success" },
        { text: "失败", type: "danger" },
        { text: "调试", type: "primary" }
      ],

      // 【分页属性】
      pagination: {
        total: 0,
        page: 1,
        pageSize: 10
      },
      multipleSelection: [],

      // 表格数据
      tableData: [],
      loading: false,

      // 【树节点数据】
      treeVisible: false,
      treeTitle: "",
      treeForm: {
        name: ""
      },
      isEdit: false,
      currentNode: "",
      treeData: JSON.parse(JSON.stringify(data)),
      defaultProps: {
        children: "children",
        label: "label"
      },

      // 【添加表单弹窗】
      addTitle: "",
      addFormVisible: false,
      addForm: {},
      addRules: {},
      // 接口请求次数
      count: "1",
      formLabelWidth: "120px",

      // 【复制接口表单弹窗】
      copyTitle: "",
      copyFormVisible: false,
      copyForm: {
        name: ""
      },

      // 【运行接口结果弹窗】
      reportVisible: false,
      result: {},

      // 【环境变量操作弹窗】
      configVisible: false
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadInterface();
    this.loadGroup();
  },
  mounted() {},
  methods: {
    // 查询接口表格数据
    loadInterface(page = 1) {
      queryInterface({
        page: page,
        page_size: this.pagination.pageSize,
        name: this.operationForm.apiName,
        env_var: this.operationForm.envVar,
        status: this.operationForm.status,
        node: this.operationForm.node
      })
        .then(res => {
          let varData = res.data;
          this.tableData = varData.data;
          this.pagination.total = varData.total;
        })
        .catch(err => {
          console.log("错误消息：", err);
        });
    },

    // 加载树结构
    loadGroup(page = 1) {
      queryGroup({
        page,
        page_size: 9,
        type: 1,
        project_id: 1 //window.localStorage.getItem('project_id'),
      })
        .then(res => {
          this.treeData = res.data.data[0].tree;
          this.treeData.pop();
          console.log(res.data.data[0].tree);
        })
        .catch(err => {
          console.log("错误消息：", err);
        });
    },

    // 判断当前行显示状态
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === "3") {
        return "success-row";
      }
      return "";
    },

    // 表格全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    // 选中状态
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    // 重置按钮
    handleResert() {
      this.operationForm = {};
      this.$message("重置成功");
      this.loadInterface();
    },

    // 添加接口方法
    handeAdd() {
      this.addFormVisible = true;
      this.title = "添加接口";
    },

    // 打开变量编辑弹窗页面
    openConfig() {
      this.addFormVisible = true;
      this.title = "添加接口";
    },

    // 编辑方法
    handleEdit(formInfo) {
      this.title = "编辑接口";
      //使用深拷贝
      this.addForm = JSON.parse(JSON.stringify(formInfo));
      this.addForm.update_time = undefined;
      this.addFormVisible = true;
    },

    // tree树结构点击节点回调事件
    handleNodeClick(node, data) {
      this.currentNode = node.id;
      this.operationForm.node = node.id;
      this.loadInterface();
      this.isEdit = true;
    },

    // tree树新增节点方法
    append(data) {
      const newChild = { id: id++, label: this.treeForm.name, children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
      this.treeVisible = false;

      console.log("当前：", data);
    },

    // tree树删除节点方法
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    // tree树删除节点方法
    edit(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    // 添加分组
    addTree() {
      this.treeVisible = true;
      this.treeTitle = "添加分组";
    },

    handleTree() {
      let tree = { lable: this.treeForm.name, children: [] };
      this.treeData.push(tree);
      this.treeVisible = false;
      console.log("handle tree");
    },

    // 切换新增表单方法
    handleClick(tab, event) {
      console.log("tab, event");
    },

    handleChange(value) {
      console.log(value);
    },

    // 复制接口
    handleCopy(rowData) {
      this.copyFormVisible = true;
      this.copyTitle = "复制接口";
      this.copyForm.name = rowData.name + " Copy";
      this.copyForm.id = rowData.id;
    },

    // 复制弹窗确定按钮事件
    copyEnsure(rowData) {
      let form = this.copyForm;
      copyInterface(form)
        .then(res => {
          this.copyFormVisible = false;
          this.$message({ type: "success", message: "复制成功" });
          this.loadInterface(this.pagination.page);
        })
        .catch(err => {
          this.$message({ type: "success", message: "复制失败" });
          console.log("错误信息:", err);
        });
    },

    // 运行接口
    handleRun(rowData) {
      this.loading = true;
      let p_id = 1; // window.localStorage.getItem("project_id");
      let config = "LOUIE配置变量6";
      console.log(p_id, config);
      runApi({
        name: config,
        project_id: p_id,
        id: rowData.id
      })
        .then(res => {
          let data = res.data.data;
          this.result.status = data.success;
          this.result.interfaceName = data.details[0].name;

          this.reportVisible = true;
        })
        .catch(err => {
          console.log("错误信息：", err);
        });
      this.loading = false;
    },

    // 删除方法
    handleDelete(id) {
      {
        this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteInterface({ id }).then(res => {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.loadInterface(this.pagination.page);
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
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 0px;
}

.el-tabs__item {
  color: pink;
}

.el-table .success-row {
  border-color: #ecfaf4;
  border-radius: 30px;
}

.config {
  .el-icon-s-operation {
    height: 100;
    width: auto;
    padding-left: 10px;
  }
}
</style>
