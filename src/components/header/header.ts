import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import './header.css'
declare var $:any;
@Component({
    name:'app-header',
     template: require('./header.html'),
    //  props:['title'],
  })
export default class header extends Vue {
  app={
    name:"飓风物流客户服务平台"
};
arrow:boolean=true;
  mounted(){
   this.changeDedentIcon();
  }
  changeDedentIcon(){
    if(this.arrow){
      this.arrow=false;
      $('.body').removeClass('app-aside-folded');
    }else if(!this.arrow){
      this.arrow=true;
      $('.body').addClass('app-aside-folded');
    }
  }

  get userName(){
      return  sessionStorage.getItem('userName');
  }
}
