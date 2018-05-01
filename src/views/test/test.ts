import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import './test.css'
// import Datatable from 'vue2-datatable-component'
declare var bootbox:any;
declare var $:any;

@Component({
  name:'test',
  // mixins: [template]
  template: require('./test.html'),
})
export default class test extends Vue {
  message:string="这是第二个模板页面";
  msg: string = 'Hello! test'

  onClick (): void {
    $('.btn').html('test');
   bootbox.alert(this.msg);
  }
}