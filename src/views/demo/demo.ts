import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import './demo.css'  
declare var bootbox:any;  
declare var $:any;
@Component({
  name:'demo',
  template: require('./demo.html'),
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
