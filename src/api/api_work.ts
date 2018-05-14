import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

// ax.defaults.baseURL='http://192.168.1.107:777/csp/';
ax.defaults.baseURL = "http://192.168.1.205:5000/csp/"
export default {
  Work:{
    getInquiryCount : function () {
        return Get("Inquiry/GetInquiryCount",{})
    },
    getInquiryStatus : function () {
        return Get("Inquiry/GetInquiryStatistics",{})
    },
    getOrderCount : function () {
        return Get("GetCount/getOrderCount",{})
    },  
    getOrderStatus : function () {
        return Get("Order/GetOrderStatistics",{})
    },
    getCount:function(){
        return Get("GetCount/GetInquiryManager",{})
    }
}
}
