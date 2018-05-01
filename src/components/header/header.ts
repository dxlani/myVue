import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
declare var $:any;
@Component({
    name:'app-header',
    template: require('./header.html'),
    // mixins: [template],
    // props:['title']
  })
export default class header extends Vue {
  
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
}