<template>
    <div class="manage">
      <el-dialog
          title="添加课程"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
          <el-form-item label="通知标题" prop="name">
            <el-input v-model="form.name" placeholder="请输入通知标题" style="width: 50%;"></el-input>
          </el-form-item>

          
          <el-form-item label="正文" prop="content">
            <el-input  type="textarea"
                       style="width: 50%;"
                       :rows="4" 
                       v-model="form.content" 
                       placeholder="请输入正文">
                    </el-input>
          </el-form-item>
        </el-form>
  
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
      <div class="manage-header">
        <el-button type="primary" v-if="isTeacher" @click="handleAdd">+ 新增通知</el-button>
        

        <div class="course-grid">  
    <h1 style="text-align: center;" >通知列表</h1>  
    <el-table  
      :data="notices"  
      style="width: 100%"  
      stripe  
    >  
    <el-table-column  
      label="课程图片"  
      width="180"  
>  
   <template>  
    <!-- 使用 img 标签来显示图片 -->  
    <img src="../../assets/通知.jpg" :style="{ width: '40px', height: '35px', borderRadius: '10%' }"  alt="课程图片">  
   </template>  
</el-table-column> 
       
      <el-table-column  
        prop="title"  
        label="通知主题"  
        width="300"  
      ></el-table-column>  
      <el-table-column  
        prop="content"  
        label="通知描述"  
        width="700"  
      ></el-table-column>  
      <el-table-column   
        label="删除"  
        width="100"  
      ><template slot-scope="scope">
        <el-button type="text" @click="handleDeleteNotice(scope.row.id)">删除</el-button>
      </template></el-table-column>  
    </el-table>  

  </div> 

      </div>
    </div>
  </template>
  <script>

import { mapState} from 'vuex';
  export default {
    name: "Home",
    computed:{
 ...mapState(["account","baseUrl","uid","courseId","isTeacher"]),
},
    data(){
      return{
        dialogVisible: false,
        form:{
          name:'',
          content:'',
          
         // image:[]
             },

        rules: {
          name: [
            {required: true, message: '请输入通知标题', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入通知正文', trigger: 'blur'},
          ],
         
        },
        tableData: [],
        modalType: 0,// 0表示新增的弹框，1表示编辑的弹框

        notices:[]
      }
    },
    created(){
      this.findNotices()
    },
    methods: {
      // 用户提交表单
      submit(){
        this.$refs.form.validate(async(valid)=>{
          if(valid){
            await this.addNotice()
            await this.findNotices()
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
      beforeUpload(file) {  
      const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png';  
      const isLt100M = file.size / 1024 / 1024 < 100;  
  
      if (!isJPGorPNG) {  
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');  
        return false;  
      }  
      if (!isLt100M) {  
        this.$message.error('上传头像图片大小不能超过 100MB!');  
        return false;  
      }  
      return true;  
      }  ,
      // 获取列表
      handleAdd(){
      this.modalType = 0;
      this.dialogVisible = true;
      },
      findNotices(){
        return new Promise((resolve, reject) => {
        this.$axios.post(this.baseUrl+"/notice/findNoticeByCourse",{
                id:this.courseId
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.notices=res.data
                  resolve(this.notices)
                }
            ).catch(error=>{console.error(error);
              reject(error)
            })
        })
      },
      addNotice(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/notice/add",{
                courseId:this.courseId,
                teacherId:this.uid,
                title:this.form.name,
                content:this.form.content
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.errorCode=res.data
                    resolve(this.errorCode)

                }
            ).catch(
                error=>{console.error(error);
                reject(error)
            })
            })
      },
      deleteNotice(id){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/notice/delete",{
                id:id
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.errorCode=res.data
                    resolve(this.errorCode)
                }
            ).catch(
                error=>{console.error(error);
                reject(error)
            })
            })
      },
      async handleDeleteNotice(id){
        
        await this.deleteNotice(id)
        await this.findNotices()
      }

    },
    
 }
  
  </script>
  
  <style scoped>  

  .course-grid {  
    display: flex;  
    flex-direction: column;  
    align-items: center;  
  }  
    
  .grid-container {  
    display: grid;  
    grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));  
    grid-gap: 20px; /* 控制卡片之间的间隔 */  
    max-width: 100%; /* 限制最大宽度，防止卡片过大 */  
    justify-content: center; /* 水平居中 */  
  }  
    
      
    .box-card {  
      border: 0;  
      box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);  
      background-color: rgba(255, 255, 255, 1);
      height: auto;  
    }  
      
    .product-image {  
      width: 110px;  
      height: 110px;  
      display: block;  
      margin-bottom: 10px;  
    }  
      
    .text {  
      padding: 3px;  
    }  
    </style>
  