import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import axios, { AxiosResponse } from 'axios'
import './okay.css'  
import api from '../../api/api'
import other from '../other'
//import template from './okay.vue'
declare var bootbox:any;  
declare var $:any;
@Component({
  name:'okay',
  template: require('./okay.html'),
  // mixins: [template],
  components:{other}
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
  childMsg:string='';
  childMsg1:string='';

  //   protected async created() {
  //     // api example
  //     try {
  //         let res = await api.getPackage({id:this.id})
  //         console.log(res)
  //     } catch (err) {
  //         console.log(err)
  //     }
  // }

/*  ====================================================== */



/* 初始化页面 */
  mounted () {
   this.getuser();
  }
  
/* get */
   getuser(){
  api.getPackage({id:this.id})
      .then(res=>{
        console.log('get', res);
        this.user=res[0];})
        .catch(err=>{console.log('err',err); })

        // this.$refs.otherComponent.onClick() /* 调用子组件方法 */
         this.childMsg=this.$refs.otherComponent.msgs  /* 取子组件的值 */
  }
  // dynamic component
  $refs!: {
    otherComponent: other
  }

   changeEvent(value){
    this.childMsg1=value;
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



