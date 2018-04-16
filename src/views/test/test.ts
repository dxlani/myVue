import  Component  from 'vue-class-component';
import Vue from 'vue'
import template from './test.vue'
import Datatable from 'vue2-datatable-component'
declare var bootbox:any;
declare var $:any;

@Component({
  name:'test',
  mixins: [template]
})
export default class test extends Vue {
  message:string="这是第二个模板页面";
  msg: string = 'Hello! test'

  onClick (): void {
    $('.btn').html('test');
   bootbox.alert(this.msg);
  }
}