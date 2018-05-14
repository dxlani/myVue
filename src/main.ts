import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'

import navbar from './components/nav'
import header from './components/header'
import footer from './components/footer'
// import App from './App'

import './main.scss' /* 全局样式 */
Vue.config.productionTip = false
// Vue.prototype.axios = axios;
declare var $:any;


//引入js
import   "../node_modules/jquery/dist/jquery.js"
import  '../node_modules/bootbox/bootbox.js'
import  "../node_modules/bootstrap/dist/js/bootstrap.min.js"
import  "../node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.min.js"
import  "../node_modules/jquery-weui/dist/js/jquery-weui.min.js"
import  "../node_modules/ali-oss/dist/aliyun-oss-sdk.min.js"
import  "../node_modules/bootstrap-table/dist/bootstrap-table.js"

/* 全局注册组件 */
//  Vue.component('navbar',navbar);



new Vue({
  el: '#App',
  router,
  store,
  //components: { App } /*  vue1.0的写法 */
   //render: h => h(App)   /*  vue2.0的写法 */
  // components: {
  //   'app-header':header,
  //   'app-footer':footer,
  //   'app-nav':navbar
  // }
}).$mount('#App');
