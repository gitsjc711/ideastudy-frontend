<template>
    <div class="manage">
      <el-dialog
          title="添加课程"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入课程名" style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="课程目录" prop="category">
            <el-input v-model="form.category" placeholder="请输入课程目录" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="课程价格" prop="price">
            <el-input v-model="form.price" placeholder="请输入课程价格" style="width: 30%;"></el-input>
          </el-form-item>
          <el-form-item label="课程介绍" prop="description">
            <el-input  type="textarea"
                       style="width:50%;"
                       :rows="4" 
                       v-model="form.description" 
                       placeholder="请输入课程介绍">
                    </el-input>
          </el-form-item>
          <el-form-item label="课程图片" prop="image">
            <el-upload  
                       class="upload-demo"  
                       drag  
                       :action="uploadUrl"
                       :limit="1"
                       :before-upload="beforeUpload"
                       :on-success="onSuccess"
                        multiple>            
                        <i class="el-icon-upload"></i>  
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>  
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过100mb</div>  
            </el-upload> 
          </el-form-item>
        </el-form>
  
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
          title="修改课程"
          :visible.sync="updateDialogVisible"
          :before-close="handleUpdateClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="updateForm"  :rules="updateRules" :model="updateForm" label-width="80px">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="updateForm.name" placeholder="请输入课程名" style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="课程目录" prop="category">
            <el-input v-model="updateForm.category" placeholder="请输入课程目录" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="课程价格" prop="price">
            <el-input v-model="updateForm.price" placeholder="请输入课程价格" style="width: 30%;"></el-input>
          </el-form-item>
          <el-form-item label="课程介绍" prop="description">
            <el-input  type="textarea"
                       style="width:50%;"
                       :rows="4" 
                       v-model="updateForm.description" 
                       placeholder="请输入课程介绍">
                    </el-input>
          </el-form-item>
          <el-form-item label="课程图片" prop="image">
            <el-upload  
                       class="upload-demo"  
                       drag  
                       :action="uploadUrl"
                       :limit="1"
                       :before-upload="beforeUpload"
                       :on-success="onSuccess"
                        multiple>            
                        <i class="el-icon-upload"></i>  
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>  
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过100mb</div>  
            </el-upload> 
          </el-form-item>
        </el-form>
  
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitUpdate">确 定</el-button>
        </span>
      </el-dialog>
      
      <div class="manage-header">
        <el-button type="primary" @click="handleAdd">+ 新增课程</el-button>
        <el-button type="primary" @click="handleUpdate">修改课程</el-button>

        <div class="course-grid">  
    <h1 style="text-align: center; color: white;" >我教的课</h1>  
    <div class="grid-container">  
      <div  
        v-for="(course, index) in courses"  
        :key="index"  
        class="product-card"  
      >  
        <el-card class="box-card">  
          <div class="text item">  
            <img :src="course.courseLogoRequestUrl" alt="商品图片" class="product-image" />  
            <div class="clearfix">  
              <span>{{ course.name }}</span>  
            </div>  
            <p class="course-description">{{ course.description }}</p>  
          </div> 
          <div class="button">
            <el-button  type="info" plain round  size="small" @click="findDetail(course.id,true)">查看详情</el-button></div>
        </el-card>  
      </div>  
    </div>  
  </div> 

      </div>
    </div>
  </template>
  <script>

import { mapGetters, mapState,mapMutations} from 'vuex';
  
  export default {
    name: "Home",
    computed:{
    ...mapState(["baseUrl","uid"])
    },
    data(){
      return{
        dialogVisible: false,
        updateDialogVisible:false,
        form:{
          name:'',
          description:'',
         category:'',
         price:'',
          image:null,
        
        },
        updateForm:{
          name:'',
          description:'',
         category:'',
         price:'',
          image:null,
        
        },
        imageUrl:"",
        uploadUrl:this.getBaseurl()+"/file/upload",
        rules: {
          name: [
            {required: true, message: '请输入课程名', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入课程描述', trigger: 'blur'},
          ],
          category: [
            {required: true, message: '请输入课程目录', trigger: 'blur'},
          ],
          price: [
            {required: true, message: '请输入课程价格', trigger: 'blur'},
          ],
        },
        updateRules: {
          name: [
            {required: true, message: '请输入课程名', trigger: 'blur'},
          ]
        },
        tableData: [],
        modalType: 0,// 0表示新增的弹框，1表示编辑的弹框

        courses:[] 
      }
    },
    created(){
      this.getMyTeach();
    },
    methods: {
      ...mapGetters(["getBaseurl"]),
      ...mapMutations(["updateCourseId", "updateIsTeacher"]),
      // 用户提交表单
      submit(){
        this.$refs.form.validate(async (valid)=>{
          if(valid){
            await this.addCourse()
            await this.getMyTeach()
            console.log(this.form);
            // 关闭弹窗
            this.dialogVisible = false;
            // 表单内容清空
            this.$refs.form.resetFields();
          }
        })
      },
      submit(){
        this.$refs.form.validate(async (valid)=>{
          if(valid){
            await this.addCourse()
            await this.getMyTeach()
            console.log(this.form);
            // 关闭弹窗
            this.dialogVisible = false;
            // 表单内容清空
            this.$refs.form.resetFields();
          }
        })
      },
      submitUpdate(){
        this.$refs.updateForm.validate(async (valid)=>{
          if(valid){
            await this.updateCourse()
            await this.getMyTeach()
            console.log(this.updateForm);
            // 关闭弹窗
            this.updateDialogVisible = false;
            // 表单内容清空
            this.$refs.updateForm.resetFields();
          }
        })
      },
      updateCourse(){
          return new Promise((resolve, reject) => {this.$axios.post(this.baseUrl+"/course/update",{
              name:this.updateForm.name,
              description:this.updateForm.description,
              price:this.updateForm.price,
              category:this.updateForm.category,
              imageUrl:this.imageUrl,
              teacherId:this.uid
            },{  
            headers: {  
              'Content-Type': 'application/json'  
          }}).then(res=>{
                this.errorCode=res.data
              resolve(this.errorCode)
            }
          ).catch(error=>{
            console.error(error);
            reject(error)
          })})
        
      },
      handleClose(){
        // 弹框关闭前情况数据
        this.$refs.form.resetFields();
        this.dialogVisible = false;
      },
      handleUpdateClose(){
        // 弹框关闭前情况数据
        this.$refs.updateForm.resetFields();
        this.updateDialogVisible = false;
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
      },
      findDetail(id, isteacher) {  
      this.updateCourseId(id);  
      this.updateIsTeacher(isteacher); 
      this.$router.push({ path: '/course/chapter' });  
    } ,
      // 获取列表
      handleAdd(){
      this.modalType = 0;
      this.dialogVisible = true;
      },
      handleUpdate(){
      this.modalType = 0;
      this.updateDialogVisible = true;
      },
      getMyTeach(){
        return new Promise((resolve, reject) => {this.$axios.post(this.baseUrl+"/course/findMyTeach",{
            id:this.uid
           },{  
             headers: {  
                'Content-Type': 'application/json'  
            }}).then(res=>{
              this.courses=res.data
              resolve(this.courses)
           }
           ).catch(error=>{
              console.error(error);
              reject(error)
           })}) 
      },
      onSuccess(response, file, fileList){
        this.imageUrl=response
        alert("文件上传成功")
      },
      addCourse(){
        var formData = new FormData();
        for (let key in this.form) {  
            if (this.form.hasOwnProperty(key)) {  
              formData.append(key, this.form[key]);  
            }  
        }
        formData.append("teacherId",this.uid)
        if(this.imageUrl===""){
          alert("请等待文件上传")
        }else{
          formData.append("imageUrl",this.imageUrl)
         return new Promise((resolve, reject) => {this.$axios.post(this.baseUrl + "/course/publish", formData, {  
              headers: {  
                'Content-Type':'multipart/form-data'
              }  
            }).then(res => {  
              this.errorCode = res.data;
              resolve(this.errorCode)
              if(this.errorCode==="OK"){

              } else{
                alert(this.errorCode)
              } 
            }).catch(error => {  
              console.error(error); 
              reject(error) 
            });
           }) 
        }
        
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
    grid-template-columns: repeat(auto-fill, minmax(224px, 1fr));  
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
    width: 100%; /* 图片宽度占满卡片 */  
    height: 126px;  
    display: block;  
    margin-bottom: 10px;  
  }  
      
  .text {  
    padding: 3px;  
  }  

  .product-card {  
  width: 224px; /* 固定宽度 */  
  height: 252px; /* 固定高度，长度比宽度长 */  
  box-sizing: border-box; /* 确保内容在卡片内自适应 */  
  overflow: hidden; /* 隐藏溢出内容 */  
  cursor: pointer; /* 鼠标悬停时显示为指针 */  
  }  

  .course-name {  
  font-size: 16px; /* 增大字体大小 */  
  font-weight: bold; /* 加粗字体 */  
  color: #333; /* 深色字体 */  
  }  

  .course-description {  
  font-size: 12px; /* 较小字体大小 */  
  color: #666; /* 浅色字体 */  
  max-height: 25px; /* 限制描述框的高度 */  
  overflow: hidden; /* 隐藏溢出内容 */  
  text-overflow: ellipsis; /* 显示省略号 */  
  display: -webkit-box;  
  -webkit-line-clamp: 1; /* 限制行数 */  
  -webkit-box-orient: vertical;  
  }
  h1 {
    text-align: center;
    /* Center the heading */
    font-size: 24px;
    /* Increase the font size for better visibility */
    margin-bottom: 20px;
    /* Add some space below the heading */
  }
  </style>
  