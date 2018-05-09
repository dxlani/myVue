import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import axios, { AxiosResponse } from 'axios'
 import './demo.css'  
//import template from './demo.vue'
declare var bootbox:any;  
declare var $:any;
@Component({
  name:'demo',
 template: require('./demo.html'),
   // mixins: [template],
})
export default class demo extends Vue {
  protected axios

  message:string="这是一个名片";
  users=[];

  constructor () {
    super()
    this.axios = axios    /* 结构声明，在不安装 @types/axios的情况下可以这么调用 */
  }
  mounted () {
    this.$nextTick(() => {
      this.loadData()
    })
  }

  private url = 'https://jsonplaceholder.typicode.com/users'
 
  private loadData () {
  this.axios.get(this.url).then((response: AxiosResponse) => {
    this.users = response.data;
    console.log(this.users);
  }, (error) => {
    console.error(error)
  })
  }


}
