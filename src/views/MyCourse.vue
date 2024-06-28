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
                <span>{{ course.name }}</span>  
              </div>  
              <p>{{ course.description }}</p>  
            </div>  
          </el-card>  
        </div>  
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
        courses: []  
      };  
    },
    created(){
      this.getMyLesson()
    },
    methods:{
      getMyLesson(){
        this.$axios.post(this.baseUrl+"/course/findMyCourse",{
          id:this.uid
        },{  
          headers: {  
          'Content-Type': 'application/json'  
        }}).then(res=>{this.courses=res.data
        }
        ).catch(error=>{console.error(error);})
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