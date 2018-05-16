import { Post, Get, Patch, Put, Delete,ax} from '../http/http'
export default {
   /* login */
   User: {
    login: function (data) {
        return Post('User/login',data)
    },
    contract:function(){
        return Get("User/GetIsContract",{})
    },
    updatePassword: function(oldPassword, password, rePassword){
        return Put("User/updatepassword",{
            oldPassword: oldPassword,
            password: password,
            rePassword: rePassword
        });
    },
    updateUserName: function(newUserName, oldPassword){
        return Post("User/UpdateUserName",{});
    },
    getEditUserNameCount: function(){
        return Get("User/GetEditUserNameCount",{})
    },
    GetUserInfo: function (OpenId) {
        return Get("User/GetUserInfo?openid=" + OpenId,{});
    },
    LogOutOpenid: function (OpenId) {
        return Get("User/LogOutOpenid?openid=" + OpenId,{});
    },
    GetOpenidForCode: function (code) {
        return Get("User/GetOpenidForCode?code=" + code,{});
    },
    getCode:function(phone){
        return Get("User/GetCode?phoneNum=" + phone,{});
    },
    wechartLogin:function(phone,code,openId){
        return Get("User/WeChartLogin?PhoneNum=" + phone + "&Code=" + code + "&OpenId=" + openId,{});
    },
    autoLogin:function(openId){
        return Get("User/AutoLogin?OpenID=" + openId,{});
    }
}
}

