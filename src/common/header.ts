import  Component  from 'vue-class-component'
import Vue from 'vue'
import template from './header.vue'
declare var $:any;
@Component({
    name:'app-header',
    mixins: [template],
    props:['title']
  })
export default class header extends Vue {
 
 
}