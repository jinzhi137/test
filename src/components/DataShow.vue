<template>
  <el-container class="dataShow_container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="全部数据" name="allData">
        <all-data></all-data>
      </el-tab-pane>
      <el-tab-pane label="搜索数据" name="second">
        <select-data></select-data>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import {getRequest} from "@/utils/api";
import SensorAllData from "@/components/SensorAllData";
import SensorSelect from "@/components/SensorSelect";
export default {
  data() {
    return {
      activeName: 'allData'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  components: {
    'allData': SensorAllData,
    'selectData': SensorSelect
  }
}
</script>

<style>
.dataShow_container {
  height: 500px;
  width: 100%;
}
</style>