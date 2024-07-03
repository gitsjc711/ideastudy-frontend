<template>
<div>
<el-button type="primary" @click="dialogVisible = true" v-if="!isTeacher">评论</el-button>
<el-dialog
  title="评论"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
    <el-form-item label="评论" prop="comment">
            <el-input  type="textarea"
                       style="width:50%;"
                       :rows="4" 
                       v-model="form.comment" 
                       placeholder="请输入评论">
                    </el-input>
          </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="回复"
  :visible.sync="isReply"
  width="80%"
  :before-close="handleClose">
  <el-table
      :data="replyVO"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="发布人"
        width="180"
        >
    </el-table-column>
        <el-table-column
        prop="updateTime"
        label="发布日期"
        width="280">
      </el-table-column>
      
      <el-table-column
        prop="content"
        label="内容"
        width="180">
      </el-table-column>
    </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="lookOk">确 定</el-button>
  </span>
</el-dialog>
<template>
    <el-table
      :data="commentVO"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="发布人"
        width="180"
        >
    </el-table-column>
        <el-table-column
        prop="updateTime"
        label="发布日期"
        width="280">
      </el-table-column>
      
      <el-table-column
        prop="content"
        label="内容"
        width="180">
      </el-table-column>
      <el-table-column
        label="回复"
        width="100">
        <template slot-scope="scope">  
        <el-button type="text" @click="reply(scope.row.id)">回复</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="查看回复"
        width="100">
        <template slot-scope="scope">
            <el-button type="text" @click="lookReply(scope.row.id)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>

</div>
</template>  
<script>
import { mapState} from 'vuex';

  export default {
    computed:{
        ...mapState(["account","baseUrl","uid","courseId","isTeacher"]),
    },
    data() {
      return {
        dialogVisible: false,
        form:{
            comment:""
        },
        rules:{
            comment: [
            {required: true, message: '请输入评论', trigger: 'blur'},
          ],
        },
        errorCode:null,
        commentVO:[],
        replyVO:[],
        isReply:false,
        replyId:null
      };
    },
    created(){
        this.findComment()
    },
    methods: {
      handleClose(done) {
        this.replyId=0;
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      submit(){
        this.$refs.form.validate(async (valid)=>{
          if(valid){
            await this.addComment()
            await this.findComment()
            console.log(this.form);
            // 关闭弹窗
            this.dialogVisible = false;
            this.replyId=0;
            // 表单内容清空
            this.$refs.form.resetFields();
          }
        })
      },
      addComment(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/comment/add",{
                courseId:this.courseId,
                userId:this.uid,
                content:this.form.comment,
                replyId:this.replyId
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
      findComment(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/comment/findByCourseId",{
                courseId:this.courseId,
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.commentVO=res.data
                    resolve(this.commentVO)

                }
            ).catch(
                error=>{console.error(error);
                reject(error)
            })
        })
      },
      reply(id){
        this.replyId=id;
        this.dialogVisible=true;
      },
      findReply(){
        return new Promise((resolve, reject) => {
            this.$axios.post(this.baseUrl+"/comment/findByReplyId",{
                replyId:this.replyId
            },{  
                headers: {  
                    'Content-Type': 'application/json'  
                }}).then(res=>{this.replyVO=res.data
                    resolve(this.replyVO)

                }
            ).catch(
                error=>{console.error(error);
                reject(error)
            })
        })
      },
      lookReply(id){
        this.replyId=id
        this.findReply()
        this.isReply=true
      },
      lookOk(){
        this.replyId=0
        this.isReply=false
      }
    }
  };
</script>