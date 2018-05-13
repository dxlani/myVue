import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

// ax.defaults.baseURL='http://192.168.1.107:777/csp/';
ax.defaults.baseURL = "http://192.168.1.205:5000/csp/"
export default {
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
}
}
