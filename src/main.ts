import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import { Component, Vue} from 'vue-property-decorator'

import './main.scss' /* 全局样式 */
Vue.config.productionTip = false
// Vue.prototype.axios = axios;
declare var $:any;
declare var bootbox:any;
var datetimepicker = require('jquery-datetimepicker');
var bootstrap = require('bootstrap');
var bootstrapTable = require('bootstrap-table');
var bootstrapTtableZhCN = require('bootstrap-table-zh-CN');
var jqueryweui = require('jqueryweui');

//引入js
import  "../node_modules/ali-oss/dist/aliyun-oss-sdk.min.js"
import  "../node_modules/vee-validate/dist/locale/zh_CN.js"

/* 全局注册组件 */
//  Vue.component('navbar',navbar);
$.datetimepicker.setLocale('ch');//设置中文
bootbox.setDefaults("locale","zh_CN");

import  "../src/services/Validator"  /* 校验器 */

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
