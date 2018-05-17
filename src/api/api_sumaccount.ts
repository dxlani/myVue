import { Post, Get, Patch, Put, Delete,ax} from '../http/http'

export default {
    CheckFinance:{
        /* 获取对账列表 */
        GetOrderFinceList:function(
            startTime: string,
            endTime: string,
            goodsName: string,
            originAddress: string,
            destinationAddress: string,
            goodsTypeName: string,
            orderNumber: string,
            receiptStatus: number,
            skip: number,
            count: number
        ){
            return Get("CheckFinance/GetOrderFinceList?startTime=" + startTime + "&endTime=" +endTime+ "&GoodsName=" + goodsName + "&OriginAddress=" + originAddress + "&DestinationAddress=" + destinationAddress + "&GoodsTypeName=" + goodsTypeName  + "&OrderNumber=" + orderNumber + "&ReceiptStatus=" + receiptStatus +  "&skip=" + skip + "&count=" + count,{});
        },
        /* 获取费用合计 */
        GetPriceTotle:function(
            startTime: string,
            endTime: string,
            GoodsName: string,
            OriginAddress: string,
            DestinationAddress: string,
            goodsTypeName: string,
            orderNumber: string,
            receiptStatus: number
        ){
            return Get("CheckFinance/GetPriceTotle?startTime=" + startTime + "&endTime=" +endTime+ "&GoodsName=" + GoodsName + "&OriginAddress=" + OriginAddress + "&DestinationAddress=" + DestinationAddress + "&GoodsTypeName=" + goodsTypeName  + "&OrderNumber=" + orderNumber + "&ReceiptStatus=" + receiptStatus,{});  
        },
        /* 导出报表 */
        GetOrderFinceExport: function (
            LogisticsCompanyId: string,
            clientId: string,
            startTime: string,
            endTime: string,
            GoodsName: string,
            OriginAddress: string,
            DestinationAddress: string,
            goodsTypeName: string,
            orderNumber: string,
            receiptStatus: number,
            skip: number,
            count: number
        ) {
            
            return (window.location.href = "CheckFinance/GetOrderFinceExport?LogisticsCompanyId=" + LogisticsCompanyId +"&clientId="+ clientId+ "&startTime=" + startTime + "&endTime=" +endTime+ "&GoodsName=" + GoodsName + "&OriginAddress=" + OriginAddress + "&DestinationAddress=" + DestinationAddress + "&GoodsTypeName=" + goodsTypeName  + "&OrderNumber=" + orderNumber + "&ReceiptStatus=" + receiptStatus + "&skip=" + skip + "&count=" + count,{});
        },
        GetOrderReceivableList: function(id:string) {
            return Get("CheckFinance/GetOrderReceivableList/" + id,{})
        },
        getReceiveableFee:function(){
            return Get("CheckFinance/GetReceiveableFee",{})
        },
        getOrder: function (id: string) {
            return Get("Order/getOrder/" + id,{})
        }
    }
}