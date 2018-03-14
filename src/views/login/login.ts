import  Component  from 'vue-class-component';
import Vue from 'vue'
import template from './login.vue'
declare var bootbox:any;
declare var $:any;

@Component({
  name:'template',
  mixins: [template]
})
export default class login extends Vue {
  message:string="hello vue";
  msg: string = 'Hello! dingxiaolin'

  onClick (): void {
    $('.btn').html('dxl');
    bootbox.alert(this.msg);
  }
  created (){
    this.$http.get('http://web.dingxiaolin.com/api/mail/view').then(data=>{
      console.log('data',data);
    })
  }

}