import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
declare var bootbox:any;
declare var $:any;
import axios, { AxiosResponse } from 'axios'
@Component({
  name:'login',
  template: require('./login.html'),
})
export default class login extends Vue {
  message:string="hello vue";
  msg: string = 'Hello! dingxiaolin';
  onClick (): void {
    $('.btn').html('dxl');
    bootbox.alert(this.msg);
  }
  created (){
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then(res=>{
      console.log('data',res.data);
    }).catch(err=>{
      console.log('err',err);
    })
  }

}