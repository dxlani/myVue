// import  Component  from 'vue-class-component'
// import Vue from 'vue'
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import navbar from './components/nav'
import header from './components/header'
import footer from './components/footer'

import './App.css'
// import template from './App.vue'

// 局部注册组件
// Vue.component('navbar',navbar);

  @Component({
   name: 'App',
  //  mixins: [template],
  template: require('./App.html'),
  components:{
    navbar,
    'app-header':header,
    'app-footer':footer,
  },
  // watch: {
  //   // 防止跳过登录直接进系统
  //   $route (newVal, oldVal) {
  //     if (!this.$store.state.token && newVal.path !== '/login') {
  //       this.$router.push('/login')
  //       alert('请登录')
  //     }
  //   }
  // }
})

export default class app extends Vue {
  title:string="Vue2.5 demo";
  footerTitle:string="Copyright 2018";

}

