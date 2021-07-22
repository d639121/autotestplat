<template>
  <div>
    <div>
      <div>
        <span class="summary">数据汇总</span>
      </div>
      <div>
        <el-table stripe style="width: 100%">
          <el-table-column label="测试时间" width="200">
            <template slot-scope="scope">
              <span>{{ scope.row.time.start_at | timestampToTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="持续时间" width="160">
            <span>aa</span>
          </el-table-column>

          <el-table-column label="Total" width="120">
            <span>bbb</span>
          </el-table-column>

          <el-table-column label="Success" width="120">
            <span>ccc</span>
          </el-table-column>

          <el-table-column label="Failed" width="120">
            <span>ddd</span>
          </el-table-column>

          <el-table-column label="Error" width="120">
            <span>eee</span>
          </el-table-column>

          <el-table-column label="Skipped" width="120">
            <span>fff</span>
          </el-table-column>

          <el-table-column label="Platform">
            <span>ggg</span>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <br />
    <br />

    <div>
      <div>
        <span class="case-title">用例名称</span>
      </div>
      <div>
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          :header-cell-style="{ textAlign: 'center', background: '#F8F8FA' }"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column type="expand" fixed>
            hahahah
          </el-table-column>

          <el-table-column label="名 称">
            aaa
          </el-table-column>

          <el-table-column label="请求地址">
            bbb
          </el-table-column>

          <el-table-column label="请求方法">
            ccc
          </el-table-column>

          <el-table-column label="响应时间 (ms)">
            ddd
          </el-table-column>

          <el-table-column label="测试结果">
            eee
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Report",
  props: {},

  components: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
.summary {
  color: #1925d8;
  font-family: "微软雅黑", "宋体", "黑体", Arial;
  font-size: 20px;
  font-weight: bold;
  height: 25px;
  line-height: 25px;
  margin: 18px 0 !important;
  padding: 8px 0 5px 5px;
}
.case-title {
  color: #1925d8;
  font-family: "微软雅黑", "宋体", "黑体", Arial;
  font-size: 16px;
  font-weight: bold;
  height: 25px;
  line-height: 25px;
  margin: 18px 0 20px !important;
  padding: 8px 0 5px 5px;
}
</style>
