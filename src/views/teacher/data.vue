<template>
    <div class="manage">
      <el-dialog
          title="添加资料"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
          <el-form-item label="资源名称" prop="name">
            <el-input v-model="form.name" placeholder="请输入资源名称" style="width: 50%;"></el-input>
          </el-form-item>
          <el-form-item label="章节序号" prop="order">
            <el-input v-model="form.order" placeholder="请输入章节序号" style="width: 50%;"></el-input>
          </el-form-item>
          <el-upload  
                       class="upload-demo"  
                       drag  
                       :action="uploadUrl"
                       :limit="1"
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
   <template>  
    <!-- 使用 img 标签来显示图片 -->  
    <img src="../../assets/资料.jpg" :style="{ width: '40px', height: '35px', borderRadius: '10%' }"  alt="课程图片">  
   </template>  
</el-table-column> 
       
      <el-table-column  
        prop="label"  
        flex="1"  
      ></el-table-column>  
      <el-table-column    
        flex="1"  
      ><template slot-scope="scope">  
        <button @click="learn(scope.row.url,scope.row.id)">学习</button>  
      </template>
    </el-table-column> 
    <el-table-column  
        prop="learned"  
        flex="1"
        v-if="!isTeacher"
      ></el-table-column>  
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
        form:{
          name:'',
          order:null,
          
             },

        rules: {
          name: [
            {required: true, message: '请输入资源名称', trigger: 'blur'},
          ],
          order: [
            {required: true, message: '请输入章节序号', trigger: 'blur'},
          ],
          
        },
        tableData: [],
        modalType: 0,// 0表示新增的弹框，1表示编辑的弹框

        data: [],
        uploadUrl:this.getBaseurl()+"/file/upload",
        url:"",
        errorCode:null,
        resourceId:null
      }
    },
    created(){
      this.findResource()
    },
    methods: {
      ...mapGetters(["getBaseurl"]),
      // 用户提交表单
      submit(){
        this.$refs.form.validate(async(valid)=>{
          if(valid){
            await this.addResource()
            await this.findResource()
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
      this.url=response
      alert("文件上传成功") 
    },  
    beforeUpload(file) {  
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
      }  ,
      // 获取列表
      handleAdd(){
      this.modalType = 0;
      this.dialogVisible = true;
      },
      findResource(){
        return new Promise((resolve, reject) => {
        this.$axios.post(this.baseUrl+"/resource/findResourceByCourse",{
                courseId:this.courseId,
                userId:this.uid
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.data=res.data
                  resolve(this.data)
                }
            ).catch(error=>{console.error(error);
              reject(error)
            })
        })
      },
      addResource(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/resource/add",{
                courseId:this.courseId,
                chapterOrder:this.form.order,
                name:this.form.name,
                url:this.url
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
      async learn(url,id){
        this.resourceId=id
        await this.study()
        await this.findResource()
        window.open(url,"_blank")
      },
      study(){
        return new Promise((resolve, reject) => {
        this.$axios.post(this.baseUrl+"/resource/learn",{
                id:this.resourceId,
                userId:this.uid
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.errorCode=res.data
                  resolve(this.errorCode)
                }
            ).catch(error=>{console.error(error);
              reject(error)
            })
        })
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
  