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
        baseUrl:"http://localhost:8081"
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
        }
     }
})
