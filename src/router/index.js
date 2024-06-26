import Vue from 'vue'
//对应你要跳转的组件
import Login from "@/views/LoginView.vue"; 
import mainPage from "@/views/mainPage.vue";
import studentCourse from "@/views/studentCourse.vue";
import BuyCourse from "@/views/studentBuyCourse.vue";
import User from "@/views/user.vue"
import Main from "@/views/Main.vue";
import Search from "@/views/search.vue";
import PurchaseDetail from "@/views/PurchaseDetail.vue"
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    routes: [
       
        {
            path:'/LoginView',
        name:'LoginView',
        component:Login
        },
        {
            path: '/',
            name: 'Main',
            redirect:'/mainPage',
            component:Main,
            children: [
                { path: 'studentcourse', component: studentCourse },
                { path: 'studentBuyCourse', component: BuyCourse },
                { path: 'mainPage', component: mainPage },
                { path: 'user', component: User },
                { path: 'search', component: Search },
                { path: 'purchaseDetail', component: PurchaseDetail },
            ]
  
        },
       
       
    ]
})