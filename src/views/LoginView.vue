<template>
  <div id="building">
  <el-form label-width="70" class="login-container" ref="form" :model="form" :rules="rules">
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="账号" prop="username">
      <el-input v-model="form.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" style="margin-left: 105px;margin-top: 10px" @click="login">登录</el-button>
      <el-button type="text" class="register-button" style="margin-left: 30px;" @click="register">注册</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { mapState,mapMutations} from 'vuex';
export default {
  computed:{
    ...mapState(["baseUrl"])
  },
data(){
  return{
    form:{
      username:'',
      password:''
    },
    rules:{
      username:[ { required: true, message: '请输入账号', trigger: 'blur' } ],
      password:[ { required: true, message: '请输入密码', trigger: 'blur' }]
    },
    code:"",
    user:{
          id:null,
          status:null,
          account:this.account,
          nickname:"",
          email:"",
          role:""
        }
  }
},
created(){
  this.cookieLogin();
},
methods:{
  
  ...mapMutations(["updateAccount","updateRole","updateUid"]),
  login(){
    this.$axios.post(this.baseUrl+"/login",{
      account:this.form.username,
      password:this.form.password
    },{  
    headers: {  
      'Content-Type': 'application/json'  
    }}).then(res=>{this.code=res.data
      if(this.code==="OK"){
        this.updateAccount(this.form.username)
        document.cookie=`loginStatus=true,username=${this.form.username}`
        this.$router.push('/mainPage');  
      }else{
        alert('登录失败');  
      }
    }
    ).catch(error=>{console.error(error);})
  
    

  },
  register() {  
      this.$router.push('/register'); 
  },
  cookieLogin(){
    if(this.getCookie("loginStatus")==="true"){
      this.updateAccount(this.getCookie("username"))
      this.$router.push('/mainPage')
    }

  },
  getCookie(cookiename){
    const cookies = document.cookie.split(",")
    for(let i=0;i<cookies.length;i++){
        const cookie = cookies[i].split('=');
        if(cookie[0]==cookiename) return cookie[1];
    }
    return "";
 }
}
}
</script>

<style lang="less" scoped>
.login-container{
width: 350px;
border: 1px solid #eaeaea;
margin: 180px auto;
padding: 35px 35px 15px 35px;
background-color: #ffffff;
border-radius: 15px;
box-shadow: 0 0 25px #cac6c6;
box-sizing: border-box;
.login_title{
  text-align: center;
  margin-bottom: 40px;
  color: #505458;
}
.el-input{
  width: 198px;
}
.register-button {  
  color: gray !important;   
  border: 1px solid transparent; 
  background-color: transparent;  
} 
}
#building{
  background:url("../assets/background.jpg");
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>
