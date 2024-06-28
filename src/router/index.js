import Vue from 'vue'
//对应你要跳转的组件
import Login from "@/views/LoginView.vue"; 
import mainPage from "@/views/mainPage.vue";
import User from "@/views/student/user.vue"
import Main from "@/views/Main.vue";
import MyCourse from "@/views/MyCourse.vue"
import MyTeach from "@/views/MyTeach.vue"
import Register from "@/views/register.vue"
import Goodlist from "@/views/goodlist.vue"
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
    routes: [
       
        {
            path:'/',
        name:'LoginView',
        component:Login
        },
        {
            path:'/register',
            name:'Register',
            component:Register
        },
        {
            path: '/mainPage',
            name: 'Main',
            redirect:'/mainPage',
            component:Main,
            children: [
                { path: '', component: mainPage },
                { path: 'user', component: User },
                { path: 'MyCourse', component: MyCourse },
                { path: 'goodlist', component: Goodlist },
                { path: 'MyTeach', component: MyTeach },
            ]
  
        },
       
       
    ]
})