<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" size="mini">
      <el-table-column label="参数名" width="200">
        <template slot-scope="scope">
          <el-autocomplete
            class="inline-input"
            v-model="scope.row.key"
            :fetch-suggestions="querySearch"
            clearable
            size="mini"
          ></el-autocomplete>
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
  name: "RequestHeader",
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
    },

    // 输入框中查询的方法
    querySearch(queryString, cb) {
      let headerOptions = this.headerOptions;
      let results = queryString
        ? headerOptions.filter(this.createFilter(queryString))
        : headerOptions;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilter(queryString) {
      return headerOptions => {
        return (
          headerOptions.value
            .toLowerCase()
            .indexOf(queryString.toLowerCase()) === 0
        );
      };
    }
  },
  data() {
    return {
      tableData: [{ key: "", value: "", desc: "" }],
      currentRow: "",
      headerOptions: [
        {
          value: "Accept"
        },
        {
          value: "Accept-Charset"
        },
        {
          value: "Accept-Language"
        },
        {
          value: "Accept-Datetime"
        },
        {
          value: "Authorization"
        },
        {
          value: "Cache-Control"
        },
        {
          value: "Connection"
        },
        {
          value: "Cookie"
        },
        {
          value: "Content-Length"
        },
        {
          value: "Content-MD5"
        },
        {
          value: "Content-Type"
        },
        {
          value: "Expect"
        },
        {
          value: "Date"
        },
        {
          value: "From"
        },
        {
          value: "Host"
        },
        {
          value: "If-Match"
        },
        {
          value: "If-Modified-Since"
        },
        {
          value: "If-None-Match"
        },
        {
          value: "If-Range"
        },
        {
          value: "If-Unmodified-Since"
        },
        {
          value: "Max-Forwards"
        },
        {
          value: "Origin"
        },
        {
          value: "Pragma"
        },
        {
          value: "Proxy-Authorization"
        },
        {
          value: "Range"
        },
        {
          value: "Referer"
        },
        {
          value: "TE"
        },
        {
          value: "User-Agent"
        },
        {
          value: "Upgrade"
        },
        {
          value: "Via"
        },
        {
          value: "Warning"
        }
      ]
    };
  }
};
</script>

<style lang="less"></style>
