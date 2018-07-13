import Vue from 'vue'
import Router from 'vue-router'
import pageWapper from '@/components/pageWrapper'
// 首页路由
import indexRoutes from './modules/index.js' 
// 登录页路由
import loginRoutes from './modules/login.js' 

// 品牌管理路由
import managementRoutes from './modules/management.js' 
//app首页编辑路由 首屏精选
import editRoutes from './modules/edit.js'
import appHomeRoutes from './modules/appHome.js';
import homepageRoutes from './modules/homepage.js';
//商品模块路由
import productRoutes from './modules/product.js' 
//商品组
import goodsGroup from './modules/goodsGroup.js' 

//角色权限管理
import authorityManagement from './modules/authorityManagement.js' 

//系统设置
import systemRoutes from './modules/system.js' 
Vue.use(Router)
export default new Router({
  routes: [
    ...loginRoutes,
    {
      path: '/',
      component: pageWapper,
      redirect: '/index',
      children: [
        ...indexRoutes,
        ...managementRoutes,
        ...editRoutes,     
        ...homepageRoutes, 
        ...productRoutes,
        ...authorityManagement,
        ...goodsGroup,
        ...systemRoutes,
        ...appHomeRoutes,
      ]
    },
//  { path: "*", redirect: '/index' },

  ]
})
