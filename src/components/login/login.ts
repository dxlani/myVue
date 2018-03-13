import  Component  from 'vue-class-component';
import Vue from 'vue'

@Component({
  template: '<button @click="onClick">Click!</button>'
})
export default class login extends Vue {
 
  msg: string = 'Hello! dingxiaolin'

  onClick (): void {
    window.alert(this.msg)
  }
}