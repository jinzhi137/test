<template>
  <div class="login2">
  <el-container>
    <el-header style="color: white">桥梁监测管理系统</el-header>
    <el-form ref="form" :model="form" :rules="rules" status-icon class="reg_container">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户权限" prop="UserRights">
        <el-input v-model="form.UserRights"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" >
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="form.checkPass" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">注册</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
        <el-button style="margin-left: 130px" @click="backLogin">返回</el-button>
      </el-form-item>
    </el-form>
  </el-container>
  </div>
</template>

<script>
import {getRequest, postJsonRequest} from "@/utils/api";

export default {
  data: function () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.form.checkPass !== '') {
          this.$refs.form.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: '',
        password: '',
        checkPass: '',
        nickname: '',
        UserRights: '',
      },
      rules: {
        username:
            {required: true, message: '请输入用户名', trigger: 'blur'},
        nickname:
            {required: true, message: '请输入昵称', trigger: 'blur'},
        UserRights:
            {required: true, message: '请输入昵称', trigger: 'blur'},
        password: [
          {required: true, validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {required: true, validator: validatePass2, trigger: 'blur'}
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
          getRequest('/user/register', {
            username: this.form.username,
            nickname: this.form.nickname,
            UserRights: this.form.UserRights,
            password: this.form.password
          }).then(resp => {
            console.log(resp)
            this.loading = false
            if (resp.status === 200 && resp.data.status === 0) {
              this.$message({
                type: "success", message: '注册成功！3秒后自动跳转至登录页面', onClose: () => {
                  this.$router.replace('/')
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
            this.$message({type: "error", message: '注册失败！'})
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    backLogin(){
      this.$router.replace({path: '/'})
    }
  }
}
</script>
<style>
.reg_container {
  border: 1px solid #eaeaea;
  border-radius: 15px;
  background: #fff;
  background-clip: padding-box;
  margin: 9px auto;
  width: 350px;
  padding: 30px 35px 10px 35px;
  box-shadow: 0 0 20px #cac6c6;
}
.login2{
  background-image: url('../assets/3.jpeg');
  background-repeat: no-repeat;
  background-size:cover;
}
</style>