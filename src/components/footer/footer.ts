import './footer.css'
// import template from './footer.vue'
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
declare var $:any;
@Component({
    name:'app-footer',
    template: require('./footer.html'),
    // computed: {
    //   author () {
    //     return this.$store.state.author
    //   }
    // },
     props:{title:String,year:String}
  }) 
export  default class footer extends Vue {
  constructor() {
    super();
  }


  //computed 属性
  get author () {
    return  this.$store.state.author
  }
  //  @Prop({ default: '啦啦啦' })
  //  title: string=""
  
  // @Emit()
  // addToCount(n: number){ this.count += n }

  // @Emit('reset')
  // resetCount(){ this.count = 0 }

  // @Inject() foo: string
  // @Inject('bar') bar: string
  // @Inject(s) baz: string

  // @Model('change') checked: boolean

  // @Prop()
  // propA: number

 

  // @Prop([String, Boolean])
  // propC: string | boolean

  // @Provide() foo = 'foo'
  // @Provide('bar') baz = 'bar'

  // @Watch('child')
  // onChildChanged(val: string, oldVal: string) { }

  // @Watch('person', { immediate: true, deep: true })
  // onPersonChanged(val: Person, oldVal: Person) { }
    
}
