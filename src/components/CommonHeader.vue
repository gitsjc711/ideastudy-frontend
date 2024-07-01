<template>
    <div class="header-container">
      <div class="l-content">
        <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
        <span class="text">首页</span>
      </div>
      <div class="r-content">
        <el-dropdown  @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="user" src="../assets/logo.png"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="handleGoToMainpage">主页</el-dropdown-item>
            <el-dropdown-item command="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </template>
  
  <script>
export default {
  data() {
    return {};
  },
  methods: {
    handleMenu(){
      this.$store.commit('collapseMenu')
    },
    handleCommand(command){
    if(command==="handleLogout"){
      console.log("退出")
      this.delCookie("loginStatus")
      this.$router.push('/')
    }
    if(command==="handleGoToMainpage"){
      console.log("个人主页")
      this.$router.push("/")
    }
  },
    handleLogout(){
      this.delCookie("loginStatus")
      this.$router.push('/')
    },
    handleGoToMainpage(){
      this.$router.push("/")
    },
    delCookie (name) {
	    var exp = new Date();
	    exp.setTime(exp.getTime() - 1);
	    var cval =this.getCookie(name);
	    if (cval&& typeof cval === 'string' && cval.length > 0){
	 	    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+ ";path=/";
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
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scoped>
  .header-container {
    padding: 0 20px;
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  
    .text {
      color: white;
      font-size: 14px;
      margin-left: 10px;
    }
  
    .r-content{
      .user{
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
  </style>
  
  