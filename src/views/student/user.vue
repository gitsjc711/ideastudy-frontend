<template>
  <div class="container">
    <el-dialog
          title="修改个人信息"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入昵称" style="width: 50%;"></el-input>
          </el-form-item>

          
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" style="width: 50%;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
  </el-dialog>


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
        form:{
        nickname:'',
        email:'',
      },
        dialogVisible: false,
        rules: {
          nickname: [
            {required: true, message: '请输入昵称', trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
          ],
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
     
    },
    submit(){
        this.$refs.form.validate(async (valid)=>{
          if(valid){
            await this.addChapter()
            await this.findChapter()
            console.log(this.form);
            // 关闭弹窗
            this.dialogVisible = false;
            // 表单内容清空
            this.$refs.form.resetFields();
          }
        })
      },
      handleClose(){
        // 弹框关闭前情况数据
        this.$refs.form.resetFields();
        this.dialogVisible = false;
      },
      handleDeleteClose(){
        this.deleteVisible= false
      },
      cancel(){
        this.handleClose();
      },
      handleEdit(row){
        this.modalType = 1;
        this.dialogVisible = true;
        // 注意，需要对数据进行深拷贝
        this.form = JSON.parse(JSON.stringify(row));
      },
      handleSuccess(response, file, fileList) {  
      // 处理上传成功后的逻辑，例如更新 form.image 数组  
      this.form.image.push(file);  
      },  
      changeDetail(){
        this.modalType = 0;
        this.dialogVisible = true;
      }, 
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
    margin-left: 30px;
    margin-top: 10px;
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

.changeButton{
  margin-top: 60px;
  margin-left: 105px
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