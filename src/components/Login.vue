<template>
<div class="login1"> 
  <!-- <img src="../assets/1.jpg" width="100%" height="100%" alt="" /> -->
  <el-container>
    <el-header style="color: white">桥梁监测管理系统</el-header>
    <el-form ref="form" :model="form" :rules="rules" class="login_container">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click.native.prevent="submitForm('form')">登录</el-button>
        <el-button @click.native.prevent="regClick">注册</el-button>
      </el-form-item>
    </el-form>
  </el-container>
  </div>
</template>


<script>
import {getRequest} from "@/utils/api";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else if(value.length < 3){
        callback(new Error('长度在 3 到 15 个字符'));
      } else {
        callback();
      }
    };
    var validateUserName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else if(value.length < 3){
        callback(new Error('长度在 3 到 15 个字符'));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: '',
        password: '',
      },
      rules: {
        username:[
          { required: true, validator: validateUserName, trigger: 'blur'},
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    submitForm: function (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          getRequest('/user/login', {
            username: this.form.username,
            password: this.form.password
          }).then(resp => {
            console.log(resp)
            this.loading = false
            if (resp.status === 200 && resp.data.status === 0) {
              this.$message({
                type: "success", message: '登录成功！3秒后自动跳转至主界面', onClose: () => {
                  this.$router.replace('/menu')
                }
              })
            }
            else {
              this.$message({
                type: "error", message: resp.data.msg
              })
            }
          }).catch(resp => {
            this.loading = false
            this.$message({type: "error", message: '用户名或密码错误！'})
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    regClick() {
      this.$router.replace({path: '/reg'})
    }
  }
}
</script>
<style>
.login_container {
  border: 1px solid #eaeaea;
  border-radius: 15px;
  background: #fff;
  background-clip: padding-box;
  margin: 150px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cac6c6;
}
.login1{
  background-image: url('../assets/3.jpeg');
  background-repeat: no-repeat;
  background-size:cover;
}
</style>