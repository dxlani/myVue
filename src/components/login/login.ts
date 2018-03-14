import  Component  from 'vue-class-component';
import Vue from 'vue'
import template from './login.vue'
declare var bootbox:any;
declare var $:any;

@Component({
  // template: '<button class="btn btn-sm btn-danger" @click="onClick">Click!</button>'
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
}