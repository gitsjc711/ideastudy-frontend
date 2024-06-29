<template>
    <div class="hello">
      <el-menu
          :collapse="isCollapse"
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
         >
          
        <h3>{{isCollapse?'平台':'智慧学习平台'}}</h3>
        <el-menu-item v-for="item in noChildren" :key="item.id" :index="item.id" @click="menuClick(item)">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
  
      </el-menu>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        Collapse: true,
        menuData: [
          {
            path: '/course/chapter',
            name: 'chapter',
            label: '章节',
            icon: 's-home',
          },
          {
            path: '/course/data',
            name: 'data',
            label: '资料',
            icon: 'video-play',
          },
          {
            path: '/course/notice',
            name: 'notice',
            label: '通知',
            icon: 'user',
          },
          {
            path: '/course/homework',
            name: 'homework',
            label: '作业',
            icon: 'user',
          },
       
  
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      menuClick(item) {
      // 当页面的路由与跳转的路由不一致才进行跳转
      if(this.$route.path !== item.path && !(this.$route.path === '/course' && item.path === '/')){
        this.$router.push(item.path)
      }
    },
    },
    computed:{
      // 没有子菜单
      noChildren(){
        return this.menuData.filter(item => !item.children)
      },
      isCollapse(){
      return this.$store.state.tab.isCollapse;
      },
    }
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
  height: 100vh;
  border-right: none;
  h3{
        color: #fff;
	    text-align: center;
    	line-height: 48px;
    	font-size: 16px;
   	 	font-weight: 400;
  }
}
</style>
  
  