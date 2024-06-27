<template>    
    <div class="register-container">    
      <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="120px">    
        <h3 class="register-title">用户注册</h3>  
        <el-form-item label="昵称" prop="nickname">    
          <el-input v-model="registerForm.nickname" placeholder="请输入昵称"></el-input>    
        </el-form-item>   
        <el-form-item label="账户" prop="account">    
          <el-input v-model="registerForm.account" placeholder="请输入账户"></el-input>    
        </el-form-item>    
        <el-form-item label="密码" prop="password">    
          <el-input type="password" v-model="registerForm.password" placeholder="请输入密码"></el-input>    
        </el-form-item>   
        <el-form-item label="邮箱" prop="email">    
          <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>    
        </el-form-item>  
        <el-form-item label="身份" prop="role">   
        <el-select v-model="registerForm.queryType" placeholder="请选择你的身份">  
          <el-option label="教师" value="teacher"></el-option>  
          <el-option label="学生" value="student"></el-option>  
        </el-select> 
        </el-form-item>
        <el-form-item label="验证码" prop="code">    
          <el-input v-model="registerForm.code" placeholder="请输入验证码"></el-input>
          <el-button @click="sendEmail" type="primary" size="mini">发送验证码</el-button>    
        </el-form-item>
        <el-form-item label="头像">
          <input type="file" @change="getFile($event)">  
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
      var validateAccount = (rule, value, callback) => {  
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
        } else if (!re.test(String(value))) {  
          callback(new Error('请输入正确的邮箱地址'));  
        } else {  
          callback();  
        }  
      };  
      return {  
        registerForm: {  
          account: '',  
          password: '',  
          role:'',
          email: '',  
          code:'',
        },  
        avatar:null,
        fileList: [],
        rules: {  
          account: [  
            { validator: validateAccount, trigger: 'blur' }  
          ],  
          password: [  
            { validator: validatePassword, trigger: 'blur' }  
          ],  
          email: [  
            { validator: validateEmail, trigger: 'blur' }  
          ]  
        } ,
        errorCode:"" ,
        passwordLevel:0,
        strengthList:["","弱","中","强"],
        strength:null
      };  
    },  
    methods: {  
      submitForm(formName) {  
        this.$refs[formName].validate((valid) => {  
          if (valid) {  
            alert('提交成功!');  
            var formData = new FormData(); 
            for (let key in this.registerForm) {  
              if (this.registerForm.hasOwnProperty(key)) {  
                formData.append(key, this.registerForm[key]);  
              }  
            } 
            formData.append('role', this.registerForm.queryType); 
            var fileInput = this.avatar;  
            formData.append('avatar', fileInput);  
            if(this.strength==null||this.strength!="强"){
          alert("密码强度不够")
        }
        else{
            this.$axios.post(this.baseUrl + "/register", formData, {  
              headers: {  
                'Content-Type':'multipart/form-data'
              }  
            }).then(res => {  
              this.errorCode = res.data;
              if(this.errorCode==="OK"){

              } else{
                alert(this.errorCode)
              } 
            }).catch(error => {  
              console.error(error);  
            });
          }
          }  
        });

      },
      sendEmail(){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
        if (this.registerForm.email === '') {  
          alert("请输入邮箱地址") 
        } else if (!re.test(String(this.registerForm.email))) {  
          alert('请输入正确的邮箱地址');  
        } else {  
          this.$axios.post(this.baseUrl+"/sendMail",{
            email:this.registerForm.email
           },{  
             headers: {  
                'Content-Type': 'application/json'  
            }}).then(res=>{this.errorCode=res.data
              if(this.errorCode==="OK"){
                alert("发送验证码成功")
            }else{
               alert(this.errorCode)  
              }  
           }
           ).catch(error=>{console.error(error);}) 
        }      
      },
      getFile(event) {
            this.avatar = event.target.files[0];
            console.log(this.avatar);
          },
      passwordStrength(){
        this.passwordLevel=0;
        if(this.registerForm.password.match(/[0-9]/g)){this.passwordLevel++}
        if(this.registerForm.password.match(/[a-z]/g)){this.passwordLevel++}
        if(this.registerForm.password.match(/(.[^a-z0-9])/g)){this.passwordLevel++}
        if(this.registerForm.passwordLevel>3){this.passwordLevel=3}
        if(this.registerForm.password.length<6){this.passwordLevel=0}
        this.strength=this.strengthList[this.passwordLevel]
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
    
     
      
      .avatar-uploader .el-upload {
        border: 1px dashed #525050;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }  
    .el-button--primary {  
        background-color: #409EFF;  
        border-color: #409EFF;  
        width: 100px;   
        margin-top: 20px;   
      }  
    
     
      </style>