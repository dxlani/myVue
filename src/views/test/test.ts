import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
declare var bootbox:any;
declare var $:any;
import axios, { AxiosResponse } from 'axios'
@Component({
  name:'test',
  template: require('./test.html'),
})
export default class test extends Vue {
  msg: string = 'this is test';
  onClick (): void {
    bootbox.alert(this.msg);
  }
  list={};
  created (){
   
  }

}