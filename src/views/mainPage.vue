<template>
    <div>
      <el-row>
        <el-col :span="8">
          <el-card class="box-card">
            <div class="user">
              <img src="../assets/ye.jpg">
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
              :data="tableData"
              style="width: 100%">
            <el-table-column
                prop="course"
                label="已购买课程">
            </el-table-column>
            <el-table-column
                prop="name"
                label="教师姓名">
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
 ...mapState(["account","baseUrl"]),
},
    data() {
      return {
        tableData: [{
          course: '计算机系统',
          name: 'A',
          jindu: '30%'
        }, {
            course: '计算机系统二',
          name: 'B',
          jindu: '30%'
        }, {
            course: '计算机系统三',
          name: 'C',
          jindu: '30%'
        }, {
            course: '计算机系统四',
          name: 'D',
          jindu: '30%'
        }],
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
      this.getUserDetail()
    },
    methods:{
      ...mapMutations(["updateRole"]),
      getUserDetail(){
        this.$axios.post(this.baseUrl+"/user/showDetails",{
        account:this.account,
      },{  
    headers: {  
      'Content-Type': 'application/json'  
    }}).then(res=>{this.user=res.data
      this.updateRole(user.role)
    }
    ).catch(error=>{console.error(error);})
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
  