import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

export default {
    CspOrder: {
        getCspOrderList: function (
            orderId: string,
            status: string,
            startTime: string,
            endTime: string,
            startAddress: string,
            endAddress: string,
            skip: number,
            count: number,
            clientOrderId:string
        ) {
            return Get("CspOrder/getCspOrderList?orderid=" + orderId + "&status=" + status + "&starttime=" + startTime + "&endtime=" + endTime + "&startaddress=" + startAddress + "&endaddress=" + endAddress + "&skip=" + skip + "&count=" + count + "&ClientOrderId=" + clientOrderId,{})
        },
        getCspOrder: function (id) {
            return Get("CspOrder/getCspOrder/" + id,{})
        },
        addCspOrder: function (obj) {
            return Post("CspOrder/addCspOrder",obj)
        },//attention
        editCspOrder: function (id) {
            return Put("CspOrder/editCspOrder/" + id,{})
        },
        deleteCspOrder: function (id) {
            return Delete("CspOrder/deleteCspOrder/" + id,{})
        },
        getCspOrderCount:function(){
            return Get("CspOrder/GetCspOrderCount",{})
        }
    },
}
