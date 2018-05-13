import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
// import axios, { AxiosResponse } from 'axios'
import api_login from '../../api/api_login'
import './login.scss'
declare var bootbox:any;
declare var $:any;

@Component({
  name:'login',
  template: require('./login.html'),
})
export default class login extends Vue {

  authError=""
  user={
      weChatOpenid:"",
      userName:"",
      password:"",
      remenber:false
  }
  id: string= "";
  /**wilddogUrl */
  wilddogUrl:string="";
  /**Csp版本号 */
  versionCsp:string = "";
  /**是否显示更新说明 */
  isShow: any;
  mounted(){
    
    this.versionCsp = "V18-0312";
    // this.wilddogUrl = dataService().wilddogUrl;
    this.authError="";

  
}
login(){
    if($('#login_loginBtn').hasClass('disabled')){
        return;
    }
    var loginData;
    api_login.User.login(this.user).then(res=>{
        console.log('res',res);
        let result=res;
        // if(!(res&&res.jwtToken)){
        //     bootbox.alert('请输入正确的用户名和密码');
        //     return;
        // }
        loginData=result;
        window.sessionStorage.setItem("logined","yes");
        var userInfo=JSON.stringify(loginData);
        window.sessionStorage.setItem("userInfo",userInfo);
        window.sessionStorage.setItem("isContract",loginData.isContract);
        window.sessionStorage.setItem("userName",result.userName);

            if(loginData.isContract){
               this.$router.push('/app/home');
            }else{
                $('#myModal').modal({
                    keyboard: false,
                    backdrop:"static"
                });
            }
          
        // });
    },function(err){
        console.log(err)
    })
  
    
};


getInquiryList(){
    // dataService().Inquiry.getInquiryList();
}
package:string = 'vue-typescript';
repo:string = 'https://github.com/itsFrank/vue-typescript';
/* 协议 同意 */
agree(){
    /* api */
    api_login.User.contract().then((res)=>{
        console.log('res2',res)
    if(res.success){
        $('#myModal').modal('hide');
        window.sessionStorage.setItem("isContract",'true');
        this.$router.push('/app/home');
    }
    })
}

    /* 协议 不同意 */
    disagree(){
        $('#myModal').modal('hide');
        window.sessionStorage.removeItem("logined");
        window.sessionStorage.removeItem("userInfo");
        window.sessionStorage.removeItem("isContract");
        window.sessionStorage.removeItem("userName");
        this.$router.push('/login');
    }
}

