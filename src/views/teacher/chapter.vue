<template> 
<div>
  <el-dialog
          title="添加章节"
          :visible.sync="dialogVisible"
          :before-close="handleClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
          <el-form-item label="章节标题" prop="name">
            <el-input v-model="form.name" placeholder="请输入章节标题" style="width: 50%;"></el-input>
          </el-form-item>

          
          <el-form-item label="章节顺序" prop="order">
            <el-input v-model="form.order" placeholder="请输入章节顺序" style="width: 50%;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
  </el-dialog>
  <el-dialog
          title="删除章节"
          :visible.sync="deleteVisible"
          :before-close="handleDeleteClose"
          width="50%">
        <!--表单数据-->
        <el-form ref="form"  :rules="deleteRule" :model="deleteForm" label-width="80px">
          <el-form-item label="章节顺序" prop="order">
            <el-input v-model="deleteForm.order" placeholder="请输入章节顺序" style="width: 50%;"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitDelete">确 定</el-button>
        </span>
  </el-dialog>
      <el-button type="primary" v-if="isTeacher" @click="handleAdd">+ 添加章节</el-button>
      <el-button type="primary" v-if="isTeacher" @click="handleDelete">- 删除章节</el-button>
    <el-tree  
        class="tree"  
        :data="data"  
        :props="defaultProps"  
        :highlight-current="true"  
        @node-click="handleNodeClick"  
    >  
        <template slot-scope="{ node }">  <!--可以变成{node,data}来访问data数据-->
            <div>   
                <i v-if="isFirstLevel(node)" class="el-icon-s-unfold"></i>
                <span>{{ node.label }}</span>
            </div>  
        </template>  
    </el-tree>  
</div>
</template>  
<script>
 import { mapState,mapMutations} from 'vuex';
export default {
    computed:{
 ...mapState(["account","baseUrl","uid","courseId","isTeacher"]),
},
    data() {
        return {
            data: [],
            defaultProps: {
                children: "children",
                label: "label",
            },
            dialogVisible: false,
            deleteVisible:false,
      form:{
        name:'',
        order:null
      },
      deleteForm:{
        order:null
      },
      rules: {
          name: [
            {required: true, message: '请输入章节标题', trigger: 'blur'},
          ],
          order: [
            {required: true, message: '请输入章节顺序', trigger: 'blur'},
          ],
        },
        deleteRule:{
          order: [
            {required: true, message: '请输入章节顺序', trigger: 'blur'},
          ],
        },
        tableData: [],
        modalType: 0,// 0表示新增的弹框，1表示编辑的弹框
        errorCode:null
        };
        
    },
  
    created(){
      this.findChapter()
    },
    methods: {
        findChapter(){
            return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/chapter/findChapter",{
                id:this.courseId
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
        addChapter(){
            return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/chapter/add",{
                courseId:this.courseId,
                chapterOrder:this.form.order,
                name:this.form.name
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
        handleNodeClick(data) {
            console.log(data);
        },
        isFirstLevel(node) {    
            return node.level === 1;  
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
      handleAdd(){
        this.modalType = 0;
        this.dialogVisible = true;
      }, 
      handleDelete(){
        this.modalType=0;
        this.deleteVisible=true;
      },
      async submitDelete(){
        if(this.deleteForm.order!=null){
          await this.deleteChapter()
          await this.findChapter()
          console.log(this.deleteForm);
            // 关闭弹窗
          this.deleteVisible = false;
            // 表单内容清空
          this.deleteForm.order=null
        }
      },
      deleteChapter(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/chapter/delete",{
                courseId:this.courseId,
                chapterOrder:this.deleteForm.order,
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
      
    },

};
</script>
<style scoped>
.el-tree {
    background: #ffffff;
    color: #333333;
    width: 600px;
}
/* 节点样式 */
::v-deep .el-tree-node__content {
    height: 55px !important;
    border-left: 4px solid #ffffff !important;
}
/* 点击后的样式 */
::v-deep .el-tree-node:focus > .el-tree-node__content {
    background-color: #e4f5ee !important;
    border-left: 4px solid #21af73 !important;
}
/* 高亮 */
::v-deep .el-tree-node.is-current > .el-tree-node__content {
    background-color: #e4f5ee !important;
    border-left: 4px solid #21af73 !important;
}
 
/*  */
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
/* 每个节点后面内容样式 */

</style>