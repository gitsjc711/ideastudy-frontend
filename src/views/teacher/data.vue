<template>
    <div class="manage">
      <el-dialog
          title="添加课程"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
          <el-upload  
                       class="upload-demo"  
                       drag  
                       action="YOUR_ACTUAL_UPLOAD_URL" 
                       :on-success="handleSuccess"  
                       :before-upload="beforeUpload"  
                        multiple>            
                        <i class="el-icon-upload"></i>  
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>  
            </el-upload> 
        </el-form>
  
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
      <div class="manage-header">
        <el-button type="primary" v-if="isTeacher" @click="handleAdd">+ 添加资料</el-button>
        

        <div class="course-grid">  
    <h1 style="text-align: center;" >资源列表</h1>  
    <el-table  
      :data="data"  
      style="width: 100%"  
      stripe  
    >  
    <el-table-column  
      label="全部文件"  
      width="180"  
>  
   <template slot-scope="scope">  
    <!-- 使用 img 标签来显示图片 -->  
    <img src="../../assets/资料.jpg" :style="{ width: '40px', height: '35px', borderRadius: '10%' }"  alt="课程图片">  
   </template>  
</el-table-column> 
       
      <el-table-column  
        prop="label"  
        flex="1"  
      ></el-table-column>  
      <el-table-column  
        prop="url"  
        flex="1"  
      ></el-table-column>   
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
          describe:'',
          
         // image:[]
             },

        rules: {
          name: [
            {required: true, message: '请输入课程名', trigger: 'blur'},
          ],
          describe: [
            {required: true, message: '请输入课程描述', trigger: 'blur'},
          ],
          category: [
            {required: true, message: '请输入课程目录', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请输入课程价格', trigger: 'blur'},
          ],
        },
        tableData: [],
        modalType: 0,// 0表示新增的弹框，1表示编辑的弹框

        data: []
      }
    },
    created(){
      this.findResource()
    },
    methods: {
      // 用户提交表单
      submit(){
        this.$refs.form.validate((valid)=>{
          if(valid){
            // 后续操作
            if(this.modalType === 0){
              addUser(this.form).then(()=>{
                // 重新获取列表接口
                this.getList();
              })
            }else{
              editUser(this.form).then(()=>{
                this.getList();
              });
            }
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
      findResource(){
        this.$axios.post(this.baseUrl+"/resource/findResourceByCourse",{
                id:this.courseId
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.data=res.data
                }
            ).catch(error=>{console.error(error);})
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
  