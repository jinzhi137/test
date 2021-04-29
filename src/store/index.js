import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo:JSON.parse(sessionStorage.getItem("userinfo")),
    monitordata:JSON.parse(sessionStorage.getItem("monitordata")),
  },
  mutations: {
    SET_USERINFO:(state,userinfo)=>{
      state.userinfo=userinfo
      sessionStorage.setItem("userinfo",JSON.stringify(userinfo))
    },
    SET_MONITORDATA:(state,monitordata)=>{
      state.monitordata=monitordata
      sessionStorage.setItem("monitordata",JSON.stringify(monitordata))
    },
    REMOVE:(state)=>{
      state.userinfo={}
      state.monitordata={}
      sessionStorage.setItem("userinfo",JSON.stringify(''))
      sessionStorage.setItem("monitordata",JSON.stringify(''))
    }

  },
  getters:{
    getUserinfo:state=>{
      return state.userinfo
    },
    getMonitordata:state=>{
      return state.monitordata
    }

  },
  actions: {
  },
  modules: {
  }
})
