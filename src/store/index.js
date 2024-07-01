import Vue from 'vue'
import Vuex from 'vuex'
import tab from './tab.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        tab
    },
    state:{
        account:"",
        role:"",
        uid:null,
        baseUrl:"http://ehxzvj.natappfree.cc",
        courseId:null,
        isTeacher:null
    },
    mutations:{
        updateAccount(state,data){
          state.account=data
        },
        updateRole(state,data){
          state.role=data
        },
        updateUid(state,data){
          state.uid=data
        },
        updateCourseId(state,data){
          state.courseId=data
        }
     },
     getters:{
      getBaseurl(state){
        return state.baseUrl
      } 
     }
})
