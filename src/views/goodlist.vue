<template>  
  <div>  
    <el-table :data="products" style="width: 100%">  
      <el-table-column prop="name" label="商品名称" width="180">  
      </el-table-column>  
      <el-table-column label="商品图片">  
        <template slot-scope="scope">  
          <img :src="scope.row.image" alt="商品图片" style="width: 100px; height: auto;">  
        </template>  
      </el-table-column>  
      <el-table-column label="教师信息">  
        <template slot-scope="scope">  
          <div>{{ scope.row.teacher.name }} - {{ scope.row.teacher.department }}</div>  
        </template>  
      </el-table-column>  
      <el-table-column label="操作">  
        <template slot-scope="scope">  
          <el-button type="primary" @click="handleDetail(scope.row)">查看详情</el-button>  
        </template>  
      </el-table-column>  
    </el-table>  
  </div>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      products: [  
        {  
          name: '商品1',  
          image: 'https://example.com/product1.jpg',  
          teacher: {  
            name: '张老师',  
            department: '数学系'  
          }  
        },  
        // 更多商品...  
      ]  
    };  
  },  
  methods: {  
    handleDetail(product) {  
      // 这里可以处理查看详情的逻辑，比如跳转到另一个页面或弹出对话框  
      console.log(product);  
    }  
  }  
};  
</script>  
  
<style scoped>  
/* 这里可以添加样式 */  
</style>