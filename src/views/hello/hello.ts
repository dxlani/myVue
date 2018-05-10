import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
declare var bootbox:any;
declare var $:any;
import axios, { AxiosResponse } from 'axios'
@Component({
  name:'hello',
  template: require('./hello.html'),
})
export default class hello extends Vue {
  message:string="hello vue";
  msg: string = 'Hello! dingxiaolin';
  onClick (): void {
    $('.btn').html('dxl');
    bootbox.alert(this.msg);
  }
  list={};
  created (){
    /* npm install --save-dev @types/axios 安装声明文件，结构声明就可以不用写啦 */
    axios.get('https://jsonplaceholder.typicode.com/posts/1').then(res=>{
      console.log('data',res.data);
      this.list=res.data;
    }).catch(err=>{
      console.log('err',err);
    })
  }

}