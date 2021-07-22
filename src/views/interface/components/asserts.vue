<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column label="表达式" width="200">
        <template slot-scope="scope">
          <el-input
            clearable
            v-model="scope.row.expression"
            size="mini"
            placeholder="data.list.id"
          ></el-input>
        </template>
      </el-table-column>

      <el-table-column label="断言方式" width="180">
        <template slot-scope="scope">
          <el-autocomplete
            class="inline-input"
            v-model="scope.row.comparator"
            :fetch-suggestions="querySearch"
            clearable
            size="mini"
          ></el-autocomplete>
        </template>
      </el-table-column>

      <el-table-column label="预期类型" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.type" size="mini">
            <el-option
              v-for="item in dataTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              size="mini"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>

      <el-table-column label="预期结果" width="180">
        <template slot-scope="scope">
          <el-input clearable v-model="scope.row.expect" size="mini"></el-input>
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
  name: "ResponseAsserts",
  props: {},
  components: {},
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleEdit(index, row) {
      this.tableData.push({
        expression: "",
        comparator: "",
        type: "",
        expect: ""
      });
    },

    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },

    // 输入框中查询的方法
    querySearch(queryString, cb) {
      let assertType = this.assertType;
      let results = queryString
        ? assertType.filter(this.createFilter(queryString))
        : assertType;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilter(queryString) {
      return assertType => {
        return (
          assertType.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    }
  },
  data() {
    return {
      tableData: [
        { expression: "", comparator: "equals", type: 1, expect: "" }
      ],
      currentRow: "",
      dataTypeOptions: [
        {
          label: "String",
          value: 1
        },
        {
          label: "Integer",
          value: 2
        },
        {
          label: "Float",
          value: 3
        },
        {
          label: "Boolean",
          value: 4
        },
        {
          label: "List",
          value: 5
        },
        {
          label: "Dict",
          value: 6
        }
      ],
      assertType: [
        {
          value: "equals"
        },
        {
          value: "less_than"
        },
        {
          value: "less_than_or_equals"
        },
        {
          value: "greater_than"
        },
        {
          value: "greater_than_or_equals"
        },
        {
          value: "not_equals"
        },
        {
          value: "string_equals"
        },
        {
          value: "length_equals"
        },
        {
          value: "length_greater_than"
        },
        {
          value: "length_greater_than_or_equals"
        },
        {
          value: "length_less_than"
        },
        {
          value: "length_less_than_or_equals"
        },
        {
          value: "contains"
        },
        {
          value: "contained_by"
        },
        {
          value: "type_match"
        },
        {
          value: "regex_match"
        },
        {
          value: "startswith"
        },
        {
          value: "endswith"
        }
      ]
    };
  }
};
</script>

<style lang="less"></style>
