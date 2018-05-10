import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
declare var bootbox:any;
declare var $:any;
import axios, { AxiosResponse } from 'axios'
@Component({
  name:'other',
  template: require('./other.html'),
})
export default class other extends Vue {
  msg: string = 'this is other';
  onClick (): void {
    bootbox.alert(this.msg);
  }
  list={};
  created (){
   
  }

}