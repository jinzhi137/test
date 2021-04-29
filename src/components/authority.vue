<template>
  <el-table
    :data="tableData"
    style="width: 100% "
    max-height="500">
    <el-table-column
      prop="username"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码">
    </el-table-column>
    <el-table-column
      prop="userRights"
      label="用户权限">
    </el-table-column>
    <el-table-column
      prop="nickname"
      label="昵称">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    methods: {
      deleteRow(index, rows) {
        if(index==3)
            alert("不能删除自己")
        else
            rows.splice(index, 1);
      },

    },
    created(){
        var _this=this
        this.$axios({
        url:'http://121.196.98.32:8080/api/user/allUser?page=1&size=100',
        methods:'get',
        data:{},
        }).then(res=>{
            _this.tableData=res.data.data
            _this.tableData[3]={
            nickname: "nb",
            password: "123456",
            userRights: "管理员",
            username: "111"
        }
            console.log(_this.tableData)
        })

    },
    data() {
      return {
        tableData: [{
            nickname: "",
            password: "",
            userRights: "",
            username: ""
        }]
      }
    }
  }
</script>