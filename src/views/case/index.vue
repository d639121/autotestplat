<template>
  <div>
    <div>
      <el-card>
        <!-- // 面包屑 -->
        <div>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>测试用例</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <br />

        <!-- // 筛选表单 -->
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          size="small"
        >
          <el-form-item label="用例名称">
            <el-input
              v-model="formInline.name"
              placeholder="请输入用例名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="用例类型">
            <el-select v-model="formInline.type" placeholder="用例类型">
              <el-option
                v-for="item in caseType"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="loadCase">查询</el-button>
            <el-button type="success" @click="addCase">新增 </el-button>
          </el-form-item>

          <!-- // 环境变量 -->
          <el-form-item class="config" style="margin-left:500px">
            <el-select
              v-model="formInline.config"
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

          <!-- // 环境变量弹窗 -->
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
              <el-button
                type="primary"
                @click="configVisible = false"
                size="small"
                >确 定
              </el-button>
            </div>
          </el-dialog>
        </el-form>
      </el-card>
    </div>
    <br />

    <div class="main">
      <el-container>
        <el-aside width="180px">
          <el-card style="height: 96.7%">
            <div>
              <el-button
                type=""
                icon="el-icon-plus"
                circle
                plain
                size="mini"
                @click="addDir()"
              ></el-button>
              <el-button
                type=""
                icon="el-icon-edit"
                circle
                plain
                size="mini"
                @click="editDir()"
                style="margin-left:22px"
              ></el-button>
              <el-button
                type=""
                icon="el-icon-delete"
                circle
                plain
                size="mini"
                @click="deleteDir()"
                style="margin-left:22px"
              ></el-button>
            </div>
            <el-divider></el-divider>

            <!-- // 树节点 -->
            <div class="custom-tree-container">
              <div class="block">
                <el-tree
                  class="filter-tree"
                  node-key="treeId"
                  :data="treeData"
                  :props="defaultProps"
                  :default-expand-all="false"
                  ref="tree"
                  @node-click="handleNodeClick"
                  current-node-key="currentNode"
                  :highlight-current="true"
                >
                  <div class="custom-tree-node" slot-scope="{ node }">
                    <div class="tree-column" style=" font-size:14px">
                      <i class="el-icon-folder-opened"></i>
                      <span>{{ node.label }}</span>
                    </div>
                  </div>
                </el-tree>
              </div>
            </div>
          </el-card>
        </el-aside>

        <el-main style="！important; padding-top: 0; padding-right: 0">
          <el-card>
            <el-table
              border=""
              size="medium"
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column
                label="用例名称"
                width="160"
                show-overflow-tooltip
                prop="name"
              >
              </el-table-column>
              <el-table-column label="用例类型" width="120">
                <template slot-scope="scope">
                  <el-tag type="primary" effect="plain">
                    {{ scope.row.tag }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column
                label="环境"
                show-overflow-tooltip
                width="100"
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
                label="最近执行结果"
                show-overflow-tooltip
                width="120"
                prop="result"
              >
                <template slot-scope="scope">
                  <el-tag type="success" effect="dark">
                    {{ scope.row.result }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="执行次数" width="100" prop="times">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="editCase(scope.$index, scope.row)"
                    type="primary"
                    >编辑
                  </el-button>
                  <el-button
                    size="mini"
                    @click="contactCase()"
                    type="primary"
                    plain
                    >关联
                  </el-button>
                  <el-button
                    size="mini"
                    @click="runCase(scope.$index, scope.row)"
                    type="success"
                    plain
                    >运行
                  </el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteCase(scope.row.id)"
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
        </el-main>
      </el-container>
    </div>

    <!-- // 弹窗表单 -->
    <el-dialog
      :title="addCaseTitle"
      :visible.sync="addCaseVisible"
      :modal-append-to-body="false"
    >
      <add-form></add-form>
      <!-- // 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCaseVisible = false" size="small"
          >取 消
        </el-button>
        <el-button type="primary" @click="addCaseVisible = false" size="small"
          >确 定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :title="contactTitle"
      :visible.sync="contactVisible"
      :modal-append-to-body="false"
    >
      <contact></contact>
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="small"
          >取 消
        </el-button>
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
          size="small"
          >确 定
        </el-button>
      </div> -->
    </el-dialog>

    <el-dialog
      :title="addDirTitle"
      :visible.sync="addDirVisible"
      :modal-append-to-body="false"
      width="25%"
    >
      <el-form :inline="true" :model="addDirForm" class="demo-form-inline">
        <el-form-item label="目录名称" label-width="100px">
          <el-input
            v-model="addDirForm.dirName"
            placeholder="请输入目录名称"
            style="width:250px"
          >
            <!-- <template slot="prepend" style="background-color:#fff">
              <span>目录名称</span>
            </template> -->
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDirVisible = false" size="small"
          >取 消
        </el-button>
        <el-button type="primary" @click="addDirVisible = false" size="small"
          >确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Config from "@/views/interface/components/config";
import Contact from "./components/contact";
import AddForm from "./components/form";
import { addCase, updateCase, queryCase, deleteCase } from "@/api/case";
import { addGroup, updateGroup, queryGroup, deleteGroup } from "@/api/case";

export default {
  name: "Case",
  props: {},
  components: {
    Contact,
    AddForm
  },
  data() {
    const td = {
      name: "LOUIE测试用例",
      tag: "冒烟测试",
      env: "预发布",
      status: "新建",
      date: "2020-02-02 10:10",
      result: "成功",
      times: "121"
    };
    return {
      // 筛选表单属性
      formInline: {
        name: undefined,
        type: undefined,
        config: undefined
      },
      caseTypeValue: "",
      env: "",
      caseType: [
        { label: "全部", value: "undefind" },
        { label: "冒烟测试", value: "0" },
        { label: "系统测试", value: "1" },
        { label: "集成测试", value: "2" },
        { label: "回归测试", value: "3" }
      ],

      // 环境变量
      configVisible: false,

      // 侧边栏用例分组列表
      treeData: [
        {
          id: 1,
          label: "线上测试用例",
          children: [
            {
              id: 4,
              label: "系统测试",
              children: [
                {
                  id: 9,
                  label: "冒烟"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      },

      tableData: Array(10).fill(td),
      multipleSelection: [],

      // 添加用例弹窗
      addCaseTitle: "",
      addCaseVisible: false,
      addForm: {},

      // 关联用例弹窗
      contactTitle: "",
      contactVisible: false,
      contactForm: {},

      // 新增目录弹窗
      addDirTitle: "",
      addDirVisible: false,
      addDirForm: {
        dirName: ""
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    //
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

    // 加载用例
    loadCase() {
      console.log("case");
    },

    // 添加用例
    addCase() {
      this.addCaseVisible = true;
      this.addCaseTitle = "添加用例";
    },

    // 编辑用例
    editCase() {
      this.addCaseVisible = true;
      this.addCaseTitle = "编辑用例";
    },

    // 删除用例
    deleteCase() {
      this.$message.error("删除成功");
    },

    // 关联用例
    contactCase() {
      this.contactVisible = true;
      this.contactTitle = "关联接口";
      console.log("handleContact");
    },

    // 新增目录
    addDir() {
      this.addDirVisible = true;
      this.addDirTitle = "新增目录";
    },

    // 编辑目录
    editDir() {
      this.addDirVisible = true;
      this.addDirTitle = "编辑目录";
    },

    // 删除目录
    deleteDir() {
      this.$message.error("删除成功");
    }
  }
};
</script>

<style lang="less"></style>
