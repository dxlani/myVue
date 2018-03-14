import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
Vue.config.productionTip = false
// Vue.use(VueResource)
// 引入CSS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "../node_modules/font-awesome/css/font-awesome.min.css"
import "../node_modules/bootstrap-table/dist/bootstrap-table.min.css"
import "../node_modules/jquery-datetimepicker/jquery.datetimepicker.css"
import "../node_modules/jquery-weui/dist/css/jquery-weui.min.css"


//引入js
import  '../node_modules/bootbox/bootbox.js'
import  "../node_modules/bootstrap/dist/js/bootstrap.min.js"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
