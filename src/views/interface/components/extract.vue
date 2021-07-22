<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column label="出参名" width="200">
        <template slot-scope="scope">
          <el-input clearable v-model="scope.row.key" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="表达式" width="200">
        <template slot-scope="scope">
          <el-input clearable v-model="scope.row.value" size="mini"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="230">
        <template slot-scope="scope">
          <el-input clearable v-model="scope.row.desc" size="mini"></el-input>
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
</template>

<script>
export default {
  name: "ResponseExtract",
  props: {},
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleEdit(index, row) {
      this.tableData.push({
        key: "",
        value: "",
        desc: ""
      });
    },

    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    }
  },
  data() {
    return {
      tableData: [{ key: "", value: "", desc: "" }],
      currentRow: ""
    };
  }
};
</script>

<style lang="less"></style>
