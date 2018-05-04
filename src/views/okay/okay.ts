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
  message:string="这是okay页";
  id:string='1';
  user={};

 

  // constructor () {
  //   super()
  //   this.axios = axios
  // }
/* npm install --save-dev @types/axios 安装声明文件，以上结构声明就可以不用写啦 */
 url = `https://jsonplaceholder.typicode.com/posts/${this.id}`
  // created(){
  //   axios.get(this.url,).then(res=>{
  //     console.log('data',res.data);
  //   }).catch(err=>{
  //     console.log('err',err);
  //   })
  // }
  
  
  mounted () {
    // this.$nextTick(() => {
      axios.get('https://jsonplaceholder.typicode.com/posts/'+this.id).then(res=>{
        this.user=res.data;
        console.log('data', this.user);
      }).catch(err=>{
        console.log('err',err);
      })
    // })
  }

  getuser(){
    axios.get(this.url).then(res=>{  /* 为啥url还是初始化的id */
      this.user=res.data;
      console.log('data', this.user,this.id);
    }).catch(err=>{
      console.log('err',err);
    })

  }

}
