
import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import api_order from '../../api/api_order'
declare var $: any;
declare var bootbox: any;
import pagination from '../../components/pagination'
@Component({
    template: require('./orderManage.html'),
    components:{pagination}
})

export default class OrderManageComponent extends Vue {
    currentPage:number;
    orderStatus:string;
    records:number=1;
    PerPage=10;
    skip:number;
    count:number;
    /**
     * 物流公司编号
     */
    logisticsId:string='';
    /**
     * 客户单位id
     */ 
    clientId:string='';

    /**
     * 定位器
     */
    islocating = ""//是否绑定定位器
    id=""//硬件定位的id;

    //订单状态枚举
    orderStatusList=[
        {text:"全部", "value":""},
        {text:"派车中","value":"1,4"},
        {text:"已派车","value":"3"},
        {text:"待发货","value":"5"},
        {text:"已发货","value":"6"},
        {text:"货已送达","value":"7"},
        {text:"订单终结","value":"8"}
    ];
    //回单状态枚举
    receiptStatusList=[
        {text:"全部", "value":""},
        {text:"无回单", "value":"1"},
        {text:"回单待回", "value":"2"},
        {text:"回单部分已回", "value":"3"},
        {text:"回单已回", "value":"4"},
    ]
    orderQuery={
        orderId:'',
        orderStatus:this.orderStatusList[0].value,
        startAddress:'',
        endAddress:'',
        startTime:'',
        endTime:'',
        deliveryStartTime:'',
        deliveryEndTime:'',
        receiptStatus:this.receiptStatusList[0].value,
        clientOrderId:''
    }

    status:string=''
    
    mounted(){ 
        let routerName = this.$route.path;
        if(window.localStorage.getItem(String(routerName))){
            this.orderQuery = JSON.parse(window.localStorage.getItem(String(routerName)))
        }else{
            this.orderQuery = {
                orderId: '',
                orderStatus: this.orderStatusList[0].value,
                startTime: '',
                endTime: '',
                startAddress: '',
                endAddress: '',
                deliveryStartTime: '',
                deliveryEndTime: '',
                receiptStatus: this.receiptStatusList[0].value,
                clientOrderId:''
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
        this.$on('pageIndexChange', function(event) {
            this.count = event.pageSize;
            this.skip = event.pageIndex;
            this.currentPage = event.currentPage;
            this.localPage(this.skip,this.count,this.currentPage)
            this.load(this.skip,this.count);
        });
        $('#orderManage_ApplicationStartTime').datetimepicker({onChangeDateTime:(dp,$input)=>{this.orderQuery.startTime=$input.val()}});
        $('#orderManage_ApplicationEndTime').datetimepicker({onChangeDateTime:(dp,$input)=>{this.orderQuery.endTime=$input.val()}});
        $('#orderManage_DeliveryStartTime').datetimepicker({onChangeDateTime:(dp,$input)=>{this.orderQuery.deliveryStartTime=$input.val()}});
        $('#orderManage_DeliveryEndTime').datetimepicker({onChangeDateTime:(dp,$input)=>{this.orderQuery.deliveryEndTime=$input.val()}});
        $('#location').attr("disabled","true");
        $('#locktoollocation').attr("disabled","true");
        $('#BDNPlocation').attr("disabled","true");

        var $table = $('#table').bootstrapTable({
            //选中列表中的一条数据
            clickToSelect:true,
            singleSelect:true,
                dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
                pagination: false,//是否分页
                sidePagination: "client",//服务端分页
                buttonsAlign: "left",//按钮对齐方式 子询价编号 发货地址 送货地址 货物名称 货物数量 所需车长 询价时间 紧急程度 询价状态
                columns: [
                    {field: "select",title: "",checkbox: true,width: 20,align: "center",valign: "middle"},
                    {field: "orderId",title: "订单编号", sortable: false,order: "desc"},
                    {field: "originAddress",title: "发货地址",sortable: false,titleTooltip: "this is name"},
                    {field: "destinationAddress",title: "送货地址",sortable: false,},
                    {field: "goodsName",title: "货物名称",sortable: false,},
                    {field: "quantityOfGoods",title: "货物数量",sortable: false,},
                    {field: "carLength",title: "所需车长",sortable: false,},
                    {field: "creationTime",title: "下单时间",sortable: false,},
                    {field: "deliveryTime",title: "发货时间",sortable: false,},
                    {field: "responseTime",title: "紧急程度",sortable: false,},
                    {field: "statusStr",title: "订单状态",sortable: false,},
                    {field: "receiptStatusStr",title: "回单状态",sortable: false,},              
                    {
                        field: 'template',
                        title: '操作',
                        formatter: function operateFormatter(value, row, index) {
                            var bb=`<a class="detailOrder" href="javascript:void(0)" title="查看详情"><i class='glyphicon glyphicon-eye-open text-info'></i></a>`
                            switch(row.status){
                                default:return bb;
                            }
                        },
                        events: {
                            'click .detailOrder':function(e,value,row,index){
                               this.$router.push('orderManageDetail/?id='+row.id+'&status='+row.status+'&name=detail');
                            },
                        },
                    }
                ],
                data: [],
                //选中row事件
                onCheck: (row, $element) =>{
                    this.id = row.id;
                    api_order.Location.CheckOrderIsLocating(this.id).then((res)=>{
                        this.islocating = res.extData;
                        //判断硬件定位按钮是否显示
                        if(this.islocating) {
                            $('#locktoollocation').removeAttr("disabled");
                        }else{
                            $('#locktoollocation').attr("disabled","true"); 
                        }
                    })
                    
                    //判断定位按钮，北斗按钮以及是否需要调沿途地址接口
                    if(row.status=="1"||row.status=="8"){
                        $('#location').attr("disabled","true");
                        $('#BDNPlocation').attr("disabled","true");        
                    }else{
                        $('#location').removeAttr("disabled");
                        $('#BDNPlocation').removeAttr("disabled");
                    }
                    this.locationPhone=row.driverPhone;
                    this.originAddress=row.originAddress;
                    this.destinationAddress=row.destinationAddress;
                    this.carCode=row.carrierCarCode;
                    this.orderStatus = row.status;
                },
                //取消选中事件
                onUncheck:function(row){                 
                    if($('#table').bootstrapTable('getSelections').length==0){
                         $('#location').attr("disabled","true");
                         $('#locktoollocation').attr("disabled","true");    
                         $('#BDNPlocation').attr("disabled","true");
                    }
                },
              
                actionFormatter:function(value, row, index){
                    
                },
                locale: "zh-CN"//中文支持,
        });

        //表格 初始 加载数据
        this.load(this.skip,this.count);
    }

    seeks = true; 
    locationPhone=""//定位所需参数，addedBy 李志军
    originAddress="";//定位所需参数，addedBy 李志军;
    destinationAddress=""//定位所需参数，addedBy 李志军;
    carCode="";

  
    //存储搜索条件
    localHistory(state){
        if(state){
            let routerName = state.path;
            if(routerName.search("orderManage")>0){
                window.localStorage.setItem(String(routerName),JSON.stringify(this.orderQuery));
            };
        }
    }
    //存储页数
    localPage(skip,count,currentPage){
        var routerName = this.$route.path;
        window.localStorage.setItem(String(routerName+'Page'),JSON.stringify({skip:skip,count:count,currentPage:currentPage}));
    }



    //请求数据  this.orderQuery.receiptStatus,
    load(skip,count){
        api_order.Order.getOrderList(this.orderQuery.orderId,this.orderQuery.orderStatus,this.orderQuery.startTime,this.orderQuery.endTime,this.orderQuery.deliveryStartTime,this.orderQuery.deliveryEndTime,this.orderQuery.startAddress,
        this.orderQuery.endAddress,skip,count,this.orderQuery.receiptStatus,this.orderQuery.clientOrderId).then((res)=>{
            this.logisticsId = res.logisticsId;
            this.clientId = res.clientId;
            $('#table').bootstrapTable('load', res.data); 
            this.seeks= false ;
            this.records = res.total==0?0.5:res.total;

        },function(rej){
            this.seeks=false;
        });
    }

    //查询
    queryOrder(){
        this.seeks=true;
        // this.$broadcast('reset');
        this.skip = 0;
        this.currentPage = 1;
        this.localHistory(this.$route);
        this.localPage(this.skip,this.count,this.currentPage);
        this.load(this.skip,this.count);
    }

    //定位
    location(){
        //如果选中了多行信息，则弹出该提醒
        if($('#table').bootstrapTable('getSelections').length>1){
            bootbox.alert("请只选择一条信息进行定位");
            return;
        }    
       this.$router.push("./location?phone="+this.locationPhone+"&carCode="+this.carCode+"&originAddress="+this.originAddress+"&destinationAddress="+this.destinationAddress)
    }
    /**
     * 硬件定位
     */
    locktoollocation(){
       this.$router.push("./locktoollocation?id="+this.id+"&orderStatus="+this.orderStatus +"&originAddress="+this.originAddress+"&destinationAddress="+this.destinationAddress);
    }

    /**
     * 北斗定位
     */
    getBDNPLocation(){
       this.$router.push("/app/order/BDNPLocation?carCode="+this.carCode+"&originAddress="+this.originAddress+"&destinationAddress="+this.destinationAddress);
    }

    /**
     * 报表导出
     */
    excel(){
        api_order.Order.getOrderListExport(this.logisticsId,this.clientId,this.orderQuery.orderId,this.orderQuery.orderStatus,this.orderQuery.startTime,this.orderQuery.endTime,this.orderQuery.startAddress,
            this.orderQuery.endAddress,this.orderQuery.deliveryStartTime,this.orderQuery.deliveryEndTime,0,this.records,this.orderQuery.receiptStatus,this.orderQuery.clientOrderId);
        
    }
    pageChange(event){
        this.skip = event.pageIndex;
        this.count = event.pageSize;
        this.currentPage = event.currentPage;
        this.localPage(this.skip,this.count,this.currentPage)
        this.load(this.skip,this.count);
    }
}
