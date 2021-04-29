import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "@/components/Login";
import bridgeInf from "@/components/bridgeInf";
import Register from "@/components/Register";
import DataAnalysis from "@/components/DataAnalysis";
import DataPrediction from "@/components/DataPrediction";
import DataEntry from "@/components/DataEntry";
import DataProcess from "@/components/DataProcess";
import DataShow from "@/components/DataShow";
import showdata from "@/components/showdata";
import showbridge from "@/components/showbridge"
import personal from "@/components/personal"
import authority from "@/components/authority"
Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: '登录',
    component: Login
  },
  {
    path: '/reg',
    name: '注册',
    component: Register
  },
  {
    path: '/menu',
    name: '主界面',
    component:Home,
    children: [
      {
        path: '/menu/bridgeInf',
        name: '展示桥梁信息',
        component: bridgeInf
      },
      {
        path: '/menu/showbridge',
        name: '桥梁展示',
        component: showbridge
      },
      {
        path: '/menu/dataShow',
        name: '数据展示',
        component: DataShow
      },
      {
        path: '/menu/dataAnalysis',
        name: '数据分析',
        component: DataAnalysis
      },
      {
        path: '/menu/dataPrediction',
        name: '数据预测',
        component: DataPrediction
      },
      {
        path: '/menu/dataEntry',
        name: '数据录入',
        component: DataEntry
      },
      {
        path: '/menu/dataProcess',
        name: '数据处理',
        component: DataProcess
      },
      {
        path: '/menu/dataAnalysis',
        name: '融合分析',
        component: DataAnalysis
      },
      {
        path: '/menu/showData',
        name: '融合分析',
        component: showdata
      },
      {
        path:'/menu/personal',
        name:'个人主页',
        component: personal
      },
      {
        path: '/menu/authority',
        name: '用户管理',
        component: authority
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
