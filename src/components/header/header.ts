import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
 import './header.css'
 //import template from './header.vue'
declare var $:any;
@Component({
    name:'app-header',
     template: require('./header.html'),
   // mixins: [template],
     props:['title'],
  })
export default class header extends Vue {
  inputTXT:string="";
  // @Prop()
  // propA: number = 1

  // @Prop({ default: 'default value' })
  // propB: string

  // @Prop([String, Boolean])
  // propC: string | boolean

  // @Prop({ type: null })
  // propD: any

  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }
    setauthor(){
      this.$store.state.author = this.inputTXT;
      this.$store.state.token = this.inputTXT;
      console.log('aa',this.inputTXT,this.$store.state.author)
    }

}