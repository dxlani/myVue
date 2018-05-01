import router from './router'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import store from './vuex/store'

import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import navbar from './components/nav'
import header from './components/header'
import footer from './components/footer'

import './main.css' /* 全局样式 */
Vue.config.productionTip = false
//  Vue.use(VueResource)
// 引入CSS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/font-awesome/css/font-awesome.min.css"
import "../node_modules/bootstrap-table/dist/bootstrap-table.min.css"
import "../node_modules/jquery-datetimepicker/jquery.datetimepicker.css"
import "../node_modules/jquery-weui/dist/css/jquery-weui.min.css"


//引入js
import  '../node_modules/bootbox/bootbox.js'
import  "../node_modules/bootstrap/dist/js/bootstrap.min.js"
/* 全局注册组件 */
//  Vue.component('navbar',navbar);



new Vue({
  el: '#app',
  router,
  store,
   //components: { App }  vue1.0的写法
  // render: h => h(App)    vue2.0的写法
  components: {
    'app-header':header,
    'app-footer':footer,
    'app-nav':navbar
  }
})
