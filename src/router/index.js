import Vue from 'vue';
import Router from 'vue-router';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from "../store/store";
import * as types from '../store/types';
import menusRoute from '@/router/menus';

Vue.use(Router);

const routes = [
  {
    path:'/',
    redirect:"/login"
  },{
    path: '*',
    name: 'errInfo',
    meta:{
      requireAuth:true   //添加这个字段 表明进入这个路由需要登陆
    },
    component: ()=>import('@/components/error/errInfo.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta:{
      requireAuth:true   //添加这个字段 表明进入这个路由需要登陆
    },
    component: Home
  },
  {
    path: '/adminhome',
    name: 'adminhome',
    meta:{
      requireAuth:true   //添加这个字段 表明进入这个路由需要登陆
    },
    component:()=>import('@/views/Admin/home.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/login.vue')
  },
  {
    path: '/manager',
    name: 'manager',
    meta:{
      requireAuth:true,
      manageShow:true
    },
    children:menusRoute,
    component:()=>import('@/views/Management/index.vue')
  },{
    path: '/approval',
    name: 'approval',
    meta:{
      requireAuth:true   //添加这个字段 表明进入这个路由需要登陆
    },
    component: ()=>import('../views/Approval/index.vue')
  },{
    path: '/mine',
    name: 'mine',
    meta:{
      requireAuth:true   //添加这个字段 表明进入这个路由需要登陆
    },
    component: ()=>import('../views/User/index.vue')
  }
];

//页面刷新是，重新赋值token
if(window.localStorage.getItem('login')){
  console.log("页面刷新",JSON.parse(localStorage.getItem('login')).value)
  var data = {
    value: JSON.parse(localStorage.getItem('login')).value,
    time: new Date().getTime(),
  }
  localStorage.setItem("login",JSON.stringify(data))
  // store.commit(types.LOGIN,data);
}

const router = new VueRouter({
  routes
});

router.beforeEach((to,from,next)=>{
  if(to.matched.some( r => r.meta.requireAuth )){
    if(localStorage.getItem("login")){
      next();
    }else{
      next({
        name:'/login',
        query:{redirect:to.fullPath}
      })
    }
  }else{
    next();
  }
});
export default router;

