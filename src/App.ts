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
  // data(){
  //   return {
  //   title:"this is a Vue demo"
  //   }
  // },
  components:{
    navbar,
    'app-header':header,
    'app-footer':footer,
  }
})

export default class app extends Vue {
  title:string="this is a Vue demo";
 
}

