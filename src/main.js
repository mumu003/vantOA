// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/util/rem.js'

// 全局组件
import navBar from '@/components/navBar.vue'; // svg组件
Vue.component('nav-bar', navBar);

Vue.use(Vant);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
