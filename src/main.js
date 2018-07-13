// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import "babel-polyfill";
import ElementUI from 'element-ui';
import Vant from 'vant';
import iView from 'iview';

// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/element/element-variables.scss'
import App from './App'
import router from './router'
import store from './store';
import Format from '@/common/js/time.js'
import mainWrapper from '@/components/mainWrapper/index.vue';
// import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';
// //第三方组件样式
import 'vant/lib/vant-css/index.css';
import 'iview/dist/styles/iview.css';
// 全局注册所涉及的组件
Vue.component('main-wrapper',mainWrapper);

//全局变量，全局方法
import Util from './common/util/util.vue';

Vue.use(ElementUI);
Vue.use(Vant);
Vue.use(iView);
Vue.use(Util);

Vue.config.productionTip = false

/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

export default vm;
