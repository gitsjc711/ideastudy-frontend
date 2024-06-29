<template>
    <div>
      <el-row>
        <el-col :span="8">
          <el-card class="box-card">
            <div class="user">
              <img :src="this.user.userAvatarRequestUrl">
              <div class="userInfo">
                <p class="name">{{ user.nickname }}</p>
                <p class="access">{{user.role}}</p>
              </div>
            </div>
            <div class="login-info">
              <p>邮箱<span>{{ user.email }}</span></p>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light"></div></el-col>
      </el-row>
      <el-card style="margin-top: 20px;height: 420px">
          <el-table
              :data="noticeList"
              style="width: 100%">
            <el-table-column
                prop="course"
                label="通知课程">
            </el-table-column>
            <el-table-column
                prop="teacher"
                label="教师">
            </el-table-column>
            <el-table-column
                prop="title"
                label="通知标题">
            </el-table-column>
            <el-table-column
                prop="content"
                label="通知内容">
            </el-table-column>
          </el-table>
        </el-card>
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
        noticeList:[]
      }

    },
    async created(){
      await this.getUserDetail()
      await this.getNoticeList()
    },
    methods: {  
      ...mapMutations(["updateRole","updateUid","updateAccount"]),
      getUserDetail() {
        if(this.getCookie("loginStatus")==="true"){
          this.updateAccount(this.getCookie("username"))
        }
        // 返回一个 Promise  
        return new Promise((resolve, reject) => {  
          this.$axios.post(this.baseUrl + "/user/showDetails", {  
            account: this.account  
          }, {  
          headers: {  
            'Content-Type': 'application/json'  
          }  
          }).then(res => {  
            this.user = res.data;  
            this.updateRole(this.user.role);
            this.updateUid(this.user.id);  
            // 调用 resolve 以解决 Promise  
            resolve(this.user);  
            }).catch(error => {  
              console.error(error);  
              // 调用 reject 以拒绝 Promise  
              reject(error);  
            });  
        });  
      },  
      getNoticeList() {  
        // 返回一个 Promise  
        return new Promise((resolve, reject) => {  
          this.$axios.post(this.baseUrl + "/notice/findNotice", {  
            id: this.uid  
          }, {  
            headers: {  
              'Content-Type': 'application/json'  
           }  
          }).then(res => {  
           this.noticeList = res.data;  
            // 调用 resolve 以解决 Promise  
            resolve(this.noticeList);  
         }).catch(error => {  
            console.error(error);  
            // 调用 reject 以拒绝 Promise  
            reject(error);  
          });  
       });  
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
  .user{
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    img{
      margin-right: 40px;
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
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
      color: #999999;
      span{
        color: #666666;
        margin-left: 60px;
      }
    }
  }
  </style>
  