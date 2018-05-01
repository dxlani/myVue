import './footer.css'
// import template from './footer.vue'
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
declare var $:any;
@Component({
    name:'app-footer',
    template: require('./footer.html'),
  }) 
export  default class footer extends Vue {
    title:string='Copyright 2018 DXL';

   author:string=this.$store.state.author
   
   

    
}
