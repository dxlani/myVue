import  Component  from 'vue-class-component';
import Vue from 'vue'
// import "./login.css";
declare var bootbox:any;
declare var $:any;

@Component({
  template: '<button class="btn btn-sm btn-danger" @click="onClick">Click!</button>'
})
export default class login extends Vue {
 
  msg: string = 'Hello! dingxiaolin'

  onClick (): void {
    $('.btn').html('dxl');
   bootbox.alert(this.msg);
  }
}