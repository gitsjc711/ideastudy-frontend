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
        <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name" @click="menuClick(item)">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{item.label}}</span>
        </el-menu-item>
  
        <el-submenu v-for="item in hasChildren" :key="item.name" :index="item.name">
          <template slot="title">
            <i :class="`el-icon-${item.icon}`"></i>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item-group v-for="subItem in item.children" :key="subItem.name">
            <el-menu-item :index="subItem.name">{{subItem.label}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {

        menuData: [
          {
            path: '/mainPage',
            name: 'home',
            label: '首页',
            icon: 's-home',
            url: 'Home/home'
          },
          {
            path: 'mainPage/goodlist',
            name: 'goodlist',
            label: '课程搜索',
            icon: 'video-play',
            url: 'MallManage/MallManager'
          },
          {
            path: '/user',
            name: 'user',
            label: '用户资料',
            icon: 'user',
            url: 'UserManage/UserManager'
          },
          {
            label: '其他',
            icon: 'location',
            name: 'other',
            children:[
              {
                path: '/page1',
                name: 'page1',
                label: '页面1',
                icon: 'setting',
                url: 'Other/PageOne'
              },
              {
                path: '/page2',
                name: 'page2',
                label: '页面2',
                icon: 'setting',
                url: 'Other/PageTwo'
              }
            ]
          },
  
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);s
      },
      menuClick(item) {
      // 当页面的路由与跳转的路由不一致才进行跳转
      if(this.$route.path !== item.path && !(this.$route.path === '/mainPage' && item.path === '/')){
        this.$router.push(item.path)
      }
    }
    },
    computed:{
      // 没有子菜单
      noChildren(){
        return this.menuData.filter(item => !item.children)
      },
      // 有子菜单
      hasChildren(){
        return this.menuData.filter(item => item.children)
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
  
  