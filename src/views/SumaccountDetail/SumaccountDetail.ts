import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import api_sumaccount from '../../api/api_sumaccount'
import './SumaccountDetail.scss'

declare var $: any;
declare var bootbox: any;

@Component({
    template: require('./SumaccountDetail.html'),
})

export default class SumaccountDetailComponent extends Vue{
    //总线路货物信息
    columns = ['shipAddress', 'viaAddress', 'deliveryAddress', 'shipTime', 'arriveTime',  'goodsTypeName', 'goodsName', 'goodsNum']
    totalData1 = []
    options = {
        texts: {
            noResults: '暂无数据',
        },
        orderBy: {
            ascending:true      
        },
        headings: {
            shipAddress: "发货地址",
            viaAddress: "中转地",
            deliveryAddress: "送货地址",
            shipTime: "发货时间",
            arriveTime: "到货时间",
            goodsTypeName: "货物类别",
            goodsName: "货物名称",
            goodsNum: "货物数量",
        },
    }; 
    
    
    //子线路货物信息
    columns2 = ['shipAddress', 'viaAddress', 'deliveryAddress', 'shipTime', 'arriveTime',  'goodsType', 'goodsName', 'goodsNum']
    orderChildData = []
    options2 = {
        texts: {
            noResults: '暂无数据',
        },
        orderBy: {
            ascending:true      
        },
        headings: {
            shipAddress: "发货地址",
            viaAddress: "中转地",
            deliveryAddress: "送货地址",
            shipTime: "发货时间",
            arriveTime: "到货时间",
            goodsType: "货物类别",
            goodsName: "货物名称",
            goodsNum: "货物数量",
        },
    };

    //线路费用信息
    columns3 = ['goodsnumber', 'goodsType', 'oneprice', 'totalprice', 'arriveAddress',  'deliveryAddress', 'goodsName', 'goodsNum','goodsstatus']
    orderChildData2 = []
    options3 = {
        texts: {
            noResults: '暂无数据',
        },
        orderBy: {
            ascending:true      
        },
        headings: {
            goodsnumber: "费用编号",
            goodsType: "费用类别",
            oneprice: "单价",
            totalprice: "总价",
            arriveAddress: "发货地址",
            deliveryAddress: "送货地址",
            goodsName: "货物名称",
            goodsNum: "货物数量",
            goodsstatus: "结算状态",
        },
    };

    // 获取中转地
    getViaAddress = function (viaList) {
        var addre = "";
        if(viaList.length != 0){
            for (var i = 0; i < viaList.length; i++) {
                addre = addre + (viaList[i].province + viaList[i].city + viaList[i].county)
                if (i != viaList.length - 1) {
                    addre += "；";
                }
            }
            return addre;
        } else { return }
    }

    //点击并缩放图片
    bigPic(picFile){
        this.picPath = '';
        this.picPath = picFile.path; 
        this.bbImg();
    } 
    //回单图片放大缩小
    bbImg(){
        var oImg=document.getElementById("orderManageDetail_receiptPic");
        fnWheel(oImg,function (down,oEvent){
            var oldWidth=this.offsetWidth;
            var oldHeight=this.offsetHeight;
            var oldLeft=this.offsetLeft;
            var oldTop=this.offsetTop;

            var scaleX=(oEvent.clientX-oldLeft)/oldWidth;//比例
            var scaleY=(oEvent.clientY-oldTop)/oldHeight;

            if (down){
                this.style.width=this.offsetWidth*0.9+"px";
                this.style.height=this.offsetHeight*0.9+"px";
            }
            else{
                this.style.width=this.offsetWidth*1.1+"px";
                this.style.height=this.offsetHeight*1.1+"px";
            }
            var newWidth=this.offsetWidth;
            var newHeight=this.offsetHeight;
            this.style.left=oldLeft-scaleX*(newWidth-oldWidth)+"px";
            this.style.top=oldTop-scaleY*(newHeight-oldHeight)+"px";
        });
        function fnWheel(obj,fncc){
            obj.onmousewheel = fn;
            if(obj.addEventListener){
                obj.addEventListener('DOMMouseScroll',fn,false);
            }
            function fn(ev){
                var oEvent = ev || window.event;
                var down = true;
                if(oEvent.detail){
                    down = oEvent.detail>0
                }else{
                    down = oEvent.wheelDelta<0
                }
                if(fncc){
                    fncc.call(this,down,oEvent);
                }
                if(oEvent.preventDefault){
                    oEvent.preventDefault();
                }
                return false;
            }
        }
    }
    //下载回单照片
    downLoadReceiptPic(imgId) {
        // window.location.href = dataService().baseUrl+ "Attachment/getAttachment/"+ imgId;
    }

    //v-model初始化
    id: string ;
    orderDetail = [];
    viaAdd: string = '';
    status: string = "";  
    viaAddressChild: string = '';
    /** 回单信息显示隐藏*/
    receiptshow:boolean = false;
    /**
     * 回单照片
     */
    receiptPicList = [];
    picPath:string = '';
    
     ready() {
        this.id = this.$route.query.id;
        /**是否显示回单附件图片 */
        this.receiptshow = false;
        this.receiptPicList = [];
        
        api_sumaccount.CheckFinance.getOrder(this.id).then((res) => {
            //订单数据
            this.orderDetail = res;
            //总线路列表数据          
            this.viaAdd = this.getViaAddress(res.viaAddressList);
            var orderTotalList = {
                shipAddress: res.originAddress,
                viaAddress: this.viaAdd,
                // deliveryAddress: res.destinationAddress,
                deliveryAddress: res.destinationAddress,
                shipTime: res.shipTime,
                arriveTime: res.arriveTime,
                goodsTypeName: res.goodsTypeName,
                goodsName: res.goodsName,
                goodsNum: res.goodsNum + res.goodsNumUnitStr,
            }
            this.totalData1 = [orderTotalList]
            //回单照片
            //回单信息显示隐藏         
            res.items.forEach((item, index) => {
                var receiptPicSave = [];
                if(item.receiptList.length>0){
                    item.receiptList.forEach((itemC, indexC) => {
                        /**后台是否能访问isExists */
                        if(itemC.isExists){
                            receiptPicSave.push(itemC);
                        }
                    });
                    if(receiptPicSave.length>0){
                        /**是否显示回单附件图片 */
                        this.receiptshow = true;
                    }
                }
                this.receiptPicList.push(receiptPicSave);
            })


            //子线路列表数据
            var orderChildList = [];
            for (var i = 0; i < res.items.length; i++) {
                var orderChild = res.items[i];
                orderChildList[i] = {
                    shipAddress: orderChild.originAddress,
                    viaAddress: this.getViaAddress(orderChild.viaList),
                    deliveryAddress: orderChild.destinationAddress,
                    shipTime: orderChild.deliveryTime,
                    arriveTime: orderChild.arrivalTime,
                    goodsType: orderChild.goodsTypeName ,
                    goodsName: orderChild.goodsName,
                    goodsNum: orderChild.quantityOfGoods + orderChild.goodsUnitStr,
                }
            }
            this.orderChildData = orderChildList;
        }, (rej) => {});

        api_sumaccount.CheckFinance.GetOrderReceivableList(this.id).then((res) => {
            var receiveList =[];
            for (var j = 0; j < res.data.length; j++) {
                var goodsNum = res.data[j].realQuantityOfGoods;
                var goods = "";
                if(goodsNum){
                    goods = goodsNum.replace(/\.?0{1,5}$/,'')+res.data[j].goodsUnit;
                }
                var priceUnit = res.data[j].receivablePriceUnit;
                if(priceUnit === "未知"){
                    priceUnit = "";
                }
                receiveList[j] = {
                    goodsnumber : res.data[j].receivableCode,
                    goodsType : res.data[j].feeType,
                    oneprice :  res.data[j].receivablePrice == null?'--':res.data[j].receivablePrice + priceUnit, 
                    totalprice : res.data[j].receivableTotalPrice == null?'--':res.data[j].receivableTotalPrice +"元",
                    arriveAddress :res.data[j].originAddress,
                    deliveryAddress : res.data[j].destinationAddress,
                    goodsName : res.data[j].goodsName,
                    goodsNum : goods,
                    goodsstatus : res.data[j].settleStatus
                };
                this.orderChildData2 = receiveList;
            }
        },(rej) => {})
    }
}