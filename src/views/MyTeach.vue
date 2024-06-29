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
      <div class="manage-header">
        <el-button type="primary" @click="handleAdd">+ 新增课程</el-button>
        

        <div class="course-grid">  
    <h1 style="text-align: center;" >我教的课</h1>  
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
            <p>{{ course.description }}</p>  
          </div>  
        </el-card>  
      </div>  
    </div>  
  </div> 

      </div>
    </div>
  </template>
  <script>

import { mapGetters, mapState} from 'vuex';
  
  export default {
    name: "Home",
    computed:{
    ...mapState(["baseUrl","uid"])
    },
    data(){
      return{
        dialogVisible: false,
        form:{
          name:'',
          description:'',
         category:'',
         price:'',
          image:null
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
      // 获取列表
      handleAdd(){
      this.modalType = 0;
      this.dialogVisible = true;
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
  