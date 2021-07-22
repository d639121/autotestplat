<template>
  <div>
    <el-container class="config-container">
      <el-aside width="150px" class="aside">
        <div class="table-btn">
          <el-button
            icon="el-icon-plus"
            circle
            plain
            size="mini"
            style="margin-left:3px"
            @click="addConfig"
          ></el-button>
          <el-button
            icon="el-icon-edit"
            circle
            plain
            size="mini"
            style="margin-left:22px"
            @click="editConfigVisible = true"
          ></el-button>
          <!-- // 重命名弹窗 -->
          <el-dialog
            title="重命名环境变量"
            :visible.sync="editConfigVisible"
            :modal-append-to-body="false"
            width="450px"
            style="height:300px"
          >
            <el-form inline class="copy-form-inline">
              <el-form-item>
                <el-input
                  v-model="currentConfigName"
                  placeholder="名称尽量保持其唯一性，方便识别"
                  size="small"
                  style="width:400px"
                >
                  <template slot="prepend">环境变量名称</template>
                </el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="edit-footer">
              <el-button @click="editConfigVisible = false" size="small"
                >取 消
              </el-button>
              <el-button type="primary" @click="editConfig()" size="small"
                >确 定
              </el-button>
            </div>
          </el-dialog>

          <el-button
            icon="el-icon-delete"
            circle
            plain
            size="mini"
            style="margin-left:22px"
            @click="deleteConfig"
          ></el-button>
          <br />
          <br />

          <!-- // 横向分割线 -->
          <div class="vertical-line"></div>

          <div v-show="addConfigFlag">
            <div
              style="border:solid 1px #2E2EFE;  height:77px; margin-right:15px;; margin-top:10px"
            >
              <input
                type="text"
                style="margin:10px; height:25px; width:105px; color:#2E2E2E; font-size:12px"
                v-model="configName"
                placeholder=" 环境变量名"
              />
              <div>
                <el-button
                  class="el-icon-check"
                  size="mini"
                  type="text"
                  style="margin-right:10px; margin-left:70px;color:#2E2E2E"
                  @click="addConfigSure"
                ></el-button>
                <el-button
                  class="el-icon-delete"
                  size="mini"
                  type="text"
                  style="margin-right:10px; color:#2E2E2E"
                  @click="addConfigFlag = false"
                ></el-button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            v-for="(item, index) in configData"
            :key="item.name"
            :name="item.name"
          >
            <el-button
              style="margin-top:10px;margin-right:15px; width:135px"
              @click="clickConfig(index, item)"
            >
              <span style="font-size:12px">{{ item.name }}</span>
            </el-button>
          </div>
        </div>
      </el-aside>

      <!-- // 分割线 -->
      <div class="horizontal-line"></div>

      <!-- // 主体数据 -->
      <el-main>
        <div>
          <!-- <div>{{ currentConfigVar }}</div> -->
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            size="mini"
            height="440px"
          >
            <el-table-column label="参数名" width="180">
              <template slot-scope="scope">
                <el-input
                  clearable
                  v-model="scope.row.key"
                  size="mini"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="100">
              <template slot-scope="scope">
                <el-input
                  clearable
                  v-model="scope.row.type"
                  size="mini"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="值" width="180">
              <template slot-scope="scope">
                <el-input
                  clearable
                  v-model="scope.row.value"
                  size="mini"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="描述" width="200">
              <template slot-scope="scope">
                <el-input
                  clearable
                  v-model="scope.row.desc"
                  size="mini"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  icon="el-icon-circle-plus-outline"
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  style="border:none"
                >
                </el-button>

                <el-button
                  icon="el-icon-delete"
                  size="mini"
                  v-show="scope.$index !== 0"
                  @click="handleDelete(scope.$index, scope.row)"
                  style="border:none"
                >
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { queryConfig } from "@/api/config";

export default {
  name: "Config",
  props: {},
  components: {},
  computed: {},
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
    this.loadConfig();
  },
  data() {
    return {
      // 表格数据
      tableData: [{ key: "", type: "", value: "", desc: "" }],
      currentRow: "",
      filterText: "",
      treeData: [{ id: 1, label: "一级 1" }],
      defaultProps: {
        children: "children",
        label: "label"
      },

      // 左侧分组数据
      configData: [],
      currentConfigVar: "",
      currentConfigName: "",
      addConfigFlag: false,
      configName: "",
      configValue: undefined,

      editConfigVisible: false
    };
  },
  methods: {
    loadConfig(index = 0, configName) {
      queryConfig()
        .then(res => {
          let data = res.data.data;
          this.configData = data;
          this.tableData = data[index]["body"];

          // this.currentConfigVar = this.configValue;
          // this.currentConfigName = configName;

          console.log("configData: ", this.configData);
          console.log("tableData: ", this.tableData);
        })
        .catch(err => {
          console.log("错误信息: ", err);
        });
    },

    // 点击左边栏
    clickConfig(index, val) {
      // this.configValue = JSON.parse(val.data).variables;
      this.loadConfig(index, val);
    },

    // 表格增加方法
    handleEdit(index, row) {
      this.tableData.push({
        key: "",
        type: "",
        value: "",
        desc: ""
      });
    },

    // 表格删除方法
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },

    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },

    addConfig() {
      this.addConfigFlag = true;
      console.log("addConfig");
    },

    addConfigSure() {
      console.log("addConfigSure");
    },

    editConfig() {
      console.log("编辑成功");
      editConfigVisible = false;
    },

    deleteConfig() {
      console.log("deleteConfig");
    }
  }
};
</script>

<style lang="less">
.config-container {
  .aside {
    .table-btn {
      .vertical-line {
        height: 1px;
        border-top: 1px solid #dcdfe6;
        text-align: center;
        width: 132px;
        margin-left: 1px;
      }
    }
  }
  .horizontal-line {
    float: left;
    width: 1px;
    height: 460px;
    background: #dcdfe6;
    margin-left: 0px;
  }
}
</style>
