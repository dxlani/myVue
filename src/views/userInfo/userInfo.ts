
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import api_login from '../../api/api_login'
import pagination from '../../components/pagination'
import VeeValidate,{ Validator } from 'vee-validate'
 Vue.use(VeeValidate);

 Validator.extend('phone', {
    getMessage: (field, [args]) => `请输入正确的手机号码`,
    validate: (value, [args]) =>{
        const reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
        return reg.test(value) 
    }  
});

 import './userInfo.scss'
declare var $: any;
declare var bootbox: any;
// import template from './userInfo.vue'
@Component({
    template: require('./userInfo.html'),
    // mixins: [template],
})

export default class UserInfoComponent extends Vue{
    loginName="";
    loginPassword="";


    //v-model初始化
    userName:string="";
    userGroupName:string="";
    userPassword:string="";
    rUserPassword:string="";
    rUserPasswordAgain:string="";
    cName:string = "";
    vPassword:string = "";
    editCount:number = null;

    mounted(){
        this.userName = window.sessionStorage.getItem("userName");
        this.userGroupName="客户单位";
        this.userPassword='';
        this.rUserPassword='';
        this.rUserPasswordAgain='';
        this.cName = this.userName;
        this.vPassword = '';

        //获取用户名修改次数
        api_login.User.getEditUserNameCount().then((res)=>{
            this.editCount = res.editUserNameCount;
        });
    }

    save(){
        api_login.User.updatePassword(this.userPassword,this.rUserPassword,this.rUserPasswordAgain).then((res)=>{
            if(res&&res.success!==true){
                bootbox.alert(res.errorMessage);
            }else{
                bootbox.confirm("密码修改成功，请重新登陆！",()=>{
                    // if(result){
                        this.$router.push('/login');
                    // }
                });
            }
        });
    }

    saveName(){
        api_login.User.updateUserName(this.cName,this.vPassword).then((res)=>{
            // if(res&&res.success!==true){
            //     bootbox.alert(res.errorMessage);
            // }else{
            //     bootbox.confirm("用户名修改成功，请重新登陆！",()=>{
            //         this.$router.push('/login');
            //     });
            // }
            if(res.success){
                bootbox.confirm("用户名修改成功，请重新登陆！",()=>{
                    this.$router.push('/login');
                });
            }
        });
    }
}