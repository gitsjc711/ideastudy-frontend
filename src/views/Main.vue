<template>  
  <div>  
    <BackGround />   
    <el-container>  
      <!-- 使用动态组件来决定显示哪个侧边菜单 -->  
      <component :is="asideComponent" width="auto">  
      </component>  
      <el-container>  
        <el-header>  
          <common-header/>  
        </el-header>  
        <el-main><router-view></router-view></el-main>  
      </el-container>  
    </el-container>  
  </div>  
</template>  
  
<script>  
import CommonAside from "@/components/CommonAside";  
import CommonCourseAside from "@/components/CommonCourseAside";  
import CommonHeader from "@/components/CommonHeader";  
import BackGround from '@/components/BackGround.vue';  
  
export default {  
  name: "Main",  
  components: {  
    CommonAside,  
    CommonCourseAside, 
    CommonHeader,  
    BackGround  
  },  
  computed: {  
    asideComponent() {   
      return this.isCourseDetailPage() ? 'CommonAside':'CommonCourseAside';  
    }  
  },  
  methods: {  
    isCourseDetailPage() {  
      return this.$route.path.startsWith('/mainPage/' && '/mainPage');  
    }  
  }  
}  
</script> 

<style scoped>  
.el-header{  
  padding: 0;  
}  
</style>