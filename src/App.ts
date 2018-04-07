import  Component  from 'vue-class-component'
import navbar from './common/nav.vue'
import header from './common/header.ts'
import footer from './common/footer.vue'
import template from './App.vue'
import Vue from 'vue'
// 局部注册组件
// import Vue from 'vue'
// Vue.component('navbar',navbar);
  @Component({
   name: 'App',
   mixins: [template],
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

