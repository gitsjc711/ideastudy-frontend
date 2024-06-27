<template>    
    <div class="register-container">    
      <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="120px">    
        <h3 class="register-title">用户注册</h3>  
        <el-form-item label="用户名" prop="username">    
          <el-input v-model="registerForm.username" placeholder="请输入用户名"></el-input>    
        </el-form-item>    
        <el-form-item label="密码" prop="password">    
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>    
        </el-form-item>    
        <el-form-item label="邮箱" prop="email">    
          <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>    
        </el-form-item>  
        <el-form-item label="验证码" >
            <button @click="sendEmail">发送验证码</button>
        </el-form-item>  
        <el-form-item>    
          <el-button  type="primary" @click="submitForm('registerForm')">注册</el-button>    
        </el-form-item>    
      </el-form>    
    </div>    
  </template>

  <script>  
  import qs from "qs"
  import { mapState} from 'vuex';
  export default {  
    computed:{
    ...mapState(["baseUrl"])
    },
    data() {  
      var validateUsername = (rule, value, callback) => {  
        if (value === '') {  
          callback(new Error('请输入用户名'));  
        } else {  
          callback();  
        }  
      };  
      var validatePassword = (rule, value, callback) => {  
        if (value === '') {  
          callback(new Error('请输入密码'));  
        } else {  
          if (this.registerForm.checkPass !== '') {  
            this.$refs.registerForm.validateField('checkPass');  
          }  
          callback();  
        }  
      };  
      var validateEmail = (rule, value, callback) => {  
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
        if (value === '') {  
          callback(new Error('请输入邮箱地址'));  
        } else if (!re.test(String(value).toLowerCase())) {  
          callback(new Error('请输入正确的邮箱地址'));  
        } else {  
          callback();  
        }  
      };  
      return {  
        registerForm: {  
          username: '',  
          password: '',  
          email: '',    
        },  
        rules: {  
          username: [  
            { validator: validateUsername, trigger: 'blur' }  
          ],  
          password: [  
            { validator: validatePassword, trigger: 'blur' }  
          ],  
          email: [  
            { validator: validateEmail, trigger: 'blur' }  
          ]  
        } ,
        code:"" 
      };  
    },  
    methods: {  
      submitForm(formName) {  
        this.$refs[formName].validate((valid) => {  
          if (valid) {  
            alert('提交成功!');  
            var formBody=qs.stringify(this.registerForm);
            this.$axios.post(this.baseUrl+"/register",formBody,{
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
              }
            }).then(res=>{
              this.code=res.data
            })
          } else {  
            console.log('error submit!!');  
            return false;  
          }  
        });  
      },
      sendEmail(){
        this.$axios.post(this.baseUrl+"/sendMail",{
          email:this.registerForm.email
        },{  
          headers: {  
            'Content-Type': 'application/json'  
        }}).then(res=>{this.code=res.data
          if(this.code==="OK"){
            alert("发送验证码成功")
         }else{
            alert(this.code)  
          }  
        }
        ).catch(error=>{console.error(error);})
      }
    }  
  };  
  </script>  
    
 <style lang="less" scoped>  
.register-container {  
  width: 350px;  
  border: 1px solid #eaeaea;  
  margin: 180px auto;  
  padding: 35px 35px 35px 15px;  
  background-color: #ffffff;  
  border-radius: 15px;  
  box-shadow: 0 0 25px #cac6c6;  
  box-sizing: border-box;  
  
  .register-title {  
    text-align: center;  
    margin-bottom: 40px;  
    color: #505458;  
  }  
  
  .el-form-item__label {  
    color: #909399;  
  }  
  
  .el-input__inner {  
    width: 100%;  
    border-radius: 4px;  
    border: 1px solid #dcdfe6;  
    background-color: #fff;  
    color: #606266;  
    padding: 0 15px;  
    height: 40px;  
    line-height: 40px;  
  }  
}  
.el-button--primary {  
    background-color: #409EFF;  
    border-color: #409EFF;  
    width: 100px;   
    margin-top: 20px;   
  }  
  </style>