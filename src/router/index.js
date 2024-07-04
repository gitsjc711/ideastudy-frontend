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
import Chapter from "@/views/teacher/chapter.vue"
import HomeWork from "@/views/teacher/homework.vue"
import Notice from "@/views/teacher/notice.vue"
import Data from "@/views/teacher/data.vue"
import Comment from "@/views/teacher/comment.vue"
import Router from 'vue-router'
import Admin from '@/views/admin/admin.vue'

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
            component:Main,
            children: [
                { path: '', component: mainPage },
                { path: 'user', component: User },
                { path: 'MyCourse', component: MyCourse },
                { path: 'goodlist', component: Goodlist },
                { path: 'MyTeach', component: MyTeach },
                {path: 'Admin', component: Admin},
            ],
            redirect:'/mainPage/',
        },
        
        {
            path: '/course',
            name: 'course',
            component:Main,
            children: [
                { path: 'chapter', component: Chapter },
                { path: 'homework', component: HomeWork },
                { path: 'notice', component:Notice },
                { path: 'data', component: Data },
                {path:'comment',component:Comment}
               
            ],
            redirect:'/course/chapter',
        },
       
       
    ]
})