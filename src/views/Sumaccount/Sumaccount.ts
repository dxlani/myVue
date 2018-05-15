import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import api_sumaccount from '../../api/api_sumaccount'
import pagination from '../../components/pagination'
import './Sumaccount.scss'

declare var $: any;
declare var bootbox: any;

@Component({
    template: require('./Sumaccount.html'),
    components:{
        pagination
    },
})

export default class Sumaccount extends Vue {
    el: '#sumaccount'
    records:number=1;
    skip:number;
    count:number;
    seeks = true;
    /**
     * 总计费用
     */
    priceTotal: number = 0;
    /**
     * 物流公司编号
     */
    logisticsId:string='';
    /**
     * 客户单位id
     */ 
    clientId:string='';
    /**
     * 回单状态枚举
     */
    receiptStatusList=[
        {text:"全部", value:""},
        {text:"无回单", value:"1"},
        {text:"回单待回", value:"2"},
        {text:"回单部分已回", value:"3"},
        {text:"回单已回", value:"4"},
    ]
    /**
     * 查询条件
     */
    checkQuery = {
        startTime: '',
        endTime: '',
        goodsType:'',
        goodsName: '',
        originAddress: '',
        destinationAddress: '',
        orderNumber:'',
        receiptStatus:'',
    }
    
    mounted () {
        let routerName = this.$route.path;
        if(window.localStorage.getItem(String(routerName))){
            this.checkQuery = JSON.parse(window.localStorage.getItem(String(routerName)))
        }else{
            this.checkQuery = {
                startTime: '',
                endTime: '',
                goodsType:'',
                goodsName: '',
                originAddress: '',
                destinationAddress: '',
                orderNumber:'',
                receiptStatus:this.receiptStatusList[0].value
            }
        }
        if(window.localStorage.getItem(String(routerName + 'Page'))){
            let pageData = JSON.parse(window.localStorage.getItem(String(routerName + 'Page')));
            this.skip = pageData.skip;
            this.count = pageData.count;
        }else{
            this.skip = 0;
            this.count = 10;
        } 
       
        this.$on('pageIndexChange', function (event) {
            this.count = event.pageSize;
            this.skip = event.pageIndex;
            this.currentPage = event.currentPage;
            this.localPage(this.skip,this.count,this.currentPage)
            this.load(this.skip, this.count);
        });

        $('#sumaccount_startTime').datetimepicker();
        $('#sumaccount_endTime').datetimepicker();

        var $table = $('#sumaccount_table').bootstrapTable({
            dataField: "rows",
            pagination: false,
            sidePagination: "client",
            buttonsAlign: "left",
            columns: [
                { field: "deliveryTime", title: "发货日期", sortable: false, },
                { field: "originAddress", title: "发货地址", sortable: false, },
                { field: "destinationAddress", title: "送货地址", sortable: false, },
                { field: "goodsTypeName", title: "货物类别", sortable: false, },
                { field: "goodsName", title: "货物名称", sortable: false, },
                { field: "realQuantityOfGoods", title: "货物数量", sortable: false, },
                { field: "orderNumber", title: "发货单号", sortable: false, formatter:function operateFormatter(value,row,index){
                    var orderNumber;
                    if(!row.orderNumber){
                        orderNumber = "--";
                    }else{
                        orderNumber = row.orderNumber;
                    }
                    return orderNumber;
                }},
                { field: "receiptStatus", title: "回单状态", sortable: false, },
                { field: "carCode", title: "车牌号", sortable: false, },
                { field: "carLength", title: "车长", sortable: false, },
                {field:"freightinglePr",title:"运费单价",formatter:function operateFormatter(value,row,index){
                    var freightinglePr="";
                    if(row.freightinglePrice == 0){
                        freightinglePr = '--'
                    }else{
                        freightinglePr =row.freightinglePrice+row.freightinglePriceUnit;
                    }
                    return freightinglePr;
                }},
                { field: "freightTotalPrice", title: "运费总价", sortable: false, formatter:function operateFormatter(value,row,index){
                    var freightTotalPrice="";
                    if(row.freightTotalPrice == null){
                        freightTotalPrice = '--'
                    }else{
                        freightTotalPrice =row.freightTotalPrice + "元";
                    }
                    return freightTotalPrice;
                }
                },
                { field: "intoWarehouseCost", title: "进仓费", sortable: false, formatter:function operateFormatter(value,row,index){
                    var intoWarehouseCost="";
                    if(row.intoWarehouseCost == null){
                        intoWarehouseCost = '--'
                    }else{
                        intoWarehouseCost =row.intoWarehouseCost + "元";
                    }
                    return intoWarehouseCost;
                }
                },
                { field: "unloadingCharge", title: "卸车费", sortable: false, formatter:function operateFormatter(value,row,index){
                    var unloadingCharge="";
                    if(row.unloadingCharge == null){
                        unloadingCharge = '--'
                    }else{
                        unloadingCharge =row.unloadingCharge + "元";
                    }
                    return unloadingCharge;
                }
                },
                { field: "shortBargeCost", title: "短驳费", sortable: false, formatter:function operateFormatter(value,row,index){
                    var shortBargeCost="";
                    if(row.shortBargeCost == null){
                        shortBargeCost = '--'
                    }else{
                        shortBargeCost =row.shortBargeCost + "元";
                    }
                    return shortBargeCost;
                }
                },
                { field: "extraCharge", title: "额外费用", sortable: false, formatter:function operateFormatter(value,row,index){
                    var extraCharge="";
                    if(row.extraCharge == null){
                        extraCharge = '--'
                    }else{
                        extraCharge =row.extraCharge + "元";
                    }
                    return extraCharge;
                }
                },
                { field: "other", title: "其他费用", sortable: false, formatter:function operateFormatter(value,row,index){
                    var other="";
                    if(row.other == null){
                        other = '--'
                    }else{
                        other =row.other + "元";
                    }
                    return other;
                }
                },
                { field: "totalPrice", title: "总费用", sortable: false, formatter:function operateFormatter(value,row,index){
                    var totalPrice="";
                    if(row.totalPrice == null){
                        totalPrice = '--'
                    }else{
                        totalPrice =row.totalPrice + "元";
                    }
                    return totalPrice;
                }},
                {
                    field: 'template',
                    title: '查看费用详情',
                    formatter: function operateFormatter(value, row, index) {
                        var bb = `<a class="detailOrder" href="javascript:void(0)" title="查看详情"  ><i class='glyphicon glyphicon-eye-open text-info 	'></i></a>`
                        switch (row.status) {
                            default: return bb;
                        }
                    },
                    events: {
                        'click .detailOrder': function (e, value, row, index) {
                            this.$router.push('SumaccountDetail/?id=' + row.id);
                        },
                    },
                }
            ],
            data: [],
            locale: "zh-CN"//中文支持,
        });
        this.load(this.skip,this.count);
        this.loadtotal();
    }
    /**
     * 查询
     */
    querySum = function () {
        this.seeks = true;
        this.skip = 0;
        this.currentPage = 1;
        this.$broadcast('reset');
        this.localHistory(this.$route);
        this.localPage(this.skip,this.count,this.currentPage);
        this.load(this.skip,this.count);
        this.loadtotal();
    }
    /**
     * 加载数据
     */
    load = function (skip, count) {
        api_sumaccount.CheckFinance.GetOrderFinceList(this.checkQuery.startTime, this.checkQuery.endTime, this.checkQuery.goodsName, this.checkQuery.originAddress, this.checkQuery.destinationAddress,
            this.checkQuery.goodsType,this.checkQuery.orderNumber,this.checkQuery.receiptStatus,skip, count).then((res) => {
                if(res.data)
            $('#sumaccount_table').bootstrapTable('load', res.data);
            var a = res.data;
            this.logisticsId = res.logisticsId;
            this.clientId = res.clientId;
            this.seeks = false;
            this.records = res.total == 0 ? 0.5 : res.total;
        }, function (rej) {
            this.seeks = false;
        });
    }
    
    //获取列表总费用
    loadtotal = function () {
        api_sumaccount.CheckFinance.GetPriceTotle(this.checkQuery.startTime, this.checkQuery.endTime, this.checkQuery.goodsName, this.checkQuery.originAddress, this.checkQuery.destinationAddress,this.checkQuery.goodsType,this.checkQuery.orderNumber,this.checkQuery.receiptStatus).then((res) => {
            this.priceTotal = res;
        }, function (rej) {
        });

    }

    //存储搜索条件
    localHistory = function(state){
        if(state){
            let routerName = state.path;
            if(routerName.search("Sumaccount")>0){
                window.localStorage.setItem(String(routerName),JSON.stringify(this.checkQuery));
            };
        }
    }

    //存储页数
    localPage = function(skip,count,currentPage){
        var routerName = this.$route.path;
        window.localStorage.setItem(String(routerName+'Page'),JSON.stringify({skip:skip,count:count,currentPage:currentPage}));
    }

    downExport = function () {
        api_sumaccount.CheckFinance.GetOrderFinceExport(this.logisticsId,this.clientId,this.checkQuery.startTime, this.checkQuery.endTime, this.checkQuery.goodsName, this.checkQuery.originAddress, this.checkQuery.destinationAddress,this.checkQuery.goodsType,this.checkQuery.orderNumber,this.checkQuery.receiptStatus,0, this.records);
        // window.location.href = dataService().baseUrl +  "CheckFinance/GetOrderFinceExport?LogisticsCompanyId=" + this.logisticsId +"&clientId="+ this.clientId+ "&startTime=" + this.checkQuery.startTime + "&endTime=" +this.checkQuery.endTime+ "&GoodsName=" + this.checkQuery.goodsName + "&OriginAddress=" + this.checkQuery.originAddress + "&DestinationAddress=" + this.checkQuery.destinationAddress + "&skip=" + 0 + "&count=" + this.records
        // }
    }

    /* 分页 */
    pageChange=(event)=>{
        
    }
}