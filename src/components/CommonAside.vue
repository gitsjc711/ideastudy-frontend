<template>
  <div class="hello">
    <el-menu
        :collapse="isCollapse"
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#313961"
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
          <el-menu-item :index="subItem.name" @click="submenuClick(subItem)">{{subItem.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
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
          path: '/mainPage',
          name: 'mainPage',
          label: '首页',
          icon: 's-home',
        },
        {
          path: '/mainPage/goodlist',
          name: 'goodlist',
          label: '课程搜索',
          icon: 'search',
        },
        {
          path: '/mainPage/user',
          name: 'user',
          label: '用户资料',
          icon: 'user',
        },
        {
          path: '/mainPage/admin',
          name: 'admin',
          label: '课程目录管理',
          icon: 's-management',
        },
        
        {
          label: '我的课程',
          icon: 'location',
          name: 'mycourse',
          children:[
            {
              path: '/mainPage/MyCourse',
              name: 'MyCourse',
              label: '我学的课',
              icon: 'setting',
            },
            {
              path: '/mainPage/MyTeach',
              name: 'MyTeach',
              label: '我教的课',
              icon: 'setting',
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
      console.log(key, keyPath);
    },
    menuClick(item) {
    // 当页面的路由与跳转的路由不一致才进行跳转
    if(this.$route.path !== item.path && !(this.$route.path === '/mainPage' && item.path === '/')){
      this.$router.push(item.path)
    }
  },
  submenuClick(subitem) {
    if(this.$route.path !== subitem.path && !(this.$route.path === '/mainPage' && subitem.path === '/')){
      this.$router.push(subitem.path)
    // 当页面的路由与跳转的路由不一致才进行跳转
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
min-height: 100vh;
}
.el-menu{
height: 100%;
border-right: none;
background-color: #313961;
h3{
      color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 20px;
      font-weight: 400;
      font-family: coffee;
}
}
</style>

