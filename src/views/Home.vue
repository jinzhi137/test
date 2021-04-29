<template>
  <el-container>
    <el-header>
        <span style="color: white">桥梁监测管理系统</span>
    </el-header>
    <el-container style="height: 586px">
      <el-aside width="200px" style="background-color: rgb(238,241,246)">
        <el-menu router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>桥梁管理</template>
            <el-menu-item index="/menu/bridgeInf">桥梁信息</el-menu-item>
            <el-menu-item index="/menu/showbridge">桥梁展示</el-menu-item>
          </el-submenu>
          <el-submenu index="2" >
            <template slot="title"><i class="el-icon-s-data"></i>监测数据</template>
            <el-menu-item index="/menu/dataShow">数据展示</el-menu-item>
            <!-- <el-menu-item index="/dataAnalysis">数据分析</el-menu-item> -->
            <el-menu-item index="/menu/dataPrediction">数据预测</el-menu-item>
            <el-menu-item index="/menu/dataEntry">数据录入</el-menu-item>
            <!-- <el-menu-item index="/dataProcess">数据处理</el-menu-item>
            <el-menu-item index="/">融合分析</el-menu-item> -->
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>用户管理</template>
            <el-menu-item index="/menu/personal">个人中心</el-menu-item>
            <el-menu-item index="/menu/authority">用户管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer class="el-footer"></el-footer>
  </el-container>
</template>
<style>
.el-header {
  background-color: #143F93;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.head {
  text-align: right;
  font-size: 12px;
}
.el-footer {
  color: #143F93;
  background-color :#143F93;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: '2021-05-02',
      name: '王小虎',
      address: '宁波大学'
    };
    return {
      tableData: Array(20).fill(item)
    }
  }
};
</script>