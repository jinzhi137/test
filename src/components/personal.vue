<template>
    <div>
      <el-row :gutter="20" style="margin-top:10px;">
        <el-col :span="8">
            <div class="grid-content bg-purple">
                 <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>个人中心</span>
        </div>
          <div class="name-role">
          <span class="sender">111 - {{dataForm.nickName}}</span>  
        </div>
        <div class="registe-info">
          <span class="registe-info">
            注册时间：2020/4/10 9:40:33
          </span>
        </div>
        <el-divider></el-divider>
        <div class="personal-relation">
        <div class="relation-item">手机号:  <div style="float: right; padding-right:20px;">{{dataForm.phone}}</div></div>
    </div>
    <div class="personal-relation">
      <div class="relation-item">所属企业:  <div style="float: right; padding-right:20px;">hhhh大学</div></div> 
    </div>
       <div class="personal-relation">
      <div class="relation-item">首页链接:  <div style="float: right; padding-right:20px;">{{dataForm.homeUrl}}</div></div>      
    </div>
      </el-card>
        </div>
        </el-col>
    <el-col :span="16">
        <div class="grid-content bg-purple">
       <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本资料</span>
        </div>
        <div>
          <el-form label-width="80px" v-model="dataFrom" size="small" label-position="right">
          <el-form-item label="用户昵称" prop="nickName">
          <el-input  auto-complete="off" v-model="dataForm.nickName" :disabled="dataForm.edit"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input auto-complete="off" v-model="dataForm.phone" :disabled="dataForm.edit"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input auto-complete="off" v-model="dataForm.password" type="password" :disabled="dataForm.pwdedit"></el-input>
        </el-form-item>
          <el-form-item label="首页链接" prop="homeUrl">
          <el-input  maxlength="18" v-model="dataForm.homeUrl" :disabled="dataForm.edit"></el-input>
        </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="change">修改个人信息</el-button>
          <el-button size="mini" @click="changepwd">修改密码</el-button>
          <el-button size="mini" @click="close"  >完成</el-button>
        </div>
        </div>
      </el-card>
        </div>
        </el-col>

      </el-row>
    </div>
</template>

<script>
export default {
  data(){
    return{
        value:'',
      dataForm:{
        nickName: 'nb',
        phone: '13812345678',
        homeUrl: 'http://www.baidu.com',
        password:'123456',
        pwdedit:true,
        edit:true
      }
    }
  },
  methods:{
      change(){
          this.dataForm.edit=false;
      },
      close(){
          this.dataForm.edit=true;
          this.dataForm.pwdedit=true;
      },
      changepwd(){
          var _this=this
          this.$prompt('请输入原密码', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            }).then(({ value }) => {
                if(value==_this.dataForm.password)
                {
                    _this.dataForm.pwdedit=false;
                    this.$message({
                        type: 'sucess',
                            message: '密码正确，你现在可以修改密码'
                    }); 
                }
                else
                {
                    this.$message({
                        type: 'info',
                            message: '密码错误'
                    });
                }
            })
      }
      
  }
}
</script>

<style  >

 .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

  .name-role {
    font-size: 16px;
    padding: 5px;
   text-align:center;
  }
   .sender{
      text-align:center;
    }
.registe-info{
  text-align: center;
  padding-top:10px;
}
.personal-relation {
  font-size: 16px;
  padding: 0px 5px 15px;
  margin-right: 1px;
    width: 100%
}

.relation-item {
  padding: 12px;
   
}
.dialog-footer{
  padding-top:10px ;
  padding-left: 10%;
}

   .el-row {
    margin-bottom: 20px;
    
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>