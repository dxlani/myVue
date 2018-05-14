import { Post, Get, Patch, Put, Delete,ax} from '../http/http'
export default {
  Work:{
    getInquiryCount : function () {
        return Get("GetCount/getInquiryCount",{})
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
