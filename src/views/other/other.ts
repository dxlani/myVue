import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
declare var bootbox:any;
declare var $:any;
import axios, { AxiosResponse } from 'axios'
@Component({
  name:'other',
  template: require('./other.html'),
})
export default class other extends Vue {
   msgs: string = '父组件调用了子组件的值';
  onClick (): void {
    bootbox.alert(this.msgs);
  }
  list={};
  created (){
   
  }
  // @Prop({ default: 'World' })
  // private msg: string='this is other'
 change(){
  this.$emit('c1','changeMSG');
  }
}