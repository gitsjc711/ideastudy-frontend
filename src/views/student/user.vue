<template>
  <div class="container">
    <el-row>
       
      <img :src="this.user.userAvatarRequestUrl"> 
          <div class="user">
            <div class="userInfo">
              <p class="name">昵称: <span>{{ user.nickname }}</span></p>
              
            </div>
          </div>
          <div class="login-info">  
            <p class="access">身份<span>{{user.role}}</span></p>
            <p>邮箱<span>{{ user.email }}</span></p>
          </div>
          <el-button  type="primary" class="changeButton" @click="changeDetail">修改</el-button>
    </el-row>
   
  </div>
  </template>

<script>
import { mapState,mapMutations} from 'vuex';
export default {
  name: "HomeIfo",
  computed:{
...mapState(["account","baseUrl","uid"]),
},
  data() {
    return {
      user:{
          id:null,
          status:null,
          account:this.account,
          nickname:"",
          email:"",
          role:""
        },
    }

  },
  created(){
    this.getUserDetail()
  },
  methods:{
    ...mapMutations(["updateRole","updateUid"]),
    getUserDetail(){
      this.$axios.post(this.baseUrl+"/user/showDetails",{
      account:this.account,
      },{  
      headers: {  
        'Content-Type': 'application/json'  
      }}).then(
        res=>{this.user=res.data
        this.updateRole(this.user.role)
        this.updateUid(this.user.id)
      }
      ).catch(error=>{console.error(error);})
    },
    changeDetail(){

    }
  }
}
</script>

<style lang="less" scoped>
.container {  
  display: flex;  
  margin-left: auto;  
  margin-right: auto;
  width:70%;
  background-color: rgba(255, 255, 255, 0.5);
  justify-content: center; /* 使内容水平居中 */  
  height: 100vh; /* 如果需要的话，设置容器高度为视口高度 */  
} 
.box-card {  
  border: none;
  width:100%;
  background-color: rgba(255, 255, 255, 0.5); /* 白色背景，50%透明度 */  
  } 

img{
    margin-right: 40px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
.user{
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  .userInfo{
    .name{
      font-size: 32px;
      margin-bottom: 10px;
    }
    .access{
      color: #999999;
    }
  }
}

.login-info{
  p{
    line-height: 28px;
    font-size: 14px;
    color: #665d5d;
    span{
      color: #666666;
      margin-left: 60px;
    }
  }
}
</style>