<template>
    <div class="manage">
      <el-dialog
          title="发布作业"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
          <el-form-item label="作业标题" prop="name">
            <el-input v-model="form.name" placeholder="请输入作业标题" style="width: 50%;"></el-input>
          </el-form-item>

          
          <el-form-item label="内容" prop="description">
            <el-input  type="textarea"
                       style="width: 50%;"
                       :rows="4" 
                       v-model="form.description" 
                       placeholder="请输入内容">
                    </el-input>
          </el-form-item>
          <el-form-item label="作业章节序号" prop="chapterOrder">
            <el-input v-model="form.chapterOrder" placeholder="请输入作业章节序号" style="width: 50%;"></el-input>
          </el-form-item>
        </el-form>
  
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
          title="完成作业"
          :visible.sync="visible"
          :before-close="handleFinshClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form" :model="finishForm"  label-width="80px">
          <el-upload  
                       class="upload-demo"  
                       drag  
                       :action="uploadUrl"
                       :limit="1"
                       :on-success="fnishSuccess"  
                       :before-upload="beforeFnish"  
                        multiple>            
                        <i class="el-icon-upload"></i>  
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>  
            </el-upload> 
        </el-form>
  
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleFinshClose">取 消</el-button>
          <el-button type="primary" @click="submitHomework">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
          title="学生已经完成作业"
          :visible.sync="studentHomeworkVisible"
          width="50%">
          <el-table  
          :data="studentFinishedHomework"  
          style="width: 100%"  
          stripe  
        >
        <el-table-column  
        prop="username"  
        label="提交学生"  
        width="150"  
      ></el-table-column>
      <el-table-column  
        prop="updateTime"  
        label="提交时间"  
        width="250"  
      ></el-table-column>
      <el-table-column  
        label="提交内容"  
        width="150"  
      ><template slot-scope="scope">
        <el-button type="primary" @click="checkHomework(scope.row.homeworkUrl)">查看作业</el-button>
      </template></el-table-column>
     </el-table>
        <span>
          <el-button type="primary" @click="closeStudentHomework">确 定</el-button>
        </span>
      </el-dialog>
      <div class="manage-header">
        <el-button type="primary" v-if="isTeacher" @click="handleAdd">+ 新建作业</el-button>
        

        <div class="course-grid">  
    <h1 style="text-align: center;" >作业列表</h1>  
    <el-table  
      :data="homework"  
      style="width: 100%"  
      stripe  
    >  
    <el-table-column  
      label="课程图片"  
      width="180"  
>  
   <template>  
    <!-- 使用 img 标签来显示图片 -->  
    <img src="../../assets/作业.jpg" :style="{ width: '40px', height: '35px', borderRadius: '10%' }"  alt="课程图片">  
   </template>  
</el-table-column> 
       
      <el-table-column  
        prop="name" 
        label="作业标题"    
        width="180" 
      ></el-table-column>   
      <el-table-column  
        prop="description" 
        label="作业正文"    
        flex="1"  
      ></el-table-column>
      <el-table-column  
        label="完成作业"    
        flex="1" 
        v-if="!isTeacher"
      >
      <template slot-scope="scope">
        <el-button type="primary" @click="handleFinshAdd(scope.row.id)">完成作业</el-button>
      </template>
    </el-table-column>
    <el-table-column  
        label="查看学生作业"    
        flex="1" 
        v-if="isTeacher"
      >
      <template slot-scope="scope">
        <el-button type="primary" @click="studentHomework(scope.row.id)">查看学生作业</el-button>
      </template>
    </el-table-column>
    </el-table>  

  </div> 

      </div>
    </div>
  </template>
  <script>
import { mapState,mapGetters} from 'vuex';
  
  export default {
    name: "Home",
    computed:{
 ...mapState(["account","baseUrl","uid","courseId","isTeacher"]),
},
    data(){
      return{
        dialogVisible: false,
        visible:false,
        studentHomeworkVisible:false,
        form:{
          name:'',
          description:'',
          chapterOrder:null
        },
        finishForm:{
          image:null
        },
        rules: {
          name: [
            {required: true, message: '请输入作业名', trigger: 'blur'},
          ],
          description: [
            {required: true, message: '请输入作业描述', trigger: 'blur'},
          ],
          chapterOrder:[
            {required: true, message: '请输入作业章节序号', trigger: 'blur'},
          ],
        },
        tableData: [],
        modalType: 0,// 0表示新增的弹框，1表示编辑的弹框

        homework: [],
        uploadUrl:this.getBaseurl()+"/file/upload",
        url:"",
        homeworkId:null,
        errorCode:null,
        homeworkStatus:null,
        studentFinishedHomework:[]
      }
    },
    created(){
      this.findHomework()
    },
    methods: {
      ...mapGetters(["getBaseurl"]),
      findHomework(){
        return new Promise((resolve, reject) => {
        this.$axios.post(this.baseUrl+"/homework/findHomework",{
              courseId:this.courseId
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.homework=res.data
                  resolve(this.homework)
                }
            ).catch(error=>{console.error(error);
              reject(error)
            })
      })
      },
      findFinishState(){
        return new Promise((resolve, reject) => {
        this.$axios.post(this.baseUrl+"/homework/findStatus",{
              homeworkId:this.homeworkId,
              userId:this.uid
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.homeworkStatus=res.data
                  resolve(this.homeworkStatus)
                }
            ).catch(error=>{console.error(error);
              reject(error)
            })
        })
      },
      addHomework(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/homework/add",{
                courseId:this.courseId,
                chapterOrder:this.form.chapterOrder,
                name:this.form.name,
                description:this.form.description
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
      // 用户提交表单
      submit(){
        this.$refs.form.validate(async(valid)=>{
          if(valid){
            await this.addHomework()
            await this.findHomework()
            console.log(this.form);
            // 关闭弹窗
            this.dialogVisible = false;
            // 表单内容清空
            this.$refs.form.resetFields();
          }
        })
      },
      submitHomework(){
        this.finshHomework()
        this.visible = false;
        alert("提交成功")
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
      async handleFinshAdd(id){
        this.homeworkId=id
        await this.findFinishState()
        if(this.homeworkStatus===true){
          alert("该作业已经完成")
        }else{
          this.modalType=0;
          this.visible=true;
        }
      },
      handleFinshClose(){
        this.$refs.form.resetFields();
        this.visible = false;
      },
      beforeFnish(file){
        const isJPGorPNG = file.type === 'image/jpeg' || file.type === 'image/png'; 
        const isPDF=file.type==='application/pdf'
        const isMP4=file.type==='video/mp4'
        const isLt100M = file.size / 1024 / 1024 < 100;  
  
        if (!(isJPGorPNG||isPDF||isMP4)) {  
          this.$message.error('上传文件只能是 JPG/PNG/PDF/MP4格式!');  
          return false;  
        }  
        if (!isLt100M) {  
          this.$message.error('上传文件大小不能超过 100MB!');  
          return false;  
        }  
        return true;  
      },
      fnishSuccess(response, file, fileList) {  
      // 处理上传成功后的逻辑，例如更新 form.image 数组 
      this.url=response
      alert("文件上传成功") 
      },  
      finshHomework(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/homework/finish",{
                homeworkId:this.homeworkId,
                userId:this.uid,
                homeworkUrl:this.url
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
      async studentHomework(id){
        this.homeworkId=id
        await this.findStudentHomework()
        this.studentHomeworkVisible=true;
        this.modalType = 0;
        
        
      },
      closeStudentHomework(){
        this.studentHomeworkVisible=false;
      },
      findStudentHomework(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/homework/findFinishHomework",{
                id:this.homeworkId,
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.studentFinishedHomework=res.data
                    resolve(this.studentFinishedHomework)
                }
            ).catch(
                error=>{console.error(error);
                reject(error)
            })
            })
      },
      checkHomework(homeworkUrl){
        window.open(homeworkUrl,"_blank")
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
  