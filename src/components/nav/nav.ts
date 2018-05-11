import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import './nav.css'
declare var $:any;
@Component({
    name:'app-nav',
    template: require('./nav.html'),
  })
export default class nav extends Vue {
  
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
  tohello(){
    // router.push("./login")  /* 不行？ */
    this.$router.push("./hello")
    
  }
}