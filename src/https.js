import Vue from 'vue'
import axios from 'axios';
import store from '../src/store/store';
import * as types from '../src/store/types';
import router from '../src/router/index';
import { Toast } from 'vant';

//axios配置
let instance = axios.create({
  timeout:10000,
  baseURL:"http://www.middle888.top:8081"
});


// 封装token过期控制
export const setStorage = (key,val) => {
  var cunrTime = new Date().getTime();
  localStorage.setItem(key,JSON.stringify({value:val , time:cunrTime}))
}
export const getStorage = (key,expire,isReset) => {
  var data = localStorage.getItem(key);
  if(!data) return false;
  data = JSON.parse(data);
  if(expire && (new Date().getTime() - data.time > expire)){
    console.log("过期")
    // 过期
    localStorage.removeItem(key);
    return false;
  }
  if(isReset){
    setStorage(key,data.value);
  }
  // console.log("进来啊",data.value)
  return data.value;
}

//http request 拦截器
instance.interceptors.request.use(config => {
  let token = getStorage('login',1000*60*60*24,true);//获取token并重置有效期为24个小时
  // console.log(token);  
  if (token) {
    config.headers.token = token
    // config.headers.Authorization = `token ${store.state.token}`
  }else {
    localStorage.removeItem("login");  //清空缓存
    if (router.currentRoute.name && router.currentRoute.name.toLowerCase() == "login") {  
      //这里需要排除登陆(或第一次请求获取token)的时候的验证
    } else {
      //我的后台api接口，并没有对login接口做token验证，所以这里直接返回下面else方法
      //但是其他需要token验证的方法，会走这里并返回null
      Toast.fail("登录超时,请重新登录")
      router.replace({
        path: 'login',
        query: {redirect: router.currentRoute.path},
      });
         return null;
    }
 }
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

//http reponse拦截器
instance.interceptors.response.use(response => {
    if(response.data.code != 0){
      // alert(response.data.errMsg);
      console.log("返回信息:",response.data.msg)
      Toast.fail(response.data.msg);
    }
    return response.data;  //只返回服务器返回的data信息
  },
  error => {
    console.log("报错信息:",error);
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.commit(types.LOGOUT);
          router.currentRoute.path !== 'login' &&
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.path},
          });
          console.log("401",error.response.data);
          break;
        case 404:
          console.log("404",error.response.data);
          break;
        case 500:
          console.log("500",error.response.data);
          break;
      }
    }
    return Promise.reject(error.response.data);
  },
);

/**
 * method  请求的方法：get、post、delete、put
 * url 请求的url；
 * data  请求的参数
 * @return {Promise}  返回一个promise的对象，相当于axios请求数据的返回值
 */
export default function(method, url, data = null)
{
  method = method.toLowerCase();
  if (method === 'post') {
    return instance.post(url, data);
  } else if (method === 'get') {
    return instance.get(url, {params: data})
  } else if (method === 'delete') {
    return instance.delete(url, {params: data})
  } else if (method === 'put') {
    return instance.put(url, data);
  } else {
    console.error("未知的method" + method);
    return false;
  }
}

Vue.prototype.setStorage=setStorage;
Vue.prototype.getStorage=getStorage;