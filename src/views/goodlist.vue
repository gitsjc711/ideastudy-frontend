<template>
  <div class="manage">
      <div class="manage-header">  
    <el-form :inline="true" :model="goodlistForm">  
      <el-form-item label="查询类型">  
        <el-select v-model="goodlistForm.queryType" placeholder="请选择">  
          <el-option label="按教师查询" value="teacher"></el-option>  
          <el-option label="按课程查询" value="course"></el-option>  
        </el-select>  
      </el-form-item>  
      <el-form-item v-if="goodlistForm.queryType === 'teacher'" label="教师姓名">  
        <el-input type="input" v-model="goodlistForm.teacherName"></el-input>  
      </el-form-item>  
      <el-form-item v-if="goodlistForm.queryType === 'course'" label="课程名称">  
        <el-input type="input" v-model="goodlistForm.courseName"></el-input>  
      </el-form-item>  
      <el-form-item>  
        <el-button type="primary" >查询</el-button>  
      </el-form-item>  
    </el-form>  
  </div>  
  <div>  
    <h1 style="text-align: center;">商品课程列表</h1>  
    <el-table  
      :data="courses"  
      style="width: 100%"  
      stripe  
    >  
    <el-table-column  
      label="课程图片"  
      width="180"  
>  
   <template slot-scope="scope">  
    <!-- 使用 img 标签来显示图片 -->  
    <img :src="scope.row.courseLogoRequestUrl" style="width: 100%; height: auto; display: block;" alt="课程图片">  
   </template>  
</el-table-column> 
      <el-table-column  
        prop="categoryName"  
        label="课程分类"  
        width="180"  
      ></el-table-column>  
      <el-table-column  
        prop="name"  
        label="课程名称"  
        width="180"  
      ></el-table-column>  
      <el-table-column  
        prop="description"  
        label="课程描述"  
        width="180"  
      ></el-table-column>  
      <el-table-column  
        prop="teacherName"  
        label="任课教师"  
        width="180"  
      ></el-table-column>  
      <el-table-column  
        prop="price"  
        label="价格"  
        width="180"  
      ></el-table-column> 
      <el-table-column
        label="购买"  
        width="180"  
      ><template slot-scope="scope">  
        <button @click="addToOrder(scope.row.id,scope.row.price)">加入购物车</button>  
      </template></el-table-column>  
    </el-table>  
  </div>  
</div>
</template>

<script>  
import { mapState} from 'vuex';

export default {  
  computed:{
    ...mapState(["baseUrl","uid"])
  },
data() {  
  return {  
    goodlistForm: {  
      queryType: '', // 查询类型  
      teacherName: '', // 教师姓名  
      courseName: '' // 课程名称  
    },  
    courses: [],
    code:""
  };
},
created(){
  this.getCourse()
},
methods:{
  getCourse(){
    this.$axios.post(this.baseUrl+"/course/findAll",{
      id:this.uid
    },{  
    headers: {  
      'Content-Type': 'application/json'  
    }}).then(res=>{this.courses=res.data
    }
    ).catch(error=>{console.error(error);})
  },
  addToOrder(id,price){
    var outTradeNo = Math.floor(Math.random() * 900000) + id;
    var outTradeNoString = outTradeNo.toString();  
    this.$axios.post(this.baseUrl+"/order/add",
    {
      courseId:id,
      userId:this.uid,
      orderNo:outTradeNoString,
      actualPrice:price
    },{  
    headers: {  
      'Content-Type': 'application/json'  
    }}).then(res=>{
      this.code=res.data
      if(this.code==="OK"){
        alert("课程加入购物车成功")
      }else{
        alert(this.code)
      }
    }
    ).catch(error=>{console.error(error);})
    
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