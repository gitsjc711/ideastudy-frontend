<template>  
  <div class="product-detail">  
    <div class="product-image">  
      <img :src="product.image" alt="Product Image">  
    </div>  
    <div class="product-info">  
      <h2>{{ product.name }}</h2>  
      <h3>教师: {{ product.teacher.name }}</h3>  
      <p>价格：{{ product.price }}</p>
      <p>{{ product.description }}</p>  
      <el-button type="primary" @click="handlePurchase">购买</el-button>  
    </div>  
  </div>  
</template>  
  
<script>  
import axios from 'axios';  
  
export default {  
  data() {  
    return {  
      product: null, // 初始为空，待从API获取数据后填充  
    };  
  },  
  props: ['productId'], // 假设商品ID通过props传入  
  async created() {  
    try {  
      // 假设API接收商品ID作为参数，并返回商品详情  
      const response = await axios.get(`http://localhost:8080/products/${this.productId}`);  
      this.product = response.data;  
    } catch (error) {  
      console.error('Error fetching product details:', error);  
    }  
  },  
  methods: {  
    handlePurchase() {  
      // 处理购买逻辑，例如跳转到购物车页面或显示购买确认弹窗  
      console.log('购买商品:', this.product);  
      // 这里可以根据需要添加实际的购买逻辑  
    },  
  },  
};  
</script>  
  
<style scoped>  
.product-detail {  
  display: flex;  
  flex-direction: column;  
  align-items: flex-start;  
  margin: 20px;  
}  
  
.product-image {  
  width: 100%;  
  max-width: 600px;  
  margin-bottom: 20px;  
  img {  
    width: 100%;  
    height: auto;  
  }  
}  
  
.product-info {  
  h2, h3 {  
    margin-bottom: 10px;  
    border-bottom: 1px solid #ccc;  
    padding-bottom: 5px;  
  }  
  p {  
    margin-top: 15px;  
  }  
}  
</style>