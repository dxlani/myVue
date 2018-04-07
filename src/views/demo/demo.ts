import  Component  from 'vue-class-component';
import { VueComponent, Prop, Watch } from 'vue-typescript'
import Vue from 'vue'
import template from './demo.vue'
declare var bootbox:any;
declare var $:any;
@Component({
  name:'demo',
  mixins: [template]
})
export default class demo extends Vue {
  message:string="这是一个名片";
  data(){
    return {
      users:[
        {name:"丁晓林",position:'WEB前端',programe:"CSP",show:false},
        {name:"陈娟",position:'WEB前端',programe:"CSP",show:false},
        {name:"姚正发",position:'技术总监',programe:"PM",show:false},
        {name:"吕斌",position:'产品总监',programe:"PM",show:false},
        {name:"赵健",position:'前端组长',programe:"CCP",show:false},
        {name:"相鹏",position:'后端',programe:"CSP",show:false},
        {name:"刘飞",position:'后端',programe:"CSP",show:false},
      ]
    }
  }
}
