import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import './nav.scss'
declare var $:any;
@Component({
    name:'app-nav',
    template: require('./nav.html'),
  })
export default class nav extends Vue {
  
   mounted(){
    $('.auto').click(function(e){
      $(this).parent().toggleClass('active');
      $(this).parent().siblings(".active").removeClass('active');
      $(this).siblings('.nav-sub').children('li').eq(0).addClass('active');
      $(this).parent().siblings().children('.nav-sub').children('li').removeClass('active');
    })
   }

}