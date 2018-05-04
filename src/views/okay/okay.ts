import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import axios, { AxiosResponse } from 'axios'
 import './okay.css'  
//import template from './okay.vue'
declare var bootbox:any;  
declare var $:any;
@Component({
  name:'okay',
 template: require('./okay.html'),
   // mixins: [template],
})
export default class okay extends Vue {
  protected axios

  message:string="这是okay页";
  // users=[
  //       {name:"丁晓林",position:'WEB前端',programe:"CSP",show:false},
  //       {name:"陈娟",position:'WEB前端',programe:"CSP",show:false},
  //       {name:"姚正发",position:'技术总监',programe:"PM",show:false},
  //       {name:"吕斌",position:'产品总监',programe:"PM",show:false},
  //       {name:"赵健",position:'前端组长',programe:"CCP",show:false},
  //       {name:"相鹏",position:'后端',programe:"CSP",show:false},
  //       {name:"刘飞",position:'后端',programe:"CSP",show:false},
  // ]

  users=[];

  constructor () {
    super()
    this.axios = axios
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
