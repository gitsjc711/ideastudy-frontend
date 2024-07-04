<template>
  <div class="container">
    <el-dialog
          title="修改个人信息"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :model="form" label-width="80px">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入昵称" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email" placeholder="请输入邮箱" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="form.code" placeholder="请输入验证码" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendEmail">发送验证码</el-button>
          </el-form-item>
          <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            auto-upload="true"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
import { mapState,mapGetters} from 'vuex';
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
          role:"",
          code:''
        },
        form:{
        nickname:'',
        email:'',
        password:""
      },
      dialogVisible: false,
      uploadUrl:this.getBaseurl()+"/file/upload",
      url:"" ,
      imageUrl:""
       
    }

  },

  created(){
    this.getUserDetail()
  },
  methods:{
    ...mapGetters(["getBaseurl"]),
    getUserDetail(){
      return new Promise((resolve, reject) => {
        this.$axios.post(this.baseUrl+"/user/showDetails",{
          account:this.account,
        },{  
          headers: {  
            'Content-Type': 'application/json'  
          }}).then(
            res=>{this.user=res.data
              resolve(this.user)
        }
      ).catch(error=>{console.error(error);
        reject(error)
      })
      })
    },
    
    updateDetail(){
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
        if (this.form.email != ''&&(!re.test(String(this.form.email)))) {  
          alert('请输入正确的邮箱地址');
        } else {return new Promise((resolve, reject) => {
        this.$axios.post(this.baseUrl+"/user/update",{
          id:this.uid,
          password:this.form.password,
          nickname:this.form.nickname,
          email:this.form.email,
          code:this.form.code,
          avatar:this.url
        },{  
          headers: {  
            'Content-Type': 'application/json'  
          }}).then(
            res=>{this.errorCode=res.data
              if(this.errorCode==="OK"){
                alert("修改成功")
              }else{
                alert(this.errorCode)
              }
              resolve(this.errorCode)
        }
      ).catch(error=>{console.error(error);
        reject(error)
      })
      })}
    },
    submit(){
        this.$refs.form.validate(async (valid)=>{
          if(valid){
            await this.updateDetail()
            await this.getUserDetail()
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
      sendEmail(){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;  
        if (this.form.email === '') {  
          alert("请输入邮箱地址") 
        } else if (!re.test(String(this.form.email))) {  
          alert('请输入正确的邮箱地址');  
        } else {  
          this.$axios.post(this.baseUrl+"/sendMail",{
            email:this.form.email
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
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        this.url=res
        alert("上传头像成功")
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
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
    margin-left: 25px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 250px;
    height: 250px;
    border-radius: 50%;
  }
.user{
  padding-bottom: 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  .userInfo{
    .name{
      font-size: 50px;
      margin-bottom: 1px;
      font-family: fly;
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
</style>