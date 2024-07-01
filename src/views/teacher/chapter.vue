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

          
          <el-form-item label="章节内容" prop="content">
            <el-input  type="textarea"
                       style="width: 50%;"
                       :rows="4" 
                       v-model="form.content" 
                       placeholder="请输入内容">
                    </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </el-dialog>

      <el-button type="primary" v-if="isTeacher" @click="handleAdd">+ 添加章节</el-button>

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
      form:{
        name:'',
        content:''
      },
      rules: {
          name: [
            {required: true, message: '请输入章节标题', trigger: 'blur'},
          ],
          content: [
            {required: true, message: '请输入章节内容', trigger: 'blur'},
          ],
        },
        tableData: [],
        modalType: 0,// 0表示新增的弹框，1表示编辑的弹框
        };
    },
  
    created(){
      this.findChapter()
    },
    methods: {
        findChapter(){
            this.$axios.post(this.baseUrl+"/chapter/findChapter",{
                id:this.courseId
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.data=res.data
                }
            ).catch(error=>{console.error(error);})
        },
        handleNodeClick(data) {
            console.log(data);
        },
        isFirstLevel(node) {    
            return node.level === 1;  
        }, 
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
     handleAdd(){
      this.modalType = 0;
      this.dialogVisible = true;
      }, 
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