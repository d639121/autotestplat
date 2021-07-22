<template>
  <div>
    <div>
      <el-input
        v-model="addForm.name"
        placeholder="名称尽量保持其唯一性，方便识别"
        size="small"
      >
        <template slot="prepend">用例名称</template>
      </el-input>
      <br />
      <br />

      <el-input
        v-model="addForm.name"
        placeholder="请输入用例描述信息"
        size="small"
      >
        <template slot="prepend">用例描述</template>
      </el-input>
      <br />
      <br />
    </div>
    <el-form :inline="true" :model="addForm" class="form-inline">
      <el-form-item label="用例类型">
        <el-select v-model="caseTypeValue" placeholder="请选择" size="small">
          <el-option
            v-for="item in caseType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用例环境">
        <el-select v-model="env" placeholder="请选择" size="small">
          <el-option
            v-for="item in caseType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <br />
      <el-input
        v-model="addForm.name"
        placeholder="请输入用例描述信息"
        size="small"
      >
        <template slot="prepend">用例标签</template>
      </el-input>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddForm",
  props: {},
  components: {},
  data() {
    return {
      // 添加表单
      addForm: {},
      caseTypeValue: "",
      env: "",
      caseType: [
        { label: "冒烟测试", value: "0" },
        { label: "系统测试", value: "1" },
        { label: "集成测试", value: "2" },
        { label: "回归测试", value: "3" }
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

<style lang="less"></style>
