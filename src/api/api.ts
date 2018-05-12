import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

// ax.defaults.baseURL='http://192.168.1.107:777/csp/';
ax.defaults.baseURL = "http://192.168.1.205:5000/csp/"
export default {
    getPackage(data) {
        return Get('posts',data)
    },
    postPackage(data) {
        return Post('posts',data)
    },
    patchPackage(data) {
        return Patch('posts/1',data)
    },
    putPackage(data) {
        return Put('posts/1',data)
    },
    deletePackage(data) {
        return Delete('posts/1')
    },
/* ================================ */
   /* login */
   User: {
    login: function (data) {
        return Post('User/login',data)
    },
    contract:function(data){
        return Get("User/GetIsContract",data)
    },
    updatePassword: "User/updatepassword",
    updataUserName: function(){
        return "User/UpdateUserName"
    },
    getEditUserNameCount: function(){
        return "User/GetEditUserNameCount"
    },
    GetUserInfo: function (OpenId) {
        return "User/GetUserInfo?openid=" + OpenId;
    },
    LogOutOpenid: function (OpenId) {
        return "User/LogOutOpenid?openid=" + OpenId;
    },
    GetOpenidForCode: function (code) {
        return "User/GetOpenidForCode?code=" + code;
    },
    getCode:function(phone){
        return "User/GetCode?phoneNum=" + phone;
    },
    wechartLogin:function(phone,code,openId){
        return "User/WeChartLogin?PhoneNum=" + phone + "&Code=" + code + "&OpenId=" + openId;
    },
    autoLogin:function(openId){
        return "User/AutoLogin?OpenID=" + openId;
    }
},
  Work:{
    getInquiryCount : function (data) {
        return Get("User/GetIsContract",data)
    },
    getInquiryStatus : function (data) {
        return Get("Inquiry/GetInquiryStatistics",data)
    },
    getOrderCount : function (data) {
        return Get("GetCount/getOrderCount",data)
    },  
    getOrderStatus : function (data) {
        return Get("Order/GetOrderStatistics",data)
    },
    getCount:function(data){
        return Get("GetCount/GetInquiryManager",data)
    }
},
}
