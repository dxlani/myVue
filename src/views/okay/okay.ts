import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import axios, { AxiosResponse } from 'axios'
import './okay.css'  
import api from '../../api/api'
//import template from './okay.vue'
declare var bootbox:any;  
declare var $:any;
@Component({
  name:'okay',
 template: require('./okay.html'),
   // mixins: [template],
})
export default class okay extends Vue {
  constructor() {
    super();
  }

  message:string="这是okay页";
  id:string='1';
  user={}; 
  users={}; 
  private post_data={
    title: '',
    body: '',
    userId:''
  }
  uuid:string='';


  // constructor () {
  //   super()
  //   this.axios = axios
  // }
/* npm install --save-dev @types/axios 安装声明文件，以上结构声明就可以不用写啦 */
  //   protected async created() {
  //     // api example
  //     try {
  //         let res = await api.getPackage({id:this.id})
  //         console.log(res)
  //     } catch (err) {
  //         console.log(err)
  //     }
  // }


  protected beforeRouteEnter(to, from, next) {
      console.log('before home enter')
      next()
  }

  protected beforeRouteLeave(to, from, next) {
      console.log('before home leave')
      next()
  }
/*  ====================================================== */



/* 初始化页面 */
  mounted () {
   this.init();
  }
  async init(){
    api.getPackage({id:this.id})
      .then(res=>{console.log('res_init', res);this.user=res[0];})
      .catch(err=>{console.log('err',err); })
  }
/* get */
   getuser(){
  //  axios.get(`https://jsonplaceholder.typicode.com/posts/${this.id}`).then(res=>{    
  //     this.user=res.data;
  //     console.log('data', this.user,this.id);
  //   }).catch(err=>{
  //     console.log('err',err);
  //   })
  api.getPackage({id:this.id})
      .then(res=>{
        console.log('get', res);
        this.user=res[0];})
        .catch(err=>{console.log('err',err); })
  }
  /* post */
    postuser(){
      api.postPackage((this.post_data))
      .then(res=>{
        console.log('post', res);
        this.users=res;
    })
      .catch(err=>{console.log('err',err); })
  }
  /* put */
    putuser(){
      api.putPackage((this.post_data))
      .then(res=>{
        console.log('put', res);
        this.users=res;
    })
      .catch(err=>{console.log('err',err); })
  }
    /* patch */
    patchuser(){
        api.patchPackage({
          title:'patch',
          body: '这是一个patch'
        })
        .then(res=>{
          console.log('patch', res);
          this.users=res;
      })
        .catch(err=>{console.log('err',err); })
    }
    /* delete*/
    deleteuser(){
        api.deletePackage((this.post_data))
        .then(res=>{
          console.log('delete', res);
        
      })
        .catch(err=>{console.log('err',err); })
    }
 

  

}



