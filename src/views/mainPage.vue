<template>
    <div>
      <el-row>
        <el-col :span="8">
          <el-card class="box-card">
            <div class="user">
              <img src="../assets/ye.jpg">
              <div class="userInfo">
                <p class="name">第一组</p>
                <p class="access">学生</p>
              </div>
            </div>
            <div class="login-info">
              <p>学校<span>重庆邮电大学</span></p>
              <p>专业<span>软件工程</span></p>
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
            <el-table-column
                prop="jindu"
                label="学习进度">
            </el-table-column>
          </el-table>
        </el-card>
    </div>
  </template>
  
  <script>
  export default {
    name: "HomeIfo",
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
        }]
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
  