<template>  
  <div class="course-grid">  
    <h1 style="text-align: center;" >已购买课程</h1>  
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
              <span class="course-name">{{ course.name }}</span> 
            </div>  
            <p class="course-description">{{ course.description }}</p>  
            <div class="button">
          <el-button  type="info" plain round  size="small" @click="findDetail(course.id,false)">查看详情</el-button></div>
          </div>  
        </el-card>  
      </div>  
    </div>  
  </div>  
</template>  
  
<script>
import { mapState,mapMutations} from 'vuex';

export default { 
  computed:{
  ...mapState(["baseUrl","uid"])
  }, 
  data() {  
    return {  
      courses: [] ,
    };  
  },
  created(){
    this.getMyLesson()
  },
  methods:{
    ...mapMutations(["updateCourseId", "updateIsTeacher"]),
    getMyLesson(){
      this.$axios.post(this.baseUrl+"/course/findMyCourse",{
        id:this.uid
      },{  
        headers: {  
        'Content-Type': 'application/json'  
      }}).then(res=>{this.courses=res.data
      }
      ).catch(error=>{console.error(error);})
      },
      findDetail(id, isteacher) {  
    this.updateCourseId(id);  
    this.updateIsTeacher(isteacher); 
    this.$router.push({ path: '/course/chapter' });  
  } 
  } 
};


</script> 
    
  <!-- <script>  
  // import axios from 'axios'; 
  // export default {  
  //   data() {  
  //     return {  
  //       products: [],  
  //       baseUrl: '', // 设置基础URL  
  //       uid: '' // uid可能用于标识当前登录的用户 
  //     };  
  //   },  
  //   created() {  
  //     this.getProducts();  
  //   },  
  //   methods: {  
  //     getProducts() {  
  //       axios.post(this.baseUrl + "/products/findAll", {  
  //         // 修改  
  //         id: this.uid  
  //       }, {  
  //         headers: {  
  //           'Content-Type': 'application/json'  
  //         }  
  //       }).then(res => {  
  //         this.products = res.data;  
  //       }).catch(error => {  
  //         console.error(error);  
  //       });  
  //     },  
  //   }  
  // };  
  </script>   -->
    
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
    width: 110px;  
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

  .box-card {  
  border: 0;  
  box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.1);  
  background-color: rgba(255, 255, 255, 1);  
  height: 100%; /* 填充父容器高度 */  
  }  

  .text {  
  padding: 3px;  
  }  

  .product-image {  
  width: 100%; /* 图片宽度占满卡片 */  
  height: 126px; /* 图片高度固定，长度比宽度长 */  
  object-fit: cover; /* 保持图片比例并填充容器 */  
  display: block;  
  margin-bottom: 10px;  
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
  </style>