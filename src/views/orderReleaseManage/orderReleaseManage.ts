import { Component, Emit, Inject, Model, Prop, Provide, Vue, Watch } from 'vue-property-decorator'
import api_cspOrder from '../../api/api_cspOrder'
declare var $: any;
declare var bootbox: any;
import pagination from '../../components/pagination'
@Component({
    template: require('./orderReleaseManage.html')
})

 export default class OrderReleaseManageComponent extends Vue {

    /**
     * 订单状态下拉
     */
    orderStatusList = [
        {'text':'全部','value':''},
        {"text":"未处理",'value':'0'},
        {"text":"已处理",'value':'1'},
        {"text":"订单终结",'value':'2'},

    ] 
    
    //v-model初始化

    Records=1;
    showRecords=true;
    currentPage:number;
    skip:number;
    count:number;
    seeks = true; 
    query = {
        orderId:'',
        orderStatus:this.orderStatusList[0].value,
        startTime:'',
        endTime:'',
        clientOrderId:'',
        startAddress:'',
        endAddress:'',
    }
    /**列表数据 */
    orderReleaseData=[];
    ready=function(){
        let routerName = this.$route.path;
        this.orderReleaseData = [];
        if(window.localStorage.getItem(String(routerName))){
            this.query = JSON.parse(window.localStorage.getItem(String(routerName)));
        }else{
            this.query = {
                startTime:'',
                endTime:'',
                startAddress:'',
                endAddress:'',
                orderId:'',
                orderStatus:this.orderStatusList[0].value,
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
        
        
        //删除分页里的总行数统计（英文的）
        $('p').remove(".VuePagination__count")

        $('#orderReleaseManage_startTime').datetimepicker({onChangeDateTime:(dp,$input)=>{this.query.startTime=$input.val()}});
        $('#orderReleaseManage_endTime').datetimepicker({onChangeDateTime:(dp,$input)=>{this.query.endTime=$input.val()}});

        var $table = $('#orderReleaseManage_table').bootstrapTable({
            // url: "index.php",//数据源
            dataField: "rows",//服务端返回数据键值 就是说记录放的键值是rows，分页时使用总记录数的键值为total
            // height: tableHeight(),
            clickToSelect:true, //选中的数据增加样式
            singleSelect:true,  //选中数据
            sidePagination: "client",//服务端分页
            buttonsAlign: "left",//按钮对齐方式 子询价编号 发货地址 送货地址 货物名称 货物数量 所需车长 询价时间 紧急程度 询价状态
            columns: [
                {field: "select",title: "",checkbox: true,width: 20,align: "center",valign: "middle"},
                {field: "cspOrderId",title: "订单编号", sortable: true,order: "desc"},
                {field: "startAddress",title: "发货地址",sortable: true,titleTooltip: "this is name"},
                {field: "endAddress",title: "送货地址",sortable: true,},
                {field: "goodsName",title: "货物名称",sortable: true,},
                {field: "goodsNum",title: "货物数量",sortable: true,},
                {field: "carLength",title: "所需车长",sortable: true,},
                {field: "cspOrderTime",title: "发货发布时间",sortable: true,},
                {field: "responseTime",title: "紧急程度",sortable: true,},
                {field: "status",title: "订单状态",sortable: true,},
                {
                    field: 'template',
                    title: '操作',
                    formatter: function operateFormatter(value, row, index) {
                        var aa=`<a title='终结订单' class="endOrder"><i class='glyphicon glyphicon-minus-sign text-primary m-l-xs'></i></a>`;
                        var bb=`<a class="detailOrder" href='javascript:void(0);' title="查看详情"><i class='glyphicon glyphicon-eye-open text-info m-l-xs'></i></a>`;
                        var cc=`<a class="editOrder" href='javascript:void(0);' title='跳转'><i class='glyphicon glyphicon-edit text-info m-l-xs'></i></a>`;
                        var dd=`<a class='glyphicon glyphicon-trash remove text-danger m-l-xs' title='删除' href='javascript:void(0);'></a>`;
                        switch(row.status){
                            case'未处理':return aa+``+bb+``+dd;
                            case'已处理':return cc;
                            default:return bb;
                        }
                        
                    },
                    events: {
                        /**
                         * 订单终结
                         */
                        'click .endOrder': (e, value, row, index) =>{
                            bootbox.confirm("是否终结该订单!",(result)=>{
                                if(result){
                                    api_cspOrder.CspOrder.editCspOrder(row.id).then((res)=>{
                                        // this.$broadcast('reset');
                                        this.load(this.skip,this.count);
                                    });
                                }else{
                                    return;
                                }
                            });
                        },

                        /**
                         * 查看详情
                         */
                       'click .detailOrder':(e,value,row,index)=>{
                            this.$router.push('orderReleaseDetail/?id='+row.id+'&status='+row.status+'&name=detail');
                        },

                        'click .editOrder':(e,value,row,index)=>{
                            this.$router.push('orderReleaseDetail/?id='+row.id+'&status='+row.status+'&name=edit');
                        },

                        /**
                         * 删除订单
                         */
                        'click .remove':(e,value,row,index)=>{
                            bootbox.confirm("是否删除订单!",(result)=>{
                                if(result){
                                    api_cspOrder.CspOrder.deleteCspOrder(row.id).then((res)=>{
                                        if(res.success){
                                            if(this.orderReleaseData.length == 1){
                                                console.log(this.currentPage);
                                                this.currentPage = this.currentPage -1;
                                                this.$broadcast('changeCurrentPage',{currentPage:this.currentPage});
                                                this.skip = (this.currentPage - 1)*10;
                                                this.load(this.skip,this.count);
                                            }else{
                                                this.load(this.skip,this.count);
                                            }
                                        }
                                    });
                                }else{
                                    return;
                                }
                            })
                        },
                    },
                }
            ],
            data: [],
            onClickRow: function(row, $element) {
                //$element是当前tr的jquery对象
                // $element.css("background-color", "green");
            },//单击row事件
            actionFormatter:function(value, row, index){
                console.info('tyv')
            },
            locale: "zh-CN"//中文支持,
        });
        /**
         * 加载数据
         */
        this.load(this.skip,this.count);
    }


    /**
     * 请求数据
     */
    load(skip,count){
        api_cspOrder.CspOrder.getCspOrderList(this.query.orderId,this.query.orderStatus,this.query.startTime,this.query.endTime,this.query.startAddress,this.query.endAddress,skip,count,this.query.clientOrderId).then((res)=>{            
            this.orderReleaseData = res.data;
            $('#orderReleaseManage_table').bootstrapTable('load', this.orderReleaseData);
            this.seeks=false;
            var totalItems=res.total;
            this.Records= totalItems==0?0.5:totalItems;
            this.showRecords=totalItems==0?false:true;
        },function(rej){
            this.seeks = false;
        });
    }
    
  
    /**
     * 查询
     */
    queryOrderRelease(){
       this.seeks=true;
     //  this.$broadcast('reset');
       this.skip = 0;
       this.currentPage = 1; 
       this.localHistory(this.$route);
       this.localPage(this.skip,this.count,this.currentPage);
       this.load(this.skip,this.count);
    }

    /**
     * 存储搜索条件 
     */
    localHistory(state){
        if(state){
            let routerName = state.path;
            if(routerName.search("order")>0){
                window.localStorage.setItem(String(routerName),JSON.stringify(this.query));

            };
        }
    }
    
    /**
     * 存储页数
     */
    localPage(skip,count,currentPage){
        var routerName = this.$route.path;
        window.localStorage.setItem(String(routerName+'Page'),JSON.stringify({skip:skip,count:count,currentPage:currentPage}));
    }

   /**
    * 跳转订单新增页面
    */
    LinkToOrderReleaseAdd=()=>{
        var rowSelected;
        rowSelected=$('#orderReleaseManage_table').bootstrapTable('getSelections')[0];
        if(rowSelected){
            this.$router.push('orderReleaseAdd/?id='+ rowSelected.id+'&name=copy');
        }else{
            this.$router.push('orderReleaseAdd/?id='+'&name=add');
        }
    }
    /* 跳转批量导入界面 */
    batchImport=()=>{
        this.$router.push('batchImport');
    }

        /* 分页 */
        pageChange=(event)=>{
            this.skip = event.pageIndex;
            this.count = event.pageSize;
            this.currentPage = event.currentPage;
            this.localPage(this.skip,this.count,this.currentPage)
            this.load(this.skip,this.count);
        }
    
}

  