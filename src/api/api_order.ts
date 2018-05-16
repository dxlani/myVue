import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

export default {
    Order: {
        getOrderList: function (orderid, status, deliverybegin, deliveryend, deliveryStartTime, deliveryEndTime, origin, destination, skip, count, receiptStatus,clientOrderId) {
            return Get("Order/getOrderList?orderid=" + orderid + "&status=" + status + "&orderBegin=" + deliverybegin + "&orderEnd=" + deliveryend + "&deliverybegin=" + deliveryStartTime + "&deliveryEnd=" + deliveryEndTime + "&origin=" + origin + "&destination=" + destination
             + "&skip=" + skip + "&count=" + count + "&receiptStatus=" + receiptStatus + "&ClientOrderId=" + clientOrderId,{})
        },
        getOrder: function (id) {
            return Get("Order/getOrder/" + id,{})
        },
        getOrderListExport: function (logisticsCompanyId,clientId,orderId, status, orderBegin, orderEnd, origin,  destination, deliverybegin, deliveryend, skip, count, receiptStatus,clientOrderId) {
            return  window.location.href =ax.defaults.baseURL+"Order/GetOrderListExport?LogisticsCompanyId=" + logisticsCompanyId  + "&clientId=" + clientId  + "&orderid=" + orderId + "&status=" + status + "&orderbegin=" + orderBegin + "&orderend=" + orderEnd  + "&origin=" + origin + "&destination=" 
                    + destination + "&deliverybegin=" + deliverybegin + "&deliveryend=" + deliveryend + "&skip=" + skip + "&count=" + count + "&ReceiptStatus=" + receiptStatus + "&ClientOrderId=" + clientOrderId;
        },
        getOrderCount:function(){
            return Get("Order/GetOrderCount",{})
        },
        uploadexcel:function(formdata){
            return Post("CspOrder/uploadexcel",formdata)
        },
        getTemplate:function(){
            return "ExportTemplate/GetTemplate"
        },
        addExcelData:function(){
            return "CspOrder/AddExcelData"
        }
    },
     Location :{
        getLocation: function (phone) {
            return Get("Location/getLocation?phone=" + phone,{});
        },
        GetAddressToPositionDetail: function (id,OriginAddress,DestinationAddress) {
            return  Get("Location/GetAddressToPositionDetail?id=" + id + "&OriginAddress" + OriginAddress + "&DestinationAddress" + DestinationAddress,{});
        },
        GetLocationList: function (id) {
            return  Get("Location/GetLocationList?id=" + id,{});
        },
        CheckOrderIsLocating: function (id) {
            return  Get("Location/CheckOrderIsLocating?id=" + id,{});
        },
        getBDNPLotion: function(carCode){
            return  Get("Location/getBeidouLocation?carCode=" + carCode,{});
        },
        getHistoryPosition: function(carCode){
            return  Get("Location/GetHistoryPosition?carCode=" + carCode,{});
        }
    }
}


