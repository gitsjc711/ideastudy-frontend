<template>
    <div class="manage">
        <div class="manage-header">  
        <el-button type="primary"  @click="handleAdd">+ 添加课程目录</el-button>
    </div> 
    <el-dialog
          title="添加课程目录"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
          <el-form-item label="目录名" prop="categoryName">
            <el-input v-model="form.categoryName" placeholder="请输入目录名" style="width: 50%;"></el-input>
          </el-form-item>
        <!--自行添加-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
  </el-dialog> 
    <div>  
      <h1 style="text-align: center;">课程目录</h1>  
      <el-table  
        :data="categories"  
        style="width: 100%"  
        stripe  
      >  
         
        <el-table-column  
          prop="categoryName"  
          label="目录名称"  
          width="180"  
        ></el-table-column>  
        <el-table-column  
          
          label="目录操作"  
          width="180"  
        ><template slot-scope="scope">
          <el-button type="text" @click="finishDelete(scope.row.id)">删除</el-button>
        </template></el-table-column>  
      </el-table>  
    </div>  
  </div>
  </template>
  
  <script>  
  import { mapState} from 'vuex';
  
  export default {  
    computed:{
      ...mapState(["baseUrl","uid","role"])
    },
  data() {  
    return {  
        categories: [],
        dialogVisible: false,
        form:{
          categoryName:'',
        
      },
      rules: {
          categoryName: [
            {required: true, message: '请输入目录名称', trigger: 'blur'},
          ],
          
        },
        modalType: 0,// 0表示新增的弹框，1表示编辑的弹框
        errorCode:null
    };
  },
  created(){
    this.findCategory()
  },
  methods:{
    submit(){
        this.$refs.form.validate(async (valid)=>{
          if(valid){
            await this.addCategory()
            await this.findCategory()
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
      handleAdd(){
        this.modalType = 0;
        this.dialogVisible = true;
      }, 
      addCategory(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/category/add",{
                categoryName:this.form.categoryName,
                role:this.role
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.errorCode=res.data
                    resolve(this.errorCode)
                    if(this.errorCode!="OK"){
                      alert(this.errorCode)
                    }
                }
            ).catch(
                error=>{console.error(error);
                reject(error)
            })
            })
      },
      findCategory(){
        return new Promise((resolve, reject) => {
            this.$axios.get(this.baseUrl+"/category/all").then(res=>{this.categories=res.data
                    resolve(this.categories)
                    
                }
            ).catch(
                error=>{console.error(error);
                reject(error)
            })
            })
      },
      async finishDelete(id){
        await this.deleteCategory(id)
        await this.findCategory()
      },
      deleteCategory(id){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/category/delete",{
                id:id,
                role:this.role
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.errorCode=res.data
                    resolve(this.errorCode)
                    if(this.errorCode!="OK"){
                      alert(this.errorCode)
                    }
                }
            ).catch(
                error=>{console.error(error);
                reject(error)
            })
            })
      }
    
   
  
  }
  
  };  
  </script>
  
  <style lang="less" scoped>
  .manage{
    height: 90%;
    .manage-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  table {
    margin: 0 auto;
    /* Center the table horizontally */
    width: 80%;
    /* Adjust the width of the table */
    font-size: 16px;
    /* Increase the font size for better readability */
  }
  
  th,
  td {
    padding: 10px;
    /* Add padding to the table cells */
    text-align: center;
    /* Center the content of the table cells */
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