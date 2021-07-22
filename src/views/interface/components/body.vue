<template>
  <div>
    <!-- // 数据类型 -->
    <div class="radio" style="margin-left:200px">
      <el-radio-group v-model="contentType" size="mini">
        <el-radio label="params" border>params</el-radio>
        <el-radio label="form-data" border>form-data</el-radio>
        <el-radio label="json" border>json</el-radio>
      </el-radio-group>
    </div>
    <br />

    <!-- // 表单数据 -->
    <el-table
      :data="contentType === 'form-data' ? formData : paramsData"
      border
      style="width: 100%"
      size="mini"
      v-show="contentType !== 'json'"
    >
      <el-table-column label="参数名" width="200">
        <template slot-scope="scope">
          <el-input clearable v-model="scope.row.key" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="值" width="200">
        <template slot-scope="scope">
          <el-input clearable v-model="scope.row.value" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="230">
        <template slot-scope="scope">
          <el-input clearable v-model="scope.row.desc" size="mini"></el-input>
        </template>
      </el-table-column>

      <!-- // 操作按钮 -->
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

    <!-- // json表单 -->
    <div>
      <vue-json-editor
        v-show="contentType === 'json'"
        v-model="jsonData"
        :mode="'code'"
        lang="zh"
        @json-change="onJsonChange"
        @json-save="onJsonSave"
        @has-error="onError"
      >
      </vue-json-editor>
    </div>
  </div>
</template>

<script>
import vueJsonEditor from "vue-json-editor";

export default {
  name: "RequestBody",
  props: {},
  components: {
    vueJsonEditor
  },
  data() {
    return {
      // content-type数据传参类型
      contentType: "params",
      // params数据
      paramsData: [{ key: "", value: "", desc: "" }],
      // form-data数据
      formData: [{ key: "", value: "", desc: "" }],

      // json数据
      jsonData: ""
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleEdit(index, row) {
      const data =
        this.contentType === "form-data" ? this.formData : this.paramsData;
      data.push({
        key: "",
        value: "",
        desc: ""
      });
      console.log(this.contentType);
    },

    handleDelete(index, row) {
      const data =
        this.contentType === "data" ? this.formData : this.paramsData;
      data.splice(index, 1);
    },

    onJsonChange(value) {
      console.log("value:", value);
    },
    onJsonSave(value) {
      console.log("value:", value);
    },
    onError(value) {
      console.log("value:", value);
    }
  }
};
</script>

<style lang="less"></style>
