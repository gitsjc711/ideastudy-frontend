import Vue from 'vue'
//对应你要跳转的组件
import Login from "@/views/LoginView.vue"; 
import mainPage from "@/views/mainPage.vue";
import User from "@/views/student/user.vue"
import Main from "@/views/Main.vue";
import PurchaseDetail from "@/views/PurchaseDetail.vue"
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
            path: '/mainPage',
            name: 'Main',
            component:Main,
            children: [
                { path: '', component: mainPage },
                { path: 'user', component: User },
                { path: 'purchaseDetail', component: PurchaseDetail },
            ]
  
        },
       
       
    ]
})